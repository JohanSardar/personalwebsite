// Line drawings for the Reflex docs. They use the theme's ink colour, so they flip with it.

const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

function Box({ x, y, w, h, tag, name, lines }: { x: number; y: number; w: number; h: number; tag: string; name: string; lines: string[] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="none" stroke="currentColor" strokeWidth={1.2} />
      <text x={x + 14} y={y + 24} className="dg-tag">
        {tag}
      </text>
      <text x={x + 14} y={y + 48} className="dg-name">
        {name}
      </text>
      {lines.map((l, i) => (
        <text key={l} x={x + 14} y={y + 72 + i * 18} className="dg-line">
          {l}
        </text>
      ))}
    </g>
  );
}

function Arrow({ x1, x2, y, label, sub, dashed }: { x1: number; x2: number; y: number; label?: string; sub?: string; dashed?: boolean }) {
  const dir = x2 > x1 ? 1 : -1;
  const mid = (x1 + x2) / 2;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 - dir * 2} y2={y} stroke="currentColor" strokeWidth={1.2} strokeDasharray={dashed ? "4 4" : undefined} />
      <path d={`M${x2 - dir * 8} ${y - 4.5}L${x2} ${y}L${x2 - dir * 8} ${y + 4.5}`} fill="none" stroke="currentColor" strokeWidth={1.2} />
      {label && (
        <text x={mid} y={y - 8} textAnchor="middle" className="dg-mono">
          {label}
        </text>
      )}
      {sub && (
        <text x={mid} y={y + 16} textAnchor="middle" className="dg-sub">
          {sub}
        </text>
      )}
    </g>
  );
}

/** iPad, Link, MCP server and agent, with the paths between them. */
export function Architecture() {
  return (
    <figure className="diagram">
      <svg viewBox="0 0 900 250" role="img" aria-label="The iPad connects to the Link on the Mac over Wi-Fi, peer-to-peer Wi-Fi or the relay. The Link connects to an MCP server over a Unix socket, and the MCP server talks to the agent over stdio.">
        <style>{`.dg-tag{font-size:10.5px;font-weight:500;letter-spacing:.09em;fill:currentColor;opacity:.56}.dg-name{font-size:16px;font-weight:600;font-stretch:112%;fill:currentColor}.dg-line{font-size:12.5px;fill:currentColor;opacity:.72}.dg-mono{font-family:${MONO};font-size:11px;fill:currentColor}.dg-sub{font-size:11px;fill:currentColor;opacity:.56}`}</style>
        <text x={0} y={16} className="dg-tag">
          IPAD
        </text>
        <text x={330} y={16} className="dg-tag">
          YOUR MAC
        </text>
        <line x1={330} y1={24} x2={900} y2={24} stroke="currentColor" strokeWidth={1} opacity={0.2} />
        <line x1={0} y1={24} x2={160} y2={24} stroke="currentColor" strokeWidth={1} opacity={0.2} />

        <Box x={0} y={46} w={160} h={150} tag="APP" name="Reflex" lines={["PencilKit board", "speech to text", "outbox, retries"]} />
        <Arrow x1={160} x2={330} y={84} label="Wi-Fi · TCP" />
        <Arrow x1={160} x2={330} y={121} label="nearby · AWDL" />
        <Arrow x1={160} x2={330} y={158} label="relay · WSS" />
        <text x={245} y={218} textAnchor="middle" className="dg-sub">
          one encrypted session
        </text>
        <text x={245} y={234} textAnchor="middle" className="dg-sub">
          on whichever path works
        </text>

        <Box x={330} y={46} w={170} h={150} tag="BACKGROUND SERVICE" name="Link" lines={["pairing, approvals", "SQLite Inbox", "delivery, retries"]} />
        <Arrow x1={500} x2={590} y={121} label="Unix socket" sub="local RPC" />
        <Box x={590} y={46} w={130} h={150} tag="MCP SERVER" name="reflex mcp" lines={["connect", "wait_for_user", "channel push"]} />
        <Arrow x1={720} x2={790} y={121} label="stdio" sub="MCP" />
        <Box x={790} y={46} w={110} h={150} tag="HARNESS" name="Agent" lines={["Claude Code", "Codex", "any MCP client"]} />
      </svg>
      <figcaption>One Send, left to right. The Link is the only part that stores anything on the Mac.</figcaption>
    </figure>
  );
}

type Step = { from: number; to: number; label: string; dashed?: boolean } | { at: number; note: string };

/** A sequence diagram: lanes across the top, messages down the page. */
export function Sequence({ lanes, steps, caption, label }: { lanes: string[]; steps: Step[]; caption: string; label: string }) {
  const W = 860;
  const xs = lanes.map((_, i) => 70 + (i * (W - 140)) / (lanes.length - 1));
  const H = 64 + steps.length * 44;
  return (
    <figure className="diagram">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
        <style>{`.sq-lane{font-size:11px;font-weight:500;letter-spacing:.09em;fill:currentColor}.sq-mono{font-family:${MONO};font-size:11.5px;fill:currentColor}.sq-note{font-size:12.5px;fill:currentColor;opacity:.72}.sq-n{font-size:10.5px;font-weight:500;fill:currentColor;opacity:.5}`}</style>
        {lanes.map((l, i) => (
          <g key={l}>
            <text x={xs[i]} y={16} textAnchor="middle" className="sq-lane">
              {l.toUpperCase()}
            </text>
            <line x1={xs[i]} y1={28} x2={xs[i]} y2={H - 6} stroke="currentColor" strokeWidth={1} opacity={0.22} />
          </g>
        ))}
        {steps.map((s, i) => {
          const y = 74 + i * 44;
          const n = String(i + 1).padStart(2, "0");
          if ("note" in s) {
            const x = xs[s.at];
            const right = s.at < lanes.length - 1;
            return (
              <g key={i}>
                <circle cx={x} cy={y - 4} r={4} fill="currentColor" />
                <text x={right ? x + 14 : x - 14} y={y} textAnchor={right ? "start" : "end"} className="sq-note">
                  {s.note}
                </text>
                <text x={4} y={y} className="sq-n">
                  {n}
                </text>
              </g>
            );
          }
          const x1 = xs[s.from];
          const x2 = xs[s.to];
          const dir = x2 > x1 ? 1 : -1;
          return (
            <g key={i}>
              <line x1={x1} y1={y} x2={x2 - dir * 2} y2={y} stroke="currentColor" strokeWidth={1.2} strokeDasharray={s.dashed ? "4 4" : undefined} />
              <path d={`M${x2 - dir * 8} ${y - 4.5}L${x2} ${y}L${x2 - dir * 8} ${y + 4.5}`} fill="none" stroke="currentColor" strokeWidth={1.2} />
              <text x={(x1 + x2) / 2} y={y - 8} textAnchor="middle" className="sq-mono">
                {s.label}
              </text>
              <text x={4} y={y + 4} className="sq-n">
                {n}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
