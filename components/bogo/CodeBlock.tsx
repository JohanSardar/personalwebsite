"use client";

import { useState } from "react";

type Props = { code: string; lang?: string; copy?: boolean };

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {}
  }
  return (
    <button type="button" className="bd-copy" onClick={copy} aria-live="polite">
      {done ? "Copied" : label}
    </button>
  );
}

export default function CodeBlock({ code, lang, copy = true }: Props) {
  return (
    <div className="bd-code">
      {(lang || copy) && (
        <div className="bd-code-bar">
          <span>{lang ?? ""}</span>
          {copy && <CopyButton text={code} />}
        </div>
      )}
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
