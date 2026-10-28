---
name: captions-style
description: "Làm phụ đề hoặc chữ chạy theo lời cho video: chữ đậm, cỡ lớn, nổi bật từng từ có chọn lọc. Dùng khi video có lời nói từ nguyên liệu thật hoặc có đoạn chữ chạy dài."
---
# Kiểu phụ đề

Video quảng cáo mặc định không có giọng đọc; skill này dùng khi nguyên liệu có người nói (giảng viên, học viên) hoặc có đoạn chữ chạy theo nhạc.

## Quy trình

1. Có lời nói: phiên âm bằng skill `remotion-captions` (Whisper), sửa chính tả tiếng Việt và tên riêng bằng tay.
2. Chia khối: 2–5 từ, tối đa 2 dòng, theo cụm (quy tắc của `on-screen-copy-vi`).
3. Kiểu:
   - Font display đậm (weight 700–800), cỡ 64–80px trên khung 1080 rộng; không dùng nét mảnh.
   - Chữ `paper` có nền đỡ hoặc viền theo `text-contrast-guard`.
   - Nổi bật **từ đang nói** bằng màu `accent` chỉ ở từ khoá, không phải mọi từ.
4. Vị trí: trong vùng chữ an toàn, phần dưới (y 1000–1260), tránh mặt người.

## Xong khi

Phụ đề khớp lời ±3 frame, đúng chính tả, mọi khối trong vùng an toàn và đạt tương phản.

Nguồn: OpenClip (kiểu phụ đề), BlitzCut (cỡ chữ phụ đề Shorts).
