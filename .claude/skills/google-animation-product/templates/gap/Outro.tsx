import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Icon, IconSpec } from "./Icon";
import { Sparkle } from "./Sparkle";
import { clamp, EASE, EASE_IN } from "./tokens";

/**
 * End card: the product sparkle pops in at centre, then morphs (spin + shrink + crossfade)
 * into the company logo, which holds. Put a TypingLine tagline in the Sequence before it.
 */
export const SparkleToLogo: React.FC<{ logo: IconSpec; morphAt?: number; size?: number }> = ({ logo, morphAt = 18, size = 150 }) => {
  const frame = useCurrentFrame();
  const inS = interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: EASE });
  const out = interpolate(frame, [morphAt, morphAt + 8], [0, 1], { ...clamp, easing: EASE_IN });
  const logoIn = interpolate(frame, [morphAt + 4, morphAt + 14], [0, 1], { ...clamp, easing: EASE });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", transform: `scale(${inS * (1 - out)}) rotate(${out * 90}deg)` }}><Sparkle size={size * 0.8} id="out" /></div>
      <div style={{ position: "absolute", opacity: logoIn, transform: `scale(${0.6 + logoIn * 0.4})` }}><Icon icon={logo} size={size} /></div>
    </AbsoluteFill>
  );
};
