const path = require('path');
const fs = require('fs');
const PptxGenJS = require('pptxgenjs');

const outDir = __dirname;
const readyDir = '/home/marco/.openclaw/workspace/brand/auranem/canva-ready-pack';

const slides = [
  { name: 'Hero 1080x1350', ratio: 1080/1350, image: 'auranem_hero_1080x1350.png', subtitle: 'Primary portrait hero (4:5)' },
  { name: 'Hero 1920x1080', ratio: 1920/1080, image: 'auranem_hero_1920x1080.png', subtitle: 'Primary landscape hero (16:9)' },
  { name: 'Ad Static 1080x1350', ratio: 1080/1350, image: 'auranem_ad_static_1080x1350.png', subtitle: 'Paid/static ad format (4:5)' },
  { name: 'Story 1080x1920', ratio: 1080/1920, image: 'auranem_story_1080x1920.png', subtitle: 'Story full-screen format (9:16)' },
  { name: 'Reel Cover 1080x1920', ratio: 1080/1920, image: 'auranem_reel_cover_1080x1920.png', subtitle: 'Reel cover full-screen format (9:16)' }
];

const COLORS = {
  bg: 'F7F4EF',
  brandDark: '0F172A',
  accent: 'B88746',
  safe: 'EAB308',
  safeFill: 'FFF7CC',
  white: 'FFFFFF'
};

const pptx = new PptxGenJS();
pptx.author = 'OpenClaw';
pptx.company = 'AURANEM';
pptx.subject = 'Canva import pack';
pptx.title = 'AURANEM Canva Import Pack';
pptx.defineLayout({ name: 'AURANEM_CUSTOM', width: 10, height: 17.778 }); // 9:16 master canvas
pptx.layout = 'AURANEM_CUSTOM';

function fitRect(containerW, containerH, targetRatio) {
  const cRatio = containerW / containerH;
  let w, h;
  if (targetRatio > cRatio) {
    w = containerW;
    h = w / targetRatio;
  } else {
    h = containerH;
    w = h * targetRatio;
  }
  return { w, h, x: (containerW - w) / 2, y: (containerH - h) / 2 };
}

for (const cfg of slides) {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.bg };

  slide.addText('AURANEM Canva Import Template', {
    x: 0.5, y: 0.25, w: 9, h: 0.35,
    fontFace: 'Arial', fontSize: 14, bold: true, color: COLORS.brandDark
  });

  slide.addText(`${cfg.name} · ${cfg.subtitle}`, {
    x: 0.5, y: 0.62, w: 9, h: 0.3,
    fontFace: 'Arial', fontSize: 10, color: '475569'
  });

  // Main design frame area
  const frameX = 0.5, frameY = 1.1, frameW = 9.0, frameH = 14.9;
  const r = fitRect(frameW, frameH, cfg.ratio);
  const designX = frameX + r.x;
  const designY = frameY + r.y;

  // Outer target-size boundary
  slide.addShape(pptx.ShapeType.roundRect, {
    x: designX, y: designY, w: r.w, h: r.h,
    radius: 0.04,
    line: { color: COLORS.accent, pt: 1.5 },
    fill: { color: COLORS.white, transparency: 100 }
  });

  const imgPath = path.join(readyDir, cfg.image);
  if (fs.existsSync(imgPath)) {
    slide.addImage({ path: imgPath, x: designX, y: designY, w: r.w, h: r.h });
  }

  // Safe-zone (editable overlay guide)
  const safeInsetW = r.w * 0.08;
  const safeInsetH = r.h * 0.08;
  slide.addShape(pptx.ShapeType.rect, {
    x: designX + safeInsetW,
    y: designY + safeInsetH,
    w: r.w - safeInsetW*2,
    h: r.h - safeInsetH*2,
    line: { color: COLORS.safe, pt: 1, dash: 'dash' },
    fill: { color: COLORS.safeFill, transparency: 86 }
  });

  // Editable placeholders
  slide.addText('HEADLINE PLACEHOLDER', {
    x: designX + safeInsetW + 0.2,
    y: designY + safeInsetH + 0.2,
    w: r.w - safeInsetW*2 - 0.4,
    h: 0.45,
    fontFace: 'Arial', bold: true, fontSize: 18, color: COLORS.brandDark,
    valign: 'mid'
  });
  slide.addText('Subheadline / benefit statement placeholder', {
    x: designX + safeInsetW + 0.2,
    y: designY + safeInsetH + 0.72,
    w: r.w - safeInsetW*2 - 0.4,
    h: 0.35,
    fontFace: 'Arial', fontSize: 11, color: '334155'
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: designX + safeInsetW + 0.2,
    y: designY + r.h - safeInsetH - 0.75,
    w: 2.15,
    h: 0.42,
    radius: 0.06,
    line: { color: COLORS.brandDark, pt: 0 },
    fill: { color: COLORS.brandDark }
  });
  slide.addText('CTA BUTTON', {
    x: designX + safeInsetW + 0.2,
    y: designY + r.h - safeInsetH - 0.73,
    w: 2.15,
    h: 0.38,
    align: 'center',
    fontFace: 'Arial', bold: true, fontSize: 10, color: 'FFFFFF',
    valign: 'mid'
  });

  slide.addText('SAFE ZONE (keep key text/logo/CTA inside dashed box)', {
    x: designX + 0.15,
    y: designY + r.h - 0.28,
    w: r.w - 0.3,
    h: 0.2,
    fontFace: 'Arial', fontSize: 8, color: '92400E', align: 'right'
  });
}

const outFile = path.join(outDir, 'auranem_canva_import_template_5pages.pptx');
pptx.writeFile({ fileName: outFile }).then(() => {
  console.log(outFile);
});
