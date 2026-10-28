---
name: stat-counter-chart
description: "Làm số liệu và biểu đồ động (số đếm tăng, thanh tiến độ, biểu đồ cột/tròn) cho bằng chứng trong video quảng cáo. Dùng khi cảnh có con số, tỉ lệ hay so sánh."
---
# Số liệu và biểu đồ động

Số liệu là bằng chứng: phải đúng và đọc được. Chỉ dùng số người dùng cung cấp.

## Mẫu

| Mẫu | Dữ liệu | Cách làm |
|---|---|---|
| `counter` | một số lớn (2.300 học viên) | đếm từ 0 bằng `interpolate` với `Easing.out(Easing.cubic)`, 20–30 frame; định dạng `toLocaleString("vi-VN")` |
| `percent-ring` | tỉ lệ (95% đạt) | vòng SVG `strokeDashoffset` chạy cùng số đếm |
| `progress-bar` | trước → sau (5.5 → 7.0) | thanh chạy từ giá trị đầu đến giá trị cuối, nhãn hai đầu |
| `bar-compare` | 2–4 cột so sánh | cột mọc so le 4 frame; cột của thương hiệu dùng `accent`, cột khác màu trung tính |

## Quy tắc

- Một cảnh một con số chính; số cỡ 160–220px, đơn vị/nhãn ≥ 48px ngay dưới.
- Sau khi đếm xong, số **đứng yên ≥ 1s** (preset `calm`, xem `pacing-rhythm`).
- Trục biểu đồ bắt đầu từ 0, trừ khi ghi rõ.
- Ghi nguồn số liệu nhỏ ở góc (≥ 28px) nếu người dùng có nguồn.

## Xong khi

Mỗi số trong kịch bản có mẫu hiển thị, định dạng kiểu Việt, đứng yên ≥ 1s, và trùng khớp với số người dùng đưa.
