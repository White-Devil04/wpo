'use client';

import { useState } from 'react';
import { AnalysisResult } from '@/types/performance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WebVitalsCard } from '@/components/WebVitalsCard';
import { PerformanceScores } from '@/components/PerformanceScores';
import { ResourceAnalysisCard } from '@/components/ResourceAnalysisCard';
import { AIRecommendations } from '@/components/AIRecommendations';
import { LoadingAnalysis } from '@/components/LoadingAnalysis';
import { StatusBanner } from '@/components/StatusBanner';
import { validateUrl, normalizeUrl } from '@/lib/utils';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (useDemo = true) => {
    if (!url || !validateUrl(normalizeUrl(url))) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const endpoint = useDemo ? '/api/demo' : '/api/analyze';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: normalizeUrl(url) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🚀 AI-Powered Web Performance Optimizer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get comprehensive performance analysis and AI-powered recommendations to make your website lightning fast
          </p>
        </div>

        {/* Status Banner */}
        <StatusBanner />

        {/* URL Input */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Analyze Your Website</CardTitle>
            <CardDescription>
              Enter any website URL to get detailed performance insights and optimization recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={loading}
                />
                <Button 
                  onClick={() => handleAnalyze(true)}
                  disabled={loading || !url}
                  className="px-8"
                >
                  {loading ? 'Analyzing...' : 'Demo Analysis'}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                  <Button 
                    onClick={() => handleAnalyze(false)}
                    disabled={loading || !url}
                    variant="outline"
                    className="w-full"
                  >
                    Real Analysis (Google PageSpeed)
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    Uses Google's PageSpeed Insights API + AI recommendations
                  </p>
                </div>
                <div className="text-center">
                  <Button 
                    onClick={() => handleAnalyze(true)}
                    disabled={loading || !url}
                    variant="secondary"
                    className="w-full"
                  >
                    Quick Demo
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    Fast demo with realistic mock data
                  </p>
                </div>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && <LoadingAnalysis />}

        {/* Results */}
        {results && !loading && (
          <div className="space-y-8">
            {/* Website Info */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Analysis Results for
              </h2>
              <p className="text-lg text-blue-600 font-medium break-all">
                {results.webVitals.url}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Analyzed on {new Date(results.webVitals.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Performance Scores */}
            <PerformanceScores data={results.webVitals} />

            {/* Web Vitals */}
            <WebVitalsCard data={results.webVitals} />

            {/* Resource Analysis */}
            <ResourceAnalysisCard data={results.resources} />

            {/* AI Recommendations */}
            <AIRecommendations data={results.aiRecommendations} />

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Optimize Your Website?
                </h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Use these AI-powered recommendations to improve your website's performance, 
                  increase user satisfaction, and boost your search engine rankings.
                </p>
                <Button 
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Analyze Another Website
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Section (shown when no results) */}
        {!results && !loading && (
          <div className="max-w-4xl mx-auto mt-16 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                What We Analyze
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="text-xl font-semibold mb-2">Core Web Vitals</h3>
                    <p className="text-gray-600">
                      Measure loading performance, interactivity, and visual stability
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold mb-2">Resource Analysis</h3>
                    <p className="text-gray-600">
                      Analyze file sizes, compression, and optimization opportunities
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">🤖</div>
                    <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
                    <p className="text-gray-600">
                      Get human-friendly suggestions powered by advanced AI
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Analysis Types Comparison */}
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Choose Your Analysis Type
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-600">🚀 Real Analysis</CardTitle>
                    <CardDescription>
                      Comprehensive performance audit using Google's PageSpeed Insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Actual Lighthouse performance data</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>AI-powered recommendations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Real Core Web Vitals metrics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">ℹ</span>
                        <span>Takes 10-30 seconds</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-600">⚡ Quick Demo</CardTitle>
                    <CardDescription>
                      Fast demonstration with realistic mock data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Realistic performance metrics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Sample AI recommendations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Full UI demonstration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">ℹ</span>
                        <span>Results in 2-3 seconds</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
