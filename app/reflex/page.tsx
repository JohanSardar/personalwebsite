import type { Metadata } from "next";
import Link from "next/link";
import DocPage from "@/components/docs/DocPage";
import { Architecture } from "@/components/docs/Diagrams";
import { REPO, TESTFLIGHT } from "@/lib/docs";

export const metadata: Metadata = { title: "Welcome" };

export default function Welcome() {
  return (
    <DocPage slug="" lede="Reflex is an iPad app that sends what you draw, write and say to the coding agent on your Mac.">
      <p className="hook">Some things are faster to draw than to type.</p>
      <p>
        You circle the broken button. You sketch the screen you want. You hold the mic and say “this one, but blue”. Then you press Send, and Claude Code or Codex gets the marks, the words and a picture of the board in one message.
      </p>
      <p>The agent answers in its own session on your Mac. It never writes on your board.</p>

      <figure className="doc-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/reflex-still.jpg" width={1600} height={900} alt="A hand sketching three app screens on an iPad, next to a Claude Code window that answers the sketch" />
      </figure>

      <h2>In one picture</h2>
      <p>
        Reflex connects to your agent through <strong>MCP</strong>, the same way any other tool does. There is no plugin for a specific harness and no cloud service in the middle.
      </p>
      <Architecture />
      <p>Three words come up on every page.</p>
      <ul className="dots">
        <li>
          A <strong>Board</strong> is an endless canvas on the iPad. It stays on the iPad.
        </li>
        <li>
          A <strong>Send</strong> is one message you choose to send. It holds your new marks, your spoken words and images of the board.
        </li>
        <li>
          The <strong>Link</strong> is a small background service on your Mac. It pairs with the iPad, stores each Send and hands it to the agents you approved.
        </li>
      </ul>

      <h2>How the agent receives a Send</h2>
      <div className="table-scroll">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Harness</th>
              <th>How a Send arrives</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Any MCP harness</td>
              <td>
                The agent calls a tool named <code>wait_for_user</code>. The call returns when you press Send.
              </td>
            </tr>
            <tr>
              <td>Claude Code</td>
              <td>The same tool, and optionally a channel. With the channel on, a Send starts a new turn without the agent waiting on anything.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <Link href="/reflex/delivery">MCP and Delivery</Link> shows both on the wire.
      </p>

      <h2>Where to go next</h2>
      <ul className="dots">
        <li>
          You want to try it. <Link href="/reflex/quick-start">Quick Start</Link> takes about five minutes and needs no account.
        </li>
        <li>
          You want the wiring first. Read <Link href="/reflex/how-it-works">How It Works</Link>, then <Link href="/reflex/delivery">MCP and Delivery</Link>.
        </li>
        <li>
          You want to know who can read your boards. Read <Link href="/reflex/privacy">Privacy and Security</Link>.
        </li>
      </ul>

      <h2>What does Reflex cost?</h2>
      <p>
        Nothing. The Mac side is <a href={REPO}>open source</a> under the MIT license. The iPad app is a free <a href={TESTFLIGHT}>TestFlight beta</a> for iPadOS 26 or later. The default relay is free, and you can run your own. Your agent runs on the subscription you already have.
      </p>
    </DocPage>
  );
}
