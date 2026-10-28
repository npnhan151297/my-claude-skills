---
name: render-qc
description: "Render bản cuối video quảng cáo và kiểm tra lỗi (thời lượng, khung đen, chữ tràn, dấu bị cắt, vùng an toàn, âm lượng) trước khi giao. Dùng ở bước cuối cùng của mọi video."
---
# Render và kiểm tra cuối

## Render

Render bằng skill `remotion-render`: H.264, CRF 18, 30fps, `yuv420p`, AAC 192k. Bản 9:16 → `out/<slug>-9x16.mp4`, bản 16:9 → `out/<slug>-16x9.mp4`.

## Danh sách kiểm tra

Chạy hết, ghi kết quả từng dòng vào `out/qc.md`:

1. **Thời lượng** đúng mục tiêu ±1 frame (`ffprobe`).
2. **Khung đen/đứng**: `ffmpeg -vf blackdetect=d=0.1` và `freezedetect=d=1` không báo gì ngoài chủ đích.
3. **Âm lượng**: −14 ±1 LUFS, true peak ≤ −1 dBTP (`loudness-master`).
4. **Chữ**: xuất khung ở giữa mỗi cảnh; soát lỗi chính tả, dấu bị cắt (`vietnamese-type-safety`), chữ tràn khung.
5. **Vùng an toàn**: ảnh có lớp phủ cho mỗi cảnh 9:16 (`safe-zone-layout`).
6. **Tương phản** mọi khối chữ (`text-contrast-guard`).
7. **Dữ liệu**: mọi số, tên, CTA, liên hệ trùng `brief.md` và `brand.json`.
8. **Bản quyền**: nhạc và SFX có `LICENSE.md`; ghi nguồn ở endcard nếu giấy phép yêu cầu.
9. **Dung lượng** ≤ 100MB mỗi file.

Lỗi nào sửa được thì sửa và render lại, rồi chạy lại toàn bộ danh sách.

## Giao

Gửi vào chat: hai file MP4, ảnh bìa, và tóm tắt `qc.md` (lỗi đã sửa, điều cần người dùng xác nhận).

## Xong khi

Cả 9 dòng kiểm tra đều đạt cho cả hai bản, và file đã gửi vào chat.
