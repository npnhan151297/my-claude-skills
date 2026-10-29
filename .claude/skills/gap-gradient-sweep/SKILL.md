---
name: gap-gradient-sweep
description: "Chuyển cảnh ngôi sao gradient 4 màu khổng lồ quét qua khung, thu nhỏ thành biểu tượng rồi lộ tên sản phẩm từng chữ. Dùng để giới thiệu tên sản phẩm hoặc chuyển giữa các phần lớn trong video phong cách Google Animation Product."
---

# Quét ngôi sao gradient

Component: `templates/gap/GradientSweep.tsx` (dùng `Sparkle.tsx`) trong skill `google-animation-product`.

## Dùng

Đặt `Sequence` của nó **chồng lên** 4–6 frame cuối cảnh trước, để ngôi sao che cảnh cũ:

```tsx
<Sequence from={140} durationInFrames={50}><GradientSweep word="Trợ lý AI" from="br" /></Sequence>
```

## Quy tắc

- Dùng **tối đa 2 lần** mỗi video: giới thiệu tên sản phẩm ở đầu, nhắc lại trước câu kết.
- Frame 0–9 ngôi sao phóng to quét từ góc (`br` dưới phải hoặc `bl` dưới trái) và xoay; frame 9–16 thu về cạnh trái tên; chữ lộ từ frame 13, so le 1,2 frame mỗi ký tự.
- Đổi 4 màu ngôi sao qua prop `colors` của `Sparkle` nếu thương hiệu có màu riêng.
- Nhoè được chia cho tỉ lệ phóng to — giữ nguyên khi chỉnh.

## Xong khi

Ảnh tĩnh frame 8 cho thấy ngôi sao phủ phần lớn khung, frame 30 cho thấy biểu tượng + tên sản phẩm sắc nét.
