/**
 * The six Lucide glyphs the site uses, written out so the markup matches what lucide-react 0.x
 * renders without pulling the package into the app for six paths.
 */
type IconProps = {
  readonly size?: number;
  readonly className?: string;
};

function icon(name: string, paths: readonly string[]) {
  function Icon({ size = 24, className }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className ? `lucide lucide-${name} ${className}` : `lucide lucide-${name}`}
        aria-hidden="true"
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  }
  return Icon;
}

export const ArrowUpRight = icon('arrow-up-right', ['M7 7h10v10', 'M7 17 17 7']);
export const ChevronDown = icon('chevron-down', ['m6 9 6 6 6-6']);
export const ChevronRight = icon('chevron-right', ['m9 18 6-6-6-6']);
export const Send = icon('send', [
  'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z',
  'm21.854 2.147-10.94 10.939',
]);
export const ShieldCheck = icon('shield-check', [
  'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
  'm9 12 2 2 4-4',
]);
export const Close = icon('x', ['M18 6 6 18', 'm6 6 12 12']);
