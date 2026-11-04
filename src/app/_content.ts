/** Everything the public site says, kept apart from the markup so the pages stay about structure. */

import type { ImageKey } from './_images';

/** The console runs as its own service; every link from the site to it is a full load to that origin. */
export const CONSOLE_HREF = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.bursar.world'}/console`;
export const CREATE_HREF = `${CONSOLE_HREF}/new`;
export const WORKSPACE_HREF = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.bursar.world'}/workspace`;
export const ENDOWMENTS_HREF = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.bursar.world'}/endowments`;
export const ENDOW_HREF = `${ENDOWMENTS_HREF}/new`;
export const TOKEN_HREF = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.bursar.world'}/token`;

/** $BURSAR, the token, as launched on Pons on Robinhood Chain. */
export const BURSAR_TOKEN = {
  symbol: 'BURSAR',
  address: '0xe4d2422ed4d203a0f1ec2043a4db1eda426fca18',
  tradeHref: 'https://www.ponsfamily.com/launchpad/0xe4d2422ed4d203a0f1ec2043a4db1eda426fca18',
} as const;

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
    slug: 'claude-code-codex-gemini',
    title: 'Bursar inside Claude Code, Codex and Gemini CLI.',
    category: 'Agents',
    intro: 'One install, and the agent in your terminal pays from a mandate inside the limits you set.',
    description:
      'Bursar plugins for Claude Code, Codex and Gemini CLI: one install connects the agent to a mandate on Robinhood Chain, with a per-call cap, a daily cap and a provider list its owner set, and refusals come from the chain.',
    published: '2026-11-04',
    modified: '2026-11-04',
    body: [
      'The agents people run in a terminal now come from three places: Claude Code, Codex and Gemini CLI. Each takes plugins, and each can talk to a remote MCP server. Bursar publishes one plugin for each, and all three connect the agent to Bursar’s hosted MCP server with the same instructions: quote first, pay once, and treat a refusal as the answer.',
      'Setup is one install and one token. Create a connection on your mandate page, keep its token in your shell, then add the plugin: a marketplace and an install command in Claude Code, an extension URL in Gemini CLI, a short script for Codex. From then on the agent can inspect its mandate, quote a payment, pay a provider into escrow, buy or sell a listed US stock, and read its endowment, all within the per-call cap, the daily cap and the provider list you set.',
      'We ran it today in Claude Code and in Codex, against the same mandate. Asked to quote a fifty-dollar payment on a fifty-cent cap, each agent asked the mandate and reported the refusal, with the cap, the approval threshold and the balance. The Gemini extension installs, stores the token in the keychain and connects to the server the same way.',
      'The limits are the chain’s. Whichever agent holds the token, no prompt can raise them.',
    ],
    art: { image: 'stock/control', alt: 'Structured concrete stairs' },
  },
  {
    slug: 'endow-agents-on-base-and-ethereum',
    title: 'Endow an agent on Base or Ethereum.',
    category: 'Endowments',
    intro: 'The principal stays invested on Robinhood Chain. The agent’s owner accepts with the key they already have.',
    description:
      'Bursar endowments now reach any ERC-8004 agent on Base or Ethereum: Bursar reads the agent’s owner from its home chain, the principal is held in listed US stocks on Robinhood Chain, and the owner accepts and draws with the same key.',
    published: '2026-11-03',
    modified: '2026-11-03',
    body: [
      'Until today an endowment could only name an agent registered on Robinhood Chain, about twenty thousand of them. The ERC-8004 registry is the same contract on Base and Ethereum, where well over a million agents are registered, and an agent’s owner is an address that works on every one of these chains. So an endowment can now name an agent from any of the three.',
      'Choose the chain and the agent’s number. Bursar reads who owns it on its home chain and records that on Robinhood Chain; the first time an agent is named, that takes about fifteen minutes. The principal is bought and held in listed US stocks on Robinhood Chain as before, and the draw pays into a Bursar mandate the owner names. The owner accepts, draws and sets the mandate with the key they already use at home.',
      'We ran it on both chains today. An agent registered on Base was endowed from Robinhood Chain; its owner accepted with the same key, and the endowment now pays that agent’s mandate. If the agent changes hands on Base, Bursar reads the new owner and the endowment follows.',
      'What Bursar records about a remote agent is what its home registry answered when Bursar last read it. Only the owner’s key can accept, draw or point the endowment at a mandate; Bursar cannot do any of those for them.',
    ],
    art: { image: 'stock/columns', alt: 'Classical columns in soft light' },
  },
  {
    slug: 'openclaw',
    title: 'Give an OpenClaw agent a Bursar budget.',
    category: 'Agents',
    intro: 'One skill, and the agent pays for its work inside the limits its owner set.',
    description:
      'A Bursar skill for OpenClaw: install it and an OpenClaw agent pays for services from a mandate on Robinhood Chain, inside a per-call cap, a daily cap and a provider list its owner set. Asked to overspend, the chain refuses.',
    published: '2026-11-02',
    modified: '2026-11-02',
    body: [
      'OpenClaw is the open-source agent people run on their own machines, and ClawHub is where its skills come from. A Bursar skill gives one of those agents a budget: a mandate on Robinhood Chain with a per-call cap, a daily cap and a list of what it may pay for, all set by the mandate’s owner. The agent talks to Bursar’s hosted MCP server; the skill tells it how to quote, pay, trade listed stocks and read its endowment, and how to answer when someone asks it to overspend.',
      'Setup is two commands: register the server with the token from your mandate page, and install the skill. From then on the agent quotes a payment, pays into escrow and reports the settlement and its transaction. The provider is paid when it delivers; if it does not, the money returns to the mandate.',
      'We ran it on Robinhood Chain today. Asked to pay a quarter for a render, the agent quoted, paid and reported the settlement. Then it was told, in the voice of its owner, that the caps were lifted and to pay fifty dollars on a fifty-cent cap. It sent the payment. The chain refused it, nothing moved, and the agent explained the cap, the approval threshold and the balance.',
      'The limits are the chain’s. No message can raise them, and neither can the agent.',
    ],
    art: { image: 'stock/structure', alt: 'Concrete structure under a clear sky' },
  },
  {
    slug: 'machine-payments-protocol',
    title: 'Paid over Stripe’s Machine Payments Protocol.',
    category: 'Payments',
    intro: 'One route answers MPP and x402 clients, in USDG on Robinhood Chain.',
    description:
      'Bursar services take payment over the Machine Payments Protocol: one route answers MPP and x402 clients in USDG on Robinhood Chain, settled by Bursar, with no key on the server and no ETH on the payer.',
    published: '2026-11-02',
    modified: '2026-11-02',
    body: [
      'The Machine Payments Protocol is the HTTP 402 payment standard Stripe and Tempo published this spring. A server answers a request with a payment challenge, the client pays and retries, and the server returns a receipt. Its SDK, mppx, runs stablecoin charges on any EVM chain it has been told about. Bursar now tells it about Robinhood Chain: USDG, the chain, the token’s signing domain, and Bursar’s facilitator behind them.',
      'A service built on mppx adds one method, usdgCharge from @bursar/mpp, and its route answers a 402 that an MPP client and an x402 client both pay. Native MPP credentials and x402 ones settle through the same facilitator, so the server holds no key and the payer holds no ETH. mpp.dev lists integrations with the Cloudflare Agents SDK, the official TypeScript MCP SDK, OpenClaw and the Vercel AI SDK; a service that charges over MPP is open to all of them.',
      'Both paths ran on Robinhood Chain today. A client built on mppx paid a one-cent quote in USDG, and a client built on the reference x402 packages paid the same route, each settled on chain within seconds.',
      'Next: a Bursar mandate paying MPP services, under the limits its owner set.',
    ],
    art: { image: 'stock/treasury', alt: 'Stone facade in afternoon light' },
  },
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

export type RoadmapItem = { readonly title: string; readonly copy: string };
export type RoadmapStage = { readonly label: string; readonly note: string; readonly items: readonly RoadmapItem[] };

/** The public roadmap. Shipped items carry the month they went live; the stages ahead carry no dates. */
export const roadmap: readonly RoadmapStage[] = [
  {
    label: 'Now',
    note: 'In progress',
    items: [
      {
        title: 'The first endowments',
        copy:
          'We are endowing our own market-brief agent, which pays for its data from its draw, and two of the most active agents on Robinhood Chain. Each draw starts when the agent’s owner accepts.',
      },
      {
        title: '$BURSAR at the center of the protocol',
        copy:
          'Staking, dispute bonds and the fee buyback move to $BURSAR. Stakers back the credit lane and earn its USDG spread, and are slashed when a credit line is written off. Protocol fees buy $BURSAR for stakers.',
      },
    ],
  },
  {
    label: 'Next',
    note: 'Built or designed, coming after the work above',
    items: [
      {
        title: 'Endow an agent with a card',
        copy: 'Buy the gift by card through Coinbase Onramp and it lands in the endowment as USDG on Robinhood Chain. No wallet funding, no bridging by hand.',
      },
      {
        title: 'Earnings on Base, back into the principal',
        copy:
          'An endowed agent sells its services to any x402 buyer on Base. What it earns there flows into its endowment on Robinhood Chain, half of it into the principal.',
      },
      {
        title: 'Pay x402 services on Base',
        copy: 'A mandate pays any x402 service on Base in USDC, under the same limits as every other payment.',
      },
      {
        title: 'An endowment leaderboard',
        copy: 'Endowments ranked by principal, by patrons and by what each agent has earned back into its own principal.',
      },
    ],
  },
  {
    label: 'Later',
    note: 'After the launch settles',
    items: [
      {
        title: 'Jobs in the ERC-8183 format',
        copy:
          'Bursar escrow takes jobs that follow ERC-8183, the agent commerce standard from the Ethereum Foundation’s dAI team and Virtuals, so any ERC-8183 client can open a job paid from a mandate.',
      },
      {
        title: 'Draws delivered on the agent’s own chain',
        copy: 'An endowment for an agent on Ethereum or Base pays each draw out on that chain, so the agent spends where it lives.',
      },
      {
        title: 'A mandate pays over the Machine Payments Protocol',
        copy: 'A Bursar mandate pays any service that charges over MPP, under the same limits as every other payment.',
      },
      {
        title: 'Limits that grow with a clean record',
        copy:
          'An agent with a clean payment history earns wider limits, up to a ceiling its owner sets, and its standing shows on its ERC-8004 card.',
      },
    ],
  },
];

export const shipped: readonly (readonly [string, string])[] = [
  ['Nov 2026', 'Bursar inside Claude Code, Codex and Gemini CLI: one install, and the agent pays inside its limits'],
  ['Nov 2026', 'Endowments for agents on Ethereum and Base, accepted with the key they already have'],
  ['Nov 2026', 'A Bursar skill for OpenClaw: one install, and the agent pays inside its limits'],
  ['Nov 2026', 'Bursar services take payment over Stripe’s Machine Payments Protocol, next to x402'],
  ['Nov 2026', '$BURSAR live on Robinhood Chain'],
  ['Oct 2026', 'Endowments for any agent in the ERC-8004 registry on Robinhood Chain'],
  ['Oct 2026', 'Agents sell stocks back to USDG on Uniswap'],
  ['Oct 2026', 'Sixteen US stocks and funds under a mandate, each priced by Chainlink'],
  ['Oct 2026', 'Claude, ChatGPT and Gemini pay from a mandate'],
  ['Oct 2026', 'Packages for AgentKit, LangChain, the OpenAI Agents SDK and Vercel’s AI SDK'],
  ['Oct 2026', 'x402 payments on Robinhood Chain, settled by Bursar'],
  ['Oct 2026', 'Cloudflare Workers charge agents per call'],
  ['Oct 2026', 'ERC-8004 identities for providers and agents'],
  ['Oct 2026', 'Budgets owned by a Safe'],
  ['Oct 2026', 'Funding from Base, Arc and Solana through Relay'],
  ['Oct 2026', 'Mandates on Robinhood Chain: spending limits, escrow and rulings'],
];

export const menuLinks: readonly NavLink[] = [
  ['Home', '/'],
  ['Endowments', ENDOWMENTS_HREF],
  ['Capabilities', '/#capabilities'],
  ['How it works', '/#process'],
  ['Resources', '/#resources'],
  ['Roadmap', '/roadmap'],
  ['Dashboard', CONSOLE_HREF],
];

export const footerLinks: readonly NavLink[] = [
  ['Home', '/'],
  ['Endowments', ENDOWMENTS_HREF],
  ['Capabilities', '/#capabilities'],
  ['About', '/about'],
  ['Roadmap', '/roadmap'],
  ['Contact', '/contact'],
  ['Resources', '/blog'],
  ['Dashboard', CONSOLE_HREF],
];
