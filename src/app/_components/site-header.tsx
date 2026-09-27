'use client';

import { useEffect, useId, useState } from 'react';

import { menuLinks } from '../_content';
import { Action } from './action';
import { ArrowUpRight } from './icons';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './dialog';
import { Socials } from './socials';

/**
 * The site header: menu toggle, wordmark, the visitor's local time and the app button. The clock
 * renders empty on the server and fills in after hydration, since the server has no idea where
 * the visitor is; it refreshes once a minute because it only shows hours and minutes.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState('');
  const menuId = useId();

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const timer = setInterval(tick, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="site-header">
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-haspopup="dialog"
          aria-label={menuOpen ? 'Close menu' : undefined}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span aria-hidden="true">⠿</span>
          {/* While open the dialog's own close button takes over, and this one sits under the backdrop. */}
          {!menuOpen && 'Menu'}
        </button>
        <a className="small-wordmark" href="/">
          BURSAR®
        </a>
        <span className="local-time">
          {time} <em>LOCAL TIME</em>
        </span>
        <Action>
          Launch app <small>/Bursar</small>
        </Action>
      </header>
      <Dialog id={menuId} open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="nav-modal">
          <DialogTitle className="eyebrow">Explore Bursar</DialogTitle>
          <DialogDescription className="sr-only">Website navigation</DialogDescription>
          {menuLinks.map(([label, href], i) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              <small>0{i + 1}</small>
              {label}
              <ArrowUpRight />
            </a>
          ))}
          <Socials />
        </DialogContent>
      </Dialog>
    </>
  );
}
