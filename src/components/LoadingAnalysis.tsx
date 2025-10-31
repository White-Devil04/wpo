'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion, useReducedMotion } from 'framer-motion';

export function LoadingAnalysis() {
  const steps = [
    'Initializing performance analysis...',
    'Running Lighthouse audit...',
    'Analyzing Core Web Vitals...',
    'Examining resource optimization...',
    'Processing AI recommendations...',
    'Finalizing results...',
  ];
  const prefersReducedMotion = useReducedMotion();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <motion.div className="relative" initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }} animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
            <div className="w-16 h-16 mx-auto">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </motion.div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Analyzing Your Website
            </h3>
            <p className="text-gray-600">
              This may take 30-60 seconds as we run comprehensive performance tests
            </p>
          </div>

          {/* Progress steps */}
          <div className="space-y-3 text-left max-w-md mx-auto">
            {steps.map((step, index) => (
              <motion.div key={index} className="flex items-center gap-3" initial={prefersReducedMotion ? false : { opacity: 0, x: -6 }} animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: index * 0.05 }}>
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-sm text-gray-600">{step}</span>
              </motion.div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-700">
              💡 <strong>Tip:</strong> We're running the same tests that Google uses to rank websites. 
              This includes checking loading speed, mobile friendliness, and user experience metrics.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}