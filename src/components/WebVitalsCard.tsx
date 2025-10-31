'use client';

import { WebVitalsData, ResourceAnalysis } from '@/types/performance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTime } from '@/lib/utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { motion, useReducedMotion } from 'framer-motion';
import { CountUp } from '@/components/CountUp';

interface WebVitalsCardProps {
  data: WebVitalsData;
  resources?: ResourceAnalysis;
}

const resourceColors = ['#60A5FA', '#34D399', '#F97316', '#A78BFA'];

export function WebVitalsCard({ data, resources }: WebVitalsCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const metrics = [
    { name: 'FCP', value: data.fcp, unit: 'ms' },
    { name: 'LCP', value: data.lcp, unit: 'ms' },
    { name: 'FID', value: data.fid, unit: 'ms' },
    { name: 'CLS', value: Number(data.cls.toFixed(3)), unit: '' },
    { name: 'TTFB', value: data.ttfb, unit: 'ms' },
  ];

  const resourceData = [
    { name: 'JavaScript', value: resources?.jsSize || 0 },
    { name: 'Images', value: resources?.imageSize || 0 },
    { name: 'CSS', value: resources?.cssSize || 0 },
    { name: 'HTML', value: resources?.htmlSize || 0 },
  ];

  return (
    <section aria-label="Core Web Vitals" className="py-4">
      <div className="mb-3">
        <h3 className="text-xl font-semibold">Core Web Vitals</h3>
        <p className="text-sm text-muted-foreground">Key metrics that affect user experience</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* On desktop, show chart first for visual variety */}
          <motion.div
            className="p-2 order-none md:order-1"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={resourceData} dataKey="value" nameKey="name" innerRadius={36} outerRadius={60} paddingAngle={2} isAnimationActive>
                    {resourceData.map((_, idx) => (
                      <Cell key={idx} fill={resourceColors[idx % resourceColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${(value/1024).toFixed(1)} KB`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-center text-gray-500 mt-2">Resource breakdown</div>
          </motion.div>

          <div className="md:col-span-2 order-none md:order-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {metrics.map((m, idx) => (
                <motion.div
                  key={m.name}
                  className="p-4 border border-neutral-200/40 dark:border-white/10 rounded-xl text-center bg-transparent"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{m.name}</div>
                  <div className="text-2xl font-semibold mt-2">
                    {m.unit === '' ? (
                      <CountUp to={Number(m.value)} format={(v) => v.toFixed(3)} />
                    ) : (
                      <CountUp to={Number(m.value)} format={(v) => formatTime(v)} />
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{m.unit}</div>
                </motion.div>
              ))}
            </div>
          </div>
      </div>
      <div className="mt-6 h-px bg-neutral-200 dark:bg-white/10" />
    </section>
  );
}