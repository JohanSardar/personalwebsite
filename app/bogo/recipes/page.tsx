import type { Metadata } from "next";
import CodeBlock from "@/components/bogo/CodeBlock";
import { H2, Lede, Note, Table } from "@/components/bogo/Doc";

export const metadata: Metadata = { title: "Recipes" };

export default function Recipes() {
  return (
    <>
      <h1>Recipes</h1>
      <Lede>
        A recipe installs a known MCP server at a pinned version, stores its credentials in <code>secrets.toml</code>,
        and writes a policy that allows reads and gates writes, sends, payments and deletes.
      </Lede>
      <CodeBlock code="bogo upstream add gmail" lang="Terminal" />
      <p>
        <code>bogo upstream recipes</code> lists them. Recipes read secrets from a TTY with echo off, so run them yourself
        rather than through an agent.
      </p>

      <H2>The five recipes</H2>
      <Table
        head={["Recipe", "Runs without asking", "Waits for your phone"]}
        rows={[
          [<code key="g">gmail</code>, "Searching and reading mail, listing labels and filters", "Sending, drafting, attachments, changing labels or filters"],
          [<code key="h">github</code>, "Tools GitHub marks read only, once you confirm each", "Writing files, pull requests, issues, comments, merges"],
          [<code key="s">slack</code>, "What you confirm", "Posting messages"],
          [<code key="t">stripe</code>, "What you confirm", "Payment links, refunds, invoices and other writes"],
          [<code key="f">files</code>, "Reading and listing one folder", "Writing, editing, moving, making folders"],
        ]}
      />
      <Table
        head={["Recipe", "Server"]}
        rows={[
          ["gmail", <a key="g" href="https://github.com/taylorwilsdon/google_workspace_mcp">workspace-mcp 2.3.0</a>],
          ["github", <a key="h" href="https://github.com/github/github-mcp-server">github-mcp-server 2.0.3</a>],
          ["slack", <a key="s" href="https://github.com/korotovsky/slack-mcp-server">slack-mcp-server 1.3.0</a>],
          ["stripe", "Stripe's hosted server, with test mode keys only. It has no version to pin."],
          ["files", <a key="f" href="https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem">server-filesystem 2.3.0</a>],
        ]}
      />

      <H2>How every recipe works</H2>
      <ol>
        <li>It asks for everything first, with credentials hidden as you type. Nothing is installed if you stop here.</li>
        <li>
          It installs the server in <code>~/.local/share/bogo/upstreams/NAME</code>, outside BOGO&rsquo;s home. Python
          servers get their own environment made by uv, and release archives are checked against their published
          SHA-256.
        </li>
        <li>
          It starts the server once to list its tools. For any tool the recipe does not already cover, it suggests a
          policy from the server&rsquo;s own hints and you choose.
        </li>
        <li>
          It adds the server and its policies to <code>bogo.toml</code>, and the credentials to{" "}
          <code>secrets.toml</code>. If BOGO is running, it restarts BOGO to load them.
        </li>
      </ol>
      <p>
        Any tool a later version of a server adds needs approval until you choose otherwise.
      </p>

      <H2>Gmail</H2>
      <p>
        This is the recipe for an agent that reads your mail freely and asks before it sends anything. It needs{" "}
        <a href="https://docs.astral.sh/uv/">uv</a>, and you sign in to Google yourself, so BOGO never sees your
        Google password.
      </p>
      <ol>
        <li>
          In <a href="https://console.cloud.google.com">Google Cloud Console</a>, make a project and turn on the Gmail
          API.
        </li>
        <li>Under the OAuth consent screen, add yourself as a test user.</li>
        <li>
          Under Credentials, make an OAuth client ID of type <strong>Desktop app</strong>.
        </li>
        <li>
          Run <code>bogo upstream add gmail</code> and give it that client&rsquo;s ID and secret.
        </li>
        <li>
          Ask your agent to read your mail. The first call answers with a Google sign in link. Open it, sign in and
          allow Gmail.
        </li>
      </ol>
      <Table
        head={["Runs without asking", "Waits for your phone"]}
        rows={[
          [<code key="1">search_gmail_messages</code>, <code key="2">send_gmail_message</code>],
          [<code key="3">get_gmail_message_content</code>, <code key="4">draft_gmail_message</code>],
          [<code key="5">get_gmail_thread_content</code>, <code key="6">get_gmail_attachment_content</code>],
          [<code key="7">list_gmail_labels</code>, <code key="8">modify_gmail_message_labels</code>],
          [<code key="9">list_gmail_filters</code>, <code key="10">manage_gmail_filter</code>],
        ]}
      />
      <p>
        On the Review card, a mail being sent shows its subject as the title, the recipient under it and the body as
        text. The full list of tools is in the{" "}
        <a href="https://github.com/JohanSardar/bogo/blob/main/docs/recipes/gmail.md">Gmail recipe</a>.
      </p>

      <H2>Check that it works</H2>
      <ol>
        <li>
          <code>bogo doctor</code> shows <code>ok    upstream gmail starts</code>.
        </li>
        <li>
          <code>bogo tools</code> lists the tools as <code>gmail__TOOL</code> with their policies.
        </li>
        <li>Ask your agent to find your latest mail. It runs without asking.</li>
        <li>Ask it to draft a reply to yourself. Your phone shows the draft. Deny it, and nothing is drafted.</li>
      </ol>
      <Note>
        <p>
          The Gmail and files recipes have been run without a real account. A real Google sign in and the GitHub, Slack
          and Stripe recipes have not been tried against real accounts yet.
        </p>
      </Note>

      <H2>Remove a recipe</H2>
      <p>
        Delete its sections from <code>bogo.toml</code> and its credentials from <code>secrets.toml</code>, then delete
        its folder in <code>~/.local/share/bogo/upstreams</code>.
      </p>
    </>
  );
}
