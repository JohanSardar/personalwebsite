import type { Metadata } from "next";
import { H2, Lede } from "@/components/bogo/Doc";
import { REPO, TESTFLIGHT } from "@/lib/bogo-docs";

export const metadata: Metadata = { title: "Status" };

export default function Status() {
  return (
    <>
      <h1>Status</h1>
      <Lede>
        BOGO is early. This page says what has been run and recorded, and what has not, so you can decide how far to
        trust it. Last checked on 17 November 2026, at release 0.1.0.
      </Lede>
      <p>
        In short, the Mac side, the one line install and <code>bogo setup</code> work end to end with a software test
        approver. The iPhone app works in the Simulator. No session on a real iPhone has been recorded, and the
        TestFlight link does not admit testers yet. Each item links to its record in the{" "}
        <a href={`${REPO}/blob/main/docs/status.md`}>repo</a>.
      </p>

      <H2>Verified</H2>
      <ul>
        <li>
          <strong>The Mac side, end to end.</strong> The daemon, the CLI and the shim ran with a real filesystem MCP
          server and real Claude Code. A protected write waited, was approved with the software test approver, and
          ran once. <code>bogo log verify</code> passed.
        </li>
        <li>
          <strong>The one line install.</strong> Release 0.1.0 was built by CI and published on GitHub. The install
          script put <code>bogo 0.1.0</code> in place with no Gatekeeper prompt, and a corrupted download installed
          nothing.
        </li>
        <li>
          <strong>Setup and doctor.</strong> In a scratch home, setup made the home, started BOGO, added a software
          test approver, moved a Claude Code server behind BOGO and made the test call. Doctor reported every check
          ok, and <code>bogo setup --undo</code> put the client file back byte for byte.
        </li>
        <li>
          <strong>The Gmail and files recipes, without a Google account.</strong> Each installed its pinned server and
          wrote its policy. A Gmail search ran without approval, and a send waited and was denied.
        </li>
        <li>
          <strong>The iPhone route, with a software phone.</strong> Registration, encrypted messages, a local relay
          and outcome notices worked with a program standing in for the phone.
        </li>
        <li>
          <strong>The reference sandbox.</strong> The bypass suite made 145 attempts to get around BOGO from inside
          the sandbox, and all of them were stopped.
        </li>
        <li>
          <strong>The proofs.</strong> The Lean core and its proofs build, and <code>#print axioms</code> reports only
          the pinned axioms.
        </li>
        <li>
          <strong>The public relay.</strong> It runs at <code>bogo.eilmer.si:8443</code>, and two Macs exchanged
          encrypted messages through it in both directions. A local copy with a stand-in for Apple&rsquo;s push
          service sent exactly one push per request.
        </li>
        <li>
          <strong>The BOGO tab in the iOS Simulator.</strong> Registration, the Review card, All details, the slider
          and Face ID work against the app&rsquo;s built in stand-in Mac.
        </li>
      </ul>

      <H2>Not verified yet</H2>
      <ul>
        <li>
          <strong>A real iPhone.</strong> Face ID on hardware, a Secure Enclave key, App Attest on hardware and push
          delivery are all unverified.
        </li>
        <li>
          <strong>A full pairing through the public relay.</strong> A Simulator build found a test Mac and both showed
          the same 6 digits, then the phone failed to save its keys. The app has since been fixed, and the full run has
          not been recorded again.
        </li>
        <li>
          <strong>Installing the app without building it.</strong> The <a href={TESTFLIGHT}>TestFlight link</a> does
          not admit testers until the first build passes Apple&rsquo;s Beta App Review.
        </li>
        <li>
          <strong>Setup with a real phone and real clients.</strong> Its runs so far used a software test approver
          and test config files.
        </li>
        <li>
          <strong>Real accounts.</strong> No recipe has been run against a real Google, GitHub, Slack or Stripe
          account.
        </li>
        <li>
          <strong>Other MCP clients.</strong> Only Claude Code has been run against BOGO. The configs for other
          clients follow their documented formats.
        </li>
      </ul>
      <p>No independent human security audit has been done.</p>
    </>
  );
}
