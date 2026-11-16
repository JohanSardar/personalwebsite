import { readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "content");

export type Project = {
  name: string;
  description: string;
  date: string;
  url: string | null;
  placeholder?: boolean;
};

function statements(file: string): string[] {
  return readFileSync(join(dir, file), "utf8")
    .split(/\n\s*\n/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export const aboutStatements = () => statements("about.txt");

export function projects(): Project[] {
  const all = JSON.parse(readFileSync(join(dir, "projects.json"), "utf8")) as Project[];
  return all.sort((a, b) => b.date.localeCompare(a.date));
}
