'use client';

import { AIRecommendation } from '@/types/performance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useReducedMotion } from 'framer-motion';

interface AIRecommendationsProps {
  data: AIRecommendation;
}

export function AIRecommendations({ data }: AIRecommendationsProps) {
  const prefersReducedMotion = useReducedMotion();
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-100/40 text-emerald-900 border-emerald-200/40';
      case 'Medium':
        return 'bg-yellow-100/40 text-yellow-900 border-yellow-200/40';
      case 'Hard':
        return 'bg-red-100/40 text-red-900 border-red-200/40';
      default:
        return 'bg-gray-100/40 text-gray-800 border-gray-200/40';
    }
  };

  return (
    <section aria-label="AI recommendations" className="py-4 space-y-6">
      {/* AI Summary */}
      <div>
        <div className="mb-3">
          <h3 className="text-xl font-semibold">AI Performance Analysis</h3>
          <p className="text-sm text-muted-foreground">Human-friendly recommendations powered by AI</p>
        </div>
        <motion.div className="p-4 rounded-xl border border-neutral-200/40 dark:border-white/10 bg-background/30" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35 }}>
          <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
        </motion.div>
      </div>

      {/* Critical Issues */}
      {data.criticalIssues.length > 0 && (
        <div>
          <div className="mb-2">
            <h3 className="text-xl font-semibold">Critical Issues</h3>
            <p className="text-sm text-muted-foreground">These issues significantly impact user experience</p>
          </div>
          <div className="space-y-4">
            {data.criticalIssues.map((issue, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-xl border border-neutral-200/40 dark:border-white/10 bg-background/30"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <h4 className="font-semibold text-foreground mb-2">
                  {issue.issue}
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Impact: </span>
                    <span className="text-muted-foreground">{issue.impact}</span>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Solution: </span>
                    <span className="text-muted-foreground">{issue.solution}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">Expected Improvement: </span>
                    <span className="px-2 py-1 bg-emerald-100/40 text-emerald-900 rounded text-xs font-medium">
                      {issue.expectedImprovement}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Optimization Recommendations */}
      <div>
        <div className="mb-2">
          <h3 className="text-xl font-semibold">Optimization Opportunities</h3>
          <p className="text-sm text-muted-foreground">Actionable steps to improve your website performance</p>
        </div>
        <div className="space-y-4">
          {data.optimizations.map((optimization, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-xl border border-neutral-200/40 dark:border-white/10 bg-background/30 hover:bg-background/40 transition-colors"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
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
                <span className="px-2 py-1 bg-emerald-100/40 text-emerald-900 rounded text-xs font-medium">
                  {optimization.expectedGain}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {optimization.recommendation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Priority Actions */}
      <div>
        <div className="mb-2">
          <h3 className="text-xl font-semibold">Priority Actions</h3>
          <p className="text-sm text-muted-foreground">Start with these high-impact improvements</p>
        </div>
        <div className="space-y-2">
          {data.priorityActions.map((action, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200/40 dark:border-white/10 bg-background/30"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
            >
              <div className="flex-shrink-0 w-6 h-6 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <span className="text-muted-foreground">{action}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-6 h-px bg-neutral-200 dark:bg-white/10" />
    </section>
  );
}