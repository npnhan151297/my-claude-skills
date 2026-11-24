# Mẫu Dàn ý (Google Doc)

Tạo Doc bằng HTML để Drive chuyển đổi. Mỗi slide là một Heading 2 dạng `NN · <layout> · <ý chính>`, bên dưới là các dòng `khoá: giá trị` theo đúng khoá của layout trong `gfe-slide-layouts`. Danh sách mục dùng gạch đầu dòng `dau | than`. Người dùng sửa chữ sau dấu `:` và có thể đổi layout ở tiêu đề.

```html
<h1>[Dàn ý] Triển khai Google Classroom cho trường học</h1>
<p><i>Người xem: đối tác của AIE · Thời lượng: 45 phút · 12 slide. Sửa trực tiếp chữ sau dấu “:”. Muốn đổi bố cục thì đổi tên layout ở tiêu đề slide.</i></p>

<h2>01 · bia · Mở đầu</h2>
<p>tieu_de: Triển khai Google Classroom cho trường học</p>
<p>phu_de: Đào tạo đối tác · Tháng 12/2026</p>

<h2>02 · agenda · Nội dung buổi đào tạo</h2>
<ul><li>Google Classroom là gì</li><li>Quy trình triển khai 4 bước</li><li>Hỗ trợ giáo viên</li></ul>

<h2>03 · ba-y · Ba lợi ích cho nhà trường</h2>
<p>tieu_de: Ba lợi ích cho nhà trường</p>
<ul><li>Tiết kiệm thời gian | Giao bài và chấm điểm tập trung một chỗ.</li>
<li>Theo dõi tiến độ | Ban giám hiệu nắm được tình hình nộp bài.</li>
<li>An toàn dữ liệu | Tài khoản do nhà trường quản lý.</li></ul>

<h2>04 · anh-lon-phai · Lớp học thực tế</h2>
<p>tieu_de: Lớp học thực tế</p>
<p>noi_dung: Giáo viên dùng Classroom để giao bài và phản hồi ngay trong tiết học.</p>
<p>anh: giáo viên đứng lớp cùng học sinh (Khung chèn ảnh)</p>
```

Khi đọc lại, chuyển mỗi Heading 2 thành một phần tử trong `slides` của `deck.json`. Dòng `a | b` thành `{"dau": a, "than": b}`, dòng thứ ba sau `|` (nếu có) là `lien_ket`, dòng `anh:` trong mục là `anh`.
