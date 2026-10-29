---
name: gap-ui-demo
description: "Demo giao diện phần mềm kiểu quảng cáo Google: camera ảo tiến vào thanh prompt, gõ câu lệnh, bàn tay con trỏ bấm, viên 'đang làm' lấp lánh, viền xanh phát sáng khi AI chạy, kết quả hiện ra rồi zoom ra. Dùng cho từng chương tính năng trong video phong cách Google Animation Product."
---

# Demo giao diện

Component trong skill `google-animation-product`: `Camera.tsx` (`Camera`, `GlowFrame`), `Prompt.tsx` (`PromptBar`, `LoadingCard`), `Cursor.tsx` (`HandCursor`). Ví dụ đầy đủ: `templates/Demo.example.tsx` (cảnh `DocMock`).

## Sân khấu (stage)

Giao diện đặt trên một "sân khấu" kích thước cố định (ví dụ 1600×900), camera di chuyển trên đó:
- **Có ảnh chụp giao diện thật**: `<Img src={staticFile("ui-docs.png")} />` phủ sân khấu, rồi đặt `PromptBar`, kết quả… đè lên đúng vị trí.
- **Không có**: dựng lại giao diện tối giản bằng JSX (thanh tiêu đề, vạch xám thay chữ), như `DocMock`.

## Nhịp một chương (≈ 5s = 150 frame)

| Frame | Camera (`CamKey`) | Việc |
|---|---|---|
| 0 | toàn cảnh, z 0.9 | giao diện hiện |
| 18 | tiến vào thanh prompt, z 1.6 | phần khác ra khỏi khung |
| 20–70 | giữ | `PromptBar` gõ prompt (28 ký tự/giây) |
| 55–80 | đẩy sát nút gửi, z 2.2 | `HandCursor` lướt tới, `click` ở frame 80 |
| 92 | | `workingAt`: viên lấp lánh; `GlowFrame` bật |
| 110 | zoom ra, nghiêng nhẹ (rx 8, ry −10) | kết quả hiện ra trên sân khấu |
| 150 | trôi chậm | `GlowFrame` tắt |

Toạ độ `HandCursor` tính theo pixel của sân khấu, nên con trỏ đi cùng camera.

## Quy tắc

- Prompt là câu người dùng thật sẽ gõ, ≤ 90 ký tự, tiếng Việt tự nhiên.
- Kết quả phải **đọc được** ít nhất 1,5s ở cỡ zoom cuối; nếu kết quả dài, cuộn nội dung chậm trong lúc `GlowFrame` bật.
- Mỗi chương một thao tác chính (một lần bấm). Thao tác phụ (mở bảng nguồn) chỉ khi nó là điểm bán hàng.
- Nút quan trọng có thể phát sáng trước khi bấm (vòng tím/xanh phập phồng 2 nhịp).

## Xong khi

Ảnh tĩnh ở 4 mốc (toàn cảnh, đang gõ, vừa bấm, kết quả) cho thấy prompt đọc được, con trỏ đúng trên nút, kết quả rõ.
