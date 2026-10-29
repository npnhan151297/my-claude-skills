---
name: gap-style
description: "Màu, font, nhịp chuyển động, nhoè chuyển động và lớp phủ chung của phong cách Google Animation Product. Dùng khi dựng bất kỳ cảnh nào theo phong cách video sản phẩm Google, hoặc khi chỉnh màu/font/easing của video đó."
---

# Phong cách Google Animation Product

Nguồn duy nhất cho các giá trị dưới đây là `templates/gap/tokens.ts` trong skill `google-animation-product`; component nào cũng import từ đó.

## Hình

- **Nền trắng** tuyệt đối, chữ gần đen `#1F1F1F`, chữ phụ `#5F6368`. Không gradient nền, không hoạ tiết.
- **Font**: Google Sans là font độc quyền; dùng **Plus Jakarta Sans** (có tiếng Việt), weight 500 cho tiêu đề, letter-spacing −0.02em. Nhúng bằng `scripts/fetch-font.sh` (base64 vào `src/gap/fonts.css`): trình duyệt render trong container không tải được Google Fonts, và nạp font bằng JS có thể treo bản render.
- **Màu nhấn**: xanh `#1A73E8 → #4C8DF6` cho chữ được chọn; bộ 4 màu (xanh, đỏ, vàng, lục) chỉ cho ngôi sao gradient. Đổi 4 màu này sang màu thương hiệu người dùng nếu họ có bảng màu riêng.
- **Bóng**: mềm, hai lớp (`SHADOW`). Bo góc 14–28px cho thẻ, tròn hẳn cho thanh prompt.
- **Logo và icon**: dùng của người dùng (`IconSpec.src` trỏ file trong `public/`). Logo, icon Google/Gemini chỉ dùng khi người dùng có quyền theo hướng dẫn thương hiệu đối tác.

## Chuyển động

| Tên | Dùng cho | Giá trị |
|---|---|---|
| `EASE` | gần như mọi di chuyển, zoom camera | bezier(0.16, 1, 0.3, 1) |
| `EASE_IN` | thoát ra, hút vào tâm | bezier(0.7, 0, 0.84, 0) |
| `pop` | icon, chip, nút xuất hiện | spring damping 14, stiffness 170 |
| `settle` | vật lắng vào vị trí không nảy | spring damping 200 |

- **Nhoè chuyển động** chỉ khi vật đi nhanh: `velocityBlur(fn, frame)` tính từ chính hàm chuyển động. Khi phần tử đang `scale(s)`, chia độ nhoè cho `s`, nếu không nhoè bị phóng to theo.
- **Không cắt thẳng** giữa các phần: luôn nối bằng chuyển động (whip dọc, quét gradient, zoom camera).
- Chữ gõ: 14 ký tự/giây cho tiêu đề, 28 ký tự/giây cho prompt.

## Lớp phủ (`Chrome.tsx`)

Logo nhỏ góc dưới phải suốt video; dòng miễn trừ 18px xám ở đáy từ cảnh demo đầu tiên ("Trình tự đã được rút gọn. Kết quả có thể khác nhau." hoặc câu người dùng đưa).

## Xong khi

Mọi cảnh dùng token từ `tokens.ts`, không màu hay easing tự đặt, và không có cắt thẳng giữa các phần.
