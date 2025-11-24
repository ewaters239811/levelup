# Vercel Environment Variables Setup

## Quick Setup Instructions

### Add OpenAI API Key to Vercel:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (levelup)
3. Click on **Settings** in the top navigation
4. Click on **Environment Variables** in the left sidebar
5. Click **Add New** or **Add** button
6. Add the following:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `[Your OpenAI API Key]` (paste your API key here)
   - **Environment**: Select all three:
     - ☑ Production
     - ☑ Preview
     - ☑ Development
7. Click **Save**
8. **Important**: After adding the environment variable, you need to redeploy:
   - Go to **Deployments** tab
   - Click the **⋯** (three dots) on the latest deployment
   - Click **Redeploy**
   - Or make a small commit and push to trigger a new deployment

### Alternative: Using Vercel CLI

```bash
vercel env add OPENAI_API_KEY
# Paste your API key when prompted
# Select all environments (Production, Preview, Development)
```

Then redeploy:
```bash
vercel --prod
```

## Verify It's Working

After deployment:
1. Complete the quiz including question 11 (open-ended)
2. Check the results page
3. You should see the "Your Personal Reflection" section with AI interpretation
4. If you see an error message about the API key, check the Vercel deployment logs

## Security Note

⚠️ **Never commit your API keys to Git!** They are stored in `.env.local` which is already in `.gitignore`.

