import type { Metadata } from "next";
import Code from "@/components/docs/Code";
import PageNav from "@/components/docs/PageNav";

export const metadata: Metadata = { title: "Troubleshooting" };

export default function Troubleshooting() {
  return (
    <>
      <h1 className="title">Troubleshooting</h1>
      <p className="lede muted">
        Every error says what went wrong and what to do next. When that isn&apos;t enough, start with these
        commands.
      </p>

      <h2 id="first-checks">First checks</h2>
      <Code>{`bridge status --json             # is Apple Bridge running and healthy
bridge permissions status --json # which Mac permissions are on
bridge doctor                    # this Mac's data, files and credentials`}</Code>
      <p>None of them ask macOS for anything or change a setting.</p>

      <h2 id="not-running">&ldquo;Apple Bridge isn&apos;t running on this Mac&rdquo;</h2>
      <p>
        Run <code>bridge up</code>. It stops after a restart or logout unless the Apple Bridge app starts it at login.
      </p>

      <h2 id="no-tools">The agent doesn&apos;t see the tools</h2>
      <p>
        Most agents read their MCP settings when they start. Restart the agent or reload its MCP settings after{" "}
        <code>bridge link</code>. The Claude app needs to be quit and opened again.
      </p>

      <h2 id="old-connector">An old connector keeps failing</h2>
      <p>
        Earlier versions offered a public address that no longer exists. Don&apos;t repair an old Apple Bridge connector.
        Remove it from the agent and connect again from <a href="/apple-bridge/setup">Setup</a>.
      </p>

      <h2 id="source-empty">A source shows nothing</h2>
      <ul className="list">
        <li>
          It needs its Mac permission. Run <code>bridge permissions guide</code>.
        </li>
        <li>Reminders also needs Calendar.</li>
        <li>Mail needs an account on this Mac that has downloaded its mail.</li>
        <li>
          If you clicked Don&apos;t Allow, macOS won&apos;t ask again. Switch Apple Bridge on in System Settings under
          Privacy &amp; Security, then run <code>bridge down</code> and <code>bridge up</code>.
        </li>
      </ul>

      <h2 id="first-sync">The first sync is slow</h2>
      <p>
        A large Mac can take a few minutes. <code>bridge stats --wait</code> shows each source as it finishes.
      </p>

      <h2 id="still-stuck">Still stuck</h2>
      <p>
        <a href="https://github.com/JohanSardar/apple-bridge/issues" target="_blank" rel="noreferrer">
          Open an issue on GitHub
        </a>{" "}
        with what you ran and the error. Leave out anything private.
      </p>

      <PageNav href="/apple-bridge/troubleshooting" />
    </>
  );
}
