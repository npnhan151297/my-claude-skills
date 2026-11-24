# Dựng slide bằng cách nhân bản slide mẫu trong bản sao Bản gốc

Bộ slide phải giống Slide mẫu chính thức của Google for Education đến từng chi tiết (hình minh hoạ, master, font Google Sans), nên chúng tôi không vẽ slide từ trang trắng và không xuất .pptx. Mỗi bộ slide là một bản sao của Bản gốc (Google Slides trong Drive của AIE); script `gfe_build.py` nhân bản đúng các slide mẫu cần dùng theo Dàn ý, thay chữ theo ID ô trong `layouts.json`, rồi xoá các slide mẫu còn lại *trong chính bản sao đó*. Cụm logo AIE + huy hiệu đối tác đặt một lần trên master của Bản gốc.

## Considered Options

- **File .pptx (python-pptx) rồi tải lên**: dễ chạy offline, nhưng Google Sans thường không có trên máy người xem, chuyển đổi làm lệch font, và tải file lớn qua connector hay hỏng.
- **Vẽ từ trang trắng bằng Slides API**: không phụ thuộc ID của mẫu, nhưng mất hình minh hoạ và chi tiết của mẫu, khó giống phong cách Google.
- **Sửa thẳng Bản gốc rồi “Make a copy”**: đơn giản nhưng mỗi lần làm phải sửa file gốc — rủi ro mất mẫu.

## Consequences

- `layouts.json` gắn chặt với ID phần tử của Bản gốc. Thay Bản gốc (ví dụ Google ra mẫu mới) thì phải đo lại toàn bộ thư viện layout.
- Script xoá slide và phần tử bên trong bản sao vừa tạo; người dùng đã cho phép việc này, nhưng không bao giờ xoá file trên Drive.
- Logo chèn bằng URL công khai (GitHub raw) nên repo phải để công khai hoặc logo phải có ở nơi Google tải được.
