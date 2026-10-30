---
name: gap-typing-icons
description: "Câu tiêu đề gõ từng chữ có con trỏ, xen icon sản phẩm nảy vào giữa các từ, dòng tự căn giữa và xuống dòng. Dùng cho câu mở và câu kết của video phong cách Google Animation Product."
---

# Chữ gõ có icon

Component: `templates/gap/TypingLine.tsx` trong skill `google-animation-product`.

## Dùng

```tsx
<TypingLine size={120} maxWidth={1100} tokens={[
  { text: "Giờ" }, { text: "đây" }, { icon: { src: staticFile("drive.png"), color: "#EA4335" } },
  { text: "bạn" }, { icon: DOC }, { text: "có thể" }, { icon: SHEET }, { text: "hỏi" }, { icon: SLIDE },
]} />
```

## Quy tắc

- Câu 3–6 từ, chia thành token; mỗi icon đặt **sau** một từ. Một từ nhiều âm tiết ("có thể", "ứng dụng") để chung một token để không bị ngắt dòng giữa từ.
- `maxWidth` quyết định chỗ xuống dòng: chọn sao cho câu thành 2 dòng cân nhau.
- Màu con trỏ lấy từ `color` của icon kế tiếp — đặt `color` khớp màu chính của icon.
- Chữ được đếm theo grapheme (`Intl.Segmenter`) nên dấu tiếng Việt không bị tách.
- Giữ câu đã gõ xong ít nhất 15 frame trước khi `gap-gradient-sweep` hoặc whip chuyển đi.

## Xong khi

Ảnh tĩnh lúc gõ xong cho thấy 2 dòng cân, icon cùng cỡ, không dấu nào bị cắt.
