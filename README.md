# 🚀 Rakshit Jain - Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and experience as a Full Stack Developer. Built with Next.js, TypeScript, and FastAPI.

## 🌐 Live Demo

- **Frontend (Vercel)**: [devrakshit.me](https://devrakshit.me)
- **Backend (Render)**: [portfolio-tagda.onrender.com](https://portfolio-tagda.onrender.com)

## ✨ Features

### 🎨 Frontend (Next.js)
- **Modern Design**: Clean, responsive UI with dark/light mode
- **Interactive Elements**: Smooth animations with Framer Motion
- **AI Chatbot**: Intelligent chatbot powered by Hugging Face AI
- **Responsive Layout**: Works perfectly on all devices
- **SEO Optimized**: Built-in SEO and performance optimization
- **TypeScript**: Full type safety and better development experience

### 🔧 Backend (FastAPI)
- **RESTful API**: Clean API endpoints for portfolio data
- **AI Integration**: Hugging Face AI for intelligent responses
- **Real-time Chat**: WebSocket support for live chat functionality
- **CORS Enabled**: Cross-origin resource sharing for frontend integration
- **Production Ready**: Optimized for deployment on Render

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI (Python)
- **AI Integration**: Hugging Face Transformers
- **WebSocket**: FastAPI WebSockets
- **Deployment**: Render
- **Dependencies**: See `backend/requirements.txt`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.11+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rakshitjain23/portfolio_tagda.git
   cd portfolio_tagda
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
   Backend will be available at `http://localhost:8000`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
portfolio_tagda/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About page
│   │   ├── resume/         # Resume page
│   │   ├── projects/       # Projects page
│   │   └── contact/        # Contact page
│   ├── components/         # Reusable React components
│   │   ├── layout/         # Layout components (Navbar, etc.)
│   │   ├── chatbot.tsx     # AI Chatbot component
│   │   └── ...            # Other components
│   ├── public/            # Static assets
│   │   ├── profile.jpg    # Profile image
│   │   └── resume.pdf     # Resume file
│   └── package.json       # Frontend dependencies
├── backend/               # FastAPI backend application
│   ├── main.py           # Main FastAPI application
│   ├── requirements.txt  # Python dependencies
│   └── Procfile         # Render deployment config
├── render.yaml           # Render deployment configuration
└── README.md            # This file
```

## 🔧 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=https://portfolio-tagda.onrender.com
```

### Backend
```env
HUGGINGFACE_API_KEY=your_huggingface_api_key
PORT=8000
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set environment variables
4. Deploy automatically

## 📱 Pages & Features

### 🏠 Home Page
- Hero section with animated profile
- Featured projects showcase
- Skills overview
- Call-to-action sections

### 👤 About Page
- Personal introduction
- Skills grid with icons
- Journey timeline
- Professional background

### 📄 Resume Page
- Interactive PDF viewer (desktop)
- Mobile-optimized download options
- Skills summary
- Contact information

### 💼 Projects Page
- Project showcase with details
- GitHub links
- Live demo links
- Technology stack for each project

### 💬 Contact Page
- Contact form with validation
- Email integration
- Social media links
- Professional contact information

### 🤖 AI Chatbot
- Intelligent responses about portfolio
- Real-time chat interface
- Mobile-responsive design
- Powered by Hugging Face AI

## 🎯 Key Features

- **Responsive Design**: Works on all devices and screen sizes
- **Dark/Light Mode**: Toggle between themes
- **Performance Optimized**: Fast loading and smooth animations
- **SEO Friendly**: Built-in SEO optimization
- **Accessibility**: WCAG compliant design
- **Modern UI/UX**: Clean, professional design
- **Real-time Chat**: AI-powered chatbot for visitor interaction

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- **Email**: rakshitgang23@gmail.com
- **Phone**: +91 7014518699
- **Location**: Jaipur, India
- **Website**: [devrakshit.me](https://devrakshit.me)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repository if you found it helpful !**

**Built with ❤️ by [Rakshit Jain](https://devrakshit.me)** 