import { CONSOLE_HREF, footerLinks } from '../_content';
import { Action } from './action';
import { Eyebrow } from './eyebrow';
import { Picture } from './picture';
import { ArrowUpRight } from './icons';
import { Socials } from './socials';
import { SplitWords } from './split-words';

/**
 * On /contact the footer is the page, so there its heading is the page's h1 and it lists the
 * email address beside the community channels.
 */
export function SiteFooter({ contact = false }: { readonly contact?: boolean }) {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-profile">
        {/* On /contact the footer is the first screen, and this image its largest element. */}
        <Picture image="brand/logo" alt="Bursar" sizes="27vw" priority={contact} />
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
        <SplitWords as={contact ? 'h1' : 'h2'}>
          Give autonomy
          <br />a boundary.
        </SplitWords>
        <div className="community-contact">
          <SplitWords as="p">
            Have a question? Follow Bursar on X for updates and conversations, and find the code on GitHub.
          </SplitWords>
          <Socials showLabels />
          {contact && (
            <a className="text-link contact-email" href="mailto:hello@bursar.world">
              Email hello@bursar.world{' '}
              <span>
                <ArrowUpRight size={18} />
              </span>
            </a>
          )}
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
