#!/usr/bin/env python3
"""Rebuild the four Apple Bridge stills with original Apple icon PNGs."""
from pathlib import Path
import base64
import math
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[1]
OUT = REPO / 'public/projects/apple-bridge'
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'


def icon(name, x, y, size=184, angle=0):
    # ICNS files on this Mac contain native 256px renditions. Never upscale.
    assert size <= 256
    data = base64.b64encode((ROOT / 'icons' / f'{name}.png').read_bytes()).decode()
    return f'<image href="data:image/png;base64,{data}" x="{x-size/2}" y="{y-size/2}" width="{size}" height="{size}" transform="rotate({angle} {x} {y})"/>'


def text(x, y, words, size=64, fill='var(--ink)', anchor='middle', weight=800, extra=''):
    return f'<text x="{x}" y="{y}" fill="{fill}" text-anchor="{anchor}" font-size="{size}" font-weight="{weight}" {extra}>{words}</text>'


def line(d, stroke='var(--wire)', width=4, extra=''):
    return f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'


def common(dark):
    ink, bg, wire, rim = ('#f0f0ee', '#161717', '#686a6b', '#4c4d4e') if dark else ('#151616', '#e8e9e7', '#a2a5a4', '#c3c6c4')
    return f'''
    <style>
      @font-face{{font-family:Archivo;src:url(archivo-latin.woff2) format('woff2');font-weight:100 900;font-stretch:62% 125%;font-style:normal}}
      *{{box-sizing:border-box}}html,body{{margin:0;width:1600px;height:1000px;overflow:hidden}}
      body{{--ink:{ink};--wire:{wire};--rim:{rim};--paper:{bg};--panel:{'#222424' if dark else '#f6f7f4'};--solid:{'#ededeb' if dark else '#1c1e1e'};--on-solid:{'#171919' if dark else '#f5f5f2'}}}
      svg{{display:block;font-family:Archivo,Arial,sans-serif;font-stretch:120%;font-feature-settings:'ss01'}}
    </style>
    '''


def defs(dark):
    return f'''<defs>
      <radialGradient id="background" cx="43%" cy="35%" r="85%">
        <stop offset="0" stop-color="{'#303232' if dark else '#fafbf8'}"/>
        <stop offset="0.6" stop-color="{'#1b1d1d' if dark else '#e9ebe8'}"/>
        <stop offset="1" stop-color="{'#111313' if dark else '#d8dcd9'}"/>
      </radialGradient>
      <linearGradient id="metal" x1="0" y1="0" x2="0.8" y2="1">
        <stop stop-color="{'#777b7b' if dark else '#ffffff'}"/>
        <stop offset="0.4" stop-color="{'#444747' if dark else '#e9ece9'}"/>
        <stop offset="1" stop-color="{'#292b2b' if dark else '#c6cbc7'}"/>
      </linearGradient>
      <linearGradient id="tile" x1="0" y1="0" x2="0.8" y2="1">
        <stop stop-color="{'#fcfcf7' if dark else '#323535'}"/>
        <stop offset="1" stop-color="{'#d0d4ce' if dark else '#111313'}"/>
      </linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="{'#ffffff' if dark else '#ffffff'}" stop-opacity="{'0.12' if dark else '0.72'}"/>
        <stop offset="1" stop-color="{'#ffffff' if dark else '#ffffff'}" stop-opacity="{'0.035' if dark else '0.20'}"/>
      </linearGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="220%">
        <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000" flood-opacity="{'0.35' if dark else '0.12'}"/>
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.08"/>
      </filter>
      <filter id="dockshadow" x="-20%" y="-50%" width="140%" height="220%">
        <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#000" flood-opacity="{'0.27' if dark else '0.1'}"/>
      </filter>
      <marker id="arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="12" markerHeight="12" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M2 1 L9 6 L2 11" fill="none" stroke="var(--wire)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      </marker>
    </defs>'''


def orbit(dark):
    cx, cy, r = 800, 500, 332
    apps = ['messages', 'mail', 'calendar', 'notes', 'reminders', 'contacts', 'photos', 'safari']
    s = '<circle cx="800" cy="500" r="332" fill="none" stroke="var(--rim)" stroke-width="2" opacity="0.60"/>'
    # A ring of equal-sized icons, with eight arrowheads stopping at the hub rim.
    for i, app in enumerate(apps):
        angle = math.radians(-90+i*45)
        ux, uy = math.cos(angle), math.sin(angle)
        s += line(f'M{cx+ux*(r-72):.2f},{cy+uy*(r-72):.2f} L{cx+ux*142:.2f},{cy+uy*142:.2f}', extra='marker-end="url(#arrow)"')
    s += '<circle cx="800" cy="500" r="138" fill="url(#tile)" stroke="var(--rim)" stroke-width="2" filter="url(#shadow)"/>'
    s += '<circle cx="800" cy="500" r="126" fill="none" stroke="var(--on-solid)" stroke-opacity="0.12" stroke-width="1.5"/>'
    s += text(800, 521, 'AGENT', 51, 'var(--on-solid)', extra='letter-spacing="1"')
    for i, app in enumerate(apps):
        angle = math.radians(-90+i*45)
        s += icon(app, cx+r*math.cos(angle), cy+r*math.sin(angle), 190)
    return s


def bridge(dark):
    positions = [('messages', 350, 170), ('mail', 350, 335), ('calendar', 350, 500), ('notes', 350, 665), ('reminders', 350, 830)]
    s = ''
    # Each lane enters the exact same junction, then one short beam joins the agent.
    for app,x,y in positions:
        start=x+76
        s += line(f'M{start},{y} C650,{y} 650,500 850,500', width=5)
    s += '<rect x="840" y="478" width="192" height="44" rx="22" fill="url(#metal)" stroke="var(--rim)" stroke-width="2"/>'
    s += '<circle cx="856" cy="500" r="9" fill="var(--ink)"/>'
    s += line('M880,500 H1008', stroke='var(--ink)', width=4)
    s += line('M996,489 L1008,500 L996,511', stroke='var(--ink)', width=4)
    s += '<rect x="1014" y="341" width="318" height="318" rx="73" fill="url(#metal)" stroke="var(--rim)" stroke-width="2" filter="url(#shadow)"/>'
    s += '<rect x="1024" y="351" width="298" height="298" rx="64" fill="url(#tile)"/>'
    # A terminal prompt: deliberately generic, so it represents any coding agent.
    s += line('M1112,420 L1150,451 L1112,482 M1170,482 H1213', stroke='var(--on-solid)', width=12)
    s += text(1173, 572, 'AGENT', 51, 'var(--on-solid)', extra='letter-spacing="1.5"')
    for app,x,y in positions:s += icon(app,x,y,190)
    return s


def dock(dark):
    s = '<rect x="133" y="651" width="1334" height="232" rx="65" fill="url(#glass)" stroke="var(--rim)" stroke-width="2" filter="url(#dockshadow)"/>'
    s += '<rect x="145" y="663" width="1310" height="208" rx="55" fill="none" stroke="white" stroke-opacity="0.12" stroke-width="2"/>'
    s += line('M800,649 V500', width=5, extra='marker-end="url(#arrow)"')
    s += '<circle cx="800" cy="650" r="7" fill="var(--wire)"/>'
    s += '<rect x="552" y="143" width="496" height="334" rx="43" fill="url(#metal)" stroke="var(--rim)" stroke-width="2" filter="url(#shadow)"/>'
    s += '<rect x="560" y="151" width="480" height="318" rx="36" fill="url(#tile)"/>'
    for x in [592,618,644]:s += f'<circle cx="{x}" cy="182" r="6" fill="var(--on-solid)" opacity="0.28"/>'
    s += line('M614,239 L658,274 L614,309 M683,309 H731', stroke='var(--on-solid)', width=11)
    s += text(610, 405, 'AGENT', 72, 'var(--on-solid)', anchor='start', extra='letter-spacing="2"')
    for i,app in enumerate(['messages','mail','calendar','notes','reminders','photos','safari']):
        s += icon(app,266+i*178,767,190)
    return s


def wordmark(dark):
    # True, rotated elliptical orbit. Icons stay upright while sitting on the path.
    cx,cy,rx,ry,rotation=800,500,590,292,-14
    s = f'<ellipse cx="800" cy="500" rx="{rx}" ry="{ry}" transform="rotate({rotation} 800 500)" fill="none" stroke="var(--wire)" stroke-width="3"/>'
    s += f'<ellipse cx="800" cy="500" rx="{rx+15}" ry="{ry+15}" transform="rotate({rotation} 800 500)" fill="none" stroke="var(--rim)" stroke-width="1" opacity="0.45"/>'
    s += text(800, 568, 'AGENT', 178, extra='letter-spacing="-5" font-stretch="125%"')
    rot=math.radians(rotation)
    for deg, app in [(-158,'messages'),(-98,'mail'),(-38,'calendar'),(22,'notes'),(82,'photos'),(142,'reminders')]:
        a=math.radians(deg);x=rx*math.cos(a);y=ry*math.sin(a)
        px=cx+x*math.cos(rot)-y*math.sin(rot);py=cy+x*math.sin(rot)+y*math.cos(rot)
        s += icon(app,px,py,210)
    return s


VARIANTS=[orbit,bridge,dock,wordmark]


def write_sources():
    OUT.mkdir(parents=True,exist_ok=True)
    for n,compose in enumerate(VARIANTS,1):
        for dark in [False,True]:
            suffix='-dark' if dark else ''
            svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">{defs(dark)}<rect width="1600" height="1000" fill="url(#background)"/>{compose(dark)}</svg>'
            html=f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Apple Bridge — {compose.__name__}</title>{common(dark)}</head><body>{svg}</body></html>'
            (ROOT/f'still-{n}{suffix}.html').write_text(html)


def render():
    with tempfile.TemporaryDirectory(prefix='apple-bridge-render-') as profile:
        for n in range(1,5):
            for suffix in ['', '-dark']:
                source=ROOT/f'still-{n}{suffix}.html';png=OUT/f'still-{n}{suffix}.png'
                cmd=[CHROME,'--headless','--no-first-run','--no-default-browser-check',f'--user-data-dir={profile}','--hide-scrollbars','--force-device-scale-factor=1','--allow-file-access-from-files','--disable-background-networking','--run-all-compositor-stages-before-draw','--virtual-time-budget=1000',f'--screenshot={png}','--window-size=1600,1000',source.as_uri()]
                result=subprocess.run(cmd,capture_output=True,text=True,timeout=40)
                if result.returncode:raise RuntimeError(result.stderr)
                print(f'Rendered {png.relative_to(REPO)}',flush=True)


if __name__=='__main__':
    write_sources()
    render()
