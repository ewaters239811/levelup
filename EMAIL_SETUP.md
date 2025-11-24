# Email Collection Setup Guide

## ✅ What's Already Done

- Email capture form after quiz completion
- API route at `/api/subscribe` to receive emails
- Email stored in analytics (localStorage)
- Email validation and error handling

## 🔧 Next Steps: Connect to Email Service

The API route currently just logs emails. To actually store them and send reminders, choose one:

### Option 1: Resend (Recommended - Easiest)

1. **Sign up**: https://resend.com
2. **Get API key** from dashboard
3. **Install Resend**:
   ```bash
   npm install resend
   ```
4. **Update `app/api/subscribe/route.ts`**:
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // In POST function:
   await resend.emails.send({
     from: 'Elijah <onboarding@yourdomain.com>',
     to: email,
     subject: `Welcome - Your ${archetype} Results`,
     html: `<p>Thank you for taking the diagnostic...</p>`,
   });
   ```
5. **Add to `.env.local`**:
   ```
   RESEND_API_KEY=re_xxxxx
   ```

### Option 2: Database + Email Service

**Database Options:**
- **Vercel Postgres** (easiest with Vercel)
- **Supabase** (free tier available)
- **MongoDB Atlas** (free tier)

**Email Service Options:**
- **Resend** (recommended)
- **SendGrid**
- **Mailchimp**
- **ConvertKit**

### Option 3: Simple File Storage (For Testing)

Update `app/api/subscribe/route.ts`:
```typescript
import fs from 'fs';
import path from 'path';

// Save to file
const filePath = path.join(process.cwd(), 'emails.json');
const emails = JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');
emails.push({ email, archetype, timestamp });
fs.writeFileSync(filePath, JSON.stringify(emails, null, 2));
```

## 📧 Sending Reminders Based on Archetype

Once emails are stored, you can set up automated reminders:

### Using Resend + Cron Job

1. **Create reminder templates** for each archetype
2. **Set up Vercel Cron** (or use a service like Cron-job.org)
3. **Send weekly emails** based on archetype

Example reminder email structure:
```typescript
const archetypeReminders = {
  UNFOCUSED_VISIONARY: {
    subject: "Your Weekly Focus Reminder",
    content: "This week's move: Choose one main goal..."
  },
  SILENT_GRINDER: {
    subject: "Time to Claim Your Stage",
    content: "This week's move: List your top 5 wins..."
  },
  // ... etc
};
```

## 🔐 Environment Variables

Add to `.env.local`:
```
RESEND_API_KEY=your_key_here
DATABASE_URL=your_db_url (if using database)
```

## 📊 Viewing Collected Emails

- **Local**: Check browser console after quiz completion
- **Analytics Page**: Visit `/analytics` to see emails in results
- **Database**: Query your database directly
- **Email Service**: Check your Resend/SendGrid dashboard

## 🚀 Quick Start with Resend

1. Sign up at resend.com
2. Get API key
3. Run: `npm install resend`
4. Update `app/api/subscribe/route.ts` with Resend code
5. Add `RESEND_API_KEY` to Vercel environment variables
6. Deploy!

Your emails will be collected and you can send reminders based on archetype.

