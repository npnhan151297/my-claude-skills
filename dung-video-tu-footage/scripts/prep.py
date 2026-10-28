"""Tiền xử lý cảnh: cắt, chống rung, slow motion, chỉnh màu -> public/base.mp4 + src/timeline.json.

Dùng: python3 -I prep.py <edl.tsv> <thư mục proxy> <thư mục project Remotion> [--bpm 130] [--fps 25]
Chữ, thẻ kết và nhạc do project Remotion đảm nhận.
"""
import argparse, json, os, subprocess, sys

ap = argparse.ArgumentParser()
ap.add_argument("edl")
ap.add_argument("proxy")
ap.add_argument("project")
ap.add_argument("--bpm", type=float, default=130)
ap.add_argument("--fps", type=int, default=25)
ap.add_argument("--size", default="1280x720")
args = ap.parse_args()
B = os.path.join(os.path.dirname(os.path.abspath(args.edl)), "build")
PROXY = args.proxy
PUBLIC = os.path.join(args.project, "public")
W, H = map(int, args.size.split("x"))
FPS = args.fps
BEAT = 60 / args.bpm
os.makedirs(B, exist_ok=True)
GRADE = ("eq=contrast=1.28:saturation=1.55:brightness=-0.02:gamma=0.92,"
         "colorbalance=rs=0.04:bs=-0.04:rh=0.03:bh=-0.03")
MARGIN = 0.6  # đệm hai đầu cho vidstab

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(r.stderr[:2000])

def frame(beats):
    return round(beats * BEAT * FPS)

edl = []
for line in open(args.edl, encoding="utf-8"):
    if line.startswith("#") or not line.strip():
        continue
    i, clip, tin, beats, speed, sec, note = line.rstrip("\n").split("\t")
    edl.append(dict(i=int(i), clip=clip, tin=float(tin), beats=int(beats), speed=float(speed), sec=sec, note=note))

pos = 0
for e in edl:
    e["b0"] = pos
    pos += e["beats"]
    e["f0"] = frame(e["b0"])
    e["frames"] = frame(pos) - e["f0"]

seg_dir = os.path.join(B, "seg")
os.makedirs(seg_dir, exist_ok=True)
segs = []
for e in edl:
    if e["clip"] == "CARD":
        continue
    src = os.path.join(PROXY, e["clip"] + ".mp4")
    out = os.path.join(seg_dir, f"{e['i']:02d}.mp4")
    dur_out = e["frames"] / FPS
    tail = f"fps={FPS},{GRADE},scale={W}:{H}:flags=lanczos,setsar=1,format=yuv420p"
    if e["speed"] < 1:
        src_dur = dur_out * e["speed"]
        ss = max(0, e["tin"] - MARGIN)
        lead = e["tin"] - ss
        trf = os.path.join(seg_dir, f"{e['i']:02d}.trf")
        trim = f"trim={lead}:{lead + src_dur + 0.2},setpts=PTS-STARTPTS"
        run(["ffmpeg", "-v", "error", "-y", "-ss", str(ss), "-t", str(src_dur + lead + MARGIN), "-i", src,
             "-vf", f"vidstabdetect=shakiness=6:accuracy=15:result={trf}", "-f", "null", "-"])
        slow = 30 / e["speed"]
        vf = (f"vidstabtransform=input={trf}:smoothing=30:optzoom=1:interpol=bicubic,unsharp=5:5:0.6,"
              f"{trim},minterpolate=fps={slow:g}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,"
              f"setpts=PTS*{1 / e['speed']:g},{tail}")
        run(["ffmpeg", "-v", "error", "-y", "-ss", str(ss), "-t", str(src_dur + lead + MARGIN), "-i", src,
             "-an", "-vf", vf, "-frames:v", str(e["frames"]), "-c:v", "libx264", "-preset", "veryfast",
             "-crf", "16", out])
    else:
        run(["ffmpeg", "-v", "error", "-y", "-ss", str(e["tin"]), "-i", src, "-an", "-vf", tail,
             "-frames:v", str(e["frames"]), "-c:v", "libx264", "-preset", "veryfast", "-crf", "16", out])
    n = int(subprocess.run(["ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0",
                            "-show_entries", "stream=nb_read_frames", "-of", "csv=p=0", out],
                           capture_output=True, text=True).stdout.strip())
    if n != e["frames"]:
        sys.exit(f"cảnh {e['i']} ({e['clip']}): {n} khung, cần {e['frames']}")
    segs.append(out)
    print(f"{e['i']:02d} {e['clip']} x{e['speed']} {n}f", flush=True)

os.makedirs(PUBLIC, exist_ok=True)
with open(os.path.join(B, "concat.txt"), "w") as f:
    for s in segs:
        f.write(f"file '{s}'\n")
run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", os.path.join(B, "concat.txt"),
     "-c", "copy", os.path.join(PUBLIC, "base.mp4")])

timeline = dict(fps=FPS, beatSec=BEAT, totalFrames=frame(pos),
                shots=[dict(i=e["i"], clip=e["clip"], sec=e["sec"], from_=e["f0"], frames=e["frames"],
                            speed=e["speed"], note=e["note"]) for e in edl])
json.dump(timeline, open(os.path.join(args.project, "src", "timeline.json"), "w"), ensure_ascii=False, indent=1)

with open(os.path.join(B, "shotlist.tsv"), "w", encoding="utf-8") as f:
    f.write("STT\tĐoạn\tTC bắt đầu\tTC kết thúc\tClip\tIn (giây)\tTốc độ\tNội dung\n")
    for e in edl:
        st, en = e["f0"] / FPS, (e["f0"] + e["frames"]) / FPS
        f.write(f"{e['i']}\t{e['sec']}\t{st:.2f}\t{en:.2f}\t{e['clip']}\t{e['tin']}\t{e['speed']:g}\t{e['note']}\n")
print("total", frame(pos), "frames =", frame(pos) / FPS, "s")
