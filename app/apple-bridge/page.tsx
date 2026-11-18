import type { Metadata } from "next";
import { Cards, Head } from "@/components/apple-bridge/Bits";
import CopyPrompt from "@/components/apple-bridge/CopyPrompt";
import PageNav from "@/components/apple-bridge/PageNav";
import UseCases from "@/components/apple-bridge/UseCases";
import { docPage } from "@/lib/apple-bridge-docs";

export const metadata: Metadata = { title: { absolute: "Apple Bridge docs" } };

export default function Overview() {
  return (
    <>
      <Head
        title="Overview"
        lede="Give Claude Code, Codex and other agents your Mac's Messages, Mail, Calendar, Notes and more through one local MCP server."
      />
      <p>
        Apple Bridge runs on your Mac and lets your agent read and change the Apple apps you choose. Ask in plain words and
        your agent finds the message, adds the reminder or checks your calendar. It needs an Apple silicon Mac on macOS 26
        or later, and it is free and open source.
      </p>

      <h2 id="set-up">Set it up with one prompt</h2>
      <p>
        Paste this into an agent that can run commands on your Mac. It installs and connects Apple Bridge, and you only
        click Allow and switch on the Mac permissions.
      </p>
      <CopyPrompt />

      <h2 id="what-you-can-do">What you can do with Apple Bridge</h2>
      <p>Talk to your agent the way you normally would. These are a few things people ask every day.</p>
      <UseCases />

      <h2 id="next-steps">Next steps</h2>
      <Cards
        items={[
          { ...docPage("/apple-bridge/connect"), title: "Connect your agent" },
          { ...docPage("/apple-bridge/tools"), title: "Explore supported tools" },
          { ...docPage("/apple-bridge/sources"), title: "See every source" },
          { ...docPage("/apple-bridge/security"), title: "Understand privacy and access" },
        ]}
      />

      <PageNav href="/apple-bridge" />
    </>
  );
}
