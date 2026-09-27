import type { ReactNode } from 'react';

/** The section label: a rule, an optional section number, then the label itself. */
export function Eyebrow({ n, children }: { readonly n?: string; readonly children?: ReactNode }) {
  return (
    <div className="eyebrow">
      <i />
      {n && <span>{n}</span>}
      {children}
    </div>
  );
}
