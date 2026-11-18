export type DocLink = { title: string; href: string; summary?: string; time?: string; children?: DocLink[] };

export const docTree: DocLink[] = [
  { title: "Overview", href: "/apple-bridge", summary: "What Apple Bridge does and what you can ask." },
  {
    title: "Connect",
    href: "/apple-bridge/connect",
    summary: "Set up Apple Bridge with one prompt, or step by step for your agent.",
    children: [
      { title: "Other computers", href: "/apple-bridge/connect/remote", summary: "Reach your Mac from a server or a cloud agent." },
    ],
  },
  {
    title: "Supported tools",
    href: "/apple-bridge/tools",
    summary: "The 17 tools your agent sees and what each one does.",
    children: [
      { title: "Read and search", href: "/apple-bridge/tools#read-and-search" },
      { title: "Send and write", href: "/apple-bridge/tools#send-and-write" },
      { title: "Plan your time", href: "/apple-bridge/tools#plan-your-time" },
      { title: "Photos", href: "/apple-bridge/tools#photos" },
      { title: "Everything else", href: "/apple-bridge/tools#everything-else" },
    ],
  },
  {
    title: "Prompts",
    href: "/apple-bridge/prompts",
    summary: "Ready-made prompts to paste into your agent.",
    children: [
      {
        title: "Organize your Photos",
        href: "/apple-bridge/organize-photos",
        summary: "Sorts your Photos library into albums that fit your life.",
        time: "20 to 25 minutes",
      },
      {
        title: "Texting and call stats",
        href: "/apple-bridge/message-stats",
        summary: "Who you text and call the most, who replies the quickest and for how long you talk.",
        time: "5 minutes",
      },
    ],
  },
  { title: "Sources", href: "/apple-bridge/sources", summary: "Every app an agent can read and change on your Mac." },
  { title: "Privacy and security", href: "/apple-bridge/security", summary: "What stays on your Mac and what each agent may do." },
  { title: "CLI reference", href: "/apple-bridge/cli", summary: "The bridge commands for you and your agent." },
];

export const docPages: DocLink[] = docTree.flatMap((d) => [
  d,
  ...(d.children ?? []).filter((c) => !c.href.includes("#")),
]);

export const docPage = (href: string) => docPages.find((p) => p.href === href)!;

export const installUrl = "https://eilmer.si/applebridge/install";
export const repoUrl = "https://github.com/JohanSardar/apple-bridge";
