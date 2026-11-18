"use client";

import { useState } from "react";
import { installUrl } from "@/lib/docs";

const agents = [
  { label: "Claude Code", link: "claude" },
  { label: "Codex", link: "codex" },
  { label: "Cursor", link: "cursor" },
  { label: "Claude app", link: "claude-desktop" },
  { label: "Other", link: "other" },
];

function promptFor(link: string) {
  return [
    `Set up Apple Bridge on my Mac so you can use my Messages, Mail, Calendar, Notes and Reminders.`,
    `Install it from ${installUrl} and follow the setup guide it points to.`,
    `Run every step on this Mac yourself and connect with \`bridge link ${link}\`.`,
    `I will click Allow and grant the Mac permissions. Never approve anything for me.`,
    `Don't set up Tailscale or any remote access.`,
    `When you're done, read my reminder lists to show me it works.`,
  ].join(" ");
}

export default function CopyPrompt() {
  const [agent, setAgent] = useState(agents[0]);
  const [copied, setCopied] = useState(false);
  const text = promptFor(agent.link);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div className="prompt">
      <div className="prompt-tabs" role="tablist" aria-label="Your agent">
        {agents.map((a) => (
          <button
            key={a.link}
            type="button"
            role="tab"
            aria-selected={a.link === agent.link}
            className="prompt-tab"
            onClick={() => setAgent(a)}
          >
            {a.label}
          </button>
        ))}
      </div>
      <p className="prompt-text">{text}</p>
      <div className="prompt-foot">
        <span className="label">Paste into your agent</span>
        <button type="button" className="prompt-copy" onClick={copy}>
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>
    </div>
  );
}
