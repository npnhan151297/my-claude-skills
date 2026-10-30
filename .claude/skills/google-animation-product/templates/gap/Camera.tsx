import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { clamp, EASE } from "./tokens";

/** One camera key: at `frame`, centre the point (x, y) of the stage (0–1) at zoom `z`, tilted rx/ry degrees. */
export type CamKey = { frame: number; x: number; y: number; z: number; rx?: number; ry?: number };

/**
 * Virtual camera over a UI stage (a screenshot or a JSX recreation of the product).
 * Moves between keys with the signature ease; tilt keys give the 3D drift.
 */
export const Camera: React.FC<{ keys: CamKey[]; stageW: number; stageH: number; children: React.ReactNode }> = ({ keys, stageW, stageH, children }) => {
  const frame = useCurrentFrame();
  const fr = keys.map((k) => k.frame);
  const v = (sel: (k: CamKey) => number) => (keys.length === 1 ? sel(keys[0]) : interpolate(frame, fr, keys.map(sel), { ...clamp, easing: EASE }));
  const x = v((k) => k.x), y = v((k) => k.y), z = v((k) => k.z), rx = v((k) => k.rx ?? 0), ry = v((k) => k.ry ?? 0);
  return (
    <AbsoluteFill style={{ perspective: 2400, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ width: stageW, height: stageH, position: "relative", flex: "none",
        transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(${z}) translate(${(0.5 - x) * stageW}px, ${(0.5 - y) * stageH}px)` }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

/** Soft blue glow around the frame edges while the AI is "working". */
export const GlowFrame: React.FC<{ on: number; off: number }> = ({ on, off }) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [on, on + 8, off - 8, off], [0, 1, 1, 0], clamp);
  const pulse = 0.85 + 0.15 * Math.sin(frame / 6);
  return <AbsoluteFill style={{ pointerEvents: "none", opacity: a * pulse, boxShadow: "inset 0 0 90px 30px rgba(66,133,244,0.45)" }} />;
};
