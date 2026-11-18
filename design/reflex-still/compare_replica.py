from PIL import Image,ImageDraw
from pathlib import Path
P=Path(__file__).resolve().parent
im=Image.open(P/'claude-reference.png').convert('RGB')
d=ImageDraw.Draw(im)
# Fully redact private text before creating any comparison artifact.
d.rectangle((590,18,1050,76),fill='#1f1f1f')
d.rectangle((17,482,534,1510),fill='#1f1f1f')
d.rectangle((30,1520,470,1599),fill='#1f1f1f')
d.rectangle((858,88,2090,180),fill='#252525')
d.rectangle((640,245,2100,1200),fill='#191919')
d.rectangle((597,1320,2132,1418),fill='#191919')
d.rectangle((680,1440,1990,1510),fill='#303030')
a=im.resize((813,600),Image.Resampling.LANCZOS)
b=Image.open(P/'claude-replica.png').convert('RGB').resize((813,600),Image.Resampling.LANCZOS)
out=Image.new('RGB',(1646,628),'#ddd8cf');out.paste(a,(0,28));out.paste(b,(833,28));d=ImageDraw.Draw(out);d.text((12,8),'Reference structure (private text fully redacted)',fill='black');d.text((845,8),'Sanitized replica: all text invented',fill='black');out.save(P/'claude-structure-comparison.png')
print('Saved fully redacted structure comparison.')
