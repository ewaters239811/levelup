# Resend Email Setup Guide

## Overview
This app uses Resend to send quiz results and intro class lessons to users via email.

## Setup Steps

### 1. Create a Resend Account
1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email address

### 2. Get Your API Key
1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Name it (e.g., "Level-Up Diagnostic")
4. Copy the API key (starts with `re_`)

### 3. Set Up Domain (Optional but Recommended)
For production, you should verify your domain:
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Follow the DNS verification steps
4. Once verified, you can use emails like `noreply@yourdomain.com`

For testing, you can use the default `onboarding@resend.dev` domain.

### 4. Add Environment Variables

#### Local Development (.env.local)
Create or update `.env.local` in your project root:
```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Level-Up Diagnostic <onboarding@resend.dev>
```

Or if you verified a domain:
```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Level-Up Diagnostic <noreply@yourdomain.com>
```

#### Vercel Production
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add:
   - `RESEND_API_KEY` = your Resend API key
   - `RESEND_FROM_EMAIL` = your sender email (e.g., `Level-Up Diagnostic <noreply@yourdomain.com>`)

### 5. Test the Email
1. Complete the quiz
2. Enter your email
3. Check your inbox for the results email

## Email Content
The email includes:
- Archetype name and tagline
- Full description
- What's holding you back (main blocks)
- This week's moves (action items)
- Scripture for reflection
- Complete Intro Class (all 3 lessons with reflection questions and daily practices)

## Troubleshooting

### Email not sending?
1. Check that `RESEND_API_KEY` is set in environment variables
2. Check Vercel logs for error messages
3. Verify your Resend account has available credits
4. Check spam folder

### "Invalid API key" error?
- Make sure the API key starts with `re_`
- Verify it's copied correctly (no extra spaces)
- Check that it's set in the correct environment (local vs production)

### "Domain not verified" error?
- Use `onboarding@resend.dev` for testing
- Or verify your domain in Resend dashboard

## Free Tier Limits
- 100 emails per day
- 3,000 emails per month
- Perfect for getting started!

## Upgrade
If you need more:
- Pro: $20/month - 50,000 emails/month
- Business: Custom pricing

Visit https://resend.com/pricing for details.

