import type { Metadata } from "next";
import CodeBlock from "@/components/bogo/CodeBlock";
import { H2, Lede, Note, Table } from "@/components/bogo/Doc";

export const metadata: Metadata = { title: "Policies" };

const SKELETON = `version = 1

[server]
port = 8790

[defaults]
max_pending = 4`;

const UPSTREAMS = `[upstreams.files]
command = "/absolute/path/to/node"
args = ["/absolute/path/to/server-filesystem/dist/index.js", "/Users/you/Notes"]

[upstreams.remote]
url = "https://mcp.example.com/mcp"
headers = { Authorization = { secret = "remote_authorization" } }`;

const TOOLS = `[tools.files__read_file]
policy = "allow"

[tools.gmail__send_gmail_message]
policy = "approve"
justification = "required"
expiry = "10m"
highlight = { subject = "title", to = "subtitle" }

[tools.files__move_file]
policy = "deny"`;

const SELECT = `[tools.billing__run_action]
policy = "approve"
select = "name"

[tools."billing__run_action[name=list_invoices]"]
policy = "allow"`;

const AGENT = `[agents."Trip planner".tools.files__write_file]
policy = "deny"`;

export default function Policies() {
  return (
    <>
      <h1>Policies</h1>
      <Lede>
        Policies live in <code>~/.bogo/bogo.toml</code>, with credentials in <code>secrets.toml</code> (mode 0600). The
        parser is strict. Unknown keys, wrong types and unsafe values are refused at load, and changes apply on restart.
      </Lede>

      <H2>Evaluation</H2>
      <Table
        head={["Policy", "Effect"]}
        rows={[
          [<code key="a">allow</code>, "Forwarded immediately. Must be set explicitly per tool, action or agent."],
          [<code key="b">approve</code>, "Held until enough approvers sign. The default for every unlisted tool."],
          [<code key="c">deny</code>, "Never forwarded. Hidden from tools/list unless hide_denied = false."],
        ]}
      />
      <p>
        For each call, BOGO resolves the policy key (the tool, or <code>tool[arg=value]</code> when the tool has{" "}
        <code>select</code>), applies any override for the calling agent, and falls back to{" "}
        <code>defaults.policy</code>. The effective policy is evaluated again at dispatch, so tightening a policy affects
        requests that are already waiting.
      </p>

      <H2>The smallest file</H2>
      <CodeBlock code={SKELETON} lang="bogo.toml" />
      <p>
        <code>max_pending</code> is how many live requests one agent may have at a time. It has no default on purpose,
        and setup asks you for it.
      </p>

      <H2>Upstreams</H2>
      <p>
        An upstream is an MCP server behind BOGO. Give it either a local <code>command</code> or a remote{" "}
        <code>url</code>. Names use lower case letters, digits and hyphens, and its tools appear to agents as{" "}
        <code>NAME__TOOL</code>.
      </p>
      <CodeBlock code={UPSTREAMS} lang="bogo.toml" />
      <p>
        <code>{"{ secret = \"NAME\" }"}</code> points at an entry in <code>secrets.toml</code>, so the key itself never
        sits in <code>bogo.toml</code>. Never give a files server your whole home folder or BOGO&rsquo;s home.
      </p>

      <H2>Tool policies</H2>
      <CodeBlock code={TOOLS} lang="bogo.toml" />
      <Table
        head={["Key", "What it does"]}
        rows={[
          [<code key="1">policy</code>, "allow, approve or deny. A tool you do not list needs approval."],
          [<code key="2">justification</code>, "Set it to required to make the agent give a reason for every protected call."],
          [<code key="3">expiry</code>, "How long a request may wait, such as 10m. Without it, a request lasts as long as the agent's session."],
          [<code key="4">highlight</code>, "Which arguments the Review card shows large, as the title, the recipient, a price or a picture. It changes only how the call looks."],
          [<code key="5">require</code>, "How many of your approvers must agree, such as { k = 2 }."],
          [<code key="6">filter_output</code>, "Fields to strip from a tool's result before the agent sees it."],
        ]}
      />
      <p>
        <code>defaults.policy</code> can be <code>approve</code> or <code>deny</code>, never <code>allow</code>. To open
        a tool you name it.
      </p>

      <H2>One action of a tool</H2>
      <p>
        Some servers put many actions behind one tool and name the action in an argument. <code>select</code> lets you
        give single values their own policy.
      </p>
      <CodeBlock code={SELECT} lang="bogo.toml" />
      <Note>
        <p>
          Keep the strict policy on the tool and open single values, as above. Never do the reverse. The agent picks the
          argument, so any spelling your entry does not match would get the open policy.
        </p>
      </Note>

      <H2>One agent</H2>
      <p>You can open or close a tool for one named agent without touching the others.</p>
      <CodeBlock code={AGENT} lang="bogo.toml" />

      <H2>See what agents get</H2>
      <CodeBlock code="bogo tools" lang="Terminal" />
      <p>
        Every key and every refused value is in the{" "}
        <a href="https://github.com/JohanSardar/bogo/blob/main/docs/configuration.md">configuration reference</a>.
      </p>
    </>
  );
}
