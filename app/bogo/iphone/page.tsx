import type { Metadata } from "next";
import CodeBlock from "@/components/bogo/CodeBlock";
import { H2, Lede, Note, Table } from "@/components/bogo/Doc";
import ReviewCard from "@/components/bogo/ReviewCard";
import { BLOB, TESTFLIGHT } from "@/lib/bogo-docs";

export const metadata: Metadata = { title: "iPhone approver" };

const TOML = `[approvers.iphone]
app_id = "AX3C2B78YD.com.johansardar.applebridge.ios"
app_attest = ["production", "development"]
approve_arm_delay = "2s"`;

export default function IPhone() {
  return (
    <>
      <h1>iPhone approver</h1>
      <Lede>
        The approver is the BOGO tab of the Apple Bridge iPhone app. It decrypts requests from your Mac, renders them
        from the bytes it will sign, and signs with a Face ID gated Secure Enclave key.
      </Lede>

      <H2>The Review card</H2>
      <ReviewCard
        title="Q3 contract, signed copy"
        meta="Mail agent · 9:40 AM"
        sub="To dana.okafor@northwind.co"
        body="Hi Dana, attached is the signed copy of the Q3 contract. Let me know if your team needs anything else before Friday."
        reason="Sending the signed contract the user asked me to forward to Dana."
        sender="Sent by claude-code · session 8c41e0a2"
        caption="gmail__send_gmail_message under the Gmail recipe"
        fields={[
          ["Title", "The subject, from the recipe's highlight table"],
          ["Subtitle", "The recipient"],
          ["Text block", "The message body"],
          ["Price", <>A money highlight such as <code key="a">usd_cents</code>, when the tool has one</>],
          ["Picture", <>An <code key="a">image</code> highlight with an HTTPS URL</>],
          ["All details", "The full argument tree"],
        ]}
      />
      <ul>
        <li>
          What will run and the agent&rsquo;s reason are separate sections. The reason is marked &ldquo;Not verified by
          BOGO&rdquo;.
        </li>
        <li>
          The slider stays disabled for <code>approve_arm_delay</code> after the card opens, so a stray swipe cannot
          approve.
        </li>
        <li>
          A denial can carry a note, which BOGO appends to the agent&rsquo;s tool error. The phone can also pause an
          agent, which rejects its calls until you unpause it.
        </li>
      </ul>

      <H2>Keys and attestation</H2>
      <Table
        head={["Property", "Implementation"]}
        rows={[
          ["Signing key", "P-256 in the Secure Enclave, non exportable, access control biometryCurrentSet. No passcode fallback on the approval path."],
          ["Enrollment change", "Adding or removing a face invalidates the key. The phone must be paired again."],
          ["App identity", "App Attest at registration proves the key came from the genuine build on real hardware. BOGO checks the App ID and environment."],
          ["Transport", "HPKE sealed messages through the relay. The phone only renders requests that decrypt from a Mac it paired with."],
        ]}
      />
      <Note kind="note">
        <p>
          App Attest proves the app, not the key&rsquo;s access flags directly. The Face ID guarantee rests on that build
          creating its own key, which is assumption A7 on the proofs page. None of this has been qualified on physical
          hardware yet.
        </p>
      </Note>

      <H2>Pairing</H2>
      <CodeBlock code="bogo approver add 'My iPhone'" lang="Terminal" />
      <p>
        The Mac advertises itself over Bonjour on the local network. On the phone, open BOGO, then Macs, then Add Mac.
        From another network, choose Use a code and scan the QR code the terminal prints, or type its{" "}
        <code>bogo1-</code> code.
      </p>
      <p>
        Both sides join a relay room named by a hash of the code&rsquo;s secret, run an X25519 exchange, and derive a 6
        digit comparison code from the transcript. You compare it on both screens, answer <code>y</code> in the
        terminal and confirm with Face ID on the phone. A mismatch on either side registers nothing.
      </p>
      <Note kind="warning">
        <p>
          The comparison is what stops someone on your network from pairing in your place. Do it yourself and never let
          an agent answer the terminal prompt.
        </p>
      </Note>

      <H2>Configuration</H2>
      <CodeBlock code={TOML} lang="bogo.toml" />
      <ul>
        <li>
          <code>app_attest</code> lists the accepted App Attest environments. <code>production</code> covers TestFlight
          and the App Store. <code>development</code> covers builds run from Xcode.
        </li>
        <li>
          <code>approve_arm_delay</code> has no default. <code>bogo setup</code> asks for it.
        </li>
        <li>
          No <code>[apns]</code> section is needed, because the relay sends the wake up push.
        </li>
      </ul>

      <H2>Getting the app</H2>
      <p>
        The app is distributed through <a href={TESTFLIGHT}>TestFlight</a> once Beta App Review passes. Until then,
        build it from <a href="https://github.com/JohanSardar/apple-bridge-iphone#build-and-check">source</a>.{" "}
        <code>make simulator</code> builds for the iOS Simulator without a developer account. The Simulator has no App
        Attest, so it pairs only with a Mac build that has the <code>test-registration</code> feature.
      </p>
      <p>
        The BOGO tab asks only for Face ID, notifications, local network access and the camera for scanning codes. It
        uses none of Apple Bridge&rsquo;s servers or keys. Troubleshooting is in{" "}
        <a href={`${BLOB}/docs/add-your-iphone.md#when-something-goes-wrong`}>add your iPhone</a>.
      </p>
    </>
  );
}
