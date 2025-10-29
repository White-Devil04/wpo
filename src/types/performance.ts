export interface WebVitalsData {
  url: string;
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  timestamp: string;
}

export interface ResourceAnalysis {
  totalSize: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
  htmlSize: number;
  requests: number;
  unusedCss: number;
  unusedJs: number;
  compressionRatio: number;
}

export interface PerformanceInsights {
  opportunities: Array<{
    title: string;
    description: string;
    savings: string;
    impact: 'high' | 'medium' | 'low';
  }>;
  diagnostics: Array<{
    title: string;
    description: string;
    value: string;
  }>;
}

export interface AIRecommendation {
  summary: string;
  criticalIssues: Array<{
    issue: string;
    impact: string;
    solution: string;
    expectedImprovement: string;
  }>;
  optimizations: Array<{
    category: string;
    recommendation: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    expectedGain: string;
  }>;
  priorityActions: string[];
}

export interface AnalysisResult {
  webVitals: WebVitalsData;
  resources: ResourceAnalysis;
  insights: PerformanceInsights;
  aiRecommendations: AIRecommendation;
}