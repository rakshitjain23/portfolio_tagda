# 🚀 Rakshit Jain - Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and experience as a Full Stack Developer. Built with Next.js, TypeScript, and Next.js API routes.

## 🌐 Live Demo

- **Website**: [devrakshit.me](https://devrakshit.me)

## ✨ Features

### 🎨 Next.js Application
- **Modern Design**: Clean, responsive UI with dark/light mode
- **Interactive Elements**: Smooth animations with Framer Motion
- **AI Chatbot**: Intelligent chatbot powered by Google Gemini AI
- **Contact Form**: Email integration using Nodemailer
- **API Routes**: Server-side functionality with Next.js API routes
- **Responsive Layout**: Works perfectly on all devices
- **SEO Optimized**: Built-in SEO and performance optimization
- **TypeScript**: Full type safety and better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Nodemailer
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rakshitjain23/portfolio_tagda.git
   cd portfolio_tagda
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file with your API keys
   # See ENVIRONMENT_SETUP.md for details
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Application will be available at `http://localhost:3000`

## 📁 Project Structure

```
portfolio_tagda/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages and API routes
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About page
│   │   ├── resume/         # Resume page
│   │   ├── projects/       # Projects page
│   │   ├── contact/        # Contact page
│   │   └── api/            # API routes
│   │       ├── contact/    # Contact form API
│   │       └── chat/       # AI chatbot API
│   ├── components/         # Reusable React components
│   │   ├── layout/         # Layout components (Navbar, etc.)
│   │   ├── chatbot.tsx     # AI Chatbot component
│   │   └── ...            # Other components
│   ├── public/            # Static assets
│   │   ├── profile.jpg    # Profile image
│   │   └── resume.pdf     # Resume file
│   ├── ENVIRONMENT_SETUP.md # Environment variables guide
│   └── DEPLOYMENT.md    # Vercel deployment guide
│   └── package.json       # Dependencies
└── README.md              # This file
```

## 🔧 Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# AI Chatbot Configuration
GEMINI_API_KEY=your-gemini-api-key
```

See `ENVIRONMENT_SETUP.md` for detailed setup instructions.

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password
   - `GEMINI_API_KEY`: Your Google Gemini API key
3. Deploy automatically on push to main branch

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
- **AI Chatbot**: Portfolio-specific AI assistant powered by Google Gemini

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