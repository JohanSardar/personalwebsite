import { readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "content");

export type Project = {
  name: string;
  description: string;
  /** GitHub repo as "owner/name". */
  repo: string;
  /** Picture shown at rest. Null shows the placeholder. */
  still: string | null;
  /** Optional version of the Still for the dark theme. */
  stillDark?: string | null;
  /** Clip that plays on hover. Null means nothing plays. */
  video: string | null;
};

function statements(file: string): string[] {
  return readFileSync(join(dir, file), "utf8")
    .split(/\n\s*\n/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export const aboutStatements = () => statements("about.txt");

/** Projects in the order written in the file. */
export function projects(): Project[] {
  return JSON.parse(readFileSync(join(dir, "projects.json"), "utf8")) as Project[];
}
