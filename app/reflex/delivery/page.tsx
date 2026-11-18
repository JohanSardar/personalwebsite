import type { Metadata } from "next";
import Link from "next/link";
import Block from "@/components/docs/Block";
import DocPage from "@/components/docs/DocPage";
import { Sequence } from "@/components/docs/Diagrams";
import { NPX } from "@/lib/docs";

export const metadata: Metadata = { title: "MCP and Delivery" };

const LANES = ["Agent", "reflex mcp", "Link", "iPad"];

export default function Delivery() {
  return (
    <DocPage slug="delivery" lede="The iPad and the harness meet through MCP. Every harness can wait for a Send with a tool call. Claude Code can also have Sends pushed in over a channel.">
      <p>
        <strong>The short version.</strong> Your agent asks “anything from the iPad?” and the question stays open until you press Send. In Claude Code you can skip the asking, and a Send arrives as a new message by itself.
      </p>

      <h2>Two tools</h2>
      <p>The MCP server exposes two tools and nothing else. There is no tool that writes to the board.</p>
      <div className="table-scroll">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Tool</th>
              <th>Arguments</th>
              <th>Returns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>connect</code>
              </td>
              <td>None</td>
              <td>A six-digit pairing code and a sentence to tell you, or a note that the iPad is already connected.</td>
            </tr>
            <tr>
              <td>
                <code>wait_for_user</code>
              </td>
              <td>
                <code>timeout_s</code> from 0 to 3600, and <code>after</code>, the ID of the last Send
              </td>
              <td>The next Send, or a still-waiting status when the time runs out.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Any harness waits with a tool call</h2>
      <p>This is the route that always works. It needs nothing from the harness beyond ordinary MCP tool calls.</p>
      <Sequence
        lanes={LANES}
        label="The agent calls wait_for_user. The MCP server asks the Link and holds the call open. When the iPad sends, the Link stores the Send and returns it, and the agent gets it as the tool result. The agent answers and calls wait_for_user again with the Send's ID."
        caption="A long-held tool call. Solid arrows are requests and results. The dashed arrow is a progress notification."
        steps={[
          { from: 0, to: 1, label: "tools/call wait_for_user" },
          { from: 1, to: 2, label: "wait (Unix socket)" },
          { from: 1, to: 0, label: "notifications/progress", dashed: true },
          { from: 3, to: 2, label: "Send (encrypted)" },
          { at: 2, note: "stored in SQLite, then confirmed to the iPad" },
          { from: 2, to: 1, label: "Send Bundle" },
          { from: 1, to: 0, label: "result: JSON + PNG images" },
          { at: 0, note: "answers in its own session" },
          { from: 0, to: 1, label: "wait_for_user { after: id }" },
        ]}
      />
      <ul className="dots">
        <li>The result is one text item holding the Send as JSON, followed by the board images as PNG image items.</li>
        <li>
          Passing <code>after</code> acknowledges the previous Send. Until then the Link keeps it.
        </li>
        <li>
          <code>timeout_s: 0</code> reads the Inbox without waiting.
        </li>
        <li>While it waits, the server sends progress notifications if the harness asked for them.</li>
      </ul>
      <p>
        Codex ends any tool call after 300 seconds, and progress does not extend that. The server therefore caps a wait at 280 seconds for Codex and returns a still-waiting status, and the agent calls again. That is why the Codex config sets <code>tool_timeout_sec = 300</code>.
      </p>

      <h2>Claude Code can take a push</h2>
      <p>
        A channel lets an MCP server put a message into a Claude Code session without a tool call. With it, a Send that no <code>wait_for_user</code> is waiting for still reaches the agent, as a new turn.
      </p>
      <Sequence
        lanes={LANES}
        label="The MCP server declares the claude/channel capability and opens a push target on the Link. When the iPad sends, the Link pushes the Send to the server, which emits a channel notification. Claude Code starts a new turn with it."
        caption="A push. Nothing is waiting on the agent side when the Send arrives."
        steps={[
          { from: 1, to: 0, label: "capabilities: claude/channel" },
          { from: 1, to: 2, label: "listen (push target)" },
          { from: 3, to: 2, label: "Send (encrypted)" },
          { at: 2, note: "stored, and no wait_for_user took it" },
          { from: 2, to: 1, label: "push Send Bundle" },
          { from: 1, to: 0, label: "notifications/claude/channel" },
          { at: 0, note: "a new turn starts with the Send" },
        ]}
      />
      <p>The notification the server writes to stdout looks like this.</p>
      <Block
        tabs={[
          {
            name: "JSON-RPC",
            text: `{
  "jsonrpc": "2.0",
  "method": "notifications/claude/channel",
  "params": {
    "content": "<the Send Bundle as a JSON string>",
    "meta": { "space": "...", "send": "...", "kind": "...", "from": "..." }
  }
}`,
          },
        ]}
      />
      <ul className="dots">
        <li>
          The server declares <code>{`experimental: { "claude/channel": {} }`}</code> when it starts with <code>--channel</code>.
        </li>
        <li>Channel content is text, so the board images are written to temporary files and the Bundle carries their paths.</li>
        <li>
          Claude Code drops channel messages from a server that is not on its channels list, without telling the server. Reflex checks the session’s command line for the flag and only promises pushes when it is there.
        </li>
        <li>Only Claude Code has channels. In any other harness the flag does nothing and Sends arrive through the tool.</li>
      </ul>
      <p>Reflex is not on Anthropic’s channel allowlist, so today the channel needs a local checkout and a development flag.</p>
      <Block
        tabs={[
          {
            name: "Terminal",
            text: `node agent/bin/reflex.mjs setup
claude --dangerously-load-development-channels server:reflex`,
          },
        ]}
      />

      <h2>Side by side</h2>
      <div className="table-scroll">
        <table className="doc-table">
          <thead>
            <tr>
              <th></th>
              <th>wait_for_user</th>
              <th>Channel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Works in</td>
              <td>Any MCP harness</td>
              <td>Claude Code</td>
            </tr>
            <tr>
              <td>Who starts it</td>
              <td>The agent calls the tool</td>
              <td>The server pushes</td>
            </tr>
            <tr>
              <td>Setup</td>
              <td>The one-line install</td>
              <td>A checkout and a flag</td>
            </tr>
            <tr>
              <td>Images</td>
              <td>Inline PNG items in the result</td>
              <td>Files on disk, paths in the Bundle</td>
            </tr>
            <tr>
              <td>If the agent is busy</td>
              <td>The Send waits in the Inbox for the next call</td>
              <td>The Send arrives as the next turn</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Both read from the same Inbox. A Send is delivered once, whichever route takes it first.</p>

      <h2>Webhooks</h2>
      <p>A third route for things that are not an interactive session. The Link posts each Send to a URL as a signed request, with the same retry behaviour.</p>
      <Block tabs={[{ name: "Terminal", text: `${NPX} adapters add webhook --url <url>` }]} />

      <h2>Who is allowed</h2>
      <p>
        Each agent presents its own credential to the Link, made the first time it connects. The Link checks your approval on every call and every push. A revoked agent gets nothing. <Link href="/reflex/pairing">Pairing and Approvals</Link> covers how approval is given.
      </p>
    </DocPage>
  );
}
