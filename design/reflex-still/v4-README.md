# Reflex thumbnail v4

Three 1600 × 900 natural colour images, each with a `-320.png` preview at 320 × 180.

- `v4-1.png`: iPad with complex three-screen sketch, a 720px-wide floating Claude window (45% of the image width), soft shadow and two parallel connector lines.
- `v4-2.png`: coherent iPad / MacBook desk photograph. The display is replaced with the crisp sanitized replica using a measured perspective transform. The exact replica proportions are preserved, with a narrow neutral desktop around the window. Generated keyboard legends were corrected in the deterministic compositor.
- `v4-3.png`: iPad beside a large desktop Mac display. Recommended: the larger screen makes the real app structure easier to recognise at thumbnail size, while retaining a natural photographic scene.

## Privacy

`claude-reference.png` remains an input for local structural inspection only. It was never supplied to image generation or read by the final compositor. All replica text is invented. No personal names, private project/session names, private messages, named account row or usage banner appear in the deliverables. The account area uses a neutral symbol and “Personal workspace”. `claude-structure-comparison.png` shows the reference with private text fully removed, beside the sanitized replica. The comparison is an internal QA artifact and is not used in the final images.

## Reproduction

The reference is 2168 × 1600 pixels. `claude-replica.html` reproduces a 1084 × 800 CSS-pixel window, rendered at 2× into `claude-replica.png` (2168 × 1600). It uses the supplied variable Anthropic Sans font, sampled charcoal colours, measured 280px sidebar and 44px toolbar, and locally traced SVG icons. `replica-icons.json` records the SVG paths.

From this directory:

```sh
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=.deps /opt/homebrew/bin/python3.14 build_replica.py
./render-replica.sh
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=.deps /opt/homebrew/bin/python3.14 compare_replica.py
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=.deps /opt/homebrew/bin/python3.14 composite_v4.py
```

The built-in image generation tool created the colour photographs. The complete generation and revision prompts are saved in `v4-generation-prompts.json`. Re-running generation is stochastic; the saved `v4-photo-1.png`, `v4-photo-2.png`, and `v4-photo-3.png` make final assembly deterministic. Only sanitized `claude-replica.png` was supplied as a UI reference. The compositor works at 2×, projects the window onto measured screen corners, adds subtle display glass illumination and exports exact dimensions. It never reads the private capture.

Chrome renders headlessly using a profile inside this folder. No macOS approval dialog or password request is used.

## Verification

Executed the reproduction commands above. Python source parsed successfully with `ast.parse`; saved generation prompts passed `json.load`. Pillow verified all final PNGs and asserted the exact 1600 × 900 / 320 × 180 dimensions. Each final was visually inspected at full size and 320px for hand/pencil contact, rich sketch, screen perspective, crisp safe UI, clear margins and connector alignment. The replica was compared side by side with the privacy-redacted reference, and iterated for toolbar alignment, variable font weight and sidebar spacing. The first laptop photo was revised to give the devices more margin; the first floating-window photo was reframed to give the connector room.

No website runtime files changed, and no app test suite was run. No commit or push was made.
