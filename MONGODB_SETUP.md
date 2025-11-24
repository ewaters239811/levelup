# MongoDB Setup Guide

## 🚀 Quick Setup (5 minutes)

### Option 1: MongoDB Atlas (Recommended - Free Cloud)

#### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Choose: **"Build a database"** → **"M0 FREE"** (Free tier)

#### Step 2: Create Cluster

1. Choose **Cloud Provider**: AWS (or any)
2. Choose **Region**: Closest to you
3. Click **"Create"** (takes 3-5 minutes)

#### Step 3: Create Database User

1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `levelup-user` (or any)
5. Password: Generate secure password (save it!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

#### Step 4: Whitelist IP Address

1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for now, or add specific IPs)
4. Click **"Confirm"**

#### Step 5: Get Connection String

1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. **Copy the connection string** - looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace** `<username>` and `<password>` with your database user credentials
7. **Add database name** at the end (use `userdata`):
   ```
   mongodb+srv://levelup-user:yourpassword@cluster0.xxxxx.mongodb.net/userdata?retryWrites=true&w=majority
   ```

#### Step 6: Add to Vercel

1. Go to: https://vercel.com/dashboard
2. Click your project → **"Settings"** → **"Environment Variables"**
3. Add:
   - **Name**: `MONGODB_URI`
   - **Value**: Your full connection string (from Step 5)
   - **Environment**: Production, Preview, Development (check all)
4. Click **"Save"**

#### Step 7: Add to Local Development

Create `.env.local` file:
```env
MONGODB_URI=mongodb+srv://levelup-user:yourpassword@cluster0.xxxxx.mongodb.net/userdata?retryWrites=true&w=majority
```

#### Step 8: Deploy

```bash
git add .
git commit -m "Add MongoDB integration"
git push
```

---

### Option 2: MongoDB Local (For Development Only)

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Connection string: `mongodb://localhost:27017/level-up-diagnostic`
4. Add to `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/level-up-diagnostic
   ```

---

## 📊 What Gets Created

MongoDB will automatically create:
- **Database**: `userdata` (or use your existing one)
- **Collection**: `emails`

Each document will have:
- `_id`: Auto-generated unique ID
- `email`: User's email address
- `archetype`: Their quiz result
- `created_at`: Timestamp when saved

---

## 🔍 View Your Emails

### Option 1: Admin Dashboard (Recommended)
- Visit: `https://yourdomain.com/admin`
- See all emails in a beautiful interface
- Filter by archetype
- Export as CSV
- View statistics

### Option 2: MongoDB Atlas Dashboard
- Go to: https://cloud.mongodb.com
- Click your cluster → **"Browse Collections"**
- View raw data in MongoDB Compass-like interface

### Option 3: API Endpoint
- Visit: `https://yourdomain.com/api/emails`
- Get JSON data of all emails
- Filter: `https://yourdomain.com/api/emails?archetype=UNFOCUSED_VISIONARY`

---

## ✅ MongoDB Atlas Free Tier

**What you get:**
- ✅ 512 MB storage (plenty for emails)
- ✅ Shared cluster (perfect for your needs)
- ✅ Free forever
- ✅ Automatic backups
- ✅ Global clusters
- ✅ No credit card required

**Limits:**
- 512 MB storage (~500,000+ emails)
- Shared resources (fine for your scale)

---

## 🛠️ Troubleshooting

**Connection errors?**
- Verify connection string is correct
- Check username/password are correct
- Make sure IP is whitelisted in Network Access
- Verify database name is in connection string

**"Database not found"?**
- MongoDB creates databases automatically on first write
- Just use the app - it will create the database/collection

**Environment variable not working?**
- Make sure it's set in Vercel (not just local)
- Redeploy after adding environment variable
- Check variable name is exactly `MONGODB_URI`

---

## 💡 Pro Tips

1. **Use MongoDB Atlas** - Free, cloud-hosted, no setup needed
2. **Save connection string securely** - Don't commit to git
3. **Use admin dashboard** - Much easier than raw queries
4. **Monitor usage** - Check Atlas dashboard for storage
5. **Set up alerts** - Get notified when approaching limits

---

## 🎯 Quick Test

1. Complete the quiz on your site
2. Enter an email
3. Visit: `https://yourdomain.com/admin`
4. You should see your email in the list!

---

## 📧 Next Steps

Now you can:
- View all emails at `/admin`
- Export emails for email marketing
- Filter by archetype for targeted campaigns
- Set up automated email reminders
- Track growth with statistics

