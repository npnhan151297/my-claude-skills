# Slide Google for Education

Bộ **Skill** giúp Claude thiết kế bộ slide theo phong cách Google for Education (theo Partner Brand Book và Slide Template của Google for Education), từ dàn ý đến file Google Slides trong Drive của người dùng.

## Language

**Bộ slide**:
Một file Google Slides hoàn chỉnh trong Drive của người dùng, tạo bằng cách sao chép **Slide mẫu** rồi điền nội dung. Chữ trên slide bằng tiếng Việt; tên sản phẩm Google giữ nguyên tiếng Anh. Luôn theo phong cách Google for Education, dùng để AIE đào tạo **Đối tác của AIE**.
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

**AIE**:
Phòng Đào tạo AI Edu — đối tác Google for Education hạng Professional Development Partner, chủ sở hữu mọi **Bộ slide**.

**Đối tác của AIE**:
Tổ chức mà AIE đào tạo về các chương trình Google for Education (đại lý, trung tâm…); là người xem **Bộ slide**.
_Avoid_: khách hàng, học viên

**Huy hiệu đối tác**:
Logo "Google for Education Professional Development Partner" dùng để thể hiện AIE là đối tác của Google.

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

- Bộ slide do AIE dẫn về nhận diện thuộc skill `aie-theme`, nằm ngoài bộ **Skill** này.
- Bộ **Skill** slide gồm một **Skill điều phối** và các **Skill** con, mỗi skill một việc.
- Bộ **Skill** slide đứng riêng, không thay thế skill `aie-theme`.
- **Bộ slide** không có ghi chú người nói, không có slide số liệu hay biểu đồ.
- Bộ **Skill** slide không dùng chung quy tắc hay tài nguyên với `aie-theme`.

## Flagged ambiguities

- Đầu ra từng được chọn là .pptx — đã chốt: Google Slides, vì **Slide mẫu** là Google Slides và giữ được Google Sans.
- Từng định hỗ trợ cả "Google dẫn" và "Đối tác dẫn" — đã chốt: chỉ phong cách Google for Education; khái niệm "Thương hiệu dẫn" bị bỏ.
- "Training đối tác AIE" — đã chốt: AIE đào tạo **Đối tác của AIE**, không phải Google đào tạo AIE.
