'use client';

import { ResourceAnalysis } from '@/types/performance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatBytes } from '@/lib/utils';

interface ResourceAnalysisCardProps {
  data: ResourceAnalysis;
}

export function ResourceAnalysisCard({ data }: ResourceAnalysisCardProps) {
  const resources = [
    {
      name: 'JavaScript',
      size: data.jsSize,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Images',
      size: data.imageSize,
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'CSS',
      size: data.cssSize,
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
    },
    {
      name: 'HTML',
      size: data.htmlSize,
      color: 'bg-purple-500',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
    },
  ];

  const totalSize = resources.reduce((sum, resource) => sum + resource.size, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Analysis</CardTitle>
        <CardDescription>
          Breakdown of your website's file sizes and resource usage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">
                {formatBytes(data.totalSize)}
              </div>
              <div className="text-sm text-gray-600">Total Size</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">
                {data.requests}
              </div>
              <div className="text-sm text-gray-600">HTTP Requests</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(data.compressionRatio * 100)}%
              </div>
              <div className="text-sm text-gray-600">Compression</div>
            </div>
          </div>

          {/* Resource Breakdown */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Resource Breakdown
            </h4>
            <div className="space-y-3">
              {resources.map((resource) => {
                const percentage = totalSize > 0 ? (resource.size / totalSize) * 100 : 0;
                
                return (
                  <div key={resource.name} className={`p-3 rounded-lg ${resource.bgColor}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${resource.color}`}></div>
                        <span className="text-sm font-medium">{resource.name}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {formatBytes(resource.size)}
                      </div>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${resource.color}`}
                        style={{ width: `${Math.max(percentage, 2)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {percentage.toFixed(1)}% of total
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optimization Potential */}
          {(data.unusedCss > 0 || data.unusedJs > 0) && (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="text-sm font-medium text-orange-800 mb-2">
                Optimization Potential
              </h4>
              <div className="space-y-1 text-sm text-orange-700">
                {data.unusedCss > 0 && (
                  <div>• {formatBytes(data.unusedCss)} unused CSS can be removed</div>
                )}
                {data.unusedJs > 0 && (
                  <div>• {formatBytes(data.unusedJs)} unused JavaScript can be removed</div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}