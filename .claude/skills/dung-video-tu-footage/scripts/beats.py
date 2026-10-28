"""Dò BPM + pha phách và đường năng lượng theo giây của một bài nhạc.

Dùng: python3 -I beats.py <file nhạc> [bpm_min bpm_max]
In ra BPM, pha (giây của phách đầu) và độ lớn dB từng giây để tìm đoạn mở/lắng/cao trào.
"""
import subprocess, sys
import numpy as np

path = sys.argv[1]
lo, hi = (float(sys.argv[2]), float(sys.argv[3])) if len(sys.argv) > 3 else (70.0, 180.0)
sr, hop = 22050, 256
x = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"],
                                 capture_output=True).stdout, np.float32)
fr = len(x) // hop
e = np.array([np.sum(x[i * hop:(i + 1) * hop] ** 2) for i in range(fr)])
on = np.maximum(0, np.diff(np.log(e + 1e-9)))
fps = sr / hop
best = (0, 0, 0)
for bpm in np.arange(lo, hi, 0.1):
    per = 60 / bpm * fps
    for ph in np.arange(0, per, 0.5):
        idx = (ph + np.arange(0, (fr - 1 - ph) / per) * per).astype(int)
        s = on[idx].mean()
        if s > best[0]:
            best = (s, bpm, ph / fps)
print(f"BPM {best[1]:.1f}  pha {best[2]:.3f}s  phách {60 / best[1]:.4f}s")
n = len(x) // sr
db = [20 * np.log10(np.sqrt(np.mean(x[i * sr:(i + 1) * sr] ** 2)) + 1e-9) for i in range(n)]
print("dB/giây:", " ".join(f"{i}:{int(v)}" for i, v in enumerate(db)))
