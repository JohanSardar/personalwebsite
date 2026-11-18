import type { Metadata } from "next";
import Link from "next/link";
import DocPage from "@/components/docs/DocPage";

export const metadata: Metadata = { title: "How It Works" };

export default function HowItWorks() {
  return (
    <DocPage slug="how-it-works" lede="A Send goes from your iPad to a small service on your Mac, and from there to the agents you approved.">
      <h2>The three parts</h2>
      <div className="table-scroll">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Part</th>
              <th>Where it runs</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Reflex</td>
              <td>Your iPad</td>
              <td>Holds your boards. Builds a Send when you tap Send or let go of the mic.</td>
            </tr>
            <tr>
              <td>The Link</td>
              <td>Your Mac</td>
              <td>Pairs with the iPad, keeps the list of approved agents, stores each Send and delivers it.</td>
            </tr>
            <tr>
              <td>Your agent</td>
              <td>Your Mac</td>
              <td>Claude Code, Codex or another receiver. It gets the Send through MCP and answers in its own session.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>You never start the Link yourself. The first Reflex tool call from your agent starts it.</p>

      <h2>What happens when you send</h2>
      <ul className="dots">
        <li>The iPad packages your new marks, the words you spoke and images of the board.</li>
        <li>The Link stores the Send on your Mac before it confirms receipt, so a restart does not lose it.</li>
        <li>
          Your agent picks it up with a tool called <code>wait_for_user</code>, then goes back to waiting for the next one.
        </li>
        <li>The Link keeps a Send until the agent confirms it has it.</li>
      </ul>
      <p>If the Mac is out of reach, the Send stays on the iPad and goes out when the Mac is back.</p>

      <h2>How the iPad reaches the Mac</h2>
      <p>Reflex tries the closest path first.</p>
      <ul className="dots">
        <li>The same Wi-Fi network.</li>
        <li>Apple’s peer-to-peer Wi-Fi, when the two devices are near each other.</li>
        <li>
          The <Link href="/reflex/relay">relay</Link>, when nothing closer works.
        </li>
      </ul>
      <p>Every path uses the same encrypted connection between the two devices. The relay passes that traffic along and cannot read it.</p>

      <h2>What the agent cannot do</h2>
      <p>The agent cannot draw on your board, edit it or delete anything from it. It reads what you send and answers in its own window.</p>
      <p>An earlier version of Reflex let agents draw. They were slow and the results were poor, so that part was removed.</p>
    </DocPage>
  );
}
