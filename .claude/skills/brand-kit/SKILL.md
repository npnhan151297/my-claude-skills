---
name: brand-kit
description: "Lập, kiểm tra và đọc Bộ nhận diện trong thư mục brand/ (logo, màu, font, giọng văn) thành token cho Remotion. Dùng khi bắt đầu video đầu tiên, khi brand/ thiếu hoặc đổi, hoặc khi cần màu/font thương hiệu."
---
# Bộ nhận diện

Một thương hiệu duy nhất, lưu một chỗ: `brand/` ở gốc dự án video. Mọi skill khác đọc từ đây; không chép màu hay font vào skill khác.

## Cấu trúc

```
brand/
  brand.json
  logo.svg | logo.png      # nền trong suốt; thêm logo-white.* nếu logo tối màu
  voice.md                 # giọng văn: xưng hô, từ nên dùng, từ cấm
```

`brand.json`:

```json
{
  "name": "Tên thương hiệu",
  "colors": { "primary": "#0D6B5C", "accent": "#F0A64A", "ink": "#101614", "paper": "#FFFFFF" },
  "fonts": { "display": "Be Vietnam Pro", "display_weight": 800, "body": "Be Vietnam Pro", "body_weight": 500 },
  "cta_default": "Đăng ký tư vấn miễn phí",
  "contact": { "website": "", "hotline": "", "zalo": "" }
}
```

## Quy trình

1. Nếu `brand/` chưa có: hỏi người dùng logo, 2–4 mã màu, font, câu CTA mặc định, kênh liên hệ. Thiếu font thì đề xuất font Google có dấu tiếng Việt (xem `vietnamese-type-safety`).
2. Kiểm tra: logo đọc được và có nền trong suốt; mỗi màu là hex hợp lệ; font có bộ chữ tiếng Việt; cặp `ink`/`paper` và `paper`/`primary` đạt tương phản theo `text-contrast-guard`.
3. Sinh `remotion/src/brand.ts` export `brand` (màu, font, logo path) từ `brand.json`, nạp font bằng `@remotion/google-fonts` với subset `vietnamese`.
4. Báo lại người dùng mọi chỗ thiếu hoặc không đạt.

## Xong khi

`brand.json` hợp lệ, `brand.ts` sinh xong, và mọi cặp màu chữ/nền dùng được đều qua kiểm tra tương phản.
