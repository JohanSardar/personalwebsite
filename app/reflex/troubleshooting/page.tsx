import type { Metadata } from "next";
import Link from "next/link";
import Block from "@/components/docs/Block";
import DocPage from "@/components/docs/DocPage";
import { NPX, REPO, TESTFLIGHT } from "@/lib/docs";

export const metadata: Metadata = { title: "Troubleshooting" };

export default function Troubleshooting() {
  return (
    <DocPage slug="troubleshooting" lede="The usual problems, and what to check for each.">
      <h2>TestFlight says the beta is unavailable</h2>
      <p>
        The <a href={TESTFLIGHT}>public invitation</a> is the right link. A working link does not mean Apple has approved the build or that testing slots are open. You need the TestFlight app and iPadOS 26 or later.
      </p>

      <h2>Claude Code does not see Reflex</h2>
      <p>Run the install command in the same folder where you start Claude Code, then start a new session. Check the registration with this.</p>
      <Block tabs={[{ name: "Terminal", text: "claude mcp get reflex" }]} />
      <p>It should show a stdio server with the command npx and a connected status. You need Node.js 22 or later, Git and an internet connection for the first download.</p>

      <h2>Codex times out or does not see Reflex</h2>
      <p>
        Use the exact block from <Link href="/reflex/connect">Connect an Agent</Link>, with the timeout line. Keep only one block with that name. Start a new session and say <strong>connect my iPad to Reflex</strong>.
      </p>

      <h2>The code fails or expires</h2>
      <p>Ask your agent to connect again and use the new code. A code works once, lasts ten minutes and closes after five wrong tries.</p>
      <ul className="dots">
        <li>Put both devices on the same Wi-Fi to start with.</li>
        <li>On the iPad, allow Reflex under Settings, Privacy and Security, Local Network.</li>
        <li>Guest Wi-Fi, VPNs and firewalls can hide the Mac from the iPad.</li>
        <li>The relay needs an internet connection. If you turned the relay off, pairing works only nearby.</li>
      </ul>

      <h2>Paired, but the agent gets nothing</h2>
      <p>Drawing does not send anything. Tap Send, then look in the agent session. If the agent stopped waiting, ask it to wait for your iPad again.</p>
      <p>Check the Link and the approved agents on your Mac.</p>
      <Block
        tabs={[
          {
            name: "Terminal",
            text: `${NPX} link status
${NPX} link agents`,
          },
        ]}
      />
      <p>The agent you are using must be approved. If you reinstalled the iPad app, pair it again. To restart the Link without deleting its data, stop it.</p>
      <Block tabs={[{ name: "Terminal", text: `${NPX} link stop` }]} />
      <p>Then ask your agent to connect again. The next tool call starts the Link.</p>

      <h2>Still stuck</h2>
      <p>
        <a href={`${REPO}/issues/new/choose`}>Open a bug report</a> with your OS versions, your agent and its version, the exact command, what you expected and what happened. Remove private board content from screenshots. Do not attach the Reflex profile folder, credentials, live pairing codes or full logs.
      </p>
    </DocPage>
  );
}
