---
name: b-roll-placement
description: "Chèn ảnh/video thật làm B-roll minh hoạ cho chữ, và làm ảnh tĩnh chuyển động nhẹ (Ken Burns). Dùng khi cảnh dùng nguyên liệu thật hoặc ảnh tĩnh trông bị đứng."
---
# Chèn B-roll

## Quy tắc

- **Ảnh tĩnh** luôn chuyển động: zoom 100% → 108–112% hoặc trượt 3–5% chiều rộng trong suốt cảnh, easing tuyến tính hoặc ease-in-out rất nhẹ. Hướng zoom theo điểm nhìn (mặt người, chứng chỉ).
- **Video**: lấy đoạn có chuyển động rõ nhất; cảnh ≤ 3s; tắt tiếng gốc trừ khi cố ý.
- **Khung 9:16 từ nguồn ngang**: không cắt mặt người; nếu cắt mất ý, đặt video ngang ở giữa trên nền mờ của chính nó (blur 40px, tối 30%).
- Chữ đè lên B-roll: theo `text-contrast-guard` (nền đỡ hoặc lớp tối).
- Màu B-roll đồng bộ theo `brand-color-grade`.

## Xong khi

Không ảnh tĩnh nào đứng yên quá 0,5s, không cảnh nào cắt mất mặt người, và chữ đè lên B-roll đều qua kiểm tra tương phản.
