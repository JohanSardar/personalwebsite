"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docPages } from "@/lib/bogo-docs";

export default function Pager() {
  const pathname = usePathname();
  const i = docPages.findIndex((p) => p.href === pathname);
  if (i < 0) return null;
  const prev = docPages[i - 1];
  const next = docPages[i + 1];
  return (
    <nav className="bd-pager" aria-label="More pages">
      {prev ? (
        <Link href={prev.href} className="bd-pager-link">
          <span className="label">Previous</span>
          <span>{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="bd-pager-link bd-pager-next">
          <span className="label">Next</span>
          <span>{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
