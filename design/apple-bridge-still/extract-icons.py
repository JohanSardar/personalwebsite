#!/usr/bin/env python3
"""Extract the largest original PNG rendition from each app bundle's ICNS."""
from pathlib import Path
import json
import plistlib
import shutil
import struct
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parent
APPS = ['Messages', 'Mail', 'Calendar', 'Notes', 'Reminders', 'Contacts', 'Photos', 'Maps', 'Music', 'Safari']
LOCATIONS = ['/System/Applications', '/Applications', '/System/Volumes/Preboot/Cryptexes/App/System/Applications']
manifest = []
(ROOT / 'icons').mkdir(exist_ok=True)
with tempfile.TemporaryDirectory(prefix='apple-bridge-icons-') as temp:
    for name in APPS:
        app = next(Path(folder) / f'{name}.app' for folder in LOCATIONS if (Path(folder) / f'{name}.app').exists())
        info = plistlib.loads((app / 'Contents/Info.plist').read_bytes())
        filename = info['CFBundleIconFile']
        if not filename.endswith('.icns'):
            filename += '.icns'
        source = app / 'Contents/Resources' / filename
        iconset = Path(temp) / f'{name}.iconset'
        subprocess.run(['iconutil', '-c', 'iconset', str(source), '-o', str(iconset)], check=True)
        def dimensions(path):
            return struct.unpack('>II', path.read_bytes()[16:24])
        largest = max(iconset.glob('*.png'), key=lambda path: dimensions(path)[0])
        dest = ROOT / 'icons' / f'{name.lower()}.png'
        shutil.copyfile(largest, dest)
        width, height = dimensions(dest)
        manifest.append({'app': name, 'source': str(source), 'rendition': largest.name, 'width': width, 'height': height, 'output': str(dest.relative_to(ROOT))})
        print(f'{name}: {largest.name}, {width}x{height}')
(ROOT / 'icons/manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
