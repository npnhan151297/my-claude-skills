# Phân tích 5 video tham khảo Google for Education

Người dùng tự quay màn hình 5 video và gửi lên ngày 29/10/2026. Phân tích bằng cách trích khung 1 fps để xem toàn cảnh, rồi trích dày 5–10 fps ở các chuyển cảnh. Ở đây chỉ ghi lại cách chuyển động, không chép nội dung.

## 1. Class tools (55s): minh hoạ phẳng + giao diện

| Giây | Cảnh | Chuyển động |
|---|---|---|
| 0–4 | Tiêu đề xanh lớn trên nền trắng, nhân vật trong khung | biểu tượng (sao, kính lúp vàng, thẻ, công tắc) nảy vào lần lượt, đường nối vẽ dần |
| 4,2 | → cảnh lớp học | hoà tan nhanh ~0,2s |
| 4–36 | cận nhân vật, máy tính bảng | cắt thẳng 1,5–3s một cảnh; thẻ giao diện hoặc bong bóng chat nảy ra (scale + xoay nhẹ); máy đẩy chậm |
| 37–55 | giao diện trong khung laptop | con trỏ thao tác, cửa sổ nổi kiểu picture-in-picture |

## 2. Year in Review (92s): người nói + đồ hoạ

| Giây | Cảnh | Chuyển động |
|---|---|---|
| 0–2 | "20/24 YEAR IN REVIEW" | năm xếp 2 tầng, **chữ nổi khối** (đùn xanh lá nhạt); đường thời gian ngang có chấm |
| 2–5 | thu nhỏ + lia sang phải dọc đường thời gian | biểu tượng sản phẩm nảy lên trên đường |
| 5–8 | "20/25 WHAT'S NEXT" | năm đổi, bố cục giữ nguyên |
| 8,4 | → người nói | hoà tan 0,4s |
| 9–11 | lower-third | **đường mảnh vẽ ngang khung → mở thành dải trắng mờ**, tên rồi chức danh hiện sau, huy hiệu năm bên trái |
| 47–55 | đoạn AI nền tối | vòng neon, chữ lấy nét/mờ dần |
| 78,9–79,8 | → người nói | **quét sọc 4 màu**: sọc xanh/đỏ/vàng/xanh lá vào từ phải (~0,3s), phủ kín, rồi dồn mỏng về mép trái (~0,6s) |

## 3. Gemini (15s)

- 0,6s: logo → người nói (hoà tan).
- 9,0–9,7s: **quét sọc 4 màu** vào **thẻ chương** nền trắng: số "2" nổi khối + một câu ở giữa.

## 4. Screencast (119s): minh hoạ + đường mạch

| Giây | Cảnh | Chuyển động |
|---|---|---|
| 1–2,3 | 4 ô biểu tượng màu | ô nghiêng rồi thẳng lại (spring), co thành một đường có chấm màu |
| 2,3–3,8 | đường → khung cửa sổ | đường kéo dài thành khung cửa sổ (thanh tiêu đề xanh), nhân vật trượt vào, chấm màu nảy ở nút mạch |
| 9,0–9,7 | → cảnh mới | **lưới ô chữ nhật hai sắc xanh** phủ rồi rút đi |
| 33,3–35,3 | thẻ "trải nghiệm giáo viên" | cảnh cũ trượt ra; **đường mạch vẽ dần**, ô biểu tượng nảy (bóng phẳng lệch), **chữ gõ có con trỏ gạch dưới** |
| 37–89 | giao diện trong khung laptop xanh | phụ đề dải xám ở đáy |

## 5. ChromeOS Flex (90s): motion graphic thuần

| Giây | Cảnh | Chuyển động |
|---|---|---|
| 0–2,5 | **viên con nhộng xanh trượt ngang** nhiều tốc độ | dồn thành một viên → biến thành chuỗi avatar xếp chồng |
| 3 | nền xanh lá, ổ khoá | mảng màu phủ kín |
| 9,1–9,5 | logo xoay → **quét hình quạt** xanh lá | lộ dấu tích, chấm trắng trôi |
| 11–17 | bục 1-2-3, tim bay | nảy nhẹ |
| 77–83 | vạch 4 màu + chấm → hình blob → logo Chrome → laptop | biến hình (morph) liên tục |
| 82–83 | dãy biểu tượng → **4–6 chấm màu** → chữ "Google for Education" | chấm co lại thành chữ |

## Số liệu chung

- Chuyển cảnh đồ hoạ dài 0,6–1,0s. Còn lại phần lớn là cắt thẳng hoặc hoà tan ≤ 0,4s.
- Mỗi video dùng 2–3 kiểu chuyển cảnh, lặp lại nhất quán.
- Cảnh minh hoạ hoặc người nói dài 1,5–4s. Thẻ chương dài khoảng 2–3s.
- Logo chỉ xuất hiện ở đầu (nhỏ) và cuối.

## Nên lấy → skill thực hiện

1. Quét sọc 4 màu cho chỗ đổi phần → `StripeWipe` (gfe-motion-style), đặt điểm cắt theo `transitions-pro`/`beat-sync`.
2. Lower-third đường kẻ mở thành dải trắng → `LineBar` (thay mẫu mặc định của `lower-thirds` khi làm cho GfE).
3. Chữ số nổi khối cho năm và số chương → `Extruded`, kết hợp `kinetic-typography`.
4. Đường mạch + chấm màu + ô biểu tượng làm trang trí thẻ trắng → `CircuitLines`, `IconTile`.
5. Thẻ kết mở bằng 4 chấm Google → `DotsBurst` + mẫu `scale-settle` của `logo-reveal`.

## Không hợp

- Minh hoạ nhân vật phẳng và cảnh quay giao diện: video footage không có, và vẽ lại sẽ tốn công, lạc mục đích.
- Đoạn nền tối có neon: lệch tông nền trắng của bộ nhận diện.
- Biến hình blob liên tục: cần đồ hoạ vector riêng, không hợp với bản thô dựng từ footage.
