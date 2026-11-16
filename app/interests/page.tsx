import type { Metadata } from "next";
import { interestStatements } from "@/lib/content";

export const metadata: Metadata = { title: "Interests" };

export default function Interests() {
  const interests = interestStatements();
  return (
    <>
      <h1 className="title reveal">Interests</h1>
      <ol className="rows">
        {interests.map((text, i) => (
          <li key={i} className="row reveal" style={{ "--i": i + 1 } as React.CSSProperties}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <p className="statement">{text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
