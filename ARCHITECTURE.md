# Level-Up Diagnostic - App Architecture

## 📁 Project Structure

```
Webapp/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main landing/quiz/result page (SPA)
│   ├── layout.tsx                # Root layout with font setup
│   ├── globals.css                # Global styles & Tailwind
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard (localStorage viewer)
│   ├── analytics/
│   │   └── page.tsx              # Analytics dashboard (localStorage viewer)
│   └── api/                      # API routes (currently empty/unused)
│
├── components/                    # React components
│   ├── QuestionCard.tsx          # Individual quiz question UI
│   ├── ProgressBar.tsx            # Quiz progress indicator
│   ├── ResultView.tsx             # Archetype result display
│   └── EmailCapture.tsx           # Email collection form
│
├── data/                          # Static data files
│   ├── quizData.ts               # 10 quiz questions & options
│   └── archetypes.ts              # 4 archetype definitions
│
├── lib/                           # Utility functions
│   └── analytics.ts               # localStorage management
│
├── types/                         # TypeScript definitions
│   └── index.ts                  # Type definitions (ArchetypeKey, etc.)
│
└── constants/                     # App constants
    └── index.ts                  # Placeholder constants
```

---

## 🏗️ Architecture Overview

### **Tech Stack**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState)
- **Storage**: Browser localStorage (client-side only)
- **Deployment**: Vercel

---

## 🔄 Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    LANDING PAGE (/)
│  ┌───────────────────────────────────────────────────────┐  │
│  │  • Badge: "Elijah Presents"                          │  │
│  │  • Headline: "What's Really Blocking Your Next      │  │
│  │    Level?"                                           │  │
│  │  • CTA: "Take the Diagnostic"                       │  │
│  └───────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    QUIZ SECTION (Same Page)
│  ┌───────────────────────────────────────────────────────┐  │
│  │  State: 'quiz'                                       │  │
│  │  • ProgressBar (Question X of 10)                   │  │
│  │  • QuestionCard (one question at a time)            │  │
│  │  • Next/Back buttons                                │  │
│  │  • Answers stored in state: Record<number, string>  │  │
│  └───────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼ (After 10 questions)
┌─────────────────────────────────────────────────────────────┐
│              RESULT CALCULATION (Client-side)
│  ┌───────────────────────────────────────────────────────┐  │
│  │  1. Count archetype votes from answers              │  │
│  │  2. Find dominant archetype (highest count)         │  │
│  │  3. Set state: 'email' (show email capture)        │  │
│  └───────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              EMAIL CAPTURE (Same Page)
│  ┌───────────────────────────────────────────────────────┐  │
│  │  State: 'email'                                      │  │
│  │  • EmailCapture component                            │  │
│  │  • Email validation                                 │  │
│  │  • Optional: User can skip                          │  │
│  └───────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              RESULT DISPLAY (Same Page)
│  ┌───────────────────────────────────────────────────────┐  │
│  │  State: 'result'                                    │  │
│  │  • ResultView component                             │  │
│  │  • Archetype name, tagline, description            │  │
│  │  • Main blocks (what's holding back)               │  │
│  │  • Weekly moves (action items)                     │  │
│  │  • Bible verses                                    │  │
│  │  • Data saved to localStorage via analytics.ts     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 Component Hierarchy

```
app/page.tsx (Home)
│
├── Landing Section
│   └── CTA Button → handleStartQuiz()
│
├── Quiz Section (conditional: state === 'quiz')
│   ├── ProgressBar
│   │   └── Props: currentQuestionIndex, totalQuestions
│   │
│   └── QuestionCard
│       └── Props: question, selectedAnswer, onSelect, onNext, onBack
│
├── Email Capture (conditional: state === 'email')
│   └── EmailCapture
│       └── Props: archetype, onSubmit, onSkip
│
└── Result Section (conditional: state === 'result')
    └── ResultView
        └── Props: archetype, email
```

---

## 📊 State Management

### **Main App State** (`app/page.tsx`)
```typescript
type AppState = 'landing' | 'quiz' | 'email' | 'result';

state: AppState                    // Current app phase
currentQuestionIndex: number        // Which question (0-9)
answers: Record<number, string>     // Question ID → Option ID
result: ArchetypeKey | null         // Calculated archetype
userEmail: string                  // Collected email
```

### **Data Flow**
1. **Quiz Data**: Static import from `data/quizData.ts`
2. **Archetype Data**: Static import from `data/archetypes.ts`
3. **User Answers**: Stored in React state
4. **Result Calculation**: Client-side algorithm
5. **Persistence**: Saved to localStorage via `lib/analytics.ts`

---

## 💾 Data Storage (localStorage)

### **Storage Key**: `level-up-diagnostic-results`

### **Data Structure**:
```typescript
interface QuizResult {
  archetype: string;              // ArchetypeKey
  timestamp: number;               // Date.now()
  date: string;                   // ISO string
  answers: Record<number, string>; // Question ID → Option ID
  email?: string;                 // Optional email
}
```

### **Functions** (`lib/analytics.ts`):
- `saveResult()` - Save quiz result + email
- `getResults()` - Get all results
- `getArchetypeCounts()` - Count by archetype
- `exportResults()` - Export as JSON
- `clearResults()` - Clear all data

---

## 🗂️ Data Files

### **quizData.ts**
- **Type**: `Question[]`
- **Content**: 10 questions, each with 4 options
- **Mapping**: Each option maps to an `ArchetypeKey`

### **archetypes.ts**
- **Type**: `Record<ArchetypeKey, Archetype>`
- **Content**: 4 archetype definitions
- **Fields**: name, tagline, description, mainBlocks, weeklyMoves, bibleVerses

### **Types** (`types/index.ts`)
```typescript
type ArchetypeKey = 
  | 'UNFOCUSED_VISIONARY'
  | 'SILENT_GRINDER'
  | 'OVERGIVER'
  | 'CAGED_POTENTIAL';
```

---

## 🛣️ Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `app/page.tsx` | Main SPA (landing → quiz → email → result) |
| `/admin` | `app/admin/page.tsx` | View emails from localStorage |
| `/analytics` | `app/analytics/page.tsx` | View quiz analytics from localStorage |

---

## 🎨 Styling Architecture

### **Tailwind CSS Configuration**
- **Theme**: Dark, tech/fashion/traders aesthetic
- **Colors**: Black (#0a0a0a), neutral grays, cyan accents
- **Font**: Inter (via Next.js font optimization)
- **Responsive**: Mobile-first design

### **Global Styles** (`app/globals.css`)
- Tailwind directives
- Custom base styles
- Dark theme variables

---

## 🔐 Environment Variables

Currently **none required** (localStorage-only).

Previously used:
- `MONGODB_URI` (removed - no longer needed)

---

## 📦 Dependencies

### **Production**
- `next` - Next.js framework
- `react` - React library
- `react-dom` - React DOM renderer

### **Development**
- `typescript` - TypeScript compiler
- `tailwindcss` - CSS framework
- `@types/*` - TypeScript type definitions

---

## 🚀 Deployment

- **Platform**: Vercel
- **Build Command**: `npm run build`
- **Output**: `.next` directory
- **Auto-deploy**: On git push to `main` branch

---

## 🔍 Key Features

1. **Single Page Application (SPA)**
   - All phases on one page
   - Smooth scrolling transitions
   - No page reloads

2. **Client-Side Only**
   - No backend required
   - All data in browser localStorage
   - No API calls (MongoDB removed)

3. **Type Safety**
   - Full TypeScript coverage
   - Strict type checking
   - Type definitions for all data structures

4. **Analytics**
   - Local storage tracking
   - Archetype distribution
   - Email collection (optional)

5. **Responsive Design**
   - Mobile-first approach
   - Works on all screen sizes
   - Modern, clean UI

---

## 🔄 Data Flow Diagram

```
User Input
    │
    ▼
[Quiz Questions] → [User Answers] → [State: answers]
    │                                      │
    │                                      ▼
    └──────────────────────────→ [Calculate Result]
                                              │
                                              ▼
                                    [Dominant Archetype]
                                              │
                                              ▼
                                    [Email Capture]
                                              │
                                              ▼
                                    [Save to localStorage]
                                              │
                                              ▼
                                    [Display Result]
```

---

## 📝 Notes

- **No Authentication**: Public access, no user accounts
- **No Database**: All data stored in browser localStorage
- **No API Routes**: Currently unused (empty directories remain)
- **Client-Side Calculation**: Result computed in browser
- **Static Data**: Quiz questions and archetypes are hard-coded

---

## 🎯 Future Enhancements (Not Implemented)

- Server-side email storage
- User authentication
- Multi-device sync
- Email notifications
- Analytics dashboard with charts
- A/B testing for questions

