"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Heading = { id: string; text: string };

export default function OnThisPage() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const found = Array.from(document.querySelectorAll<HTMLElement>(".ab-doc h2[id]"));
    const frame = requestAnimationFrame(() =>
      setHeadings(found.map((h) => ({ id: h.id, text: h.textContent ?? "" }))),
    );
    const seen = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    found.forEach((h) => seen.observe(h));
    return () => {
      cancelAnimationFrame(frame);
      seen.disconnect();
    };
  }, [pathname]);

  if (headings.length < 2) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <p className="label">On this page</p>
      <ul>
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} aria-current={active === h.id ? "true" : undefined}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
