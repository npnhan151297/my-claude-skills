---
name: ad-reference-breakdown
description: "Phân tích một video quảng cáo mẫu theo từng giây (nhịp cắt, chữ, hiệu ứng, CTA) để rút ra mẫu áp dụng. Dùng khi người dùng đưa quảng cáo tham khảo hoặc nói 'làm giống video này'."
---
# Phân tích quảng cáo mẫu

## Quy trình

1. Lấy file video mẫu (người dùng tải lên). Trích khung hình mỗi 0,5s bằng `ffmpeg -vf fps=2` và phát hiện điểm cắt bằng `ffmpeg -vf "select='gt(scene,0.3)',showinfo"`.
2. Xem các khung trích ra và lập bảng: `giây | cảnh | chữ trên màn hình | kiểu chữ động | chuyển cảnh | phần (Hook/Bối cảnh/Bằng chứng/CTA)`.
3. Rút số liệu: tổng số cảnh, độ dài cảnh trung bình ở Hook / giữa / CTA, số kiểu chuyển cảnh, vị trí CTA, thời điểm logo xuất hiện.
4. Viết `ads/<slug>/reference.md`: bảng, số liệu, và 3–5 điều nên lấy, 1–3 điều không hợp với Phong cách của thương hiệu.

## Xong khi

Mọi điểm cắt đã được ghi, và có danh sách "nên lấy" gắn với skill sẽ thực hiện.

Không chép nguyên văn chữ, nhạc hay hình của quảng cáo mẫu.
