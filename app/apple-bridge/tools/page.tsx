import type { Metadata } from "next";
import { Fold, Head } from "@/components/apple-bridge/Bits";
import PageNav from "@/components/apple-bridge/PageNav";

export const metadata: Metadata = { title: "Supported tools" };

type Tool = [name: string, what: string, ask?: string];

const groups: { id: string; title: string; about: string; tools: Tool[] }[] = [
  {
    id: "read-and-search",
    title: "Read and search",
    about: "Find what you need across your apps. Answers come back short, with names instead of phone numbers.",
    tools: [
      ["apple_search", "Search Messages, Mail, Notes, Calendar and the rest in one call.", "find anything about the lease renewal"],
      ["messages_read", "Read chats and messages, with names from your contacts.", "who texted me today"],
      ["calendar_events", "Read events for a day or a range, all-day events included.", "what's on my calendar tomorrow"],
      ["contacts_find", "Find a person and their details.", "what's sam's email"],
    ],
  },
  {
    id: "send-and-write",
    title: "Send and write",
    about: "These act right away, unless you set the agent to ask you first.",
    tools: [
      ["messages_send", "Send a message, with photos if you want.", "text sam that i'm running 10 minutes late"],
      ["notes_create", "Write a new note.", "save these meeting notes as a note"],
    ],
  },
  {
    id: "plan-your-time",
    title: "Plan your time",
    about: "Add to your calendar and reminders by name, and see where your time went.",
    tools: [
      ["calendar_add", "Add an event to a calendar by its name.", "add dinner with sam on friday at 7"],
      ["reminders_add", "Add a reminder to a list by its name.", "remind me to call the dentist tomorrow at 10"],
      ["screen_time", "Time spent per app, per day.", "how much time did i spend in slack this week"],
    ],
  },
  {
    id: "photos",
    title: "Photos",
    about: "Photos are read live from your library, so nothing is copied ahead of time.",
    tools: [
      ["photos_find", "Search your photos and see them as a numbered grid.", "find my photos from the beach last summer"],
      ["photos_show", "Show one photo at full size, or save the original.", "show me the third one"],
    ],
  },
  {
    id: "everything-else",
    title: "Everything else",
    about: "General tools reach the other operations, such as mail folders, files, voicemail and editing notes.",
    tools: [
      ["apple_read", "Run any read, such as Mail, Notes, files or voicemail.", "read my last voicemail"],
      ["apple_change", "Run any change, such as moving mail or completing a reminder.", "mark the rent reminder as done"],
      ["apple_describe", "Find the right operation for a request and its exact inputs."],
      ["apple_status", "Check access, which sources are ready and the Mac's time."],
      ["apple_command_status", "Check on a change that is still running."],
      ["apple_guide", "Read the built-in instructions."],
    ],
  },
];

export default function Tools() {
  return (
    <>
      <Head
        title="Supported tools"
        lede="Your agent sees 17 tools. They cover the common requests in one call and reach all 138 operations underneath."
      />

      {groups.map((g) => (
        <section key={g.id}>
          <h2 id={g.id}>{g.title}</h2>
          <p>{g.about}</p>
          <ul className="ab-tools">
            {g.tools.map(([name, what, ask]) => (
              <li key={name}>
                <code>{name}</code>
                <span>{what}</span>
                {ask && <span className="ab-ask-line">&ldquo;{ask}&rdquo;</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2 id="faqs">FAQs</h2>
      <div className="ab-folds">
        <Fold title="Why only 17 tools?">
          <p>
            Listing them costs your agent about 6,000 tokens, so it keeps room for your conversation. The general tools
            still reach every operation.
          </p>
        </Fold>
        <Fold title="How big are the answers?">
          <p>
            A normal read stays under about 2,000 tokens. Lists return 20 items unless the agent asks for more, up to 100,
            and always say how many exist. <code>bridge stats --answers</code> shows which tools gave the largest answers.
          </p>
        </Fold>
        <Fold title="Can I make changes wait for me?">
          <p>
            Yes. Run <code>bridge agents list</code>, then <code>bridge agents update &lt;id&gt; --level approve</code>.
            Each change then waits until you approve it on your Mac.
          </p>
        </Fold>
        <Fold title="Does a read-only agent see the send tools?">
          <p>No. An agent only sees the tools its access allows.</p>
        </Fold>
      </div>

      <PageNav href="/apple-bridge/tools" />
    </>
  );
}
