import type { Metadata } from "next";
import Link from "next/link";
import Block from "@/components/docs/Block";
import DocPage from "@/components/docs/DocPage";
import { Arrow } from "@/components/Sidebar";
import { TESTFLIGHT } from "@/lib/docs";
import { CLAUDE_ADD, CLAUDE_PROMPT, CODEX_BLOCK, CODEX_PROMPT } from "@/lib/docs-text";

export const metadata: Metadata = { title: "Quick Start" };

export default function QuickStart() {
  return (
    <DocPage
      slug="quick-start"
      lede="Paste one prompt into your agent and it sets itself up. About five minutes, no account."
    >
      <p className="note">Reflex is a public TestFlight beta for iPadOS 26 or later. The Mac side is open source under the MIT license.</p>

      <h2>What you need</h2>
      <ul className="dots">
        <li>
          The <a href={TESTFLIGHT}>Reflex iPad beta</a> from TestFlight.
        </li>
        <li>
          A Mac with <a href="https://nodejs.org/en/download">Node.js 22 or later</a> and Git.
        </li>
        <li>Claude Code or Codex, already working on that Mac.</li>
      </ul>
      <p>You do not need a Reflex account or a server.</p>

      <h3>
        <span className="num">01</span>Paste this prompt into your agent
      </h3>
      <p>Open your agent in the folder where you work and paste the prompt. The agent adds Reflex to its own tools.</p>
      <Block
        copy="Copy prompt"
        wrap
        tabs={[
          { name: "Claude Code", text: CLAUDE_PROMPT },
          { name: "Codex", text: CODEX_PROMPT },
        ]}
      />

      <h3>
        <span className="num">02</span>Ask for a code
      </h3>
      <p>
        Start a new session and say <strong>connect my iPad</strong>. In Codex, say <strong>connect my iPad to Reflex</strong>. Allow Reflex’s tools if your agent asks. It gives you a six-digit code.
      </p>

      <h3>
        <span className="num">03</span>Type the code on your iPad
      </h3>
      <p>Open Reflex and tap the connection button at the top right. It looks like a laptop. Enter the code, and allow Local Network access when iPadOS asks.</p>
      <p>Typing the code pairs the iPad with your Mac and approves the agent that gave you the code. There is no second approval step.</p>
      <figure className="doc-figure narrow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/reflex/ipad-connect.png" width={1032} height={1376} loading="lazy" alt="The Connection sheet on iPad with the Mac connected, Claude Code allowed and a code being typed" />
        <figcaption>The Connection sheet, with a code half typed.</figcaption>
      </figure>

      <h3>
        <span className="num">04</span>Draw and tap Send
      </h3>
      <p>
        Draw or write on the board, then tap <strong>Send</strong>. You can also hold the mic and speak. Letting go of the mic sends your words. Read the answer in your agent session.
      </p>

      <h2>Set up from the terminal</h2>
      <p>You can skip the prompt and add Reflex yourself. For Claude Code, run this in the folder where you use it.</p>
      <Block tabs={[{ name: "Terminal", text: CLAUDE_ADD }]} />
      <p>
        For Codex, add this block to <code>~/.codex/config.toml</code>.
      </p>
      <Block tabs={[{ name: "config.toml", text: CODEX_BLOCK }]} />
      <p>Then start a new session and continue from step 02. The install downloads a small prebuilt file. It does not download the iPad source or build the app.</p>

      <h2>Learn more</h2>
      <div className="doc-cards">
        <Link href="/reflex/how-it-works" className="doc-card">
          <b>
            How It Works <Arrow />
          </b>
          <span>The three programs, the paths between them and the encryption.</span>
        </Link>
        <Link href="/reflex/delivery" className="doc-card">
          <b>
            MCP and Delivery <Arrow />
          </b>
          <span>How a Send reaches the agent as a tool result or a channel push.</span>
        </Link>
        <Link href="/reflex/privacy" className="doc-card">
          <b>
            Privacy and Security <Arrow />
          </b>
          <span>Who can read a Send, and what the relay can see.</span>
        </Link>
        <Link href="/reflex/troubleshooting" className="doc-card">
          <b>
            Troubleshooting <Arrow />
          </b>
          <span>What to check when the agent does not see Reflex or pairing stalls.</span>
        </Link>
      </div>
    </DocPage>
  );
}
