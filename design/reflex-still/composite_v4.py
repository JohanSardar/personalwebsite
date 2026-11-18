"""Deterministic final assembly. No private screenshot is read by this script.
Requires Pillow; all inputs/outputs are in this directory.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont
import math
P=Path(__file__).resolve().parent
L=Image.Resampling.LANCZOS
W,H=1600,900

def save(im,n):
 im=im.convert('RGB');im.save(P/f'v4-{n}.png',optimize=True)
 im.resize((320,180),L).save(P/f'v4-{n}-320.png',optimize=True)

def curve(d,coords,colour,width):
 pts=[]
 for i in range(161):
  t=i/160;s=1-t
  pts.append((sum([s*s*s,3*s*s*t,3*s*t*t,t*t*t][j]*coords[j][0] for j in range(4)),sum([s*s*s,3*s*s*t,3*s*t*t,t*t*t][j]*coords[j][1] for j in range(4))))
 d.line(pts,fill=colour,width=width,joint='curve')

def floating():
 s=2
 photo=Image.open(P/'v4-photo-1.png').convert('RGBA').resize((W*s,H*s),L)
 d=ImageDraw.Draw(photo)
 # Thin parallel rails, behind the app, leading directly from the iPad bezel.
 for off in [0,8]:
  curve(d,[(707*s,(414+off)*s),(764*s,(414+off)*s),(760*s,(371+off)*s),(823*s,(371+off)*s)],'#48565b',4)
 app=Image.open(P/'claude-replica.png').convert('RGBA')
 aw=720*s;ah=round(aw*app.height/app.width);app=app.resize((aw,ah),L)
 x,y=820*s,135*s
 for radius,alpha,dx,dy in [(24,46,6,23),(8,46,0,6)]:
  sh=Image.new('RGBA',photo.size);mask=Image.new('L',photo.size)
  mask.paste(app.getchannel('A').point(lambda a:round(a*alpha/255)),(x+dx*s,y+dy*s))
  sh.putalpha(mask.filter(ImageFilter.GaussianBlur(radius*s)));photo=Image.alpha_composite(photo,sh)
 photo.alpha_composite(app,(x,y))
 return photo.resize((W,H),L)

def solve(a,b):
 a=[list(map(float,row))+[float(v)] for row,v in zip(a,b)]
 n=len(b)
 for i in range(n):
  j=max(range(i,n),key=lambda k:abs(a[k][i]));a[i],a[j]=a[j],a[i]
  v=a[i][i];a[i]=[x/v for x in a[i]]
  for k in range(n):
   if k==i:continue
   v=a[k][i];a[k]=[x-v*y for x,y in zip(a[k],a[i])]
 return [row[-1] for row in a]

def warp_coeffs(quad,size):
 sw,sh=size;rows=[];rhs=[]
 for (x,y),(u,v) in zip(quad,[(0,0),(sw,0),(sw,sh),(0,sh)]):
  rows.extend([[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]]);rhs.extend([u,v])
 return solve(rows,rhs)

def desktop(size,fill):
 sw,sh=size
 out=Image.new('RGBA',size);d=ImageDraw.Draw(out)
 for y in range(sh):
  t=y/sh;v=int(23+11*t);d.line((0,y,sw,y),fill=(v,v+1,v+2,255))
 app=Image.open(P/'claude-replica.png').convert('RGBA')
 ah=round(sh*fill);aw=round(ah*app.width/app.height)
 app=app.resize((aw,ah),L)
 x=(sw-aw)//2;y=(sh-ah)//2
 shadow=Image.new('RGBA',size);mask=Image.new('L',size);mask.paste(app.getchannel('A').point(lambda a:a//2),(x,y+10));shadow.putalpha(mask.filter(ImageFilter.GaussianBlur(18)));out.alpha_composite(shadow);out.alpha_composite(app,(x,y))
 # Low contrast glass reflection and gentle illumination, without blurring text.
 glaze=Image.new('RGBA',size);g=ImageDraw.Draw(glaze)
 for y in range(sh):
  a=round(7*(1-y/sh)**2);g.line((0,y,sw,y),fill=(214,220,230,a))
 out=Image.alpha_composite(out,glaze)
 return out

def screen_photo(n,quad,screen_size,fill):
 s=2;photo=Image.open(P/f'v4-photo-{n}.png').convert('RGBA')
 orig=photo.size;photo=photo.resize((orig[0]*s,orig[1]*s),L)
 if n==2:
  # Correct generated key legends while retaining photographed key edges.
  d=ImageDraw.Draw(photo)
  small=ImageFont.truetype(str(P/'AnthropicSans.ttf'),7*s)
  tiny=ImageFont.truetype(str(P/'AnthropicSans.ttf'),5*s)
  def legend(box,label,pos,font):
   x0,y0,x1,y1=box
   colour=photo.getpixel((round(x0*s),round(y0*s)))
   d.rectangle(tuple(round(v*s) for v in box),fill=colour)
   d.text((pos[0]*s,pos[1]*s),label,font=font,fill='#dedede',anchor='mm')
  legend((880,654,941,667),'caps lock',(905,661),small)
  legend((884,574,909,586),'esc',(896,580),small)
  for idx,(lo,hi) in enumerate([(950,990),(992,1032),(1034,1074),(1076,1116),(1118,1159),(1162,1206),(1208,1250),(1253,1293),(1295,1335),(1337,1378),(1380,1422),(1424,1468)],1):
   cx=(lo+hi)/2
   legend((cx-9,574,cx+9,586),f'F{idx}',(cx,580),tiny)
 q=[(x*s,y*s) for x,y in quad]
 screen=desktop(screen_size,fill)
 coeff=warp_coeffs(q,screen.size)
 warped=screen.transform(photo.size,Image.Transform.PERSPECTIVE,coeff,Image.Resampling.BICUBIC)
 # Only the display interior is replaced. Preserve generated physical bezel.
 mask=Image.new('L',photo.size);d=ImageDraw.Draw(mask);d.polygon(q,fill=255)
 photo=Image.composite(warped,photo,mask)
 return photo.resize((W,H),L)

if __name__=='__main__':
 save(floating(),1)
 # Quadrilaterals are TL, TR, BR, BL, measured in generated 1672x941 sources.
 save(screen_photo(2,[(824,90),(1565,88),(1561,520),(827,521)],(1880,1100),.98),2)
 save(screen_photo(3,[(774,63),(1598,62),(1596,644),(777,645)],(1700,1200),.99),3)
 for n in [1,2,3]:
  im=Image.open(P/f'v4-{n}.png');im.verify()
  assert Image.open(P/f'v4-{n}.png').size==(1600,900)
  assert Image.open(P/f'v4-{n}-320.png').size==(320,180)
 print('PASS: three 1600x900 images and three 320x180 previews, PNG integrity verified.')
