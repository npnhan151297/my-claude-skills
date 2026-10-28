---
name: vietnamese-type-safety
description: "Bảo đảm chữ tiếng Việt có dấu hiển thị đúng trong video: chọn font, giãn dòng, kiểm tra dấu chồng không bị cắt. Dùng khi chọn font, đặt chữ, hoặc thấy dấu bị lỗi, đè hay mất."
---
# An toàn chữ tiếng Việt

## Font

- Chỉ dùng font có bộ chữ tiếng Việt đầy đủ. Mặc định an toàn: **Be Vietnam Pro** (thiết kế cho tiếng Việt), thêm lựa chọn: Inter, Montserrat, Roboto, Nunito, Lexend (đều có subset `vietnamese` trên Google Fonts).
- Nạp bằng `@remotion/google-fonts/<Font>` với `subsets: ["vietnamese"]` và đúng các weight dùng; chờ font tải xong trước khi render (theo `remotion-best-practices`).

## Bố cục

- `line-height` ≥ **1.3** cho chữ thường, ≥ **1.4** khi có chữ HOA (dấu chồng như Ấ, Ầ, Ẩ cao hơn chữ hoa).
- Chừa đệm trên khối chữ ≥ 0,25 × cỡ chữ; mọi `overflow: hidden`, `clip-path`, mặt nạ phải tính phần dấu, nếu không dấu bị cắt ở `mask-reveal`.
- Không tách chuỗi theo ký tự (dấu kết hợp bị tách khỏi chữ). Chuẩn hoá chuỗi về **NFC** trước khi hiển thị: `text.normalize("NFC")`.
- Không dùng `letter-spacing` âm với chữ hoa có dấu.

## Kiểm tra

Render một ảnh tĩnh của cảnh dày chữ nhất với câu thử: **"ẤN TƯỢNG ỔN ĐỊNH — Học viên đạt chứng chỉ quốc tế, kỹ năng vượt trội"**. Xem phóng to: không dấu nào chạm dòng trên, không dấu nào bị cắt bởi khung hoặc mặt nạ.

## Xong khi

Font có subset vietnamese, mọi chuỗi đã NFC, và ảnh kiểm tra không có dấu bị cắt hoặc chạm nhau.

Nguồn: Be Vietnam Pro (Fontsource), Vietnamese Typography (các thách thức thiết kế dấu).
