"""Rebuild: PYTHONPATH=design/reflex-still/.deps python3 design/reflex-still/composite.py

Photos: built-in image_gen; terminal, text, and geometric connectors: Pillow.
All composition coordinates are in the final 1600 x 900 image space.
"""
from pathlib import Path
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent
S = 3
SIZE = (1600, 900)
FONT = '/System/Library/Fonts/Menlo.ttc'

def box(coords):
    return tuple(round(v*S) for v in coords)

def font(size):
    return ImageFont.truetype(FONT, round(size*S))

def bezier(a,b,c,d,n=160):
    return [((1-t)**3*a[0]+3*(1-t)**2*t*b[0]+3*(1-t)*t*t*c[0]+t**3*d[0],
             (1-t)**3*a[1]+3*(1-t)**2*t*b[1]+3*(1-t)*t*t*c[1]+t**3*d[1])
            for t in (i/n for i in range(n+1))]

def parallel_lines(im, points):
    # True normal offsets keep the two rails equidistant through every curve.
    draw=ImageDraw.Draw(im)
    for offset in (-7,7):
        rail=[]
        for i,(x,y) in enumerate(points):
            p=points[max(i-1,0)]; q=points[min(i+1,len(points)-1)]
            dx,dy=q[0]-p[0],q[1]-p[1]
            length=math.hypot(dx,dy)
            rail.append((round((x-dy/length*offset)*S),round((y+dx/length*offset)*S)))
        draw.line(rail, fill=(67,67,67,255), width=4*S, joint='curve')

def terminal(im, x,y,w,h, lines):
    shadow=Image.new('RGBA',im.size)
    sd=ImageDraw.Draw(shadow)
    sd.rounded_rectangle(box((x+3,y+20,x+w+3,y+h+20)),radius=20*S,fill=(0,0,0,64))
    im.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(22*S)))
    contact=Image.new('RGBA',im.size)
    ImageDraw.Draw(contact).rounded_rectangle(box((x,y+5,x+w,y+h+5)),radius=19*S,fill=(0,0,0,38))
    im.alpha_composite(contact.filter(ImageFilter.GaussianBlur(5*S)))
    d=ImageDraw.Draw(im)
    d.rounded_rectangle(box((x,y,x+w,y+h)),radius=18*S,fill='#202020',outline='#535353',width=2*S)
    # Rounded top bar, inset so the outer border remains continuous.
    d.rounded_rectangle(box((x+2,y+2,x+w-2,y+61)),radius=16*S,fill='#303030')
    d.rectangle(box((x+2,y+34,x+w-2,y+61)),fill='#303030')
    d.line(box((x+2,y+62,x+w-2,y+62)), fill='#484848',width=S)
    for j,color in enumerate(('#ed6a5e','#f4bf4f','#61c554')):
        cx=x+27+j*27
        d.ellipse(box((cx-7,y+24,cx+7,y+38)),fill=color)
    d.text(box((x+w/2,y+30)), 'claude',font=font(29),fill='#e6e6e6',anchor='mm')
    for j,(text,color) in enumerate(lines):
        d.text(box((x+29,y+94+j*48)),text,font=font(27),fill=color)
    d.rectangle(box((x+29,y+h-43,x+42,y+h-18)),fill='#c5c5c5')

def build(n):
    photo=Image.open(ROOT/f'v2-photo-{n}.png')
    photo=ImageOps.grayscale(photo).convert('RGB').resize(SIZE,Image.Resampling.LANCZOS)
    im=photo.resize((1600*S,900*S),Image.Resampling.LANCZOS).convert('RGBA')
    if n==1:
        parallel_lines(im,[(835,465),(1040,465)])
        terminal(im,1040,320,475,310,[('> move button up','#f1f1f1'),('Canvas received.','#bdbdbd'),('Updating layout...','#bdbdbd')])
    elif n==2:
        # Rounded orthogonal route: horizontal, down, horizontal.
        pts=[(560,418),(603,418)]
        pts+=bezier((603,418),(619,418),(625,424),(625,440))
        pts.append((625,518))
        pts+=bezier((625,518),(625,534),(631,540),(647,540))
        pts.append((721,540))
        parallel_lines(im,pts)
        terminal(im,85,285,475,310,[('> use this sketch','#f1f1f1'),('Canvas received.','#bdbdbd'),('Building view...','#bdbdbd')])
    else:
        pts=bezier((755,449),(937,449),(895,340),(1040,340))
        parallel_lines(im,pts)
        terminal(im,1040,185,475,310,[('> build this UI','#f1f1f1'),('Canvas received.','#bdbdbd'),('Creating view...','#bdbdbd')])
    out=im.convert('RGB').resize(SIZE,Image.Resampling.LANCZOS)
    out.save(ROOT/f'v2-{n}.png')
    out.resize((320,180),Image.Resampling.LANCZOS).save(ROOT/f'v2-{n}-320.png')
    return out

if __name__=='__main__':
    images=[build(n) for n in (1,2,3)]
    sheet=Image.new('RGB',(1600,900*3),'#eeeeee')
    thumbs=Image.new('RGB',(320,180*3),'#eeeeee')
    for i,im in enumerate(images):
        sheet.paste(im,(0,i*900))
        thumbs.paste(im.resize((320,180),Image.Resampling.LANCZOS),(0,i*180))
    sheet.save(ROOT/'review-full.png')
    thumbs.save(ROOT/'review-320.png')
    print('Saved three 1600x900 composites and 320x180 review images.')
