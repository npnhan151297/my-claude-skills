"""Tìm điểm In tốt nhất trong clip: đoạn nét nhất (và nhiều chuyển động nếu muốn).

Dùng: python3 -I pick.py <thư mục proxy> <độ dài giây> <clip> [clip...] [--motion 0.5]
In ra: clip  in_giây  điểm  (độ nét trung bình, chuyển động trung bình)
Bỏ 0,5 giây đầu và cuối clip (thường là lúc bấm máy).
"""
import argparse, os, subprocess
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("proxy")
ap.add_argument("dur", type=float)
ap.add_argument("clips", nargs="+")
ap.add_argument("--motion", type=float, default=0.0, help="trọng số chuyển động (0 = chỉ xét độ nét)")
args = ap.parse_args()

SR = 10  # khung/giây khi phân tích
W, H = 320, 180

def analyse(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"fps={SR},scale={W}:{H},format=gray",
                          "-f", "rawvideo", "-"], capture_output=True).stdout
    a = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
    lap = a[:, 1:-1, 1:-1] * 4 - a[:, :-2, 1:-1] - a[:, 2:, 1:-1] - a[:, 1:-1, :-2] - a[:, 1:-1, 2:]
    sharp = lap.reshape(len(a), -1).var(1)
    motion = np.concatenate([[0], np.abs(np.diff(a, axis=0)).mean((1, 2))])
    return sharp, motion

for clip in args.clips:
    sharp, motion = analyse(os.path.join(args.proxy, clip + ".mp4"))
    n = int(args.dur * SR)
    lo, hi = int(0.5 * SR), len(sharp) - int(0.5 * SR) - n
    if hi <= lo:
        print(f"{clip}\t-\tquá ngắn")
        continue
    s = (sharp - sharp.mean()) / (sharp.std() + 1e-6)
    m = (motion - motion.mean()) / (motion.std() + 1e-6)
    score = s + args.motion * m
    best = max(range(lo, hi + 1), key=lambda i: score[i:i + n].mean())
    print(f"{clip}\t{best / SR:.1f}\t{score[best:best + n].mean():.2f}\t"
          f"({sharp[best:best + n].mean():.0f}, {motion[best:best + n].mean():.1f})")
