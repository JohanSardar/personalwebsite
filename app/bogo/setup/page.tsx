import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/bogo/CodeBlock";
import { H2, Lede, Note, Table } from "@/components/bogo/Doc";
import { INSTALL, REPO } from "@/lib/bogo-docs";

export const metadata: Metadata = { title: "Install and set up" };

const INSTALL_OUT = `bogo-install: downloading the latest release
bogo-install: installed bogo 0.1.0 (commit 7ee1e72b3f92) into /Users/you/.local/bin
bogo-install: next step: bogo setup`;

const STEPS = `1/5 Create BOGO's home at /Users/you/.bogo.
2/5 Start BOGO in the background, so it runs at login.
3/5 Add your iPhone, so protected calls wait for your Face ID.
4/5 Connect an agent: move each MCP client's servers behind BOGO.
5/5 Make one protected test call, and approve it on your phone.`;

const DOCTOR = `ok    bogo.toml and secrets.toml load
ok    BOGO is running
ok    BOGO answers on port 8790
ok    1 iPhone(s) paired
ok    App Attest accepts TestFlight, App Store and Xcode builds
ok    the relay https://bogo.eilmer.si:8443 is reachable
ok    upstream files starts
ok    Claude Code reaches BOGO as agent Claude Code
Everything BOGO needs is in place.`;

const ENTRY = `"bogo": {
  "command": "/Users/you/.local/bin/bogo-shim",
  "args": [],
  "env": {
    "BOGO_AGENT_TOKEN_FILE": "/Users/you/.bogo/agents/claude-code.token",
    "BOGO_URL": "http://127.0.0.1:8790/mcp"
  }
}`;

export default function Setup() {
  return (
    <>
      <h1>Install and set up</h1>
      <Lede>
        The install script, <code>bogo setup</code> and <code>bogo doctor</code>, with every file each one touches. For
        wiring a single server by hand, see the Quickstart.
      </Lede>

      <H2>Install</H2>
      <CodeBlock code={INSTALL} lang="Terminal" />
      <p>
        You can read <a href={`${REPO}/blob/main/install.sh`}>install.sh</a> first. The script checks that this is an
        Apple Silicon Mac, downloads the latest release from GitHub, checks its SHA-256 and copies <code>bogo</code>{" "}
        and <code>bogo-shim</code> into <code>~/.local/bin</code>. If the checksum does not match, it stops and installs
        nothing.
      </p>
      <CodeBlock code={INSTALL_OUT} lang="Output" copy={false} />
      <ul>
        <li>No sudo. Nothing outside the install directory is modified.</li>
        <li>
          If <code>~/.local/bin</code> is not on your <code>PATH</code>, it prints the line to add to{" "}
          <code>~/.zshrc</code> and leaves the file alone.
        </li>
        <li>
          Set <code>BOGO_VERSION=v0.1.0</code> to pin a release, or <code>BOGO_INSTALL_DIR</code> to install somewhere
          else. Run it again to upgrade.
        </li>
        <li>
          The programs are signed ad hoc and not notarized. Files fetched with <code>curl</code> are not marked as
          downloaded, so they run with no Gatekeeper prompt.
        </li>
      </ul>

      <H2>Run setup</H2>
      <CodeBlock code="bogo setup" lang="Terminal" />
      <p>
        Setup runs five idempotent steps. Each is skipped when already complete, so rerunning it is safe.
      </p>
      <CodeBlock code={STEPS} lang="Output" copy={false} />
      <Table
        head={["Step", "What it does"]}
        rows={[
          [
            <code key="1">home</code>,
            "Makes ~/.bogo with new keys and a private secrets file. It asks how many requests one agent may have waiting, how long the slider stays off when a request opens, and for another port if 8790 is taken.",
          ],
          [<code key="2">start</code>, "Starts BOGO in the background with a LaunchAgent, so it also runs at login."],
          [
            <code key="3">phone</code>,
            <>
              Asks what to call your phone, then pairs it. Both screens show the same 6 digits. See{" "}
              <Link href="/bogo/iphone">Add your iPhone</Link>.
            </>,
          ],
          [
            <code key="4">agent</code>,
            "Finds the MCP servers in Claude Code, Claude Desktop and Cursor and offers to move each behind BOGO. It suggests allow for tools the server marks read only and approve for the rest, and you confirm each one.",
          ],
          [
            <code key="5">test</code>,
            "Calls BOGO's own check tool, which only answers pong, and waits for you to approve it on the phone.",
          ],
        ]}
      />
      <p>
        Run one step with <code>bogo setup STEP</code>. For example, <code>bogo setup agent</code> lets you change the
        policies you chose.
      </p>
      <p>
        <code>--yes</code> accepts every suggestion except <code>allow</code>. A tool setup would have allowed stays at{" "}
        <code>approve</code> until you open it explicitly. If stdin closes mid prompt, setup stops instead of guessing.
      </p>

      <H2>What setup changes</H2>
      <Table
        head={["Where", "What"]}
        rows={[
          [<code key="a">~/.bogo/</code>, "BOGO's private home with its config, secrets, keys and log. Agent tokens go in ~/.bogo/agents/."],
          [<code key="b">~/Library/LaunchAgents/si.eilmer.bogo.plist</code>, "The LaunchAgent that runs BOGO at login."],
          [<code key="c">~/.claude.json</code>, "Claude Code's MCP servers, if you move them."],
          [<code key="d">claude_desktop_config.json</code>, "Claude Desktop's MCP servers, if you move them."],
          [<code key="e">~/.cursor/mcp.json</code>, "Cursor's MCP servers, if you move them."],
          [<code key="f">~/.bogo/setup/backups/</code>, "A copy of each client file, taken before its first change."],
        ]}
      />
      <p>
        Values in a server&rsquo;s <code>env</code> or <code>headers</code> that look like credentials move into{" "}
        <code>~/.bogo/secrets.toml</code>, and no longer appear in the client file. Each client gets one{" "}
        <code>bogo</code> entry in place of the servers it had. The agent&rsquo;s token sits in a file only your account
        can read, and setup never shows it.
      </p>
      <CodeBlock code={ENTRY} lang="JSON" copy={false} />
      <Note>
        <p>
          An agent that has a shell running as you can read that token file, and anything else your account can read.
          BOGO only controls calls that pass through it. Run such agents in the{" "}
          <a href={`${REPO}/blob/main/sandbox/README.md`}>reference sandbox</a>.
        </p>
      </Note>

      <H2>Undo</H2>
      <CodeBlock code="bogo setup --undo" lang="Terminal" />
      <p>
        This puts back each client file setup changed, byte for byte and with its file mode. The agents setup added
        stay registered until you revoke them, and it prints the <code>bogo agent revoke</code> commands. To stop BOGO,
        run <code>bogo stop</code>.
      </p>

      <H2>Check with doctor</H2>
      <CodeBlock code="bogo doctor" lang="Terminal" />
      <p>
        Read only. Checks config parsing, the daemon, the port, paired approvers, App Attest environments, relay
        reachability, that each upstream starts, and that each client token maps to a known agent. Exits non zero on any{" "}
        <code>FAIL</code>, each with a one line fix.
      </p>
      <CodeBlock code={DOCTOR} lang="Output" copy={false} />
    </>
  );
}
