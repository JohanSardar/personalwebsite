import type { Metadata } from "next";
import Link from "next/link";
import { Cards, Head } from "@/components/apple-bridge/Bits";
import PageNav from "@/components/apple-bridge/PageNav";
import { docPage } from "@/lib/apple-bridge-docs";

export const metadata: Metadata = { title: "Prompts" };

export default function Prompts() {
  return (
    <>
      <Head
        title="Prompts"
        lede="Ready-made prompts to paste into your agent. Each one is a whole job your agent does with Apple Bridge."
      />
      <p>
        Download and connect Apple Bridge if you have not. <Link href="/apple-bridge/connect">Connect your agent</Link>{" "}
        takes one prompt. The times are a rough guess and grow with the size of your library.
      </p>
      <Cards items={docPage("/apple-bridge/prompts").children!} />

      <PageNav href="/apple-bridge/prompts" />
    </>
  );
}
