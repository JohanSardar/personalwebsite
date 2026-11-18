import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { Head } from "@/components/apple-bridge/Bits";
import LongPrompt from "@/components/apple-bridge/LongPrompt";
import PageNav from "@/components/apple-bridge/PageNav";

export const metadata: Metadata = { title: "Organize your Photos" };

const prompt = readFileSync(join(process.cwd(), "content", "organize-photos-prompt.txt"), "utf8").trim();

export default function OrganizePhotos() {
  return (
    <>
      <Head
        eyebrow="Prompts"
        title="Organize your Photos"
        lede="One prompt that has your agent sort your whole Photos library into albums that fit your life."
      />

      <h2 id="before-you-start">Before you start</h2>
      <p>
        Download and connect Apple Bridge if you have not. <Link href="/apple-bridge/connect">Connect your agent</Link>{" "}
        takes one prompt.
      </p>

      <h2 id="the-prompt">The prompt</h2>
      <p>
        Copy this into your agent. It looks through your library first, shows you a plan, and only creates albums after
        you say ok. It never deletes, hides or edits a photo.
      </p>
      <LongPrompt text={prompt} />

      <PageNav href="/apple-bridge/organize-photos" />
    </>
  );
}
