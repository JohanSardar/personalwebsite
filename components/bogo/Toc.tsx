"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = { id: string; text: string };

export default function Toc() {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const heads = Array.from(document.querySelectorAll<HTMLElement>(".bd-doc h2[id]"));
    // The active heading is the last one above a line near the top of the window.
    const update = () => {
      let id = heads[0]?.id ?? "";
      for (const h of heads) if (h.getBoundingClientRect().top < 140) id = h.id;
      setActive(id);
    };
    const frame = requestAnimationFrame(() => {
      setItems(heads.map((h) => ({ id: h.id, text: h.textContent ?? "" })));
      update();
    });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  if (items.length < 2) return null;
  return (
    <nav className="bd-toc" aria-label="On this page">
      <p className="label">On this page</p>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={active === it.id ? "true" : undefined}>
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
