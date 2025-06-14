from fastapi import FastAPI, HTTPException, WebSocket, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
import requests
from typing import List, Optional
import time
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import html
import re
import hashlib
import secrets
from datetime import datetime, timedelta

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Rakshit Gang Portfolio API",
    description="Backend API for Rakshit Gang's Portfolio Website",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS - Strict security configuration
# Only allow specific, known domains
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://devrakshit.me",
    "https://www.devrakshit.me",
    "https://portfolio-tagda.vercel.app",
    "https://portfolio-tagda-git-main-rakshitjain23.vercel.app",
    "https://portfolio-tagda-rakshitjain23.vercel.app",
    "https://portfolio-tagda-git-main-rakshitjain23s-projects.vercel.app"
]

# Get additional origins from environment variable (comma-separated)
env_origins = os.getenv("CORS_ALLOWED_ORIGINS", "").split(",")
if env_origins and env_origins[0]:  # Only add if not empty
    ALLOWED_ORIGINS.extend([origin.strip() for origin in env_origins if origin.strip()])

# Remove duplicates and filter out empty strings
ALLOWED_ORIGINS = list(set([origin for origin in ALLOWED_ORIGINS if origin]))

def is_origin_allowed(origin: str) -> bool:
    """Check if the origin is allowed based on our strict security rules"""
    if not origin:
        return False
    
    # Only allow exact matches from our whitelist
    return origin in ALLOWED_ORIGINS

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # Only exact matches from whitelist
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Allow OPTIONS for preflight requests
    allow_headers=["Content-Type", "Authorization", "Accept", "Origin"],  # Allow necessary headers
)

# Add CORS debugging middleware
@app.middleware("http")
async def cors_debug_middleware(request, call_next):
    origin = request.headers.get("origin")
    if origin:
        if is_origin_allowed(origin):
            logger.info(f"✅ CORS request from allowed origin: {origin}")
        else:
            logger.warning(f"🚫 CORS request blocked from unauthorized origin: {origin}")
            # Return 403 Forbidden for unauthorized origins
            return JSONResponse(
                status_code=403,
                content={
                    "error": "Forbidden",
                    "message": "Origin not allowed",
                    "status": "error"
                }
            )
    response = await call_next(request)
    return response

# Add comprehensive security middleware
@app.middleware("http")
async def security_middleware(request, call_next):
    """Comprehensive security middleware to prevent bypasses"""
    
    # Get client IP
    client_ip = get_real_ip(request)
    
    # Log all requests for monitoring
    logger.info(f"🔍 Request: {request.method} {request.url} from {client_ip}")
    
    # 0. Check for suspicious requests first
    if is_suspicious_request(request):
        logger.warning(f"🚫 Suspicious request blocked from {client_ip}")
        return JSONResponse(
            status_code=403,
            content={
                "error": "Forbidden",
                "message": "Request blocked for security reasons",
                "status": "error"
            }
        )
    
    # 1. Check origin first (before other validations)
    origin = request.headers.get("origin")
    if origin and not is_origin_allowed(origin):
        logger.warning(f"🚫 CORS request blocked from unauthorized origin: {origin}")
        return JSONResponse(
            status_code=403,
            content={
                "error": "Forbidden",
                "message": "Origin not allowed",
                "status": "error"
            }
        )
    
    # 2. Validate request security
    if not validate_request_security(request):
        logger.warning(f"🚫 Security validation failed for {client_ip}")
        return JSONResponse(
            status_code=403,
            content={
                "error": "Forbidden",
                "message": "Request blocked for security reasons",
                "status": "error"
            }
        )
    
    # 3. Check rate limiting by IP
    if not check_rate_limit_by_ip(client_ip):
        logger.warning(f"🚫 Rate limit exceeded for {client_ip}")
        return JSONResponse(
            status_code=429,
            content={
                "error": "Too Many Requests",
                "message": "Rate limit exceeded",
                "status": "error"
            }
        )
    
    # 4. Validate API key if provided
    if not validate_api_key(request):
        logger.warning(f"🚫 Invalid API key from {client_ip}")
        return JSONResponse(
            status_code=401,
            content={
                "error": "Unauthorized",
                "message": "Invalid API key",
                "status": "error"
            }
        )
    
    # Continue with the request
    response = await call_next(request)
    
    # Add security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
    
    return response

# Configure rate limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Security configuration
API_KEY = os.getenv("API_SECRET_KEY", secrets.token_urlsafe(32))
RATE_LIMIT_WINDOW = 60  # seconds
MAX_REQUESTS_PER_WINDOW = 10

# Request tracking for additional security
request_tracker = {}

# Blocked IPs and suspicious patterns
BLOCKED_IPS = set()  # Will be populated from logs
SUSPICIOUS_PATTERNS = [
    'rtucommunity.tech',
    'testing.rtucommunity.tech',
    'proxy',
    'vpn',
    'tor'
]

def get_real_ip(request: Request) -> str:
    """Get the real IP address, accounting for proxies"""
    # Check for real IP in headers
    real_ip_headers = [
        'x-forwarded-for',
        'x-real-ip',
        'cf-connecting-ip',
        'x-client-ip'
    ]
    
    for header in real_ip_headers:
        if header in request.headers:
            ip = request.headers[header].split(',')[0].strip()
            if ip and ip != 'unknown':
                return ip
    
    # Fallback to client IP
    return request.client.host if request.client else "unknown"

def is_suspicious_request(request: Request) -> bool:
    """Check if request is suspicious based on multiple factors"""
    real_ip = get_real_ip(request)
    
    # Check if IP is blocked
    if real_ip in BLOCKED_IPS:
        logger.warning(f"🚫 Request from blocked IP: {real_ip}")
        return True
    
    # Check user agent for suspicious patterns (but allow legitimate browsers)
    user_agent = request.headers.get('user-agent', '').lower()
    
    # Allow legitimate browser user agents
    legitimate_browsers = [
        'mozilla', 'chrome', 'safari', 'firefox', 'edge', 'opera'
    ]
    
    # If it's a legitimate browser, don't block based on user agent
    if any(browser in user_agent for browser in legitimate_browsers):
        pass  # Allow legitimate browsers
    else:
        # Check for suspicious patterns only in non-browser user agents
        for pattern in SUSPICIOUS_PATTERNS:
            if pattern in user_agent:
                logger.warning(f"🚫 Suspicious user agent pattern: {pattern}")
                return True
    
    # Check for missing user agent (suspicious)
    if not user_agent or user_agent == 'unknown':
        logger.warning("🚫 Missing or suspicious user agent")
        return True
    
    # Check for too many requests from same IP
    if real_ip in request_tracker and len(request_tracker[real_ip]) > 50:
        logger.warning(f"🚫 Too many requests from IP: {real_ip}")
        BLOCKED_IPS.add(real_ip)
        return True
    
    return False

def validate_request_security(request: Request) -> bool:
    """Validate request for security threats"""
    # Check for suspicious headers
    suspicious_headers = [
        'x-forwarded-for',
        'x-real-ip',
        'cf-connecting-ip',
        'x-forwarded-proto',
        'x-forwarded-host',
        'x-original-host'
    ]
    
    for header in suspicious_headers:
        if header in request.headers:
            logger.warning(f"🚫 Suspicious header detected: {header}")
            return False
    
    # Check for proxy indicators
    if 'via' in request.headers or 'proxy' in request.headers.get('user-agent', '').lower():
        logger.warning("🚫 Proxy request detected")
        return False
    
    # Check Host header for unauthorized domains (only if present)
    host = request.headers.get('host', '').lower()
    if host and not any(allowed in host for allowed in ['portfolio-tagda.onrender.com', 'localhost', '127.0.0.1']):
        logger.warning(f"🚫 Unauthorized host: {host}")
        return False
    
    # Check Referer header (only if present)
    referer = request.headers.get('referer', '').lower()
    if referer and not any(allowed in referer for allowed in ['devrakshit.me', 'portfolio-tagda.vercel.app', 'localhost']):
        logger.warning(f"🚫 Unauthorized referer: {referer}")
        return False
    
    # BLOCK SPECIFIC UNAUTHORIZED DOMAINS
    blocked_domains = [
        'rtucommunity.tech',
        'testing.rtucommunity.tech',
        'malicious-site.com',
        'proxy-server.com'
    ]
    
    # Check all headers for blocked domains
    for header_name, header_value in request.headers.items():
        header_value_lower = header_value.lower()
        for blocked_domain in blocked_domains:
            if blocked_domain in header_value_lower:
                logger.warning(f"🚫 Blocked domain detected in {header_name}: {blocked_domain}")
                return False
    
    # Check URL path for suspicious patterns
    url_path = str(request.url).lower()
    for blocked_domain in blocked_domains:
        if blocked_domain in url_path:
            logger.warning(f"🚫 Blocked domain in URL: {blocked_domain}")
            return False
    
    return True

def validate_api_key(request: Request) -> bool:
    """Validate API key - requires valid API key for sensitive endpoints"""
    api_key = request.headers.get("X-API-Key")
    
    # For sensitive endpoints, require API key
    sensitive_paths = ["/api/contact", "/api/chat"]
    if any(path in str(request.url) for path in sensitive_paths):
        if not api_key:
            logger.warning("🚫 Missing API key for sensitive endpoint")
            return False
        if api_key != API_KEY:
            logger.warning("🚫 Invalid API key")
            return False
    
    return True

def check_rate_limit_by_ip(client_ip: str) -> bool:
    """Additional rate limiting by IP"""
    now = datetime.now()
    if client_ip not in request_tracker:
        request_tracker[client_ip] = []
    
    # Remove old requests
    request_tracker[client_ip] = [
        req_time for req_time in request_tracker[client_ip]
        if now - req_time < timedelta(seconds=RATE_LIMIT_WINDOW)
    ]
    
    # Check if too many requests
    if len(request_tracker[client_ip]) >= MAX_REQUESTS_PER_WINDOW:
        return False
    
    # Add current request
    request_tracker[client_ip].append(now)
    return True

# Models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

class ChatMessage(BaseModel):
    message: str

class HealthCheck(BaseModel):
    status: str
    timestamp: float
    version: str

# Portfolio context for the AI
PORTFOLIO_CONTEXT = """
Rakshit Gang is a passionate Full Stack Developer with a strong focus on AI and web development. 
He is currently pursuing his education while actively working on various projects.

Journey:
- Started web development journey with Angela Yu's Udemy course
- Enhanced skills through Hitesh Choudhary's tutorials
- Learned Flutter development from Rivaan Ranawat's YouTube channel
- Currently learning DSA from Take U Forward
- Built multiple projects including Aashayein, Rakshit Comm, and Rakun
- Continuously learning and growing in the tech field

About Me:
- Passionate about web and app development
- Actively learning DSA and contributing to open source
- Quick learner with a strong problem-solving mindset
- Enjoys taking on challenging projects
- Believes in continuous learning and growth

Skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, Python, FastAPI
- Mobile: Flutter
- Database: MongoDB, PostgreSQL
- AI/ML: TensorFlow, PyTorch, OpenAI
- DSA: Problem solving, Algorithms, Data Structures
- Other: Git, Docker, AWS, Open Source

Projects:
1. Aashayein - A life-saving platform for blood and SDP donation in Jaipur
   - Role: Developer and member of Aashayein - The Life Saviours club
   - Started as a college initiative after being motivated by Director Arpit Sir
   - Digitalized the blood donation system for Jaipur
   - Handles blood and SDP requests for patients
   - Also serves as a video and photo editor/grapher for the club

2. Rakshit Comm - Communication platform
3. Rakun - AI chatbot
4. FurniHaven - E-commerce platform

Personal:
- Location: Jaipur, India
- Contact: rakshitgang23@gmail.com
- Phone: +91 7014518699

Guidelines:
- Only answer questions about Rakshit's portfolio, skills, and projects
- For work inquiries, direct them to contact via email
- Emphasize passion for technology and quick learning ability
- For Aashayein project, explain its social impact and college connection
- Highlight DSA and open source contributions
- Share journey and growth in technology
"""

# Global variables
active_connections: List[WebSocket] = []

# Utility functions
def get_environment_info():
    """Get environment information for debugging"""
    return {
        "python_version": os.getenv("PYTHON_VERSION", "Unknown"),
        "port": os.getenv("PORT", "8000"),
        "environment": os.getenv("ENVIRONMENT", "development"),
        "cors_origins": ALLOWED_ORIGINS
    }

def send_email_notification(name: str, email: str, message: str) -> bool:
    """Send email notification for contact form submissions"""
    try:
        # Email configuration
        sender_email = os.getenv("SMTP_EMAIL")
        sender_password = os.getenv("SMTP_PASSWORD")
        smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))

        if not all([sender_email, sender_password]):
            logger.error("SMTP credentials not found in environment variables")
            return False

        # Create message
        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = sender_email  # Send to yourself
        msg["Subject"] = f"New Contact Form Submission from {name}"

        # Email body
        body = f"""
        New contact form submission received:
        
        Name: {name}
        Email: {email}
        Message: {message}
        
        Timestamp: {time.strftime('%Y-%m-%d %H:%M:%S')}
        """

        msg.attach(MIMEText(body, "plain"))

        # Create SMTP session
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        
        logger.info(f"Email notification sent successfully for {name}")
        return True
    except Exception as e:
        logger.error(f"Error sending email: {e}")
        return False

def sanitize_input(text: str) -> str:
    """Sanitize user input to prevent XSS and injection attacks"""
    if not text:
        return ""
    
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # Escape HTML entities
    text = html.escape(text)
    
    # Remove potentially dangerous characters
    text = re.sub(r'[<>"\']', '', text)
    
    return text.strip()

# WebSocket endpoint
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time notifications"""
    await websocket.accept()
    active_connections.append(websocket)
    logger.info(f"WebSocket connected. Total connections: {len(active_connections)}")
    
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast the message to all connected clients
            for connection in active_connections:
                try:
                    await connection.send_text(data)
                except:
                    # Remove disconnected clients
                    if connection in active_connections:
                        active_connections.remove(connection)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    finally:
        if websocket in active_connections:
            active_connections.remove(websocket)
        logger.info(f"WebSocket disconnected. Total connections: {len(active_connections)}")

# API Endpoints
@app.get("/", response_model=dict)
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to Rakshit Gang's Portfolio API",
        "version": "2.0.0",
        "status": "active",
        "endpoints": {
            "health": "/health",
            "contact": "/api/contact",
            "chat": "/api/chat",
            "websocket": "/ws",
            "docs": "/docs"
        },
        "environment": get_environment_info()
    }

@app.get("/ping")
async def ping():
    """Lightweight endpoint for uptime monitoring"""
    return {"status": "pong", "timestamp": time.time()}

@app.get("/test-cors")
async def test_cors():
    """Test endpoint to check CORS configuration"""
    return {
        "message": "CORS test successful",
        "timestamp": time.time(),
        "cors_enabled": True
    }

@app.get("/health", response_model=HealthCheck)
async def health_check():
    """Health check endpoint for monitoring"""
    return HealthCheck(
        status="healthy",
        timestamp=time.time(),
        version="2.0.0"
    )

@app.post("/api/contact")
@limiter.limit("5/minute")  # Allow 5 contact form submissions per minute
async def contact(form: ContactForm, request: Request):
    """Handle contact form submissions"""
    try:
        logger.info(f"Contact form submission from {form.name} ({form.email})")
        
        # Validate input length
        if len(form.name) > 100 or len(form.message) > 1000:
            raise HTTPException(
                status_code=400,
                detail="Name or message too long"
            )
        
        # Sanitize inputs
        sanitized_name = sanitize_input(form.name)
        sanitized_message = sanitize_input(form.message)
        
        # Send email notification
        email_sent = send_email_notification(sanitized_name, form.email, sanitized_message)
        
        if not email_sent:
            logger.error("Failed to send email notification")
            raise HTTPException(
                status_code=500, 
                detail="Failed to send email notification. Please try again later."
            )

        # Send notification to connected WebSocket clients
        notification = f"New contact form submission from {form.name}!"
        for connection in active_connections:
            try:
                await connection.send_text(notification)
            except:
                # Remove disconnected clients
                if connection in active_connections:
                    active_connections.remove(connection)

        return JSONResponse(
            status_code=200,
            content={
                "message": "Message sent successfully!",
                "status": "success"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Contact form error: {e}")
        raise HTTPException(
            status_code=500, 
            detail="An unexpected error occurred. Please try again later."
        )

@app.post("/api/chat")
@limiter.limit("10/minute")  # Allow 10 chat messages per minute
async def chat(message: ChatMessage, request: Request):
    """Handle chat messages with AI responses"""
    try:
        if not message.message.strip():
            raise HTTPException(
                status_code=400, 
                detail="Message cannot be empty"
            )

        # Validate message length
        if len(message.message) > 500:
            raise HTTPException(
                status_code=400,
                detail="Message too long (max 500 characters)"
            )

        logger.info(f"Chat message received: {message.message[:50]}...")
        
        # Verify Hugging Face API key
        huggingface_api_key = os.getenv("HUGGINGFACE_API_KEY")
        if not huggingface_api_key:
            logger.error("Hugging Face API key is missing")
            raise HTTPException(
                status_code=500, 
                detail="AI service is temporarily unavailable"
            )

        # Analyze the user's message to determine the type of question
        message_lower = message.message.lower()
        
        # Handle specific questions with predefined responses
        if any(phrase in message_lower for phrase in ["journey", "how did you start", "your story", "how did you learn"]):
            response = "My journey in technology started with Angela Yu's comprehensive Udemy course, which gave me a solid foundation in web development. I further enhanced my skills through Hitesh Choudhary's tutorials, which helped me understand more advanced concepts.\n\n" + \
                      "For mobile development, I learned Flutter from Rivaan Ranawat's YouTube channel, which opened up new possibilities for cross-platform app development. Currently, I'm strengthening my DSA skills through Take U Forward's resources, focusing on problem-solving and algorithmic thinking.\n\n" + \
                      "A significant milestone in my journey was developing Aashayein, a life-saving platform for blood donation in Jaipur. This project combined my technical skills with a meaningful social cause, showing me how technology can make a real difference in people's lives.\n\n" + \
                      "My learning journey is ongoing, and I'm always excited to explore new technologies and take on challenging projects. Would you like to know more about any specific part of my journey or the projects I've worked on?"
            
            # Send notification to all connected clients
            for connection in active_connections:
                try:
                    await connection.send_text("New question about Rakshit's journey! Would you like to know more about his learning path?")
                except:
                    if connection in active_connections:
                        active_connections.remove(connection)
            
            return {"response": response, "type": "journey"}
            
        elif any(phrase in message_lower for phrase in ["who are you", "tell me about yourself", "introduce yourself", "how is rakshit"]):
            response = "I'm a passionate Full Stack Developer with a strong focus on web and app development. I'm constantly learning and growing, currently diving deep into DSA and contributing to open source projects. I love taking on challenging projects and believe in continuous learning. My technical stack includes React, Node.js, Python, and various AI technologies. I'm particularly proud of my work on Aashayein, a life-saving platform for blood donation in Jaipur. Would you like to know more about my specific skills or projects?"
            
            # Send notification
            for connection in active_connections:
                try:
                    await connection.send_text("Someone is asking about Rakshit! Would you like to know more about him?")
                except:
                    if connection in active_connections:
                        active_connections.remove(connection)
            
            return {"response": response, "type": "introduction"}
            
        elif any(phrase in message_lower for phrase in ["why should we hire you", "why you", "why choose you"]):
            response = "I bring a unique combination of technical skills and passion for learning. As a Full Stack Developer, I'm proficient in both frontend and backend technologies. What sets me apart is my ability to quickly learn new technologies and my commitment to creating meaningful projects. For example, I developed Aashayein to address a real social need in my community. I'm also actively learning DSA and contributing to open source, showing my dedication to growth. I believe in writing clean, maintainable code and solving real-world problems. Would you like to know more about my specific projects or technical expertise?"
            
            # Send notification
            for connection in active_connections:
                try:
                    await connection.send_text("Someone is interested in hiring Rakshit! Would you like to know more about his qualifications?")
                except:
                    if connection in active_connections:
                        active_connections.remove(connection)
            
            return {"response": response, "type": "hire"}
            
        elif any(phrase in message_lower for phrase in ["strengths", "what are you good at", "best at"]):
            response = "My key strengths include:\n\n" + \
                      "1. Quick Learning: I rapidly adapt to new technologies and concepts\n" + \
                      "2. Problem Solving: Strong DSA skills and analytical thinking\n" + \
                      "3. Full Stack Development: Expertise in both frontend and backend\n" + \
                      "4. Project Management: Successfully delivered multiple projects\n" + \
                      "5. Open Source Contribution: Active participation in the developer community\n\n" + \
                      "Would you like me to elaborate on any of these strengths?"
            
            # Send notification
            for connection in active_connections:
                try:
                    await connection.send_text("Someone is asking about Rakshit's strengths! Would you like to know more about his capabilities?")
                except:
                    if connection in active_connections:
                        active_connections.remove(connection)
            
            return {"response": response, "type": "strengths"}
            
        elif any(phrase in message_lower for phrase in ["available for work", "work with us", "hire you", "working with us"]):
            response = "You can contact me at rakshitgang23@gmail.com to discuss work opportunities. I'll let you know my availability and we can discuss how I can contribute to your project."
            
            # Send notification
            for connection in active_connections:
                try:
                    await connection.send_text("Someone is interested in working with Rakshit! Would you like to know more about his availability?")
                except:
                    if connection in active_connections:
                        active_connections.remove(connection)
            
            return {"response": response, "type": "availability"}
            
        elif any(phrase in message_lower for phrase in ["young", "early", "college", "student", "year"]):
            response = "While I am still in college, my passion for technology drives me to dive deep into different technologies and learn them quickly. I believe in continuous learning and applying my knowledge to create meaningful projects."
            
            # Send notification
            for connection in active_connections:
                try:
                    await connection.send_text("Someone is asking about Rakshit's experience level! Would you like to know more about his background?")
                except:
                    if connection in active_connections:
                        active_connections.remove(connection)
            
            return {"response": response, "type": "experience"}
            
        elif "aashayein" in message_lower:
            response = "Aashayein is a special project close to my heart. It started in our college's Aashayein - The Life Saviours club, where I'm a member. After being motivated by our Director Arpit Sir during our first-year orientation, I took the initiative to digitalize Aashayein. The platform helps connect blood and SDP donors with patients in need across Jaipur. I'm not just the developer but also serve as a video and photo editor/grapher for the club. It's a project that combines my technical skills with a meaningful social cause."
            
            # Send notification
            for connection in active_connections:
                try:
                    await connection.send_text("Someone is asking about Aashayein! Would you like to know more about this life-saving project?")
                except:
                    if connection in active_connections:
                        active_connections.remove(connection)
            
            return {"response": response, "type": "aashayein"}
            
        elif any(word in message_lower for word in ["contact", "email", "phone", "reach", "how can i contact"]):
            response = "You can contact Rakshit through:\n\n" + \
                      "📧 Email: rakshitgang23@gmail.com\n" + \
                      "📱 Phone: +91 7014518699\n" + \
                      "📍 Location: Jaipur, India\n\n" + \
                      "Feel free to reach out for any professional inquiries or opportunities!"
            
            # Send notification
            for connection in active_connections:
                try:
                    await connection.send_text("Someone is looking for Rakshit's contact information! Would you like to know how to reach him?")
                except:
                    if connection in active_connections:
                        active_connections.remove(connection)
            
            return {"response": response, "type": "contact"}
            
        elif any(phrase in message_lower for phrase in ["dsa", "data structures", "algorithms", "problem solving"]):
            response = "I'm actively learning and practicing Data Structures and Algorithms through Take U Forward's resources. I believe strong problem-solving skills are crucial for a developer. I regularly solve coding problems and participate in programming challenges to improve my skills. This helps me write more efficient code and tackle complex problems effectively. Would you like to know about specific problems I've solved or my approach to problem-solving?"
            
            # Send notification
            for connection in active_connections:
                try:
                    await connection.send_text("Someone is asking about Rakshit's DSA skills! Would you like to know more about his problem-solving abilities?")
                except:
                    if connection in active_connections:
                        active_connections.remove(connection)
            
            return {"response": response, "type": "dsa"}
            
        elif any(phrase in message_lower for phrase in ["open source", "github", "contribute"]):
            response = "I'm actively involved in the open source community. Contributing to open source projects helps me learn from other developers, improve my coding skills, and give back to the community. I believe in the power of collaborative development and continuous learning. Would you like to know about specific open source projects I've contributed to?"
            
            # Send notification
            for connection in active_connections:
                try:
                    await connection.send_text("Someone is asking about Rakshit's open source contributions! Would you like to know more about his community involvement?")
                except:
                    if connection in active_connections:
                        active_connections.remove(connection)
            
            return {"response": response, "type": "opensource"}
            
        elif any(word in message_lower for word in ["skill", "expertise", "technology", "tech"]):
            prompt = f"""Question: What are Rakshit's technical skills and expertise?
Context: {PORTFOLIO_CONTEXT}
Answer:"""
        elif any(word in message_lower for word in ["project", "work", "application", "app"]):
            prompt = f"""Question: What are Rakshit's notable projects and their details?
Context: {PORTFOLIO_CONTEXT}
Answer:"""
        elif any(word in message_lower for word in ["experience", "background", "history"]):
            prompt = f"""Question: What is Rakshit's professional background and experience?
Context: {PORTFOLIO_CONTEXT}
Answer:"""
        else:
            prompt = f"""Question: {message.message}
Context: {PORTFOLIO_CONTEXT}
Answer:"""

        # Make request to Hugging Face API
        headers = {
            "Authorization": f"Bearer {huggingface_api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "inputs": prompt,
            "parameters": {
                "max_length": 200,
                "temperature": 0.7,
                "return_full_text": False,
                "num_return_sequences": 1,
                "top_p": 0.95,
                "repetition_penalty": 1.5
            }
        }

        logger.info("Sending request to Hugging Face API...")
        response = requests.post(
            "https://api-inference.huggingface.co/models/google/flan-t5-base", 
            headers=headers, 
            json=payload,
            timeout=30
        )
        
        if response.status_code != 200:
            logger.error(f"Hugging Face API error: {response.text}")
            # Dynamic fallback responses based on question type
            if any(word in message_lower for word in ["skill", "expertise", "technology", "tech"]):
                return {
                    "response": "Rakshit is a Full Stack Developer with expertise in:\n\n" +
                              "Frontend: React, Next.js, TypeScript, Tailwind CSS\n" +
                              "Backend: Node.js, Express, Python, FastAPI\n" +
                              "Mobile: Flutter\n" +
                              "Database: MongoDB, PostgreSQL\n" +
                              "AI/ML: TensorFlow, PyTorch, OpenAI\n" +
                              "DSA: Problem solving, Algorithms, Data Structures\n\n" +
                              "Would you like to know more about any specific technology?",
                    "type": "skills"
                }
            elif any(word in message_lower for word in ["project", "work", "application", "app"]):
                return {
                    "response": "Rakshit has worked on several notable projects:\n\n" +
                              "1. Aashayein - A life-saving platform for blood and SDP donation in Jaipur\n" +
                              "2. Rakshit Comm - Communication platform\n" +
                              "3. Rakun - AI chatbot\n" +
                              "4. FurniHaven - E-commerce platform\n\n" +
                              "Which project would you like to learn more about?",
                    "type": "projects"
                }
            else:
                return {
                    "response": "I can help you learn about:\n\n" +
                              "1. Rakshit's technical skills and expertise\n" +
                              "2. His projects and their details\n" +
                              "3. His professional experience\n" +
                              "4. How to contact him\n" +
                              "5. His DSA and open source contributions\n" +
                              "6. His journey in technology\n\n" +
                              "What would you like to know more about?",
                    "type": "general"
                }

        # Extract the response text
        response_data = response.json()
        if isinstance(response_data, list) and len(response_data) > 0:
            ai_response = response_data[0].get("generated_text", "")
            
            # Format the response based on the type of question
            if any(word in message_lower for word in ["skill", "expertise", "technology", "tech"]):
                if not any(keyword in ai_response.lower() for keyword in ["rakshit", "skill", "technology", "expertise"]):
                    ai_response = "Rakshit is a Full Stack Developer with expertise in React, Node.js, Python, and AI development. Would you like to know more about any specific technology he works with?"
            elif any(word in message_lower for word in ["project", "work", "application", "app"]):
                if not any(keyword in ai_response.lower() for keyword in ["rakshit", "project", "work", "application"]):
                    ai_response = "Rakshit has worked on projects like Aashayein, Rakshit Comm, and Rakun. Which project would you like to learn more about?"
            elif any(word in message_lower for word in ["experience", "background", "history"]):
                if not any(keyword in ai_response.lower() for keyword in ["rakshit", "experience", "background", "history"]):
                    ai_response = "Rakshit is a Full Stack Developer with experience in building web applications, AI systems, and e-commerce platforms. Would you like to know more about his professional background?"
            
            # Add follow-up questions
            if "skill" in message_lower or "technology" in message_lower:
                ai_response += "\n\nWould you like to know about his other technical skills or specific projects where he used these technologies?"
            elif "project" in message_lower or "work" in message_lower:
                ai_response += "\n\nWould you like to know more about the technologies used in these projects or his other work?"
            elif "experience" in message_lower:
                ai_response += "\n\nWould you like to know about his specific projects or technical skills?"
        else:
            ai_response = "I can help you learn about Rakshit's portfolio. He is a Full Stack Developer with expertise in React, Node.js, and AI development. What specific aspect would you like to learn more about?"

        logger.info("Chat completion successful")
        return {"response": ai_response, "type": "ai_generated"}
        
    except HTTPException:
        raise
    except requests.exceptions.Timeout:
        logger.error("Hugging Face API request timed out")
        raise HTTPException(
            status_code=500, 
            detail="AI service is taking too long to respond. Please try again."
        )
    except requests.exceptions.RequestException as e:
        logger.error(f"Network error: {e}")
        raise HTTPException(
            status_code=500, 
            detail="Unable to connect to AI service. Please try again later."
        )
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="An unexpected error occurred. Please try again later."
        )

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"message": "Endpoint not found", "status": "error"}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "status": "error"}
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    logger.info(f"Starting server on {host}:{port}")
    uvicorn.run(
        app, 
        host=host, 
        port=port,
        log_level="info"
    )