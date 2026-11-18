import type { Metadata } from "next";
import Link from "next/link";
import DocPage from "@/components/docs/DocPage";
import { REPO } from "@/lib/docs";

export const metadata: Metadata = { title: "Privacy and Security" };

export default function Privacy() {
  return (
    <DocPage slug="privacy" lede="What leaves your iPad, who can read it, and what Reflex does not protect.">
      <p className="note">Reflex is beta software and has not had an independent security audit. This page describes how it is built. It is not a guarantee.</p>

      <h2>What leaves the iPad</h2>
      <p>Drawing and Pencil movement stay on the iPad. A Send leaves only when you tap Send or let go of the mic.</p>
      <p>A Send holds your new strokes, where they sit on the board, handwriting hints, your spoken words and images of the visible board with a margin around it. Speech recognition runs on the iPad.</p>

      <h2>Who can read a Send</h2>
      <div className="table-scroll">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Who</th>
              <th>What they can read</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Your iPad and Mac</td>
              <td>Everything. They hold the keys to their encrypted connection.</td>
            </tr>
            <tr>
              <td>Approved agents</td>
              <td>Every Send. Approval is access to your Sends.</td>
            </tr>
            <tr>
              <td>Your agent’s provider</td>
              <td>Whatever the agent receives, under that provider’s own data policy.</td>
            </tr>
            <tr>
              <td>The relay</td>
              <td>No content. It sees IP addresses, connection times, traffic volume and public device keys.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Encryption between your devices does not stop the agent or its provider from reading what you send them.</p>

      <h2>How the connection is protected</h2>
      <ul className="dots">
        <li>Each device has its own key. The Mac accepts only the device key it paired with.</li>
        <li>Everything between the iPad and the Mac is encrypted with keys only those two devices have.</li>
        <li>A changed, repeated or made-up message fails its check and the device refuses it.</li>
        <li>The same protection applies on Wi-Fi, nearby and through the relay.</li>
      </ul>

      <h2>What is stored</h2>
      <p>Boards live in the iPad app’s local data. Sends that have not been delivered wait there too.</p>
      <p>
        On the Mac, the Link keeps its files in <code>~/.reflex/link/</code>. That folder holds the device keys, received Sends, images and logs. Reflex does not encrypt those files on disk, so protect your Mac account, your disk and your backups. Never attach that folder to a bug report.
      </p>

      <h2>Taking access away</h2>
      <p>
        Revoke an agent from the Connection sheet on the iPad or from the Mac. <Link href="/reflex/pairing">Pairing and Approvals</Link> shows both. Revoking stops future Sends. It cannot recall what was already delivered.
      </p>

      <h2>Report a problem</h2>
      <p>
        Report a security problem privately through the <a href={`${REPO}/security/advisories/new`}>GitHub advisory form</a>.
      </p>
    </DocPage>
  );
}
