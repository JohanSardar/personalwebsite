import Link from "next/link";
import { docHref, docs, type DocSlug } from "@/lib/docs";

/** One docs page: title, lede, the page's content, then previous and next. */
export default function DocPage({ slug, lede, children }: { slug: DocSlug; lede: string; children: React.ReactNode }) {
  const i = docs.findIndex((d) => d.slug === slug);
  const prev = docs[i - 1];
  const next = docs[i + 1];
  return (
    <article className="doc">
      <h1 className="title reveal">{docs[i].title}</h1>
      <p className="lede reveal" style={{ "--i": 1 } as React.CSSProperties}>
        {lede}
      </p>
      <div className="doc-body reveal" style={{ "--i": 2 } as React.CSSProperties}>
        {children}
      </div>
      <nav className="pager" aria-label="More pages">
        {prev ? (
          <Link href={docHref(prev.slug)} className="pager-link">
            <span className="label">Previous</span>
            <span>{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={docHref(next.slug)} className="pager-link pager-next">
            <span className="label">Next</span>
            <span>{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
