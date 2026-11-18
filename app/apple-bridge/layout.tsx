import type { Metadata } from "next";
import DocsSidebar from "@/components/docs/DocsSidebar";
import OnThisPage from "@/components/docs/OnThisPage";

export const metadata: Metadata = {
  title: { default: "Apple Bridge", template: "%s · Apple Bridge" },
  description: "Give Claude Code, Codex and other agents your Mac's Messages, Mail, Calendar, Notes and more through one local MCP server.",
};

export default function DocsLayout({ children }: LayoutProps<"/apple-bridge">) {
  return (
    <div className="shell">
      <DocsSidebar />
      <main className="main docs-main">
        {children}
        <OnThisPage />
      </main>
    </div>
  );
}
