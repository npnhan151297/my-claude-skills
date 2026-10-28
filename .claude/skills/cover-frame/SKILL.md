---
name: cover-frame
description: "Làm ảnh bìa (thumbnail, ảnh đầu bài đăng) cho video quảng cáo, có tiêu đề rõ, nằm trong vùng an toàn. Dùng khi chuẩn bị đăng video lên mạng xã hội."
---
# Ảnh bìa

## Quy trình

1. Lấy Hook hoặc lợi ích chính làm tiêu đề bìa, ≤ 6 từ.
2. Dựng một Composition tĩnh `<slug>-cover` (1080×1920; thêm 1280×720 nếu có bản 16:9): hình người hoặc số liệu mạnh nhất từ video + tiêu đề 120–160px + logo nhỏ.
3. Tiêu đề trong vùng chữ an toàn, đạt tương phản; nhìn rõ khi thu nhỏ còn 1/4.
4. Render bằng `npx remotion still` → `out/<slug>-cover.png` (và `-cover-16x9.png`).

## Xong khi

Ảnh bìa đọc được tiêu đề ở cỡ 270×480, cùng màu và font với video, đã lưu trong `out/`.
