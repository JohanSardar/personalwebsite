import type { Metadata } from "next";
import Link from "next/link";
import { H2, Lede, Note } from "@/components/bogo/Doc";

export const metadata: Metadata = { title: "Threat model" };

export default function ThreatModel() {
  return (
    <>
      <h1>Threat model</h1>
      <Lede>
        BOGO treats the agent as hostile. It may be prompt injected, lie, send malformed messages, replay signatures,
        change arguments or try another session. BOGO controls the MCP calls that pass through it, and this page says
        where that control ends.
      </Lede>

      <Note>
        <p>
          <strong>BOGO does not sandbox an agent by itself.</strong> An agent on your Mac with a shell, a browser or its
          own credentials can act without asking BOGO. Turn those tools off, or run the agent in the{" "}
          <a href="https://github.com/JohanSardar/bogo/blob/main/sandbox/README.md">reference sandbox</a>, where BOGO is
          its only way out.
        </p>
      </Note>

      <H2>What BOGO stops</H2>
      <ul>
        <li>A protected call running without your signed approval of those exact bytes.</li>
        <li>An approval being stretched to a changed argument, a second call or another session.</li>
        <li>Calls to denied or unknown tools. They fail closed.</li>
        <li>Requests from a paused or revoked agent, and approvals from a revoked phone.</li>
        <li>An agent flooding you with requests past the limit you set.</li>
      </ul>
      <p>
        The bypass suite made 145 attempts from inside the reference sandbox, covering direct network access, DNS,
        proxying, credential leaks, malformed MCP, forged and replayed approvals and session reuse. All were stopped.
      </p>

      <H2>The phone</H2>
      <p>
        A registered phone signs with a Secure Enclave key that cannot be exported and needs current Face ID, with no
        passcode fallback. App Attest checks that the real app made the key when you pair. These claims have not yet
        been checked on a real iPhone.
      </p>
      <p>
        The phone renders the request from the same bytes it signs. It keeps &ldquo;what will run&rdquo; apart from
        the agent&rsquo;s reason, which may be a lie.
      </p>

      <H2>The relay</H2>
      <p>
        The relay carries encrypted messages. It cannot read a request or forge an approval. It does see addresses,
        timing and message sizes, and it can drop or delay messages, which stops approvals but never forges one.
      </p>
      <p>
        Pairing happens in a private room named by a code your Mac shows only on its local network. Someone on that
        network could try to join first or pose as your Mac, and the 6 digits you compare on both screens catch each
        case.
      </p>
      <p>
        The public relay holds the push key for the app. Someone who took over the relay&rsquo;s server could send
        &ldquo;Approval requested&rdquo; pushes to any user and change where the short install link points. They still
        could not read requests or approve anything. The relay shares its server with an unrelated website. You can{" "}
        <a href="https://github.com/JohanSardar/bogo/blob/main/docs/self-hosting-relay.md">run your own relay</a>.
      </p>

      <H2>What it does not protect against</H2>
      <ul>
        <li>A compromised Mac, BOGO itself, or your Mac account. Anything running as you can change the policy.</li>
        <li>A compromised phone, broken Face ID, or a failure of the cryptography.</li>
        <li>A provider or MCP server that lies, ignores arguments or does more than the call asked.</li>
        <li>You approving a harmful call that was shown accurately.</li>
        <li>
          Effects already sent. If the connection fails after sending, the call may have run. BOGO records the outcome
          as unknown and never retries it.
        </li>
        <li>Missed pushes, downtime and every possible sandbox escape.</li>
      </ul>

      <H2>The audit log</H2>
      <p>
        <code>bogo log verify</code> checks the chain, the request bytes and every signature. It cannot tell if the whole
        log was replaced by a shorter valid one, so keep private exports if you need to compare later. Arguments are
        stored as plain text, so never put credentials in tool arguments.
      </p>
      <p>
        No independent human security audit has been done. The assumptions behind all of this are on{" "}
        <Link href="/bogo/proved">Proofs</Link>. Report a vulnerability through{" "}
        <a href="https://github.com/JohanSardar/bogo/security">private reporting</a>, never a public issue.
      </p>
    </>
  );
}
