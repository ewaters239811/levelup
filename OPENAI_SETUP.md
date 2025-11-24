# OpenAI API Setup

This app uses OpenAI's API to interpret the open-ended question (question 11) and provide personalized insights.

## Setup Instructions

1. **Get an OpenAI API Key**
   - Go to https://platform.openai.com/api-keys
   - Sign up or log in to your OpenAI account
   - Click "Create new secret key"
   - Copy the API key (you won't be able to see it again)

2. **Add to Vercel Environment Variables**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add a new variable:
     - **Key**: `OPENAI_API_KEY`
     - **Value**: Your OpenAI API key (paste the key you copied)
     - **Environment**: Production, Preview, Development (select all)
   - Click "Save"

3. **Add to Local Development (Optional)**
   - Create or update `.env.local` in the project root:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## How It Works

- When users complete question 11 (the open-ended question), their answer is sent to `/api/interpret-answer`
- The API uses OpenAI's `gpt-4o-mini` model to analyze the answer
- It extracts:
  - **goal**: What they want to improve
  - **blockage**: What usually stops them
  - **desired_feelings**: Emotions they expect to feel
  - **truth_reflection**: Reminder about embodying desired feelings now
  - **integration_step**: One action they can take today
- The interpretation is displayed in the results section

## Cost Considerations

- Uses `gpt-4o-mini` model (cost-effective)
- Each interpretation costs approximately $0.0001-0.0003 per request
- For 1000 users per month: ~$0.10-0.30

## Fallback Behavior

If the `OPENAI_API_KEY` is not configured:
- The quiz still works normally
- Users get their archetype results
- The AI interpretation section simply won't appear

