---
name: reframe-16x9
description: "Xuất thêm bản 16:9 từ bản dựng 9:16 bằng cách bố cục lại từng cảnh (không chỉ cắt khung). Dùng khi cần bản cho YouTube, website hoặc màn hình ngang."
---
# Xuất bản 16:9

Bố cục lại, không cắt khung: đồ hoạ và chữ của bản dọc bị cắt hoặc quá nhỏ nếu chỉ crop.

## Quy trình

1. Tạo Composition `<slug>-16x9` 1920×1080 dùng **cùng** `scenes.ts`, cùng thời lượng, cùng nhạc. Mỗi component cảnh nhận prop `layout: "9x16" | "16x9"`.
2. Quy tắc bố cục 16:9:
   - Chữ + hình: chia hai cột (chữ trái 45%, hình phải 55%) thay vì xếp chồng.
   - Ảnh/video dọc: đặt bên phải trong khung bo góc, nền là chính nó làm mờ.
   - Cỡ chữ: chữ chính 64–80px, tiêu đề 96–120px; lề an toàn 6% mỗi cạnh.
   - CTA: dòng kêu gọi trái, nút + QR phải.
3. Render ảnh tĩnh mỗi cảnh bản 16:9 để soát.

## Xong khi

Bản 16:9 có đúng số cảnh và thời lượng như bản 9:16, không chữ nào bị cắt hay nhỏ hơn 56px, và mọi cảnh đã được xem qua ảnh tĩnh.

Nguồn: hướng dẫn storyboard đa tỉ lệ, Adobe (reframe video: đồ hoạ cần chỉnh theo từng cảnh).
