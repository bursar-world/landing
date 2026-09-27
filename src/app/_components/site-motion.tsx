'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { animate } from 'motion';
import type { AnimationPlaybackControls } from 'motion';
import Lenis from 'lenis';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/** Section cards drift up into place as their section scrolls in; each card has its own distance. */
const PARALLAX = [
  { section: '.mission', items: '.metric', distances: [100, 100, 250, 250] },
  { section: '.roles', items: '.role-card', distances: [100, 225, 100, 225] },
  { section: '.lanes', items: '.lane-card', distances: [250, 150, 50] },
];

/** How far each process card starts below its resting place, in pixels. */
const STEP_OFFSETS = [48, 96, 144, 48, 96, 144];

/**
 * The page-wide motion layer: smooth scrolling, reveal-on-scroll, image zoom on cards, hero
 * parallax, card parallax, the draggable marquee and the hero entrance. It renders nothing and
 * works on the server-rendered DOM, so it has to wait until React has hydrated `main` before
 * touching anything; it gives up waiting after 180 frames (pages without a `main`) and runs anyway.
 */
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    let teardown: (() => void) | null = null;
    const frames: number[] = [];

    const start = () => {
      if (pathname.startsWith('/dashboard')) return;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const running: AnimationPlaybackControls[] = [];
      const lenis = reduced ? null : new Lenis({ autoRaf: true, anchors: true, allowNestedScroll: true, lerp: 0.1 });
      let scrollFrame = 0;
      const unlisten: (() => void)[] = [];

      const reveal = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            reveal.unobserve(entry.target);
          }),
        { threshold: 0 },
      );
      document.querySelectorAll('.reveal').forEach((node) => reveal.observe(node));

      const zoomIn = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (!reduced) {
              running.push(
                animate(entry.target, { scale: [1.2, 1] }, { type: 'spring', stiffness: 100, damping: 60, mass: 1 }),
              );
            }
            zoomIn.unobserve(entry.target);
          }),
        { threshold: 0 },
      );
      document.querySelectorAll<HTMLElement>('.capability-inset img,.article-art img').forEach((image) => {
        zoomIn.observe(image);
        const card = image.closest('a');
        if (!card) return;
        const enter = () => {
          if (!reduced) running.push(animate(image, { scale: 1.1 }, { type: 'spring', bounce: 0, duration: 0.5 }));
        };
        const leave = () => {
          if (!reduced) running.push(animate(image, { scale: 1 }, { type: 'spring', bounce: 0, duration: 0.5 }));
        };
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
        unlisten.push(() => {
          card.removeEventListener('mouseenter', enter);
          card.removeEventListener('mouseleave', leave);
        });
      });

      const hero = document.querySelector<HTMLElement>('.hero');
      const heroImage = document.querySelector<HTMLElement>('.hero-stock');
      const parallax = PARALLAX.map((group) => ({
        ...group,
        node: document.querySelector(group.section),
        elements: Array.from(document.querySelectorAll<HTMLElement>(group.items)),
      }));

      // The process cards ease towards their target offset on their own clock rather than
      // tracking scroll exactly, which is what gives them their lag.
      const process = document.querySelector('.process');
      const steps = Array.from(document.querySelectorAll<HTMLElement>('.step-card'));
      let stepFrame = 0;
      let stepCurrent = 0;
      let stepTarget = 0;
      let stepLast = 0;
      const paintSteps = () =>
        steps.forEach((step, i) => {
          step.style.translate = `0 ${(STEP_OFFSETS[i] ?? 0) * stepCurrent}px`;
        });
      const stepTick = (now: number) => {
        const dt = Math.min(50, now - stepLast);
        stepLast = now;
        stepCurrent += (stepTarget - stepCurrent) * (1 - Math.exp(-dt / 160));
        if (Math.abs(stepCurrent - stepTarget) < 2e-4) {
          stepCurrent = stepTarget;
          stepFrame = 0;
          paintSteps();
          return;
        }
        paintSteps();
        stepFrame = requestAnimationFrame(stepTick);
      };
      const updateSteps = (immediate = false) => {
        if (!process) return;
        const rect = process.getBoundingClientRect();
        const progress = clamp01((innerHeight - rect.top) / rect.height);
        stepTarget = reduced || innerWidth < 810 ? 0 : 1 - progress * progress * (3 - 2 * progress);
        if (immediate || reduced || innerWidth < 810) {
          cancelAnimationFrame(stepFrame);
          stepFrame = 0;
          stepCurrent = stepTarget;
          paintSteps();
          return;
        }
        if (!stepFrame && Math.abs(stepCurrent - stepTarget) > 2e-4) {
          stepLast = performance.now();
          stepFrame = requestAnimationFrame(stepTick);
        }
      };
      updateSteps(true);

      const onScroll = () => {
        if (hero && heroImage) {
          const progress = reduced ? 0 : clamp01(-hero.getBoundingClientRect().top / hero.offsetHeight);
          heroImage.style.transform = `translateY(${300 * progress}px) scale(${1 + 0.2 * progress})`;
          heroImage.style.opacity = String(1 - 0.5 * progress);
        }
        parallax.forEach((group) => {
          if (!group.node) return;
          const rect = group.node.getBoundingClientRect();
          const progress = clamp01((innerHeight - rect.top) / rect.height);
          group.elements.forEach((element, i) => {
            const distance = group.distances[i] ?? 0;
            element.style.translate = `0 ${reduced || innerWidth < 810 ? 0 : distance * (1 - progress)}px`;
          });
        });
        updateSteps();
      };
      const scheduleScroll = () => {
        scrollFrame ||= requestAnimationFrame(() => {
          scrollFrame = 0;
          onScroll();
        });
      };
      onScroll();
      addEventListener('scroll', scheduleScroll, { passive: true });
      addEventListener('resize', scheduleScroll);

      // The marquee runs on motion rather than CSS so it can slow under the pointer and be dragged.
      const track = document.querySelector<HTMLElement>('.marquee>div');
      const marquee = track?.parentElement;
      const set = track?.querySelector<HTMLElement>('.marquee-set');
      let loop: AnimationPlaybackControls | undefined;
      if (track && set && !reduced) {
        loop = animate(track, { x: [0, -set.offsetWidth] }, { duration: set.offsetWidth / 40, ease: 'linear', repeat: Infinity });
      }
      if (marquee && loop) {
        const controls = loop;
        let dragging = false;
        let lastX = 0;
        const slow = () => {
          controls.speed = 0.2;
        };
        const resume = () => {
          if (!dragging) controls.speed = 1;
        };
        const down = (event: PointerEvent) => {
          dragging = true;
          lastX = event.clientX;
          marquee.setPointerCapture(event.pointerId);
          controls.pause();
        };
        const move = (event: PointerEvent) => {
          if (!dragging) return;
          const duration = controls.duration;
          controls.time = (((controls.time + (lastX - event.clientX) / 40) % duration) + duration) % duration;
          lastX = event.clientX;
        };
        const up = () => {
          dragging = false;
          controls.play();
          resume();
        };
        marquee.addEventListener('pointerenter', slow);
        marquee.addEventListener('pointerleave', resume);
        marquee.addEventListener('pointerdown', down);
        marquee.addEventListener('pointermove', move);
        marquee.addEventListener('pointerup', up);
        marquee.addEventListener('pointercancel', up);
        unlisten.push(() => {
          marquee.removeEventListener('pointerenter', slow);
          marquee.removeEventListener('pointerleave', resume);
          marquee.removeEventListener('pointerdown', down);
          marquee.removeEventListener('pointermove', move);
          marquee.removeEventListener('pointerup', up);
          marquee.removeEventListener('pointercancel', up);
        });
      }

      if (!reduced) {
        document.querySelectorAll<HTMLElement>('.hero-copy>p,.hero-copy>div>p,.hero-bottom h1').forEach((node, i) => {
          const heading = node.tagName === 'H1';
          running.push(
            animate(
              node,
              { opacity: [0, 1], y: [heading ? 50 : 10, 0] },
              { type: 'spring', bounce: 0, duration: 0.8, delay: i === 0 || heading ? 0.3 : 0.6 - i * 0.1 },
            ),
          );
        });
      }

      teardown = () => {
        zoomIn.disconnect();
        reveal.disconnect();
        cancelAnimationFrame(scrollFrame);
        cancelAnimationFrame(stepFrame);
        lenis?.destroy();
        loop?.stop();
        running.forEach((animation) => animation.stop());
        unlisten.forEach((remove) => remove());
        removeEventListener('scroll', scheduleScroll);
        removeEventListener('resize', scheduleScroll);
      };
    };

    const hydrated = () => {
      const main = document.querySelector('main');
      return !!main && Object.keys(main).some((key) => key.startsWith('__react'));
    };
    let waited = 0;
    const wait = () => {
      if (disposed) return;
      if (hydrated() || waited++ > 180) {
        start();
        return;
      }
      frames.push(requestAnimationFrame(wait));
    };
    frames.push(requestAnimationFrame(wait));

    return () => {
      disposed = true;
      frames.forEach(cancelAnimationFrame);
      teardown?.();
    };
  }, [pathname]);

  return null;
}
