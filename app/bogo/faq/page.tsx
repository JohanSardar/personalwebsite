import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { slug } from "@/components/bogo/Doc";

export const metadata: Metadata = { title: "FAQ" };

const QA: [string, ReactNode][] = [
  [
    "Why should I trust BOGO?",
    <>
      You should not take it on faith. The decision core is proved in Lean, <Link href="/bogo/proved">Proofs</Link>{" "}
      lists where the proof stops, and <Link href="/bogo/status">Status</Link> shows what has been run. The
      code is MIT licensed. No independent human security audit has been done.
    </>,
  ],
  [
    "Is it ready to protect real actions?",
    <>
      Not yet. The Mac side works end to end with a software test approver and the app works in the Simulator, but no
      session on a real iPhone has been recorded.
    </>,
  ],
  [
    "Does BOGO stop my agent from doing anything it likes?",
    <>
      Only through MCP. If the agent also has a shell, a browser or credentials of its own, it can act without asking
      BOGO. Turn those off, or use the reference sandbox.
    </>,
  ],
  [
    "What exactly do I approve?",
    <>
      One tool call, byte for byte, with the agent that asked and its reason. If the agent changes one character, that
      is a new request that needs a new approval.
    </>,
  ],
  [
    "Can I trust the agent's reason?",
    <>
      No. It is the agent&rsquo;s own explanation, marked &ldquo;Not verified by BOGO&rdquo; on the card, and it is
      never sent upstream. Judge the call by what will run.
    </>,
  ],
  [
    "What happens if I do not answer?",
    <>
      Nothing runs. A request ends when the agent&rsquo;s session ends, or when a per tool expiry passes. Approving
      after that is refused.
    </>,
  ],
  [
    "What if my phone is offline?",
    <>
      The request waits on the relay until your phone collects it. If the session ends first, the request ends
      unanswered and nothing runs.
    </>,
  ],
  [
    "What do the relay and Apple see?",
    <>
      The relay sees encrypted messages, their sizes and timing, and your phone&rsquo;s push token. Apple sees that your
      phone got a push that says &ldquo;Approval requested&rdquo;. Neither sees the Mac, the tool, the agent or an
      amount. Pushes are limited to 30 per phone per minute.
    </>,
  ],
  [
    "What is the software test approver?",
    <>
      A way to try BOGO without an iPhone. It signs on the Mac without Face ID, and anyone with your Mac account can use
      it. It only exists in test builds. Never use it to protect real actions.
    </>,
  ],
  [
    "What if the network fails after BOGO sends a call?",
    <>
      The provider may already have acted. BOGO records the outcome as unknown and never retries it. Check with the
      provider before you try again.
    </>,
  ],
  [
    "Which agents work with BOGO?",
    <>
      Any MCP client. Claude Code is the one that has been run. <Link href="/bogo/agents">Clients</Link> has
      configs for others.
    </>,
  ],
  [
    "Why is the iPhone part in the Apple Bridge app?",
    <>
      So there is one app to ship and review. BOGO uses none of Apple Bridge&rsquo;s servers or keys, and the
      app&rsquo;s other features stay off until you turn each one on.
    </>,
  ],
  [
    "Where do I report a bug?",
    <>
      Bugs go to the <a href="https://github.com/JohanSardar/bogo/issues/new/choose">repo&rsquo;s issues</a>, even when
      they show up on the phone. Vulnerabilities go through{" "}
      <a href="https://github.com/JohanSardar/bogo/security">private reporting</a>.
    </>,
  ],
];

export default function Faq() {
  return (
    <>
      <h1>FAQ</h1>
      {QA.map(([q, a]) => (
        <section key={q}>
          <h2 id={slug(q)}>{q}</h2>
          <p>{a}</p>
        </section>
      ))}
    </>
  );
}
