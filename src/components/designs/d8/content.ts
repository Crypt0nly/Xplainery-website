/**
 * Copy for Design 8 — "NEWEST WEBSITE".
 * Built from the Xplainery business-plan board (FigJam): positioning,
 * the four tiers, EU AI Act Article 4 framing, customer journey, pricing.
 * Wording rule from the plan: documented training that *supports* Article 4
 * compliance — never "certification".
 */

export const nav = [
  { href: "#services", label: "Services" },
  { href: "#article-4", label: "Article 4" },
  { href: "#process", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export const hero = {
  eyebrow: "AI training · strategy · implementation for SMEs",
  title: "AI, explained.",
  tagline: "AI you can actually use.",
  body: "Practical AI training, a clear strategy and hands-on implementation for small and mid-sized businesses — no jargon, no hype, and no in-house AI team required.",
  primary: "Book a free discovery call",
  secondary: "See the four tiers",
  chips: [
    "15–30 minute call",
    "Remote-first · in-person on request",
    "Flat project rates, never hourly surprises",
  ],
  stats: [
    { value: "4", label: "Tiers — from a workshop to a working tool" },
    { value: "10–200", label: "Employees: the teams we're built for" },
    { value: "3", label: "Languages: EN · DE · ES" },
  ],
  record: {
    title: "AI literacy training record",
    subtitle: "Kept on file · dated · named",
    rows: [
      { label: "Attendance", value: "12 participants · 14 Oct" },
      { label: "Content summary", value: "Attached · 2 pages" },
      { label: "Competency assessment", value: "Completed · 12/12" },
    ],
    badge: "Supports EU AI Act Art. 4",
  },
  floating: ["Half-day workshop · remote", "Roadmap delivered in 3 weeks"],
};

export const industries = [
  "Law",
  "Accounting",
  "Consulting",
  "Manufacturing",
  "Logistics",
  "Retail",
  "Healthcare admin",
];

export const audience = {
  eyebrow: "Who it's for",
  title: "Built for businesses without an AI department.",
  business: {
    title: "For businesses",
    body: "Small and mid-sized companies in established industries — typically 10 to 200 employees — where nobody has \"AI\" in their job title yet. You're the owner, operations manager or department head who needs AI to actually work, not another vendor pitch.",
    bullets: [
      "Decision-makers, not IT departments",
      "Real work, real tools — no theory-only sessions",
      "Documented outcomes you can keep on file",
    ],
  },
  individual: {
    title: "For individuals",
    body: "Managers and professionals in those same industries who want personal AI literacy — in a small live group or one-to-one — without waiting for their company to book something.",
    bullets: [
      "Live small groups of 3–8, scheduled monthly",
      "1:1 coaching on your own work",
      "Book a seat directly — no proposal needed",
    ],
  },
};

export type Tier = {
  id: string;
  n: string;
  name: string;
  kicker: string;
  summary: string;
  format: string;
  duration: string;
  deliverable: string;
  price: string;
  bestFor: string;
  steps: string[];
};

export const tiers: Tier[] = [
  {
    id: "training",
    n: "01",
    name: "AI Skills Training",
    kicker: "Team workshops",
    summary:
      "A half-day or full-day workshop that gets your team using AI confidently in their real work — live, interactive, and tailored to your actual use cases.",
    format:
      "Remote-first (Zoom, Teams or Meet). In-person available as a premium option for local clients or on request.",
    duration: "Half-day or full-day",
    deliverable:
      "A team that uses AI properly, plus a basic training record: attendance, date and session summary. Available as an Article 4 documented version.",
    price: "from €800 half-day · €1,400 full-day",
    bestFor: "Teams that need to start using AI properly this quarter.",
    steps: ["Discovery call", "Tailored agenda", "Live workshop", "Record & handoff"],
  },
  {
    id: "strategy",
    n: "02",
    name: "AI Strategy",
    kicker: "Readiness assessment",
    summary:
      "A structured 2–4 week engagement that ends in a written report and a prioritised roadmap — so you know exactly what to do with AI before you spend on tools.",
    format:
      "Mostly asynchronous with a few live touchpoints: intake questionnaire, one or two discovery calls, independent analysis, a final live roadmap session.",
    duration: "2–4 weeks",
    deliverable:
      "A written report with risk classification, recommendations and a prioritised roadmap. Optional retainer afterwards while you implement.",
    price: "€1,500 – €3,500 flat fee",
    bestFor: "Leaders who want a clear plan, not open-ended consulting.",
    steps: ["Intake questionnaire", "Discovery calls", "Independent analysis", "Roadmap session"],
  },
  {
    id: "implementation",
    n: "03",
    name: "AI Implementation",
    kicker: "Scoped build",
    summary:
      "A scoped project to build or configure one specific automation or AI integration — priced per engagement, never by the hour.",
    format:
      "Kickoff and scoping remote; occasional calls with your technical or operational staff for access to systems and tools.",
    duration: "Scoped per project",
    deliverable:
      "The working automation or integration, plus documentation of what was built and how to maintain it.",
    price: "€4,000 – €9,000 · larger builds scoped case by case",
    bestFor: "Clients who've done a workshop or assessment and know what to build.",
    steps: ["Kickoff & scoping", "Build & configure", "Test with your team", "Documentation handoff"],
  },
  {
    id: "mentoring",
    n: "04",
    name: "AI Mentoring",
    kicker: "For individuals",
    summary:
      "The same workshop quality, sold as a seat instead of a company booking — a live small group or one-to-one coaching on your own work.",
    format:
      "Live small-group session (3–8 people, scheduled monthly) or 1:1 personal coaching. Recurring slots available.",
    duration: "Single session or recurring",
    deliverable:
      "Practical skills for your own role, follow-up notes, and a clear next step.",
    price: "€150 – €250 per seat · €300 – €450 for 1:1",
    bestFor: "Managers and professionals who don't want to wait for their company.",
    steps: ["Pick a format", "Book a seat or slot", "Live session", "Follow-up notes"],
  },
];

export const articleFour = {
  eyebrow: "EU AI Act · Article 4",
  title: "AI literacy training with documented records that support Article 4 compliance.",
  body: "Article 4 of the EU AI Act requires organisations to ensure a sufficient level of AI literacy among the people who use AI on their behalf. No certificate is legally required — an internal record of training is sufficient documentation. That's exactly what the Article 4 version of our workshop gives you.",
  listTitle: "What you keep on file",
  items: [
    "Attendance records — dated and named",
    "Session content summary",
    "Competency assessment for every participant",
    "Risk classification of your actual AI systems",
    "Written compliance summary referencing Article 4",
    "Recommendations for what's still needed",
  ],
  disclaimer:
    "This is training with documentation, not a legal certification and not legal advice.",
  price: "€1,800 – €2,800 per day",
  cta: "Ask about the Article 4 workshop",
};

export const process = {
  eyebrow: "How it works",
  title: "Low friction from first contact to follow-up.",
  steps: [
    { title: "First contact", body: "Fill in the short form below or book a call directly — whichever is easier." },
    { title: "Discovery call", body: "15–30 minutes on your situation, current AI usage and which tier actually fits." },
    { title: "Proposal", body: "A short written proposal: scope, price, timeline, deliverable. Individuals skip straight to booking." },
    { title: "Contract & payment", body: "Invoice or checkout — Stripe, SEPA transfer or PayPal. Deposit or full payment." },
    { title: "Delivery", body: "The workshop, assessment or implementation — and everything needed for your record." },
    { title: "Handoff", body: "Documentation, report or recording, including your training record." },
    { title: "Follow-up", body: "A check-in a few weeks later: what worked, and what's next — if anything." },
  ],
};

export const pricing = {
  eyebrow: "Pricing",
  title: "Flat rates. No hourly surprises.",
  body: "Every engagement is priced as a day or project rate, so you know the number before we start. Ranges depend on team size, scope and whether the Article 4 documentation is included.",
  groups: [
    {
      name: "AI Skills Training",
      rows: [
        ["Half-day workshop", "€800 – €1,200"],
        ["Full-day workshop", "€1,400 – €2,200"],
        ["Article 4 documented version", "€1,800 – €2,800 / day"],
      ],
    },
    {
      name: "AI Strategy",
      rows: [["Readiness assessment (2–4 weeks)", "€1,500 – €3,500"]],
    },
    {
      name: "AI Implementation",
      rows: [
        ["Small automation project", "€4,000 – €9,000"],
        ["Larger implementation", "Scoped case by case"],
      ],
    },
    {
      name: "AI Mentoring",
      rows: [
        ["Small-group session (per seat)", "€150 – €250"],
        ["1:1 personal session", "€300 – €450"],
      ],
    },
  ],
  note: "All prices exclude VAT. In-person delivery adds travel costs. Pay by Stripe, SEPA transfer or PayPal.",
};

export const founder = {
  eyebrow: "Who you'll work with",
  title: "One person. Tailored to your actual AI use cases.",
  body: "I'm Janine, the founder of Xplainery. I make AI practical for people who have real work to do — delivered remote-first in English, German or Spanish, and always ending with something you can keep: a record, a report or a working tool.",
  highlights: [
    { value: "EN · DE · ES", label: "Delivery languages" },
    { value: "Remote-first", label: "In-person on request" },
    { value: "Documented", label: "Every engagement" },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: "Tell me what you're trying to do.",
  body: "A short message is enough. I'll reply within one working day with a suggested next step — usually a 15–30 minute call.",
  interests: [
    "AI Skills Training (team workshop)",
    "Article 4 documented workshop",
    "AI Strategy (readiness assessment)",
    "AI Implementation (scoped build)",
    "AI Mentoring (individual)",
    "Not sure yet",
  ],
  sizes: ["Just me", "2–10", "10–50", "50–200", "200+"],
  submit: "Send request",
  success: "Thanks — your request is in. I'll get back to you within one working day.",
  aside: {
    title: "Prefer to talk?",
    body: "Book a free 15–30 minute discovery call straight into the calendar.",
    cta: "Book a discovery call",
  },
};

export const footer = {
  tagline: "AI, explained.",
  rights: "All rights reserved.",
  madeIn: "Designed in Europe · Delivered in EN · DE · ES",
};
