# Vercel Postgres Setup Guide

## 🚀 Quick Setup (3 minutes)

### Step 1: Create Vercel Postgres Database

1. Go to: https://vercel.com/dashboard
2. Click your project: `level-up-diagnostic`
3. Go to **"Storage"** tab (in left sidebar)
4. Click **"Create Database"**
5. Select **"Postgres"**
6. Choose a name: `level-up-db` (or any name)
7. Select region closest to you
8. Click **"Create"**

### Step 2: Get Connection String

1. After database is created, click on it
2. Go to **".env.local"** tab
3. You'll see: `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, etc.
4. **Copy these environment variables**

### Step 3: Add to Vercel Environment Variables

1. Go to your project → **"Settings"** → **"Environment Variables"**
2. Add these variables (from Step 2):
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL` (optional, for Prisma)
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`
3. Check all environments: **Production**, **Preview**, **Development**
4. Click **"Save"**

### Step 4: Add to Local Development

Create `.env.local` file in your project root:
```env
POSTGRES_URL=your_connection_string_here
POSTGRES_PRISMA_URL=your_prisma_url_here
POSTGRES_USER=your_user
POSTGRES_HOST=your_host
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=your_database
```

**Important**: Copy these from Vercel dashboard (Step 2)

### Step 5: Initialize Database

1. Deploy your code (or run locally)
2. Visit: `https://yourdomain.com/api/init-db`
3. You should see: `{"success":true,"message":"Database initialized successfully"}`
4. Done! The table is now created

### Step 6: Test It

1. Complete the quiz on your site
2. Enter an email
3. Visit: `https://yourdomain.com/admin`
4. You should see your email in the list!

---

## 📊 What Gets Created

The database will have a table called `emails` with:
- `id` - Auto-incrementing ID
- `email` - User's email address
- `archetype` - Their quiz result
- `created_at` - Timestamp when saved

---

## 🔍 View Your Emails

### Option 1: Admin Dashboard (Recommended)
- Visit: `https://yourdomain.com/admin`
- See all emails in a beautiful interface
- Filter by archetype
- Export as CSV
- View statistics

### Option 2: Vercel Dashboard
- Go to your project → Storage → Postgres
- Click **"Data"** tab
- View raw data in table format

### Option 3: API Endpoint
- Visit: `https://yourdomain.com/api/emails`
- Get JSON data of all emails
- Filter: `https://yourdomain.com/api/emails?archetype=UNFOCUSED_VISIONARY`

---

## 🛠️ Troubleshooting

**"Table doesn't exist" error?**
- Visit `/api/init-db` to create the table
- Check Vercel logs for errors

**Connection errors?**
- Verify environment variables are set in Vercel
- Make sure you copied the connection string correctly
- Check that database is in the same region

**No emails appearing?**
- Check Vercel logs for API errors
- Verify database is initialized (`/api/init-db`)
- Make sure environment variables are set

---

## ✅ Benefits of Vercel Postgres

- ✅ **Integrated** - Works seamlessly with Vercel
- ✅ **Fast** - Optimized for serverless
- ✅ **Secure** - Automatic backups and encryption
- ✅ **Scalable** - Handles growth automatically
- ✅ **Free tier** - 256 MB storage, perfect for starting
- ✅ **Easy queries** - Simple SQL interface

---

## 📧 Next Steps

Now you can:
- View all emails at `/admin`
- Export emails for email marketing
- Filter by archetype for targeted campaigns
- Set up automated email reminders
- Track growth with statistics

---

## 🎯 Quick Commands

**Initialize database:**
```
GET https://yourdomain.com/api/init-db
```

**Get all emails:**
```
GET https://yourdomain.com/api/emails
```

**Get emails by archetype:**
```
GET https://yourdomain.com/api/emails?archetype=UNFOCUSED_VISIONARY
```

---

## 💡 Pro Tips

1. **Backup regularly** - Vercel Postgres has automatic backups, but export CSV monthly
2. **Monitor usage** - Check Vercel dashboard for database size
3. **Use admin page** - Much easier than raw SQL queries
4. **Set up alerts** - Get notified when you hit email milestones

