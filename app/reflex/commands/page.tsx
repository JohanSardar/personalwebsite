import type { Metadata } from "next";
import Block from "@/components/docs/Block";
import DocPage from "@/components/docs/DocPage";
import { NPX } from "@/lib/docs";

export const metadata: Metadata = { title: "Commands" };

const rows: [string, string][] = [
  ["mcp", "Run the MCP server. This is what your agent starts."],
  ["connect", "Print a pairing code."],
  ["pair", "Print the live pairing code from a terminal."],
  ["wait", "Wait for the next Send and print it."],
  ["link status", "Show whether the Link is running and what is paired."],
  ["link agents", "List agents and whether each is approved."],
  ["link revoke <agent>", "Stop an approved agent from receiving Sends."],
  ["link deny <agent>", "Refuse an agent that asked for access."],
  ["link forget <device>", "Remove a paired device."],
  ["link stop", "Stop the Link. Its data stays. The next tool call starts it again."],
  ["adapters add webhook --url <url>", "Deliver each Send to a signed webhook."],
  ["adapters list", "List delivery targets."],
  ["adapters remove <target>", "Remove a delivery target."],
  ["relay --tunnel", "Run your own relay behind a free tunnel."],
];

const options: [string, string][] = [
  ["--home <path>", "Use a different profile folder."],
  ["--name <name>", "Set the Mac’s name on first start."],
  ["--port <n>", "Set the local network port. The default is 7420."],
  ["--relay <url>", "Use this relay. The value off turns the relay off."],
  ["--no-lan", "Use the relay only."],
  ["--no-p2p", "Turn off peer-to-peer Wi-Fi."],
  ["--json", "Print JSON."],
];

export default function Commands() {
  return (
    <DocPage slug="commands" lede="Your agent runs most of these for you. They are here for when you want to check something from a terminal.">
      <h2>How to run one</h2>
      <p>Every command starts the same way. Put the command after it.</p>
      <Block tabs={[{ name: "Terminal", text: `${NPX} link status` }]} />

      <h2>Commands</h2>
      <div className="table-scroll">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([c, d]) => (
              <tr key={c}>
                <td>
                  <code>{c}</code>
                </td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Link options</h2>
      <div className="table-scroll">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Option</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            {options.map(([c, d]) => (
              <tr key={c}>
                <td>
                  <code>{c}</code>
                </td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Tools the agent sees</h2>
      <p>
        The MCP server gives the agent a tool to connect your iPad and a tool named <code>wait_for_user</code> that returns your next Send. The agent confirms a Send by passing its ID the next time it waits.
      </p>
    </DocPage>
  );
}
