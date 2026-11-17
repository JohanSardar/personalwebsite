# Apple Bridge project-card stills

Four compositions, each exported in light and dark treatments. All eight final PNGs are exactly **1600 × 1000**, matching the existing 16:10 card without cropping.

| Variation | Idea | Small-card assessment |
| --- | --- | --- |
| 1 · Radial hub | Eight original Apple app icons in a precise circle, each pointing into an AGENT disc. | Closest to the original request. App silhouettes remain recognizable at 320px; the centre label is the smallest of the four. The dark version reverses the central disc for contrast. |
| 2 · Converging bridge | Five app lanes merge into one physical bridge leading to a terminal-style agent tile. | The directional flow reads immediately. Terminal and app icons remain clear at 320px; the AGENT label is secondary. Dark treatment preserves the same hierarchy. |
| 3 · Mac dock | A frosted macOS-style dock connects upward to a floating agent terminal. | Familiar Mac silhouette, orderly icon row, and larger agent label. The dark version uses smoked glass and a pale terminal. |
| 4 · Typographic orbit | Six apps orbit a large expanded Archivo AGENT wordmark. | Strongest at 320px and closest to the site's typography. The dark version uses an off-white wordmark on charcoal. Recommended. |

## Files

Finals live in `../../public/projects/apple-bridge/still-1.png` through `still-4.png`, with corresponding `-dark.png` files.

- `still-N.html` / `still-N-dark.html`: self-contained SVG compositions embedded in HTML, with original icon data embedded; Archivo loads from the adjacent font file.
- `icons/*.png`: original Apple app icons, extracted from the local app bundles.
- `icons/manifest.json`: exact bundle source, native rendition, and pixel dimensions for every icon.
- `archivo-latin.woff2`: the existing site's Archivo variable font copied from its Next build assets.
- `review-320.png` / `review-420.png`: visual QA sheets of all eight images in card context, including rounded corners and both backgrounds.

## Icon extraction

All ten requested apps were successfully extracted: Messages, Mail, Calendar, Notes, Reminders, Contacts, Photos, Maps, Music, Safari. No approximations or substitutes were used. Each bundle's ICNS on this Mac tops out at the native **256 × 256** rendition (`icon_128x128@2x.png`). `iconutil` confirmed those dimensions. Compositions display icons at 190–210 pixels on the 1600px canvas, so no original icon is enlarged. Maps and Music are retained as source assets but are not needed in the final compositions.

## Rebuild

Run from any directory:

```sh
python3 /Users/johansardar/.t3/projects/personalwebsite-2/design/apple-bridge-still/extract-icons.py
python3 /Users/johansardar/.t3/projects/personalwebsite-2/design/apple-bridge-still/build.py
python3 /Users/johansardar/.t3/projects/personalwebsite-2/design/apple-bridge-still/review.py
```

Rendering uses installed headless Google Chrome with an isolated temporary profile, device scale factor 1, and a 1600 × 1000 viewport. No app server is required.

## Verification

- Visually inspected all ten source icons.
- Visually inspected all four compositions in both treatments, then adjusted hub type spacing and removed crossed bridge connectors.
- Visually inspected final 320px and 420px card QA sheets in light and dark contexts.
- Checked all eight final PNG signatures and IHDR dimensions: 1600 × 1000, 16:10.
- Checked that the only additions are inside the two requested asset directories. No application content, components, or styles were edited; no commit, push, or deployment was made.

This is an asset-only delivery. Application lint/build/test suites were not run; no application code changed.
