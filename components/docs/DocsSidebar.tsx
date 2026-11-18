"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docHref, docs, REPO, TESTFLIGHT } from "@/lib/docs";
import { Arrow } from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default function DocsSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar docs-sidebar">
      <Link href="/reflex" className="wordmark" aria-label="Reflex docs, start">
        <span>Reflex</span>
        <span>Docs</span>
      </Link>

      <nav className="nav docs-nav" aria-label="Docs pages">
        {docs.map((d, i) => (
          <Link
            key={d.slug}
            href={docHref(d.slug)}
            className="nav-link"
            aria-current={pathname === docHref(d.slug) ? "page" : undefined}
          >
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span>{d.title}</span>
          </Link>
        ))}
      </nav>

      <div className="find">
        <p className="label">Links</p>
        <ul>
          <li>
            <a href={TESTFLIGHT} className="social" target="_blank" rel="noreferrer">
              iPad beta
              <Arrow />
            </a>
          </li>
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
