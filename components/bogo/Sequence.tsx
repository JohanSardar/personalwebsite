const LANES = ["Agent", "BOGO on Mac", "Relay", "iPhone", "Upstream"];
const X = [60, 225, 390, 540, 680];

type Step = { from: number; to: number; label: string; note?: string; dashed?: boolean };

const STEPS: Step[] = [
  { from: 0, to: 1, label: "tools/call fs__write_file" },
  { from: 1, to: 1, label: "policy = approve, store request" },
  { from: 1, to: 2, label: "HPKE(request bytes)" },
  { from: 2, to: 3, label: "APNs “Approval requested”", dashed: true },
  { from: 3, to: 2, label: "fetch, decrypt" },
  { from: 3, to: 3, label: "Review card, Face ID" },
  { from: 3, to: 1, label: "HPKE(P-256 signature)" },
  { from: 1, to: 1, label: "Lean core verifies, forwards once" },
  { from: 1, to: 4, label: "tools/call write_file" },
  { from: 4, to: 1, label: "result", dashed: true },
  { from: 1, to: 0, label: "result", dashed: true },
];

const TOP = 44;
const ROW = 38;

export default function Sequence() {
  const h = TOP + STEPS.length * ROW + 24;
  return (
    <figure className="bd-seq">
      <svg viewBox={`0 0 740 ${h}`} role="img" aria-label="Sequence of one approved tool call">
        <defs>
          <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0L8 4L0 8z" fill="currentColor" />
          </marker>
        </defs>
        {LANES.map((l, i) => (
          <g key={l}>
            <text x={X[i]} y={20} textAnchor="middle" className="bd-seq-lane">
              {l}
            </text>
            <line x1={X[i]} x2={X[i]} y1={32} y2={h - 8} className="bd-seq-life" />
          </g>
        ))}
        {STEPS.map((s, i) => {
          const y = TOP + i * ROW + 18;
          if (s.from === s.to) {
            const x = X[s.from];
            return (
              <g key={i}>
                <rect x={x - 5} y={y - 11} width={10} height={22} className="bd-seq-act" />
                <text x={x + 14} y={y + 4} className="bd-seq-self">
                  {s.label}
                </text>
              </g>
            );
          }
          const right = s.to > s.from;
          const x1 = X[s.from] + (right ? 6 : -6);
          const x2 = X[s.to] + (right ? -6 : 6);
          return (
            <g key={i}>
              <line
                x1={x1}
                x2={x2}
                y1={y}
                y2={y}
                className="bd-seq-msg"
                strokeDasharray={s.dashed ? "4 4" : undefined}
                markerEnd="url(#arr)"
              />
              <text x={(x1 + x2) / 2} y={y - 7} textAnchor="middle" className="bd-seq-label">
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
