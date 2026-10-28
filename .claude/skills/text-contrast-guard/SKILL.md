---
name: text-contrast-guard
description: "Bảo đảm chữ trên video dễ đọc: kiểm tra tương phản chữ/nền và thêm nền đỡ, lớp tối hoặc viền khi nền thay đổi. Dùng khi đặt chữ lên ảnh, video hoặc màu nền."
---
# Bảo đảm chữ dễ đọc

## Ngưỡng

- Chữ thường: tương phản ≥ **4,5:1**. Chữ lớn (≥ 72px đậm trên khung 1080 rộng): ≥ **3:1**. Công thức độ sáng tương đối theo WCAG.
- Trên nền màu phẳng: tính trực tiếp giữa màu chữ và màu nền.
- Trên ảnh/video: lấy mẫu vùng nền sau chữ ở 3 frame (đầu, giữa, cuối cảnh), dùng màu **xấu nhất**.

## Cách sửa (theo thứ tự ưu tiên)

1. Đổi màu chữ trong bộ `brand.json` (`ink`/`paper`).
2. **Lớp tối/sáng** phủ vùng chữ: gradient từ 0% đến 55–65% đen ở phía có chữ.
3. **Nền đỡ**: khối màu `ink` hoặc `primary` 85–90% đục sau khối chữ, bo góc theo lower-third.
4. **Viền/bóng** chữ: chỉ khi 3 cách trên làm hỏng hình; bóng mềm 0 4px 16px rgba(0,0,0,.5).

## Xong khi

Mọi khối chữ trong video đạt ngưỡng ở cả 3 frame mẫu, và bảng kiểm tra ghi cách sửa đã dùng cho từng khối.

Nguồn: Cloudinary (chữ trên video dễ đọc), WCAG (tỉ lệ tương phản).
