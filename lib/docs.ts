/** The Reflex docs pages, grouped as the sidebar shows them. */
export const groups = [
  {
    name: "Start here",
    pages: [
      { slug: "", title: "Welcome" },
      { slug: "quick-start", title: "Quick Start" },
    ],
  },
  {
    name: "Use it",
    pages: [
      { slug: "send", title: "Draw, Speak and Send" },
      { slug: "pairing", title: "Pairing and Approvals" },
    ],
  },
  {
    name: "Under the hood",
    pages: [
      { slug: "how-it-works", title: "How It Works" },
      { slug: "delivery", title: "MCP and Delivery" },
      { slug: "privacy", title: "Privacy and Security" },
      { slug: "relay", title: "Relay" },
    ],
  },
  {
    name: "Reference",
    pages: [
      { slug: "connect", title: "Connect an Agent" },
      { slug: "commands", title: "Commands" },
      { slug: "troubleshooting", title: "Troubleshooting" },
    ],
  },
] as const;

export const docs = groups.flatMap((g) => [...g.pages]);

export type DocSlug = (typeof docs)[number]["slug"];

export const docHref = (slug: string) => (slug ? `/reflex/${slug}` : "/reflex");

export const TESTFLIGHT = "https://testflight.apple.com/join/R81n88Re";
export const REPO = "https://github.com/JohanSardar/reflex";
export const NPX = `npx -y "github:JohanSardar/reflex#npx"`;
