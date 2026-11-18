import { CopyButton } from "./CodeBlock";

export default function Prompt({ text, note }: { text: string; note: string }) {
  return (
    <div className="bd-prompt">
      <div className="bd-prompt-bar">
        <span className="label">Prompt for your agent</span>
        <CopyButton text={text} label="Copy prompt" />
      </div>
      <pre className="bd-prompt-text">{text}</pre>
      <p className="bd-prompt-note">{note}</p>
    </div>
  );
}
