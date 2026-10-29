---
name: gfe-motion-style
description: "Ngôn ngữ chuyển động kiểu Google for Education cho Remotion: quét sọc 4 màu, lưới ô xanh, lower-third đường kẻ, chữ số nổi khối, đường mạch + chấm màu, khung cửa sổ, 4 chấm mở logo. Dùng khi video cho đối tác/khách hàng Google for Education, khi người dùng muốn 'giống video Google for Education', hoặc cần chuyển cảnh và thẻ chữ nền trắng sạch, nhiều màu Google."
---
# Phong cách chuyển động Google for Education

Rút từ 5 video tham khảo của Google for Education: Class tools, Year in Review, Gemini, Screencast, ChromeOS Flex. Mô tả chi tiết từng video ở `reference.md`. Component ở `templates/GfeMotion.tsx`. Ví dụ áp dụng trên footage thật ở `templates/VideoExample.tsx`.

## Nhận diện

- **Nền trắng** là mặc định cho mọi thẻ chữ và thẻ kết. Footage hoặc minh hoạ đặt trên nền trắng, hoặc lồng trong khung cửa sổ.
- **4 màu Google** dùng như điểm nhấn (xanh dương #4285F4, đỏ #EA4335, vàng #FBBC04, xanh lá #34A853), không phủ cả mảng nền. Xanh dương là màu chính.
- **Chữ mực** #202124, chữ phụ #5F6368, font không chân. Google Sans không dùng tự do được, nên thay bằng Inter Display.
- **Bóng phẳng lệch** (6–12px, màu nhạt, không blur) thay cho bóng đổ mềm.
- Chuyển động **gọn, nảy nhẹ**: spring damping 11–15 cho ô biểu tượng và chấm màu, damping 200 cho chữ và khung.

## Bộ component (`templates/GfeMotion.tsx`)

| Component | Dùng khi | Ghi chú |
|---|---|---|
| `StripeWipe` | đổi chương hoặc phần, vào thẻ chữ, vào thẻ kết | 4 sọc trượt vào từ phải phủ kín, rồi dồn về mép trái. 20 frame, điểm cắt ở frame 10. |
| `BlockWipe` | vào một đoạn mới trong cùng mạch (ví dụ: vào lớp học, vào cao trào) | lưới 6×4 ô hai sắc xanh. 20 frame, điểm cắt ở giữa. |
| `PillField` | 0,5–1s đầu video, trước thẻ mở | viên con nhộng nhiều màu trượt ngang với tốc độ khác nhau rồi bay ra |
| `Extruded` | năm, con số lớn, số chương | mặt chữ xanh dương, đùn 3D xanh lá nhạt lệch xuống phải |
| `Typewriter` | dòng chữ trên thẻ chương | gõ theo grapheme NFC (không vỡ dấu tiếng Việt), con trỏ gạch dưới nhấp nháy |
| `CircuitLines` | trang trí thẻ trắng và thẻ kết | nét vẽ dần, chấm màu nảy ra ở nút. Đường không được cắt qua chữ. |
| `IconTile` | biểu tượng minh hoạ quanh nội dung | ô trắng viền màu, bóng phẳng, nảy kèm xoay nhẹ |
| `LineBar` | chữ chạy trên footage (lower-third) | đường mảnh vẽ ngang khung → mở thành dải trắng mờ → chữ mực, huy hiệu 4 chấm |
| `WindowFrame` | đưa footage lên thẻ trắng | khung cửa sổ có thanh tiêu đề xanh, bóng phẳng xanh nhạt |
| `DotsBurst` | mở thẻ kết | 4 chấm Google nảy vào giữa rồi bay giãn ra, logo hiện sau |

## Cách lắp

1. Footage nền chạy suốt (`Sequence` Footage). Thẻ chữ và chuyển cảnh là các `Sequence` chồng lên trên.
2. Mỗi chuyển cảnh đặt `from = điểm cắt − 10`, dài 20 frame. Điểm cắt nằm trên phách nhạc (`beat-sync`).
3. Thẻ trắng (mở, chương, cảm ơn, kết) vào bằng `StripeWipe`. Có thể ra bằng cắt thẳng đúng phách, kèm zoom punch nếu đang ở đoạn cao trào.
4. Chữ trên footage dùng `LineBar`, giữ trên màn hình ≥ 2,5s. Một dòng ≤ 45 ký tự ở cỡ 40px trên khung 1280px.
5. Footage trên thẻ trắng: `WindowFrame` chứa `<Video src=base.mp4 trimBefore={from}>` để khớp đúng cảnh ở timeline.

## Quy tắc

- Tối đa **3 loại chuyển cảnh** trong một video (thường là `StripeWipe`, `BlockWipe` và cắt thẳng). `StripeWipe` chỉ dùng ở chỗ đổi phần, ≤ 1 lần mỗi 10 giây.
- Thẻ chữ trắng che footage, nên mỗi thẻ ≤ 3s, trừ thẻ kết.
- Không đặt 4 màu cạnh nhau ở mảng lớn ngoài `StripeWipe`. Ở chỗ khác chỉ dùng chấm, vạch, viền.
- Logo Google for Education chỉ dùng bản đối tác được cấp phép (file người dùng gửi). Không tự ghép logo Google.
- Không chép minh hoạ, câu chữ hay nhạc của video tham khảo. Chỉ học cách chuyển động.

## Xong khi

Mọi chuyển cảnh trong video là một component trong bảng trên (hoặc cắt thẳng), tổng ≤ 3 loại; thẻ trắng có nền trắng và điểm nhấn 4 màu; render ảnh kiểm tra ở giữa mỗi chuyển cảnh không thấy khe hở giữa các sọc hay ô.
