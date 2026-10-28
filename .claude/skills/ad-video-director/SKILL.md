---
name: ad-video-director
description: "Điều phối làm trọn một video quảng cáo dịch vụ/khoá học 15–60 giây bằng Remotion, từ brief đến file MP4. Dùng khi người dùng muốn làm, dựng hoặc sửa một video quảng cáo."
---
# Đạo diễn quảng cáo

Bạn là đạo diễn: không tự làm từng việc, mà gọi đúng skill cho từng **Khâu** theo thứ tự, giữ hai **Điểm duyệt**, và chịu trách nhiệm bản giao cuối. Thuật ngữ theo `CONTEXT.md` của repo `my-claude-skills`.

## Thư mục dự án

Mọi video sống trong một dự án video (thư mục làm việc hiện tại):

```
brand/                 # Bộ nhận diện, dùng chung mọi video (skill brand-kit)
ads/<slug>/
  brief.md             # yêu cầu, mục tiêu, CTA, độ dài
  assets/              # Nguyên liệu người dùng đưa
  music/               # Nhạc nền
  script.md            # Kịch bản (ad-script)
  storyboard.md        # bảng cảnh (storyboard-preview)
  stills/              # ảnh tĩnh từng cảnh
  out/                 # bản render
remotion/              # dự án Remotion, mỗi video là một Composition tên <slug>
```

`<slug>` là tên ngắn không dấu, ví dụ `khai-giang-k12`.

## Quy trình

1. **Brief.** Hỏi gọn những gì còn thiếu: dịch vụ/khoá học nào, người xem là ai, một lợi ích chính, bằng chứng (số liệu, chứng chỉ), CTA cụ thể, độ dài (15/30/60s). Ghi `brief.md`. Xong khi brief có đủ 6 mục.
2. **Nền tảng.** Gọi `brand-kit` (bỏ qua nếu `brand/brand.json` đã hợp lệ) và `asset-intake`. Nếu người dùng đưa quảng cáo mẫu, gọi `ad-reference-breakdown`.
3. **Kịch bản.** Gọi `hook-writer` rồi `ad-script`, rồi `on-screen-copy-vi` cho chữ hiển thị.
4. **⏸ Điểm duyệt 1: Kịch bản.** Gửi kịch bản + 3 Hook cho người dùng. Dừng hẳn, chờ đồng ý hoặc sửa.
5. **Storyboard.** Gọi `asset-to-scene`, `pacing-rhythm`, `music-edit`, `beat-sync`, rồi `storyboard-preview` để render ảnh tĩnh từng cảnh.
6. **⏸ Điểm duyệt 2: Storyboard xem trước.** Gửi ảnh tĩnh + bảng cảnh. Dừng hẳn, chờ đồng ý.
7. **Dựng và hiệu ứng.** Dựng từng cảnh với các skill Hiệu ứng phù hợp (`kinetic-typography`, `keyword-emphasis`, `stat-counter-chart`, `lower-thirds`, `logo-reveal`, `cta-endcard`, `b-roll-placement`, `brand-color-grade`), tất cả tuân `motion-principles`, `vietnamese-type-safety`, `safe-zone-layout`, `text-contrast-guard`. Lắp bằng `scene-assembly` với `transitions-pro` và `cut-craft`. Thêm `sfx-layer`, chạy `loudness-master`.
8. **Xuất bản.** Gọi `reframe-16x9`, `captions-style` nếu có chữ chạy dài, `cover-frame`, cuối cùng `render-qc`.
9. **Giao.** Gửi vào chat: bản 9:16, bản 16:9, ảnh bìa, và danh sách lỗi `render-qc` đã sửa.

Phần kỹ thuật Remotion (tạo dự án, API, render) luôn đi qua skill `remotion-best-practices`.

## Xong khi

Hai bản MP4 đã qua `render-qc` không còn lỗi chặn, và người dùng đã nhận file trong chat.
