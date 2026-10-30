---
name: gap-floating-chips
description: "Chip tệp/tính năng trôi quanh một dòng chữ theo chiều sâu (gần thì to và nét, xa thì nhỏ và mờ). Dùng khi muốn gợi 'dữ liệu của bạn' quanh một câu, trong video phong cách Google Animation Product."
---

# Chip trôi

Component: `templates/gap/FloatingChips.tsx` trong skill `google-animation-product`; chữ giữa là `TypingLine`.

## Dùng

```tsx
<FloatingChips chips={[
  { label: "Sổ điểm 10A1", icon: SHEET, x: -0.28, y: -0.25, depth: 0.1 },
  { icon: DRIVE, x: -0.1, y: -0.3, depth: 0.5 },
]}>
  <TypingLine tokens={[{ text: "để" }, { text: "giúp" }, { text: "bạn" }]} />
</FloatingChips>
```

## Quy tắc

- 5–8 chip; nhãn là tên tệp thật hoặc hợp lý với người xem mục tiêu (ví dụ giáo viên: "Giáo án tuần 8", "Lịch thi").
- Trộn chip có nhãn và chip chỉ icon; `depth` 0 (gần) đến 0.8 (xa), ít nhất 2 chip ở mỗi đầu.
- Để trống vùng quanh chữ giữa (|x| < 0.15 và |y| < 0.08).
- Thoát bằng whip dọc vào `gap-word-carousel`.

## Xong khi

Ảnh tĩnh cho thấy chip không che chữ giữa, có cảm giác gần–xa rõ.
