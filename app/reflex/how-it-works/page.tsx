import type { Metadata } from "next";
import Link from "next/link";
import DocPage from "@/components/docs/DocPage";
import { Architecture } from "@/components/docs/Diagrams";

export const metadata: Metadata = { title: "How It Works" };

export default function HowItWorks() {
  return (
    <DocPage slug="how-it-works" lede="Reflex is three programs. An iPad app, a background service on your Mac called the Link, and an MCP server your agent starts.">
      <Architecture />
      <p>
        <strong>The short version.</strong> The iPad encrypts a Send for your Mac. The Link stores it. Your agent reads it through an MCP tool. Nothing else is involved unless the two devices cannot reach each other directly, and then a relay forwards the encrypted bytes.
      </p>

      <h2>The iPad app</h2>
      <p>A native app built on Apple’s PencilKit. Ink is drawn locally and is never streamed. Speech is recognised on the device.</p>
      <p>A Send is built only when you press Send or release the mic. It goes into an outbox on the iPad and is retried until the Link confirms it has it.</p>

      <h2>The Link</h2>
      <p>
        One long-lived Node process per profile. You never start it. The first Reflex tool call from an agent starts it, and it keeps running after the agent session ends.
      </p>
      <ul className="dots">
        <li>It holds the Mac’s device key and the list of paired devices.</li>
        <li>It keeps a signed record of which agents you approved, denied or revoked.</li>
        <li>
          It stores every Send in one SQLite database in <code>~/.reflex/link/</code>, in WAL mode with full sync, so a committed Send survives a crash.
        </li>
        <li>It decides which agent gets which Send, and retries delivery.</li>
      </ul>

      <h2>The MCP server</h2>
      <p>
        <code>reflex mcp</code> is a short-lived stdio server that your harness starts like any other MCP server. It holds no state. It forwards each tool call to the Link over a private Unix socket and presents a credential that identifies the agent.
      </p>
      <p>
        The socket lives in the Link’s folder and needs the profile’s key. There is no open port on localhost. <Link href="/reflex/delivery">MCP and Delivery</Link> covers the tools and the wire format.
      </p>

      <h2>Three paths, one session</h2>
      <div className="table-scroll">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Path</th>
              <th>Transport</th>
              <th>Found by</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Same Wi-Fi</td>
              <td>TCP, port 7420 by default</td>
              <td>
                Bonjour, <code>_reflex-link._tcp</code>
              </td>
            </tr>
            <tr>
              <td>Nearby</td>
              <td>Apple peer-to-peer Wi-Fi (AWDL), through a small Swift helper</td>
              <td>
                Bonjour, <code>_reflex-p2p._tcp</code>
              </td>
            </tr>
            <tr>
              <td>Relay</td>
              <td>WebSocket over TLS</td>
              <td>A room on the relay derived from your identity</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>The closest path that works is used. Discovery only says where a device might be. It is never treated as proof of who the device is.</p>

      <h2>The handshake</h2>
      <p>Every path runs the same handshake before anything else is accepted.</p>
      <ul className="dots">
        <li>Each device has a long-term Ed25519 key. Its device ID is derived from that key, so a device cannot claim another one’s ID.</li>
        <li>Both sides send a fresh X25519 key and sign the transcript of the exchange.</li>
        <li>The Mac accepts the peer only if its key is the one it paired with.</li>
        <li>Session keys come from the X25519 secret through HKDF-SHA256, one key per direction.</li>
        <li>Every frame after that is sealed with ChaCha20-Poly1305 and a counter nonce. A changed, dropped, reordered or replayed frame fails to open.</li>
      </ul>
      <p>
        The first pairing uses the six-digit code. On the relay the code is checked with CPace, so it never crosses the network. See <Link href="/reflex/relay">Relay</Link>.
      </p>

      <h2>Durable</h2>
      <ul className="dots">
        <li>The iPad keeps a Send until the Link confirms it.</li>
        <li>The Link writes the Send and its images to disk before it confirms.</li>
        <li>The Link keeps the Send in the Inbox until the agent acknowledges it.</li>
      </ul>
      <p>A restart of the iPad app, the Link or the agent session loses nothing.</p>

      <h2>What leaves the iPad</h2>
      <ul className="dots">
        <li>A Send, to your Mac, when you press Send or release the mic.</li>
        <li>Encrypted bytes through the relay, only when no direct path works.</li>
        <li>Nothing while you draw. No account, no analytics service and no copy of your boards on a server.</li>
      </ul>
      <p>What the agent receives then goes to its model provider, under that provider’s policy.</p>

      <h2>Not yet</h2>
      <ul className="dots">
        <li>Agents drawing on the board. An earlier version had it. It was slow and the results were poor, so it was removed.</li>
        <li>Search inside handwriting. Search covers board titles and typed text.</li>
        <li>Shared boards and iCloud sync. Boards stay on one iPad.</li>
        <li>An independent security audit.</li>
      </ul>
    </DocPage>
  );
}
