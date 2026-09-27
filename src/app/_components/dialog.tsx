'use client';

import { createContext, useContext, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';

import { Close } from './icons';

/**
 * A modal dialog with the markup, data attributes and behaviour of the shadcn dialog the original
 * build used (Radix underneath): portalled overlay and content, `data-state` driving the enter and
 * exit keyframes in site.css, focus trapped inside, Escape and outside presses close the topmost
 * dialog only, the page behind is inert to pointer, scroll and assistive technology while it is up.
 */

type DialogContextValue = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly contentId: string;
  readonly titleId: string;
  readonly descriptionId: string;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialog(): DialogContextValue {
  const value = useContext(DialogContext);
  if (!value) throw new Error('Dialog parts must be rendered inside <Dialog>.');
  return value;
}

export function Dialog({
  open,
  onOpenChange,
  id,
  children,
}: {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  /** The content's id, for a trigger outside the dialog that names it with `aria-controls`. */
  readonly id?: string;
  readonly children: ReactNode;
}) {
  const generatedId = `radix-${useId()}`;
  const contentId = id ?? generatedId;
  const titleId = `radix-${useId()}`;
  const descriptionId = `radix-${useId()}`;
  return (
    <DialogContext.Provider value={{ open, onOpenChange, contentId, titleId, descriptionId }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTitle({ className, children }: { readonly className?: string; readonly children: ReactNode }) {
  const { titleId } = useDialog();
  return (
    <h2 id={titleId} data-slot="dialog-title" className={join('text-lg leading-none font-semibold', className)}>
      {children}
    </h2>
  );
}

export function DialogDescription({
  className,
  children,
}: {
  readonly className?: string;
  readonly children: ReactNode;
}) {
  const { descriptionId } = useDialog();
  return (
    <p id={descriptionId} data-slot="dialog-description" className={join('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
}

const OVERLAY_CLASS =
  'fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0';
const CONTENT_CLASS =
  'fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg';
const CLOSE_CLASS =
  "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

export function DialogContent({ className, children }: { readonly className?: string; readonly children: ReactNode }) {
  const dialog = useDialog();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayPresent = usePresence(dialog.open, overlayRef);
  const contentPresent = usePresence(dialog.open, contentRef);
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  if (!hydrated || (!overlayPresent && !contentPresent)) return null;
  const state = dialog.open ? 'open' : 'closed';
  return createPortal(
    <>
      {overlayPresent && (
        <div
          ref={overlayRef}
          data-state={state}
          data-slot="dialog-overlay"
          className={OVERLAY_CLASS}
          style={{ pointerEvents: 'auto' }}
        />
      )}
      {contentPresent && (
        <ModalLayer contentRef={contentRef} className={join(CONTENT_CLASS, className)} state={state}>
          {children}
          <button
            type="button"
            data-slot="dialog-close"
            className={CLOSE_CLASS}
            onClick={() => dialog.onOpenChange(false)}
          >
            <Close />
            <span className="sr-only">Close</span>
          </button>
        </ModalLayer>
      )}
    </>,
    document.body,
  );
}

function ModalLayer({
  contentRef,
  className,
  state,
  children,
}: {
  readonly contentRef: RefObject<HTMLDivElement | null>;
  readonly className: string;
  readonly state: 'open' | 'closed';
  readonly children: ReactNode;
}) {
  const dialog = useDialog();
  const layer = useLayer(contentRef);
  const lastFocused = useRef<HTMLElement | null>(null);
  const open = dialog.open;
  const close = useLatest(() => dialog.onOpenChange(false));

  // Escape and presses outside close only the dialog on top; one opened from inside another
  // leaves its parent where it was.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !layer.isTop()) return;
      event.preventDefault();
      close.current();
    };
    const onPointerDown = (event: PointerEvent) => {
      const content = contentRef.current;
      if (!content || !layer.isTop() || !(event.target instanceof Node) || content.contains(event.target)) return;
      // A right click or ctrl-click outside is someone reaching for a context menu, not dismissing.
      if (event.button === 2 || (event.button === 0 && event.ctrlKey)) return;
      close.current();
    };
    document.addEventListener('keydown', onKey, { capture: true });
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey, { capture: true });
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [close, contentRef, layer]);

  // Focus lands on the first control that is not a link, and cannot leave while the dialog is open.
  // On close it goes back to whatever opened the dialog, so a keyboard reader is not dropped at the
  // top of the page.
  useEffect(() => {
    const content = contentRef.current;
    if (!content || !open) return;
    const opener = document.activeElement instanceof HTMLElement && !content.contains(document.activeElement) ? document.activeElement : null;
    const first = tabbables(content).find((node) => node.tagName !== 'A');
    (first ?? content).focus({ preventScroll: true });
    const onFocusIn = (event: FocusEvent) => {
      if (!layer.isTop()) return;
      const target = event.target;
      if (target instanceof HTMLElement && content.contains(target)) lastFocused.current = target;
      else (lastFocused.current ?? content).focus({ preventScroll: true });
    };
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [contentRef, layer, open]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || event.altKey || event.ctrlKey || event.metaKey || !open) return;
    const nodes = tabbables(event.currentTarget);
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (!first || !last) {
      event.preventDefault();
      return;
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  };

  return (
    <div
      ref={contentRef}
      role="dialog"
      id={dialog.contentId}
      aria-describedby={dialog.descriptionId}
      aria-labelledby={dialog.titleId}
      data-state={state}
      data-slot="dialog-content"
      className={className}
      tabIndex={-1}
      style={{ pointerEvents: layer.pointerEvents }}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}

/** Open dialogs, oldest first. Only the last one answers Escape and presses outside. */
const layers: HTMLElement[] = [];
const listeners = new Set<() => void>();
let savedPointerEvents = '';

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function noopSubscribe() {
  return () => {};
}

/**
 * Register the content as a modal layer for as long as it is mounted, including its exit
 * animation, which is how long the page behind stays locked.
 */
function useLayer(contentRef: RefObject<HTMLDivElement | null>) {
  const top = useSyncExternalStore(
    subscribe,
    () => layers[layers.length - 1] ?? null,
    () => null,
  );

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    if (layers.length === 0) {
      savedPointerEvents = document.body.style.pointerEvents;
      document.body.style.pointerEvents = 'none';
    }
    layers.push(content);
    const restoreScroll = lockScroll();
    const restoreHidden = hideOthers(content);
    notify();
    return () => {
      layers.splice(layers.indexOf(content), 1);
      if (layers.length === 0) document.body.style.pointerEvents = savedPointerEvents;
      restoreHidden();
      restoreScroll();
      notify();
    };
  }, [contentRef]);

  const isTop = useLatest(() => layers[layers.length - 1] === contentRef.current);
  const [api] = useState(() => ({ isTop: () => isTop.current() }));
  const content = contentRef.current;
  return {
    isTop: api.isTop,
    pointerEvents: (content && top !== content ? 'none' : 'auto') as 'none' | 'auto',
  };
}

let scrollLocks = 0;
let savedScroll: { overflow: string; marginRight: string } | null = null;

function blockOutsideScroll(event: Event) {
  const target = event.target;
  if (target instanceof Node && layers.some((layer) => layer.contains(target))) return;
  if (event.cancelable) event.preventDefault();
}

function lockScroll() {
  if (scrollLocks++ === 0) {
    const gap = innerWidth - document.documentElement.clientWidth;
    const style = document.body.style;
    savedScroll = { overflow: style.getPropertyValue('overflow'), marginRight: style.getPropertyValue('margin-right') };
    style.setProperty('overflow', 'hidden', 'important');
    if (gap > 0) style.setProperty('margin-right', `${gap}px`, 'important');
    document.body.setAttribute('data-scroll-locked', '1');
    document.addEventListener('wheel', blockOutsideScroll, { passive: false });
    document.addEventListener('touchmove', blockOutsideScroll, { passive: false });
  }
  return () => {
    if (--scrollLocks > 0) return;
    const style = document.body.style;
    style.removeProperty('overflow');
    style.removeProperty('margin-right');
    if (savedScroll?.overflow) style.setProperty('overflow', savedScroll.overflow);
    if (savedScroll?.marginRight) style.setProperty('margin-right', savedScroll.marginRight);
    document.body.removeAttribute('data-scroll-locked');
    document.removeEventListener('wheel', blockOutsideScroll);
    document.removeEventListener('touchmove', blockOutsideScroll);
  };
}

/** Hide everything beside the dialog from assistive technology, and undo only what was changed. */
function hideOthers(keep: HTMLElement) {
  const changed: Element[] = [];
  for (const node of Array.from(document.body.children)) {
    if (node === keep || node.contains(keep) || node.tagName === 'SCRIPT') continue;
    if (node.getAttribute('aria-hidden') === 'true') continue;
    node.setAttribute('aria-hidden', 'true');
    node.setAttribute('data-aria-hidden', 'true');
    changed.push(node);
  }
  return () => {
    for (const node of changed) {
      node.removeAttribute('aria-hidden');
      node.removeAttribute('data-aria-hidden');
    }
  };
}

/**
 * Keep an element mounted after `present` turns false until its exit animation has run, the way
 * Radix Presence does, so `data-state="closed"` has time to play the keyframes.
 */
function usePresence(present: boolean, ref: RefObject<HTMLElement | null>) {
  const [mounted, setMounted] = useState(present);
  const openAnimation = useRef('none');

  if (present && !mounted) setMounted(true);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (present) {
      openAnimation.current = getComputedStyle(node).animationName;
      return;
    }
    const styles = getComputedStyle(node);
    const exit = styles.animationName;
    if (exit === 'none' || styles.display === 'none' || exit === openAnimation.current) {
      setMounted(false);
      return;
    }
    const onEnd = (event: AnimationEvent) => {
      if (event.target === node) setMounted(false);
    };
    node.addEventListener('animationend', onEnd);
    node.addEventListener('animationcancel', onEnd);
    return () => {
      node.removeEventListener('animationend', onEnd);
      node.removeEventListener('animationcancel', onEnd);
    };
  }, [present, ref]);

  return present || mounted;
}

function useLatest<T>(value: T) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}

function tabbables(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]',
    ),
  ).filter(
    (node) =>
      node.tabIndex >= 0 &&
      !node.hasAttribute('disabled') &&
      !(node instanceof HTMLInputElement && node.type === 'hidden') &&
      node.getClientRects().length > 0,
  );
}

function join(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}
