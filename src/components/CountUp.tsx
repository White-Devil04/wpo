'use client';

import { useEffect, useState } from 'react';

interface CountUpProps {
  from?: number;
  to: number;
  durationMs?: number;
  format?: (n: number) => string | number;
}

export function CountUp({ from = 0, to, durationMs = 800, format }: CountUpProps) {
  const [value, setValue] = useState<number>(from);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, durationMs]);

  const display = format ? format(value) : Math.round(value);
  return <span>{display}</span>;
}


