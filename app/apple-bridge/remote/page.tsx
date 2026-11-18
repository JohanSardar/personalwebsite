import type { Metadata } from "next";
import Code from "@/components/docs/Code";
import PageNav from "@/components/docs/PageNav";

export const metadata: Metadata = { title: "Other computers" };

export default function Remote() {
  return (
    <>
      <h1 className="title">Other computers</h1>
      <p className="lede muted">
        Skip this page if your agent can run commands on your Mac. Remote access is off by default and most setups never
        need it.
      </p>

      <h2 id="when">When you need it</h2>
      <p>
        Use one of these routes only when the agent lives somewhere else and cannot run commands on your Mac, such as
        Claude Code on a server or a cloud bot. Your Mac has to stay awake and online for them to work.
      </p>
      <p>Every route still asks you to Allow each new agent on your Mac.</p>

      <h2 id="ssh">From a server with SSH</h2>
      <p>
        If the server can already SSH into your Mac, nothing else is needed. Set this as the agent&apos;s MCP command and
        click Allow once.
      </p>
      <Code label="MCP command">{`ssh -T you@your-mac ~/.applebridge/bin/bridge mcp`}</Code>
      <p>This needs Remote Login switched on in your Mac&apos;s settings and the server&apos;s key on your Mac.</p>

      <h2 id="tailscale">Over Tailscale</h2>
      <Code>{`bridge tailscale`}</Code>
      <p>
        This serves your Mac on your own Tailscale network and never on the public internet. It prints a sentence to give
        your agent. The agent asks to connect, your Mac shows an Allow panel naming the agent and its device, and the
        agent gets its own key.
      </p>
      <p>
        Apple Bridge never changes your Tailscale access rules. If a rule blocks a device, it tells you which device and
        which rule to add. <code>bridge tailscale --off</code> turns the route off again.
      </p>

      <h2 id="grok-bot">Grok Bot</h2>
      <p>
        Grok Bot runs its connectors on its own cloud computer. That computer joins your Tailscale network through Grok
        Bot&apos;s Tailscale plugin, and you do the sign-in. Then Grok Bot runs one command on your Mac.
      </p>
      <Code>{`bridge link grok-bot --json`}</Code>
      <p>
        It turns on the Tailscale route, asks you to Allow on your Mac and waits up to five minutes. After you click
        Allow, Grok Bot gets its connector address and key and sets up the connector itself. You never copy the key.
      </p>

      <PageNav href="/apple-bridge/remote" />
    </>
  );
}
