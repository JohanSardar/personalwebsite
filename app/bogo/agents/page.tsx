import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/bogo/CodeBlock";
import { H2, Lede, Note } from "@/components/bogo/Doc";

export const metadata: Metadata = { title: "Clients" };

const CC_JSON = `{"mcpServers": {"bogo": {"command": "/absolute/path/to/bogo-shim"}}}`;
const CC_RUN = `export BOGO_URL=http://127.0.0.1:8790/mcp
export BOGO_AGENT_TOKEN='bogo_agt_...'
claude --mcp-config /path/to/mcp.json --strict-mcp-config`;
const CODEX = `[mcp_servers.bogo]
command = "/absolute/path/to/bogo-shim"
env = { BOGO_URL = "http://127.0.0.1:8790/mcp", BOGO_AGENT_TOKEN = "bogo_agt_..." }`;
const HTTP = `{"url": "http://127.0.0.1:8790/mcp", "headers": {"Authorization": "Bearer bogo_agt_..."}}`;

export default function Agents() {
  return (
    <>
      <h1>Clients</h1>
      <Lede>
        Any MCP client can sit in front of BOGO. Each agent gets its own identity and token, which BOGO uses to attribute
        calls and apply per agent overrides. <code>bogo setup agent</code> automates this for Claude Code, Claude Desktop
        and Cursor.
      </Lede>

      <H2>Add an agent</H2>
      <CodeBlock code="bogo agent add 'Trip planner'" lang="Terminal" />
      <p>
        This prints the agent&rsquo;s token once, and BOGO keeps only its hash. Put the token where only that
        agent&rsquo;s MCP client can read it, and never in a project the agent can edit.
      </p>

      <H2>Two ways in</H2>
      <ul>
        <li>
          <strong>The shim, which is the one to use.</strong> The client starts <code>bogo-shim</code> as a stdio MCP
          server. The shim passes each message to BOGO unchanged and ties the session to the client process, so if the
          client dies, BOGO ends the session and its waiting requests at once.
        </li>
        <li>
          <strong>HTTP.</strong> The client connects to BOGO&rsquo;s MCP URL with a bearer token. Use it only for
          clients that keep their HTTP session open reliably.
        </li>
      </ul>

      <H2>Claude Code</H2>
      <p>This is the client BOGO has been tested with. Write a config with only the command.</p>
      <CodeBlock code={CC_JSON} lang="mcp.json" />
      <p>Then give Claude the two variables through its environment, so the token stays out of the file.</p>
      <CodeBlock code={CC_RUN} lang="Terminal" />
      <p>
        <code>--strict-mcp-config</code> makes BOGO the only MCP server for that run. Claude&rsquo;s built in tools,
        such as Bash, can still act without BOGO. Turn them off with <code>--tools &apos;&apos;</code>, or run Claude in
        the reference sandbox.
      </p>

      <H2>Codex and other stdio clients</H2>
      <p>
        Run <code>bogo-shim</code> as the server command, with <code>BOGO_URL</code> and <code>BOGO_AGENT_TOKEN</code>{" "}
        in its environment. In Codex&rsquo;s <code>config.toml</code> that looks like this.
      </p>
      <CodeBlock code={CODEX} lang="config.toml" />
      <Note>
        <p>
          These configs follow each client&rsquo;s documented format but have not been tried with BOGO yet. A token
          written into a config file can be read by anything that can read that file, so keep it outside any project
          the agent works in.
        </p>
      </Note>

      <H2>HTTP clients</H2>
      <CodeBlock code={HTTP} lang="JSON" />

      <H2>After connecting</H2>
      <ul>
        <li>
          <code>bogo tools</code> lists every tool BOGO offers and its policy.
        </li>
        <li>
          Every tool you have not listed needs approval. Change that in <Link href="/bogo/policies">bogo.toml</Link> and
          restart BOGO.
        </li>
        <li>
          <code>bogo agent pause &apos;Trip planner&apos;</code> rejects all of that agent&rsquo;s calls until you
          unpause it, and <code>bogo agent revoke</code> removes it for good.
        </li>
      </ul>
    </>
  );
}
