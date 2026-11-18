import type { ReactNode } from "react";

export function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function H2({ children }: { children: string }) {
  return <h2 id={slug(children)}>{children}</h2>;
}

export function H3({ children }: { children: string }) {
  return <h3 id={slug(children)}>{children}</h3>;
}

export function Note({ kind = "note", children }: { kind?: "note" | "tip" | "warning"; children: ReactNode }) {
  const label = { note: "Note", tip: "Tip", warning: "Warning" }[kind];
  return (
    <div className={`bd-note bd-note-${kind}`}>
      <p className="label">{label}</p>
      <div>{children}</div>
    </div>
  );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="bd-table">
      <table>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Lede({ children }: { children: ReactNode }) {
  return <p className="bd-doc-lede">{children}</p>;
}
