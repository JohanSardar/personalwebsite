import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { Head } from "@/components/apple-bridge/Bits";
import LongPrompt from "@/components/apple-bridge/LongPrompt";
import PageNav from "@/components/apple-bridge/PageNav";
import { docPage } from "@/lib/apple-bridge-docs";

export const metadata: Metadata = { title: "Texting and call stats" };

const prompt = readFileSync(join(process.cwd(), "content", "message-stats-prompt.txt"), "utf8").trim();

export default function MessageStats() {
  return (
    <>
      <Head
        eyebrow="Prompts"
        title="Texting and call stats"
        lede="One prompt that has your agent count your messages and calls and tell you who you talk to the most."
        time={docPage("/apple-bridge/message-stats").time}
      />

      <h2 id="before-you-start">Before you start</h2>
      <p>
        Download and connect Apple Bridge if you have not. <Link href="/apple-bridge/connect">Connect your agent</Link>{" "}
        takes one prompt.
      </p>

      <h2 id="the-prompt">The prompt</h2>
      <p>
        Copy this into your agent. It counts who you text and call, who replies the quickest and how long your calls
        run. It only reads, and it shows names and numbers, never what a message says.
      </p>
      <LongPrompt text={prompt} />

      <PageNav href="/apple-bridge/message-stats" />
    </>
  );
}
