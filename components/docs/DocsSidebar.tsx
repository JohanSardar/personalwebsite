"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Arrow } from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { docGroups, docPages, installUrl, repoUrl } from "@/lib/docs";

const links = [
  { label: "GitHub", href: repoUrl },
  { label: "Installer", href: installUrl },
  { label: "Changelog", href: `${repoUrl}/blob/main/CHANGELOG.md` },
];

export default function DocsSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar docs-sidebar">
      <div className="docs-brand">
        <Link href="/apple-bridge" className="wordmark" aria-label="Apple Bridge docs">
          <span>Apple</span>
          <span>Bridge</span>
        </Link>
        <Link href="/" className="docs-by">
          By Johan Sardar
        </Link>
      </div>

      <nav className="docs-nav" aria-label="Docs">
        {docGroups.map((group) => (
          <div key={group.label} className="docs-group">
            <p className="label">{group.label}</p>
            <div className="nav">
              {group.pages.map((page) => {
                const n = docPages.indexOf(page) + 1;
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="nav-link"
                    aria-current={pathname === page.href ? "page" : undefined}
                  >
                    <span className="num">{String(n).padStart(2, "0")}</span>
                    <span>{page.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="find">
        <p className="label">Links</p>
        <ul>
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="social" target="_blank" rel="noreferrer">
                {l.label}
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ThemeToggle />
    </aside>
  );
}
