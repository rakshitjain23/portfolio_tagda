# Render Environment Variables Setup

## CORS Configuration for Security

To properly secure your backend, you need to set the `CORS_ALLOWED_ORIGINS` environment variable in Render.

### Steps:

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Select your service**: `portfolio_tagda`
3. **Go to "Environment" tab**
4. **Add/Update this environment variable**:

```
CORS_ALLOWED_ORIGINS=https://devrakshit.me,https://www.devrakshit.me,https://portfolio-tagda.vercel.app,http://localhost:3000
```

### Why This is Important:

✅ **Security**: Only allows requests from your trusted domains  
✅ **Performance**: Faster than checking all origins  
✅ **Production Ready**: Follows security best practices  
❌ **No Wildcards**: Prevents unauthorized access  

### Current Security Issues with `allow_origins=["*"]`:

- 🔴 **Any website** can make requests to your API
- 🔴 **Potential CSRF attacks** from malicious sites
- 🔴 **Data leakage** to unauthorized domains
- 🔴 **Not production-ready**

### After Setting Environment Variable:

1. **Redeploy your service** in Render
2. **Test your frontend** to ensure it still works
3. **Monitor for any CORS errors**

### Test URLs:
- ✅ `https://www.devrakshit.me` (your domain)
- ✅ `https://devrakshit.me` (your domain)
- ✅ `http://localhost:3000` (local development)
- ❌ `https://malicious-site.com` (blocked) 