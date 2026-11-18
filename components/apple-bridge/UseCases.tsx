"use client";

import { useState } from "react";

const cases = [
  {
    name: "Catch up",
    about: "Go through what came in across Messages and Mail and hear what needs you, without opening either app.",
    prompt: "go through my unread texts and emails from today and tell me what needs a reply",
  },
  {
    name: "Plan your day",
    about: "See today's events, all-day ones included, next to the reminders that are due or overdue.",
    prompt: "what's on my calendar today and which reminders are overdue",
  },
  {
    name: "Find anything",
    about: "Search Messages, Mail, Notes and Calendar in one go when you don't remember where something was.",
    prompt: "find the address sam sent me last week, it could be in texts or email",
  },
  {
    name: "Get things done",
    about: "Add reminders and events by name, and they show up on your Mac and iPhone right away.",
    prompt: "remind me to call the dentist tomorrow at 10 and add lunch with sam on friday at 1",
  },
];

export default function UseCases() {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const c = cases[i];

  async function copy() {
    try {
      await navigator.clipboard.writeText(c.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div className="ab-cases">
      <div className="ab-case-tabs" role="tablist" aria-label="Things to ask">
        {cases.map((x, n) => (
          <button
            key={x.name}
            type="button"
            role="tab"
            aria-selected={n === i}
            className="ab-case-tab"
            onClick={() => {
              setI(n);
              setCopied(false);
            }}
          >
            {x.name}
          </button>
        ))}
      </div>
      <p>{c.about}</p>
      <div className="prompt ab-ask">
        <p className="prompt-text">{c.prompt}</p>
        <div className="ab-ask-foot">
          <button type="button" className="prompt-copy" onClick={copy}>
            {copied ? "Copied" : "Copy prompt"}
          </button>
        </div>
      </div>
    </div>
  );
}
