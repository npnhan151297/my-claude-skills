import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Sparkle } from "./Sparkle";
import { C, clamp, EASE, FONT, ramp, velocityBlur } from "./tokens";

/**
 * Transition + reveal: a giant gradient sparkle sweeps in from a corner, covers the
 * frame while spinning, shrinks onto the wordmark's left, then the wordmark letters
 * slide out from behind it with motion blur. Place it over the outgoing scene.
 */
export const GradientSweep: React.FC<{ word: string; from?: "br" | "bl"; size?: number; markX?: number; bg?: boolean }> = ({ word, from = "br", size = 130, markX, bg = true }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const sx = from === "br" ? 1 : -1;
  // 0–10 sweep in big, 10–16 shrink to mark, 14–30 letters
  const scale = (fr: number) => interpolate(fr, [0, 9, 16], [7, 12, 1], { ...clamp, easing: EASE });
  const x = (fr: number) => interpolate(fr, [0, 9, 16], [sx * width * 0.55, sx * width * 0.1, markX ?? -size * 1.9], { ...clamp, easing: EASE });
  const y = (fr: number) => interpolate(fr, [0, 9, 16], [height * 0.6, 0, 0], { ...clamp, easing: EASE });
  const rot = interpolate(frame, [0, 16], [-70, 0], { ...clamp, easing: EASE });
  const blur = velocityBlur((fr) => x(fr) + y(fr), frame, 0.03, 8);
  const wordStart = 13;
  // markX: vị trí cuối của ngôi sao so với tâm khung (tên dài cần đặt xa hơn mặc định)
  const chars = [...word];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {bg && <AbsoluteFill style={{ background: C.bg, opacity: ramp(frame, 6, 10) }} />}
      <div style={{ display: "flex", alignItems: "center", fontFamily: FONT, fontSize: size, fontWeight: 500, letterSpacing: "-0.02em" }}>
        <div style={{ width: size * 0.95 }} />
        {chars.map((ch, i) => {
          const s = wordStart + i * 1.2;
          const p = ramp(frame, s, s + 10);
          return (
            <span key={i} style={{ display: "inline-block", whiteSpace: "pre", color: C.blue,
              opacity: p, transform: `translateX(${(1 - p) * -size * 0.6}px)`, filter: `blur(${(1 - p) * 10}px)` }}>{ch}</span>
          );
        })}
      </div>
      <div style={{ position: "absolute", transform: `translate(${x(frame)}px, ${y(frame)}px) rotate(${rot}deg) scale(${scale(frame)})`,
        filter: `blur(${blur / scale(frame)}px)` }}>
        <Sparkle size={size * 0.85} id="sweep" />
      </div>
    </AbsoluteFill>
  );
};
