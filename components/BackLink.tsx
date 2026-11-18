import Link from "next/link";

/** The way out of a project's docs, back to the main site. */
export default function BackLink() {
  return (
    <Link href="/projects" className="back-link">
      <svg viewBox="0 0 12 12" aria-hidden="true">
        <path d="M7 2.5 3.5 6 7 9.5M3.5 6h6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      Projects
    </Link>
  );
}
