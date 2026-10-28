---
name: motion-principles
description: "Nguyên tắc chuyển động chung cho mọi hiệu ứng trong video quảng cáo: easing, thời lượng chuẩn, spring preset theo Phong cách. Dùng khi viết bất kỳ chuyển động, hiệu ứng hay chuyển cảnh nào trong Remotion."
---
# Nguyên tắc chuyển động

Nguồn tham chiếu duy nhất cho thời lượng và easing. Các skill hiệu ứng khác dùng các preset này, không tự đặt số.

## Preset (30fps)

| Tên | Dùng cho | Remotion |
|---|---|---|
| `calm` | phần giữa: lợi ích, số liệu, lower-third | `spring({ frame, fps, config: { damping: 200 } })`, ~15–20 frame |
| `pop` | Hook, CTA, từ khoá | `spring({ frame, fps, config: { damping: 12, stiffness: 180 } })`, vượt đà nhẹ |
| `exit` | chữ/đồ hoạ ra | `interpolate` 8–10 frame, `Easing.in(Easing.cubic)` |
| `drift` | chuyển động nền, ảnh tĩnh | `interpolate` tuyến tính suốt cảnh |

## Quy tắc

- **Vào chậm hơn ra**: ra nhanh hơn vào khoảng 1/3.
- **So le (stagger)** 2–4 frame giữa các từ hoặc phần tử cùng nhóm.
- Mỗi lúc chỉ **một** điểm nhấn chuyển động; phần còn lại đứng yên hoặc `drift`.
- Chuyển động phụ: sau khi phần tử chính dừng, cho bóng/viền/biểu tượng nhích 2–4 frame sau.
- Khoảng cách chuyển động: chữ trượt 40–80px; không trượt từ ngoài khung vào ở phần giữa.
- Mọi chuyển động dựa vào `useCurrentFrame()`, không dùng CSS transition/animation (không chạy khi render).

## Xong khi

Mọi chuyển động trong video dùng một trong bốn preset, và mỗi khoảnh khắc chỉ có một điểm nhấn.

Nguồn: Remotion (spring, springTiming); các bài về easing, timing và chuyển động phụ trong motion design.
