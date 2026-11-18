import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/bogo/CodeBlock";
import { H2, Lede, Note } from "@/components/bogo/Doc";
import Prompt from "@/components/bogo/Prompt";
import Sequence from "@/components/bogo/Sequence";
import { INSTALL, REPO, TESTFLIGHT } from "@/lib/bogo-docs";

export const metadata: Metadata = { title: "Overview" };

const PROMPT = `Install BOGO on this Mac and put my MCP servers behind it. Docs: https://johansardar.com/bogo

1. Install: ${INSTALL}
2. Run "bogo setup home --yes" and "bogo setup start --yes".
3. Stop and ask me to run "bogo setup phone" in my own terminal. The 6-digit comparison is mine to do. Never answer it.
4. After I confirm pairing, run "bogo setup agent --yes", then show me "bogo tools" and which tools were left at approve.
5. Run "bogo setup test" and tell me to approve the call on my phone.
6. Run "bogo doctor" and report anything that is not ok.

Never ask me to paste credentials into this chat. Recipes ("bogo upstream add gmail" and so on) read secrets with echo off, so I run those myself.`;

export default function Overview() {
  return (
    <>
      <h1>BOGO</h1>
      <Lede>
        An MCP proxy for your Mac that holds selected tool calls until you approve them on your iPhone. Each approval
        is a Secure Enclave signature over the exact request bytes, and the code that decides whether a call may run is
        proved in Lean.
      </Lede>
      <p>
        Agents connect to BOGO as a single MCP server. BOGO connects to your real MCP servers (the upstreams), exposes
        their tools as <code>upstream__tool</code>, and applies a policy to every call. Allowed calls pass straight
        through. Calls that need approval are sealed and sent to your phone, and BOGO forwards them only after a valid
        signature comes back.
      </p>

      <H2>Why BOGO</H2>
      <ul>
        <li>
          <strong>Approval binds to the exact call.</strong> The signature covers the upstream, tool, arguments,
          agent, session and nonce. Changing one byte of the arguments means a new request.
        </li>
        <li>
          <strong>The approver is a separate device.</strong> A prompt injected agent on your Mac cannot approve its
          own call. The signing key is non exportable and gated by Face ID.
        </li>
        <li>
          <strong>Single use and session bound.</strong> One approval forwards one call, once, while the agent&rsquo;s
          MCP session is still open.
        </li>
        <li>
          <strong>Fail closed by construction.</strong> Unlisted tools default to approve, <code>allow</code> must be
          explicit, and the decision core&rsquo;s safety properties are machine checked.
        </li>
        <li>
          <strong>Auditable.</strong> Every request, decision and outcome goes into a hash chained log that{" "}
          <code>bogo log verify</code> checks.
        </li>
      </ul>

      <H2>How a call flows</H2>
      <Sequence />
      <ol>
        <li>The agent calls a tool. BOGO looks up the effective policy for that tool and agent.</li>
        <li>
          For <code>approve</code>, BOGO stores a canonical request and seals it with HPKE to each eligible approver
          through the relay. The relay sends a content free push.
        </li>
        <li>The phone decrypts the request, renders it, and signs the same bytes with P-256 after Face ID.</li>
        <li>
          The Lean core checks the signature, the registry, the session and the expiry at the moment of dispatch, then
          forwards the call to the upstream exactly once.
        </li>
      </ol>
      <p>
        <Link href="/bogo/requests">Approval requests</Link> covers what is signed and every possible outcome.
      </p>

      <H2>Install</H2>
      <p>Apple Silicon only. No sudo. The script verifies the release&rsquo;s SHA-256 before installing.</p>
      <CodeBlock code={INSTALL} lang="Terminal" />
      <CodeBlock code="bogo setup" lang="Terminal" />
      <p>
        <code>bogo setup</code> creates <code>~/.bogo</code>, starts the daemon as a LaunchAgent, pairs your phone,
        imports the MCP servers from Claude Code, Claude Desktop and Cursor, and makes one protected test call. See{" "}
        <Link href="/bogo/setup">Install and setup</Link>, or go to the <Link href="/bogo/quickstart">Quickstart</Link>{" "}
        to wire up one server by hand.
      </p>

      <H2>Let your agent install it</H2>
      <p>
        Paste this into Claude Code, Codex or Cursor. The agent runs the steps that are safe to automate and hands you
        the two that are not, which are the pairing comparison and entering credentials.
      </p>
      <Prompt
        text={PROMPT}
        note="Setup backs up every client config it changes. bogo setup --undo restores them byte for byte."
      />

      <Note kind="warning">
        <p>
          BOGO is early. The <a href={TESTFLIGHT}>TestFlight build</a> is waiting on Beta App Review, so for now the app
          has to be built from{" "}
          <a href="https://github.com/JohanSardar/apple-bridge-iphone#build-and-check">source</a>. The Mac side has run
          end to end with a software approver, and no session on physical iPhone hardware has been recorded yet. See{" "}
          <Link href="/bogo/status">Status</Link>.
        </p>
      </Note>
      <p>
        MIT licensed. Source on <a href={REPO}>GitHub</a>.
      </p>
    </>
  );
}
