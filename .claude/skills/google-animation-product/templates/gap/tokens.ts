// Google Animation Product: style tokens shared by every gap-* component.
import { Easing, interpolate, spring } from "remotion";
// Fonts embedded by scripts/fetch-font.sh (no network, no font-load wait during render).
import "./fonts.css";

// Google Sans is proprietary; Plus Jakarta Sans is the closest open face with Vietnamese.
export const FONT = "'Plus Jakarta Sans', 'Be Vietnam Pro', sans-serif";

export const C = {
  bg: "#FFFFFF",
  ink: "#1F1F1F",
  muted: "#5F6368",
  ghost: "#DADCE0", // carousel words that are not selected
  line: "#E8EAED",
  blue: "#1A73E8",
  blueLight: "#4C8DF6",
  glow: "rgba(66,133,244,0.55)",
  // four-colour accent used by the sparkle and gradient sweep; swap for the brand's own
  g1: "#4285F4",
  g2: "#EA4335",
  g3: "#FBBC04",
  g4: "#34A853",
};

export const BLUE_TEXT = {
  backgroundImage: `linear-gradient(90deg, ${C.blue}, ${C.blueLight})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

export const SHADOW = "0 2px 6px rgba(60,64,67,.15), 0 8px 24px rgba(60,64,67,.12)";

// Signature ease: very fast start, long soft landing (most moves in the reference use this).
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);

export const pop = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 170, mass: 0.8 } });
export const settle = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 200 } });

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Directional blur from velocity: pass the same function you animate with. */
export const velocityBlur = (f: (fr: number) => number, frame: number, k = 0.35, max = 24) =>
  Math.min(max, Math.abs(f(frame) - f(frame - 1)) * k);

export const ramp = (frame: number, a: number, b: number, from = 0, to = 1, easing = EASE) =>
  interpolate(frame, [a, b], [from, to], { ...clamp, easing });
