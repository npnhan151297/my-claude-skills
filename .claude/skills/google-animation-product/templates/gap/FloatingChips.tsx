import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Icon, IconSpec } from "./Icon";
import { C, FONT, SHADOW, settle } from "./tokens";

export type Chip = { label?: string; icon: IconSpec; x: number; y: number; depth: number };

/**
 * File/feature chips drifting around a headline. depth 0 = sharp and near,
 * 1 = small, blurred and far. Each chip pops in, drifts slowly, and parallaxes with depth.
 */
export const FloatingChips: React.FC<{ chips: Chip[]; children?: React.ReactNode; scale?: number }> = ({ chips, children, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {chips.map((c, i) => {
        const s = settle(frame, fps, i * 2);
        const drift = (1 - c.depth * 0.6) * 18;
        const dx = Math.sin((frame + i * 23) / 40) * drift - frame * (1 - c.depth) * 0.25;
        const dy = Math.cos((frame + i * 17) / 46) * drift;
        const k = (1 - c.depth * 0.45) * scale;
        return (
          <div key={i} style={{ position: "absolute", left: width / 2 + c.x * width, top: height / 2 + c.y * height,
            transform: `translate(-50%,-50%) translate(${dx}px, ${dy}px) scale(${k * s})`, opacity: s * (1 - c.depth * 0.35),
            filter: `blur(${c.depth * 3}px)` }}>
            {c.label ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", borderRadius: 14, padding: "10px 18px 10px 12px",
                boxShadow: SHADOW, fontFamily: FONT, fontSize: 26, color: C.ink, whiteSpace: "nowrap" }}>
                <Icon icon={c.icon} size={34} />{c.label}
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: "50%", boxShadow: SHADOW, padding: 10 }}><Icon icon={c.icon} size={52} /></div>
            )}
          </div>
        );
      })}
      {children}
    </AbsoluteFill>
  );
};
