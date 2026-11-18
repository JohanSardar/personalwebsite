import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/bogo/CodeBlock";
import { H2, Lede, Note } from "@/components/bogo/Doc";
import ReviewCard from "@/components/bogo/ReviewCard";
import { BLOB } from "@/lib/bogo-docs";

export const metadata: Metadata = { title: "Quickstart" };

const ADD = `mkdir -p ~/bogo-scratch ~/.local/share/mcp/fs
npm install --prefix ~/.local/share/mcp/fs @modelcontextprotocol/server-filesystem@2.3.0

bogo stop
bogo upstream add fs -- "$(command -v node)" \\
  ~/.local/share/mcp/fs/node_modules/@modelcontextprotocol/server-filesystem/dist/index.js \\
  ~/bogo-scratch`;

const POLICY = `# ~/.bogo/bogo.toml

[tools.fs__read_text_file]
policy = "allow"

[tools.fs__write_file]
policy = "approve"
justification = "required"
highlight = { path = "title", content = "text" }`;

const START = `bogo start
bogo tools`;

const AGENT = `bogo agent add 'Claude Code'
# prints the token once; BOGO stores only its SHA-256`;

const MCP = `{
  "mcpServers": {
    "bogo": { "command": "/Users/you/.local/bin/bogo-shim" }
  }
}`;

const RUN = `export BOGO_URL=http://127.0.0.1:8790/mcp
export BOGO_AGENT_TOKEN='bogo_agt_...'
claude --mcp-config mcp.json --strict-mcp-config --tools ''`;

const READ = `{"jsonrpc": "2.0", "id": 3, "method": "tools/call",
 "params": {"name": "fs__read_text_file",
            "arguments": {"path": "/Users/you/bogo-scratch/plan.md"}}}`;

const WRITE = `{"jsonrpc": "2.0", "id": 4, "method": "tools/call",
 "params": {"name": "fs__write_file",
            "arguments": {"path": "/Users/you/bogo-scratch/plan.md",
                          "content": "Ship v0.2 on Friday.",
                          "justification": "User asked me to update the plan"}}}`;

const DENIED = `{"jsonrpc": "2.0", "id": 4,
 "result": {"isError": true,
            "content": [{"type": "text", "text": "The owner denied this action."}]}}`;

const LOG = `bogo log search fs__write_file
bogo log verify`;

export default function Quickstart() {
  return (
    <>
      <h1>Quickstart</h1>
      <Lede>
        Put BOGO in front of an existing MCP server and make one of its tools require approval. This guide wraps the
        reference filesystem server, lets reads through, and gates <code>write_file</code> on your phone.
      </Lede>
      <p>
        You need BOGO installed with a paired phone (<code>bogo setup home</code>, <code>start</code> and{" "}
        <code>phone</code>), and Node.js for <code>npx</code>. Any stdio or Streamable HTTP MCP server works the same
        way.
      </p>

      <H2>Register the upstream</H2>
      <p>
        An upstream is an MCP server BOGO connects to on the agent&rsquo;s behalf. Everything after <code>--</code> is
        the command BOGO spawns over stdio. Use absolute paths, since the LaunchAgent does not inherit your shell&rsquo;s{" "}
        <code>PATH</code>, and stop the daemon while you change upstreams.
      </p>
      <CodeBlock code={ADD} lang="Terminal" />
      <p>
        This adds an <code>[upstreams.fs]</code> table to <code>bogo.toml</code>. BOGO discovers the server&rsquo;s
        tools when it starts and exposes them under the upstream&rsquo;s name, so <code>write_file</code> becomes{" "}
        <code>fs__write_file</code> to every agent. Upstream names
        allow <code>a-z</code>, <code>0-9</code> and <code>-</code>, so the <code>__</code> separator is unambiguous.
      </p>
      <p>
        A remote Streamable HTTP server takes <code>--url</code> in place of a command. Its headers can reference
        entries in <code>secrets.toml</code>, so tokens never appear in <code>bogo.toml</code>. The secret holds the
        full header value, including any <code>Bearer</code> prefix.
      </p>
      <CodeBlock
        code={`[upstreams.github]\nurl = "https://api.githubcopilot.com/mcp/"\nheaders = { Authorization = { secret = "github_auth" } }`}
        lang="bogo.toml"
      />

      <H2>Choose the gated tool</H2>
      <p>
        Every tool without an entry falls back to <code>defaults.policy</code>, which is <code>approve</code>. To make
        the boundary explicit, allow the read and protect the write.
      </p>
      <CodeBlock code={POLICY} lang="bogo.toml" />
      <ul>
        <li>
          <code>justification = &quot;required&quot;</code> rejects a call that arrives without a reason. The reason is
          signed with the request and stripped before the call is forwarded upstream.
        </li>
        <li>
          <code>highlight</code> controls presentation on the Review card only. Here the path becomes the title and the
          file content is shown as text. It never affects authorization.
        </li>
      </ul>
      <CodeBlock code={START} lang="Terminal" />
      <p>
        <code>bogo tools</code> prints each tool with its effective policy, any per agent overrides, and warnings about
        schemas BOGO considers risky.
      </p>

      <H2>Connect an agent</H2>
      <p>Each agent gets its own identity. The token authenticates the agent and grants no approval authority.</p>
      <CodeBlock code={AGENT} lang="Terminal" />
      <p>
        Point the client at <code>bogo-shim</code>, a stdio server that relays MCP to the daemon and ends the session
        when the client process exits. Keep the token in the environment, out of the config file.
      </p>
      <CodeBlock code={MCP} lang="mcp.json" />
      <CodeBlock code={RUN} lang="Terminal" />
      <p>
        <code>--tools &apos;&apos;</code> turns off Claude Code&rsquo;s built in tools so that BOGO is its only way to
        act. <code>bogo setup agent</code> does all of this for you, with the token in a 0600 file. See{" "}
        <Link href="/bogo/agents">Clients</Link> for other MCP clients.
      </p>

      <H2>Call the tools</H2>
      <p>Ask the agent to read a file and then edit it. The read is allowed and returns at once.</p>
      <CodeBlock code={READ} lang="JSON-RPC" copy={false} />
      <p>
        The write matches an <code>approve</code> policy, so BOGO holds the call open, seals the request to your phone,
        and waits.
      </p>
      <CodeBlock code={WRITE} lang="JSON-RPC" copy={false} />
      <ReviewCard
        title="/Users/you/bogo-scratch/plan.md"
        meta="Claude Code · 9:41 AM"
        body="Ship v0.2 on Friday."
        reason="User asked me to update the plan"
        sender="Sent by claude-code · session 8c41e0a2"
        caption="Where each part of the card comes from"
        fields={[
          ["Title", <><code key="a">arguments.path</code>, via <code key="b">highlight = title</code></>],
          ["Text block", <><code key="a">arguments.content</code>, via <code key="b">highlight = text</code></>],
          ["Reason", <><code key="a">justification</code>, signed and shown as unverified</>],
          ["Sender", "Agent name and MCP session from the request"],
          ["All details", "Every argument as it will be sent"],
          ["Slider", <>Disabled for <code key="a">approve_arm_delay</code>, then Face ID signs the request bytes</>],
        ]}
      />
      <p>
        On approval, the daemon verifies the signature, confirms the session is still open and the approval is unused,
        and forwards the call to the filesystem server once. The agent receives the server&rsquo;s real result.
      </p>
      <p>On denial, nothing is sent upstream and the agent receives a tool error.</p>
      <CodeBlock code={DENIED} lang="JSON-RPC" copy={false} />
      <Note kind="tip">
        <p>
          If the agent exits while a request is waiting, the shim closes the session and the request ends. An approval
          that arrives after that is refused.
        </p>
      </Note>

      <H2>Inspect the log</H2>
      <CodeBlock code={LOG} lang="Terminal" />
      <p>
        <code>search</code> shows the agent, tool, arguments and decision for each matching request.{" "}
        <code>verify</code> walks the hash chain and re checks the canonical bytes, signatures and thresholds of every
        recorded approval.
      </p>

      <H2>No iPhone yet</H2>
      <p>
        A test build of BOGO includes a software approver that signs on the Mac, so you can run this flow without a
        phone. It has no Face ID and anyone with your Mac account can use it.{" "}
        <a href={`${BLOB}/docs/build-from-source.md`}>Build from source</a> walks through exactly this example with it.
      </p>
    </>
  );
}
