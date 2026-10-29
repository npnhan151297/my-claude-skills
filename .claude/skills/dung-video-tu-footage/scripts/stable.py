# Tìm cửa sổ dài `dur` giây ổn định nhất (rung + trôi thấp nhất) trong mỗi clip. Dùng: python3 -I stable.py <giây> <thư mục proxy> CLIP...
import numpy as np, subprocess, sys
W,H=640,360
dur=float(sys.argv[1]); proxy=sys.argv[2]
win=np.hanning(H)[:,None]*np.hanning(W)[None,:]
def peak(r):
    y,x=np.unravel_index(np.argmax(r),r.shape)
    def sub(a,b,c): d=a-2*b+c; return 0 if d==0 else 0.5*(a-c)/d
    dy=sub(r[(y-1)%H,x],r[y,x],r[(y+1)%H,x]); dx=sub(r[y,(x-1)%W],r[y,x],r[y,(x+1)%W])
    y=y+dy; x=x+dx
    if y>H/2:y-=H
    if x>W/2:x-=W
    return x,y
for clip in sys.argv[3:]:
    raw=subprocess.run(["ffmpeg","-v","error","-i",f"{proxy}/{clip}.mp4","-vf",f"fps=15,scale={W}:{H},format=gray","-f","rawvideo","-"],capture_output=True).stdout
    a=np.frombuffer(raw,np.uint8).reshape(-1,H,W).astype(np.float32)
    F=[np.fft.fft2((f-f.mean())*win) for f in a]
    mv=[]
    for i in range(1,len(a)):
        R=F[i-1]*np.conj(F[i]); R/=np.abs(R)+1e-9; mv.append(peak(np.fft.ifft2(R).real))
    mv=np.array(mv); pos=np.cumsum(mv,0); k=7
    sm=np.stack([np.convolve(pos[:,j],np.ones(k)/k,mode='same') for j in range(2)],1)
    shake=np.hypot(*(pos-sm).T); speed=np.hypot(*mv.T)
    n=int(dur*15); lo=8; hi=len(shake)-8-n
    if hi<=lo: print(clip,"quá ngắn"); continue
    cost=[shake[i:i+n].mean()+0.15*speed[i:i+n].mean() for i in range(lo,hi)]
    b=int(np.argmin(cost))+lo
    print(f"{clip}\tin={b/15:.1f}\trung={shake[b:b+n].mean():.2f}\ttroi={speed[b:b+n].mean()*15:.0f}px/s")
