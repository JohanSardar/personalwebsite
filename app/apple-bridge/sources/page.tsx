import type { Metadata } from "next";
import PageNav from "@/components/apple-bridge/PageNav";

export const metadata: Metadata = { title: "Sources" };

const sources: [string, string, string][] = [
  ["Messages", "Chats, messages and attachments", "Send, reply, react, edit, unsend, mark read and delete"],
  ["Mail", "Accounts, mailboxes, messages and bodies", "Draft, send, move, flag, mark read and delete"],
  ["Calendar", "Calendars, events and your agenda", "Create, update and delete events, and create calendars"],
  ["Reminders", "Lists and reminders", "Create, update, complete and delete, and manage lists"],
  ["Contacts", "Contacts and groups", "Create, update and delete, and manage groups"],
  ["Notes", "Folders and notes", "Create, update, delete and move, and manage folders"],
  ["Photos", "Search, details and original files, read live from your library", "Favorites and regular albums"],
  ["Files", "Names, search and contents, once you turn it on", "Create, write, move, rename, trash and tag"],
  ["Screen Time", "Time spent per app, per day", "Read only"],
  ["Phone", "Call history, voicemail transcripts and audio", "Read only"],
  ["Voice Memos", "Recordings", "Read only"],
];

export default function Sources() {
  return (
    <>
      <h1 className="title">Sources</h1>
      <p className="lede muted">
        Everything an agent can reach on your Mac. Each source works once you allow its Mac permission, and you can leave
        any of them off.
      </p>

      <h2 id="what-it-can-reach">What it can reach</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Read</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {sources.map(([name, read, change]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{read}</td>
                <td className={change === "Read only" ? "muted" : undefined}>{change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        An agent can also search across Messages, Mail, Notes, Calendar and the rest in one call. Behind the tools are 138
        operations, listed in the{" "}
        <a
          href="https://github.com/JohanSardar/apple-bridge/blob/main/docs/reference/operations.md"
          target="_blank"
          rel="noreferrer"
        >
          operations reference
        </a>
        . Known limits for each source are in{" "}
        <a href="https://github.com/JohanSardar/apple-bridge/blob/main/features.yaml" target="_blank" rel="noreferrer">
          the feature status file
        </a>
        .
      </p>

      <h2 id="answers">Short answers by default</h2>
      <p>
        Agents get small answers that match what a person means. A normal read stays under about 2,000 tokens, so your
        agent keeps room to think.
      </p>
      <ul className="list">
        <li>Lists return 20 items unless the agent asks for more, up to 100, and always say how many exist.</li>
        <li>Unread chats leave out spam and senders who are not in your contacts, and count what they left out.</li>
        <li>Today&apos;s reminders come split into due today, overdue and upcoming.</li>
        <li>A calendar read for one day includes the all-day and multi-day events that cover it.</li>
        <li>The notes list shows titles and a short preview. A full note comes when the agent asks for that note.</li>
      </ul>
      <p>
        <code>bridge stats --answers</code> shows which tools gave the largest answers, as sizes only.
      </p>

      <h2 id="iphone">iPhone</h2>
      <p className="muted">
        An iPhone app adds health, location, alarms and Face ID approvals. It is in internal testing and not available
        yet.
      </p>

      <PageNav href="/apple-bridge/sources" />
    </>
  );
}
