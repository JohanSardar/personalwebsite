"""Rebuild: PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=.deps /opt/homebrew/bin/python3.14 composite_v3.py

Real Claude Code reference: claude-reference.png, captured from running Claude.app.
Icon: largest rendition extracted with iconutil from Claude.app's electron.icns.
Photo, window bounds, connector geometry and shadow match v2-3.
"""
from pathlib import Path
import shutil
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
from composite import S, SIZE, box, bezier, parallel_lines

ROOT = Path(__file__).resolve().parent
FONT = str(ROOT / 'AnthropicSans.ttf')
ORANGE = '#d97757'

def font(size):
    return ImageFont.truetype(FONT, round(size*S))

def app_window(im, light=False):
    x,y,w,h = 1040,185,475,310
    bg,side,chrome,bubble,composer,fg,muted,edge = (
        ('#faf9f5','#f0eee6','#f0eee6','#eeece4','#ffffff','#22221f','#77756e','#d8d5cb') if light else
        ('#191918','#20201f','#20201f','#272726','#30302e','#f4f3ee','#a7a59f','#41413d'))
    shadow=Image.new('RGBA',im.size)
    ImageDraw.Draw(shadow).rounded_rectangle(box((x+3,y+20,x+w+3,y+h+20)),radius=20*S,fill=(0,0,0,64))
    im.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(22*S)))
    contact=Image.new('RGBA',im.size)
    ImageDraw.Draw(contact).rounded_rectangle(box((x,y+5,x+w,y+h+5)),radius=19*S,fill=(0,0,0,38))
    im.alpha_composite(contact.filter(ImageFilter.GaussianBlur(5*S)))
    # Local rendering makes every panel clip cleanly to the native rounded shell.
    panel=Image.new('RGBA',(w*S,h*S),bg)
    d=ImageDraw.Draw(panel)
    def rect(b,fill,r=0,outline=None,width=1):
        d.rounded_rectangle(box(b),radius=r*S,fill=fill,outline=outline,width=round(width*S))
    def line(points,fill=muted,width=1):
        d.line([(round(a*S),round(b*S)) for a,b in points],fill=fill,width=round(width*S),joint='curve')
    def text(px,py,s,size=16,color=None):
        d.text(box((px,py)),s,font=font(size),fill=color or fg,anchor='lt')
    rect((0,0,99,h),side)
    rect((0,0,w,48),chrome)
    line([(99,0),(99,h)],edge)
    line([(99,48),(w,48)],edge)
    for j,c in enumerate(('#ed6a5e','#f4bf4f','#61c554')):
        d.ellipse(box((14+j*17,16,23+j*17,25)),fill=c)
    # Code-mode switch from the real app's top-left toolbar.
    rect((72,10,93,33),composer,5,edge)
    text(75,15,'‹/›',12)
    icon=Image.open(ROOT/'claude-icon-1024.png').convert('RGBA').resize((40*S,40*S),Image.Resampling.LANCZOS)
    panel.alpha_composite(icon,(110*S,4*S))
    text(156,16,'Claude Code',23)
    text(448,15,'···',19,muted)
    # Compact sidebar; session names remain intentionally short.
    text(14,64,'+ New',15)
    d.ellipse(box((16,94,25,103)),outline=muted,width=S)
    line([(24,102),(28,107)])
    text(35,95,'Search',12,muted)
    text(14,133,'SESSIONS',9,muted)
    rect((7,151,93,181),composer,6)
    text(14,161,'Build this UI',12)
    text(14,194,'Canvas sketch',11,muted)
    text(14,218,'New website',11,muted)
    line([(12,274),(87,274)],edge)
    text(14,287,'Local project',10,muted)
    # One user turn and attached drawing, followed by Claude and a tool call.
    rect((139,61,456,126),bubble,11)
    text(153,72,'build this UI',22)
    rect((153,101,236,119),bg,4,edge)
    rect((160,105,170,115),None,1,muted)
    line([(162,108),(168,108)],muted)
    line([(162,112),(166,112)],muted)
    text(177,106,'sketch.png',10,muted)
    text(121,145,'Canvas received.',22)
    text(121,175,'Creating view…',22)
    rect((120,208,454,233),None,5,edge)
    text(130,215,'›_',12,muted)
    text(155,215,'Create  ·  CanvasView',12,muted)
    text(437,215,'›',13,muted)
    rect((117,248,458,291),composer,12,edge)
    text(130,260,'+',22,muted)
    text(157,262,'Reply to Claude…',16,muted)
    rect((425,258,448,281),ORANGE,6)
    line([(436,275),(436,264)],'#faf9f5',2)
    line([(432,268),(436,264),(440,268)],'#faf9f5',2)
    text(331,298,'Opus  ·  Local',9,muted)
    mask=Image.new('L',panel.size)
    ImageDraw.Draw(mask).rounded_rectangle((0,0,w*S-1,h*S-1),radius=18*S,fill=255)
    panel.putalpha(mask)
    im.alpha_composite(panel,(x*S,y*S))
    ImageDraw.Draw(im).rounded_rectangle(box((x,y,x+w,y+h)),radius=18*S,outline=edge,width=S)

def build(n):
    photo=ImageOps.grayscale(Image.open(ROOT/'v2-photo-3.png')).convert('RGB').resize(SIZE,Image.Resampling.LANCZOS)
    im=photo.resize((SIZE[0]*S,SIZE[1]*S),Image.Resampling.LANCZOS).convert('RGBA')
    parallel_lines(im,bezier((755,449),(937,449),(895,340),(1040,340)))
    app_window(im,light=n==2)
    out=im.convert('RGB').resize(SIZE,Image.Resampling.LANCZOS)
    out.save(ROOT/f'v3-{n}.png')
    out.resize((320,180),Image.Resampling.LANCZOS).save(ROOT/f'v3-{n}-320.png')
    return out

if __name__=='__main__':
    # Keep the extracted original rather than resaving or redrawing the icon.
    shutil.copyfile(ROOT/'claude.iconset/icon_512x512@2x.png',ROOT/'claude-icon-1024.png')
    for n in (1,2):
        build(n)
        print(f'v3-{n}.png: 1600x900; v3-{n}-320.png: 320x180')
