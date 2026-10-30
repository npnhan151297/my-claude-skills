import React from "react";
import { AbsoluteFill } from "remotion";
import { Icon, IconSpec } from "./Icon";
import { C, FONT } from "./tokens";

/** Persistent overlays: small corner logo bug and the one-line legal disclaimer. */
export const Chrome: React.FC<{ bug: IconSpec; disclaimer?: string }> = ({ bug, disclaimer }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", right: 36, bottom: 30 }}><Icon icon={bug} size={40} /></div>
    {disclaimer ? (
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 38, textAlign: "center", fontFamily: FONT, fontSize: 18, color: "#9AA0A6" }}>{disclaimer}</div>
    ) : null}
  </AbsoluteFill>
);
