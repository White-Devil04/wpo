'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface FloatingActionsProps {
  report: unknown;
}

export function FloatingActions({ report }: FloatingActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleCopy = async () => {
    try {
      const text = JSON.stringify(report, null, 2);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // noop
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden">
      <div className="flex flex-col gap-2">
        <Button size="sm" variant="secondary" onClick={handleTop} aria-label="Back to top">Top</Button>
        <Button size="sm" variant="outline" onClick={handleCopy} aria-label="Copy report">
          {copied ? 'Copied' : 'Copy'}
        </Button>
        <Button size="sm" onClick={handlePrint} aria-label="Print report">Print</Button>
      </div>
    </div>
  );
}


