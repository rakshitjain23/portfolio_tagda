from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
import requests
from typing import List

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Portfolio Backend",
    description="Backend API for Portfolio",
    version="1.0.0"
)

# Configure CORS
cors_origins = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000,https://*.vercel.app").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

class ChatMessage(BaseModel):
    message: str

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

# Add notification functionality
active_connections: List[WebSocket] = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast the message to all connected clients
            for connection in active_connections:
                await connection.send_text(data)
    except:
        active_connections.remove(websocket)

def send_email_notification(name: str, email: str, message: str):
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
    """

    msg.attach(MIMEText(body, "plain"))

    try:
        # Create SMTP session
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        logger.error(f"Error sending email: {e}")
        return False

@app.get("/")
async def root():
    return {
        "message": "Welcome to Portfolio API",
        "endpoints": {
            "contact": "/api/contact",
            "chat": "/api/chat"
        },
        "status": "active"
    }

@app.post("/api/contact")
async def contact(form: ContactForm):
    try:
        # Send email notification
        email_sent = send_email_notification(form.name, form.email, form.message)
        
        if not email_sent:
            raise HTTPException(status_code=500, detail="Failed to send email notification")

        return {"message": "Message sent successfully!"}
    except Exception as e:
        logger.error(f"Contact form error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat(message: ChatMessage):
    try:
        if not message.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        logger.info(f"Received chat message: {message.message}")
        
        # Verify Hugging Face API key
        huggingface_api_key = os.getenv("HUGGINGFACE_API_KEY")
        if not huggingface_api_key:
            logger.error("Hugging Face API key is missing")
            raise HTTPException(status_code=500, detail="Hugging Face API key is not configured")

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
                await connection.send_text("New question about Rakshit's journey! Would you like to know more about his learning path?")
            
            return {"response": response}
        elif any(phrase in message_lower for phrase in ["who are you", "tell me about yourself", "introduce yourself", "how is rakshit"]):
            response = "I'm a passionate Full Stack Developer with a strong focus on web and app development. I'm constantly learning and growing, currently diving deep into DSA and contributing to open source projects. I love taking on challenging projects and believe in continuous learning. My technical stack includes React, Node.js, Python, and various AI technologies. I'm particularly proud of my work on Aashayein, a life-saving platform for blood donation in Jaipur. Would you like to know more about my specific skills or projects?"
            
            # Send notification
            for connection in active_connections:
                await connection.send_text("Someone is asking about Rakshit! Would you like to know more about him?")
            
            return {"response": response}
        elif any(phrase in message_lower for phrase in ["why should we hire you", "why you", "why choose you"]):
            response = "I bring a unique combination of technical skills and passion for learning. As a Full Stack Developer, I'm proficient in both frontend and backend technologies. What sets me apart is my ability to quickly learn new technologies and my commitment to creating meaningful projects. For example, I developed Aashayein to address a real social need in my community. I'm also actively learning DSA and contributing to open source, showing my dedication to growth. I believe in writing clean, maintainable code and solving real-world problems. Would you like to know more about my specific projects or technical expertise?"
            
            # Send notification
            for connection in active_connections:
                await connection.send_text("Someone is interested in hiring Rakshit! Would you like to know more about his qualifications?")
            
            return {"response": response}
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
                await connection.send_text("Someone is asking about Rakshit's strengths! Would you like to know more about his capabilities?")
            
            return {"response": response}
        elif any(phrase in message_lower for phrase in ["available for work", "work with us", "hire you", "working with us"]):
            response = "You can contact me at rakshitgang23@gmail.com to discuss work opportunities. I'll let you know my availability and we can discuss how I can contribute to your project."
            
            # Send notification
            for connection in active_connections:
                await connection.send_text("Someone is interested in working with Rakshit! Would you like to know more about his availability?")
            
            return {"response": response}
        elif any(phrase in message_lower for phrase in ["young", "early", "college", "student", "year"]):
            response = "While I am still in college, my passion for technology drives me to dive deep into different technologies and learn them quickly. I believe in continuous learning and applying my knowledge to create meaningful projects."
            
            # Send notification
            for connection in active_connections:
                await connection.send_text("Someone is asking about Rakshit's experience level! Would you like to know more about his background?")
            
            return {"response": response}
        elif "aashayein" in message_lower:
            response = "Aashayein is a special project close to my heart. It started in our college's Aashayein - The Life Saviours club, where I'm a member. After being motivated by our Director Arpit Sir during our first-year orientation, I took the initiative to digitalize Aashayein. The platform helps connect blood and SDP donors with patients in need across Jaipur. I'm not just the developer but also serve as a video and photo editor/grapher for the club. It's a project that combines my technical skills with a meaningful social cause."
            
            # Send notification
            for connection in active_connections:
                await connection.send_text("Someone is asking about Aashayein! Would you like to know more about this life-saving project?")
            
            return {"response": response}
        elif any(word in message_lower for word in ["contact", "email", "phone", "reach", "how can i contact"]):
            response = "You can contact Rakshit through:\n\n" + \
                      "📧 Email: rakshitgang23@gmail.com\n" + \
                      "📱 Phone: +91 7014518699\n" + \
                      "📍 Location: Jaipur, India\n\n" + \
                      "Feel free to reach out for any professional inquiries or opportunities!"
            
            # Send notification
            for connection in active_connections:
                await connection.send_text("Someone is looking for Rakshit's contact information! Would you like to know how to reach him?")
            
            return {"response": response}
        elif any(phrase in message_lower for phrase in ["dsa", "data structures", "algorithms", "problem solving"]):
            response = "I'm actively learning and practicing Data Structures and Algorithms through Take U Forward's resources. I believe strong problem-solving skills are crucial for a developer. I regularly solve coding problems and participate in programming challenges to improve my skills. This helps me write more efficient code and tackle complex problems effectively. Would you like to know about specific problems I've solved or my approach to problem-solving?"
            
            # Send notification
            for connection in active_connections:
                await connection.send_text("Someone is asking about Rakshit's DSA skills! Would you like to know more about his problem-solving abilities?")
            
            return {"response": response}
        elif any(phrase in message_lower for phrase in ["open source", "github", "contribute"]):
            response = "I'm actively involved in the open source community. Contributing to open source projects helps me learn from other developers, improve my coding skills, and give back to the community. I believe in the power of collaborative development and continuous learning. Would you like to know about specific open source projects I've contributed to?"
            
            # Send notification
            for connection in active_connections:
                await connection.send_text("Someone is asking about Rakshit's open source contributions! Would you like to know more about his community involvement?")
            
            return {"response": response}
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
        response = requests.post("https://api-inference.huggingface.co/models/google/flan-t5-base", headers=headers, json=payload)
        
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
                              "Would you like to know more about any specific technology?"
                }
            elif any(word in message_lower for word in ["project", "work", "application", "app"]):
                return {
                    "response": "Rakshit has worked on several notable projects:\n\n" +
                              "1. Aashayein - A life-saving platform for blood and SDP donation in Jaipur\n" +
                              "2. Rakshit Comm - Communication platform\n" +
                              "3. Rakun - AI chatbot\n" +
                              "4. FurniHaven - E-commerce platform\n\n" +
                              "Which project would you like to learn more about?"
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
                              "What would you like to know more about?"
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
        return {"response": ai_response}
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        if "api_key" in str(e).lower():
            raise HTTPException(status_code=500, detail="Hugging Face API key is invalid or not configured")
        # Dynamic fallback response based on the last message
        return {
            "response": "I can help you learn about:\n\n" +
                      "1. Rakshit's technical skills and expertise\n" +
                      "2. His projects and their details\n" +
                      "3. His professional experience\n" +
                      "4. How to contact him\n" +
                      "5. His DSA and open source contributions\n" +
                      "6. His journey in technology\n\n" +
                      "What would you like to know more about?"
        }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))  # Use PORT from environment variables or default to 8000
    uvicorn.run(app, host="0.0.0.0", port=port)