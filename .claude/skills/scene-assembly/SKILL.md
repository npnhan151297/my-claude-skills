---
name: scene-assembly
description: "Lắp các cảnh thành Composition Remotion bằng TransitionSeries, tính đúng tổng thời lượng khi chuyển cảnh chồng lên nhau. Dùng khi ghép cảnh thành video hoàn chỉnh."
---
# Lắp cảnh bằng Remotion

Kỹ thuật API theo skill `remotion-best-practices` (phần transitions). Skill này giữ quy ước của bộ video quảng cáo.

## Quy ước

- Composition `<slug>`: 1080×1920, 30fps; bản 16:9 là Composition `<slug>-16x9` (xem `reframe-16x9`). Props đọc từ `storyboard.md` đã chuyển thành `scenes.ts`.
- Mỗi cảnh là một component nhận `durationInFrames`; mọi chuyển động tính theo `useCurrentFrame()` (không dùng CSS animation).
- Ghép bằng `TransitionSeries`. Chuyển cảnh **chồng lên** hai cảnh nên làm ngắn tổng thời lượng: `tổng = Σ cảnh − Σ chuyển cảnh`. Tính lại để tổng đúng 15/30/60s (450/900/1800 frame); bù vào cảnh dài nhất ở phần giữa.
- Nhạc là một `<Audio>` ở cấp Composition, không nằm trong cảnh.

## Quy trình

1. Sinh `scenes.ts` từ storyboard (frame, chữ, nguyên liệu, kiểu chuyển cảnh).
2. Viết Composition, render thử 1 ảnh tĩnh mỗi cảnh để chắc không lỗi.
3. In bảng kiểm tra: cảnh → frame bắt đầu thực tế (sau trừ chồng lấn) → khớp beat không.

## Xong khi

`durationInFrames` của Composition đúng độ dài mục tiêu, và frame bắt đầu thực tế của từng cảnh khớp storyboard trong ±2 frame.

Nguồn: Remotion docs (TransitionSeries, springTiming).
