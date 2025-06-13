# Render Environment Variables Setup

## 🚨 IMMEDIATE FIX NEEDED

Your chatbot and contact form are not working because the CORS environment variable in Render is overriding our code.

## 🔧 Quick Fix Steps:

### Step 1: Set Environment Variable in Render
1. **Go to**: https://dashboard.render.com
2. **Click on your service**: `portfolio_tagda`
3. **Go to "Environment" tab**
4. **Find**: `CORS_ALLOWED_ORIGINS` (if it exists, delete it)
5. **Add new environment variable**:
   - **Key**: `CORS_ALLOWED_ORIGINS`
   - **Value**: `https://devrakshit.me,https://www.devrakshit.me,https://portfolio-tagda.vercel.app,http://localhost:3000`

### Step 2: Redeploy
1. **Go to "Manual Deploy" tab**
2. **Click "Deploy latest commit"**
3. **Wait for deployment to complete** (2-3 minutes)

### Step 3: Test
1. **Visit**: https://www.devrakshit.me
2. **Test chatbot** and contact form
3. **Should work immediately**

## 🔒 Security Configuration

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

## 🎯 What to Do Right Now:

1. **Follow Step 1** above to set the environment variable
2. **Redeploy** your service
3. **Test** your site
4. **Let me know** if it works, then I'll secure the code properly 