#!/usr/bin/env python3
"""Tải ảnh thu nhỏ của từng slide và ghép thành tấm kiểm tra (2 cột, có số slide).

Dùng:
  python3 contact_sheet.py urls.txt out_dir
  urls.txt: mỗi dòng "<số slide> <contentUrl từ read_slide_page_thumbnail>".
Ghi out_dir/slide-NN.png cho từng slide và out_dir/sheet-K.png (mỗi tấm tối đa 8 slide).
Cần mạng tới lh7-us.googleusercontent.com.
"""
import os, subprocess, sys
from PIL import Image, ImageDraw

def main():
    src, out = sys.argv[1], sys.argv[2]
    os.makedirs(out, exist_ok=True)
    items = []
    for line in open(src, encoding="utf-8"):
        line = line.strip()
        if not line:
            continue
        n, url = line.split(None, 1)
        path = os.path.join(out, f"slide-{int(n):02d}.png")
        r = subprocess.run(["curl", "-sS", "-o", path, url])
        if r.returncode != 0 or not os.path.getsize(path):
            print(f"Không tải được slide {n}", file=sys.stderr)
            continue
        items.append((int(n), path))
    items.sort()
    W, H, per = 560, 315, 8
    for k in range(0, len(items), per):
        chunk = items[k:k + per]
        rows = (len(chunk) + 1) // 2
        sheet = Image.new("RGB", (2 * W + 12, rows * (H + 24)), "white")
        d = ImageDraw.Draw(sheet)
        for i, (n, p) in enumerate(chunk):
            x, y = (i % 2) * (W + 12), (i // 2) * (H + 24)
            sheet.paste(Image.open(p).convert("RGB").resize((W, H)), (x, y + 22))
            d.rectangle([x, y + 22, x + W - 1, y + 22 + H - 1], outline="#9AA0A6")
            d.text((x + 4, y + 4), f"Slide {n}", fill="#D93025")
        name = os.path.join(out, f"sheet-{k // per + 1}.png")
        sheet.save(name)
        print(name)

if __name__ == "__main__":
    main()
