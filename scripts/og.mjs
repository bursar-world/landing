// Renders the 1200x630 share card for every page into public/og, in the site's own type and
// imagery. Uses the locally installed Chrome. Run with `pnpm og` after changing a page title.
import { mkdirSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

import { capabilities, posts } from '../src/app/_content.ts';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = `${ROOT}public/og/`;

const CARDS = [
  ['home', 'Private agent budgets', 'Give your agents a budget, not your bank.'],
  ['about', 'About Bursar', 'Your agents. Your limits.'],
  ['blog', 'Resources', 'Protocol notes.'],
  ...posts.map((post) => [`blog-${post.slug}`, `${post.category} / Bursar research`, post.title]),
  ['portfolio', 'Protocol / capabilities', 'Control. By design.'],
  ...capabilities.map((capability) => [`portfolio-${capability.slug}`, capability.category, capability.title]),
  ['contact', 'Contact', 'Give autonomy a boundary.'],
  ['privacy', 'Legal', 'Privacy policy.'],
  ['terms', 'Legal', 'Terms of use.'],
];

const dataUri = (path, type) => `data:${type};base64,${readFileSync(ROOT + path).toString('base64')}`;
const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const page = (eyebrow, title) => `<!doctype html><html><head><style>
@font-face{font-family:Zalando Sans;src:url(${dataUri('public/fonts/zalando.woff2', 'font/woff2')})format("woff2");font-weight:100 900}
@font-face{font-family:Geist Mono;src:url(${dataUri('public/fonts/geist-mono.woff2', 'font/woff2')})format("woff2");font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;position:relative;overflow:hidden;color:#342440;font-family:Zalando Sans}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.wash{position:absolute;inset:0;background:linear-gradient(100deg,#faf8f7f2 0%,#faf8f7d9 55%,#faf8f740 100%)}
.card{position:absolute;inset:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.brand{display:flex;align-items:center;gap:18px;font-size:30px;font-weight:500;letter-spacing:-.04em}
.brand img{width:56px;height:56px;border-radius:50%;border:1px solid #fff}
.eyebrow{font:500 20px Geist Mono;text-transform:uppercase;letter-spacing:.02em;color:#5f4f66;margin-bottom:26px}
h1{font-weight:400;text-transform:uppercase;letter-spacing:-.06em;line-height:.98;font-size:${title.length > 30 ? 72 : 88}px;max-width:960px}
.foot{display:flex;justify-content:space-between;font:500 18px Geist Mono;text-transform:uppercase;color:#5f4f66}
</style></head><body>
<img class="bg" src="${dataUri('public/stock/glass.jpg', 'image/jpeg')}">
<div class="wash"></div>
<div class="card">
  <div class="brand"><img src="${dataUri('public/brand/logo.png', 'image/png')}">BURSAR®</div>
  <div><p class="eyebrow">${escape(eyebrow)}</p><h1>${escape(title)}</h1></div>
  <div class="foot"><span>Your agents. Your limits.</span><span>bursar.world</span></div>
</div></body></html>`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [name, eyebrow, title] of CARDS) {
  await tab.setContent(page(eyebrow, title), { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: `${OUT}${name}.jpg`, type: 'jpeg', quality: 88 });
  console.log(name);
}
await browser.close();
