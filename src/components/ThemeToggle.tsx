'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label="Toggle theme"
      onClick={handleToggle}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </Button>
  );
}


