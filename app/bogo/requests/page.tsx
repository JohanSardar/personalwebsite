import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "@/components/bogo/CodeBlock";
import { H2, Lede, Note, Table } from "@/components/bogo/Doc";
import { BLOB } from "@/lib/bogo-docs";

export const metadata: Metadata = { title: "Approval requests" };

const SIGNED = `message   = "BOGO-APPROVAL\\0v1" ‖ request_bytes
signature = ECDSA-P256(SHA-256(message))      # raw r ‖ s, 64 bytes`;

const THRESHOLD = `[tools.billing__create_refund]
policy = "approve"
approvers = ["Personal iPhone", "Ops iPhone"]
require = { k = 2 }
on_deny = "when_unreachable"
expiry = "15m"`;

export default function Requests() {
  return (
    <>
      <h1>Approval requests</h1>
      <Lede>
        When a call hits an <code>approve</code> policy, BOGO turns it into an approval request. The request is the unit
        that gets encoded, signed, counted and logged.
      </Lede>

      <H2>What a request contains</H2>
      <Table
        head={["Field", "Notes"]}
        rows={[
          ["Upstream and tool", "The destination, checked against the catalog again at dispatch."],
          ["Arguments", "The exact JSON value tree. Numbers keep their text, so 4700 and 4700.0 differ. Keys are sorted."],
          ["Justification", "The agent's reason. Signed, shown as unverified, and stripped before forwarding."],
          ["Display hints", "The highlight table in effect, so the presentation the owner saw is part of what they signed."],
          ["Agent and client", "The agent identity derived from its token, and the MCP client name."],
          ["Session", "The MCP session that made the call."],
          ["Nonce and times", "A fresh nonce, the creation time and the expiry if the tool has one."],
        ]}
      />
      <p>
        The request is encoded into a canonical byte string by the Lean core. Encoding is injective, and decoding
        accepts only canonical bytes, so two different requests can never share a signature and a non canonical
        spelling of the same request is rejected.
      </p>

      <H2>What is signed</H2>
      <CodeBlock code={SIGNED} copy={false} />
      <p>
        The phone signs with a P-256 key held in the Secure Enclave, after Face ID. The Mac verifies against the public
        key registered for that approver. A signature therefore commits to every field above, including the session and
        nonce.
      </p>

      <H2>Lifecycle</H2>
      <ol>
        <li>
          <strong>Admitted.</strong> The agent is active, the policy is <code>approve</code>, a required justification is
          present, and the agent has fewer than <code>max_pending</code> live requests.
        </li>
        <li>
          <strong>Asked.</strong> The request is sealed to each eligible approver. Every resend reuses the same message ID
          and ciphertext.
        </li>
        <li>
          <strong>Settled.</strong> Enough distinct approvers signed, or a denial ended it. Further decisions are
          ignored and logged.
        </li>
        <li>
          <strong>Dispatched.</strong> At the moment of sending, the core re checks the call, session, agent, policy,
          catalog entry, signatures and expiry, then forwards once.
        </li>
      </ol>
      <p>
        A request ends without running when its call or session ends, the owner cancels it, it expires, or its agent or
        a needed approver is revoked. There is no default expiry. The session is the default lifetime.
      </p>

      <H2>What the agent receives</H2>
      <Table
        head={["Outcome", "Tool result text"]}
        rows={[
          ["Approved and sent", "The upstream's real result."],
          ["Denied", "The owner denied this action."],
          ["Ended undecided", "Approval was not received in time; the action was not performed."],
          ["Policy deny", "This tool is denied by policy."],
          ["Missing reason", "A justification is required for this tool."],
          ["Limit reached", "The pending request limit was reached."],
          ["Upstream down", "The upstream was unavailable; the action was not performed."],
          ["Lost after send", "The upstream connection failed after the call was sent; the action may or may not have happened. BOGO will not retry it."],
        ]}
      />
      <p>
        Every non success outcome is an MCP tool error with <code>isError: true</code>, so agents handle it like any
        other failed tool call.
      </p>

      <H2>Wait or retry</H2>
      <p>
        With <code>mode = &quot;wait&quot;</code>, the default, the <code>tools/call</code> stays open until the request
        settles. Clients with short tool timeouts can use <code>mode = &quot;pending_retry&quot;</code>. The first call
        returns a pending error, and the agent retries the identical call (same arguments and justification) in the
        same session. The first retry after approval runs it. Retry needs the shim, because it depends on a stable
        session.
      </p>

      <H2>Several approvers</H2>
      <p>
        By default any one registered approver can approve. A tool can require k distinct approvers from a named set.
      </p>
      <CodeBlock code={THRESHOLD} lang="bogo.toml" />
      <p>
        With <code>on_deny = &quot;any&quot;</code>, the default, one denial ends the request.{" "}
        <code>when_unreachable</code> ends it only once the remaining approvers can no longer reach k.
      </p>
      <Note kind="warning">
        <p>
          In any one mode, the weakest eligible approver sets the security of the tool. Never register a software
          approver alongside a phone for real actions.
        </p>
      </Note>
      <p>
        The formal statements of these guarantees are on <Link href="/bogo/proved">Proofs</Link>. The wire format is in
        the <a href={`${BLOB}/docs/RELAY-PROTOCOL.md`}>relay protocol</a>.
      </p>
    </>
  );
}
