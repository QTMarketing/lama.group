'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';

interface LocomotiveScrollInstance {
  update: () => void;
  destroy: () => void;
}

export default function ScrollProvider({ children }: PropsWithChildren) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let scroll: LocomotiveScrollInstance | null = null;
    let update: (() => void) | null = null;

    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      scroll = new LocomotiveScroll({
        el: containerRef.current!,
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      }) as LocomotiveScrollInstance;
      // Optional: update when wave is injected
      update = () => scroll && scroll.update();
      document.addEventListener('wave-injected', update);
    })();

    return () => {
      if (update) document.removeEventListener('wave-injected', update);
      try { scroll?.destroy(); } catch {}
    };
  }, []);

  return (
    <div data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
}