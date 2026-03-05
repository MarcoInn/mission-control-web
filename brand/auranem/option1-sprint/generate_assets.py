# Regenerates Option 1 static assets (requires Pillow in local venv)
# Run: /home/marco/.openclaw/workspace/.venv/bin/python generate_assets.py

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, textwrap

out_dir=os.path.dirname(__file__)
font_paths=['/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']
regular=ImageFont.truetype(font_paths[0], 42)
bold=ImageFont.truetype(font_paths[1], 58)
small=ImageFont.truetype(font_paths[0], 30)

jar=Image.new('RGBA',(900,1200),(0,0,0,0)); d=ImageDraw.Draw(jar)
d.ellipse((180,1030,720,1150), fill=(0,0,0,45))
d.rounded_rectangle((220,240,680,1020), radius=80, fill=(245,238,222,255), outline=(210,200,180,255), width=6)
for i in range(460):
    d.rectangle((260+i//8,260,280+i//8,1000), fill=(255,255,255,max(0,80-int(i*0.22))))
d.rounded_rectangle((200,120,700,300), radius=70, fill=(252,252,252,255), outline=(220,220,220,255), width=6)
for y in range(120,300,8): d.line((220,y,680,y), fill=(232,232,232,140), width=1)
d.rounded_rectangle((255,430,645,860), radius=35, fill=(255,255,255,240), outline=(220,220,205,255), width=3)
d.text((305,485),'AURANEM', font=ImageFont.truetype(font_paths[1],68), fill=(38,47,42,255))
d.text((318,575),'NATURAL DAILY', font=ImageFont.truetype(font_paths[0],34), fill=(84,97,88,255))
d.text((337,620),'BALANCE', font=ImageFont.truetype(font_paths[0],34), fill=(84,97,88,255))
for i in range(3):
    x=325+i*90; d.rounded_rectangle((x,700,x+55,730), radius=20, fill=(188,214,191,255), outline=(120,140,122,255), width=2)
d.text((350,770),'60 CAPS', font=ImageFont.truetype(font_paths[1],42), fill=(50,60,54,255))
jar=jar.filter(ImageFilter.GaussianBlur(0.2)); jar.save(os.path.join(out_dir,'auranem_jar.png'))

def gradient_bg(w,h,c1,c2):
    img=Image.new('RGB',(w,h)); p=img.load()
    for y in range(h):
        t=y/(h-1)
        for x in range(w): p[x,y]=(int(c1[0]*(1-t)+c2[0]*t),int(c1[1]*(1-t)+c2[1]*t),int(c1[2]*(1-t)+c2[2]*t))
    return img

def compose(name,size,headline,sub,cta,jar_scale,jar_pos,angle):
    w,h=size
    bg=gradient_bg(w,h,(242,236,224),(221,232,220)).convert('RGBA')
    d=ImageDraw.Draw(bg)
    d.ellipse((-180,h*0.62,w*0.56,h*1.18), fill=(201,220,196,160))
    d.ellipse((w*0.35,-140,w*1.18,h*0.5), fill=(234,224,205,120))
    margin=int(w*0.08)
    d.text((margin,int(h*0.12)),'\n'.join(textwrap.wrap(headline,width=18 if w<1200 else 24)),font=bold,fill=(28,37,33,255),spacing=8)
    d.text((margin,int(h*0.12)+(200 if h>1200 else 160)),sub,font=regular,fill=(67,78,72,255))
    by=h-int(h*0.18); bw=int(w*0.42)
    d.rounded_rectangle((margin,by,margin+bw,by+82),radius=36,fill=(41,69,52,255))
    d.text((margin+34,by+20),cta,font=small,fill=(242,247,243,255))
    d.text((margin,by+102),'Food supplement • Read label before use',font=ImageFont.truetype(font_paths[0],24),fill=(78,89,83,255))
    j=jar.copy(); th=int(h*jar_scale); tw=int(j.width*th/j.height); j=j.resize((tw,th),Image.Resampling.LANCZOS)
    if angle=='left': j=j.rotate(6,expand=True,resample=Image.Resampling.BICUBIC)
    if angle=='right': j=j.rotate(-7,expand=True,resample=Image.Resampling.BICUBIC)
    bg.alpha_composite(j,(int(w*jar_pos[0]-j.width/2),int(h*jar_pos[1]-j.height/2)))
    bg.convert('RGB').save(os.path.join(out_dir,name),quality=95)

compose('hero_1080x1350.jpg',(1080,1350),'Natural focus for modern days','Premium botanical formula crafted for daily wellbeing.','Discover AURANEM',0.67,(0.69,0.59),'center')
compose('hero_1920x1080.jpg',(1920,1080),'Find your balanced rhythm','Plant-based daily support with clean, premium ingredients.','Shop the ritual',0.77,(0.76,0.58),'center')
compose('ad_static_A_1080x1350.jpg',(1080,1350),'Your calm starts here','A premium natural supplement made to fit your routine.','Start today',0.66,(0.71,0.61),'left')
compose('ad_static_B_1080x1350.jpg',(1080,1350),'Upgrade your daily ritual','Elegant nutrition support for everyday performance.','Feel the difference',0.62,(0.35,0.63),'right')
compose('story_1080x1920.jpg',(1080,1920),'Feel clear. Stay grounded.','AURANEM blends nature and quality in one daily ritual.','Swipe up to explore',0.70,(0.68,0.58),'left')
compose('reel_cover_1080x1920.jpg',(1080,1920),'From morning rush to evening calm','Clean-label capsules for a mindful daily routine.','Watch the routine',0.72,(0.67,0.57),'right')
