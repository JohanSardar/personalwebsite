import type { Metadata } from "next";
import Link from "next/link";
import Block from "@/components/docs/Block";
import DocPage from "@/components/docs/DocPage";
import { NPX } from "@/lib/docs";
import { CLAUDE_ADD, CODEX_BLOCK } from "@/lib/docs-text";

export const metadata: Metadata = { title: "Connect an Agent" };

export default function Connect() {
  return (
    <DocPage slug="connect" lede="Reflex is an MCP server. Any agent that can run one on your Mac can receive Sends.">
      <h2>Claude Code</h2>
      <p>Run this in the folder where you use Claude Code. The registration belongs to that folder.</p>
      <Block tabs={[{ name: "Terminal", text: CLAUDE_ADD }]} />
      <p>
        Start a new <code>claude</code> session there and say <strong>connect my iPad</strong>. A plain session works. You do not need any flags.
      </p>

      <h2>Codex</h2>
      <p>
        Add this block to <code>~/.codex/config.toml</code>. Keep only one block with this name.
      </p>
      <Block tabs={[{ name: "config.toml", text: CODEX_BLOCK }]} />
      <p>
        Keep the timeout line. Without it Codex gives up before you have had time to draw. Start a new session and say <strong>connect my iPad to Reflex</strong>.
      </p>

      <h2>Other agents</h2>
      <p>Other MCP harnesses take the same server command.</p>
      <Block tabs={[{ name: "MCP server command", text: `${NPX} mcp` }]} />
      <p>Reflex has been tested with Claude Code and Codex. Other harnesses use the same server but have had less use.</p>

      <h2>How a Send arrives</h2>
      <p>
        The agent calls a tool named <code>wait_for_user</code>. The call returns when you send something. The agent answers, then calls the tool again and waits for the next Send.
      </p>
      <p>If your agent stops waiting, ask it to wait for your iPad again.</p>

      <h2>Webhooks</h2>
      <p>An approved receiver can also get each Send as a signed web request.</p>
      <Block tabs={[{ name: "Terminal", text: `${NPX} adapters add webhook --url <url>` }]} />

      <h2>Pushed Sends in Claude Code</h2>
      <p>Claude Code can take each Send as a new turn without waiting on a tool. This uses a development channel, needs a local checkout and a flag, and is optional.</p>
      <Block
        tabs={[
          {
            name: "Terminal",
            text: `node agent/bin/reflex.mjs setup
claude --dangerously-load-development-channels server:reflex`,
          },
        ]}
      />
      <p>
        See <Link href="/reflex/commands">Commands</Link> for everything the command line can do.
      </p>
    </DocPage>
  );
}
