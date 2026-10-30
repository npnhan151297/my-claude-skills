import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BLUE_TEXT, C, clamp, FONT } from "./tokens";

/**
 * Chapter title: a column of verbs spins vertically with motion blur and lands on
 * `target`, which turns blue; the others stay ghost grey. Use one per feature chapter.
 */
export const WordCarousel: React.FC<{ words: string[]; target: number; spins?: number; dur?: number; size?: number }> = ({
  words, target, spins = 1, dur = 24, size = 150,
}) => {
  const frame = useCurrentFrame();
  const lh = size * 1.12;
  const n = words.length;
  const endPos = target + n * spins;
  const ease = (t: number) => 1 - Math.pow(1 - t, 4);
  const pos = (fr: number) => interpolate(fr, [0, dur], [0, endPos], { ...clamp, easing: ease });
  const vel = Math.abs(pos(frame) - pos(frame - 1)) * lh;
  const blur = Math.min(18, vel * 0.12);
  const p = pos(frame);
  const rows = [];
  for (let k = Math.floor(p) - 3; k <= Math.floor(p) + 3; k++) {
    const w = words[((k % n) + n) % n];
    const dist = Math.abs(k - p);
    const sel = Math.max(0, 1 - dist * 1.6) * (frame > dur - 6 ? 1 : 0.4);
    rows.push(
      <div key={k} style={{ position: "absolute", top: "50%", left: 0, right: 0, textAlign: "center",
        transform: `translateY(${(k - p) * lh - lh / 2}px)`, height: lh, lineHeight: `${lh}px` }}>
        <span style={{ position: "relative", display: "inline-block" }}>
          <span style={{ color: C.ghost }}>{w}</span>
          <span style={{ position: "absolute", left: 0, top: 0, opacity: sel, ...BLUE_TEXT }}>{w}</span>
        </span>
      </div>,
    );
  }
  return (
    <AbsoluteFill style={{ fontFamily: FONT, fontSize: size, fontWeight: 500, letterSpacing: "-0.02em", filter: `blur(0px)` }}>
      <AbsoluteFill style={{ filter: `blur(${blur}px)`,
        WebkitMaskImage: "linear-gradient(transparent, #000 25%, #000 75%, transparent)", maskImage: "linear-gradient(transparent, #000 25%, #000 75%, transparent)" }}>
        {rows}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
