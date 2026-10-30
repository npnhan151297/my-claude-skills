# my-claude-skills

Bộ skill giúp Claude dựng **video quảng cáo dịch vụ/khoá học 15–60 giây** bằng Remotion, theo cách của nhà sản xuất video chuyên nghiệp. Thuật ngữ: `CONTEXT.md`. Quyết định: `docs/adr/`.

## Dùng

- **Phiên mở repo này** (ví dụ môi trường Video): skill trong `.claude/skills/` tự nạp. Bắt đầu bằng: *"Làm video quảng cáo cho khoá … "* — Claude sẽ dùng skill `ad-video-director`.
- **Skill Remotion** (`remotion-best-practices`, `remotion-render`, `remotion-captions`…) cần có trong phiên. Dán vào **Setup script** của môi trường:

```bash
git clone --depth 1 https://github.com/npnhan151297/my-claude-skills /tmp/my-claude-skills && bash /tmp/my-claude-skills/install.sh
```

## Skill

| Khâu | Skill |
|---|---|
| Điều phối, nền tảng | `ad-video-director`, `brand-kit`, `asset-intake` |
| Tiền kỳ | `ad-script`, `hook-writer`, `on-screen-copy-vi`, `storyboard-preview`, `asset-to-scene`, `ad-reference-breakdown` |
| Dựng | `pacing-rhythm`, `beat-sync`, `scene-assembly`, `b-roll-placement`, `cut-craft` |
| Hiệu ứng | `motion-principles`, `kinetic-typography`, `vietnamese-type-safety`, `transitions-pro`, `stat-counter-chart`, `lower-thirds`, `keyword-emphasis`, `logo-reveal`, `cta-endcard` |
| Phong cách Google for Education | `gfe-motion-style` (quét sọc 4 màu, lưới ô, lower-third đường kẻ, chữ số nổi khối, đường mạch) |
| Màu và âm thanh | `brand-color-grade`, `text-contrast-guard`, `music-edit`, `sfx-layer`, `loudness-master` |
| Phụ đề và xuất bản | `safe-zone-layout`, `reframe-16x9`, `captions-style`, `render-qc`, `cover-frame` |
| Google Animation Product (video sản phẩm kiểu Google) | `google-animation-product`, `gap-style`, `gap-logo-burst`, `gap-typing-icons`, `gap-gradient-sweep`, `gap-word-carousel`, `gap-floating-chips`, `gap-ui-demo`, `gap-3d-cards`, `gap-outro` |
| Video sự kiện từ footage thô | `dung-video-tu-footage` |
| Khác | `grill-with-docs`, `grilling`, `domain-modeling` (Matt Pocock) |

## Thêm skill mới

Tạo `.claude/skills/<ten-skill>/SKILL.md` rồi push lên `main`.
