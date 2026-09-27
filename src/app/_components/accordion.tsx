'use client';

import { createContext, useContext, useId, useState } from 'react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

import { ChevronDown } from './icons';

/**
 * A single-open, collapsible accordion carrying the attributes the Radix/shadcn accordion from the
 * original build rendered, with the panel height animated by motion rather than by CSS keyframes.
 */

type AccordionContextValue = {
  readonly openValue: string;
  readonly toggle: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextValue>({ openValue: '', toggle: () => {} });

type ItemContextValue = {
  readonly open: boolean;
  readonly value: string;
  readonly triggerId: string;
  readonly contentId: string;
};

const ItemContext = createContext<ItemContextValue | null>(null);

function useItem(): ItemContextValue {
  const item = useContext(ItemContext);
  if (!item) throw new Error('Accordion parts must be rendered inside <AccordionItem>.');
  return item;
}

export function Accordion({
  defaultValue = '',
  className,
  children,
}: {
  readonly defaultValue?: string;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  const [openValue, setOpenValue] = useState(defaultValue);
  // Collapsible: pressing the open item closes it.
  const toggle = (value: string) => setOpenValue((current) => (current === value ? '' : value));

  // Arrow keys, Home and End move between headers, wrapping at either end.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    const target = event.target;
    if (!keys.includes(event.key) || !(target instanceof HTMLElement) || !target.hasAttribute('data-radix-collection-item')) {
      return;
    }
    const triggers = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('button[data-radix-collection-item]:not([disabled])'),
    );
    const index = triggers.indexOf(target as HTMLButtonElement);
    if (index < 0) return;
    event.preventDefault();
    const last = triggers.length - 1;
    const next =
      event.key === 'Home' ? 0 : event.key === 'End' ? last : event.key === 'ArrowDown' ? (index + 1) % triggers.length : (index - 1 + triggers.length) % triggers.length;
    triggers[next]?.focus();
  };

  return (
    <AccordionContext.Provider value={{ openValue, toggle }}>
      <div className={className} data-slot="accordion" data-orientation="vertical" onKeyDown={onKeyDown}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, children }: { readonly value: string; readonly children: ReactNode }) {
  const { openValue } = useContext(AccordionContext);
  const open = openValue === value;
  const triggerId = `radix-${useId()}`;
  const contentId = `radix-${useId()}`;
  const state = open ? 'open' : 'closed';
  return (
    <ItemContext.Provider value={{ open, value, triggerId, contentId }}>
      <div data-state={state} data-orientation="vertical" data-slot="accordion-item" className="border-b last:border-b-0">
        {children}
      </div>
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({ children }: { readonly children: ReactNode }) {
  const { toggle } = useContext(AccordionContext);
  const { open, value, triggerId, contentId } = useItem();
  const state = open ? 'open' : 'closed';
  return (
    <h3 data-orientation="vertical" data-state={state} className="flex">
      <button
        type="button"
        aria-controls={open ? contentId : undefined}
        aria-expanded={open}
        data-state={state}
        data-orientation="vertical"
        id={triggerId}
        data-slot="accordion-trigger"
        className="flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180"
        data-radix-collection-item=""
        onClick={() => toggle(value)}
      >
        {children}
        <ChevronDown className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-500" />
      </button>
    </h3>
  );
}

const CONTENT_VARS = {
  '--radix-accordion-content-height': 'var(--radix-collapsible-content-height)',
  '--radix-accordion-content-width': 'var(--radix-collapsible-content-width)',
} as CSSProperties;

export function AccordionContent({ children }: { readonly children: ReactNode }) {
  const { open, triggerId, contentId } = useItem();
  const reduced = useReducedMotion();
  return (
    <motion.div
      data-slot="accordion-content"
      className="overflow-hidden text-sm"
      initial={false}
      animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
      transition={reduced ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.6 }}
      inert={!open}
      aria-hidden={!open}
      data-state={open ? 'open' : 'closed'}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-orientation="vertical"
      style={CONTENT_VARS}
    >
      <div className="pt-0 pb-4">{children}</div>
    </motion.div>
  );
}
