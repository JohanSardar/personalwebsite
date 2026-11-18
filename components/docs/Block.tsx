"use client";

import { useState } from "react";

type Tab = { name: string; text: string };

/** A prompt or code box with a copy button. More than one tab shows a switcher. */
export default function Block({ tabs, copy = "Copy", wrap = false }: { tabs: Tab[]; copy?: string; wrap?: boolean }) {
  const [at, setAt] = useState(0);
  const [done, setDone] = useState(false);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(tabs[at].text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {}
  }

  return (
    <div className="block">
      <div className="block-head">
        {tabs.length > 1 ? (
          <div className="block-tabs" role="tablist">
            {tabs.map((t, i) => (
              <button key={t.name} type="button" role="tab" aria-selected={i === at} className="block-tab" onClick={() => setAt(i)}>
                {t.name}
              </button>
            ))}
          </div>
        ) : (
          <span className="block-name">{tabs[0].name}</span>
        )}
        <button type="button" className="block-copy" onClick={copyText}>
          {done ? "Copied" : copy}
        </button>
      </div>
      <pre className={wrap ? "block-body wrap" : "block-body"}>{tabs[at].text}</pre>
    </div>
  );
}
