import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Icon, IconSpec } from "./Icon";
import { C, FONT, pop } from "./tokens";

export type Token = { text: string } | { icon: IconSpec };

/**
 * Typed headline with a caret; icon tiles pop in between words and the line
 * re-centres as it grows. The caret takes the colour of the next icon.
 * Counts graphemes so Vietnamese diacritics never split.
 */
export const TypingLine: React.FC<{
  tokens: Token[]; start?: number; cps?: number; size?: number; maxWidth?: number; caret?: boolean;
}> = ({ tokens, start = 0, cps = 14, size = 120, maxWidth = 1500, caret = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seg = new Intl.Segmenter("vi", { granularity: "grapheme" });
  // timeline: each grapheme costs fps/cps frames, each icon 4 frames
  let t = start;
  const items = tokens.map((tk) => {
    if ("icon" in tk) { const at = t; t += 4; return { kind: "icon" as const, tk, at }; }
    const gs = [...seg.segment(tk.text.normalize("NFC"))].map((s) => s.segment);
    const at = t; t += (gs.length * fps) / cps;
    return { kind: "text" as const, gs, at };
  });
  const typingDone = frame >= t;
  const nextIcon = items.find((it) => it.kind === "icon" && it.at > frame);
  const caretColor = nextIcon && nextIcon.kind === "icon" ? nextIcon.tk.icon.color ?? C.blue : C.blue;
  const blinkOn = !typingDone || Math.floor((frame - t) / (fps / 2)) % 2 === 0;
  let caretPlaced = false;
  const caretEl = (k: string) => (caret && blinkOn ? (
    <span key={k} style={{ display: "inline-block", width: size * 0.05, height: size * 0.95, background: caretColor,
      verticalAlign: "middle", marginLeft: size * 0.04 }} />) : null);
  return (
    <div style={{ fontFamily: FONT, fontSize: size, fontWeight: 500, color: C.ink, letterSpacing: "-0.02em",
      maxWidth, textAlign: "center", lineHeight: 1.3, display: "flex", flexWrap: "wrap", justifyContent: "center",
      alignItems: "center", columnGap: size * 0.28, rowGap: size * 0.1 }}>
      {items.map((it, i) => {
        if (frame < it.at) return null;
        if (it.kind === "icon") {
          const s = pop(frame, fps, it.at);
          return (
            <span key={i} style={{ display: "inline-flex", transform: `translateY(${(1 - s) * -size * 0.5}px) scale(${s})` }}>
              <Icon icon={it.tk.icon} size={size * 0.82} tile />
            </span>
          );
        }
        const count = Math.min(it.gs.length, Math.floor(((frame - it.at) * 1) / (fps / cps)) + 1);
        const typingThis = count < it.gs.length || (frame - it.at) < it.gs.length * (fps / cps);
        const isLast = !caretPlaced && (typingThis || i === items.length - 1 || (items[i + 1] && frame < items[i + 1].at));
        if (isLast) caretPlaced = true;
        return (
          <span key={i} style={{ whiteSpace: "pre" }}>
            {it.gs.slice(0, count).join("")}
            {isLast ? caretEl("c" + i) : null}
          </span>
        );
      })}
    </div>
  );
};
