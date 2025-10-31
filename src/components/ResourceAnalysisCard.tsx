'use client';

import { ResourceAnalysis } from '@/types/performance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatBytes } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

interface ResourceAnalysisCardProps {
  data: ResourceAnalysis;
}

export function ResourceAnalysisCard({ data }: ResourceAnalysisCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const resources = [
    {
      name: 'JavaScript',
      size: data.jsSize,
      color: 'bg-yellow-400',
      textColor: 'text-neutral-700',
      bgColor: 'bg-transparent',
    },
    {
      name: 'Images',
      size: data.imageSize,
      color: 'bg-blue-400',
      textColor: 'text-neutral-700',
      bgColor: 'bg-transparent',
    },
    {
      name: 'CSS',
      size: data.cssSize,
      color: 'bg-emerald-400',
      textColor: 'text-neutral-700',
      bgColor: 'bg-transparent',
    },
    {
      name: 'HTML',
      size: data.htmlSize,
      color: 'bg-purple-400',
      textColor: 'text-neutral-700',
      bgColor: 'bg-transparent',
    },
  ];

  const totalSize = resources.reduce((sum, resource) => sum + resource.size, 0);

  return (
    <section aria-label="Resource analysis" className="py-4">
      <div className="mb-3">
        <h3 className="text-xl font-semibold">Resource Analysis</h3>
        <p className="text-sm text-muted-foreground">Breakdown of your website's file sizes and resource usage</p>
      </div>
      <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.3 }}>
              <div className="text-2xl font-bold text-gray-800">
                {formatBytes(data.totalSize)}
              </div>
              <div className="text-sm text-gray-600">Total Size</div>
            </motion.div>
            <motion.div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35 }}>
              <div className="text-2xl font-bold text-gray-800">
                {data.requests}
              </div>
              <div className="text-sm text-gray-600">HTTP Requests</div>
            </motion.div>
            <motion.div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.4 }}>
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(data.compressionRatio * 100)}%
              </div>
              <div className="text-sm text-gray-600">Compression</div>
            </motion.div>
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
                  <motion.div key={resource.name} className={`p-3 rounded-xl border border-neutral-200/40 dark:border-white/10 bg-background/30`} initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${resource.color}`}></div>
                        <span className="text-sm font-medium">{resource.name}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {formatBytes(resource.size)}
                      </div>
                    </div>
                    <div className="w-full bg-neutral-200/50 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-2 rounded-full ${resource.color}`}
                        initial={prefersReducedMotion ? false : { width: 0 }}
                        whileInView={prefersReducedMotion ? undefined : { width: `${Math.max(percentage, 2)}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {percentage.toFixed(1)}% of total
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Optimization Potential */}
          {(data.unusedCss > 0 || data.unusedJs > 0) && (
            <motion.div className="p-4 rounded-xl border border-neutral-200/40 dark:border-white/10 bg-background/30" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35 }}>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Optimization Potential
              </h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                {data.unusedCss > 0 && (
                  <div>• {formatBytes(data.unusedCss)} unused CSS can be removed</div>
                )}
                {data.unusedJs > 0 && (
                  <div>• {formatBytes(data.unusedJs)} unused JavaScript can be removed</div>
                )}
              </div>
            </motion.div>
          )}
        <div className="mt-6 h-px bg-neutral-200 dark:bg-white/10" />
      </div>
    </section>
  );
}