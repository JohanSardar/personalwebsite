# Personal Website: Spec

Status: 2026-11-16, written from the grill.

## 1. Goal

Johan Sardar has no personal site. This is one, at `johansardar.com`: a small, quiet place that says who he is and points at what he has built. It is for anyone who looks him up. It is deliberately minimal to start.

The feel comes from these references: the minimalism of cognition.com, the organisation and text size of adammaj.com, the look of the figure.ai footer (wide heavy type, frosted glass), and for projects a mix of vercel.com/labs (minimal cells with a GitHub link) and charm.land (a moving preview).

## 2. Principles

- **Minimal first.** Two pages and nothing else. Anything not asked for stays out, so the site can be finished and stay tidy.
- **The look matters as much as the content.** Spacing and motion must be right even while projects are empty, which is why placeholders exist.
- **Content is plain text in the repo.** Changing a statement or adding a project is editing a text file and pushing. No admin screen.
- **Motion is subtle and optional.** People who have reduced motion set on their device get none.

## 3. What it does

### Sidebar

Every page has a left sidebar, like adammaj.com. It holds, top to bottom:

- Johan's name in wide heavy type.
- The Portrait: the supplied photo cropped square, tight around Johan's face, "like my X pfp", as wide as the name above it.
- Links to Home and Projects.
- A "Links" list: X (`@johansardar`), GitHub (`JohanSardar`), LinkedIn (`johan-sardar-949767209`) and email (`johansardar77@gmail.com`).
- A toggle between light and dark.

There is no footer and no top bar. Pages simply end.

### Home

- An "About me" heading over four About Statements:
  - I'm studying CS + Math at the University of Illinois Urbana-Champaign.
  - I grew up in suburban New Jersey.
  - I previously built a consumer app that grew to over 2,000 users.
  - I love designing and building software I'd see myself and others using, such as learning, design and productivity tools, as well as dev tools, sandbox environments and verification tools.
- A "Projects" heading over the first three Project Cards, with a link to all projects.

### Projects

All five Projects as Project Cards, in this order: Apple Bridge, Reflex, BOGO, Hyperthymesia, Phoenix. The home page shows the first three.

Each Project Card holds, top to bottom:

- The Still, a picture chosen for the card. It need not be a frame of the video.
- The name and a one-line description.
- At the bottom, the GitHub mark and the repo path, such as `JohanSardar/apple-bridge`.

Hovering a card starts its Demo Video, silent and looping, in place of the Still. When the pointer leaves, the video stops and the Still comes back. On a touch screen the video plays while the card is on screen. Clicking anywhere on a card opens its GitHub repo.

Apple Bridge and Reflex have a Still and a Demo Video. The other three show the Placeholder and nothing plays.

The descriptions:

- Apple Bridge: Your Mac's Messages, Mail, Calendar and Notes for coding agents.
- Hyperthymesia: An exact replica of every day, built from what your devices observe.
- BOGO: Verification before tool use for agents.
- Reflex: An iPad canvas that connects to any harness via MCP.
- Phoenix: Record an agent run, then replay any moment of it in a sandbox.

### Apple Bridge docs

Added 2026-11-18 at Johan's request. `/apple-bridge` holds the Apple Bridge docs in this site's look, organised like Notion's MCP docs. A docs sidebar with expandable sections replaces the site sidebar, and wide screens show an "On this page" list. Pages are Overview, Connect (with Other computers), Supported tools, Sources, Privacy and security, and CLI reference. Overview and Connect lead with one setup prompt to copy into an agent. The words avoid dashes, colons in prose and stock AI phrases. It may later move to `applebridge.johansardar.com`.

### Look

- Light by default, with a toggle for dark.
- Monochrome, no accent colour.
- Wide, heavy grotesque type for the name and headings. Body text is small, "more like Adam's site".
- Project Cards are open cells, three across, split by thin lines, with no boxes and no logos.
- The whole window is frosted glass over a soft abstract grey gradient that drifts slowly. There is no inset panel.
- The sidebar and the page scroll together as one piece.

### Motion

- A Project Card's Demo Video plays while the pointer is over it.
- Content fades and slides in piece by piece when a page loads.
- Moving between pages is a smooth transition.
- All of it is off for people with reduced motion set.

### Address

`johansardar.com` is the main address. `www.johansardar.com` redirects to it. Email forwarding already set up on the domain keeps working.

## 4. Scenarios

1. Someone hears Johan's name and opens `johansardar.com`. They see his face in the sidebar, read four lines about him, and see three projects. They hover one to watch it, and click it to open its GitHub repo.
2. A visitor wants to reach him. They pick X, GitHub, LinkedIn or email from the Links list in the sidebar.
3. A visitor on a dark-mode habit flips the toggle and the whole site goes dark.
4. Johan finishes a project. He adds it to the projects text file with its name, description and repo, drops in a Still and a Demo Video, pushes, and it appears on the site.

## 5. Acceptance

1. Open `johansardar.com` in a browser: the page shows the Portrait in the sidebar, the four About Statements and three Project Cards, and `www.johansardar.com` lands on the same place.
2. Click a Project Card and its GitHub repo opens. Once a Project has a Demo Video, hover its card and the video plays, then the Still returns when the pointer leaves.
3. Flip the toggle and the site turns dark.
4. Push a change to `main` and see it live on `johansardar.com` without doing anything else.

## 6. Names

See [GLOSSARY.md](../GLOSSARY.md): Portrait, About Statement, Project, Project Card, Still, Demo Video, Placeholder.

## 7. Stack

- **React with Next.js**, chosen by Johan over Astro ("make it react not astro").
- **Vercel** for hosting, at Johan's request.
- **GitHub**, a public repo under Johan's original account `JohanSardar`; every push to `main` goes live.
- **Namecheap** keeps the DNS, so the existing email forwarding is untouched.

## 8. Drafted

Drafted: this shows intent. The architecture decides.

- Pages are pre-built so they arrive with content in place.
- Content files: one for About Statements, one for Projects (name, description, repo, Still, Demo Video).
- Two DNS records at Namecheap as Vercel specifies them: one for the bare domain, one for `www`.

## 9. Not doing

- **An Interests page.** Built first, then removed at Johan's request.
- **Writing or a blog.** "No writing or anything for now."
- **A footer.** The Figure footer is "just the vibe and aesthetic", not a section.
- **Individual project pages or project sites.** Each Project points at its GitHub repo for now.
- **Project logos and star counts.** "No logos for now."
- **Newsletter signup, legal links, tags, search, comments.** Not asked for.
- **An admin screen or CMS.** Content is text files.

## 10. Open questions

- ASSUMED: on a phone, where a sidebar does not fit, it becomes a compact bar at the top with the same links.
- ASSUMED: the square Portrait has slightly rounded corners, to match the rounded panels.
- ASSUMED: the Placeholder is a plain grey block reading "Preview soon".

## 11. Notes from the grill

- Phoenix and BOGO were being transferred to `JohanSardar` during the grill; their cards link there already.
- A Writing section was in the first idea and may come back.
