"use client";

import { useState } from "react";

type Props = { children: string; label?: string };

export default function Code({ children, label = "Terminal" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div className="code">
      <div className="code-head">
        <span className="label">{label}</span>
        <button type="button" className="code-copy" onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}
