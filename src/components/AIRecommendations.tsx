'use client';

import { AIRecommendation } from '@/types/performance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AIRecommendationsProps {
  data: AIRecommendation;
}

export function AIRecommendations({ data }: AIRecommendationsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 AI Performance Analysis
          </CardTitle>
          <CardDescription>
            Human-friendly recommendations powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Critical Issues */}
      {data.criticalIssues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">🚨 Critical Issues</CardTitle>
            <CardDescription>
              These issues significantly impact user experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.criticalIssues.map((issue, index) => (
                <div
                  key={index}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <h4 className="font-semibold text-red-800 mb-2">
                    {issue.issue}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Impact: </span>
                      <span className="text-gray-600">{issue.impact}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Solution: </span>
                      <span className="text-gray-600">{issue.solution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Expected Improvement: </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        {issue.expectedImprovement}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">⚡ Optimization Opportunities</CardTitle>
          <CardDescription>
            Actionable steps to improve your website performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.optimizations.map((optimization, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-600">
                      {optimization.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(
                        optimization.difficulty
                      )}`}
                    >
                      {optimization.difficulty}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    {optimization.expectedGain}
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {optimization.recommendation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Priority Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600">🎯 Priority Actions</CardTitle>
          <CardDescription>
            Start with these high-impact improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.priorityActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-700">{action}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}