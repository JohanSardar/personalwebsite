import Link from "next/link";
import { docPages } from "@/lib/apple-bridge-docs";

export default function PageNav({ href }: { href: string }) {
  const i = docPages.findIndex((p) => p.href === href);
  const prev = docPages[i - 1];
  const next = docPages[i + 1];
  return (
    <nav className="ab-pager" aria-label="Pages">
      {prev ? (
        <Link href={prev.href} className="ab-pager-link">
          <span className="label">Previous</span>
          <span className="ab-pager-title">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="ab-pager-link ab-pager-next">
          <span className="label">Next</span>
          <span className="ab-pager-title">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
