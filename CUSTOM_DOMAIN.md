# Custom Domain Setup Guide

## ✅ Your Site is Already Public!

If you can access it via the Vercel link, it's already public. The default Vercel domain is public by default.

---

## 🌐 Add a Custom Domain

### Step 1: Get a Domain Name

If you don't have one yet, buy from:
- **Namecheap** (recommended): https://www.namecheap.com
- **Google Domains**: https://domains.google
- **Cloudflare**: https://www.cloudflare.com/products/registrar
- **GoDaddy**: https://www.godaddy.com

---

### Step 2: Add Domain in Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Click on your project: `level-up-diagnostic`

2. **Go to Settings:**
   - Click **"Settings"** tab
   - Click **"Domains"** in the left sidebar

3. **Add Your Domain:**
   - Enter your domain (e.g., `levelupdiagnostic.com` or `www.levelupdiagnostic.com`)
   - Click **"Add"**
   - Vercel will show you DNS records to configure

---

### Step 3: Configure DNS Records

Vercel will show you something like:

**For Root Domain (levelupdiagnostic.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW (www.levelupdiagnostic.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Or use Vercel's nameservers:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

---

### Step 4: Update DNS at Your Registrar

1. **Log into your domain registrar** (Namecheap, GoDaddy, etc.)
2. **Go to DNS Management**
3. **Add the records Vercel provided:**
   - Add A record for root domain
   - Add CNAME record for www
   - OR change nameservers to Vercel's

4. **Save changes**

---

### Step 5: Wait for Propagation

- DNS changes take **15 minutes to 48 hours** to propagate
- Vercel will show "Valid Configuration" when ready
- You'll get an email when it's active

---

## 🔒 SSL Certificate

- Vercel **automatically** provides free SSL certificates
- HTTPS will work automatically once DNS is configured
- No additional setup needed!

---

## 📝 Quick Commands

**Check your domains:**
```bash
vercel domains ls
```

**Add domain via CLI:**
```bash
vercel domains add yourdomain.com
```

---

## 🎯 Common Domain Options

**Free subdomain options:**
- Use Vercel's default: `your-project.vercel.app` (already working!)
- Free subdomain services (not recommended for production)

**Paid custom domains:**
- `.com` - ~$10-15/year
- `.io` - ~$30-40/year  
- `.co` - ~$20-30/year

---

## ✅ Verification

Once configured:
- Your site will be accessible at your custom domain
- HTTPS will work automatically
- Both `yourdomain.com` and `www.yourdomain.com` will work

---

## 🆘 Troubleshooting

**Domain not working?**
1. Check DNS propagation: https://dnschecker.org
2. Verify records in Vercel dashboard
3. Wait 24-48 hours for full propagation
4. Contact Vercel support if issues persist

