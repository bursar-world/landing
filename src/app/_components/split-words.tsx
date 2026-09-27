'use client';

import { Children, cloneElement, isValidElement, useEffect, useRef } from 'react';
import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { animate } from 'motion';
import type { AnimationPlaybackControls } from 'motion';

/** Wrap every word in a span the reveal can address, leaving whitespace and line breaks alone. */
function splitWords(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child
        .split(/(\s+)/)
        .filter(Boolean)
        .map((part, i) =>
          /\s/.test(part) ? (
            part
          ) : (
            <span className="motion-word" key={i}>
              {part}
            </span>
          ),
        );
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
      return cloneElement(child as ReactElement<{ children?: ReactNode }>, {}, splitWords(child.props.children));
    }
    return child;
  });
}

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A heading or paragraph whose words arrive one line at a time when it first scrolls into view.
 * With `scroll`, the words instead brighten in step with scroll position and never finish early.
 */
export function SplitWords({
  children,
  as: Tag = 'h2',
  className = '',
  scroll = false,
}: {
  readonly children: ReactNode;
  readonly as?: 'h2' | 'p';
  readonly className?: string;
  readonly scroll?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const words = Array.from(node.querySelectorAll<HTMLElement>('.motion-word'));
    if (reducedMotion()) return;

    let frame = 0;
    let started = false;
    const running: AnimationPlaybackControls[] = [];

    if (scroll) {
      const paint = () => {
        const rect = node.getBoundingClientRect();
        const lit =
          Math.max(0, Math.min(1, (innerHeight * 0.9 - rect.top) / (rect.height + innerHeight * 0.4))) *
          words.length;
        words.forEach((word, i) => {
          word.style.opacity = String(0.2 + 0.8 * Math.max(0, Math.min(1, lit - i)));
        });
      };
      const schedule = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(paint);
      };
      paint();
      addEventListener('scroll', schedule, { passive: true });
      addEventListener('resize', schedule);
      return () => {
        cancelAnimationFrame(frame);
        removeEventListener('scroll', schedule);
        removeEventListener('resize', schedule);
        words.forEach((word) => word.style.removeProperty('opacity'));
      };
    }

    words.forEach((word) => {
      word.style.opacity = '.001';
      word.style.transform = 'translateY(20px)';
    });
    const observer = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((entry) => entry.isIntersecting)) return;
        started = true;
        observer.disconnect();
        // Words that share a line share a delay, so a line lands together whatever its length.
        const lines: number[] = [];
        words.forEach((word) => {
          const top = Math.round(word.offsetTop);
          let line = lines.findIndex((seen) => Math.abs(seen - top) < 3);
          if (line < 0) {
            line = lines.length;
            lines.push(top);
          }
          running.push(
            animate(
              word,
              { opacity: 1, y: 0 },
              { type: 'spring', bounce: 0, duration: 0.8, delay: (Tag === 'h2' ? 0.2 : 0.3) + line * 0.05 },
            ),
          );
        });
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      running.forEach((animation) => animation.stop());
      words.forEach((word) => {
        word.style.removeProperty('opacity');
        word.style.removeProperty('transform');
      });
    };
  }, [children, Tag, scroll]);

  return (
    <Tag
      ref={ref}
      className={`${className} ${scroll ? 'scroll-words' : 'line-reveal'}`}
      style={{ '--text-motion': '1' } as CSSProperties}
    >
      {splitWords(children)}
    </Tag>
  );
}
