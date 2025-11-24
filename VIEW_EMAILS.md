# How to View Collected Emails

## 📍 Current Email Storage

Right now, emails are stored in **3 places**:

### 1. **Analytics Page (Local Browser)**
- Visit: `https://yourdomain.com/analytics`
- Shows emails from **your local browser only**
- Each user sees their own emails
- **Note**: This is client-side only, so you won't see all users' emails here

### 2. **Vercel Logs (All Users)**
- Go to: https://vercel.com/dashboard
- Click your project → **"Logs"** tab
- Look for: `📧 New subscription:` entries
- **This shows ALL emails from all users!**

### 3. **Exported JSON Data**
- Go to `/analytics` page
- Click **"Export Data"** button
- Download JSON file with all emails (from your browser)

---

## 🔍 View Emails in Vercel Logs

**Step-by-step:**
1. Go to https://vercel.com/dashboard
2. Click on your project: `level-up-diagnostic`
3. Click **"Logs"** in the top menu
4. Filter or search for: `📧 New subscription`
5. You'll see entries like:
   ```
   📧 New subscription: { email: 'user@example.com', archetype: 'UNFOCUSED_VISIONARY', timestamp: '...' }
   ```

---

## 🚀 Better Solution: Set Up Database

To see all emails in one place, you need to:

### Option 1: Vercel Postgres (Easiest)
1. Go to Vercel Dashboard → Your Project → Storage
2. Create a Postgres database
3. Update `app/api/subscribe/route.ts` to save emails
4. Create an admin page to view them

### Option 2: Supabase (Free)
1. Sign up at supabase.com
2. Create a table: `emails` with columns: `email`, `archetype`, `created_at`
3. Update API route to save to Supabase
4. View in Supabase dashboard

### Option 3: Google Sheets (Quick & Easy)
1. Use Google Sheets API
2. Save emails directly to a spreadsheet
3. View in Google Sheets

---

## 📧 Quick Access Right Now

**To see emails from all users:**
1. **Vercel Logs** (best option currently)
   - Dashboard → Project → Logs
   - Search for "New subscription"

**To see emails from your browser:**
1. **Analytics Page**
   - Visit `/analytics`
   - Scroll to "Email List" section
   - Copy emails individually

---

## 💡 Recommended Next Step

Set up **Vercel Postgres** or **Supabase** to:
- Store all emails in one database
- View them in a dashboard
- Export as CSV
- Set up email reminders based on archetype

Would you like me to set up database storage for emails?

