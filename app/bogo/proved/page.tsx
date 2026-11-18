import type { Metadata } from "next";
import CodeBlock from "@/components/bogo/CodeBlock";
import { H2, Lede, Table } from "@/components/bogo/Doc";

export const metadata: Metadata = { title: "Proofs" };

const AXIOMS = `export PATH="$HOME/.elan/bin:$PATH"
(cd lean && lake build BogoProofs)
(cd lean && lake env lean BogoProofs/Axioms.lean)`;

export default function Proved() {
  return (
    <>
      <h1>Proofs</h1>
      <Lede>
        BOGO&rsquo;s decision core is a Lean 4 state machine compiled into the daemon through C, not a model that Rust
        reimplements. Its safety properties are proved over arbitrary input traces. The Rust shell, crypto libraries,
        phone and sandbox are outside the proof and appear below as explicit assumptions.
      </Lede>
      <p>
        Theorems quantify over every input trace from an empty boot, including reordering, duplicates, forged messages,
        owner policy changes and arbitrary clock values. Each forward is judged against the state immediately before
        that step. A forward is permission to send one upstream call, not proof that the provider executed it.
      </p>

      <H2>The theorems</H2>
      <Table
        head={["Property", "Statement", "Theorem"]}
        rows={[
          ["Approved or allowed", "A call goes out only if its tool is allowed, or it is the exact stored request with enough approvals from registered approvers.", <code key="1">approved</code>],
          ["Exact", "A protected call sends the upstream, tool and arguments of the request that was signed, and nothing else.", <code key="2">exact</code>],
          ["Single use", "One approval sends one call. The same request cannot go out twice.", <code key="3">single_use</code>],
          ["Fresh", "A call goes out only while its session is open, its agent is active and it has not expired.", <code key="4">fresh</code>],
          ["Fail closed", "If any required condition is missing, nothing goes out.", <code key="5">fail_closed</code>],
          ["Safe default", "A tool you did not explicitly allow is never treated as allowed.", <code key="6">safe_default</code>],
          ["Flood limit", "An agent cannot ask for more approvals than the limit you set.", <code key="7">flood_limit</code>],
          ["Revocation sticks", "A revoked approver or agent cannot come back in the same run.", <code key="8">revoked_approver_gone</code>],
        ]}
      />
      <p>
        The encoding is proved too. Each request has exactly one byte form, two different requests never share bytes,
        and malformed input never asks or forwards anything.
      </p>

      <H2>Check it yourself</H2>
      <CodeBlock code={AXIOMS} lang="Terminal" />
      <p>
        The build fails if the list of axioms a theorem depends on changes, including any use of <code>sorry</code>.
        Apart from Lean&rsquo;s three standard axioms, the only project axiom is A1, the signature assumption below.
      </p>

      <H2>What is assumed</H2>
      <Table
        head={["Assumption", "What is trusted", "If it fails"]}
        rows={[
          ["A1 Signatures", "A valid signature means that approver approved exactly those bytes after Face ID.", "A counted signature may not mean you approved. A software approver does not meet this."],
          ["A2 Hashes", "SHA-256 is collision resistant.", "Signatures or the audit chain could be forged."],
          ["A3 Boots", "Each start of BOGO gets a fresh random ID.", "Old approvals could be replayed after a restart."],
          ["A4 Isolation", "The agent can reach your tools only through BOGO.", "The agent goes around BOGO. An agent with a shell on your Mac does not meet this."],
          ["A5 Providers", "Services reject calls without valid credentials.", "Calling the service directly may work."],
          ["A6 The shell", "The Rust code, the compiler and the libraries do what they should.", "What is sent could differ from what was proved."],
          ["A7 The app", "App Attest identifies the real app on real hardware, and that app keeps its key in the Secure Enclave.", "A key without Face ID could be registered."],
          ["A8 The owner", "Only you change policies and approvers.", "Anyone with your Mac account can change them."],
          ["A9 The clock", "The clock only moves forward, including through sleep.", "An expired request could look fresh."],
          ["A10 Storage", "What BOGO writes to disk survives a crash.", "Revocations and outcomes could be lost."],
        ]}
      />
      <p>
        Human judgment is not proved. Approving a harmful call that was shown accurately is still an approval. Push
        delivery, uptime and what a provider does with a call are not proved either.
      </p>
      <p>
        The full statements are in{" "}
        <a href="https://github.com/JohanSardar/bogo/blob/main/docs/proved-and-assumed.md">What is proved and what is
        assumed</a>.
      </p>
    </>
  );
}
