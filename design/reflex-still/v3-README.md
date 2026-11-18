# Reflex thumbnail v3

- `v3-1.png`: dark Claude Code app window; recommended for stronger separation from the photo.
- `v3-2.png`: cream Claude Code app window.
- Each is 1600 × 900, with a corresponding `-320.png` preview at 320 × 180.

## Real app reference

`claude-reference.png` is an actual capture of the running Mac Claude app's Code view. Existing screen recording authorization was checked with `CGPreflightScreenCaptureAccess` before `screencapture -x -o -l 410 claude-reference.png`. No app activation, permission request, or password dialog was used. The reference informed the code toggle, sidebar/session list, user bubble, tool-call row, rounded composer, and warm charcoal theme. The light variant uses the installed bundle's cream palette (`#faf9f5`, visible in its ion-dist/index.html). This is a simplified miniature, with a larger icon and typography for thumbnail recognition.

The real icon was extracted with:

```sh
iconutil -c iconset /Applications/Claude.app/Contents/Resources/electron.icns -o claude.iconset
```

`claude-icon-1024.png` is an unchanged copy of the largest rendition, `claude.iconset/icon_512x512@2x.png`. `AnthropicSans.ttf` is copied from the app's bundled Anthropic Sans Roman variable font. No icon was redrawn. The reference capture contains existing conversation text and is only a local design reference; it is not composited into the deliverables.

## Rebuild

Run from this directory, using the existing Pillow dependency (built for Python 3.14):

```sh
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=.deps /opt/homebrew/bin/python3.14 composite_v3.py
```

The compositor reuses the grayscale `v2-photo-3.png`, exact window bounds (1040, 185, 475, 310), original curved parallel rails, and original two-layer shadow from v2. It imports geometry helpers from `composite.py`; it does not regenerate or modify v2 outputs.

## Validation

The rebuild command completed successfully. All four PNGs passed Pillow's image verification and exact dimension checks. Both full-size images and both actual 320px previews were visually inspected for alignment, clipping, readability, icon recognition, connector continuity, and shadows. No web application code changed, and no application test suite was run.
