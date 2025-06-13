# Portfolio Website

A modern portfolio website with a Next.js frontend and FastAPI backend.

## Project Structure

```
portfolio_tagda/
├── frontend/           # Next.js frontend
│   ├── app/           # Next.js 13+ app directory
│   ├── components/    # React components
│   ├── public/        # Static files
│   └── styles/        # CSS styles
│
└── backend/           # FastAPI backend
    ├── main.py        # Main application file
    └── requirements.txt # Python dependencies
```

## Features

- 🌓 Light/Dark mode toggle
- 📱 Fully responsive design
- 🎬 Smooth animations with Framer Motion
- 🎨 Modern UI with Shadcn components
- 📄 Resume viewer with download option
- 📬 Contact form
- 🔍 Filterable project showcase

## Pages

1. **Home**: Hero section, animated intro, call-to-actions
2. **About**: Bio, tech stack, timeline, skills display
3. **Projects**: Filterable, animated cards with GitHub/demo links
4. **Contact**: Form with email functionality
5. **Resume**: PDF viewer + download button

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- Git

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```
NEXT_PUBLIC_BACKEND_URL=https://tagda-backend.onrender.com
```

4. Run development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```
HUGGINGFACE_API_KEY=your_api_key
SMTP_EMAIL=your_email
SMTP_PASSWORD=your_password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
```

5. Run development server:
```bash
uvicorn main:app --reload
```

## Deployment

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

### Backend (Render)

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Configure the following settings:
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && gunicorn main:app --bind 0.0.0.0:$PORT --workers 4`
4. Add the following environment variables:
   - `CORS_ALLOWED_ORIGINS`: `https://portfolio-tagda.vercel.app,https://*.vercel.app`
   - `HUGGINGFACE_API_KEY`: Your Hugging Face API key
   - `SMTP_EMAIL`: Your email
   - `SMTP_PASSWORD`: Your email password
   - `SMTP_SERVER`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_BACKEND_URL`: Backend API URL (defaults to Render URL)

### Backend (.env)
- `HUGGINGFACE_API_KEY`: Hugging Face API key
- `SMTP_EMAIL`: Email for contact form
- `SMTP_PASSWORD`: Email password
- `SMTP_SERVER`: SMTP server (default: smtp.gmail.com)
- `SMTP_PORT`: SMTP port (default: 587)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Rakshit Jain - [LinkedIn](https://www.linkedin.com/in/rakshit-gang) - [GitHub](https://github.com/rakshitjain23)
