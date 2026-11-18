import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  const all = projects();
  return (
    <>
      <h1 className="title reveal">Projects</h1>
      <p className="lede reveal" style={{ "--i": 1 } as React.CSSProperties}>
        Things I have built.
      </p>
      <div className="cards" style={{ "--base": 2 } as React.CSSProperties}>
        {all.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </>
  );
}
