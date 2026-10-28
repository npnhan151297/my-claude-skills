# my-claude-skills

Skill dùng chung cho mọi môi trường Claude Code trên cloud.

## Cài vào môi trường

Dán vào **Setup script** của môi trường:

```bash
git clone --depth 1 https://github.com/npnhan151297/my-claude-skills /tmp/my-claude-skills && bash /tmp/my-claude-skills/install.sh
```

## Thêm skill mới

Tạo một thư mục mới chứa `SKILL.md` ở gốc repo rồi push lên `main`. Phiên mới mở sau đó sẽ tự có skill.

## Skill hiện có

- `grill-with-docs`: phỏng vấn dồn dập để mài sắc kế hoạch, đồng thời ghi ADR và glossary (gọi `grilling` + `domain-modeling`)
- `grilling`
- `domain-modeling`
- `dung-video-tu-footage`: dựng video sự kiện từ footage thô trên Drive (rà clip, chống rung, slow motion, cắt theo phách, chữ chạy Remotion, danh sách cảnh cho editor)

Nguồn: Matt Pocock — plugin "Skills For Real Engineers".
