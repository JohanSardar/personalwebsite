import type { Metadata } from "next";
import ProjectPill from "@/components/ProjectPill";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  const all = projects();
  return (
    <>
      <h1 className="title reveal">Projects</h1>
      <p className="lede reveal" style={{ "--i": 1 } as React.CSSProperties}>
        Things I have built. Each one lives on its own site.
      </p>
      <div className="pills" style={{ "--base": 2 } as React.CSSProperties}>
        {all.map((p, i) => (
          <ProjectPill key={p.name} project={p} index={i} href={p.url} external />
        ))}
      </div>
    </>
  );
}
