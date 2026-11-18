import type { Metadata } from "next";
import Code from "@/components/apple-bridge/Code";
import { Head } from "@/components/apple-bridge/Bits";
import PageNav from "@/components/apple-bridge/PageNav";

export const metadata: Metadata = { title: "Privacy and security" };

export default function Security() {
  return (
    <>
      <Head
        title="Privacy and security"
        lede="Apple Bridge reads your private messages, mail and notes. This page says where that data goes and who can use it."
      />

      <h2 id="on-your-mac">It stays on your Mac</h2>
      <p>
        The synced copy lives in <code>~/Library/Application Support/AppleBridge</code> on your Mac.
        There is no Apple Bridge account, server or cloud. Nothing leaves your Mac unless you turn on remote access.
      </p>
      <p>
        An agent you connect is different. It may send what it reads to its own service, so check your agent&apos;s
        settings before you connect it.
      </p>

      <h2 id="allow">You allow each agent</h2>
      <p>
        Installing Apple Bridge gives no agent access. Each new agent appears in a panel on your Mac with its name and the
        app it runs in, and it gets in only after you click Allow. Agents must never click Allow or grant a permission for
        you.
      </p>

      <h2 id="levels">What an allowed agent can do</h2>
      <p>
        An allowed agent can read and change the sources you gave Apple Bridge permission for, and its changes happen
        right away. You can make it ask you before each change, or take its access away.
      </p>
      <Code>{`bridge agents list
bridge agents update <id> --level approve   # ask before each change
bridge agents update <id> --level full      # back to full access
bridge agents revoke <id>                   # remove its access`}</Code>
      <p>A revoked agent sees the Allow panel again the next time it starts.</p>

      <h2 id="permissions">Mac permissions stay yours</h2>
      <p>
        macOS permissions belong to the Apple Bridge Helper, and only you can switch them on.{" "}
        <code>bridge permissions status</code> shows them without asking macOS for anything. To turn one off, use System
        Settings under Privacy &amp; Security.
      </p>

      <h2 id="security">Reporting a problem</h2>
      <p>
        Report a suspected vulnerability privately through{" "}
        <a href="https://github.com/JohanSardar/apple-bridge/security" target="_blank" rel="noreferrer">
          GitHub security advisories
        </a>
        . Keep command output out of public issues, since it can contain your data.
      </p>

      <PageNav href="/apple-bridge/security" />
    </>
  );
}
