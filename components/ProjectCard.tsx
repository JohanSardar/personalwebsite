"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/content";

type Props = { project: Project; index: number };

export default function ProjectCard({ project, index }: Props) {
  const card = useRef<HTMLAnchorElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPlaying(true);
    v.play().catch(() => setPlaying(false));
  }

  function stop() {
    const v = video.current;
    if (!v) return;
    setPlaying(false);
    v.pause();
    v.currentTime = 0;
  }

  // Touch screens have no hover: play while the card is on screen instead.
  useEffect(() => {
    const el = card.current;
    if (!el || !video.current || !window.matchMedia("(hover: none)").matches) return;
    const seen = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : stop()), {
      threshold: 0.6,
    });
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  return (
    <a
      ref={card}
      className="card reveal"
      style={{ "--i": index } as React.CSSProperties}
      href={`https://github.com/${project.repo}`}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      <span className="card-media" data-playing={playing || undefined}>
        {project.video && (
          <video ref={video} src={project.video} muted loop playsInline preload="metadata" />
        )}
        {project.still ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={project.stillDark ? "card-still still-light" : "card-still"}
              src={project.still}
              alt=""
            />
            {project.stillDark && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="card-still still-dark" src={project.stillDark} alt="" loading="lazy" />
            )}
          </>
        ) : (
          !project.video && <span className="card-placeholder">Preview soon</span>
        )}
      </span>
      <span className="card-name">{project.name}</span>
      <span className="card-desc">{project.description}</span>
      <span className="card-repo">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.77-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"
          />
        </svg>
        {project.repo}
      </span>
    </a>
  );
}
