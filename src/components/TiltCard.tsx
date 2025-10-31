'use client';

import { HTMLAttributes, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  maxTiltDeg?: number;
}

export function TiltCard({ className, children, maxTiltDeg = 6, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -2 * maxTiltDeg;
    const ry = (px - 0.5) * 2 * maxTiltDeg;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn('transition-transform duration-200 will-change-transform', className)}
      {...props}
    >
      {children}
    </div>
  );
}


