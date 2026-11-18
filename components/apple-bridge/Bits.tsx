import Link from "next/link";
import type { ReactNode } from "react";

/** Turns `backticked` words in plain copy into inline code. */
export function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/).map((part, i) =>
        part.startsWith("`") ? <code key={i}>{part.slice(1, -1)}</code> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

export function Head({ eyebrow = "Apple Bridge", title, lede, time }: { eyebrow?: string; title: string; lede: string; time?: string }) {
  return (
    <header className="ab-head">
      <p className="label">{eyebrow}</p>
      <h1 className="title">{title}</h1>
      <p className="lede">{lede}</p>
      {time && <p className="ab-time">Takes about {time}</p>}
    </header>
  );
}

export function Cards({ items, cols = 2 }: { items: { title: string; href: string; summary?: string; time?: string }[]; cols?: 2 | 3 }) {
  return (
    <div className={cols === 3 ? "ab-cards three" : "ab-cards"}>
      {items.map((c) => (
        <Link key={c.href} href={c.href} className="ab-card">
          <b>{c.title}</b>
          {c.summary && <span>{c.summary}</span>}
          {c.time && <span className="ab-time">About {c.time}</span>}
        </Link>
      ))}
    </div>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="ab-steps">{children}</ol>;
}

export function Fold({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="ab-fold">
      <summary>{title}</summary>
      <div>{children}</div>
    </details>
  );
}
