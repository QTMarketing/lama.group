'use client';

import { useEffect, useRef } from 'react';

export default function HeroWave({ enableScroll = true }: { enableScroll?: boolean }) {
  const wavePathsRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // IMPORTANT: from Next public folder, path is just "/wave.svg"
        const res = await fetch('/wave.svg');
        if (!res.ok) throw new Error('wave.svg not found in /public');
        const txt = await res.text();

        const doc = new DOMParser().parseFromString(txt, 'image/svg+xml');
        const srcSvg = (doc.querySelector('svg') as SVGElement) || (doc.documentElement as unknown as SVGElement);

        // Grab drawable content from your file (paths, polylines, groups)
        const nodes = srcSvg.querySelectorAll('path, polyline, line, g');
        if (!wavePathsRef.current) return;
        if (cancelled) return;

        // Clear previous and inject clones; strip inline fill/stroke so they inherit our gradient
        wavePathsRef.current.innerHTML = '';
        nodes.forEach((n) => {
          const el = n.cloneNode(true) as SVGElement;
          el.removeAttribute('fill');
          el.removeAttribute('stroke');
          el.removeAttribute('style');
          el.setAttribute('vector-effect', 'non-scaling-stroke');
          wavePathsRef.current!.appendChild(el);
        });

        // If you’re using Locomotive, ask it to recalc (optional)
        document.dispatchEvent(new Event('wave-injected'));
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="relative min-h-[70vh] grid place-items-center overflow-hidden bg-white"
      data-scroll-section={enableScroll ? true : undefined}
    >
      <div className="relative z-10 text-center px-6">
        <h1 className="font-extrabold tracking-tight leading-tight text-4xl md:text-6xl text-[#111]">
          Explore our <span className="text-[#FF4D00]">industry leading</span> services
        </h1>
        <a
          href="/contact"
          className="inline-block mt-6 rounded-lg bg-[#FF4D00] px-5 py-3 text-white font-semibold focus:outline-none focus:ring-4 focus:ring-[#ff4d00]/30"
        >
          Contact Us
        </a>
      </div>

      {/* Animated SVG background */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[380px]"
        viewBox="0 0 1920 420"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        data-scroll={enableScroll ? true : undefined}
        data-scroll-speed={enableScroll ? "1.2" : undefined}
      >
        <defs>
          {/* Edge fade so wave disappears left/right */}
          <linearGradient id="edgeFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="12%" stopColor="#fff" stopOpacity="0" />
            <stop offset="88%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#edgeFade)" />
          </mask>

          {/* Gentle undulation */}
          <filter id="undulate">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.009"
              numOctaves="1"
              seed="2"
            >
              <animate
                attributeName="baseFrequency"
                values="0.003 0.009; 0.004 0.012; 0.003 0.009"
                dur="12s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>

          {/* Soft shimmer across strokes */}
          <linearGradient id="moveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,.06)" />
            <stop offset="50%" stopColor="rgba(0,0,0,.14)" />
            <stop offset="100%" stopColor="rgba(0,0,0,.06)" />
            <animate
              attributeName="gradientTransform"
              type="translate"
              values="-0.15 0; 0.15 0; -0.15 0"
              dur="10s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        <g id="ribbonWrap" mask="url(#fadeMask)" filter="url(#undulate)">
          {/* Drift/breathe */}
          <g id="ribbon" className="animate-drift">
            {/* Your wave.svg content will be injected here */}
            <g
              ref={wavePathsRef}
              id="wavePaths"
              fill="none"
              stroke="url(#moveGrad)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
      </svg>
    </section>
  );
}