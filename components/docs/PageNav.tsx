import Link from "next/link";
import { docPages } from "@/lib/docs";

export default function PageNav({ href }: { href: string }) {
  const i = docPages.findIndex((p) => p.href === href);
  const prev = docPages[i - 1];
  const next = docPages[i + 1];
  return (
    <nav className="pager" aria-label="Pages">
      {prev ? (
        <Link href={prev.href} className="pager-link">
          <span className="label">Previous</span>
          <span className="pager-title">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="pager-link pager-next">
          <span className="label">Next</span>
          <span className="pager-title">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
