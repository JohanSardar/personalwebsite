# Content

Everything the site says lives here.

- `about.txt`: the About Statements on the home page, one per paragraph (blank line between).
- `projects.json`: the Projects, in the order they appear. The first three show on the home page. Each has:
  - `name` and a one-line `description`
  - `repo`: its GitHub repo as `owner/name`
  - `still`: the picture shown at rest, such as `/projects/apple-bridge.jpg`, or `null` for the placeholder
  - `stillDark` (optional): a version of the Still for the dark theme
  - `video`: the clip that plays on hover, such as `/projects/apple-bridge.mp4`, or `null` for none

Put Still and Demo Video files in `public/projects/`. The card area is 16:9, so make both that shape or their edges get cropped. Edit, commit and push to `main`; the site updates itself.
