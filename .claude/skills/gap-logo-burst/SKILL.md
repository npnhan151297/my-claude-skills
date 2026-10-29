---
name: gap-logo-burst
description: "Cảnh mở logo kiểu Google: logo rơi từ to xuống có nhoè, icon sản phẩm bay vào quanh logo theo chiều sâu rồi hút vào tâm. Dùng cho 2 giây đầu video phong cách Google Animation Product."
---

# Mở logo (logo burst)

Component: `templates/gap/LogoBurst.tsx` trong skill `google-animation-product`.

## Dùng

```tsx
<Sequence durationInFrames={60}>
  <LogoBurst dur={60} logo={{ src: staticFile("logo.png") }} icons={[
    { src: staticFile("icon-a.png"), x: -0.17, y: -0.06, size: 130 },
    { src: staticFile("icon-b.png"), x: 0.14, y: 0.22, size: 200 },
  ]} />
</Sequence>
```

## Quy tắc

- 3–5 icon; `x`, `y` là vị trí so với tâm theo tỉ lệ khung (−0.5…0.5). Rải không đối xứng: một icon to (gần) ở góc dưới, một icon nhỏ (xa) phía trên.
- Cỡ icon từ 100 đến 200px để có chiều sâu; icon to nhất được phép tràn một phần ra mép khung.
- Logo rơi trong 12 frame đầu; icon bắt đầu từ frame 18, so le 2 frame; 8 frame cuối mọi thứ hút vào tâm và chuyển sang `gap-typing-icons`.

## Xong khi

Ảnh tĩnh ở frame 10, 35 và 55 cho thấy lần lượt: logo đang rơi, icon đã lắng quanh logo, mọi thứ đang hút vào tâm.
