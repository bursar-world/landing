# bursar.world

[![ci](https://github.com/bursar-world/landing/actions/workflows/ci.yml/badge.svg)](https://github.com/bursar-world/landing/actions/workflows/ci.yml)
[![license: MIT](https://img.shields.io/badge/license-MIT-49345f.svg)](LICENSE)

The Bursar website: what Bursar is, the capabilities behind it, protocol notes, and the way into
the console at [app.bursar.world](https://app.bursar.world). The protocol, the console and the
SDKs live in [bursar-world/bursar](https://github.com/bursar-world/bursar).

Next.js 15, exported as static files and served from a CDN. No server, no keys, no chain reads.

## Develop

Requires Node 22 and pnpm 11 (`corepack enable` picks up the pinned version).

```sh
pnpm install
pnpm dev                 # http://localhost:4320
pnpm typecheck           # tsc --noEmit
pnpm build               # static export in out/
```

The export writes each route as a flat file (`out/about.html`, `out/blog/a-wallet-is-not-a-budget.html`),
so `out/` needs a static server that maps clean URLs like `/about` onto them. Render's static
sites and `npx serve out` both do this; a plain file server will 404 on everything but the home page.

| Variable | Default | What it sets |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | `https://app.bursar.world` | Where "Launch app" and every console link go |
| `NEXT_PUBLIC_SITE_URL` | `https://bursar.world` | The origin share images resolve against |

## Layout

| Path | What it holds |
|---|---|
| `src/app/` | One folder per route. Pages are server components; only interactive pieces run in the browser. |
| `src/app/_content.ts` | Every piece of copy and data the pages render. |
| `src/app/_components/` | Header, footer, buttons, dialogs, motion. |
| `src/app/site.css` | The design system. |
| `src/app/site-extra.css` | Our additions on top of it. |
| `public/` | Brand marks, photography and fonts. See [NOTICE.md](NOTICE.md) for their terms. |

## Contributing

Issues and pull requests are welcome. Anything beyond the website itself (contracts, console,
SDKs, services) belongs in [bursar-world/bursar](https://github.com/bursar-world/bursar), which
also has the contribution guide and code of conduct.

Report vulnerabilities privately, as described in [SECURITY.md](SECURITY.md).

## License

The code is MIT licensed. The Bursar name and marks, the photography and the fonts are covered
separately; see [NOTICE.md](NOTICE.md).
