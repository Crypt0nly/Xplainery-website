/**
 * Copy for Design 9 — "NEWEST WEBSITE".
 * Deliberately lean: what a business needs to decide to get in touch.
 * Operational detail from the business plan stays off the site.
 */

export const nav = [
  { href: "#services", label: "Services" },
  { href: "#article-4", label: "EU AI Act" },
  { href: "#why", label: "Why Xplainery" },
  { href: "#contact", label: "Contact" },
];

export const hero = {
  eyebrow: "AI training & implementation for businesses",
  titleA: "AI, explained.",
  titleB: "Then applied.",
  body: "We help small and mid-sized businesses use AI with confidence — from a first team workshop to a working automation, with the documentation the EU AI Act asks for.",
  primary: "Book a free call",
  secondary: "Find your path",
  trust: "For teams of 10–200 in law, accounting, consulting, manufacturing, logistics, retail and healthcare.",
};

export type Service = {
  id: string;
  n: string;
  name: string;
  promise: string;
  body: string;
  outcome: string;
  audience: string;
  includes: string[];
};

export const services: Service[] = [
  {
    id: "training",
    n: "01",
    name: "AI Skills Training",
    promise: "A workshop your team can use on Monday.",
    body: "Half-day or full-day, live and hands-on, built around the work your team actually does.",
    outcome: "A team that uses AI confidently",
    audience: "Teams and departments",
    includes: [
      "Tailored to your industry and tools",
      "Practical exercises on real tasks",
      "Optional EU AI Act Article 4 documentation",
    ],
  },
  {
    id: "strategy",
    n: "02",
    name: "AI Strategy",
    promise: "Know what to do before you buy anything.",
    body: "A short, structured assessment of where AI helps your business — and where it doesn't.",
    outcome: "A written, prioritised roadmap",
    audience: "Owners and leadership",
    includes: [
      "Review of your processes and current AI use",
      "Clear recommendations, ranked by value",
      "Presented live, delivered in writing",
    ],
  },
  {
    id: "implementation",
    n: "03",
    name: "AI Implementation",
    promise: "One automation, built and handed over.",
    body: "A scoped project that turns a specific need into a working AI integration.",
    outcome: "A working tool, documented",
    audience: "Teams ready to build",
    includes: [
      "Fixed scope agreed up front",
      "Built and tested with your team",
      "Documentation for whoever maintains it",
    ],
  },
  {
    id: "mentoring",
    n: "04",
    name: "AI Mentoring",
    promise: "For individuals, not companies.",
    body: "Small live groups or one-to-one coaching for managers and professionals who want personal AI skills.",
    outcome: "Confidence in your own role",
    audience: "Individual professionals",
    includes: [
      "Small groups or 1:1",
      "Focused on your daily work",
      "Book a seat directly",
    ],
  },
];

export const articleFour = {
  eyebrow: "EU AI Act · Article 4",
  title: "The training your team needs — with the records the law expects.",
  body: "Article 4 of the EU AI Act asks organisations to ensure a sufficient level of AI literacy among the people who use AI on their behalf. Our workshops can be delivered with documentation you keep on file.",
  addon: {
    label: "Add-on",
    name: "Article 4 documentation",
    body: "Add to any team workshop.",
    items: [
      "Attendance records",
      "Session content summary",
      "Competency assessment",
      "Written compliance summary",
    ],
    footnote: "Dated, named and yours to keep.",
  },
  pkg: {
    label: "Package",
    name: "Article 4 Training Package",
    body: "Everything in one engagement — the most common starting point for first-time compliance.",
    items: [
      "Full-day AI Skills Training workshop",
      "The complete documentation set",
      "A short review of your actual AI use and its risk level",
      "Recommendations for what's still needed",
    ],
    cta: "Ask about the package",
  },
  note: "Documented training that supports Article 4 compliance — not a certification, and not legal advice.",
};

export const why = {
  eyebrow: "Why Xplainery",
  title: "Practical, documented, personal.",
  items: [
    {
      title: "No jargon. Ever.",
      body: "Everything is explained in plain language and shown on real work — no theory sessions, no vendor pitch.",
    },
    {
      title: "You always keep something.",
      body: "A training record, a written roadmap or a working tool. Every engagement ends with a deliverable.",
    },
    {
      title: "One expert, start to finish.",
      body: "You work directly with the founder — from the first call to the handover, in English, German or Spanish.",
    },
  ],
};

export const process = {
  eyebrow: "How it works",
  steps: [
    { title: "A short call", body: "Twenty minutes on your situation and what would actually help." },
    { title: "A one-page proposal", body: "Scope, price and timeline — written down, no surprises." },
    { title: "Delivery", body: "The workshop, roadmap or build — and the documentation that comes with it." },
  ],
};

export const faq = [
  {
    q: "Do we need a technical background?",
    a: "No. Everything is designed for business teams without an IT or AI department.",
  },
  {
    q: "Is the Article 4 training a certification?",
    a: "No — and none is legally required. You receive documented training records that support your Article 4 compliance. It is not legal advice.",
  },
  {
    q: "How quickly can we start?",
    a: "Usually within two weeks of the first call.",
  },
  {
    q: "Which languages do you work in?",
    a: "English, German and Spanish.",
  },
];

export const finder = {
  eyebrow: "Find your path",
  title: "Three quick questions.",
  restart: "Start over",
  cta: "Talk about this",
  interestFor: {
    training: "AI Skills Training",
    package: "Article 4 Training Package",
    strategy: "AI Strategy",
    implementation: "AI Implementation",
    mentoring: "AI Mentoring",
  },
};

export const contact = {
  eyebrow: "Contact",
  title: "Let's talk about your team.",
  body: "Tell me what you're trying to do. I reply within one working day.",
  interests: [
    "AI Skills Training",
    "Article 4 Training Package",
    "AI Strategy",
    "AI Implementation",
    "AI Mentoring",
    "Not sure yet",
  ],
  submit: "Send message",
  success: "Thank you — I'll get back to you within one working day.",
  aside: {
    title: "Prefer a call?",
    body: "Twenty minutes, no obligation.",
    cta: "Book a free call",
  },
};

export const footer = {
  tagline: "AI, explained.",
  rights: "All rights reserved.",
};
