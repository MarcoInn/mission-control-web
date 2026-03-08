from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, textwrap, subprocess

BASE = os.path.dirname(__file__)
F_REG = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

PALETTE = {
    'bg_top': (245, 239, 227),
    'bg_bottom': (223, 233, 220),
    'text': (30, 40, 35),
    'sub': (72, 84, 77),
    'cta': (45, 84, 63),
    'cta_text': (244, 248, 244),
    'leaf': (191, 216, 194),
}


def gradient_bg(w, h):
    img = Image.new('RGB', (w, h))
    p = img.load()
    c1, c2 = PALETTE['bg_top'], PALETTE['bg_bottom']
    for y in range(h):
        t = y / (h - 1)
        row = (
            int(c1[0] * (1 - t) + c2[0] * t),
            int(c1[1] * (1 - t) + c2[1] * t),
            int(c1[2] * (1 - t) + c2[2] * t),
        )
        for x in range(w):
            p[x, y] = row
    return img.convert('RGBA')


def make_jar(path):
    jar = Image.new('RGBA', (940, 1260), (0, 0, 0, 0))
    d = ImageDraw.Draw(jar)
    d.ellipse((170, 1090, 770, 1210), fill=(0, 0, 0, 45))

    # Body
    d.rounded_rectangle((230, 270, 710, 1070), radius=82, fill=(244, 236, 220, 255), outline=(206, 196, 178, 255), width=6)
    # soft gloss
    for i in range(500):
        d.rectangle((275 + i // 9, 300, 295 + i // 9, 1040), fill=(255, 255, 255, max(0, 75 - int(i * 0.18))))

    # White lid (important requirement)
    d.rounded_rectangle((210, 140, 730, 330), radius=72, fill=(252, 252, 252, 255), outline=(219, 219, 219, 255), width=6)
    for y in range(140, 330, 9):
        d.line((235, y, 705, y), fill=(232, 232, 232, 130), width=1)

    # Label
    d.rounded_rectangle((267, 465, 673, 900), radius=36, fill=(255, 255, 255, 242), outline=(221, 220, 205, 255), width=3)
    d.text((309, 520), 'AURANEM', font=ImageFont.truetype(F_BOLD, 70), fill=(36, 46, 41, 255))
    d.text((322, 610), 'NATURAL DAILY', font=ImageFont.truetype(F_REG, 33), fill=(84, 96, 89, 255))
    d.text((344, 653), 'BALANCE', font=ImageFont.truetype(F_REG, 33), fill=(84, 96, 89, 255))

    for i in range(3):
        x = 332 + i * 88
        d.rounded_rectangle((x, 734, x + 52, 763), radius=20, fill=(188, 214, 191, 255), outline=(121, 142, 123, 255), width=2)

    # realistic capsule count proportion text
    d.text((350, 804), '60 CAPS', font=ImageFont.truetype(F_BOLD, 44), fill=(50, 62, 55, 255))
    jar = jar.filter(ImageFilter.GaussianBlur(0.2))
    jar.save(path)


def compose_static(path, size, headline, subline, cta, jar_xy=(0.70, 0.60), jar_scale=0.66, angle=0):
    w, h = size
    bg = gradient_bg(w, h)
    d = ImageDraw.Draw(bg)

    # soft organic shapes
    d.ellipse((-220, int(h * 0.62), int(w * 0.58), int(h * 1.20)), fill=(201, 220, 196, 165))
    d.ellipse((int(w * 0.34), -160, int(w * 1.22), int(h * 0.50)), fill=(234, 224, 205, 120))

    title_f = ImageFont.truetype(F_BOLD, 66 if w == 1080 else 58)
    sub_f = ImageFont.truetype(F_REG, 37 if w == 1080 else 34)
    cta_f = ImageFont.truetype(F_REG, 32)
    legal_f = ImageFont.truetype(F_REG, 24)

    margin = int(w * 0.08)
    wrapped = '\n'.join(textwrap.wrap(headline, width=19))
    d.text((margin, int(h * 0.11)), wrapped, font=title_f, fill=PALETTE['text'], spacing=8)
    d.text((margin, int(h * 0.37)), subline, font=sub_f, fill=PALETTE['sub'])

    by = h - int(h * 0.19)
    bw = int(w * 0.44)
    d.rounded_rectangle((margin, by, margin + bw, by + 84), radius=38, fill=PALETTE['cta'])
    d.text((margin + 34, by + 22), cta, font=cta_f, fill=PALETTE['cta_text'])
    d.text((margin, by + 106), 'Food supplement • Read label before use', font=legal_f, fill=(80, 92, 85, 255))

    jar = Image.open(os.path.join(BASE, 'auranem_product_master.png')).convert('RGBA')
    target_h = int(h * jar_scale)
    target_w = int(jar.width * target_h / jar.height)
    jar = jar.resize((target_w, target_h), Image.Resampling.LANCZOS)
    if angle:
        jar = jar.rotate(angle, expand=True, resample=Image.Resampling.BICUBIC)

    bg.alpha_composite(jar, (int(w * jar_xy[0] - jar.width / 2), int(h * jar_xy[1] - jar.height / 2)))
    bg.convert('RGB').save(path, quality=96)


def compose_story_frame(path, headline, sub, cta, jar_xy=(0.5, 0.60), jar_scale=0.58, angle=0):
    w, h = 1080, 1920
    bg = gradient_bg(w, h)
    d = ImageDraw.Draw(bg)
    d.ellipse((-180, int(h * 0.62), int(w * 0.54), int(h * 1.15)), fill=(201, 220, 196, 160))
    d.ellipse((int(w * 0.38), -180, int(w * 1.18), int(h * 0.44)), fill=(234, 224, 205, 120))

    title_f = ImageFont.truetype(F_BOLD, 78)
    sub_f = ImageFont.truetype(F_REG, 42)
    cta_f = ImageFont.truetype(F_REG, 36)
    legal_f = ImageFont.truetype(F_REG, 26)

    d.text((92, 160), '\n'.join(textwrap.wrap(headline, width=15)), font=title_f, fill=PALETTE['text'], spacing=10)
    d.text((92, 560), sub, font=sub_f, fill=PALETTE['sub'])

    by = 1640
    d.rounded_rectangle((92, by, 620, by + 98), radius=44, fill=PALETTE['cta'])
    d.text((128, by + 28), cta, font=cta_f, fill=PALETTE['cta_text'])
    d.text((92, by + 124), 'Food supplement • Read label before use', font=legal_f, fill=(80, 92, 85, 255))

    jar = Image.open(os.path.join(BASE, 'auranem_product_master.png')).convert('RGBA')
    th = int(h * jar_scale)
    tw = int(jar.width * th / jar.height)
    jar = jar.resize((tw, th), Image.Resampling.LANCZOS)
    if angle:
        jar = jar.rotate(angle, expand=True, resample=Image.Resampling.BICUBIC)

    bg.alpha_composite(jar, (int(w * jar_xy[0] - jar.width / 2), int(h * jar_xy[1] - jar.height / 2)))
    bg.convert('RGB').save(path, quality=95)


def run(cmd):
    subprocess.run(cmd, shell=True, check=True, cwd=BASE)


def build_video():
    # Scene clips with different motion profiles (avoids slideshow feel)
    run("ffmpeg -y -loop 1 -t 4.2 -i ugc_scene1.png -vf \"scale=1240:2200,crop=1080:1920:x=(in_w-out_w)*0.5:y='(in_h-out_h)*(0.08+0.10*n/125)'\" -r 30 -frames:v 126 -pix_fmt yuv420p s1.mp4")
    run("ffmpeg -y -loop 1 -t 4.2 -i ugc_scene2.png -vf \"scale=1240:2200,crop=1080:1920:x='(in_w-out_w)*(n/125)':y='(in_h-out_h)*0.18'\" -r 30 -frames:v 126 -pix_fmt yuv420p s2.mp4")
    run("ffmpeg -y -loop 1 -t 4.2 -i ugc_scene3.png -vf \"scale=1240:2200,crop=1080:1920:x='(in_w-out_w)*(1-n/125)':y='(in_h-out_h)*0.28'\" -r 30 -frames:v 126 -pix_fmt yuv420p s3.mp4")
    run("ffmpeg -y -loop 1 -t 4.2 -i ugc_scene4.png -vf \"scale=1240:2200,crop=1080:1920:x=(in_w-out_w)*0.5:y='(in_h-out_h)*(0.25-0.10*n/125)'\" -r 30 -frames:v 126 -pix_fmt yuv420p s4.mp4")
    run("ffmpeg -y -loop 1 -t 2.8 -i ugc_endframe.png -vf \"scale=1180:2098,crop=1080:1920:x=(in_w-out_w)*0.5:y='(in_h-out_h)*(0.5-0.06*n/83)'\" -r 30 -frames:v 84 -pix_fmt yuv420p s5.mp4")

    # Crossfades + rights-safe music bed
    music = '/home/marco/.openclaw/workspace/brand/auranem/option1-sprint/bg_rights_safe.mp3'
    run(
        "ffmpeg -y -i s1.mp4 -i s2.mp4 -i s3.mp4 -i s4.mp4 -i s5.mp4 -i " + music +
        " -filter_complex \""
        "[0:v][1:v]xfade=transition=slideleft:duration=0.35:offset=3.85[v01];"
        "[v01][2:v]xfade=transition=fade:duration=0.35:offset=7.70[v02];"
        "[v02][3:v]xfade=transition=smoothleft:duration=0.35:offset=11.55[v03];"
        "[v03][4:v]xfade=transition=fadeblack:duration=0.35:offset=15.40[v];"
        "[5:a]atrim=0:18.2,afade=t=in:st=0:d=0.6,afade=t=out:st=16.8:d=1.4,volume=0.16[a]"
        "\" -map \"[v]\" -map \"[a]\" -c:v libx264 -r 30 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest FINAL_UGC_VIDEO_9x16_18s.mp4"
    )


if __name__ == '__main__':
    make_jar(os.path.join(BASE, 'auranem_product_master.png'))

    compose_static(
        os.path.join(BASE, 'FINAL_HERO_STATIC_1080x1350.png'),
        (1080, 1350),
        'Calm focus for modern days',
        'Premium botanical blend for your daily rhythm.',
        'Discover AURANEM',
        jar_xy=(0.70, 0.60),
        jar_scale=0.67,
        angle=0,
    )

    compose_static(
        os.path.join(BASE, 'FINAL_AD_STATIC_1080x1350.png'),
        (1080, 1350),
        'Upgrade your daily ritual',
        'Clean-label capsules designed for mindful routines.',
        'Start your routine',
        jar_xy=(0.34, 0.62),
        jar_scale=0.64,
        angle=-7,
    )

    compose_story_frame(os.path.join(BASE, 'ugc_scene1.png'), 'Morning rush?\nStay centered.', 'Plant-based daily support.', 'Keep it simple', jar_xy=(0.69, 0.58), jar_scale=0.58, angle=4)
    compose_story_frame(os.path.join(BASE, 'ugc_scene2.png'), 'One capsule.\nDaily ritual.', 'Premium natural formula.', 'Made for routines', jar_xy=(0.35, 0.60), jar_scale=0.58, angle=-6)
    compose_story_frame(os.path.join(BASE, 'ugc_scene3.png'), 'Clean label.\nPremium feel.', 'No hype. Just consistency.', 'Choose quality', jar_xy=(0.70, 0.59), jar_scale=0.57, angle=2)
    compose_story_frame(os.path.join(BASE, 'ugc_scene4.png'), 'From AM focus\nto PM calm.', 'Built for real everyday use.', 'Feel the flow', jar_xy=(0.34, 0.60), jar_scale=0.58, angle=-5)
    compose_story_frame(os.path.join(BASE, 'ugc_endframe.png'), 'AURANEM', 'Natural daily balance', 'Shop now', jar_xy=(0.70, 0.60), jar_scale=0.58, angle=0)

    build_video()
    print('GO-LIVE pack generated.')
