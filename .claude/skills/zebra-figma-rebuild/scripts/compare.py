#!/usr/bin/env python3
"""Side-by-side check of a source screen and its rebuild.

    python3 compare.py <source.png> <rebuild.png> <out.png>

Writes one image: source | rebuild | difference (amplified, red where they disagree), so a single Read shows
where the rebuild drifted. Prints the share of pixels that differ noticeably, overall and per band of the
screen (top/middle/bottom thirds, left/right halves), which points at the region to look at first.
Export both PNGs at the same scale first (zebra-figma-page-build/scripts/export-images.mjs <fileKey> <dir> id=name@1 …).
"""
import sys
from PIL import Image, ImageChops, ImageDraw, ImageOps

src_path, reb_path, out_path = sys.argv[1:4]
src = Image.open(src_path).convert("RGB")
reb = Image.open(reb_path).convert("RGB")
if reb.size != src.size:
    print(f"size differs: source {src.size}, rebuild {reb.size} (rebuild resized for the diff only)")
    reb_cmp = reb.resize(src.size)
else:
    reb_cmp = reb

diff = ImageChops.difference(src, reb_cmp).convert("L")
mask = diff.point(lambda v: 255 if v > 40 else 0)
w, h = src.size


def share(box):
    region = mask.crop(box)
    hist = region.histogram()
    total = region.size[0] * region.size[1] or 1
    return 100 * hist[255] / total


print(f"differs: {share((0, 0, w, h)):.1f}% of pixels")
bands = {
    "top": (0, 0, w, h // 3), "middle": (0, h // 3, w, 2 * h // 3), "bottom": (0, 2 * h // 3, w, h),
    "left": (0, 0, w // 2, h), "right": (w // 2, 0, w, h),
}
print("  " + "  ".join(f"{k} {share(b):.1f}%" for k, b in bands.items()))

heat = Image.new("RGB", src.size, (255, 255, 255))
heat.paste(ImageOps.grayscale(src).convert("RGB").point(lambda v: 200 + v // 5))
heat.paste((220, 30, 30), mask=mask)

gap = 24
sheet = Image.new("RGB", (w * 3 + gap * 2, h + 40), (255, 255, 255))
for i, (img, label) in enumerate([(src, "source"), (reb, "rebuild"), (heat, "difference")]):
    x = i * (w + gap)
    sheet.paste(img.resize(src.size) if img.size != src.size else img, (x, 40))
    ImageDraw.Draw(sheet).text((x, 12), label, fill=(0, 0, 0))
# Keep it readable in one Read: cap the long edge.
scale = min(1.0, 2400 / sheet.size[0])
if scale < 1:
    sheet = sheet.resize((int(sheet.size[0] * scale), int(sheet.size[1] * scale)))
sheet.save(out_path)
print(f"wrote {out_path}")
