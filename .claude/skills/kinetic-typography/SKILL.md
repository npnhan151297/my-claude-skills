---
name: kinetic-typography
description: "Làm chữ động (kinetic typography) cho video quảng cáo: chữ nảy cho Hook/CTA, chữ vào tiết chế cho phần giữa. Dùng khi đưa chữ lên màn hình trong Remotion."
---
# Chữ động

Dựa trên preset của `motion-principles`; font và an toàn dấu theo `vietnamese-type-safety`; vị trí theo `safe-zone-layout`.

## Bộ mẫu

| Mẫu | Phần | Mô tả |
|---|---|---|
| `word-pop` | Hook, CTA | từng âm tiết nảy lên (`pop`), so le 3 frame, scale 0.6→1 + opacity |
| `slam` | Hook | cả khối scale 1.3→1 trong 6 frame, rung nhẹ 2px 4 frame |
| `line-rise` | giữa | từng dòng trượt lên 40px + opacity (`calm`), so le 5 frame |
| `mask-reveal` | giữa | dòng chữ hiện ra sau mặt nạ trượt (clip-path), gọn, sang |
| `swap` | Hook trước→sau | chữ cũ ra (`exit`) rồi chữ mới vào cùng vị trí |

## Quy tắc

- Tách theo **âm tiết** (khoảng trắng) cho `word-pop`; không tách theo ký tự (vỡ dấu tiếng Việt).
- Cỡ chữ trên khung 1080×1920: tiêu đề Hook/CTA 110–150px, chữ chính 72–96px, chữ phụ ≥ 48px.
- Một khối chữ = một component `<KineticText text variant startFrame />`; nội dung lấy từ `scenes.ts`.
- Chữ phải đứng yên đọc được trước khi ra: ít nhất bằng thời gian đọc trừ thời gian vào.

## Xong khi

Mọi khối chữ trong storyboard có một mẫu, Hook và CTA dùng mẫu nhanh, phần giữa dùng mẫu tiết chế, và không dấu nào bị cắt trong lúc chuyển động.

Nguồn: SVGator (kinetic typography), Remotion (spring).
