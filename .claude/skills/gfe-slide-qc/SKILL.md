---
name: gfe-slide-qc
description: "Kiểm tra bộ slide Google for Education trước khi giao: lấy ảnh từng slide, ghép tấm kiểm tra, soát chữ tràn, dấu tiếng Việt bị cắt, chữ mẫu còn sót, logo bị che, phần tử thừa, rồi sửa ngay trên bản sao. Dùng sau khi dựng xong bộ slide Google for Education hoặc khi người dùng báo slide bị lỗi."
---

# Kiểm tra bộ slide

## Lấy ảnh và ghép tấm kiểm tra

1. Đọc danh sách slide: `read_presentation` với mask `["revisionId,slides.objectId"]`.
2. Với từng slide gọi `read_slide_page_thumbnail` (`thumbnailSize: MEDIUM`). Ghi `urls.txt` mỗi dòng `<số slide> <contentUrl>`.
3. Ghép ảnh (mỗi tấm 8 slide) rồi mở từng tấm bằng Read:
   ```bash
   python3 <thư mục skill>/scripts/contact_sheet.py urls.txt <thư mục scratchpad>/qc
   ```
   Cần mạng tới `lh7-us.googleusercontent.com` (đã mở trong môi trường). Nếu bị chặn: xuất PDF bằng Drive `download_file_content` (`exportMimeType: application/pdf`) và dùng `render_export.py` của skill `google-workspace`; nếu cũng không được thì kiểm tra bằng chữ (bước dưới) và báo người dùng là chưa xem được bằng mắt.
4. Soát chữ: Drive `read_file_content` của bộ slide, tìm chữ mẫu còn sót.

## Danh sách soát

- [ ] Chữ không tràn khỏi ô, không đè lên chữ, hình hay đường kẻ khác; dấu tiếng Việt không bị cắt.
- [ ] Không còn chữ mẫu: “Lorem”, “Your”, “Subheading”, “Point 0”, “Headline”, “Speaker Name”, “Call to action”, “Name Surname”.
- [ ] Logo AIE và huy hiệu đối tác nhìn thấy rõ trên mọi slide, không bị ảnh hay khung che.
- [ ] Khung chèn ảnh đúng chỗ, ghi rõ cần ảnh gì; không còn ảnh mẫu của Google.
- [ ] Không phần tử thừa: thẻ rỗng, chấm, mũi tên, số thứ tự không có nội dung đi kèm.
- [ ] Ngăn chương: chấm xanh đúng phần hiện tại, số chấm bằng số phần trong agenda.
- [ ] Phần đầu và phần thân trong cùng một ô có hai kiểu chữ khác nhau (đậm hơn/nhạt hơn), không bị cùng một kiểu.
- [ ] Thứ tự slide đúng Dàn ý; slide đầu là bìa, slide cuối là cảm ơn; không còn slide mẫu.

## Sửa

- Sửa ngay trên bản sao, theo ID `sNN_<id mẫu>` (ví dụ `s05_p22_i2119`), luôn kèm `writeControl.requiredRevisionId` từ lần đọc mới nhất.
- Chữ tràn: rút gọn chữ (thay toàn bộ chữ của ô: `deleteText` ALL rồi `insertText`, sau đó áp lại kiểu cho từng phần như script làm), hoặc báo người dùng nếu chữ đã được duyệt.
- Không tạo bản sao mới để sửa, không xoá file. Lỗi lặp lại ở nhiều bộ slide thì sửa `layouts.json` hoặc `gfe_build.py` thay vì sửa tay mỗi lần.
- Sau khi sửa, lấy lại ảnh của slide vừa sửa và xem lại.
