import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";

const text = Newsreader({
  variable: "--font-text",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://johansardar.com"),
  title: { default: "Johan Sardar", template: "%s · Johan Sardar" },
  description: "Johan Sardar studies CS + Math at UIUC and builds software he finds useful.",
};

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={text.variable} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="backdrop" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {children}
      </body>
    </html>
  );
}
