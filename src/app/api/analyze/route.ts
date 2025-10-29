import { NextRequest, NextResponse } from 'next/server';
import { PerformanceAnalyzer } from '@/lib/performance-analyzer';
import { AIRecommendationService } from '@/lib/ai-service';
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
    const analyzer = new PerformanceAnalyzer();

    // Analyze website performance
    const analysisData = await analyzer.analyzeWebsite(normalizedUrl);

    // Generate AI recommendations
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'AI service is not configured' },
        { status: 500 }
      );
    }

    const aiService = new AIRecommendationService(geminiApiKey);
    const aiRecommendations = await aiService.generateRecommendations(
      analysisData.webVitals,
      analysisData.resources,
      analysisData.insights
    );

    const result = {
      ...analysisData,
      aiRecommendations,
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze website. Please try again.' },
      { status: 500 }
    );
  }
}