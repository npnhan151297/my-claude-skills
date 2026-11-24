# Slide Google for Education

Bộ **Skill** giúp Claude thiết kế bộ slide theo phong cách Google for Education (theo Partner Brand Book và Slide Template của Google for Education), từ dàn ý đến file .pptx.

## Language

**Bộ slide**:
Một file .pptx hoàn chỉnh Claude giao cho người dùng. Ba loại được ưu tiên: **Slide giới thiệu chương trình**, **Slide sự kiện**, **Slide đề xuất**.
_Avoid_: deck, bài thuyết trình, presentation

**Slide giới thiệu chương trình**:
**Bộ slide** giới thiệu chương trình hoặc gói Google for Education (Workspace for Education, Chromebook, Gemini…) cho trường học.

**Slide sự kiện**:
**Bộ slide** dùng ở hội thảo, sự kiện: có agenda, diễn giả, ngăn chương.

**Slide đề xuất**:
**Bộ slide** thuyết phục một đối tác hợp tác hoặc mua giải pháp.
_Avoid_: pitch deck

**Thương hiệu dẫn**:
Thương hiệu quyết định màu, font, giọng văn của một **Bộ slide**. Có hai giá trị: **Google dẫn** (mặc định) và **Đối tác dẫn**. Thương hiệu còn lại chỉ xuất hiện như logo đồng hành.
_Avoid_: theme, chủ đề màu

**Google dẫn**:
**Bộ slide** dùng nhận diện Google for Education: nền trắng/xám nhạt, Google Sans, bốn màu Google làm điểm nhấn có chủ đích.

**Đối tác dẫn**:
**Bộ slide** dùng nhận diện của tổ chức đối tác; Google for Education chỉ là logo đồng hành, không trộn màu, icon Google vào đồ hoạ của đối tác.

**Dàn ý**:
Danh sách slide theo thứ tự, mỗi slide có ý chính, nội dung chữ và layout dự kiến. Claude viết từ chủ đề hoặc chuyển từ tài liệu người dùng đưa.

**Điểm duyệt dàn ý**:
Chỗ quy trình dừng lại chờ người dùng đồng ý **Dàn ý** trước khi dựng slide.

## Relationships

- Mỗi **Bộ slide** có đúng một **Thương hiệu dẫn**, chọn trước khi viết **Dàn ý**.
- Bộ **Skill** slide gồm một **Skill điều phối** và các **Skill** con, mỗi skill một việc.
- Bộ **Skill** slide đứng riêng, không thay thế skill `aie-theme`.

## Flagged ambiguities

- "Phong cách Google for Education" ban đầu có thể hiểu là chỉ **Google dẫn** — đã chốt: bộ **Skill** hỗ trợ cả hai **Thương hiệu dẫn**, mặc định **Google dẫn**.
