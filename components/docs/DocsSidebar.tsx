"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docHref, groups, REPO, TESTFLIGHT } from "@/lib/docs";
import { Arrow } from "@/components/Sidebar";
import BackLink from "@/components/BackLink";
import ThemeToggle from "@/components/ThemeToggle";

export default function DocsSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar docs-sidebar">
      <BackLink repo={REPO} />
      <Link href="/reflex" className="wordmark" aria-label="Reflex docs, start">
        <img src="/reflex/logo.svg" alt="" className="docs-mark" width={44} height={44} />
        <span>Reflex</span>
        <span>Docs</span>
      </Link>

      <nav className="docs-nav" aria-label="Docs pages">
        {groups.map((g) => (
          <div key={g.name} className="docs-group">
            <p className="label">{g.name}</p>
            {g.pages.map((d) => (
              <Link key={d.slug} href={docHref(d.slug)} className="docs-link" aria-current={pathname === docHref(d.slug) ? "page" : undefined}>
                {d.title}
              </Link>
            ))}
          </div>
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
