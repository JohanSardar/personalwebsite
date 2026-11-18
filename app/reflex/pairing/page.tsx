import type { Metadata } from "next";
import Link from "next/link";
import Block from "@/components/docs/Block";
import DocPage from "@/components/docs/DocPage";
import { NPX } from "@/lib/docs";

export const metadata: Metadata = { title: "Pairing and Approvals" };

export default function Pairing() {
  return (
    <DocPage slug="pairing" lede="Pairing joins your iPad to your Mac. Approval decides which agents get your Sends. One code does both the first time.">
      <h2>The code</h2>
      <p>Your agent gives you a six-digit code when you ask it to connect your iPad. You type it in the Connection sheet on the iPad.</p>
      <ul className="dots">
        <li>It works once.</li>
        <li>It expires after ten minutes.</li>
        <li>It stops working after five wrong tries.</li>
      </ul>
      <p>If a code fails or runs out, ask your agent to connect again and use the new one. Share a code only with the iPad you mean to connect.</p>

      <h2>What the code approves</h2>
      <p>Typing the code pairs the two devices and approves the agent that gave it to you. Pairing by itself never approves any other agent.</p>
      <p>A second agent that asks later needs you to allow it on the iPad.</p>

      <h2>The Connection sheet</h2>
      <p>The button at the top right of a board shows the Mac’s name and whether it is connected. Tap it to open the Connection sheet.</p>
      <ul className="dots">
        <li>The Mac you paired, and how it is connected.</li>
        <li>Each agent, and whether it is allowed.</li>
        <li>A field to pair again or pair another Mac.</li>
      </ul>
      <p>Swipe an agent to rename it or revoke it. A revoked agent stops receiving Sends.</p>

      <h2>Check from the Mac</h2>
      <p>You can list the approved agents from a terminal.</p>
      <Block tabs={[{ name: "Terminal", text: `${NPX} link agents` }]} />
      <p>
        To revoke one, run <code>link revoke</code> followed by its ID from that list. Revoking stops future Sends. It cannot take back what the agent already received.
      </p>

      <h2>After you reinstall</h2>
      <p>If you delete Reflex from the iPad and install it again, pair it again with a new code.</p>
      <p>
        Pairing can also happen away from home through the relay. <Link href="/reflex/relay">Relay</Link> explains how the code stays private there.
      </p>
    </DocPage>
  );
}
