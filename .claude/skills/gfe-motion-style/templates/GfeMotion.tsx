// Ngôn ngữ chuyển động kiểu Google for Education cho Remotion.
// Mỗi component tự tính theo useCurrentFrame() của Sequence chứa nó (frame 0 = lúc component bắt đầu).
import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const G = { blue: "#4285F4", red: "#EA4335", yellow: "#FBBC04", green: "#34A853" };
export const G_LIGHT = { blue: "#8AB4F8", red: "#F28B82", yellow: "#FDD663", green: "#81C995" };
export const INK = "#202124";
export const INK_SOFT = "#5F6368";
const ORDER = [G.blue, G.red, G.yellow, G.green];
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/**
 * Quét sọc 4 màu: 4 sọc xanh dương/đỏ/vàng/xanh lá trượt vào từ phải phủ kín khung,
 * rồi dồn về mép trái và biến mất, lộ cảnh sau. Đặt Sequence bắt đầu `dur/2` frame trước điểm cắt.
 */
export const StripeWipe: React.FC<{ dur?: number }> = ({ dur = 20 }) => {
  const f = useCurrentFrame();
  const half = dur / 2;
  const bars = ORDER.map((c, i) => {
    const inP = interpolate(f, [i * 1.2, half], [0, 1], { ...clamp, easing: easeOut });
    const outP = interpolate(f, [half + i * 0.8, dur], [0, 1], { ...clamp, easing: easeInOut });
    // vào: mép trái đi từ 100% về i*25%; ra: cả sọc co về dải mỏng sát mép trái rồi trượt ra ngoài
    const left = interpolate(inP, [0, 1], [100, i * 25]) * (1 - outP) + (i * 1.6 - 7) * outP;
    const right = (i === 3 ? 101 : (i + 1) * 25) * (1 - outP) + ((i + 1) * 1.6 - 7) * outP;
    return { c, left, right };
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {bars.map(({ c, left, right }, i) => {
        // sọc sau phủ lên sọc trước: kéo mép phải tới mép trái của sọc kế để không hở khe
        const r = i < 3 ? Math.max(right, bars[i + 1].left + 0.5) : right;
        return <div key={c} style={{ position: "absolute", top: 0, bottom: 0, left: `${left}%`, width: `${Math.max(0, r - left)}%`, background: c }} />;
      })}
    </AbsoluteFill>
  );
};

/** Lưới ô chữ nhật hai sắc xanh lần lượt phủ rồi rút đi (kiểu chuyển cảnh trong video Screencast). */
export const BlockWipe: React.FC<{ dur?: number; cols?: number; rows?: number }> = ({ dur = 20, cols = 6, rows = 4 }) => {
  const f = useCurrentFrame();
  const half = dur / 2;
  const cells = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const k = r * cols + c;
      const jitter = ((k * 37) % 11) / 11; // trễ giả ngẫu nhiên nhưng cố định
      const inP = interpolate(f, [jitter * half * 0.6, jitter * half * 0.6 + half * 0.55], [0, 1], { ...clamp, easing: easeOut });
      const outP = interpolate(f, [half + jitter * half * 0.5, half + jitter * half * 0.5 + half * 0.5], [0, 1], { ...clamp, easing: easeInOut });
      const s = inP * (1 - outP);
      const fromLeft = (c + r) % 2 === 0;
      cells.push(
        <div
          key={k}
          style={{
            position: "absolute",
            left: `${(c / cols) * 100}%`,
            top: `${(r / rows) * 100}%`,
            width: `${100 / cols + 0.2}%`,
            height: `${100 / rows + 0.2}%`,
            background: (k * 7) % 3 === 0 ? G_LIGHT.blue : G.blue,
            transformOrigin: fromLeft ? "left center" : "right center",
            transform: `scaleX(${s})`,
          }}
        />,
      );
    }
  return <AbsoluteFill style={{ pointerEvents: "none" }}>{cells}</AbsoluteFill>;
};

/** Các viên con nhộng màu trượt ngang với tốc độ khác nhau trên nền trắng (mở đầu kiểu ChromeOS). */
export const PillField: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const pills = [
    { y: 8, w: 30, h: 9, c: G_LIGHT.blue, v: 1.0, x0: -10 },
    { y: 26, w: 22, h: 8, c: G.blue, v: 1.6, x0: 70 },
    { y: 44, w: 38, h: 10, c: G_LIGHT.blue, v: 0.8, x0: 5 },
    { y: 62, w: 26, h: 9, c: G.green, v: 1.3, x0: 60 },
    { y: 78, w: 18, h: 8, c: G.yellow, v: 1.9, x0: 20 },
    { y: 88, w: 30, h: 9, c: G.red, v: 1.1, x0: 75 },
  ];
  return (
    <AbsoluteFill style={{ background: "white", overflow: "hidden" }}>
      {pills.map((p, k) => {
        const x = p.x0 - (f / dur) * 60 * p.v;
        const exit = interpolate(f, [dur - 10, dur], [0, -140], { ...clamp, easing: Easing.in(Easing.cubic) });
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              top: `${p.y}%`,
              left: `${x + exit * p.v}%`,
              width: `${p.w}%`,
              height: `${p.h}%`,
              borderRadius: 999,
              background: p.c,
              opacity: 0.9,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Chữ số nổi khối: mặt chữ xanh Google, phần đùn 3D xanh lá nhạt lệch xuống phải. */
export const Extruded: React.FC<{ text: string; size: number; color?: string; depth?: number; style?: React.CSSProperties; font: string }> = ({
  text,
  size,
  color = G.blue,
  depth = 10,
  style,
  font,
}) => {
  const layers = Array.from({ length: depth }, (_, k) => `${k + 1}px ${k + 1}px 0 ${k < depth - 1 ? "#CEEAD6" : "#A8DAB5"}`).join(", ");
  return (
    <span style={{ fontFamily: font, fontWeight: 900, fontSize: size, lineHeight: 0.92, color, textShadow: layers, letterSpacing: -size * 0.02, ...style }}>
      {text}
    </span>
  );
};

/** Gõ chữ từng ký tự kèm con trỏ gạch dưới nhấp nháy (ký tự = grapheme, không cắt dấu tiếng Việt). */
export const Typewriter: React.FC<{ text: string; delay?: number; cps?: number; size: number; color?: string; font: string; weight?: number }> = ({
  text,
  delay = 0,
  cps = 28,
  size,
  color = INK,
  font,
  weight = 700,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chars = Array.from(text.normalize("NFC"));
  const n = Math.max(0, Math.min(chars.length, Math.floor(((f - delay) / fps) * cps)));
  const done = n >= chars.length;
  const blink = done ? Math.floor(f / 8) % 2 === 0 : true;
  return (
    <span style={{ fontFamily: font, fontWeight: weight, fontSize: size, color, whiteSpace: "pre-wrap", lineHeight: 1.3 }}>
      {chars.slice(0, n).join("")}
      <span style={{ display: "inline-block", width: size * 0.5, height: 3, marginLeft: 2, background: color, opacity: blink && f >= delay ? 1 : 0 }} />
    </span>
  );
};

/** Đường mạch: nét vẽ dần theo strokeDashoffset, chấm màu nảy ra ở các nút sau khi nét đi qua. */
export const CircuitLines: React.FC<{
  paths: { d: string; len: number; delay: number; dots?: { x: number; y: number; c: string; at: number }[] }[];
  width: number;
  height: number;
  stroke?: string;
}> = ({ paths, width, height, stroke = "#9AA0A6" }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", inset: 0 }}>
      {paths.map((p, k) => {
        const draw = interpolate(f, [p.delay, p.delay + 18], [p.len, 0], { ...clamp, easing: easeOut });
        return (
          <g key={k}>
            <path d={p.d} fill="none" stroke={stroke} strokeWidth={2.5} strokeDasharray={p.len} strokeDashoffset={draw} strokeLinecap="round" strokeLinejoin="round" />
            {(p.dots ?? []).map((d, j) => {
              const s = spring({ frame: f - p.delay - d.at, fps, config: { damping: 11, stiffness: 200 }, durationInFrames: 16 });
              return <circle key={j} cx={d.x} cy={d.y} r={9 * s} fill={d.c} />;
            })}
          </g>
        );
      })}
    </svg>
  );
};

/** Ô biểu tượng nảy vào, có bóng phẳng lệch (flat offset shadow). */
export const IconTile: React.FC<{ x: number; y: number; size: number; color: string; delay: number; children?: React.ReactNode }> = ({
  x,
  y,
  size,
  color,
  delay,
  children,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - delay, fps, config: { damping: 12, stiffness: 180 }, durationInFrames: 20 });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: "white",
        border: `3px solid ${color}`,
        boxShadow: `6px 6px 0 ${color}33`,
        transform: `scale(${s}) rotate(${(1 - s) * -12}deg)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

/**
 * Lower-third kiểu GfE: một đường mảnh vẽ ngang khung, rồi mở thành dải trắng mờ,
 * chữ đậm màu mực hiện ra, huy hiệu 4 chấm màu bên trái.
 */
export const LineBar: React.FC<{ dur: number; title: string; sub?: string; font: string; bottom?: number }> = ({ dur, title, sub, font, bottom = 70 }) => {
  const f = useCurrentFrame();
  const line = interpolate(f, [0, 9], [0, 100], { ...clamp, easing: easeOut });
  const open = interpolate(f, [7, 15], [0, 1], { ...clamp, easing: easeOut });
  const text = interpolate(f, [12, 20], [0, 1], { ...clamp, easing: easeOut });
  const out = interpolate(f, [dur - 9, dur], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const h = sub ? 104 : 84;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom,
          width: `${line * (1 - out)}%`,
          height: Math.max(2, h * open * (1 - out)),
          background: `rgba(255,255,255,${0.35 + 0.55 * open})`,
          backdropFilter: "blur(6px)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          paddingLeft: 64,
          gap: 22,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "14px 14px", gap: 5, opacity: text, flexShrink: 0 }}>
          {ORDER.map((c) => (
            <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />
          ))}
        </div>
        <div style={{ opacity: text, translate: `${(1 - text) * 16}px 0`, whiteSpace: "nowrap" }}>
          <div style={{ fontFamily: font, fontWeight: 800, fontSize: 40, color: INK, lineHeight: 1.25 }}>{title}</div>
          {sub && <div style={{ fontFamily: font, fontWeight: 500, fontSize: 26, color: INK_SOFT, lineHeight: 1.3 }}>{sub}</div>}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Khung cửa sổ kiểu minh hoạ GfE (thanh tiêu đề xanh, viền mảnh) chứa footage hoặc nội dung bất kỳ. */
export const WindowFrame: React.FC<{ x: number; y: number; w: number; h: number; delay?: number; children: React.ReactNode }> = ({
  x,
  y,
  w,
  h,
  delay = 0,
  children,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - delay, fps, config: { damping: 200 }, durationInFrames: 22 });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 10,
        overflow: "hidden",
        border: "3px solid #DADCE0",
        background: "white",
        boxShadow: `10px 10px 0 ${G_LIGHT.blue}55`,
        opacity: s,
        transform: `translateY(${(1 - s) * 40}px) scale(${0.94 + 0.06 * s})`,
      }}
    >
      <div style={{ height: 26, background: G.blue, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 10, gap: 6 }}>
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ width: 9, height: 9, borderRadius: 5, background: "white", opacity: 0.85 }} />
        ))}
      </div>
      <div style={{ position: "absolute", top: 26, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>{children}</div>
    </div>
  );
};

/** 4 chấm Google nảy vào ở giữa, rồi bay giãn ra bốn góc nhường chỗ cho logo. */
export const DotsBurst: React.FC<{ at?: number }> = ({ at = 0 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", pointerEvents: "none" }}>
      {ORDER.map((c, k) => {
        const pop = spring({ frame: f - at - k * 3, fps, config: { damping: 10, stiffness: 220 }, durationInFrames: 16 });
        const fly = interpolate(f, [at + 22, at + 40], [0, 1], { ...clamp, easing: easeInOut });
        const dx = (k - 1.5) * 34 * (1 - fly) + [-560, -190, 190, 560][k] * fly;
        const dy = [-250, 250, -250, 250][k] * fly;
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              width: 22,
              height: 22,
              borderRadius: 11,
              background: c,
              transform: `translate(${dx}px, ${dy - Math.sin(Math.min(1, pop) * Math.PI) * 26}px) scale(${pop * (1 - 0.3 * fly)})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
