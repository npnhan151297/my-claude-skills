# Bộ kỹ năng dựng video

Bộ Skill giúp Claude tự làm video quảng cáo theo cách của nhà sản xuất video chuyên nghiệp, từ kịch bản đến bản xuất cuối.

## Language

**Skill**:
Một thư mục chứa `SKILL.md` trong repo này, dạy Claude làm một việc cụ thể. Người dùng là Claude, không phải con người.
_Avoid_: kỹ năng nghề, khoá học, lộ trình học

**Kiến thức nghề**:
Cách làm, quy tắc, mẹo của nhà sản xuất video chuyên nghiệp, thu thập từ các nguồn bên ngoài. Là nguyên liệu để viết **Skill**, không phải sản phẩm cuối.

**Video quảng cáo**:
Video 15–60 giây giới thiệu một dịch vụ hoặc khoá học (đào tạo, tư vấn, chứng chỉ) nhằm thuyết phục người xem đăng ký. Chữ và phụ đề bằng tiếng Việt. Là loại video duy nhất bộ **Skill** nhắm tới ở giai đoạn này.
_Avoid_: video bài giảng, video khoá học, testimonial

**Khâu**:
Một bước trong quy trình làm **Video quảng cáo**. Bộ **Skill** phủ các khâu: Tiền kỳ (ý tưởng, kịch bản, storyboard), Dựng (nhịp cắt, chuyển cảnh, B-roll), Hiệu ứng, Màu và âm thanh, Phụ đề và xuất bản. Khâu Quay nằm ngoài phạm vi.

**Hiệu ứng**:
Thành phần hình ảnh được tạo bằng code, không có sẵn trong cảnh quay. Giai đoạn 1 gồm **Chữ động / đồ hoạ chuyển động** (tiêu đề, lower-third, số liệu, biểu đồ) và **Chuyển cảnh** (zoom, trượt, che khung, khớp hình). VFX ghép cảnh, 3D/particle và hiệu ứng AI để giai đoạn sau.

**Khung hình chính / Khung hình phụ**:
Mỗi **Video quảng cáo** dựng trước ở khung hình chính 9:16, rồi xuất thêm khung hình phụ 16:9 từ cùng bản dựng.

**Nguyên liệu**:
Những gì người dùng đưa vào cho một video: logo, nội dung chữ, và một ít ảnh hoặc video thật. Phần còn thiếu do Claude dựng bằng đồ hoạ.
_Avoid_: asset, tài nguyên

**Bộ nhận diện**:
Logo, màu, font và giọng văn của thương hiệu duy nhất mà bộ **Skill** phục vụ, lưu ở một chỗ riêng để mọi **Skill** cùng đọc.
_Avoid_: brand kit, theme

**Phong cách**:
Cảm giác chung của mọi **Video quảng cáo**: tin cậy, chuyên môn (gọn, số liệu, chứng chỉ) pha năng động (cắt nhanh, chữ nảy, chuyển cảnh). Không dùng giọng đọc; thông điệp truyền qua chữ và nhạc.

**Điểm duyệt**:
Chỗ quy trình dừng lại chờ người dùng đồng ý trước khi đi tiếp. Có hai điểm: sau **Kịch bản** và sau **Storyboard xem trước**. Sau đó mới render.

**Storyboard xem trước**:
Ảnh tĩnh của từng cảnh, render từ chính bản dựng Remotion, để duyệt bố cục trước khi render video.

**Lower-third**:
Dải chữ ở mép dưới khung hình, thường ghi tên, chức danh hoặc thông điệp phụ.

**B-roll**:
Cảnh phụ chèn vào để minh hoạ cho lời nói hoặc cảnh chính.

## Relationships

- Mỗi **Skill** thuộc về đúng một **Khâu**, trừ skill điều phối chạy qua nhiều **Khâu**.
- **Kiến thức nghề** được chắt lọc thành **Skill**; mỗi **Skill** ghi nguồn **Kiến thức nghề** của nó.
- **Hiệu ứng** được dựng bằng Remotion; bộ **Skill** dạy cách làm nghề, còn kỹ thuật Remotion giao cho các skill của plugin Remotion.
- Bộ **Skill** gồm nhiều **Skill** nhỏ, mỗi skill một việc, và một **Skill điều phối** gọi chúng theo thứ tự các **Khâu**.
- Mọi **Video quảng cáo** đều dùng chung một **Bộ nhận diện** và một **Phong cách**.
- Thành phẩm được giao thẳng trong phiên chat.

## Flagged ambiguities

- "Kỹ năng" từng có thể hiểu là kỹ năng cho người học — đã chốt: chỉ là **Skill** cho Claude.
