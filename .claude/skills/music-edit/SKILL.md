---
name: music-edit
description: "Chuẩn bị Nhạc nền cho video quảng cáo: nhận nhạc người dùng hoặc chọn từ thư viện miễn phí bản quyền, cắt khớp độ dài, fade và kết đúng câu nhạc. Dùng khi video cần nhạc nền."
---
# Cắt nhạc nền

Claude không tự sinh nhạc.

## Nguồn

1. Ưu tiên nhạc người dùng đưa vào `music/`.
2. Nếu không có: đề xuất 3 bài từ thư viện miễn phí bản quyền (YouTube Audio Library, Pixabay Music, Free Music Archive với giấy phép cho phép dùng thương mại), ghi rõ tên bài, tác giả, giấy phép và yêu cầu ghi nguồn. Người dùng chọn và tải bài về. Phong cách: nhịp rõ, 110–130 BPM, sáng, không lời (không giọng hát che chữ).
3. Ghi `music/LICENSE.md` cho bài được dùng.

## Cắt

1. Tìm beat bằng `beat-sync` trên bản gốc.
2. Chọn đoạn sao cho: đầu đoạn rơi đúng downbeat, đoạn nhạc lên rơi vào lúc lộ lợi ích chính, và **kết thúc đúng cuối một câu nhạc** (cuối nhóm 4 hoặc 8 phách) trùng frame cuối video.
3. Nếu bài dài hơn: cắt bỏ một đoạn ở giữa tại hai downbeat cùng vị trí trong câu nhạc, crossfade 80–150ms.
4. Fade-in 0–200ms (Hook cần tiếng ngay), fade-out 0,5–1s chỉ khi không kết được đúng câu.
5. Xuất `music/edit.wav`, độ dài khớp đúng tổng frame / 30.

## Xong khi

`edit.wav` dài đúng độ dài video ±1 frame, bắt đầu ở downbeat, kết thúc ở cuối câu nhạc hoặc có fade, và có `LICENSE.md`.
