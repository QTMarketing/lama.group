'use client';

import React from 'react';

type OceanWaveProps = {
  className?: string;
};

export default function OceanWave({ className }: OceanWaveProps) {
  const width = 1921;
  const height = 587; // match wave.svg size
  const lines = 30;
  const amplitude = 80;
  const frequency = 0.008;
  const color = '#000000';
  const opacityStart = 0.1; // subtle overall
  const opacityEnd = 0.04;  // subtle tails
  const strokeWidth = 1;
  const fadeSides = true;

  const makePath = (phase: number, ampScale: number, yOffset: number) => {
    const samples = 320;
    const dx = width / samples;
    let d = `M 0 ${yOffset}`;
    for (let i = 0; i <= samples; i++) {
      const x = i * dx;
      const y =
        yOffset +
        Math.sin(x * frequency + phase) * amplitude * ampScale +
        Math.sin(x * frequency * 0.53 + phase * 0.8) * amplitude * 0.33 * ampScale +
        Math.sin(x * frequency * 1.21 + phase * 1.6) * amplitude * 0.18 * ampScale;
      d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  };

  const paths = Array.from({ length: lines }, (_, i) => {
    const t = i / Math.max(lines - 1, 1);
    const ampScale = 0.35 + t * 0.9;
    const yOffset = height * (0.35 + (t - 0.5) * 0.45);
    const phase = t * Math.PI * 0.9;
    const opacity = opacityStart + (opacityEnd - opacityStart) * t;
    return { d: makePath(phase, ampScale, yOffset), opacity };
  });

  const gradientId = React.useId();

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Decorative ocean wave"
        className="block w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {fadeSides && (
          <defs>
            <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="10%" stopColor={color} stopOpacity="1" />
              <stop offset="90%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
        )}
        {paths.map((p, idx) => (
          <path
            key={idx}
            d={p.d}
            fill="none"
            stroke={fadeSides ? `url(#${gradientId})` : color}
            strokeOpacity={p.opacity}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}

