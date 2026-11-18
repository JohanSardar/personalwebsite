"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Arrow } from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { docTree, installUrl, repoUrl, type DocLink } from "@/lib/apple-bridge-docs";

const links = [
  { label: "GitHub", href: repoUrl },
  { label: "Installer", href: installUrl },
  { label: "Changelog", href: `${repoUrl}/blob/main/CHANGELOG.md` },
];

function Row({ item, pathname }: { item: DocLink; pathname: string }) {
  const inside = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const [override, setOverride] = useState<boolean | null>(null);
  const open = override ?? inside;
  const kids = item.children ?? [];
  return (
    <li>
      <div className="ab-row" data-current={pathname === item.href || undefined}>
        <Link href={item.href} className="ab-link" aria-current={pathname === item.href ? "page" : undefined}>
          {item.title}
        </Link>
        {kids.length > 0 && (
          <button
            type="button"
            className="ab-chevron"
            aria-expanded={open}
            aria-label={`${open ? "Hide" : "Show"} ${item.title} pages`}
            onClick={() => setOverride(!open)}
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        )}
      </div>
      {kids.length > 0 && open && (
        <ul className="ab-children">
          {kids.map((k) => (
            <li key={k.href}>
              <div className="ab-row" data-current={pathname === k.href || undefined}>
                <Link href={k.href} className="ab-link" aria-current={pathname === k.href ? "page" : undefined}>
                  {k.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function DocsSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar ab-sidebar">
      <div className="ab-brand">
        <Link href="/apple-bridge" className="wordmark" aria-label="Apple Bridge docs">
          <span>Apple</span>
          <span>Bridge</span>
        </Link>
        <Link href="/" className="ab-by">
          By Johan Sardar
        </Link>
      </div>

      <nav className="ab-tree" aria-label="Docs">
        <p className="label">Docs</p>
        <ul>
          {docTree.map((item) => (
            <Row key={item.href} item={item} pathname={pathname} />
          ))}
        </ul>
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
