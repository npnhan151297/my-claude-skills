#!/bin/bash
# Ảnh tổng hợp: mỗi clip 1 hàng 5 khung, 12 clip/ảnh. Dùng: contact_sheet.sh <thư mục clip> <thư mục ra>
set -e
SRC=$1; OUT=$2; FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
mkdir -p "$OUT/rows"
for f in "$SRC"/*.mp4; do
  b=$(basename "$f" .mp4); d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  ffmpeg -v error -y -i "$f" -vf "fps=5/$d,scale=192:108:force_original_aspect_ratio=decrease,pad=192:108:(ow-iw)/2:(oh-ih)/2,tile=5x1,pad=iw+110:ih:110:0:color=black,drawtext=fontfile=$FONT:text='$b':x=5:y=30:fontsize=20:fontcolor=yellow,drawtext=fontfile=$FONT:text='$(printf %.0f "$d")s':x=5:y=60:fontsize=18:fontcolor=white" -frames:v 1 "$OUT/rows/$b.png" || echo "bỏ qua $b"
done
cd "$OUT/rows"; ls *.png | split -l 12 - "$OUT/grp_"
for g in "$OUT"/grp_??; do
  args=(); n=0; for p in $(cat "$g"); do args+=(-i "$p"); n=$((n+1)); done
  ffmpeg -v error -y "${args[@]}" -filter_complex "vstack=inputs=$n" "$g.jpg"; rm "$g"
done
ls "$OUT"/grp_*.jpg
