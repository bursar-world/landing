'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import type { AnimationPlaybackControls } from 'motion';

/** A two-digit figure that counts up from zero the first time it enters the viewport. */
export function CountUp({ value }: { readonly value: number }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let running: AnimationPlaybackControls | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setShown(value);
          return;
        }
        running = animate(0, value, {
          type: 'spring',
          bounce: 0,
          duration: 1,
          onUpdate: (latest) => setShown(Math.round(latest)),
        });
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      running?.stop();
    };
  }, [value]);

  return (
    <strong ref={ref} aria-label={String(value)}>
      {String(shown).padStart(2, '0')}
    </strong>
  );
}
