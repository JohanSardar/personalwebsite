import type { Metadata } from "next";
import CodeBlock from "@/components/bogo/CodeBlock";
import { H2, Lede, Note, Table } from "@/components/bogo/Doc";
import { BLOB } from "@/lib/bogo-docs";

export const metadata: Metadata = { title: "Relay" };

const SELF = `[relay]
url = "https://relay.example.com"`;

const DOCKER = `curl -fsSLO https://raw.githubusercontent.com/JohanSardar/bogo/main/deploy/relay/compose.yaml
DOMAIN=relay.example.com docker compose up -d`;

export default function Relay() {
  return (
    <>
      <h1>Relay</h1>
      <Lede>
        The relay is a store and forward mailbox between your Mac and your phone. It carries only end to end encrypted
        envelopes and holds no key that can read a request or produce an approval.
      </Lede>
      <p>
        Every install uses the public relay at <code>https://bogo.eilmer.si:8443</code> unless you configure your own.
      </p>

      <H2>Cryptography</H2>
      <Table
        head={["Layer", "Construction"]}
        rows={[
          ["Envelopes", "HPKE auth mode, DHKEM(X25519, HKDF-SHA256), HKDF-SHA256, ChaCha20-Poly1305. A fresh ephemeral key per seal, with the BOGO ID and approver ID bound in the info string."],
          ["Mailboxes", "Addressed by SHA-256 of an Ed25519 key. Clients authenticate with a signed challenge bound to the relay's host and port, then use a one hour bearer token."],
          ["Delivery", "Senders must be on the recipient's allowlist. Messages stay until the recipient acks them, and every message is idempotent on both ends."],
          ["Pairing", "An unlisted room named by a hash of the pairing code's secret, sealed with a key derived from it."],
        ]}
      />

      <H2>Pushes</H2>
      <p>
        When a request is stored for a phone, the relay sends one APNs push with a fixed body, &ldquo;Approval
        requested&rdquo;. It carries no Mac name, tool, agent, amount or request ID. The phone then fetches and
        decrypts the envelope itself. Pushes are capped at 30 per device token per minute, and resends of one message
        never push twice.
      </p>
      <p>
        The push is only a wake up. If it never arrives, the request still waits in the mailbox and appears when you
        open the app.
      </p>

      <H2>What the relay can and cannot do</H2>
      <Table
        head={["Can", "Cannot"]}
        rows={[
          ["See mailbox addresses, timing and ciphertext sizes", "Read requests, decisions or pairing messages"],
          ["Drop, delay, repeat or reorder messages", "Forge an approval or make one count twice"],
          ["Refuse service", "Change what a signature covers"],
        ]}
      />
      <Note kind="warning">
        <p>
          The public relay holds the app&rsquo;s APNs key. If its host were compromised, an attacker could send generic
          pushes to the app&rsquo;s users and change where the short install URL redirects. It shares a VM with an
          unrelated website. Install from the GitHub URL, which does not go through the relay.
        </p>
      </Note>

      <H2>Run your own</H2>
      <CodeBlock code={DOCKER} lang="Terminal" />
      <CodeBlock code={SELF} lang="bogo.toml" />
      <p>
        Restart the daemon after changing it. The phone needs no setting, because the pairing advert names the relay.
        Phones paired through another relay have to be paired again.
      </p>
      <p>
        Only the app publisher&rsquo;s APNs key can wake the TestFlight app. With your own relay, either give the Mac
        that key in <code>[apns]</code>, run without pushes, or build the app with your own key. Details are in{" "}
        <a href={`${BLOB}/docs/self-hosting-relay.md`}>self hosting</a> and the full wire format is in the{" "}
        <a href={`${BLOB}/docs/RELAY-PROTOCOL.md`}>relay protocol</a>.
      </p>
    </>
  );
}
