---
name: asset-intake
description: "Kiểm tra và chuẩn hoá Nguyên liệu người dùng đưa vào (ảnh, video, logo, nhạc) trước khi dựng. Dùng khi nhận file mới cho một video quảng cáo."
---
# Kiểm tra nguyên liệu

## Quy trình

1. Liệt kê mọi file trong `ads/<slug>/assets/` và `music/`. Đọc thông số bằng `ffprobe` (video/nhạc) hoặc `identify`/`ffprobe` (ảnh).
2. Chấm từng file:
   - **Ảnh**: cạnh ngắn ≥ 1080px là tốt; 720–1079 dùng được cho khung nhỏ hoặc nền mờ; < 720 chỉ dùng làm thumbnail trong khung.
   - **Video**: ≥ 1080p, ≥ 24fps; ghi tỉ lệ khung, độ dài, có tiếng hay không; cảnh rung/mờ nặng thì đánh dấu.
   - **Nhạc**: ghi độ dài, có nguồn/bản quyền không.
3. Chuẩn hoá vào `assets/norm/`: video sang H.264 MP4 30fps, ảnh sang JPG/PNG (giữ PNG khi có nền trong suốt), tên file không dấu, không khoảng trắng.
4. Ghi `assets/README.md`: bảng file → loại → thông số → dùng được cho gì → vấn đề.

## Xong khi

Mọi file có một dòng trong bảng, và mỗi file "không dùng được" có lý do kèm đề xuất thay bằng đồ hoạ.
