'use client';

import { Card, CardContent } from '@/components/ui/card';

export function StatusBanner() {
  return (
    <div className="mb-6 flex items-center justify-center" role="status" aria-live="polite">
      <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-muted-foreground bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></span>
        <span className="font-medium text-foreground/80">All services operational</span>
        <span className="opacity-60">|</span>
        <span>PageSpeed</span>
        <span className="opacity-60">•</span>
        <span>Gemini</span>
        <span className="opacity-60">•</span>
        <span>Demo</span>
      </div>
    </div>
  );
}