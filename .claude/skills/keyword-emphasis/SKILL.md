---
name: keyword-emphasis
description: "Nhấn mạnh một từ khoá trong câu chữ trên màn hình bằng gạch chân, khoanh, tô nền hoặc đổi màu. Dùng khi một khối chữ có từ cần nổi bật."
---
# Nhấn mạnh từ khoá

## Mẫu

| Mẫu | Phong cách | Cách làm |
|---|---|---|
| `highlight` | mặc định | khối `accent` 70% mọc từ trái sang sau từ, 8 frame, sau khi câu vào xong |
| `underline` | tiết chế | vạch `accent` 8px chạy dưới từ, 8 frame |
| `circle` | Hook/CTA | nét vẽ tay quanh từ (SVG path `strokeDashoffset`), 12 frame |
| `color-pop` | nhanh | từ đổi sang `accent` + scale 1→1.08→1 (`pop`) |

## Quy tắc

- Đúng **một** từ khoá mỗi khối chữ (từ khoá do `on-screen-copy-vi` đánh dấu). Nhấn mọi thứ là không nhấn gì.
- Nhấn **sau** khi câu đã vào xong 4–6 frame, để mắt đọc câu trước rồi mới bị kéo vào từ.
- Màu chữ trên nền highlight phải đạt tương phản (`text-contrast-guard`).
- Vùng nhấn phải tính cả dấu tiếng Việt phía trên (`vietnamese-type-safety`).

## Xong khi

Mỗi khối chữ có tối đa một từ được nhấn, và điểm nhấn vào sau câu.
