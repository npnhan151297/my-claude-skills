---
name: cta-endcard
description: "Làm màn hình CTA cuối video quảng cáo: lời kêu gọi, nút, kênh liên hệ hoặc mã QR. Dùng cho cảnh kết của mọi video quảng cáo."
---
# Màn hình CTA cuối

## Bố cục (9:16)

1. Dòng CTA chính (từ kịch bản), 96–130px, chữ nảy (`pop`).
2. Lợi ích/ưu đãi ngắn bên dưới (học thử miễn phí, giảm 20% đến 30/11), 52–60px.
3. "Nút" giả: khối bo tròn màu `accent`, chữ ngắn ("Đăng ký ngay"), nhịp đập nhẹ scale 1→1.04 mỗi beat.
4. Kênh liên hệ từ `brand.json` (website, hotline, Zalo) ≥ 44px; mã QR ≥ 280px nếu có link, tạo bằng thư viện `qrcode`.
5. Logo nhỏ (theo `logo-reveal`).

## Quy tắc

- Toàn bộ nằm trong vùng an toàn (`safe-zone-layout`); nút không nằm dưới cột nút bên phải của TikTok/Reels.
- Một hành động duy nhất, khớp CTA trong `brief.md`.
- Vào ở downbeat (`beat-sync`), giữ khung hoàn chỉnh **≥ 2s** đến hết video.

## Xong khi

CTA cuối có đủ dòng kêu gọi, nút, một kênh liên hệ đúng dữ liệu `brand.json`, đứng yên ≥ 2s và nằm trong vùng an toàn.
