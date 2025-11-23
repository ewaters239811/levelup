# Level-Up Diagnostic

A production-ready Next.js web app for a diagnostic quiz that helps users identify their dominant pattern blocking their next level.

## Features

- **Landing Page**: Hero section with compelling copy and CTA
- **Interactive Quiz**: 10 multiple-choice questions with smooth navigation
- **Archetype Results**: Personalized results based on quiz answers
- **Dark, Cinematic Design**: Luxury aesthetic with black/dark gray background
- **Fully Responsive**: Mobile-first design that works on all devices

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **React 18**
- **Tailwind CSS**

## Getting Started

### Prerequisites

- Node.js 18+ or pnpm
- npm or pnpm package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
# or
pnpm build
pnpm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles with Tailwind
├── components/
│   ├── QuestionCard.tsx    # Quiz question component
│   ├── ProgressBar.tsx     # Progress indicator
│   └── ResultView.tsx      # Result display component
├── data/
│   ├── quizData.ts         # Quiz questions and options
│   └── archetypes.ts       # Archetype definitions
├── types/
│   └── index.ts            # TypeScript type definitions
└── constants/
    └── index.ts            # CTA URLs and constants
```

## Customization

### Update CTA Links

Edit `constants/index.ts` to change the monetization URLs:

```typescript
export const CTAS = {
  LEVEL_UP_PROTOCOL: 'https://your-url.com/level-up',
  CLARITY_CALL: 'https://your-url.com/clarity-call',
};
```

### Modify Quiz Questions

Edit `data/quizData.ts` to update questions and options.

### Update Archetypes

Edit `data/archetypes.ts` to modify archetype content, descriptions, and moves.

## Deployment

This app is ready to deploy to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy automatically

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

## License

Private project for Eli Waters.

