import type { Metadata } from "next";
import DocsSidebar from "@/components/docs/DocsSidebar";

export const metadata: Metadata = {
  title: { default: "Reflex Docs", template: "%s · Reflex Docs" },
  description: "Send what you draw, write and say on your iPad to Claude Code or Codex on your Mac.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <DocsSidebar />
      <main className="main">
        <div className="page">{children}</div>
      </main>
    </div>
  );
}
