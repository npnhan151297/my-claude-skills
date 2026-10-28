---
name: safe-zone-layout
description: "Đặt chữ, logo, CTA trong vùng an toàn của khung 9:16 để không bị giao diện TikTok, Reels, Shorts che, kèm lớp phủ kiểm tra. Dùng khi bố cục bất kỳ cảnh 9:16 nào."
---
# Vùng an toàn 9:16

Các nguồn đưa số khác nhau; bộ này lấy **mức chặt nhất** để một bản dùng được cho cả ba nền tảng. Khi có file lớp phủ chính thức (TikTok Ads Manager, Meta), kiểm lại bằng file đó.

## Vùng (khung 1080×1920)

| Vùng | Toạ độ | Được đặt gì |
|---|---|---|
| **Vùng chữ an toàn** | x 120–900, y 240–1260 | mọi chữ, số liệu, CTA, nút |
| Dải dưới | y 1260–1920 | chỉ hình nền, không chữ quan trọng |
| Cột phải | x 900–1080, y 840–1920 | chỉ hình nền (nút like, bình luận, chia sẻ) |
| Dải trên | y 0–240 | chỉ hình nền hoặc logo nhỏ không quan trọng |

## Quy trình

1. Đặt mọi khối chữ trong vùng chữ an toàn; căn giữa theo trục x = 510 (giữa vùng an toàn), không phải 540.
2. Tạo component `<SafeZoneOverlay />` vẽ các vùng cấm màu đỏ 35%, chỉ bật khi prop `debug` là true.
3. Khi duyệt storyboard và trước render cuối, render ảnh tĩnh có lớp phủ cho từng cảnh.

## Xong khi

Ảnh có lớp phủ của mọi cảnh không có chữ, nút hay số liệu nào chạm vùng đỏ.

Nguồn: Reap (vùng an toàn Shorts/Reels/TikTok), House of Marketers (safe zone từng nền tảng).
