---
name: storyboard-preview
description: "Chia Kịch bản thành bảng cảnh có thời lượng và render Storyboard xem trước (ảnh tĩnh từng cảnh) từ Remotion để duyệt trước khi render video. Dùng ở Điểm duyệt 2 hoặc khi cần xem bố cục."
---
# Storyboard xem trước

Ảnh tĩnh được render từ **chính bản dựng Remotion** (khung thô), không vẽ riêng, để cái người dùng duyệt là cái sẽ ra video.

## Quy trình

1. Từ `script.md`, lập `storyboard.md`: `#cảnh | frame bắt đầu–kết thúc (30fps) | bố cục | chữ | nguyên liệu | hiệu ứng vào/ra | chuyển cảnh sang cảnh sau`.
2. Dựng mỗi cảnh thành một component Remotion ở dạng thô: đúng bố cục, đúng chữ, đúng màu brand, chưa cần chuyển động hoàn chỉnh. Kích thước chính 1080×1920.
3. Render một ảnh tĩnh cho mỗi cảnh tại khung "đã ổn định" (sau khi chữ vào xong) bằng `npx remotion still`, lưu `stills/NN-ten-canh.png`.
4. Bật lớp phủ vùng an toàn của `safe-zone-layout` cho một bản ảnh kiểm tra riêng (`stills/safe/`).
5. Gửi ảnh + bảng cho người dùng ở **Điểm duyệt 2** và dừng.

## Xong khi

Mỗi cảnh có một ảnh tĩnh, mọi chữ nằm trong vùng an toàn, tổng frame khớp độ dài video.

Nguồn: hướng dẫn storyboard đa tỉ lệ khung hình; animatic mang thời lượng sang khâu dựng.
