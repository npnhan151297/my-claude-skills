---
name: asset-to-scene
description: "Gán ảnh/video thật của người dùng vào từng cảnh và chỉ ra cảnh nào phải thay bằng đồ hoạ. Dùng sau khi có kịch bản và đã kiểm tra nguyên liệu."
---
# Ghép nguyên liệu vào cảnh

## Quy trình

1. Đọc `script.md` và `assets/README.md` (từ `asset-intake`).
2. Với mỗi cảnh, chọn nguyên liệu khớp ý nhất. Ưu tiên: người thật (giảng viên, học viên) cho cảnh cảm xúc và bằng chứng; ảnh lớp học/chứng chỉ cho cảnh bối cảnh.
3. Cảnh không có nguyên liệu phù hợp: đề xuất đồ hoạ thay thế, chọn một trong: chữ động lớn, số liệu động (`stat-counter-chart`), biểu tượng + chữ, logo/đối tác.
4. Kiểm tra trùng lặp: một nguyên liệu không xuất hiện quá 2 lần trong video 30s.
5. Cập nhật cột "hình" trong `script.md`.

## Xong khi

Mọi cảnh có đúng một nguồn hình (nguyên liệu hoặc đồ hoạ), không cảnh nào để trống.
