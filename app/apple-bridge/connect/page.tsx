import type { Metadata } from "next";
import Link from "next/link";
import { Cards, Fold, Head, Inline, Steps } from "@/components/apple-bridge/Bits";
import Code from "@/components/apple-bridge/Code";
import CopyPrompt from "@/components/apple-bridge/CopyPrompt";
import PageNav from "@/components/apple-bridge/PageNav";

export const metadata: Metadata = { title: "Connect" };

type Client = { id: string; name: string; link: string; effect: string; after: string; more?: [string, string] };

const clients: Client[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    link: "claude",
    effect: "This runs `claude mcp add` for you, and Apple Bridge works in every project.",
    after: "Start a new Claude Code session.",
    more: [
      "Only for one project",
      "Add `--scope project` to save it in this project's `.mcp.json` instead. Claude Code asks you to approve it the first time it starts there.",
    ],
  },
  { id: "codex", name: "Codex", link: "codex", effect: "This runs `codex mcp add` for you.", after: "Start a new Codex session." },
  { id: "cursor", name: "Cursor", link: "cursor", effect: "This adds Apple Bridge to `~/.cursor/mcp.json`.", after: "Reload Cursor." },
  {
    id: "vscode",
    name: "VS Code",
    link: "vscode",
    effect: "This runs `code --add-mcp`, or opens VS Code's install link.",
    after: "Reload VS Code.",
  },
  { id: "zed", name: "Zed", link: "zed", effect: "This adds Apple Bridge to `~/.config/zed/settings.json`.", after: "Reload Zed." },
  { id: "gemini", name: "Gemini CLI", link: "gemini", effect: "This runs `gemini mcp add` for you.", after: "Start a new Gemini CLI session." },
  { id: "goose", name: "Goose", link: "goose", effect: "This opens Goose's install link.", after: "Confirm the install in Goose." },
  {
    id: "opencode",
    name: "OpenCode",
    link: "opencode",
    effect: "This adds Apple Bridge to `~/.config/opencode/opencode.json`.",
    after: "Restart OpenCode.",
  },
  {
    id: "claude-app",
    name: "Claude app",
    link: "claude-desktop",
    effect: "This adds Apple Bridge to the Claude app's settings.",
    after: "Quit the Claude app and open it again.",
  },
];

export default function Connect() {
  return (
    <>
      <Head
        title="Connect to Apple Bridge"
        lede="Connect your agent with one prompt, step by step, or from another computer. Every way ends with you clicking Allow on your Mac."
      />
      <Cards
        cols={3}
        items={[
          { title: "From your agent", href: "#from-your-agent", summary: "Paste one prompt and your agent does the rest." },
          { title: "Step by step", href: "#manual-setup", summary: "Run two commands for your agent yourself." },
          { title: "Another computer", href: "/apple-bridge/connect/remote", summary: "For agents that can't run on your Mac." },
        ]}
      />

      <h2 id="from-your-agent">Connect from your agent</h2>
      <p>
        Open an agent that can run commands on your Mac and paste this prompt. The agent installs Apple Bridge, starts it,
        connects itself and reads your reminder lists to prove it works.
      </p>
      <CopyPrompt />
      <p>
        Two things stay with you. Click Allow when your Mac asks about the agent, and switch on the{" "}
        <a href="#permissions">Mac permissions</a> you want.
      </p>

      <h2 id="manual-setup">Manual setup</h2>
      <p>Install Apple Bridge and start it once. It needs no Node, Homebrew or sudo.</p>
      <Code>{`curl -fsSL https://eilmer.si/applebridge/install | sh
bridge up`}</Code>
      <p>Then pick your agent.</p>
      <div className="ab-clients">
        {clients.map((c) => (
          <a key={c.id} href={`#${c.id}`}>
            {c.name}
          </a>
        ))}
        <a href="#other-clients">Other MCP clients</a>
      </div>

      {clients.map((c) => (
        <section key={c.id}>
          <h2 id={c.id}>{c.name}</h2>
          <Steps>
            <li>
              <p>Run this on your Mac.</p>
              <Code>{`bridge link ${c.link}`}</Code>
              <p className="muted">
                <Inline text={c.effect} />
              </p>
            </li>
            <li>
              <p>
                {c.after} Then ask something real, such as &ldquo;show me my reminder lists&rdquo;.
              </p>
            </li>
            <li>
              <p>Click Allow when your Mac asks about {c.name}. You only do this once.</p>
            </li>
          </Steps>
          {c.more && (
            <Fold title={c.more[0]}>
              <p>
                <Inline text={c.more[1]} />
              </p>
            </Fold>
          )}
        </section>
      ))}

      <h2 id="other-clients">Other MCP clients</h2>
      <p>
        Any MCP client on your Mac can start Apple Bridge the same way. <code>bridge link other</code> prints the settings
        to paste.
      </p>
      <Code label="JSON">{`{"mcpServers": {"apple-bridge": {"command": "/Users/you/.applebridge/bin/bridge", "args": ["mcp"]}}}`}</Code>
      <Fold title="Clients that only speak HTTP">
        <p>
          Create a key with the least access the client needs and send it as <code>Authorization: Bearer &lt;key&gt;</code>{" "}
          to <code>http://127.0.0.1:7780/mcp</code>.
        </p>
        <Code>{`bridge agents create --name my-bot --level read --scope messages:read,contacts:read`}</Code>
      </Fold>

      <h2 id="permissions">Mac permissions</h2>
      <Code>{`bridge permissions guide`}</Code>
      <p>
        A small window opens beside System Settings and shows what to switch on. It goes through Contacts, Calendar,
        Reminders, Photos, Full Disk Access and Screen Recording, and skips any you already allowed. Choose Not Now for
        anything you want to keep private.
      </p>
      <ul className="list">
        <li>Messages, Mail and Notes need Full Disk Access.</li>
        <li>Reminders needs Calendar as well.</li>
        <li>Your agent can open the guide, but only you can click through it.</li>
      </ul>
      <p>
        <code>bridge stats --wait</code> then shows how much has synced for each app, as counts only.
      </p>

      <h2 id="troubleshooting">Troubleshooting</h2>
      <div className="ab-folds">
        <Fold title="“Apple Bridge isn't running on this Mac”">
          <p>
            Run <code>bridge up</code>. It stops after a restart or logout unless the Apple Bridge app starts it at login.
          </p>
        </Fold>
        <Fold title="My agent doesn't see the tools">
          <p>
            Most agents read their MCP settings when they start. Start a new session or reload the agent after{" "}
            <code>bridge link</code>.
          </p>
        </Fold>
        <Fold title="An old Apple Bridge connector keeps failing">
          <p>
            Earlier versions offered a public address that no longer exists. Remove the old connector from your agent and
            connect again from the top of this page.
          </p>
        </Fold>
        <Fold title="A source shows nothing">
          <p>
            It needs its Mac permission, so run <code>bridge permissions guide</code>. Reminders also needs Calendar, and
            Mail needs an account on this Mac that has downloaded its mail.
          </p>
        </Fold>
        <Fold title="I clicked Don't Allow on a permission">
          <p>
            macOS won&apos;t ask again. Switch Apple Bridge on in System Settings under Privacy &amp; Security, then run{" "}
            <code>bridge down</code> and <code>bridge up</code>.
          </p>
        </Fold>
        <Fold title="Something else is wrong">
          <p>
            <code>bridge status --json</code>, <code>bridge permissions status --json</code> and <code>bridge doctor</code>{" "}
            show what is wrong without changing anything. Every error also says what to do next.
          </p>
        </Fold>
      </div>

      <h2 id="faqs">FAQs</h2>
      <div className="ab-folds">
        <Fold title="Do I need Tailscale or a server?">
          <p>
            No. An agent on your Mac connects with nothing else. Remote access is only for{" "}
            <Link href="/apple-bridge/connect/remote">agents on other computers</Link>.
          </p>
        </Fold>
        <Fold title="Does it work on an Intel Mac?">
          <p>No. It needs an Apple silicon Mac on macOS 26 or later.</p>
        </Fold>
        <Fold title="Can my agent change things without asking me?">
          <p>
            Yes, once you allow it. To have it ask before each change, run <code>bridge agents list</code>, then{" "}
            <code>bridge agents update &lt;id&gt; --level approve</code>.
          </p>
        </Fold>
        <Fold title="How do I update?">
          <p>
            Run the install command again, then <code>bridge up</code>. Your permissions and connected agents carry over.
          </p>
        </Fold>
        <Fold title="How do I uninstall?">
          <Code>{`bridge unlink claude
bridge down
rm -rf ~/.applebridge ~/.local/bin/bridge`}</Code>
          <p>
            Your synced data stays in <code>~/Library/Application Support/AppleBridge</code> until you delete that folder.
          </p>
        </Fold>
        <Fold title="Is it free?">
          <p>Yes. It is open source under the MIT license, with no account or subscription.</p>
        </Fold>
      </div>

      <PageNav href="/apple-bridge/connect" />
    </>
  );
}
