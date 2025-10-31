'use client';

import { WebVitalsData } from '@/types/performance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion, useReducedMotion } from 'framer-motion';
import { CountUp } from '@/components/CountUp';

interface PerformanceScoresProps {
  data: WebVitalsData;
}

const palette = ['#10B981', '#F59E0B', '#EF4444'];

function scoreColor(score: number) {
  if (score >= 90) return '#10B981';
  if (score >= 50) return '#F59E0B';
  return '#EF4444';
}

function Donut({ value, color }: { value: number; color: string }) {
  const data = [
    { name: 'value', value: Math.max(0, Math.min(100, value)) },
    { name: 'rest', value: Math.max(0, 100 - Math.max(0, Math.min(100, value))) },
  ];

  return (
    <ResponsiveContainer width={80} height={80}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={24}
          outerRadius={36}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          dataKey="value"
          isAnimationActive
        >
          <Cell key="value" fill={color} />
          <Cell key="rest" fill="#F3F4F6" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function PerformanceScores({ data }: PerformanceScoresProps) {
  const prefersReducedMotion = useReducedMotion();
  const scores = [
    { name: 'Performance', value: data.performanceScore },
    { name: 'Accessibility', value: data.accessibilityScore },
    { name: 'Best Practices', value: data.bestPracticesScore },
    { name: 'SEO', value: data.seoScore },
  ];

  return (
    <section aria-label="Performance overview" className="py-4">
      <div className="mb-3">
        <h3 className="text-xl font-semibold">Performance Overview</h3>
        <p className="text-sm text-muted-foreground">Quick glance at key scores</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center">
        {scores.map((s, idx) => (
          <motion.div
            key={s.name}
            className="flex flex-col items-center gap-2 rounded-md p-2"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            aria-label={`${s.name} score ${s.value}`}
          >
            <Donut value={s.value} color={scoreColor(s.value)} />
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{s.name}</div>
            <div className="text-lg font-semibold" style={{ color: scoreColor(s.value) }}>
              <CountUp to={s.value} />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 h-px bg-neutral-200 dark:bg-white/10" />
    </section>
  );
}