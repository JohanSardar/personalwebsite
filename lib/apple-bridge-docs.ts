export type DocPage = { title: string; href: string; summary: string };

export const docGroups: { label: string; pages: DocPage[] }[] = [
  {
    label: "Get started",
    pages: [
      { title: "Overview", href: "/apple-bridge", summary: "What Apple Bridge is and the one prompt that sets it up." },
      { title: "Setup", href: "/apple-bridge/setup", summary: "Install, connect an agent and allow the Mac permissions." },
    ],
  },
  {
    label: "Use it",
    pages: [
      { title: "Sources", href: "/apple-bridge/sources", summary: "Everything an agent can read and change on your Mac." },
      { title: "Tools", href: "/apple-bridge/tools", summary: "The 17 MCP tools and the terminal commands." },
      { title: "Other computers", href: "/apple-bridge/remote", summary: "Reach your Mac from a server or a cloud agent." },
    ],
  },
  {
    label: "Trust",
    pages: [
      { title: "Privacy and access", href: "/apple-bridge/privacy", summary: "What stays on your Mac and what each agent may do." },
      { title: "Troubleshooting", href: "/apple-bridge/troubleshooting", summary: "The commands that tell you what is wrong." },
    ],
  },
];

export const docPages = docGroups.flatMap((g) => g.pages);

export const installUrl = "https://eilmer.si/applebridge/install";
export const repoUrl = "https://github.com/JohanSardar/apple-bridge";
