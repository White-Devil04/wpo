# 📁 Project Structure

```
wep-performance-optimizer/
├── 📄 README.md                 # Main documentation
├── 📄 SETUP.md                  # Quick setup guide
├── 📄 package.json              # Dependencies & scripts
├── 📄 .env.local                # Environment variables (create this!)
├── 📄 next.config.ts            # Next.js configuration
├── 📄 tailwind.config.ts        # Tailwind CSS config
├── 📄 tsconfig.json             # TypeScript config
├── 
├── 📂 src/
│   ├── 📂 app/                  # Next.js App Router
│   │   ├── 📄 layout.tsx        # Root layout
│   │   ├── 📄 page.tsx          # Main page (UI)
│   │   ├── 📄 globals.css       # Global styles
│   │   └── 📂 api/              # API routes
│   │       ├── 📂 analyze/      # Real analysis endpoint
│   │       │   └── 📄 route.ts
│   │       └── 📂 demo/         # Demo analysis endpoint
│   │           └── 📄 route.ts
│   │
│   ├── 📂 components/           # React components
│   │   ├── 📄 WebVitalsCard.tsx        # Core Web Vitals display
│   │   ├── 📄 PerformanceScores.tsx    # Performance scores
│   │   ├── 📄 ResourceAnalysisCard.tsx # Resource breakdown
│   │   ├── 📄 AIRecommendations.tsx    # AI suggestions
│   │   ├── 📄 LoadingAnalysis.tsx      # Loading state
│   │   └── 📂 ui/               # Reusable UI components
│   │       ├── 📄 button.tsx
│   │       ├── 📄 input.tsx
│   │       └── 📄 card.tsx
│   │
│   ├── 📂 lib/                  # Utility functions & services
│   │   ├── 📄 utils.ts          # Helper functions
│   │   ├── 📄 performance-analyzer.ts  # Lighthouse integration
│   │   └── 📄 ai-service.ts     # Gemini AI integration
│   │
│   └── 📂 types/                # TypeScript definitions
│       └── 📄 performance.ts    # Type definitions
│
└── 📂 public/                   # Static assets
    ├── 📄 next.svg
    ├── 📄 vercel.svg
    └── ...
```

## 🔧 Key Files to Understand

### Main Application
- **`src/app/page.tsx`** - Main UI with URL input and results display
- **`src/app/api/demo/route.ts`** - Demo endpoint with mock data
- **`src/app/api/analyze/route.ts`** - Real analysis endpoint

### Core Logic  
- **`src/lib/performance-analyzer.ts`** - Lighthouse performance testing
- **`src/lib/ai-service.ts`** - AI recommendation generation
- **`src/types/performance.ts`** - TypeScript interfaces

### UI Components
- **`src/components/WebVitalsCard.tsx`** - Shows Core Web Vitals metrics
- **`src/components/AIRecommendations.tsx`** - Displays AI suggestions
- **`src/components/LoadingAnalysis.tsx`** - Loading animation

## 🎯 How It Works

1. **User Input** → URL entered in main page
2. **API Call** → Either `/api/demo` or `/api/analyze`
3. **Analysis** → Lighthouse audit + resource analysis
4. **AI Processing** → Gemini generates recommendations
5. **Results Display** → Components render the data

## 🔄 Data Flow

```
URL Input → API Endpoint → Performance Analysis → AI Recommendations → UI Display
```

### Demo Mode Flow
```
URL → /api/demo → Mock Data → Pre-written Recommendations → Display
```

### Real Analysis Flow  
```
URL → /api/analyze → Lighthouse Audit → Gemini AI → Smart Recommendations → Display
```