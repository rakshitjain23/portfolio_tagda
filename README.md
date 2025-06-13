# Portfolio Project

A full-stack portfolio application with FastAPI backend and Next.js frontend.

## 🚀 Quick Deploy to Render

### Backend Deployment
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `rakshitjain23/portfolio_tagda`
4. Configure the service:
   - **Name**: `portfolio-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Python Version**: `3.11.7`

### Frontend Deployment
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository: `rakshitjain23/portfolio_tagda`
4. Configure the service:
   - **Name**: `portfolio-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/out`

## 🛠️ Local Development

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
portfolio_tagda/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── runtime.txt          # Python version
│   └── Procfile            # Render deployment config
├── frontend/
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── package.json        # Node.js dependencies
│   └── next.config.ts      # Next.js configuration
├── render.yaml             # Render deployment config
└── README.md              # This file
```

## 🔧 Environment Variables

### Backend
- `PORT`: Server port (set by Render)
- `PYTHON_VERSION`: Python version (3.11.7)

### Frontend
- `NEXT_PUBLIC_API_URL`: Backend API URL

## 📝 Features

- **Backend**: FastAPI with modern Python dependencies
- **Frontend**: Next.js with TypeScript
- **Deployment**: Ready for Render deployment
- **CI/CD**: Automated deployment via GitHub integration

## 🚀 Deployment Status

✅ Backend: Ready for Render deployment  
✅ Frontend: Ready for Render deployment  
✅ Dependencies: All configured  
✅ Configuration: render.yaml included  

Your portfolio is now ready to deploy on Render! 