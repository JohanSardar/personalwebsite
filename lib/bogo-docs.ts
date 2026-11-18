export type DocPage = { title: string; href: string };
export type DocGroup = { label: string; pages: DocPage[] };

export const docGroups: DocGroup[] = [
  {
    label: "Get started",
    pages: [
      { title: "Overview", href: "/bogo" },
      { title: "Quickstart", href: "/bogo/quickstart" },
      { title: "Install and setup", href: "/bogo/setup" },
    ],
  },
  {
    label: "Concepts",
    pages: [
      { title: "Policies", href: "/bogo/policies" },
      { title: "Approval requests", href: "/bogo/requests" },
      { title: "iPhone approver", href: "/bogo/iphone" },
      { title: "Relay", href: "/bogo/relay" },
    ],
  },
  {
    label: "Integrations",
    pages: [
      { title: "Clients", href: "/bogo/agents" },
      { title: "Recipes", href: "/bogo/recipes" },
    ],
  },
  {
    label: "Security",
    pages: [
      { title: "Proofs", href: "/bogo/proved" },
      { title: "Threat model", href: "/bogo/threat-model" },
      { title: "Status", href: "/bogo/status" },
      { title: "FAQ", href: "/bogo/faq" },
    ],
  },
];

export const docPages: DocPage[] = docGroups.flatMap((g) => g.pages);

export const REPO = "https://github.com/JohanSardar/bogo";
export const BLOB = `${REPO}/blob/main`;
export const INSTALL =
  "curl -fsSL https://raw.githubusercontent.com/JohanSardar/bogo/main/install.sh | sh";
export const TESTFLIGHT = "https://testflight.apple.com/join/dQu75bv1";
