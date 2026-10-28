import numpy as np, subprocess, sys
W,H=640,360
def frames(path):
    p=subprocess.run(["ffmpeg","-v","error","-i",path,"-vf",f"scale={W}:{H},format=gray","-f","rawvideo","-"],capture_output=True)
    return np.frombuffer(p.stdout,np.uint8).reshape(-1,H,W).astype(np.float32)
def peak(r):
    y,x=np.unravel_index(np.argmax(r),r.shape)
    def sub(a,b,c): d=a-2*b+c; return 0 if d==0 else 0.5*(a-c)/d
    dy=sub(r[(y-1)%H,x],r[y,x],r[(y+1)%H,x]); dx=sub(r[y,(x-1)%W],r[y,x],r[y,(x+1)%W])
    y=y+dy; x=x+dx
    if y>H/2:y-=H
    if x>W/2:x-=W
    return x,y
win=np.hanning(H)[:,None]*np.hanning(W)[None,:]
for path in sys.argv[1:]:
    a=frames(path); mv=[]
    F=[np.fft.fft2((f-f.mean())*win) for f in a]
    for i in range(1,len(a)):
        R=F[i-1]*np.conj(F[i]); R/=np.abs(R)+1e-9; mv.append(peak(np.fft.ifft2(R).real))
    mv=np.array(mv); pos=np.cumsum(mv,0)
    # rung = lệch của quỹ đạo so với quỹ đạo làm mượt (cửa sổ 0.5s)
    k=15; ker=np.ones(k)/k
    sm=np.stack([np.convolve(pos[:,j],ker,mode='same') for j in range(2)],1)
    shake=np.hypot(*(pos-sm).T)
    print(path.split('/')[-1], f"{len(a)/30:.1f}s  (px ở 640p, mỗi dòng 0.5s: rung | trôi px/s)")
    print(" ".join(f"{i*0.5:.1f}:{shake[i*15:(i+1)*15].mean():.2f}|{np.hypot(*mv[i*15:(i+1)*15].sum(0)):.0f}" for i in range(len(shake)//15)))
