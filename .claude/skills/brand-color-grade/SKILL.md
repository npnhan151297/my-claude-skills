---
name: brand-color-grade
description: "Đồng bộ màu ảnh/video thật trong video quảng cáo: sửa phơi sáng, cân bằng trắng rồi áp một look chung, giữ đúng màu logo và thương hiệu. Dùng khi nguyên liệu thật lệch màu nhau hoặc lệch tông thương hiệu."
---
# Đồng bộ màu

## Quy trình

1. **Sửa trước, làm đẹp sau.** Với từng clip/ảnh: chỉnh phơi sáng và cân bằng trắng về trung tính bằng FFmpeg (`eq=brightness:contrast:saturation`, `colorbalance`, hoặc `colortemperature`). Kiểm tra bằng ảnh tĩnh, mặt người phải ra màu da tự nhiên.
2. **Một look chung** cho cả video: tương phản nhẹ (+5–10%), bão hoà vừa (−5 đến +5%), không đổi màu da. Áp cùng một bộ tham số (hoặc cùng một file LUT `.cube` qua `lut3d`) cho mọi clip.
3. **Kiểm tra theo chuỗi**, không theo từng clip: xuất 1 khung mỗi cảnh thành một tấm ghép (`ffmpeg ... tile`), so cạnh nhau, chỉnh clip lệch.
4. Đồ hoạ, logo, màu thương hiệu **không** đi qua look; chỉ nguyên liệu thật.
5. Lưu bản đã chỉnh vào `assets/graded/`.

## Xong khi

Tấm ghép các cảnh nhìn đồng nhất về độ sáng và nhiệt độ màu, da người tự nhiên, và màu logo trùng `brand.json`.

Nguồn: các hướng dẫn chỉnh màu thương hiệu (sửa trước khi áp look, kiểm tra theo chuỗi).
