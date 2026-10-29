import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, EASE } from "./tokens";

/** Path point for the hand cursor, in stage pixels. `click: true` plays a press at that point. */
export type CursorKey = { frame: number; x: number; y: number; click?: boolean };

/** Large stylised hand cursor that glides on the signature ease and presses on click keys. */
export const HandCursor: React.FC<{ keys: CursorKey[]; size?: number }> = ({ keys, size = 90 }) => {
  const frame = useCurrentFrame();
  const fr = keys.map((k) => k.frame);
  const x = keys.length > 1 ? interpolate(frame, fr, keys.map((k) => k.x), { ...clamp, easing: EASE }) : keys[0].x;
  const y = keys.length > 1 ? interpolate(frame, fr, keys.map((k) => k.y), { ...clamp, easing: EASE }) : keys[0].y;
  const press = keys.filter((k) => k.click).reduce((m, k) => {
    const d = frame - k.frame;
    return d >= 0 && d < 8 ? Math.min(m, interpolate(d, [0, 3, 8], [1, 0.82, 1])) : m;
  }, 1);
  const ripple = keys.filter((k) => k.click).map((k) => frame - k.frame).find((d) => d >= 0 && d < 14);
  const appear = interpolate(frame, [keys[0].frame - 6, keys[0].frame], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: appear, pointerEvents: "none" }}>
      {ripple !== undefined ? (
        <div style={{ position: "absolute", left: -40, top: -40, width: 80, height: 80, borderRadius: "50%",
          border: "4px solid rgba(26,115,232,.6)", transform: `scale(${0.4 + ripple / 10})`, opacity: 1 - ripple / 14 }} />
      ) : null}
      <svg width={size} height={size} viewBox="0 0 64 64" style={{ transform: `translate(-30%, -8%) scale(${press})`, transformOrigin: "30% 8%",
        filter: "drop-shadow(0 4px 6px rgba(0,0,0,.25))" }}>
        <path d="M22 6c-2.8 0-5 2.2-5 5v22l-3.6-3.2c-2-1.8-5.2-1.6-7 .5-1.6 1.9-1.5 4.6.2 6.4L18 50c3 3.6 7.4 6 12.4 6H38c8.8 0 16-7.2 16-16V27c0-2.8-2.2-5-5-5s-5 2.2-5 5v-2c0-2.8-2.2-5-5-5s-5 2.2-5 5v-3c0-2.8-2.2-5-5-5-1.1 0-2.1.3-3 .9V11c0-2.8-2.2-5-5-5z"
          fill="#fff" stroke="#1F1F1F" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
