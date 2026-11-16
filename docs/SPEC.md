# Personal Website: Spec

Status: 2026-11-16, written from the grill.

## 1. Goal

Johan Sardar has no personal site. This is one, at `johansardar.com`: a small, quiet place that says who he is, points at what he has built, and says what he is into. It is for anyone who looks him up. It is deliberately minimal to start.

The feel comes from three references: the minimalism of cognition.com "but bigger", the organisation of adammaj.com, and the look of the figure.ai footer (wide heavy type, numbered rows, frosted glass).

## 2. Principles

- **Minimal first.** Three pages and nothing else. Anything not asked for stays out, so the site can be finished and stay tidy.
- **The look matters as much as the content.** Spacing and motion must be right even while projects are empty, which is why placeholders exist.
- **Content is plain text in the repo.** Changing a statement or adding a project is editing a text file and pushing. No admin screen.
- **Motion is subtle and optional.** People who have reduced motion set on their device get none.

## 3. What it does

### Sidebar

Every page has a left sidebar, like adammaj.com. It holds, top to bottom:

- Johan's name in wide heavy type.
- The Portrait: the supplied photo cropped square, tight around Johan's face, "like my X pfp", as wide as the name above it.
- Links to Home, Projects and Interests.
- A "Find me on" list: X (`@johansardar`), GitHub (`jujdontbudge`), LinkedIn (`johan-sardar-949767209`) and email (`johansardar77@gmail.com`).
- A toggle between light and dark.

There is no footer and no top bar. Pages simply end.

### Home

- Four About Statements:
  - I am currently studying CS + Math at UIUC.
  - I previously built a consumer app that reached over 2,000 users.
  - I love building and designing software that I find useful, both for casual activities like learning, reading and design, and for professional ones like dev tools, sandboxes and authentication.
  - I am from New Jersey.
- Three Project Cards, the three newest Projects. Each leads to the Projects page.

### Projects

A list of Project Cards, the same cards as on the home page, as numbered rows. Each card leads out to that Project's own separate site. Those sites do not exist yet, so the page launches with three Placeholder Projects, visibly labelled as placeholders, that lead nowhere.

### Interests

Three Interest Statements, as plain prose:

- I love cats, big and small.
- I am too much of a music addict; I have had to force myself to quit a couple of times.
- I am into epistemology and understanding what it means to know things. I am always open to new styles of understanding, and to figuring out the best way to transmit and consume knowledge.

### Look

- Light by default, with a toggle for dark.
- Monochrome, no accent colour.
- Wide, heavy grotesque type for the name and headings. Large type and generous spacing.
- Project Cards are tall numbered rectangles (01, 02, 03) standing side by side, left to right.
- The whole window is frosted glass over a soft abstract grey gradient that drifts slowly. There is no inset panel.
- The sidebar and the page scroll together as one piece.

### Motion

- Project Cards react on hover.
- Content fades and slides in piece by piece when a page loads.
- Moving between pages is a smooth transition.
- All of it is off for people with reduced motion set.

### Address

`johansardar.com` is the main address. `www.johansardar.com` redirects to it. Email forwarding already set up on the domain keeps working.

## 4. Scenarios

1. Someone hears Johan's name and opens `johansardar.com`. They see his face in the sidebar, read four lines about him, and see three projects. They click one and land on the Projects page.
2. A visitor wants to reach him. They pick X, GitHub, LinkedIn or email from the sidebar.
3. A visitor on a dark-mode habit flips the toggle and the whole site goes dark.
4. Johan finishes a project. He adds it to the projects text file with its name, description, year and link, pushes, and it appears as the newest card on both pages.

## 5. Acceptance

1. Open `johansardar.com` in a browser: the page shows the Portrait in the sidebar, the four About Statements and three Project Cards, and `www.johansardar.com` lands on the same place.
2. Click a Project Card on the home page and arrive on the Projects page with a smooth transition; hover a card and it reacts.
3. Open Interests and read the three Interest Statements; flip the toggle and the site turns dark.
4. Push a change to `main` and see it live on `johansardar.com` without doing anything else.

## 6. Names

See [GLOSSARY.md](../GLOSSARY.md): Portrait, About Statement, Project, Placeholder Project, Project Card, Interest Statement.

## 7. Stack

- **React with Next.js**, chosen by Johan over Astro ("make it react not astro").
- **Vercel** for hosting, at Johan's request.
- **GitHub**, a new public repo under `jujdontbudge`; every push to `main` goes live.
- **Namecheap** keeps the DNS, so the existing email forwarding is untouched.

## 8. Drafted

Drafted: this shows intent. The architecture decides.

- Pages are pre-built so they arrive with content in place.
- Content files: one for About Statements, one for Interest Statements, one for Projects (name, description, year, link, date).
- Two DNS records at Namecheap as Vercel specifies them: one for the bare domain, one for `www`.

## 9. Not doing

- **Writing or a blog.** "No writing or anything for now."
- **A footer.** The Figure footer is "just the vibe and aesthetic", not a section.
- **Individual project pages.** Each Project lives on its own separate site, built later.
- **Newsletter signup, legal links, tags, search, comments.** Not asked for.
- **An admin screen or CMS.** Content is text files.

## 10. Open questions

- ASSUMED: on a phone, where a sidebar does not fit, it becomes a compact bar at the top with the same links.
- ASSUMED: the square Portrait has slightly rounded corners, to match the rounded panels.
- ASSUMED: Placeholder Projects are labelled "Project one", "Project two", "Project three" with "Coming soon".
- ASSUMED: the wording of the About and Interest Statements above, tidied from Johan's notes.

## 11. Notes from the grill

- The project sites the cards lead to will be created "right after" this site.
- Interests could later grow into separate collections like Adam's Reading or Drawings.
- A Writing section was in the first idea and may come back.
