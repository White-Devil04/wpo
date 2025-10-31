'use client';

import { useState } from 'react';
import { AnalysisResult } from '@/types/performance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WebVitalsCard } from '@/components/WebVitalsCard';
import { PerformanceScores } from '@/components/PerformanceScores';
import { ResourceAnalysisCard } from '@/components/ResourceAnalysisCard';
import { AIRecommendations } from '@/components/AIRecommendations';
import { StatusBanner } from '@/components/StatusBanner';
import { validateUrl, normalizeUrl } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { StickyResultsBar } from '@/components/StickyResultsBar';
import { TiltCard } from '@/components/TiltCard';
import { FloatingActions } from '@/components/FloatingActions';
import { Gauge, PieChart as PieIcon, Bot, Zap } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleAnalyze = async (useDemo = true) => {
    if (!url || !validateUrl(normalizeUrl(url))) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const endpoint = useDemo ? '/api/demo' : '/api/analyze';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: normalizeUrl(url) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAnalyze(true);
  };

  return (
    <div>
      {/* Hero */}
      <motion.section
        className="mb-8"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
              Live Web Performance Insights
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-[linear-gradient(180deg,rgba(0,0,0,0.95),rgba(0,0,0,0.7))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.75))]">AI‑Powered Web Performance Optimizer</h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6">Detailed insights and practical recommendations to make your website faster and more resilient.</p>
            <Card role="region" aria-label="Analyze website (hero)" className="rounded-2xl border border-neutral-700/40 dark:border-white/10 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/40">
              <CardContent className="p-5">
                <form
                  className="space-y-3"
                  onSubmit={(e) => { e.preventDefault(); handleAnalyze(true); }}
                  aria-label="Analysis form"
                >
                  <div className="flex gap-3">
                    <Input
                      type="url"
                      inputMode="url"
                      placeholder="https://example.com"
                      aria-label="Website URL"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                      disabled={loading}
                      required
                    />
                    <Button
                      type="submit"
                      onClick={() => handleAnalyze(true)}
                      disabled={loading || !url}
                      className="px-6"
                      aria-label="Run demo analysis"
                    >
                      {loading ? 'Analyzing…' : 'Analyze'}
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button
                      type="button"
                      onClick={() => handleAnalyze(false)}
                      disabled={loading || !url}
                      variant="outline"
                      className="w-full"
                      aria-label="Run real analysis with Google PageSpeed"
                    >
                      Real Analysis (PageSpeed)
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleAnalyze(true)}
                      disabled={loading || !url}
                      variant="secondary"
                      className="w-full"
                      aria-label="Run quick demo"
                    >
                      Quick Demo
                    </Button>
                  </div>
                  {error && (
                    <div className="mt-1 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="assertive">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="hidden md:block">
            <TiltCard>
              <Card className="p-6 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50 border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-1 text-neutral-900 dark:text-white"><Gauge size={22} /></div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                    <div className="text-2xl font-semibold">95</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1 text-neutral-900 dark:text-white"><PieIcon size={22} /></div>
                    <div className="text-xs text-muted-foreground">Best Practices</div>
                    <div className="text-2xl font-semibold">92</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1 text-neutral-900 dark:text-white"><Bot size={22} /></div>
                    <div className="text-xs text-muted-foreground">SEO</div>
                    <div className="text-2xl font-semibold">90</div>
                  </div>
                </div>
                <div className="mt-6 h-2 w-full rounded bg-neutral-200/70 dark:bg-white/10 overflow-hidden">
                  <div className="h-full w-3/4 bg-neutral-900 dark:bg-white transition-all" />
                </div>
                <div className="mt-2 text-xs text-muted-foreground text-center">Estimated improvement potential</div>
              </Card>
            </TiltCard>
          </div>
        </div>
      </motion.section>

      {/* Status Banner */}
      <StatusBanner />

      {/* URL Input moved into hero */}

      {/* Loading State removed as requested */}

      {/* Results */}
      {results && !loading && (
        <motion.div
          className="space-y-8"
          aria-live="polite"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <FloatingActions report={results} />
          {/* Mobile anchors */}
          <div className="md:hidden">
            <StickyResultsBar
              containerId="results-container"
              sections={[
                { id: 'scores', label: 'Scores' },
                { id: 'vitals', label: 'Web Vitals' },
                { id: 'resources', label: 'Resources' },
                { id: 'ai', label: 'AI' },
              ]}
            />
          </div>

          <div className="grid md:grid-cols-[220px,1fr] gap-8 items-start">
            <aside className="hidden md:block sticky top-24 self-start">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Results</div>
              <nav className="flex flex-col gap-2 text-sm">
                <button onClick={() => document.getElementById('scores')?.scrollIntoView({ behavior: 'smooth' })} className="text-left text-muted-foreground hover:text-foreground">Scores</button>
                <button onClick={() => document.getElementById('vitals')?.scrollIntoView({ behavior: 'smooth' })} className="text-left text-muted-foreground hover:text-foreground">Web Vitals</button>
                <button onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })} className="text-left text-muted-foreground hover:text-foreground">Resources</button>
                <button onClick={() => document.getElementById('ai')?.scrollIntoView({ behavior: 'smooth' })} className="text-left text-muted-foreground hover:text-foreground">AI</button>
              </nav>
              <div className="mt-6 h-px bg-neutral-200 dark:bg-white/10" />
              <div className="mt-3 text-xs text-muted-foreground">Analyzed {new Date(results.webVitals.timestamp).toLocaleDateString()}</div>
            </aside>

            <div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-semibold mb-1">Analysis Results</h2>
                <p className="text-sm text-muted-foreground">
                  URL: <span className="font-medium break-all">{results.webVitals.url}</span>
                </p>
              </div>

              <div id="results-container" className="mt-6 space-y-14">
                <section id="scores" aria-label="Scores" className="relative">
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(60%_60%_at_30%_0%,rgba(0,0,0,0.05),transparent)] dark:bg-[radial-gradient(60%_60%_at_30%_0%,rgba(255,255,255,0.05),transparent)]" />
                  <PerformanceScores data={results.webVitals} />
                </section>
                <section id="vitals" aria-label="Web Vitals" className="relative">
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.04))] dark:bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.04))]" />
                  <WebVitalsCard data={results.webVitals} />
                </section>
                <section id="resources" aria-label="Resources" className="relative">
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(50%_50%_at_70%_0%,rgba(0,0,0,0.05),transparent)] dark:bg-[radial-gradient(50%_50%_at_70%_0%,rgba(255,255,255,0.05),transparent)]" />
                  <ResourceAnalysisCard data={results.resources} />
                </section>
                <section id="ai" aria-label="AI Recommendations" className="relative">
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.04),transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)]" />
                  <AIRecommendations data={results.aiRecommendations} />
                </section>
              </div>

              <div className="mt-10 text-center">
                <Button
                  variant="secondary"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  aria-label="Analyze another website"
                >
                  Analyze Another Website
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Features Section (shown when no results) */}
      {!results && !loading && (
        <motion.div className="max-w-4xl mx-auto mt-16 space-y-12" id="features">
          <div>
            <h2 className="text-3xl font-bold text-center mb-2">What we analyze</h2>
            <p className="text-center text-muted-foreground mb-8">Key areas we evaluate to guide effective optimizations.</p>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35 }}>
              <TiltCard className="text-center">
              <Card className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-2 text-neutral-900 dark:text-white"><Gauge size={20} /></div>
                  <h3 className="text-lg font-semibold mb-1">Core Web Vitals</h3>
                  <p className="text-muted-foreground text-sm">
                    Loading performance, interactivity, and visual stability metrics.
                  </p>
                </CardContent>
              </Card>
              </TiltCard>
              </motion.div>
              <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.05 }}>
              <TiltCard className="text-center">
              <Card className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-2 text-neutral-900 dark:text-white"><PieIcon size={20} /></div>
                  <h3 className="text-lg font-semibold mb-1">Resource analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    File sizes, compression, and optimization opportunities.
                  </p>
                </CardContent>
              </Card>
              </TiltCard>
              </motion.div>
              <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <TiltCard className="text-center">
              <Card className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-2 text-neutral-900 dark:text-white"><Zap size={20} /></div>
                  <h3 className="text-lg font-semibold mb-1">AI recommendations</h3>
                  <p className="text-muted-foreground text-sm">
                    Actionable guidance summarized from the analysis.
                  </p>
                </CardContent>
              </Card>
              </TiltCard>
              </motion.div>
            </div>
          </div>

          <div id="how-it-works">
            <h2 className="text-2xl font-bold text-center mb-6">Choose analysis type</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35 }}>
              <TiltCard>
              <Card className="hover:shadow-sm transition-shadow">
                <CardHeader>
                  <CardTitle>Real analysis</CardTitle>
                  <CardDescription>
                    Comprehensive audit using Google PageSpeed Insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span><span>Actual Lighthouse performance data</span></li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span><span>AI‑powered recommendations</span></li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span><span>Real Core Web Vitals metrics</span></li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">ℹ</span><span>Takes 10–30 seconds</span></li>
                  </ul>
                </CardContent>
              </Card>
              </TiltCard>
              </motion.div>
              <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.05 }}>
              <TiltCard>
              <Card className="hover:shadow-sm transition-shadow">
                <CardHeader>
                  <CardTitle>Quick demo</CardTitle>
                  <CardDescription>
                    Fast demonstration with realistic mock data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span><span>Realistic performance metrics</span></li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span><span>Sample AI recommendations</span></li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span><span>Full UI demonstration</span></li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">ℹ</span><span>Results in ~2–3 seconds</span></li>
                  </ul>
                </CardContent>
              </Card>
              </TiltCard>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
