# Reflex thumbnail v2

Three 1600 × 900 PNGs, inspected at full resolution and at 320 × 180.

- `v2-1.png`: left iPad, right terminal, straight double connector. Recommended for fastest thumbnail recognition.
- `v2-2.png`: right iPad, left terminal, rounded orthogonal double connector.
- `v2-3.png`: lower-left iPad, upper-right terminal, gently curved double connector.

## Sources

The three `v2-photo-*.png` images were generated with the built-in image_gen tool. Exact prompts are in `prompts.json`. Original earlier `photo-*.png` files are preserved.

`composite.py` converts the photos to grayscale and renders the terminal window, exact monospace text, soft shadows, and parallel connector geometry in Pillow at 3× resolution before downsampling. Only the traffic-light dots have colour. It uses the macOS Menlo font at `/System/Library/Fonts/Menlo.ttc`.

Rebuild from the repository root (Python 3 with Pillow):

```sh
python3 -m pip install --target design/reflex-still/.deps --no-cache-dir Pillow==13.0.0
PYTHONPATH=design/reflex-still/.deps python3 design/reflex-still/composite.py
```

The `v2-*-320.png` files are the actual thumbnail-size checks; `review-320.png` stacks them vertically in version order. `review-full.png` stacks the full-size composites.
