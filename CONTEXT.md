# Bộ kỹ năng dựng video

Bộ Skill giúp Claude tự làm video quảng cáo theo cách của nhà sản xuất video chuyên nghiệp, từ kịch bản đến bản xuất cuối.

## Language

**Skill**:
Một thư mục chứa `SKILL.md` trong repo này, dạy Claude làm một việc cụ thể. Người dùng là Claude, không phải con người.
_Avoid_: kỹ năng nghề, khoá học, lộ trình học

**Kiến thức nghề**:
Cách làm, quy tắc, mẹo của nhà sản xuất video chuyên nghiệp, thu thập từ các nguồn bên ngoài. Là nguyên liệu để viết **Skill**, không phải sản phẩm cuối.

**Video quảng cáo**:
Video giới thiệu một sản phẩm hoặc dịch vụ nhằm thuyết phục người xem. Là loại video duy nhất bộ **Skill** nhắm tới ở giai đoạn này.
_Avoid_: video bài giảng, video khoá học, testimonial

**Khâu**:
Một bước trong quy trình làm **Video quảng cáo**. Bộ **Skill** phủ các khâu: Tiền kỳ (ý tưởng, kịch bản, storyboard), Dựng (nhịp cắt, chuyển cảnh, B-roll), Hiệu ứng, Màu và âm thanh, Phụ đề và xuất bản. Khâu Quay nằm ngoài phạm vi.

**Hiệu ứng**:
Thành phần hình ảnh được tạo bằng code, không có sẵn trong cảnh quay. Giai đoạn 1 gồm **Chữ động / đồ hoạ chuyển động** (tiêu đề, lower-third, số liệu, biểu đồ) và **Chuyển cảnh** (zoom, trượt, che khung, khớp hình). VFX ghép cảnh, 3D/particle và hiệu ứng AI để giai đoạn sau.

**Lower-third**:
Dải chữ ở mép dưới khung hình, thường ghi tên, chức danh hoặc thông điệp phụ.

**B-roll**:
Cảnh phụ chèn vào để minh hoạ cho lời nói hoặc cảnh chính.

## Relationships

- Mỗi **Skill** thuộc về đúng một **Khâu**, trừ skill điều phối chạy qua nhiều **Khâu**.
- **Kiến thức nghề** được chắt lọc thành **Skill**; mỗi **Skill** ghi nguồn **Kiến thức nghề** của nó.
- **Hiệu ứng** được dựng bằng Remotion.

## Flagged ambiguities

- "Kỹ năng" từng có thể hiểu là kỹ năng cho người học — đã chốt: chỉ là **Skill** cho Claude.
