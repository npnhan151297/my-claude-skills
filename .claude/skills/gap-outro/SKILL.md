---
name: gap-outro
description: "Kết video kiểu Google: câu kết gõ có icon, ngôi sao giữa khung xoay và hoá thành logo công ty, logo đứng yên, nhãn ưu đãi góc trên. Dùng cho 5–8 giây cuối video phong cách Google Animation Product."
---

# Kết video

Dùng `TypingLine` và `SparkleToLogo` (`Outro.tsx`) trong skill `google-animation-product`.

## Trình tự

1. `gap-gradient-sweep` lần hai (tên sản phẩm), 1,5s.
2. Câu kết gõ có icon ("trong [icon] ứng dụng [icon] bạn [icon] yêu thích [icon]"), giữ 0,5s sau khi gõ xong, 2–2,5s.
3. `SparkleToLogo`: ngôi sao nảy ra giữa khung (10 frame), tới `morphAt` xoay 90° và thu lại trong khi logo hiện lên (10 frame).
4. Logo đứng yên **2–4s** trên nền trắng. Có thể thêm nhãn ưu đãi/CTA nhỏ góc trên phải (viên bo tròn, 20–24px) từ bước 2.

## Quy tắc

- Không thêm chữ nào khác cạnh logo cuối; CTA nằm trong nhãn góc hoặc câu kết.
- Logo cuối là logo người dùng, cỡ 120–160px.

## Xong khi

Ảnh tĩnh cuối video chỉ có logo giữa nền trắng (và nhãn góc nếu có), logo sắc nét.
