/**
 * Everything the public site says, kept apart from the markup so the pages stay about structure.
 * The copy is carried over verbatim from the Lovable build; edits belong in a separate pass.
 */

/** The console runs as its own service; every link from the site to it is a full load to that origin. */
export const CONSOLE_HREF = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.bursar.world'}/console`;

export type Capability = {
  readonly slug: string;
  readonly name: string;
  readonly category: string;
  readonly title: string;
  readonly summary: string;
  readonly body: string;
  readonly points: readonly string[];
  readonly image: string;
  /** The landing page describes the photograph rather than naming the layer. */
  readonly landingAlt: string;
};

export const capabilities: readonly Capability[] = [
  {
    slug: 'private-mandates',
    name: 'Private mandates',
    category: 'Control layer',
    title: 'A budget with boundaries.',
    summary: 'Set the amount, the period, and exactly what your agent can do.',
    body: 'A mandate defines a total budget, a per-period spending cap, allowed spend classes, counterparties, expiry, and a funding lane. The principal can amend or revoke the mandate. The protocol design commits the terms on-chain while retaining the readable terms in the principal’s viewing-key space.',
    points: [
      'Total and per-period budgets',
      'Spend-class and counterparty rules',
      'Expiry, amendment, and revocation',
    ],
    image: '/stock/control.jpg',
    landingAlt: 'Minimalist stairs inside a structured concrete interior',
  },
  {
    slug: 'rwa-funding',
    name: 'RWA funding',
    category: 'Capital layer',
    title: 'Put idle budgets to work.',
    summary: 'Treasury-funded budgets, eligible stock purchases, and collateral lanes.',
    body: 'Bursar’s RWA architecture connects treasury-token funding to agent spending. Idle budgets track treasury NAV rather than a projected return. Eligible stock purchases use a Chainlink reference with the asset’s multiplier and a slippage limit. Collateralized mandates use registry-defined assets and haircut tiers; stale or paused prices defer execution.',
    points: [
      'USDG or treasury-token funding',
      'Registry-gated stock purchases',
      'Published collateral haircut tiers',
    ],
    image: '/stock/treasury.jpg',
    landingAlt: 'A rhythmic colonnade representing treasury infrastructure',
  },
  {
    slug: 'confidential-settlement',
    name: 'Confidential settlement',
    category: 'Privacy layer',
    title: 'Proof, without exposure.',
    summary: 'Verify the rules without revealing the principal or the full ledger.',
    body: 'The privacy design combines stealth agent wallets, confidential counters, mandate commitments, and zero-knowledge proofs. A provider verifies that a spend is within the mandate without reading its full terms. Scoped disclosure grants allow bonded resolvers to inspect only the relevant slice of a dispute.',
    points: [
      'Within-mandate verification',
      'Selective dispute disclosure',
      'Public epoch solvency proofs',
    ],
    image: '/stock/privacy.jpg',
    landingAlt: 'Reflective glass architecture against a pastel sky',
  },
];

export type Post = {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly intro: string;
  readonly body: readonly string[];
};

export const posts: readonly Post[] = [
  {
    slug: 'a-wallet-is-not-a-budget',
    title: 'A wallet is not a budget.',
    category: 'Mandates',
    intro: 'Why autonomous agents need explicit spending rules.',
    body: [
      'An agent wallet answers where funds live. It does not answer how much an agent may spend, which counterparties it may pay, or when its authority ends. Bursar organizes those decisions into a mandate.',
      'The mandate records a total budget and a period cap, plus spend classes, allowed counterparties, expiry, and the funding lane. Those controls make the scope of delegated authority explicit.',
      'Start with a narrow mandate. Choose the services your agent needs, specify the counterparties, and set an expiry. Amend the mandate as the task changes instead of handing the agent an unrestricted balance.',
    ],
  },
  {
    slug: 'treasuries-inside-the-mandate',
    title: 'Treasuries inside the mandate.',
    category: 'RWA architecture',
    intro: 'How treasury NAV fits into an agent’s spending budget.',
    body: [
      'The Bursar design supports treasury-token budgets alongside USDG. Treasury notes represent the parked value of an unspent budget; settlement draws on that value when an approved spend occurs.',
      'Accounting uses an asset’s NAV and applicable multiplier. A projected yield is not a balance, and a stale NAV must not silently create new spending power.',
      'Stock tokens and treasury tokens remain subject to eligibility and jurisdiction requirements. The registry and price guards are part of the spending boundary.',
    ],
  },
  {
    slug: 'privacy-with-accountability',
    title: 'Private does not mean unaccountable.',
    category: 'Privacy',
    intro: 'Selective disclosure and solvency are part of the design.',
    body: [
      'Private spending should not require a public record of every principal-agent relationship. Stealth wallets and committed mandate terms are designed to reduce that exposure.',
      'Counterparties need evidence that the rules are satisfied. A within-mandate proof can establish that a spend respects a cap, class, and counterparty rule without disclosing the complete mandate.',
      'Dispute resolution uses scoped disclosure grants. Public epoch solvency proofs provide a separate accountability surface without publishing every private transaction.',
    ],
  },
  {
    slug: 'verify-hold-settle-repay',
    title: 'Verify. Hold. Settle. Repay.',
    category: 'Infrastructure',
    intro: 'The four stages of controlled agent spending.',
    body: [
      'The facilitator first checks the mandate and requested spend. A valid request reserves a hold so concurrent requests cannot reuse the same available budget.',
      'Settlement records the receipt and completes the approved payment path. Agent hires use escrow, while eligible stock purchases pass through the settlement router and its price checks.',
      'Repayment applies to the collateralized lane. It is separate from prefunded spending, and its debt and collateral health must remain explicit.',
    ],
  },
];

/** Article cards pick their art by position, so the fourth post always gets the fourth image. */
export const articleArt: readonly { readonly src: string; readonly alt: string }[] = [
  { src: '/stock/control.jpg', alt: 'Structured concrete stairs' },
  { src: '/stock/columns.jpg', alt: 'Treasury-inspired classical columns' },
  { src: '/stock/privacy.jpg', alt: 'Reflective glass façade' },
  { src: '/stock/structure.jpg', alt: 'Modern infrastructure' },
];

export type Pair = readonly [title: string, copy: string];
export type Triple = readonly [label: string, title: string, copy: string];

export const faq: readonly Pair[] = [
  [
    'What is a Bursar mandate?',
    'A scoped spending authorization for an AI agent: total budget, per-period cap, allowed spend classes, counterparties, expiry, and a prefund or collateralized lane.',
  ],
  [
    'What can an agent spend on?',
    'The specification defines three classes: inference and x402 services, hiring other agents through escrow, and eligible tokenized-stock purchases. Each mandate selects its allowed classes.',
  ],
  [
    'How does treasury funding work?',
    'Treasury tokens hold the idle portion of a budget. Accounting follows NAV accrual rather than a promised or projected yield. Funds are unparked for settlement.',
  ],
  [
    'Who can see a mandate?',
    'The design keeps readable terms in the principal’s viewing-key space. On-chain commitments and proofs allow verification without publishing the full terms. Dashboard workspaces encrypt saved mandate terms before they leave your browser.',
  ],
  [
    'What happens if an agent exceeds a cap?',
    'The protocol is designed to reject spends that violate the mandate. The dashboard lets you check requested amounts against saved budget, class, expiry, and counterparty rules before activation.',
  ],
  [
    'How do I start?',
    'Open the dashboard, create a private workspace, and write your first mandate. Funding and on-chain activation require a connected deployment and wallet.',
  ],
];

export const services: readonly Pair[] = [
  [
    'Mandate controls',
    'Define a total budget, period cap, expiry, and allowed spend classes. Keep every delegated task inside a deliberate boundary.',
  ],
  [
    'RWA funding',
    'Choose USDG or treasury tokens. Specify eligible assets and reference-price slippage limits for stock purchases.',
  ],
  [
    'Confidential execution',
    'The protocol combines committed mandates, stealth agent wallets, and within-mandate proofs to keep the ledger private.',
  ],
  [
    'Trust & resolution',
    'Escrow, reputation-gated limits, bonded resolvers, and selective disclosure make accountability part of the spending path.',
  ],
];

export const processSteps: readonly Triple[] = [
  [
    'Write',
    'Define the mandate',
    'Choose the budget, period, allowed spend classes, counterparties, expiry, and funding lane.',
  ],
  [
    'Fund',
    'Choose the funding asset',
    'Use USDG or eligible treasury tokens. Keep collateralized credit in a separate lane.',
  ],
  [
    'Verify',
    'Check every boundary',
    'Validate the class, amount, counterparty, period, and expiry before a spend can proceed.',
  ],
  [
    'Settle',
    'Pay within the rules',
    'Route services through x402, agent hires through escrow, and eligible stock purchases through guarded settlement.',
  ],
  [
    'Review',
    'Stay in control',
    'Review receipts, amend authority, revoke mandates, and scope disclosure when a dispute needs resolution.',
  ],
];

export const roles: readonly Triple[] = [
  [
    'Principals',
    'Set the boundaries.',
    'Define a mandate, choose a budget, and retain the authority to amend or revoke.',
  ],
  [
    'Agents',
    'Act with purpose.',
    'Pay for services, hire other agents, and operate within the scope of a mandate.',
  ],
  [
    'Providers',
    'Verify the proof.',
    'Receive an approved settlement without learning the principal’s complete ledger.',
  ],
  [
    'Resolvers',
    'Resolve with context.',
    'Use scoped disclosure and bonded resolution to handle the disputed slice.',
  ],
];

export const stats: readonly Triple[] = [
  ['03', 'Spend classes', 'Services, agent hires, and eligible stocks.'],
  ['02', 'Funding lanes', 'Prefund or collateralized authority.'],
  ['05', 'Protocol roles', 'A defined place in the spending system.'],
  ['01', 'Control layer', 'Budgets, trust, and privacy together.'],
];

export const metrics: readonly Triple[] = [
  ['03', 'Spend classes', 'Services, agent hires, and eligible tokenized stocks.'],
  ['02', 'Funding lanes', 'Prefunded budgets and collateralized spending.'],
  ['01', 'Private ledger', 'Mandate terms stay in your viewing-key space.'],
  ['05', 'Protocol roles', 'Principals, agents, providers, resolvers, and stakers.'],
];

export type Lane = {
  readonly name: string;
  readonly asset: string;
  readonly copy: string;
  readonly controls: readonly string[];
};

export const lanes: readonly Lane[] = [
  {
    name: 'Prefund',
    asset: 'USDG',
    copy: 'A direct budget for controlled agent spending.',
    controls: [
      'Defined total and period caps',
      'Allowed service counterparties',
      'Agent-hire escrow',
      'Explicit expiry',
    ],
  },
  {
    name: 'Treasury',
    asset: 'NAV',
    copy: 'A treasury-funded budget with asset-based accounting.',
    controls: [
      'Eligible treasury tokens',
      'NAV-based balance tracking',
      'Unpark at settlement',
      'Registry and price guards',
    ],
  },
  {
    name: 'Collateral',
    asset: 'RWA',
    copy: 'A separate lane for collateral-backed spending.',
    controls: [
      'Eligible stock and treasury tokens',
      'Published haircut tiers',
      'Collateral health monitoring',
      'Explicit repayment boundaries',
    ],
  },
];

export const marqueeItems: readonly string[] = [
  'Private mandates',
  'USDG',
  'Treasury tokens',
  'x402',
  'RWA native',
  'Zero-knowledge',
];

export type NavLink = readonly [label: string, href: string];

export const menuLinks: readonly NavLink[] = [
  ['Home', '/'],
  ['The protocol', '/#mission'],
  ['Capabilities', '/#capabilities'],
  ['How it works', '/#process'],
  ['Resources', '/#resources'],
  ['Dashboard', CONSOLE_HREF],
];

export const footerLinks: readonly NavLink[] = [
  ['Home', '/'],
  ['Capabilities', '/#capabilities'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Resources', '/blog'],
  ['Dashboard', CONSOLE_HREF],
];
