import type { Metadata } from "next";
import Block from "@/components/docs/Block";
import DocPage from "@/components/docs/DocPage";
import { NPX } from "@/lib/docs";

export const metadata: Metadata = { title: "Relay" };

export default function Relay() {
  return (
    <DocPage slug="relay" lede="The relay lets your iPad reach your Mac when they are not on the same network. The default one needs no setup.">
      <h2>When it is used</h2>
      <p>
        Reflex tries the same Wi-Fi and a nearby connection first. If neither works, the two devices meet through a relay. The default relay is <code>wss://reflex.eilmer.si</code> and it is free.
      </p>

      <h2>What it can and cannot see</h2>
      <div className="table-scroll">
        <table className="doc-table">
          <thead>
            <tr>
              <th>The relay sees</th>
              <th>The relay does not see</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>When a device connects</td>
              <td>Your boards, marks or spoken words</td>
            </tr>
            <tr>
              <td>The address it connects from</td>
              <td>The pairing code</td>
            </tr>
            <tr>
              <td>How many bytes it sends</td>
              <td>Device names and your name</td>
            </tr>
            <tr>
              <td>Public device keys</td>
              <td>The private keys on your devices</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>The relay passes on bytes it cannot open. If it changed one, the receiving device would refuse the message. It stores no boards and runs no agents.</p>

      <h2>Pairing through the relay</h2>
      <ul className="dots">
        <li>While a code is live, your Mac waits in a shared pairing room on the relay.</li>
        <li>The iPad joins that room and tries the code you typed.</li>
        <li>The check uses CPace. Both sides prove they know the code without sending it or anything that reveals it.</li>
        <li>A wrong try counts against the code’s five tries.</li>
        <li>Once the code checks out, the devices swap keys and move to a room of their own.</li>
      </ul>

      <h2>Run your own relay</h2>
      <p>
        Run this on a machine that stays on. Your Mac works. You need Node.js 22 or later, and <code>cloudflared</code> for the free tunnel.
      </p>
      <Block tabs={[{ name: "Terminal", text: `${NPX} relay --tunnel` }]} />
      <p>It prints an address that starts with wss. Register Reflex again with that address. In Claude Code, remove the old registration first.</p>
      <Block
        tabs={[
          {
            name: "Terminal",
            text: `claude mcp remove reflex -s local
claude mcp add reflex -e REFLEX_RELAY=wss://your-address -- npx -y "github:JohanSardar/reflex#npx" mcp`,
          },
        ]}
      />
      <p>
        In Codex, add <code>{`env = { REFLEX_RELAY = "wss://your-address" }`}</code> under the Reflex block in <code>~/.codex/config.toml</code>.
      </p>
      <p>If a Link is already running, stop it once so it restarts with the new setting.</p>
      <Block tabs={[{ name: "Terminal", text: `${NPX} link stop` }]} />
      <p>Nothing changes on the iPad. You still type only the code.</p>
      <p>A tunnel address changes each time the tunnel starts. For a fixed address, run the relay without the tunnel option behind HTTPS on a domain you own.</p>

      <h2>Turn the relay off</h2>
      <p>
        Set <code>REFLEX_RELAY=off</code> the same way. Pairing and Sends then work only on the same Wi-Fi or nearby.
      </p>
    </DocPage>
  );
}
