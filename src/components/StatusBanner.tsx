'use client';

import { Card, CardContent } from '@/components/ui/card';

export function StatusBanner() {
  return (
    <Card className="bg-green-50 border-green-200 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-700 font-medium">
            System Status: All services operational
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-green-600">
            PageSpeed API ✓ | Gemini AI ✓ | Demo Mode ✓
          </span>
        </div>
      </CardContent>
    </Card>
  );
}