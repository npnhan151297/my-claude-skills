---
name: sfx-layer
description: "Thêm hiệu ứng âm thanh (whoosh, pop, click, riser) khớp chuyển cảnh và chữ động, giữ nhỏ dưới nhạc nền. Dùng khi video đã có hình và nhạc, cần thêm độ chuyên nghiệp cho chuyển động."
---
# Hiệu ứng âm thanh

## Khớp

| Hình | Âm thanh | Âm lượng so với nhạc |
|---|---|---|
| `push`, `zoom-through`, `brand-wipe` | whoosh, đỉnh tại điểm giữa chuyển cảnh | −6 đến −10 dB |
| `word-pop`, `color-pop` | pop/tick nhỏ | −12 đến −16 dB |
| số đếm (`counter`) | tick nhanh nhỏ dần, "ding" lúc dừng | −12 dB |
| vào CTA | riser 1–1,5s kết ở downbeat | −8 dB |

## Quy tắc

- Tối đa 1 SFX mỗi 0,5s; không đặt SFX cho mọi từ của `word-pop` — chỉ từ đầu và từ khoá.
- Lấy SFX từ thư viện miễn phí bản quyền (ví dụ Pixabay sound effects), lưu `music/sfx/`, ghi nguồn vào `music/LICENSE.md`.
- Gắn bằng `<Audio>` trong `Sequence` đúng frame của hiệu ứng; whoosh bắt đầu sớm 3–5 frame để đỉnh rơi đúng điểm giữa.

## Xong khi

Mọi chuyển cảnh đồ hoạ và vào CTA có SFX, không SFX nào to hơn nhạc nền, và mọi file SFX có nguồn.
