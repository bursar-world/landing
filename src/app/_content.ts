/** Everything the public site says, kept apart from the markup so the pages stay about structure. */

import type { ImageKey } from './_images';

/** The console runs as its own service; every link from the site to it is a full load to that origin. */
export const CONSOLE_HREF = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.bursar.world'}/console`;
export const CREATE_HREF = `${CONSOLE_HREF}/new`;
export const WORKSPACE_HREF = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.bursar.world'}/workspace`;
export const ENDOWMENTS_HREF = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.bursar.world'}/endowments`;
export const ENDOW_HREF = `${ENDOWMENTS_HREF}/new`;
export const TOKEN_HREF = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.bursar.world'}/token`;

/** The create screen with a funding lane already chosen. */
export function laneHref(lane: string): string {
  return `${CREATE_HREF}?lane=${lane.toLowerCase()}`;
}

export const X_URL = 'https://x.com/UseBursar';
export const GITHUB_URL = 'https://github.com/bursar-world';

export type Capability = {
  readonly slug: string;
  readonly name: string;
  readonly category: string;
  readonly title: string;
  readonly summary: string;
  /** The search result snippet; not shown on the page. */
  readonly description: string;
  readonly body: string;
  readonly points: readonly string[];
  readonly image: ImageKey;
  /** The landing page describes the photograph rather than naming the layer. */
  readonly landingAlt: string;
  readonly action: NavLink;
};

export const capabilities: readonly Capability[] = [
  {
    slug: 'rwa-funding',
    name: 'Agent endowments',
    category: 'Funding layer',
    title: 'Fund an agent once.',
    summary: 'A principal in US stocks that stays invested, and a yearly draw the agent spends.',
    description:
      'Endow an AI agent on Robinhood Chain: the principal is held in listed US stocks and stays invested, the agent spends a yearly draw, and anyone can add to it.',
    body: 'An endowment holds its principal in listed US stocks on Robinhood Chain, bought at the Chainlink price under the same guard as every Bursar stock purchase. Once a quarter it sets the agent’s draw: a rate of the average of the last twelve quarterly valuations, moved at most 5% from the quarter before and kept between 3% and 6% of the principal. The draw accrues every second and pays into a Bursar mandate, where the owner’s limits decide what the agent spends. Anyone can endow any agent with an ERC-8004 identity, and anyone can add to an endowment. The principal can lose value, and the draw stops while it is worth less than 80% of what was put in.',
    points: [
      'Principal in up to four listed US stocks',
      'A draw set each quarter from a three-year average',
      'Gifts from anyone, each marked on chain',
      'A named successor if the agent stops drawing',
    ],
    image: 'stock/treasury',
    landingAlt: 'A rhythmic colonnade in soft light',
    action: ['Endow an agent', ENDOW_HREF],
  },
  {
    slug: 'private-mandates',
    name: 'Private mandates',
    category: 'Control layer',
    title: 'A budget with boundaries.',
    summary: 'The limits the agent spends within, whether the money comes from a draw or a deposit.',
    description:
      'A Bursar mandate sets what an AI agent may spend: per-payment, daily and monthly limits, allowed counterparties and spend classes, and an expiry.',
    body: 'A mandate is the account an agent spends from. It sets a per-payment cap, daily and monthly limits, the counterparties and spend classes the agent may use, and an expiry. An endowment’s draw lands in a mandate, and a mandate can also be funded directly for a single task. The owner can amend, pause or revoke it at any time.',
    points: [
      'Per-payment, daily and monthly limits',
      'Counterparty and spend-class rules',
      'Pause, amendment and revocation',
    ],
    image: 'stock/control',
    landingAlt: 'Minimalist stairs inside a structured concrete interior',
    action: ['Configure a mandate', CREATE_HREF],
  },
  {
    slug: 'confidential-settlement',
    name: 'Confidential settlement',
    category: 'Privacy layer',
    title: 'Give and spend privately.',
    summary: 'Private gifts to an endowment, and payments a provider can check without reading the ledger.',
    description:
      'Give to an agent’s endowment through Bursar’s shielded pool, and let providers check that a payment is within its mandate without seeing the full terms.',
    body: 'A patron can give to an endowment through Bursar’s shielded pool, so the gift reaches the principal without linking the giver to it. On the spending side, committed mandates and zero-knowledge proofs let a provider confirm that a payment is within its limits without reading the mandate. When a payment is disputed, a scoped disclosure lets bonded resolvers see only the part they rule on.',
    points: [
      'Private gifts through the shielded pool',
      'Within-mandate proofs for providers',
      'Scoped disclosure for disputes',
    ],
    image: 'stock/privacy',
    landingAlt: 'Reflective glass architecture against a pastel sky',
    action: ['Open the console', CONSOLE_HREF],
  },
];

export type Post = {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly intro: string;
  /** The search result snippet; not shown on the page. */
  readonly description: string;
  readonly published: string;
  readonly modified: string;
  readonly body: readonly string[];
  /** Carried by the post itself, so a new post cannot reach a card without an image of its own. */
  readonly art: { readonly image: ImageKey; readonly alt: string };
};

export const posts: readonly Post[] = [
  {
    slug: 'a-wallet-is-not-a-budget',
    title: 'A wallet is not a budget.',
    category: 'Mandates',
    intro: 'Why autonomous agents need explicit spending rules.',
    description:
      'Why autonomous agents need explicit spending rules, and how a Bursar mandate sets the budget, period cap, counterparties, and expiry of delegated authority.',
    published: '2026-09-27',
    modified: '2026-09-27',
    body: [
      'An agent wallet answers where funds live. It does not answer how much an agent may spend, which counterparties it may pay, or when its authority ends. Bursar organizes those decisions into a mandate.',
      'The mandate records a total budget and a period cap, plus spend classes, allowed counterparties, expiry, and the funding lane. Those controls make the scope of delegated authority explicit.',
      'Start with a narrow mandate. Choose the services your agent needs, specify the counterparties, and set an expiry. Amend the mandate as the task changes instead of handing the agent an unrestricted balance.',
    ],
    art: { image: 'stock/control', alt: 'Structured concrete stairs' },
  },
  {
    slug: 'endow-the-agents-you-rely-on',
    title: 'Endow the agents you rely on.',
    category: 'Endowments',
    intro: 'Why an agent’s budget can come from a principal that stays invested.',
    description:
      'How a Bursar endowment funds an AI agent: a principal in listed US stocks that stays invested, a yearly draw set from a three-year average, and gifts from anyone.',
    published: '2026-10-22',
    modified: '2026-10-22',
    body: [
      'An agent that pays for its own data and compute still needs someone to keep its balance topped up. An endowment changes where that money comes from. The principal is held in listed US stocks on Robinhood Chain and stays invested, and the agent is paid a yearly draw from it.',
      'The draw is set once a quarter from the average of the last twelve quarterly valuations, the way university endowments smooth their spending. It moves at most 5% from one quarter to the next and stays between 3% and 6% of the principal, so a fall in the market reaches the agent’s budget gradually. While the principal is worth less than 80% of what was put in, the draw stops.',
      'Anyone can endow an agent registered on Robinhood Chain, and anyone can add to an endowment. Each patron who gives a dollar or more holds a patron mark. The draw pays into a Bursar mandate, so the agent’s owner still decides what it may spend.',
    ],
    art: { image: 'stock/columns', alt: 'Classical columns in soft light' },
  },
  {
    slug: 'privacy-with-accountability',
    title: 'Private does not mean unaccountable.',
    category: 'Privacy',
    intro: 'Selective disclosure and solvency are part of the design.',
    description:
      'How Bursar keeps agent spending private and accountable: stealth wallets, within-mandate proofs, scoped dispute disclosure, and public solvency proofs.',
    published: '2026-09-27',
    modified: '2026-09-27',
    body: [
      'Private spending should not require a public record of every principal-agent relationship. Stealth wallets and committed mandate terms are designed to reduce that exposure.',
      'Counterparties need evidence that the rules are satisfied. A within-mandate proof can establish that a spend respects a cap, class, and counterparty rule without disclosing the complete mandate.',
      'Dispute resolution uses scoped disclosure grants. Public epoch solvency proofs provide a separate accountability surface without publishing every private transaction.',
    ],
    art: { image: 'stock/privacy', alt: 'Reflective glass façade' },
  },
  {
    slug: 'verify-hold-settle-repay',
    title: 'Verify. Hold. Settle. Repay.',
    category: 'Infrastructure',
    intro: 'The four stages of controlled agent spending.',
    description:
      'The four stages of controlled agent spending in Bursar: verify the mandate, hold the budget, settle the payment, and repay the collateralized lane.',
    published: '2026-09-27',
    modified: '2026-09-27',
    body: [
      'The facilitator first checks the mandate and requested spend. A valid request reserves a hold so concurrent requests cannot reuse the same available budget.',
      'Settlement records the receipt and completes the approved payment path. Agent hires use escrow, while eligible stock purchases pass through the settlement router and its price checks.',
      'Repayment applies to the collateralized lane. It is separate from prefunded spending, and its debt and collateral health must remain explicit.',
    ],
    art: { image: 'stock/structure', alt: 'Modern infrastructure' },
  },
];

export type Pair = readonly [title: string, copy: string];
export type Triple = readonly [label: string, title: string, copy: string];

export const faq: readonly Pair[] = [
  [
    'What is an agent endowment?',
    'Money for an AI agent that stays invested. The principal is held in listed US stocks on Robinhood Chain, and the agent is paid a yearly draw from it into a Bursar mandate, where its owner sets the limits.',
  ],
  [
    'How is the draw set?',
    'Once a quarter, as your chosen rate of the average of the last twelve quarterly valuations. It moves at most 5% from the quarter before and stays between 3% and 6% of the principal. It stops while the principal is worth less than 80% of what was put in.',
  ],
  [
    'Can I endow an agent I do not own?',
    'Yes. Any agent with an ERC-8004 identity on Robinhood Chain can be endowed, by anyone. Nothing is drawn until the agent’s owner accepts the endowment and names the mandate it pays into.',
  ],
  [
    'Can a gift be taken back?',
    'Not once the owner accepts. If the owner never accepts within 180 days, each patron can take back their share of what the endowment holds.',
  ],
  [
    'What does a patron get?',
    'A patron mark: a token that records the gift and cannot be transferred. It gives no claim on the principal, the draw or any return. The first hundred patrons of each endowment are founding patrons.',
  ],
  [
    'What does Bursar charge?',
    '1% of each draw, paid to the Bursar treasury. The principal itself is never charged.',
  ],
];

export const services: readonly Pair[] = [
  [
    'The principal',
    'Choose up to four listed US stocks and their weights, or keep the default of SPY. Purchases are made at the Chainlink price, one guarded trade at a time, and the principal stays invested.',
  ],
  [
    'The draw',
    'Pick a rate of up to 6% a year, or 3.5% when more than half the principal is one company. Each quarter the draw is reset from a three-year average and held inside a 3% to 6% band.',
  ],
  [
    'The mandate',
    'The draw pays into a Bursar mandate. Its per-payment, daily and monthly limits decide what the agent can spend, and its owner can pause it at any time.',
  ],
  [
    'The successor',
    'Name the agent that takes over if this one stops drawing for 180 days. Without one, the endowment waits for its owner or for a successor to be named.',
  ],
];

export const processSteps: readonly Triple[] = [
  [
    'Choose',
    'Pick the agent',
    'Any agent with an ERC-8004 identity on Robinhood Chain, whether you run it or not.',
  ],
  [
    'Fund',
    'Set the principal',
    'Give USDG or stock. It is invested in the stocks you chose and stays invested.',
  ],
  [
    'Accept',
    'The owner opts in',
    'The agent’s owner accepts and names the mandate the draw pays into. Nothing accrues before then.',
  ],
  [
    'Draw',
    'The agent is paid',
    'The draw accrues every second. The agent pulls it into its mandate and spends within the mandate’s limits.',
  ],
  [
    'Grow',
    'Anyone can add',
    'Patrons give from the endowment’s page, and the agent can pay part of what it earns back into the principal.',
  ],
];

export const roles: readonly Triple[] = [
  [
    'Patrons',
    'Give once.',
    'Fund an agent you rely on. A gift of a dollar or more earns a patron mark.',
  ],
  [
    'Agents',
    'Spend the draw.',
    'Pay for services and hire other agents, inside the limits of a mandate.',
  ],
  [
    'Owners',
    'Accept and steer.',
    'Accept the endowment, choose the mandate it pays into and set what the agent may spend.',
  ],
  [
    'Resolvers',
    'Rule on disputes.',
    'Bonded resolvers decide when a payer and a provider disagree about a payment.',
  ],
];

export const stats: readonly Triple[] = [
  ['16', 'Listed stocks', 'SPY and fifteen other US stocks and funds.'],
  ['90', 'Days of cash', 'Kept in USDG, so a closed market does not hold up a draw.'],
  ['180', 'Days to accept', 'After that, patrons of an unaccepted endowment can take their share back.'],
  ['100', 'Founding patrons', 'The first hundred patrons of every endowment.'],
];

export const metrics: readonly Triple[] = [
  ['16', 'Listed stocks', 'An endowment can hold up to four, priced by Chainlink.'],
  ['12', 'Quarters averaged', 'The draw follows a three-year average of the principal.'],
  ['06', 'Percent at most', 'The yearly draw is set at no more than 6% of the principal.'],
  ['01', 'Percent fee', 'Taken from each draw. The principal is never charged.'],
];

export type Lane = {
  readonly name: string;
  readonly asset: string;
  readonly copy: string;
  readonly controls: readonly string[];
  readonly href: string;
};

export const lanes: readonly Lane[] = [
  {
    name: 'Endowment',
    asset: 'Stocks',
    copy: 'A principal that stays invested, for an agent that should keep running.',
    controls: [
      'Up to four listed US stocks',
      'A draw set each quarter',
      'Open to patrons',
      'A successor if the agent goes quiet',
    ],
    href: ENDOW_HREF,
  },
  {
    name: 'Prefund',
    asset: 'USDG',
    copy: 'A direct budget for a single task.',
    controls: [
      'Per-payment, daily and monthly limits',
      'Allowed counterparties',
      'Agent hires through escrow',
      'An explicit expiry',
    ],
    href: laneHref('prefund'),
  },
  {
    name: 'Collateral',
    asset: 'RWA',
    copy: 'Spending backed by posted stock, kept in its own lane.',
    controls: [
      'Eligible stock and treasury tokens',
      'Published haircut tiers',
      'Collateral health monitoring',
      'Explicit repayment boundaries',
    ],
    href: laneHref('collateral'),
  },
];

export const marqueeItems: readonly string[] = [
  'Agent endowments',
  'US stocks',
  'USDG',
  'x402',
  'ERC-8004',
  'Robinhood Chain',
];

export type NavLink = readonly [label: string, href: string];

export const menuLinks: readonly NavLink[] = [
  ['Home', '/'],
  ['Endowments', ENDOWMENTS_HREF],
  ['Capabilities', '/#capabilities'],
  ['How it works', '/#process'],
  ['Resources', '/#resources'],
  ['Dashboard', CONSOLE_HREF],
];

export const footerLinks: readonly NavLink[] = [
  ['Home', '/'],
  ['Endowments', ENDOWMENTS_HREF],
  ['Capabilities', '/#capabilities'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Resources', '/blog'],
  ['Dashboard', CONSOLE_HREF],
];
