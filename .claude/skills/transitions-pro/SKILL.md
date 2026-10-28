---
name: transitions-pro
description: "Chọn và làm chuyển cảnh chuyên nghiệp (zoom, trượt, wipe bằng mặt nạ, match cut đồ hoạ) cho video quảng cáo trong Remotion. Dùng khi nối hai cảnh bằng chuyển cảnh, không phải cắt thẳng."
---
# Chuyển cảnh chuyên nghiệp

## Bộ chuyển cảnh

| Tên | Khi dùng | Cách làm |
|---|---|---|
| `push` | đổi ý trong cùng phần, nhịp nhanh | `slide()` của `@remotion/transitions`, 8–10 frame |
| `zoom-through` | Hook → Bối cảnh | cảnh trước scale 1→1.4 + blur, cảnh sau 0.8→1, 8 frame |
| `brand-wipe` | đổi phần (Bối cảnh → Bằng chứng, → CTA) | một dải màu `primary` quét chéo che rồi mở, 12–14 frame |
| `mask-reveal` | vào bằng chứng/số liệu | cảnh sau lộ ra qua hình tròn/chữ nhật mở rộng (clip-path) |
| `match-shape` | hai cảnh có hình giống nhau | căn tâm hình trùng, scale khớp, cắt hoặc fade 4 frame |
| `fade` | chỉ cho cảnh cuối → logo | 10–12 frame |

## Quy tắc

- Tối đa **3 kiểu chuyển cảnh** trong một video; `brand-wipe` chỉ ở chỗ đổi phần.
- Phần lớn điểm nối vẫn là cắt thẳng (`cut-craft`); chuyển cảnh đồ hoạ ≤ 1 mỗi 4 giây.
- Thời lượng chuyển cảnh theo preset `motion-principles`; đặt điểm giữa chuyển cảnh trên beat (`beat-sync`).
- Chuyển cảnh chồng lên hai cảnh — báo `scene-assembly` để trừ thời lượng.
- Có thể thêm whoosh từ `sfx-layer`.

## Xong khi

Mỗi chuyển cảnh trong storyboard có tên trong bảng, tổng ≤ 3 kiểu, và điểm giữa nằm trên beat.

Nguồn: Remotion (TransitionSeries), School of Motion (match cut), Adobe (chuyển cảnh bằng mặt nạ).
