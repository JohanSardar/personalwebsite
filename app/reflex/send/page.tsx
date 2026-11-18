import type { Metadata } from "next";
import DocPage from "@/components/docs/DocPage";

export const metadata: Metadata = { title: "Draw, Speak and Send" };

export default function Send() {
  return (
    <DocPage slug="send" lede="Put your idea on a board, then send it. Your agent gets the marks, the words and the picture together.">
      <figure className="doc-figure">
        <video src="/projects/reflex.mp4" poster="/projects/reflex-still.jpg" controls muted playsInline preload="none" />
        <figcaption>The 50-second demo. The agent windows in it are recreated for the film.</figcaption>
      </figure>

      <h2>Draw and write</h2>
      <p>A board is an endless canvas. Ink appears under the Apple Pencil the way it does in Apple’s own apps, because Reflex uses Apple’s drawing tools. You can also draw with a finger.</p>
      <p>Besides ink, a board can hold sticky notes, typed text, shapes, tables and images.</p>
      <p>Nothing leaves the iPad while you draw. Reflex does not stream your strokes anywhere.</p>

      <h2>Speak</h2>
      <p>Hold the mic and say what you want. Let go and Reflex sends your words with the board. Speech is turned into text on the iPad.</p>
      <p>Each recording is kept, so you can play it back or send it again.</p>

      <h2>Send</h2>
      <p>
        Tap <strong>Send</strong> when the board shows what you mean. One Send holds these things.
      </p>
      <ul className="dots">
        <li>The strokes you added since the last Send.</li>
        <li>Where those strokes sit on the board.</li>
        <li>Hints about what your handwriting says.</li>
        <li>The words you spoke.</li>
        <li>Images of the visible board, with a margin around it.</li>
      </ul>
      <p>The images include that margin, so look at what sits just outside the screen before you send.</p>

      <h2>Read the answer</h2>
      <p>The answer appears in your agent session on the Mac. Nothing is written back to the board.</p>

      <h2>When the Mac is away</h2>
      <p>A Send made while the Mac is out of reach waits on the iPad. Reflex tries again when the connection returns, and stops when the Mac confirms it has the Send.</p>

      <h2>Good things to send</h2>
      <ul className="dots">
        <li>A screenshot of your app with the broken part circled, plus one spoken sentence about the fix.</li>
        <li>A rough sketch of a screen you want built.</li>
        <li>Sticky notes for each step of a flow, joined by arrows.</li>
        <li>Handwritten maths you want checked.</li>
      </ul>
    </DocPage>
  );
}
