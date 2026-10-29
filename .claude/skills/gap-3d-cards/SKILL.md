---
name: gap-3d-cards
description: "Thẻ và giao diện nghiêng 3D trôi chậm: thẻ prompt, thẻ 'đang thu thập' lấp lánh, thẻ kết quả thay vào với nhoè. Dùng khi muốn tách một phần giao diện ra khỏi màn hình cho nổi bật, trong video phong cách Google Animation Product."
---

# Thẻ nghiêng 3D

Dùng `Camera` (có `rx`, `ry`) và `LoadingCard` trong skill `google-animation-product`.

## Dùng

```tsx
<Camera stageW={1000} stageH={400} keys={[
  { frame: 0, x: 0.5, y: 0.5, z: 1, rx: 12, ry: -14 },
  { frame: 45, x: 0.5, y: 0.5, z: 1.1, rx: 6, ry: -8 },
]}>
  <LoadingCard width={1000} tip="Mẹo: gõ @ để nhắc tới tệp của bạn" />
</Camera>
```

## Quy tắc

- Góc nghiêng 6–14°, luôn **giảm dần** trong cảnh (thẻ như đang xoay về phía người xem); zoom tăng nhẹ 5–10%.
- Chuỗi thẻ cho một tính năng: thẻ prompt (`PromptBar` dạng thẻ, gõ prompt dài) → `LoadingCard` 1–1,5s → thẻ kết quả. Đổi thẻ bằng trượt lên 60px + nhoè + mờ trong 6–8 frame.
- Phía sau thẻ có thể để giao diện gốc mờ 20–30% để giữ ngữ cảnh.
- Thẻ kết quả kết thúc bằng một lần bấm (Chèn/Áp dụng) rồi zoom ra giao diện đầy đủ (`gap-ui-demo`).

## Xong khi

Ảnh tĩnh đầu và cuối cảnh cho thấy góc nghiêng giảm, chữ trên thẻ vẫn đọc được.
