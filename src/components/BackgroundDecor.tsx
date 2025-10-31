'use client';

export function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* Soft radial spotlight */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 bg-[radial-gradient(600px_300px_at_50%_-100px,rgba(0,0,0,0.08),transparent)] dark:bg-[radial-gradient(600px_300px_at_50%_-100px,rgba(255,255,255,0.08),transparent)]" />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:24px_24px] text-black dark:text-white" />
      {/* Fine noise texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.35\'/></svg>')]" />
    </div>
  );
}


