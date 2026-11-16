import Image from "next/image";
import Link from "next/link";
import ProjectPill from "@/components/ProjectPill";
import { Arrow } from "@/components/Sidebar";
import { aboutStatements, projects } from "@/lib/content";

export default function Home() {
  const about = aboutStatements();
  const latest = projects().slice(0, 3);
  return (
    <>
      <Image
        className="portrait reveal"
        src="/portrait.jpg"
        alt="Johan Sardar"
        width={220}
        height={220}
        priority
      />
      <div className="statements">
        {about.map((text, i) => (
          <p key={i} className="statement reveal" style={{ "--i": i + 1 } as React.CSSProperties}>
            {text}
          </p>
        ))}
      </div>

      <section className="section">
        <header className="section-head reveal" style={{ "--i": about.length + 1 } as React.CSSProperties}>
          <h2 className="label">Latest projects</h2>
          <Link href="/projects" className="social">
            All projects
            <Arrow />
          </Link>
        </header>
        <div className="pills" style={{ "--base": about.length + 2 } as React.CSSProperties}>
          {latest.map((p, i) => (
            <ProjectPill key={p.name} project={p} index={i} href="/projects" />
          ))}
        </div>
      </section>
    </>
  );
}
