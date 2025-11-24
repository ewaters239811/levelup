# Google Sheets Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com
2. Click **"Select a project"** → **"New Project"**
3. Name it: `Level-Up Diagnostic` (or any name)
4. Click **"Create"**

### Step 2: Enable Google Sheets API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for: **"Google Sheets API"**
3. Click on it → Click **"Enable"**

### Step 3: Create Service Account

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Name it: `sheets-service` (or any name)
4. Click **"Create and Continue"**
5. Skip role assignment → Click **"Done"**

### Step 4: Create Key

1. Click on your new service account
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Choose **JSON**
5. Click **"Create"** → File downloads automatically

### Step 5: Create Google Sheet

1. Go to: https://sheets.google.com
2. Create a new blank spreadsheet
3. Name it: `Level-Up Diagnostic Emails` (or any name)
4. **Copy the Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
   The `SHEET_ID_HERE` is what you need!

### Step 6: Share Sheet with Service Account

1. In your Google Sheet, click **"Share"** button (top right)
2. **Paste the service account email** (from the JSON file, it's the `client_email` field)
3. Give it **"Editor"** permission
4. Click **"Send"** (you can uncheck "Notify people")

### Step 7: Add Environment Variables

1. **Get the JSON key file** you downloaded in Step 4
2. **Copy the entire contents** of that JSON file

3. **Add to Vercel:**
   - Go to: https://vercel.com/dashboard
   - Click your project → **"Settings"** → **"Environment Variables"**
   - Add:
     - **Name**: `GOOGLE_SERVICE_ACCOUNT_KEY`
     - **Value**: Paste the entire JSON file contents
     - **Environment**: Production, Preview, Development (check all)
   - Add:
     - **Name**: `GOOGLE_SHEET_ID`
     - **Value**: Your sheet ID from Step 5
     - **Environment**: Production, Preview, Development (check all)

4. **For local development**, create `.env.local`:
   ```env
   GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
   GOOGLE_SHEET_ID=your_sheet_id_here
   ```

### Step 8: Deploy

1. Push your changes:
   ```bash
   git add .
   git commit -m "Add Google Sheets integration"
   git push
   ```

2. Vercel will automatically deploy
3. Test by taking the quiz and entering an email
4. Check your Google Sheet - you should see the email appear!

---

## 📊 What Gets Saved

Each row in your sheet will have:
- **Date**: When the quiz was completed
- **Email**: User's email address
- **Archetype**: Their result (UNFOCUSED_VISIONARY, SILENT_GRINDER, etc.)
- **Timestamp**: ISO timestamp

---

## 🔍 View Your Emails

1. Go to your Google Sheet
2. You'll see all emails in real-time as users complete the quiz
3. You can:
   - Sort by archetype
   - Filter by date
   - Export as CSV
   - Create charts and analytics

---

## 🛠️ Troubleshooting

**Emails not appearing?**
- Check Vercel logs for errors
- Verify service account email has Editor access to sheet
- Make sure environment variables are set in Vercel
- Check that Sheet ID is correct

**Permission errors?**
- Make sure you shared the sheet with the service account email
- Verify the service account has Editor (not Viewer) permission

**API errors?**
- Make sure Google Sheets API is enabled
- Check that the JSON key file is valid
- Verify environment variables are set correctly

---

## ✅ Test It

1. Complete the quiz on your live site
2. Enter an email
3. Check your Google Sheet
4. You should see the email appear within seconds!

---

## 📧 Next Steps

Now you can:
- View all emails in one place (Google Sheets)
- Export emails for email marketing
- Filter by archetype to send targeted reminders
- Create charts to see archetype distribution
- Set up Google Apps Script for automated emails

