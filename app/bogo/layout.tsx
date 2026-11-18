import type { Metadata } from "next";
import DocsSidebar from "@/components/bogo/DocsSidebar";
import Pager from "@/components/bogo/Pager";
import Toc from "@/components/bogo/Toc";

export const metadata: Metadata = {
  title: { default: "BOGO docs", template: "%s · BOGO docs" },
  description: "An MCP proxy that holds selected tool calls until you approve them on your iPhone.",
};

export default function DocsLayout({ children }: LayoutProps<"/bogo">) {
  return (
    <div className="shell">
      <DocsSidebar />
      <main className="main">
        <div className="page">
          <div className="bd-docs">
            <article className="bd-doc">
              {children}
              <Pager />
            </article>
            <Toc />
          </div>
        </div>
      </main>
    </div>
  );
}
