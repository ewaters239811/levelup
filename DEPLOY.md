# Quick Deploy Guide

## 🚀 Fastest Way: Deploy to Vercel (Recommended)

### Option 1: Vercel CLI (2 minutes)

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - It will ask for project settings (just press Enter for defaults)
   - Your site will be live in ~1 minute!

3. **Deploy to production:**
   ```bash
   vercel --prod
   ```

That's it! You'll get a URL like: `https://your-project.vercel.app`

---

### Option 2: Vercel Web Interface (3 minutes)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Vercel:**
   - Visit: https://vercel.com
   - Click "Import Project"
   - Connect your GitHub repo
   - Vercel auto-detects Next.js and configures everything
   - Click "Deploy"

Done! Your site is live automatically.

---

## 🛠️ Alternative: Netlify (also fast)

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## ✅ What You Get

- ✅ Free HTTPS certificate
- ✅ Global CDN (fast worldwide)
- ✅ Automatic deployments on git push
- ✅ Custom domain support
- ✅ Analytics included

---

## 🎯 Production Checklist

Before deploying, make sure:
- [ ] Test the build locally: `npm run build`
- [ ] Update CTA links in `constants/index.ts` if needed
- [ ] Check analytics page works: `/analytics`

---

## 🔗 Quick Links

- Vercel Dashboard: https://vercel.com/dashboard
- Your deployed site will be: `https://your-project.vercel.app`

