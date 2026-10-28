---
name: cut-craft
description: "Chọn kiểu cắt giữa hai cảnh: cắt thẳng, cắt theo chuyển động, match cut, J/L-cut với âm thanh. Dùng khi nối hai cảnh nguyên liệu thật hoặc khi một điểm cắt bị giật."
---
# Kỹ thuật cắt

Video quảng cáo này không có giọng đọc, nên cắt chủ yếu theo hình và nhạc.

## Chọn kiểu cắt

| Tình huống | Kiểu cắt |
|---|---|
| Mặc định, nhịp nhanh | **Cắt thẳng** đúng beat |
| Hai cảnh có chuyển động cùng hướng | **Cắt theo chuyển động**: cắt giữa động tác, không trước hay sau |
| Hai cảnh có hình dạng/vị trí giống nhau (vòng tròn → logo tròn) | **Match cut**: căn tâm hai hình trùng nhau |
| Nguyên liệu có tiếng (lớp học, học viên nói) | **J-cut**: tiếng cảnh sau vào trước 6–12 frame; **L-cut**: tiếng cảnh trước kéo dài sang cảnh sau |
| Đổi phần (bối cảnh → bằng chứng) | chuyển cảnh đồ hoạ theo `transitions-pro` |

## Quy tắc

- Cắt thẳng trước, chỉnh nhịp xong mới thêm J/L-cut.
- Không cắt giữa lúc chữ đang đọc dở.
- Hai cảnh nối nhau cùng khung hình (cùng góc, cùng cỡ) dễ thành "nhảy hình": đổi cỡ khung ít nhất 20% hoặc chèn chuyển cảnh.

## Xong khi

Mỗi điểm cắt trong storyboard ghi kiểu cắt, và không cặp cảnh nào bị nhảy hình.

Nguồn: PremiumBeat (8 kiểu cắt), Soundstripe (J-cut và L-cut).
