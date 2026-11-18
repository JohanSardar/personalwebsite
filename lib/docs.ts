/** The Reflex docs pages, in sidebar order. */
export const docs = [
  { slug: "", title: "Get Started" },
  { slug: "how-it-works", title: "How It Works" },
  { slug: "send", title: "Draw, Speak and Send" },
  { slug: "pairing", title: "Pairing and Approvals" },
  { slug: "connect", title: "Connect an Agent" },
  { slug: "privacy", title: "Privacy and Security" },
  { slug: "relay", title: "Relay" },
  { slug: "commands", title: "Commands" },
  { slug: "troubleshooting", title: "Troubleshooting" },
] as const;

export type DocSlug = (typeof docs)[number]["slug"];

export const docHref = (slug: string) => (slug ? `/reflex/${slug}` : "/reflex");

export const TESTFLIGHT = "https://testflight.apple.com/join/R81n88Re";
export const REPO = "https://github.com/JohanSardar/reflex";
export const NPX = `npx -y "github:JohanSardar/reflex#npx"`;
