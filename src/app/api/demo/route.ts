import { NextRequest, NextResponse } from 'next/server';
import { validateUrl, normalizeUrl } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !validateUrl(normalizeUrl(url))) {
      return NextResponse.json(
        { error: 'Please provide a valid URL' },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeUrl(url);

    // Mock data for demo purposes
    const mockResults = {
      webVitals: {
        url: normalizedUrl,
        fcp: 1200 + Math.random() * 800, // 1.2-2.0s
        lcp: 1800 + Math.random() * 1200, // 1.8-3.0s
        fid: 50 + Math.random() * 100, // 50-150ms
        cls: Math.random() * 0.2, // 0-0.2
        ttfb: 300 + Math.random() * 500, // 300-800ms
        performanceScore: Math.floor(60 + Math.random() * 30), // 60-90
        accessibilityScore: Math.floor(70 + Math.random() * 25), // 70-95
        bestPracticesScore: Math.floor(75 + Math.random() * 20), // 75-95
        seoScore: Math.floor(65 + Math.random() * 30), // 65-95
        timestamp: new Date().toISOString(),
      },
      resources: {
        totalSize: Math.floor(800000 + Math.random() * 2200000), // 800KB-3MB
        jsSize: Math.floor(200000 + Math.random() * 800000), // 200KB-1MB
        cssSize: Math.floor(50000 + Math.random() * 200000), // 50KB-250KB
        imageSize: Math.floor(300000 + Math.random() * 1000000), // 300KB-1.3MB
        htmlSize: Math.floor(20000 + Math.random() * 80000), // 20KB-100KB
        requests: Math.floor(20 + Math.random() * 80), // 20-100 requests
        unusedCss: Math.floor(Math.random() * 100000), // 0-100KB
        unusedJs: Math.floor(Math.random() * 200000), // 0-200KB
        compressionRatio: 0.6 + Math.random() * 0.3, // 60-90%
      },
      insights: {
        opportunities: [
          {
            title: 'Optimize images',
            description: 'Use modern image formats and compression',
            savings: '450KB',
            impact: 'high' as const,
          },
          {
            title: 'Minify JavaScript',
            description: 'Remove unused code and compress files',
            savings: '230KB',
            impact: 'medium' as const,
          },
          {
            title: 'Enable text compression',
            description: 'Use gzip or brotli compression',
            savings: '180KB',
            impact: 'medium' as const,
          },
        ],
        diagnostics: [
          {
            title: 'Time to Interactive',
            description: 'Time until the page becomes fully interactive',
            value: '3.2s',
          },
          {
            title: 'Speed Index',
            description: 'How quickly content is visually displayed',
            value: '2.8s',
          },
        ],
      },
      aiRecommendations: {
        summary: "Your website has good performance potential but could benefit from image optimization and code minification. The loading speed is reasonable but can be improved by 30-40% with the right optimizations.",
        criticalIssues: [
          {
            issue: "Large unoptimized images",
            impact: "Users experience slow loading times, especially on mobile devices with slower connections",
            solution: "Compress images using modern formats like WebP, and implement responsive images for different screen sizes",
            expectedImprovement: "25-35% faster loading time"
          }
        ],
        optimizations: [
          {
            category: "Images",
            recommendation: "Convert images to WebP format and compress them by 70-80% without losing visual quality",
            difficulty: "Easy" as const,
            expectedGain: "30% reduction in page load time"
          },
          {
            category: "JavaScript",
            recommendation: "Remove unused JavaScript code and enable code splitting to load only what's needed",
            difficulty: "Medium" as const,
            expectedGain: "15-20% improvement in interactivity"
          },
          {
            category: "Caching",
            recommendation: "Set up browser caching for static resources to reduce repeat loading times",
            difficulty: "Easy" as const,
            expectedGain: "50% faster loading for returning visitors"
          }
        ],
        priorityActions: [
          "Optimize and compress all images on your website",
          "Enable browser caching for static files",
          "Minify CSS and JavaScript files",
          "Use a Content Delivery Network (CDN) for faster global access"
        ]
      }
    };

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json(mockResults);
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze website. Please try again.' },
      { status: 500 }
    );
  }
}