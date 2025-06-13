# Portfolio Backend API

A FastAPI-based backend for Rakshit Gang's portfolio website with AI-powered chat functionality and contact form handling.

## Features

- **FastAPI REST API** with automatic documentation
- **AI Chat Integration** using Hugging Face API
- **Contact Form** with email notifications
- **WebSocket Support** for real-time notifications
- **Health Check Endpoint** for monitoring
- **CORS Configuration** for frontend integration
- **Production Ready** with proper error handling

## API Endpoints

- `GET /` - Root endpoint with API information
- `GET /health` - Health check endpoint
- `POST /api/contact` - Contact form submission
- `POST /api/chat` - AI-powered chat responses
- `WS /ws` - WebSocket for real-time notifications
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=8000
HOST=0.0.0.0
ENVIRONMENT=production

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,https://*.vercel.app,https://*.render.com

# Email Configuration (for contact form)
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587

# AI Service Configuration
HUGGINGFACE_API_KEY=your-huggingface-api-key

# Python Version (for Render)
PYTHON_VERSION=3.11.7
```

## Local Development

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your actual values

3. **Run the development server:**
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Access the API:**
   - API: http://localhost:8000
   - Documentation: http://localhost:8000/docs
   - Health Check: http://localhost:8000/health

## Deployment on Render

1. **Connect your repository** to Render
2. **Create a new Web Service**
3. **Configure the service:**
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`
   - **Python Version:** 3.11.7

4. **Set Environment Variables** in Render dashboard:
   - All variables from the `.env` file above

5. **Deploy!**

## Email Setup

For the contact form to work, you need to set up SMTP:

1. **Gmail Setup:**
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in `SMTP_PASSWORD`

2. **Other Providers:**
   - Update `SMTP_SERVER` and `SMTP_PORT` accordingly
   - Use appropriate credentials

## AI Chat Setup

The chat functionality uses Hugging Face's inference API:

1. **Get API Key:**
   - Sign up at https://huggingface.co/
   - Go to Settings → Access Tokens
   - Create a new token

2. **Set Environment Variable:**
   - Add your token to `HUGGINGFACE_API_KEY`

## Project Structure

```
backend/
├── main.py              # Main FastAPI application
├── requirements.txt     # Python dependencies
├── runtime.txt         # Python version specification
├── Procfile           # Render deployment configuration
├── README.md          # This file
└── .env               # Environment variables (not in git)
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Invalid input data
- **404 Not Found** - Endpoint not found
- **500 Internal Server Error** - Server-side errors
- **Timeout Handling** - For external API calls
- **Graceful Degradation** - Fallback responses when AI service is unavailable

## Monitoring

- **Health Check:** `/health` endpoint for uptime monitoring
- **Logging:** Structured logging with timestamps
- **Error Tracking:** Detailed error messages for debugging

## Security

- **CORS Configuration** - Restricts origins
- **Input Validation** - Pydantic models for data validation
- **Environment Variables** - Sensitive data not in code
- **Error Sanitization** - No sensitive data in error messages

## Performance

- **Async/Await** - Non-blocking I/O operations
- **Connection Pooling** - Efficient HTTP requests
- **Timeout Configuration** - Prevents hanging requests
- **Gunicorn Workers** - Multiple worker processes for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of Rakshit Gang's portfolio. 