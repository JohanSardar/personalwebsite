import type { Metadata } from "next";
import Code from "@/components/apple-bridge/Code";
import CopyPrompt from "@/components/apple-bridge/CopyPrompt";
import PageNav from "@/components/apple-bridge/PageNav";

export const metadata: Metadata = { title: "Setup" };

const agents: [string, string][] = [
  ["Claude Code", "bridge link claude"],
  ["Codex", "bridge link codex"],
  ["Cursor", "bridge link cursor"],
  ["Visual Studio Code", "bridge link vscode"],
  ["Zed", "bridge link zed"],
  ["Gemini CLI", "bridge link gemini"],
  ["Goose", "bridge link goose"],
  ["OpenCode", "bridge link opencode"],
  ["The Claude app", "bridge link claude-desktop"],
  ["Anything else", "bridge link other"],
];

export default function Setup() {
  return (
    <>
      <h1 className="title">Setup</h1>
      <p className="lede muted">
        Most people paste the prompt and are done in a few minutes. This page walks through each step, for when you want
        to do it yourself or check what your agent did.
      </p>

      <h2 id="let-your-agent-do-it">Let your agent do it</h2>
      <p>
        Paste this into any agent that can run commands on your Mac. It does every step below by itself and stops only for
        the clicks that must be yours.
      </p>
      <CopyPrompt />

      <h2 id="install">Install</h2>
      <Code>{`curl -fsSL https://eilmer.si/applebridge/install | sh`}</Code>
      <p>
        It needs no Node, Homebrew or <code>sudo</code>. It puts Apple Bridge in <code>~/.applebridge</code>, adds{" "}
        <code>bridge</code> to <code>~/.local/bin</code> and checks the download&apos;s SHA-256 before it changes anything.
        Open a new terminal afterwards so <code>bridge</code> is on your PATH.
      </p>

      <h2 id="start">Start</h2>
      <Code>{`bridge up`}</Code>
      <p>
        This starts Apple Bridge in the background and returns once it is ready. It asks nothing. It keeps running after
        you close the terminal, but it does not start again after a restart. Run it again then, or let the Apple Bridge
        app start it at login.
      </p>

      <h2 id="connect">Connect your agent</h2>
      <p>One line connects each agent on your Mac.</p>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Agent</th>
              <th>Run on your Mac</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(([name, cmd]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  <code>{cmd}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The first time an agent connects, your Mac shows a small panel asking whether to allow it. Click Allow once and the
        agent keeps working after restarts. Don&apos;t Allow keeps it out.
      </p>
      <p>
        <code>bridge link other</code> prints the settings any other MCP agent needs. Running a link command twice is
        safe, and <code>bridge unlink claude</code> undoes it.
      </p>

      <h2 id="permissions">Allow Mac permissions</h2>
      <Code>{`bridge permissions guide`}</Code>
      <p>
        A small window opens beside System Settings and shows what to switch on. It goes through Contacts, Calendar,
        Reminders, Photos, Full Disk Access and Screen Recording, and skips any you already allowed. Choose Not Now for
        anything you want to keep private.
      </p>
      <ul className="list">
        <li>Messages, Mail and Notes need Full Disk Access.</li>
        <li>Reminders needs Calendar as well.</li>
        <li>Your agent can open the guide for you, but only you can click through it.</li>
      </ul>

      <h2 id="check">Check it works</h2>
      <Code>{`bridge stats --wait`}</Code>
      <p>This shows how much has synced for each app, as counts only and never content.</p>
      <Code label="Example output">{`✓ Messages        163,101 messages · 708 chats · 6,791 attachments
✓ Contacts        154 contacts
✓ Calendar        1,776 events · 30 calendars
! Notes           nothing yet  (needs a Mac permission: run bridge permissions guide)
354,321 items in total. Counts only, no content.`}</Code>
      <p>Then ask your agent something real, such as &ldquo;show me my reminder lists&rdquo;.</p>

      <h2 id="update">Update and uninstall</h2>
      <p>
        To update, run the install command again, then <code>bridge up</code>. Your Mac permissions and connected agents
        carry over.
      </p>
      <p>To uninstall, disconnect your agents, stop Apple Bridge and remove its files.</p>
      <Code>{`bridge unlink claude
bridge down
rm -rf ~/.applebridge ~/.local/bin/bridge`}</Code>
      <p>
        Your synced data stays in <code>~/Library/Application Support/AppleBridge</code>. Delete that folder too if you
        no longer want it, and switch off the permissions in System Settings under Privacy &amp; Security.
      </p>

      <PageNav href="/apple-bridge/setup" />
    </>
  );
}
