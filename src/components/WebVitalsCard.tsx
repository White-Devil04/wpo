'use client';

import { WebVitalsData, ResourceAnalysis } from '@/types/performance';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTime } from '@/lib/utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface WebVitalsCardProps {
  data: WebVitalsData;
  resources?: ResourceAnalysis;
}

const resourceColors = ['#60A5FA', '#34D399', '#F97316', '#A78BFA'];

export function WebVitalsCard({ data, resources }: WebVitalsCardProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>Core Web Vitals</CardTitle>
        <CardDescription>Key metrics that affect user experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {metrics.map((m) => (
                <div key={m.name} className="p-4 bg-white border rounded-lg text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{m.name}</div>
                  <div className="text-2xl font-semibold mt-2">
                    {m.unit === '' ? m.value : formatTime(m.value)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{m.unit}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-2">
            <div className="w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={resourceData} dataKey="value" nameKey="name" innerRadius={36} outerRadius={60} paddingAngle={2}>
                    {resourceData.map((_, idx) => (
                      <Cell key={idx} fill={resourceColors[idx % resourceColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${(value/1024).toFixed(1)} KB`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-center text-gray-500 mt-2">Resource breakdown</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}