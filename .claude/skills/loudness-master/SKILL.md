---
name: loudness-master
description: "Chuẩn hoá âm lượng bản xuất video quảng cáo về khoảng −14 LUFS, đỉnh −1 dBTP bằng FFmpeg loudnorm. Dùng ngay trước render cuối hoặc khi âm thanh quá nhỏ, quá to, bị vỡ."
---
# Chuẩn âm lượng

−14 LUFS là thông lệ cho video ngắn trên mạng xã hội; TikTok và Meta không công bố mức chính thức. Nhạc to hơn sẽ bị nền tảng giảm, nhỏ hơn thì nghe yếu.

## Quy trình

1. Trộn nhạc + SFX thành một track (từ Remotion render chỉ âm thanh, hoặc từ file render).
2. Đo lần 1:
   `ffmpeg -i in.wav -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null -`
3. Áp lần 2 với số đo (`measured_I`, `measured_TP`, `measured_LRA`, `measured_thresh`, `offset`, `linear=true`) → `mix_norm.wav`.
4. Ghép lại vào video: `ffmpeg -i video.mp4 -i mix_norm.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k out.mp4`.
5. Đo lại bản cuối.

## Xong khi

Bản cuối đo được −14 ±1 LUFS tích hợp và true peak ≤ −1 dBTP.

Nguồn: Fora Soft (mức LUFS từng nền tảng 2026), video-use (−14 LUFS, −1 dBTP, LRA 11).
