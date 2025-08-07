import { useEffect, useRef, useState } from "react";

export function useInView(options = {}, triggerOnce = false) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      options
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, triggerOnce]);

  return [ref, inView];
}