---
name: gfe-slide-layouts
description: "Thư viện 23 layout của Bản gốc Google for Education (bìa, agenda, ngăn chương, diễn giả, 2/3/4 ý, bảng, timeline, ảnh...): layout nào dùng khi nào, khoá dữ liệu và giới hạn ký tự tiếng Việt của từng ô. Dùng khi chọn bố cục cho từng slide, viết Dàn ý hoặc deck.json cho bộ slide Google for Education."
---

# Thư viện layout

Nguồn sự thật là [`layouts.json`](layouts.json): mỗi layout trỏ tới một slide trong Bản gốc (`p2`, `p22`...), kèm ID từng ô, toạ độ, kiểu chữ và giới hạn ký tự. Script `gfe-slide-director/scripts/gfe_build.py` đọc file này. Bảng dưới đây tóm tắt để chọn layout và viết `deck.json`.

## Chọn layout

| Khoá | Dùng khi | Khoá dữ liệu trong deck.json (giới hạn ký tự) |
|---|---|---|
| `bia` | Slide đầu tiên của mọi bộ slide | `tieu_de` (≤50, dài hơn 22 ký tự thì tự giảm cỡ chữ); `phu_de` (≤45, tuỳ chọn) |
| `agenda` | 3–8 phần của buổi đào tạo, ngay sau bìa | `tieu_de` (mặc định “Nội dung”); `muc`: 3–8 chuỗi ≤30 |
| `muc-luc` | Tổng quan 3–6 phần, mỗi phần một câu mô tả | `tieu_de` (≤22); `muc`: 3–6 mục {`dau` ≤22, `than` ≤60} |
| `ngan-chuong-so` | Mở đầu một phần, dãy chấm 01–08 ở góc trên tô xanh phần hiện tại | `tieu_de` (≤24, lý tưởng ≤18 để nằm một dòng); `so`, `tong` |
| `ngan-chuong` | Mở đầu một phần, tiêu đề giữa slide | `tieu_de` (≤34); `so`, `tong` |
| `dien-gia-1` | Giới thiệu một người đào tạo | `ten`: {`ten` ≤28, `don_vi` ≤34}; `anh` |
| `dien-gia-3` | 2–3 người đào tạo (2 người thì tự căn giữa) | `nguoi`: 2–3 mục {`dau` ≤22, `than` ≤26, `anh`} |
| `cau-nhan-manh` | Một thông điệp chính đứng riêng | `cau` (≤110) |
| `trich-dan` | Lời của giáo viên, hiệu trưởng, đối tác có tên thật | `loi` (≤170); `nguoi`: {`ten` ≤30, `mo_ta` ≤45} |
| `giao-dien-trai` | Giới thiệu một màn hình phần mềm (ảnh chụp lớn bên phải) | `tieu_de` (≤36); `noi_dung` (≤300, được xuống đoạn); `cta` (tuỳ chọn); `anh` |
| `tieu-de-laptop` | Trang web/ứng dụng trên máy tính (khung laptop) | `tieu_de` (≤30); `noi_dung` (≤120); `anh` |
| `anh-tablet` | Thao tác trên máy tính bảng/Chromebook | `tieu_de` (≤26); `noi_dung` (≤130); `cta` (tuỳ chọn); `anh` |
| `anh-lon-phai` | Một ảnh lớn (lớp học, hoạt động) kèm giải thích | `tieu_de` (≤26); `noi_dung` (≤130); `cta` (tuỳ chọn); `anh` |
| `so-sanh-2` | So sánh hai lựa chọn/chế độ/phiên bản | `tieu_de` (≤40); `nhan_trai`, `nhan_phai` (≤16); `trai`, `phai`: {`y` ≤50, `chi_tiet` ≤110}; `anh_trai`, `anh_phai` |
| `ba-cot-anh` | Đúng 3 nội dung ngang hàng, mỗi cái một ảnh | `tieu_de` (≤40); `cot`: 3 mục {`dau` ≤24, `than` ≤120, `lien_ket` tuỳ chọn, `anh`} |
| `anh-ghep` | Không khí lớp học: 4 ảnh ghép + 2 ý | `tieu_de` (≤26); `y`: 2 mục {`dau` ≤30, `than` ≤110}; `anh_1`…`anh_4` |
| `tieu-de-doan-van` | Giải thích một khái niệm bằng 1–2 đoạn | `tieu_de` (≤24, dài hơn 14 ký tự thì tự giảm cỡ); `noi_dung`: {`doan_1` ≤220, `doan_2` ≤260}; `cta` (tuỳ chọn) |
| `tieu-de-2-y` | Một ý dẫn bên trái, hai ý chi tiết bên phải | `tieu_de` (≤26); `dan` (≤130); `y`: 2 mục {`dau` ≤34, `than` ≤220} |
| `ba-y` | Đúng 3 ý ngang hàng (bước, lợi ích, yêu cầu) | `tieu_de` (≤40); `y`: 3 mục {`dau` ≤24, `than` ≤120} |
| `bon-y` | Đúng 4 ý ngang hàng | `tieu_de` (≤40); `y`: 4 mục {`dau` ≤18, `than` ≤120, `lien_ket` tuỳ chọn} |
| `bang` | So sánh nhiều tiêu chí | `tieu_de` (≤40); `bang`: mảng dòng, dòng đầu là tiêu đề cột, tối đa 8 dòng × 5 cột, ô ≤40 |
| `timeline` | Lộ trình, mốc thời gian, các bước theo thứ tự | `tieu_de` (≤40); `moc`: 4–6 mục {`dau` ≤20, `than` ≤90} |
| `cam-on` | Slide cuối của mọi bộ slide | `loi_cam_on` (mặc định “Cảm ơn”) |

Khoá ảnh (`anh`, `anh_trai`…) là **mô tả** ảnh cần chụp/chèn; script dựng Khung chèn ảnh ghi “Chèn ảnh: <mô tả>”. Bỏ trống thì khung chỉ ghi “Chèn ảnh”.

## Xếp bộ slide đào tạo

- Khung chuẩn: `bia` → `agenda` → mỗi phần: (`ngan-chuong-so` hoặc `ngan-chuong`) → 2–5 slide nội dung → `ba-y`/`bon-y` tóm tắt → `cam-on`. Giới thiệu người đào tạo (`dien-gia-*`) đặt ngay sau bìa nếu cần.
- Có agenda thì mỗi phần trong agenda phải có đúng một slide ngăn chương, `so`/`tong` khớp thứ tự agenda; xen kẽ hai kiểu ngăn chương.
- Không dùng cùng một layout quá 2 slide liền nhau; đổi giữa layout chữ và layout có ảnh.
- Số mục phải khớp layout: 3 ý thì `ba-y`, 4 ý thì `bon-y`, 5 ý trở lên thì tách slide hoặc dùng `bang`/`timeline`. Không nhồi.
- Không có slide số liệu hay biểu đồ; con số quan trọng đưa vào `cau-nhan-manh` hoặc `bang`.

## Khi Bản gốc thay đổi

Thêm hoặc sửa layout trong Bản gốc thì cập nhật `layouts.json`: đọc slide bằng `read_presentation` (mask có `pageElements(objectId,size,transform,shape(text))`), ghi ID ô chữ, toạ độ pt (EMU ÷ 12700), cỡ chữ của mẫu, và ID các phần tử phụ (thẻ, chấm, mũi tên) cần xoá khi bỏ mục. Chạy thử một bộ slide có layout đó rồi xem ảnh trước khi dùng thật.
