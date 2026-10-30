import React from "react";
import { Img } from "remotion";

/** An app/product icon: an image (logo file in public/) or a generic placeholder tile. */
export type IconSpec = { src?: string; color?: string; glyph?: string };

export const Icon: React.FC<{ icon: IconSpec; size: number; tile?: boolean }> = ({ icon, size, tile }) => {
  const inner = icon.src ? (
    <Img src={icon.src} style={{ width: size * 0.7, height: size * 0.7, objectFit: "contain" }} />
  ) : (
    <div style={{ width: size * 0.62, height: size * 0.62, borderRadius: size * 0.14, background: icon.color ?? "#4285F4",
      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.34 }}>
      {icon.glyph ?? ""}
    </div>
  );
  if (!tile) return <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>{inner}</div>;
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.22, background: "#F1F3F4",
      display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{inner}</div>
  );
};
