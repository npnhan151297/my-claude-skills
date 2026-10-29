---
name: dung-video-tu-footage
description: Dựng video sự kiện/quà tặng (60–120 giây) từ footage thô trên Google Drive: rà clip, chọn cảnh, chống rung, slow motion, chỉnh màu, cắt theo phách nhạc, chữ chạy bằng Remotion, xuất bản thô và danh sách cảnh cho editor. Dùng khi người dùng đưa thư mục clip thô và nhờ làm video kỷ niệm, video tặng, video giới thiệu, bản dựng thô, hoặc nhờ chỉnh cảnh rung, slow motion, chọn nhạc.
---

# Dựng video từ footage thô

Bản thô dựng ở đây dùng để duyệt nội dung. Bản final do editor dựng từ file gốc theo danh sách cảnh.

## Quy trình

1. **Chốt brief trước** (gọi skill `grilling` nếu có): nơi đăng, khung hình, thời lượng, thông điệp, tỷ lệ thương hiệu, giọng đọc hay chỉ nhạc, nhạc, tên và số liệu chính xác, quyền hình ảnh. Hỏi thêm: **người nào trên hình thuộc đơn vị nào**. Nhân sự của đối tác (ví dụ giảng viên AI Edu) chỉ nên xuất hiện 1–2 khung trong video tặng khách hàng.
2. **Lấy footage**: xem mục "Lấy file từ Drive".
3. **Rà clip**: chạy `scripts/contact_sheet.sh <proxy> <ra>`, xem từng ảnh, ghi nhãn cho từng clip. Đọc thêm file XML sidecar để biết máy quay, fps, gamma.
4. **Chọn nhạc**: chạy `scripts/beats.py` để lấy BPM, pha phách và đường năng lượng. Map cấu trúc video vào các đoạn mở, lắng, cao trào. Nếu cần rút ngắn, cắt bỏ một số nhịp trọn vẹn ở đoạn lắng, có crossfade.
5. **Chọn điểm In tự động** cho các cảnh ngắn: `python3 -I scripts/pick.py <proxy> <giây> CLIP... --motion 0.8` (độ nét + chuyển động; dùng `--motion 0` cho cảnh tĩnh). Vẫn phải xem lưới khung giữa của từng cảnh để loại cảnh toàn cây, rổ bóng, người ngoài.
6. **Viết EDL** (`templates/edl.example.tsv`), độ dài mỗi cảnh tính bằng **số phách**. Cột `speed` < 1 nghĩa là slow motion và sẽ tự động chống rung.
7. **Đo rung** cho các cảnh rộng và cảnh quay tay: `scripts/shake.py clip.mp4`. Chọn đoạn có độ rung < 0,1px **và không có vật cản đi ngang tiền cảnh** (xe, người). Phải xem ảnh khung hình, không chỉ nhìn số.
   Chọn nhanh điểm In ổn định nhất cho cả loạt clip: `python3 -I scripts/stable.py <giây> <proxy> CLIP...`. Loại clip có rung > 1px hoặc trôi > 20px/s, kể cả khi hình đẹp.
8. **Tiền xử lý**: `python3 -I scripts/prep.py edl.tsv <proxy> <project> --bpm N`. Script tạo `public/base.mp4` và `src/timeline.json`. Footage quay tay thì thêm `--stab-all` để chống rung mọi cảnh, không riêng cảnh slow motion.
9. **Ghép bằng Remotion**: dùng `templates/Composition.tsx` (chữ vào từng từ bằng spring, lower third, số đếm tăng kèm chớp sáng, push-in ở các cảnh slow motion, thẻ kết). Render ảnh kiểm tra trước khi render cả video.
10. **Giao**: bản thô mp4 kèm tài liệu kế hoạch có bảng cảnh (clip, giây bắt đầu, tốc độ, nội dung) và danh sách các điểm còn chờ xác nhận.

## Lấy file từ Drive

- `download_file_content` của connector Drive trả về base64 vào context, nên chỉ dùng cho file nhỏ (XML, tài liệu). Không dùng cho video.
- Nhờ người dùng đặt thư mục proxy ở chế độ "Bất kỳ ai có đường liên kết". Sau đó:
  - Liệt kê file: `curl -sL "https://drive.google.com/embeddedfolderview?id=<FOLDER_ID>"`, lấy `/file/d/<id>` và `flip-entry-title`.
  - Tải file: `curl -sL "https://drive.usercontent.google.com/download?id=<id>&export=download&confirm=t"`.
- Nếu proxy mạng chặn host (lỗi 403 CONNECT), đọc tài liệu môi trường (`environment.network`) rồi nhờ người dùng thêm `drive.usercontent.google.com` vào Allowed domains.
- `search_files` có thể trả về rỗng với thư mục thuộc tài khoản khác. Trường hợp đó dùng cách liệt kê công khai ở trên.

## Kỹ thuật và bẫy đã gặp

- **Footage log** (Sony S-Log3) ra màu nhạt. Chỉnh màu cho bản thô: `eq=contrast=1.28:saturation=1.55:gamma=0.92` cộng ấm nhẹ. Bản final dùng LUT chính hãng.
- **Slow motion trên proxy 30p**: trình tự `vidstabdetect`/`vidstabtransform` → `minterpolate=fps=30/speed:mi_mode=mci` → `setpts=PTS/speed`. Với bản final: file gốc 59,94p đặt trên timeline 25p cho slow motion thật ở khoảng 42%, không cần nội suy. Máy có gyro (FX3) thì nên chống rung bằng Gyroflow hoặc Catalyst.
- **Đo rung**: đo bằng phase correlation ở độ phân giải 640px, có nội suy dưới pixel. Đo ở 160px không bắt được rung nhỏ.
- **Video tặng, người xem lớn tuổi**: mỗi cảnh ≥ 4 phách (khoảng 2s), không zoom punch, không cảnh quay tay rung. Cắt 1–2 phách/cảnh kèm zoom punch đã làm người xem chóng mặt (bản v3 của video THCS Trần Quốc Toản).
- **Phong cách năng động**: nhạc 130–140 BPM có drop rõ; cắt 1–2 phách/cảnh, zoom punch 1.13→1 trong 7 khung mỗi lần cắt, chớp trắng ở drop, chữ khối cam chạy ra (xem `Block`/`Slam` trong mẫu). Bản điện ảnh thì cắt 4–10 phách, slow motion nhiều hơn.
- **Cắt theo phách**: số khung của cảnh = `round(phách_cuối*beat*fps) - round(phách_đầu*beat*fps)`, tính theo vị trí cộng dồn để không bị trôi. `prep.py` kiểm tra lại số khung thực tế của từng cảnh.
- **Nhạc miễn phí bản quyền**: pixabay và chosic thường bị proxy chặn. incompetech.com (Kevin MacLeod, CC BY 4.0, có `pieces.json` để lọc theo feel và nhạc cụ) tải được. Giấy phép CC BY bắt buộc ghi nguồn ở thẻ kết. **Mình không nghe được nhạc**, nên phải nói rõ với người dùng và nhờ họ nghe duyệt.
- **Remotion trong container**: `--browser-executable=$(ls /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell)`. Thêm `"resolveJsonModule": true` vào tsconfig để import `timeline.json`. Font tiếng Việt: copy `InterDisplay-*.otf` từ `/usr/share/fonts/opentype/inter/` vào `public/` rồi `loadFont`.
- **ffmpeg drawtext** (nếu không dùng Remotion): biểu thức `x`, `y`, `alpha` có dấu phẩy phải đặt trong `'...'`. Dùng `textfile=` cho chữ tiếng Việt.
- **Kiểm tra tên và chữ trên footage**: băng rôn và bảng tên trong clip có thể khác tên người dùng đưa (ví dụ "TQT" và "TQT 1"). Hỏi lại người dùng, đừng tự sửa.
- Clip không thuộc chủ đề (ví dụ quay ở văn phòng công ty) thì loại, và ghi vào tài liệu là đã loại.
