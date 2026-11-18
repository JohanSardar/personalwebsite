"use client";

import { useState } from "react";

/** A long prompt shown in full, line breaks kept, with one button to copy it. */
export default function LongPrompt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div className="prompt">
      <div className="prompt-foot prompt-head">
        <span className="label">Paste into your agent</span>
        <button type="button" className="prompt-copy" onClick={copy}>
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>
      <p className="prompt-text prompt-long">{text}</p>
    </div>
  );
}
