#!/usr/bin/env python3
"""Render both themes at actual 320px and 420px card widths for visual QA."""
from pathlib import Path
import subprocess
import tempfile
ROOT = Path(__file__).resolve().parent
OUT = ROOT.parents[1] / 'public/projects/apple-bridge'
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
names = ['Radial hub', 'Converging bridge', 'Mac dock', 'Typographic orbit']
for size in [320, 420]:
    rows = []
    for n, name in enumerate(names, 1):
        cells = []
        for suffix, theme in [('', 'light'), ('-dark', 'dark')]:
            cells.append(f'''<section class="{theme}"><p class="caption">0{n} · {name} · {theme}</p><img src="{(OUT/f'still-{n}{suffix}.png').as_uri()}" width="{size}" height="{size*10//16}"><h2>Apple Bridge</h2><p>Your Mac's Messages, Mail, Calendar and Notes for coding agents.</p></section>''')
        rows.append(''.join(cells))
    html = f'''<!doctype html><html><head><meta charset="utf-8"><style>@font-face{{font-family:Archivo;src:url(archivo-latin.woff2);font-weight:100 900;font-stretch:62% 125%}}*{{box-sizing:border-box}}html,body{{margin:0}}body{{display:grid;grid-template-columns:repeat(2,{size+40}px);font:14px Archivo,Arial}}section{{padding:20px;min-width:0}}.light{{background:#ebebea;color:#111}}.dark{{background:#171818;color:#f2f2f2}}img{{display:block;border-radius:8px;object-fit:cover}}h2{{font-size:18px;font-weight:600;font-stretch:112%;line-height:1.2;margin:20px 0 4px}}p{{max-width:{size}px;font-size:14px;line-height:1.45;margin:0;opacity:.6}}p.caption{{font-size:12px;font-weight:600;opacity:1;margin:0 0 14px}}</style></head><body>{''.join(rows)}</body></html>'''
    source = ROOT / f'review-{size}.html'
    source.write_text(html)
    with tempfile.TemporaryDirectory(prefix='apple-bridge-qa-') as profile:
        cmd=[CHROME,'--headless','--no-first-run','--no-default-browser-check',f'--user-data-dir={profile}','--hide-scrollbars','--force-device-scale-factor=1','--allow-file-access-from-files','--virtual-time-budget=1000',f'--screenshot={ROOT/f"review-{size}.png"}',f'--window-size={(size+40)*2},{1450 if size==320 else 1700}',source.as_uri()]
        subprocess.run(cmd,check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=40)
    print(f'Reviewed at {size}px: {ROOT/f"review-{size}.png"}',flush=True)
