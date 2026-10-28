---
name: on-screen-copy-vi
description: "Biến ý kịch bản thành chữ hiển thị tiếng Việt trên màn hình: ngắn, ngắt dòng đúng cụm từ, đủ thời gian đọc. Dùng khi viết hoặc kiểm tra chữ trên màn hình."
---
# Chữ trên màn hình tiếng Việt

## Quy tắc

- Tối đa **2 dòng** mỗi khối, **2–5 từ** mỗi dòng (từ = một âm tiết tiếng Việt).
- **Ngắt dòng theo cụm**, không tách cụm danh từ, động từ + bổ ngữ, số + đơn vị: "Đạt IELTS 7.0 / sau 12 tuần", không "Đạt IELTS / 7.0 sau 12 tuần".
- Không để một âm tiết đứng một mình ở dòng cuối.
- **Thời gian đọc**: tối thiểu `0,6s + 0,25s × số âm tiết` cho mỗi khối, cộng thêm 0,3s nếu có số liệu. Đây là quy ước khởi đầu, chỉnh lại sau khi xem thử.
- Chữ hoa toàn bộ chỉ cho ≤ 3 từ (dấu chồng ở chữ hoa khó đọc hơn).
- Số viết theo kiểu Việt: 2.300, 7,5; đơn vị viết sau số.
- Giọng văn theo `brand/voice.md`.

## Quy trình

1. Với mỗi cảnh trong `script.md`, viết khối chữ và tách dòng bằng `/`.
2. Tính thời gian đọc; nếu vượt thời lượng cảnh, cắt chữ trước, kéo dài cảnh sau.
3. Đánh dấu một **từ khoá** mỗi khối cho `keyword-emphasis`.

## Xong khi

Mọi khối ≤ 2 dòng, mọi dòng ≤ 5 âm tiết hoặc có lý do, và mọi cảnh có thời lượng ≥ thời gian đọc.
