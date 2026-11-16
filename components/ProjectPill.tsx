import Link from "next/link";
import type { Project } from "@/lib/content";
import { Arrow } from "./Sidebar";

type Props = { project: Project; index: number; href?: string | null; external?: boolean };

export default function ProjectPill({ project, index, href, external }: Props) {
  const cells = (
    <>
      <span className="num">{String(index + 1).padStart(2, "0")}</span>
      <span className="pill-name">{project.name}</span>
      <span className="pill-desc">{project.description}</span>
      <span className="pill-year">{project.date.slice(0, 4)}</span>
      <span className="pill-arrow">
        <Arrow />
      </span>
    </>
  );
  // The second layer is the inverted copy that wipes across on hover.
  const inner = (
    <>
      <span className="pill-layer">{cells}</span>
      <span className="pill-layer pill-fill" aria-hidden="true">
        {cells}
      </span>
    </>
  );
  const style = { "--i": index } as React.CSSProperties;
  if (!href) {
    return (
      <div className="pill reveal" style={style} data-placeholder>
        {inner}
      </div>
    );
  }
  if (external) {
    return (
      <a className="pill reveal" style={style} href={href} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className="pill reveal" style={style} href={href}>
      {inner}
    </Link>
  );
}
