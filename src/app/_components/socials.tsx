'use client';

import { useState } from 'react';

import { ChevronRight, Send } from './icons';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './dialog';

type Channel = 'X' | 'GitHub' | 'Telegram';

/**
 * Community channel buttons. None of the channels is live yet, so each one opens a short
 * "coming soon" dialog naming the channel instead of leaving the site.
 */
export function Socials({
  channels = ['X', 'GitHub', 'Telegram'],
  showLabels = false,
}: {
  readonly channels?: readonly Channel[];
  readonly showLabels?: boolean;
}) {
  const [channel, setChannel] = useState('');
  return (
    <>
      <div className={showLabels ? 'socials social-links' : 'socials'}>
        {channels.map((name) => (
          <button key={name} aria-label={name} onClick={() => setChannel(name)}>
            {name === 'X' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            ) : name === 'GitHub' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.5 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.3a12 12 0 0 1 6.2 0C17.9 4 19 4.3 19 4.3c.6 1.7.2 3 .1 3.3.8.8 1.2 2 1.2 3.3 0 4.7-2.8 5.8-5.5 6.1.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.4 11.4 0 0 0 12 .8" />
              </svg>
            ) : (
              <Send size={17} />
            )}{' '}
            {showLabels && <span>{name === 'X' ? 'Follow us' : name}</span>}
          </button>
        ))}
      </div>
      <Dialog open={!!channel} onOpenChange={() => setChannel('')}>
        <DialogContent className="coming-modal">
          {/* eslint-disable-next-line @next/next/no-img-element -- matches the Lovable markup and CSS */}
          <img src="/brand/logo.png" alt="Bursar" />
          <span className="eyebrow">BURSAR / {channel}</span>
          <DialogTitle>Coming soon.</DialogTitle>
          <DialogDescription>Our {channel} channel is on its way. Stay close.</DialogDescription>
          <button className="solid-button" onClick={() => setChannel('')}>
            Got it <ChevronRight size={18} />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
