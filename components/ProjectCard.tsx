import Link from "next/link";
import type { Project } from "@/lib/content";
import { Arrow } from "./Sidebar";

type Props = { project: Project; index: number; href?: string | null; external?: boolean };

export default function ProjectCard({ project, index, href, external }: Props) {
  const cells = (
    <>
      <span className="card-top">
        <span className="num">{String(index + 1).padStart(2, "0")}</span>
        <span className="card-arrow">
          <Arrow />
        </span>
      </span>
      <span className="card-bottom">
        <span className="card-name">{project.name}</span>
        <span className="card-meta">
          <span>{project.description}</span>
          <span className="card-year">{project.date.slice(0, 4)}</span>
        </span>
      </span>
    </>
  );
  // The second layer is the inverted copy that wipes up on hover.
  const inner = (
    <>
      <span className="card-layer">{cells}</span>
      <span className="card-layer card-fill" aria-hidden="true">
        {cells}
      </span>
    </>
  );
  const style = { "--i": index } as React.CSSProperties;
  if (!href) {
    return (
      <div className="card reveal" style={style} data-placeholder>
        {inner}
      </div>
    );
  }
  if (external) {
    return (
      <a className="card reveal" style={style} href={href} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className="card reveal" style={style} href={href}>
      {inner}
    </Link>
  );
}
