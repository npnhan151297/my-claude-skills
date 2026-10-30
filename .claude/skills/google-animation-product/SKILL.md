---
name: google-animation-product
description: "Điều phối làm video giới thiệu sản phẩm/tính năng theo phong cách quảng cáo sản phẩm Google (Google Animation Product): nền trắng, chữ gõ có icon, ngôi sao gradient, cột chữ quay, demo giao diện có camera và con trỏ. Dùng khi người dùng muốn video kiểu Google, kiểu Gemini/Workspace, hoặc video demo tính năng phần mềm/AI."
---

# Google Animation Product

Phong cách học từ quảng cáo Gemini trong Google Workspace (phân tích chi tiết: [`reference-breakdown.md`](reference-breakdown.md)). Mỗi kỹ thuật là một skill `gap-*` có component Remotion đã render thử trong `templates/gap/`.

## Cấu trúc video (16:9, 30fps, 45–80 giây)

| Phần | Thời lượng | Skill |
|---|---|---|
| Mở logo | 2s | `gap-logo-burst` |
| Câu mở có icon ("Giờ đây … bạn có thể hỏi …") | 3s | `gap-typing-icons` |
| Ngôi sao gradient → tên sản phẩm | 1,5s | `gap-gradient-sweep` |
| "để giúp bạn" + chip tệp trôi | 2,5s | `gap-floating-chips` |
| **Mỗi chương tính năng** (3–4 chương): cột chữ quay → demo giao diện | 1,3s + 8–14s | `gap-word-carousel`, `gap-ui-demo`, `gap-3d-cards` |
| Ngôi sao gradient → tên sản phẩm | 1,5s | `gap-gradient-sweep` |
| Câu kết có icon → ngôi sao hoá logo | 5–8s | `gap-outro` |

Lớp phủ suốt video (logo góc, dòng miễn trừ) và mọi màu, font, nhịp: `gap-style`.

## Quy trình

1. **Brief**: sản phẩm, 3–4 tính năng (mỗi tính năng: một động từ cho cột chữ quay, một câu lệnh/prompt mẫu, kết quả hiện ra), logo và icon của người dùng, ảnh chụp giao diện thật (hoặc đồng ý dựng lại giao diện bằng JSX), câu kết, CTA nếu có.
2. **Dự án**: chép `templates/gap/` vào `remotion/src/gap/`; từ thư mục `remotion/` chạy `bash <thư mục skill>/scripts/fetch-font.sh "Plus Jakarta Sans" "400;500;600;700"` để nhúng font vào `src/gap/fonts.css`. Tham khảo `templates/Demo.example.tsx` cho cách xếp `Sequence`.
3. **Kịch bản cảnh** theo bảng trên → **Điểm duyệt 1** (gửi bảng cảnh, chờ đồng ý).
4. **Dựng**: mỗi phần dùng skill tương ứng; render ảnh tĩnh mỗi cảnh (`npx remotion still … --frame=N`) → **Điểm duyệt 2**.
5. **Render** bản cuối (không dùng `loadFont`/`delayRender` cho font: trong container, lượt nạp font có thể treo và Remotion huỷ bản render sau 28 giây — font đã nhúng base64 thì không cần chờ) (theo `remotion-render`; trong container dùng `--browser-executable` là chrome-headless-shell trong `/opt/pw-browsers`), kiểm tra bằng tấm ghép khung hình mỗi 0,5s, gửi vào chat.

## Xong khi

Mỗi chương tính năng có cột chữ quay + demo giao diện có gõ prompt, con trỏ bấm và kết quả hiện ra; logo/icon là của người dùng; video đã render và gửi.
