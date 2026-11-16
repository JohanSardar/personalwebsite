"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { socials } from "@/lib/socials";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Interests", href: "/interests" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/" className="wordmark" aria-label="Johan Sardar, home">
        <span>Johan</span>
        <span>Sardar</span>
      </Link>

      <Image className="portrait" src="/portrait.jpg" alt="Johan Sardar" width={220} height={220} priority />

      <nav className="nav" aria-label="Pages">
        {nav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
            aria-current={pathname === item.href ? "page" : undefined}
          >
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="find">
        <p className="label">Find me on</p>
        <ul>
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="social"
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {s.label}
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

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 9.5l7-7M4 2.5h5.5V8" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
