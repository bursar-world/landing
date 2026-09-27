import { GITHUB_URL, X_URL } from '../_content';

type Channel = 'X' | 'GitHub';

const LINKS: Record<Channel, string> = { X: X_URL, GitHub: GITHUB_URL };

/** Community channel links. Only live channels are listed. */
export function Socials({
  channels = ['X', 'GitHub'],
  showLabels = false,
}: {
  readonly channels?: readonly Channel[];
  readonly showLabels?: boolean;
}) {
  return (
    <div className={showLabels ? 'socials social-links' : 'socials'}>
      {channels.map((name) => (
        <a key={name} aria-label={name} href={LINKS[name]} target="_blank" rel="noopener noreferrer">
          {name === 'X' ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.5 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.3a12 12 0 0 1 6.2 0C17.9 4 19 4.3 19 4.3c.6 1.7.2 3 .1 3.3.8.8 1.2 2 1.2 3.3 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.4 11.4 0 0 0 12 .8" />
            </svg>
          )}{' '}
          {showLabels && <span>{name === 'X' ? 'Follow us' : name}</span>}
        </a>
      ))}
    </div>
  );
}
