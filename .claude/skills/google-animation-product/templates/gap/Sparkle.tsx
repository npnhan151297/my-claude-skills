import React from "react";
import { C } from "./tokens";

/** Four-point star with a four-colour gradient. Swap colours for the brand's. */
export const Sparkle: React.FC<{ size: number; colors?: string[]; id?: string }> = ({ size, colors, id = "sp" }) => {
  const [a, b, c, d] = colors ?? [C.g1, C.g2, C.g3, C.g4];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}a`} cx="15%" cy="85%" r="80%"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={a} stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}b`} cx="90%" cy="40%" r="75%"><stop offset="0" stopColor={b} /><stop offset="1" stopColor={b} stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}c`} cx="50%" cy="5%" r="60%"><stop offset="0" stopColor={c} /><stop offset="1" stopColor={c} stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}d`} cx="5%" cy="35%" r="60%"><stop offset="0" stopColor={d} /><stop offset="1" stopColor={d} stopOpacity="0" /></radialGradient>
        <clipPath id={`${id}clip`}><path d="M50 0 C53 33 67 47 100 50 C67 53 53 67 50 100 C47 67 33 53 0 50 C33 47 47 33 50 0 Z" /></clipPath>
      </defs>
      <g clipPath={`url(#${id}clip)`}>
        <rect width="100" height="100" fill={a} />
        <rect width="100" height="100" fill={`url(#${id}b)`} />
        <rect width="100" height="100" fill={`url(#${id}c)`} />
        <rect width="100" height="100" fill={`url(#${id}d)`} />
        <rect width="100" height="100" fill={`url(#${id}a)`} />
      </g>
    </svg>
  );
};
