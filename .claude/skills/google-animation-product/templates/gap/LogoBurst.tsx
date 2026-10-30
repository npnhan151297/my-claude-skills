import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Icon, IconSpec } from "./Icon";
import { clamp, EASE, EASE_IN, ramp, settle, velocityBlur } from "./tokens";

/**
 * Intro: the main logo lands big-to-small with blur, product icons fly in from
 * off-screen to an orbit around it (bigger = closer), then everything sucks into the centre.
 */
export const LogoBurst: React.FC<{
  logo: IconSpec; icons: (IconSpec & { x: number; y: number; size: number })[]; dur: number;
}> = ({ logo, icons, dur }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const out = (fr: number) => ramp(fr, dur - 8, dur, 0, 1, EASE_IN);
  const logoScale = (fr: number) => interpolate(fr, [0, 12], [3.2, 1], { ...clamp, easing: EASE }) * (1 - out(fr));
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {icons.map((ic, i) => {
        const d = 18 + i * 2;
        const p = (fr: number) => settle(fr, fps, d);
        const tx = (fr: number) => (ic.x * width * (1 + (1 - p(fr)) * 1.2)) * (1 - out(fr));
        const ty = (fr: number) => (ic.y * height * (1 + (1 - p(fr)) * 1.2)) * (1 - out(fr));
        const blur = velocityBlur((fr) => tx(fr) + ty(fr), frame, 0.25, 30);
        return (
          <div key={i} style={{ position: "absolute", transform: `translate(${tx(frame)}px, ${ty(frame)}px) scale(${1 - out(frame) * 0.8})`,
            filter: `blur(${blur}px)`, opacity: frame < d ? 0 : 1 }}>
            <Icon icon={ic} size={ic.size} />
          </div>
        );
      })}
      <div style={{ transform: `scale(${logoScale(frame)})`, filter: `blur(${velocityBlur(logoScale, frame, 40, 20) / Math.max(0.2, logoScale(frame))}px)` }}>
        <Icon icon={logo} size={150} />
      </div>
    </AbsoluteFill>
  );
};
