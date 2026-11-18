import type { Metadata } from "next";
import Link from "next/link";
import CopyPrompt from "@/components/docs/CopyPrompt";
import PageNav from "@/components/docs/PageNav";
import { Arrow } from "@/components/Sidebar";
import { docPages } from "@/lib/docs";

export const metadata: Metadata = { title: { absolute: "Apple Bridge docs" } };

const examples = [
  "who texted me today",
  "what's on my calendar tomorrow",
  "find the email with my flight confirmation",
  "remind me to call mom at 6",
  "add dinner with sam on friday at 7",
  "find my photos from the beach last summer",
  "how much time did i spend on my mac this week",
];

export default function Overview() {
  return (
    <>
      <h1 className="title">Apple Bridge</h1>
      <p className="lede muted">
        Your Mac&apos;s Messages, Mail, Calendar, Notes and more for Claude Code, Codex and other agents. It runs on your
        Mac as one local MCP server.
      </p>

      <h2 id="quick-start">Quick start</h2>
      <p>
        Paste one prompt into your agent and it sets everything up. Pick your agent, copy the prompt and paste it into a
        chat that can run commands on your Mac.
      </p>
      <CopyPrompt />
      <p>
        The agent installs Apple Bridge, starts it and connects itself. You do two things. You click Allow when your Mac
        asks about the agent, and you switch on the Mac permissions for the apps you want it to use. Then the agent reads
        your reminder lists to show you it works.
      </p>

      <h2 id="what-you-can-ask">What you can ask</h2>
      <p>Once it is connected, talk to your agent the way you normally would.</p>
      <ul className="examples">
        {examples.map((e) => (
          <li key={e}>&ldquo;{e}&rdquo;</li>
        ))}
      </ul>

      <h2 id="what-it-needs">What it needs</h2>
      <ul className="list">
        <li>An Apple silicon Mac on macOS 26 or later.</li>
        <li>An agent that can run commands on that Mac, such as Claude Code, Codex or Cursor.</li>
        <li>Nothing else. There is no account, server, domain or subscription.</li>
      </ul>
      <p>
        Apple Bridge is free and open source under the MIT license. It is in early access, so expect rough edges and{" "}
        <a href="https://github.com/JohanSardar/apple-bridge/issues" target="_blank" rel="noreferrer">
          report them on GitHub
        </a>
        .
      </p>

      <h2 id="how-it-works">How it works</h2>
      <p>
        Apple Bridge has two parts. A small Helper app holds your Mac permissions and reads Apple&apos;s apps. The{" "}
        <code>bridge</code> gateway keeps a synced copy on your Mac and answers agents over MCP.
      </p>
      <p>
        An agent on your Mac starts <code>bridge mcp</code> by itself. The first time, your Mac asks you to Allow it.
        Nothing leaves your Mac unless you turn on remote access, though an agent you connect may send what it reads to
        its own service.
      </p>

      <h2 id="read-next">Read next</h2>
      <div className="cards">
        {docPages.slice(1).map((p) => (
          <Link key={p.href} href={p.href} className="card">
            <span className="card-name">{p.title}</span>
            <span className="card-desc">{p.summary}</span>
            <span className="social">
              Open
              <Arrow />
            </span>
          </Link>
        ))}
      </div>

      <PageNav href="/apple-bridge" />
    </>
  );
}
