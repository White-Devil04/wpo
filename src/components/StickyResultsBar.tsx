'use client';

import { useEffect, useMemo, useState } from 'react';

interface StickyResultsBarProps {
  containerId: string;
  sections: Array<{ id: string; label: string }>;
}

export function StickyResultsBar({ containerId, sections }: StickyResultsBarProps) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { root: null, rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(total <= 0 ? 1 : scrolled / total);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [containerId, sections]);

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const widthStyle = useMemo(() => ({ width: `${Math.round(progress * 100)}%` }), [progress]);

  return (
    <div className="sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 text-xs">
          <nav className="flex items-center gap-4">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleJump(s.id)}
                className={`transition-colors ${active === s.id ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                aria-current={active === s.id ? 'true' : undefined}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <span className="text-muted-foreground">{Math.round(progress * 100)}%</span>
        </div>
        <div className="h-1 w-full bg-neutral-200 dark:bg-white/10 rounded overflow-hidden" aria-hidden="true">
          <div className="h-full bg-neutral-900 dark:bg-white" style={widthStyle} />
        </div>
      </div>
    </div>
  );
}


