---
name: logo-reveal
description: "Làm hiệu ứng logo xuất hiện ở cuối (hoặc đầu) video quảng cáo, ngắn để không ăn vào Hook. Dùng khi cần cảnh logo thương hiệu."
---
# Logo mở/đóng

## Quy tắc

- Mặc định logo ở **cuối** (cùng hoặc ngay trước `cta-endcard`). Không mở video bằng logo: 3 giây đầu dành cho Hook. Nếu buộc phải có logo đầu, đặt logo nhỏ ở góc từ frame 0, không làm cảnh riêng.
- Dài ≤ **1,5s** (45 frame) cho phần chuyển động; logo đứng yên thêm ≥ 1s.
- Dùng logo từ `brand/`; trên nền tối dùng `logo-white` nếu có.

## Mẫu

| Mẫu | Cách làm |
|---|---|
| `scale-settle` | scale 0.85→1 với `calm`, opacity 0→1, 15 frame |
| `mask-wipe` | logo lộ ra sau mặt nạ trượt ngang, 12 frame, rồi tagline hiện dưới (so le 6 frame) |
| `shape-match` | hình khối cuối của cảnh trước biến thành khung chứa logo (match cut đồ hoạ) |
| `draw-on` | logo SVG nét vẽ dần (`strokeDashoffset`), rồi lấp màu; chỉ với logo SVG dạng nét |

## Xong khi

Logo xuất hiện đúng màu, không méo tỉ lệ, chuyển động ≤ 45 frame, đứng yên ≥ 1s, nằm trong vùng an toàn.

Nguồn: MindStudio (logo reveal bằng Remotion và Claude Code).
