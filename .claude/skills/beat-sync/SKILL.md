---
name: beat-sync
description: "Phát hiện beat của Nhạc nền và khớp điểm cắt, chữ nảy, lúc lộ lợi ích chính và CTA vào nhịp nhạc. Dùng khi video có nhạc nền hoặc khi cần dựng theo nhịp nhạc."
---
# Dựng theo nhịp nhạc

## Quy trình

1. Phân tích nhạc đã cắt (`music/edit.wav` từ `music-edit`) bằng Python `librosa`: `tempo, beats = librosa.beat.beat_track(y, sr)`; `onset_strength` để tìm đoạn nhạc lên (drop) — đoạn năng lượng tăng mạnh nhất.
2. Đổi beat sang frame: `frame = round(t * 30)`. Ghi `music/beats.json`: `{ "bpm": ..., "beats": [...frames], "downbeats": [...], "drop": frame }`. Downbeat = mỗi beat thứ 4 bắt đầu từ beat mạnh đầu tiên.
3. Khớp:
   - Điểm cắt cảnh → beat gần nhất trong ±4 frame; Hook và CTA ưu tiên downbeat.
   - Chữ nảy vào → đúng beat; chữ vào tiết chế ở phần giữa có thể lệch beat.
   - Lúc lộ lợi ích chính hoặc số liệu mạnh nhất → `drop`.
   - CTA vào ở downbeat cuối còn đủ ≥ 3s nhạc.
4. Cập nhật frame trong `storyboard.md`. Không kéo cảnh ngắn hơn thời gian đọc để chạy theo beat — khi xung đột, bỏ qua beat đó.

Cài nếu thiếu: `pip install librosa soundfile`.

## Xong khi

`beats.json` có bpm và danh sách beat, mọi điểm cắt nằm trên beat hoặc có lý do ghi trong storyboard, và CTA bắt đầu ở downbeat.

Nguồn: Cardboard (dựng theo beat), VideoProc (đánh dấu beat).
