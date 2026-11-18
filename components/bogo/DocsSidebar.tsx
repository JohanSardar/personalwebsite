"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { docGroups, docPages, REPO } from "@/lib/bogo-docs";
import { Arrow } from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default function DocsSidebar() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const current = docPages.find((p) => p.href === pathname);

  // Close the phone menu after picking a page.
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);

  const links = docGroups.map((g) => (
    <div key={g.label} className="bd-docs-group">
      <p className="label">{g.label}</p>
      <div className="nav">
        {g.pages.map((p) => {
          const n = docPages.indexOf(p) + 1;
          return (
            <Link
              key={p.href}
              href={p.href}
              className="nav-link"
              aria-current={pathname === p.href ? "page" : undefined}
            >
              <span className="num">{String(n).padStart(2, "0")}</span>
              <span>{p.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  ));

  return (
    <aside className="sidebar bd-docs-sidebar">
      <Link href="/bogo" className="wordmark" aria-label="BOGO docs, start">
        <span>BOGO</span>
        <span className="bd-wordmark-sub">Docs</span>
      </Link>

      <nav className="bd-docs-nav" aria-label="Docs">
        {links}
      </nav>

      <details className="bd-docs-menu" ref={menu}>
        <summary>
          <span className="label">Page</span>
          <span>{current?.title ?? "Contents"}</span>
        </summary>
        <nav aria-label="Docs">{links}</nav>
      </details>

      <div className="find bd-docs-links">
        <ul>
          <li>
            <a href={REPO} className="social" target="_blank" rel="noreferrer">
              GitHub
              <Arrow />
            </a>
          </li>
          <li>
            <Link href="/" className="social">
              Johan Sardar
              <Arrow />
            </Link>
          </li>
        </ul>
      </div>

      <ThemeToggle />
    </aside>
  );
}
