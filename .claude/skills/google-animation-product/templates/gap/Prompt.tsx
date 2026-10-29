import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Sparkle } from "./Sparkle";
import { C, clamp, FONT, SHADOW } from "./tokens";

/** Prompt bar that types its text, then (optionally) turns into a shimmering "working" pill. */
export const PromptBar: React.FC<{ text: string; start: number; cps?: number; workingAt?: number; workingLabel?: string; width?: number; size?: number }> = ({
  text, start, cps = 28, workingAt, workingLabel = "Đang soạn nội dung…", width = 1100, size = 34,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gs = [...new Intl.Segmenter("vi", { granularity: "grapheme" }).segment(text.normalize("NFC"))].map((s) => s.segment);
  const n = Math.max(0, Math.min(gs.length, Math.floor(((frame - start) * cps) / fps)));
  const working = workingAt !== undefined && frame >= workingAt;
  const caretOn = n < gs.length || Math.floor(frame / (fps / 2)) % 2 === 0;
  const shimmerX = interpolate((frame % 40) / 40, [0, 1], [-100, 200]);
  return (
    <div style={{ width, display: "flex", alignItems: "center", gap: 18, background: "#fff", borderRadius: 999, padding: "20px 28px",
      boxShadow: SHADOW, fontFamily: FONT, fontSize: size, color: C.ink }}>
      {working ? <Sparkle size={size * 1.1} id="pb" /> : <span style={{ color: C.muted, fontSize: size * 1.2 }}>+</span>}
      <div style={{ flex: 1, position: "relative", whiteSpace: "nowrap", overflow: "hidden" }}>
        {working ? (
          <span style={{ backgroundImage: `linear-gradient(90deg, ${C.muted} 0%, ${C.muted} 40%, #c7d7fb 50%, ${C.muted} 60%)`,
            backgroundSize: "200% 100%", backgroundPosition: `${-shimmerX}% 0`, WebkitBackgroundClip: "text", color: "transparent" }}>{workingLabel}</span>
        ) : (
          <>{gs.slice(0, n).join("")}{caretOn ? <span style={{ borderLeft: `3px solid ${C.blue}`, marginLeft: 2 }} /> : null}</>
        )}
      </div>
      <div style={{ width: size * 1.5, height: size * 1.5, borderRadius: "50%", background: working ? "#D3E3FD" : C.line,
        display: "flex", alignItems: "center", justifyContent: "center", color: C.blue, fontWeight: 700 }}>{working ? "■" : "↑"}</div>
    </div>
  );
};

/** Card with skeleton lines that shimmer while "collecting". */
export const LoadingCard: React.FC<{ label?: string; tip?: string; width?: number }> = ({ label = "Đang thu thập thông tin…", tip, width = 900 }) => {
  const frame = useCurrentFrame();
  const bars = [0.9, 0.75, 0.55];
  return (
    <div style={{ width, background: "#fff", borderRadius: 28, padding: 40, boxShadow: SHADOW, fontFamily: FONT }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, color: C.ink }}><Sparkle size={38} id="lc" />{label}</div>
      <div style={{ display: "grid", gap: 16, marginTop: 28 }}>
        {bars.map((w, i) => {
          const p = interpolate(((frame + i * 6) % 36) / 36, [0, 1], [-60, 160]);
          return <div key={i} style={{ height: 18, width: `${w * 100}%`, borderRadius: 9,
            background: `linear-gradient(90deg, #E8F0FE ${p - 30}%, #AECBFA ${p}%, #E8F0FE ${p + 30}%)` }} />;
        })}
      </div>
      {tip ? <div style={{ marginTop: 28, fontSize: 26, color: "#7B61FF" }}>{tip}</div> : null}
    </div>
  );
};
