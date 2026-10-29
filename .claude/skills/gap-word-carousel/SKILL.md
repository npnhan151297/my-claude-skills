---
name: gap-word-carousel
description: "Tiêu đề chương dạng cột động từ quay dọc có nhoè, dừng ở một từ màu xanh, các từ khác xám nhạt. Dùng trước mỗi phần demo tính năng trong video phong cách Google Animation Product."
---

# Cột chữ quay

Component: `templates/gap/WordCarousel.tsx` trong skill `google-animation-product`.

## Dùng

```tsx
const VERBS = ["khám phá", "sáng tạo", "thiết kế", "xây dựng"];
<Sequence durationInFrames={40}><WordCarousel words={VERBS} target={1} spins={1} dur={24} /></Sequence>
```

## Quy tắc

- Cùng một danh sách 4 động từ cho cả video, mỗi động từ ứng với một chương tính năng; thứ tự chương theo thứ tự `target`.
- Động từ ngắn (1–2 âm tiết tiếng Việt mỗi từ, tối đa ~10 ký tự) để cột thẳng hàng.
- `dur` 20–28 frame để quay; giữ thêm 12–16 frame sau khi dừng rồi mới zoom vào demo.
- Lần đầu quay 1 vòng (`spins=1`); các lần sau có thể `spins=0` (chỉ trượt tới từ kế).

## Xong khi

Ảnh tĩnh sau khi dừng cho thấy đúng từ đích ở giữa, màu xanh, các từ khác xám và mờ dần ở mép trên dưới.
