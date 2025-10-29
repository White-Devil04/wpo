import { GoogleGenerativeAI } from '@google/generative-ai';
import { WebVitalsData, ResourceAnalysis, PerformanceInsights, AIRecommendation } from '@/types/performance';

export class AIRecommendationService {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateRecommendations(
    webVitals: WebVitalsData,
    resources: ResourceAnalysis,
    insights: PerformanceInsights
  ): Promise<AIRecommendation> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = this.buildPrompt(webVitals, resources, insights);

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseAIResponse(text);
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      return this.getFallbackRecommendations(webVitals, resources);
    }
  }

  private buildPrompt(
    webVitals: WebVitalsData,
    resources: ResourceAnalysis,
    insights: PerformanceInsights
  ): string {
    return `
You are a web performance expert. Analyze the following website performance data and provide human-friendly recommendations that a non-technical person can understand.

WEBSITE: ${webVitals.url}

PERFORMANCE SCORES:
- Performance: ${webVitals.performanceScore}/100
- Accessibility: ${webVitals.accessibilityScore}/100
- Best Practices: ${webVitals.bestPracticesScore}/100
- SEO: ${webVitals.seoScore}/100

WEB VITALS (Loading Speed Metrics):
- First Contentful Paint (FCP): ${Math.round(webVitals.fcp)}ms (How fast content appears)
- Largest Contentful Paint (LCP): ${Math.round(webVitals.lcp)}ms (How fast main content loads)
- First Input Delay (FID): ${Math.round(webVitals.fid)}ms (How responsive the site is)
- Cumulative Layout Shift (CLS): ${webVitals.cls.toFixed(3)} (How stable the layout is)
- Time to First Byte (TTFB): ${Math.round(webVitals.ttfb)}ms (How fast server responds)

RESOURCE ANALYSIS:
- Total page size: ${Math.round(resources.totalSize / 1024)}KB
- JavaScript size: ${Math.round(resources.jsSize / 1024)}KB
- CSS size: ${Math.round(resources.cssSize / 1024)}KB
- Images size: ${Math.round(resources.imageSize / 1024)}KB
- Number of requests: ${resources.requests}

IDENTIFIED OPPORTUNITIES:
${insights.opportunities.map(opp => `- ${opp.title}: ${opp.description} (Potential savings: ${opp.savings})`).join('\n')}

Please provide recommendations in this EXACT JSON format:
{
  "summary": "A brief, easy-to-understand summary of the website's performance status",
  "criticalIssues": [
    {
      "issue": "Name of the critical issue",
      "impact": "How this affects user experience in simple terms",
      "solution": "What needs to be done in non-technical language",
      "expectedImprovement": "Expected performance improvement as percentage"
    }
  ],
  "optimizations": [
    {
      "category": "Images/Speed/Mobile/etc.",
      "recommendation": "Specific actionable recommendation in simple terms",
      "difficulty": "Easy/Medium/Hard",
      "expectedGain": "Expected improvement with percentage"
    }
  ],
  "priorityActions": [
    "Top 3-5 most important actions to take first"
  ]
}

Focus on:
1. Making recommendations understandable for non-technical users
2. Providing specific percentage improvements where possible
3. Prioritizing actions by impact and ease of implementation
4. Explaining WHY each optimization matters for user experience
`;
  }

  private parseAIResponse(response: string): AIRecommendation {
    try {
      // Extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
    }

    // Fallback parsing
    return {
      summary: "AI analysis completed. The website has some performance optimization opportunities.",
      criticalIssues: [
        {
          issue: "Performance needs improvement",
          impact: "Users may experience slower loading times",
          solution: "Optimize images and reduce file sizes",
          expectedImprovement: "20-30% faster loading"
        }
      ],
      optimizations: [
        {
          category: "Images",
          recommendation: "Compress and optimize images",
          difficulty: "Easy",
          expectedGain: "15-25% faster loading"
        }
      ],
      priorityActions: [
        "Optimize images",
        "Minimize CSS and JavaScript files",
        "Enable compression"
      ]
    };
  }

  private getFallbackRecommendations(
    webVitals: WebVitalsData,
    resources: ResourceAnalysis
  ): AIRecommendation {
    const issues = [];
    const optimizations = [];

    // Analyze performance score
    if (webVitals.performanceScore < 50) {
      issues.push({
        issue: "Poor website performance",
        impact: "Users will experience slow loading and may leave your site",
        solution: "Optimize images, reduce file sizes, and improve server response time",
        expectedImprovement: "30-50% performance improvement possible"
      });
    }

    // Analyze LCP
    if (webVitals.lcp > 2500) {
      optimizations.push({
        category: "Loading Speed",
        recommendation: "Optimize your largest images and content to load faster",
        difficulty: "Medium" as const,
        expectedGain: "20-40% faster content display"
      });
    }

    // Analyze resource sizes
    if (resources.imageSize > 500000) { // 500KB
      optimizations.push({
        category: "Images",
        recommendation: "Compress images and use modern formats like WebP",
        difficulty: "Easy" as const,
        expectedGain: "25-50% reduction in image load time"
      });
    }

    return {
      summary: `Your website scored ${webVitals.performanceScore}/100 for performance. There are opportunities to make it faster and more user-friendly.`,
      criticalIssues: issues,
      optimizations,
      priorityActions: [
        "Compress and optimize images",
        "Minimize JavaScript and CSS files",
        "Improve server response time",
        "Enable browser caching"
      ]
    };
  }
}