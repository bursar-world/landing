import { CONSOLE_HREF, footerLinks } from '../_content';
import { Action } from './action';
import { Eyebrow } from './eyebrow';
import { ArrowUpRight } from './icons';
import { Socials } from './socials';
import { SplitWords } from './split-words';

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-profile">
        {/* eslint-disable-next-line @next/next/no-img-element -- matches the Lovable markup and CSS */}
        <img src="/brand/logo.png" alt="Bursar" />
        <Action>
          Open dashboard <small>/Bursar</small>
        </Action>
        <div className="identity-title">
          <Eyebrow>Bursar</Eyebrow>
        </div>
        <div className="footer-mini">
          <span>Purpose</span>
          <span>Private agent budgets</span>
          <span>Network</span>
          <span>Robinhood Chain</span>
        </div>
        <a className="footer-wordmark" href="/">
          BURSAR®
        </a>
        <p className="eyebrow">Your agents. Your limits.</p>
      </div>
      <div className="footer-content">
        <Eyebrow>Contact</Eyebrow>
        <SplitWords>
          Give autonomy
          <br />a boundary.
        </SplitWords>
        <div className="community-contact">
          <SplitWords as="p">
            Have a question? Follow Bursar on X and Telegram for updates, conversations, and a direct line to our
            community.
          </SplitWords>
          <Socials channels={['X', 'GitHub', 'Telegram']} showLabels />
        </div>
        <div className="footer-links">
          <nav>
            {footerLinks.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div>
            <p>
              Private mandates.
              <br />
              RWA-native budgets.
              <br />
              Agent-first infrastructure.
            </p>
            <a className="text-link" href={CONSOLE_HREF}>
              Enter Bursar{' '}
              <span>
                <ArrowUpRight size={18} />
              </span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 BURSAR
            <br />
            All rights reserved.
          </span>
          <span>
            <a href="/terms">Terms</a>
            <br />
            <a href="/privacy">Privacy policy</a>
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
