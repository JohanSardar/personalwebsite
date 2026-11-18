import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  const all = projects();
  const done = all.filter((p) => !p.wip);
  return (
    <>
      <h1 className="title reveal">Projects</h1>
      <p className="lede reveal" style={{ "--i": 1 } as React.CSSProperties}>
        Things I have built.
      </p>
      <div className="cards" style={{ "--base": 2 } as React.CSSProperties}>
        {done.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
      <p className="more reveal" style={{ "--i": 2 + done.length } as React.CSSProperties}>
        Probably shipping a bunch of unfinished stuff, which you can see{" "}
        <a href="https://github.com/JohanSardar" target="_blank" rel="noreferrer">
          here
        </a>
        .
      </p>
    </>
  );
}
