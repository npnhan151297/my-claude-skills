# Slide Google for Education

Bộ **Skill** giúp Claude thiết kế bộ slide theo phong cách Google for Education (theo Partner Brand Book và Slide Template của Google for Education), từ dàn ý đến file Google Slides trong Drive của người dùng.

## Language

**Bộ slide**:
Một file Google Slides hoàn chỉnh trong Drive của người dùng, tạo bằng cách sao chép **Slide mẫu** rồi điền nội dung. Chữ trên slide bằng tiếng Việt; tên sản phẩm Google giữ nguyên tiếng Anh. Ba loại được ưu tiên: **Slide giới thiệu chương trình**, **Slide sự kiện**, **Slide đề xuất**.
_Avoid_: deck, bài thuyết trình, presentation

**Slide giới thiệu chương trình**:
**Bộ slide** giới thiệu chương trình hoặc gói Google for Education (Workspace for Education, Chromebook, Gemini…) cho trường học.

**Slide sự kiện**:
**Bộ slide** dùng ở hội thảo, sự kiện: có agenda, diễn giả, ngăn chương.

**Slide đề xuất**:
**Bộ slide** thuyết phục một đối tác hợp tác hoặc mua giải pháp.
_Avoid_: pitch deck

**Slide mẫu**:
Bộ Google for Education Slide Template chính thức của Google; mọi **Bộ slide** kế thừa master, layout, font Google Sans và hình minh hoạ từ đây.
_Avoid_: template, theme

**Thương hiệu dẫn**:
Thương hiệu quyết định màu, font, giọng văn của một **Bộ slide**. Có hai giá trị: **Google dẫn** (mặc định) và **Đối tác dẫn**. Thương hiệu còn lại chỉ xuất hiện như logo đồng hành.
_Avoid_: theme, chủ đề màu

**Google dẫn**:
**Bộ slide** dùng nhận diện Google for Education: nền trắng/xám nhạt, Google Sans, bốn màu Google làm điểm nhấn có chủ đích.

**Đối tác dẫn**:
**Bộ slide** dùng nhận diện của AIE — đối tác duy nhất mà bộ **Skill** phục vụ; Google for Education chỉ là logo đồng hành, không trộn màu, icon Google vào đồ hoạ của đối tác.

**Dàn ý**:
Một Google Doc liệt kê slide theo thứ tự, mỗi slide có layout dự kiến, tiêu đề và nội dung chữ. Claude viết từ chủ đề hoặc chuyển từ tài liệu người dùng đưa; người dùng sửa thẳng trên Doc.

**Khung chèn ảnh**:
Khối giữ chỗ trên slide ghi mô tả ảnh cần đặt vào. Claude không tự chèn ảnh; người dùng thay bằng ảnh thật.
_Avoid_: ảnh minh hoạ, placeholder

**Bản gốc**:
Bản sao **Slide mẫu** nằm trong thư mục `GfE Slides` trên Drive của người dùng; mọi **Bộ slide** được sao chép từ đây.

**Điểm duyệt dàn ý**:
Chỗ quy trình dừng lại chờ người dùng đồng ý **Dàn ý** trước khi dựng slide.

## Relationships

- Mỗi **Bộ slide** có đúng một **Thương hiệu dẫn**, chọn trước khi viết **Dàn ý**.
- Bộ **Skill** slide gồm một **Skill điều phối** và các **Skill** con, mỗi skill một việc.
- Bộ **Skill** slide đứng riêng, không thay thế skill `aie-theme`.
- **Bộ slide** không có ghi chú người nói, không có slide số liệu hay biểu đồ.
- Bộ **Skill** slide không dùng chung quy tắc hay tài nguyên với `aie-theme`.

## Flagged ambiguities

- Đầu ra từng được chọn là .pptx — đã chốt: Google Slides, vì **Slide mẫu** là Google Slides và giữ được Google Sans.

- "Phong cách Google for Education" ban đầu có thể hiểu là chỉ **Google dẫn** — đã chốt: bộ **Skill** hỗ trợ cả hai **Thương hiệu dẫn**, mặc định **Google dẫn**.
