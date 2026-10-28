# Dựng video bằng Remotion, dựa trên plugin Remotion

Bộ Skill cho Claude tự làm video quảng cáo từ đầu đến cuối, kể cả hiệu ứng, nên cần một công cụ dựng mà Claude điều khiển được hoàn toàn bằng code. Chúng tôi chọn Remotion (dựng video bằng React) thay cho phần mềm dựng của con người (Premiere, After Effects, CapCut, DaVinci) và thay cho chỉ dùng FFmpeg. Các Skill của chúng tôi chỉ dạy cách làm nghề (kịch bản, nhịp, bố cục, hiệu ứng nào dùng khi nào) và giao phần kỹ thuật Remotion (tạo dự án, phụ đề, render) cho các skill của plugin Remotion, thay vì viết lại.

## Considered Options

- **Phần mềm dựng của con người**: Claude chỉ hướng dẫn hoặc tạo file dự án, người dùng phải tự thao tác — trái mục tiêu Claude làm trọn vòng.
- **Chỉ FFmpeg**: làm được cắt ghép, phụ đề, nhưng hiệu ứng chữ động và chuyển cảnh rất hạn chế.
- **Viết lại kỹ thuật Remotion trong bộ Skill**: không phụ thuộc plugin, nhưng trùng lặp và phải tự cập nhật khi Remotion đổi.

## Consequences

- Môi trường nào dùng bộ Skill cũng phải có plugin Remotion và chạy được Chromium để render.
- Đổi sang công cụ dựng khác về sau gần như phải viết lại toàn bộ Skill phần Hiệu ứng và Dựng.
