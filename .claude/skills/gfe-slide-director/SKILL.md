---
name: gfe-slide-director
description: "Điều phối làm trọn một bộ slide đào tạo đối tác theo phong cách Google for Education trên Google Slides: dàn ý trên Google Doc, chờ duyệt, sao chép Bản gốc, dựng bằng script, kiểm tra bằng ảnh rồi giao link. Dùng khi người dùng muốn làm, dựng hoặc sửa slide Google for Education, slide đào tạo đối tác AIE, slide kiểu Google cho Classroom/Gemini/Workspace/Chromebook."
---

# Slide đào tạo đối tác — phong cách Google for Education

Thuật ngữ: `docs/slide/CONTEXT.md`. Vị trí trên Drive và nơi lấy logo: [`config.json`](config.json) (tài khoản `npnhan@aiedu.com.vn`). Trước lần gọi Google đầu tiên trong phiên, nạp skill `google-workspace` (phần Slides).

Bộ slide do AIE dẫn về nhận diện (màu, shape nền AIE) **không** thuộc skill này: dùng `aie-theme`.

## An toàn dữ liệu Drive (bắt buộc)

- Không bao giờ xoá, chuyển vào thùng rác hay ghi đè file nào trên Drive.
- Chỉ được xoá slide/phần tử **bên trong bản sao vừa tạo ở lượt này**, việc này người dùng đã cho phép một lần cho mọi lượt.
- Không sửa Bản gốc. Muốn đổi Bản gốc (thêm layout, đổi logo) thì hỏi người dùng trước, và cập nhật `gfe-slide-layouts/layouts.json` theo.

## Quy trình

1. **Nhận yêu cầu.** Chủ đề, tài liệu nguồn (nếu có), thời lượng buổi đào tạo, đối tác của AIE là ai. Khoảng 1 slide cho 2–3 phút trình bày. Thiếu chủ đề thì hỏi; những thứ khác tự chọn mặc định hợp lý.
2. **Viết Dàn ý.** Chọn layout cho từng slide theo `gfe-slide-layouts`, viết chữ theo `gfe-slide-copy`, tôn trọng giới hạn ký tự trong `layouts.json`. Tạo Google Doc trong thư mục `dan_y_folder_id`: Drive `create_file` với `contentMimeType: text/html` để Drive chuyển thành Doc, theo mẫu ở [`dan-y-mau.md`](dan-y-mau.md). Gửi link Doc.
3. **Điểm duyệt dàn ý.** Dừng, chờ người dùng sửa trực tiếp trên Doc và đồng ý. Không dựng trước khi được đồng ý.
4. **Chuyển Dàn ý thành `deck.json`.** Đọc lại Doc (Drive `read_file_content`), lấy đúng chữ người dùng đã sửa, không tự viết lại. Cấu trúc: [`deck-mau.json`](deck-mau.json); các khoá của từng layout xem `gfe-slide-layouts`. Lưu ở scratchpad.
5. **Sao chép Bản gốc.** Drive `copy_file` từ `ban_goc_id` vào `output_folder_id`, đặt tên bằng tiêu đề bộ slide (tiếng Việt có dấu). Đọc bản sao với mask `["revisionId,slides.objectId"]`, lưu thành `read.json`.
6. **Sinh lệnh dựng:**
   ```bash
   python3 <thư mục skill>/scripts/gfe_build.py --spec deck.json --deck-read read.json > requests.json
   ```
   Script in cảnh báo ra stderr (chữ vượt giới hạn, có thể tràn, thiếu mục). Sửa từng cảnh báo bằng cách rút gọn chữ hoặc đổi layout trong `deck.json` rồi chạy lại. Chữ đã được duyệt mà phải đổi thì báo người dùng.
7. **Gửi lệnh.** `update_presentation` với `requests` và `writeControl` trong `requests.json`. Gói lớn hơn khoảng 25 KB thì tách thành 2–3 đợt: đợt đầu chứa toàn bộ `duplicateObject` và phần điền của các slide đầu; mỗi đợt sau đọc lại `revisionId` rồi gửi tiếp. Các lệnh `updateSlidesPosition` và `deleteObject` slide mẫu phải nằm ở đợt cuối.
8. **Kiểm tra** theo `gfe-slide-qc`. Sửa trực tiếp trên bản sao bằng ID `sNN_<id mẫu>`, không tạo bản sao mới.
9. **Giao.** Gửi link bộ slide, liệt kê các Khung chèn ảnh cần thay (slide số mấy, ảnh gì). Nói rõ phần nào chưa kiểm tra được.

## Script làm gì

`gfe_build.py` nhân bản slide mẫu theo thứ tự Dàn ý (ID mới dạng `s03_p22_i2119`), điền chữ và áp kiểu cho từng phần, thay ảnh mẫu bằng Khung chèn ảnh, xoá mục thừa (dòng agenda, thẻ timeline, chấm ngăn chương, nút CTA không dùng), xếp slide mới lên đầu rồi xoá toàn bộ slide mẫu còn lại trong bản sao. Cụm logo nằm sẵn trên master của Bản gốc nên slide nào cũng có, script không cần đặt.

## Xong khi

Bộ slide nằm trong `GfE Slides/Output`, đúng Dàn ý đã duyệt, qua hết mục kiểm tra của `gfe-slide-qc`, và người dùng đã có link cùng danh sách ảnh cần chèn.
