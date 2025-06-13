# Deployment Guide for Render

This guide will help you deploy the Portfolio API to Render platform.

## Prerequisites

1. **GitHub Repository**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Environment Variables**: Prepare your environment variables

## Step-by-Step Deployment

### 1. Connect Your Repository

1. Log in to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub account if not already connected
4. Select your repository containing the backend code

### 2. Configure the Web Service

Fill in the following details:

- **Name**: `portfolio-backend` (or your preferred name)
- **Environment**: `Python 3`
- **Region**: Choose the closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend` (since your backend is in a subdirectory)

### 3. Build and Start Commands

- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`

### 4. Environment Variables

Add these environment variables in the Render dashboard:

```env
# Server Configuration
ENVIRONMENT=production
HOST=0.0.0.0

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://your-frontend-domain.render.com

# Email Configuration
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587

# AI Service Configuration
HUGGINGFACE_API_KEY=your-huggingface-api-key

# Python Version
PYTHON_VERSION=3.11.7
```

### 5. Advanced Settings

- **Auto-Deploy**: Enable to automatically deploy on push to main branch
- **Health Check Path**: `/health`
- **Health Check Timeout**: 180 seconds

### 6. Deploy

Click "Create Web Service" and wait for the deployment to complete.

## Post-Deployment

### 1. Verify Deployment

Once deployed, you should see:
- ✅ Build completed successfully
- ✅ Service is live
- ✅ Health check passing

### 2. Test Your API

Visit your Render URL to test:
- **API Root**: `https://your-service.onrender.com/`
- **Health Check**: `https://your-service.onrender.com/health`
- **API Docs**: `https://your-service.onrender.com/docs`

### 3. Update Frontend

Update your frontend's API base URL to point to your Render service:
```javascript
const API_BASE_URL = 'https://your-service.onrender.com';
```

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that `requirements.txt` is in the backend directory
   - Verify Python version compatibility
   - Check for any missing dependencies

2. **Service Won't Start**
   - Verify the start command is correct
   - Check environment variables are set
   - Look at the logs for specific errors

3. **Health Check Fails**
   - Ensure the `/health` endpoint is working
   - Check if the service is binding to the correct port
   - Verify the health check path is correct

4. **CORS Issues**
   - Update `CORS_ALLOWED_ORIGINS` with your frontend domain
   - Make sure to include both `http://` and `https://` versions for development

### Checking Logs

1. Go to your service in Render dashboard
2. Click on "Logs" tab
3. Look for any error messages
4. Check both build logs and runtime logs

### Environment Variable Issues

- Make sure all required environment variables are set
- Check for typos in variable names
- Verify API keys are valid
- Test email configuration locally first

## Monitoring

### Health Checks

Your API includes a health check endpoint at `/health` that returns:
```json
{
  "status": "healthy",
  "timestamp": 1234567890.123,
  "version": "2.0.0"
}
```

### Logs

Monitor your application logs in the Render dashboard:
- Build logs show installation and setup issues
- Runtime logs show application errors and requests

### Performance

- The API uses 4 Gunicorn workers for optimal performance
- WebSocket connections are properly managed
- Timeout handling prevents hanging requests

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to your repository
2. **CORS**: Only allow necessary origins
3. **API Keys**: Use environment variables for all API keys
4. **HTTPS**: Render provides HTTPS by default

## Scaling

If you need to scale your application:
1. Go to your service settings in Render
2. Adjust the instance type based on your needs
3. Monitor performance and adjust accordingly

## Cost Optimization

- Use the free tier for development and testing
- Upgrade only when you need more resources
- Monitor usage to avoid unexpected charges

## Support

If you encounter issues:
1. Check the Render documentation
2. Review your application logs
3. Test locally to isolate issues
4. Contact Render support if needed

## Next Steps

After successful deployment:
1. Update your frontend to use the new API URL
2. Test all functionality end-to-end
3. Set up monitoring and alerts
4. Consider setting up a custom domain
5. Implement CI/CD for automated deployments 