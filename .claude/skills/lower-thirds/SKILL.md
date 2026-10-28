---
name: lower-thirds
description: "Làm lower-third (dải tên, chức danh, chứng chỉ ở mép dưới khung) cho video quảng cáo. Dùng khi cảnh có người thật cần giới thiệu tên hoặc chức danh."
---
# Lower-third

## Mẫu chuẩn

- Hai dòng: **tên** (đậm, 56–64px) và **chức danh/chứng chỉ** (thường, 40–44px).
- Nền: khối màu `primary` hoặc `ink` 90% đục, bo góc nhỏ (8–12px); một vạch `accent` 6px bên trái.
- Vị trí 9:16: đáy của khối ở mép trên vùng cấm dưới (xem `safe-zone-layout`), không phải sát đáy khung. 16:9: góc dưới trái, cách mép 6%.
- Vào: vạch `accent` mọc lên (6 frame) → nền trượt ra (`calm`) → chữ hiện so le 3 frame. Ra: ngược lại, nhanh hơn (`exit`).
- Giữ trên màn hình ≥ 2,5s.

## Xong khi

Mỗi người xuất hiện lần đầu có một lower-third đúng tên/chức danh người dùng cung cấp, nằm trong vùng an toàn ở cả hai khung hình.
