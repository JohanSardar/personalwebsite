import type { Metadata } from "next";
import DocsSidebar from "@/components/apple-bridge/DocsSidebar";
import OnThisPage from "@/components/apple-bridge/OnThisPage";

export const metadata: Metadata = {
  title: { default: "Apple Bridge", template: "%s · Apple Bridge" },
  description: "Give Claude Code, Codex and other agents your Mac's Messages, Mail, Calendar, Notes and more through one local MCP server.",
};

export default function DocsLayout({ children }: LayoutProps<"/apple-bridge">) {
  return (
    <div className="shell">
      <DocsSidebar />
      <main className="main ab-main">
        {children}
        <OnThisPage />
      </main>
    </div>
  );
}
