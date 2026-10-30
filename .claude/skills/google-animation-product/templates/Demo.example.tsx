import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { C, FONT, SHADOW } from "./gap/tokens";
import { LogoBurst } from "./gap/LogoBurst";
import { TypingLine } from "./gap/TypingLine";
import { GradientSweep } from "./gap/GradientSweep";
import { FloatingChips } from "./gap/FloatingChips";
import { WordCarousel } from "./gap/WordCarousel";
import { Camera, GlowFrame } from "./gap/Camera";
import { PromptBar, LoadingCard } from "./gap/Prompt";
import { HandCursor } from "./gap/Cursor";
import { Chrome } from "./gap/Chrome";
import { SparkleToLogo } from "./gap/Outro";

const DOC = { color: "#4285F4", glyph: "D" }, SHEET = { color: "#34A853", glyph: "S" },
  SLIDE = { color: "#FBBC04", glyph: "P" }, DRIVE = { color: "#EA4335", glyph: "F" }, LOGO = { color: "#1A73E8", glyph: "A" };

const DocMock: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "#fff", borderRadius: 24, boxShadow: SHADOW, fontFamily: FONT, overflow: "hidden" }}>
    <div style={{ height: 70, borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", padding: "0 28px", gap: 14, fontSize: 24, color: C.ink }}>
      <div style={{ width: 30, height: 38, background: "#4285F4", borderRadius: 4 }} />Kế hoạch học kỳ
    </div>
    <div style={{ padding: "60px 220px", display: "grid", gap: 18 }}>
      {[0.6, 0.9, 0.85, 0.7, 0.95, 0.5].map((w, i) => <div key={i} style={{ height: 16, width: `${w * 100}%`, background: "#F1F3F4", borderRadius: 8 }} />)}
    </div>
    <div style={{ position: "absolute", left: "50%", bottom: 60, transform: "translateX(-50%)" }}>
      <PromptBar text="tổng hợp lịch học và bài tập của lớp 10A1 trong tuần này" start={20} workingAt={92} />
    </div>
  </div>
);

export const Demo: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <Sequence durationInFrames={60}><LogoBurst dur={60} logo={LOGO} icons={[
      { ...DRIVE, x: -0.17, y: -0.06, size: 130 }, { ...DOC, x: -0.08, y: -0.3, size: 150 },
      { ...SHEET, x: 0.2, y: -0.22, size: 100 }, { ...SLIDE, x: 0.14, y: 0.22, size: 200 }]} /></Sequence>
    <Sequence from={60} durationInFrames={95}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <TypingLine tokens={[{ text: "Giờ" }, { text: "đây" }, { icon: DRIVE }, { text: "bạn" }, { icon: DOC }, { text: "có" }, { text: "thể" }, { icon: SHEET }, { text: "hỏi" }, { icon: SLIDE }]} maxWidth={1100} />
      </AbsoluteFill>
    </Sequence>
    <Sequence from={140} durationInFrames={50}><GradientSweep word="Trợ lý AI" /></Sequence>
    <Sequence from={190} durationInFrames={75}>
      <FloatingChips chips={[
        { label: "Sổ điểm 10A1", icon: SHEET, x: -0.28, y: -0.25, depth: 0.1 }, { icon: DRIVE, x: -0.1, y: -0.3, depth: 0.5 },
        { label: "Giáo án tuần 8", icon: DOC, x: 0.25, y: -0.18, depth: 0.6 }, { label: "Họp phụ huynh", icon: SLIDE, x: -0.18, y: 0.25, depth: 0.2 },
        { icon: DOC, x: -0.35, y: 0.18, depth: 0.1 }, { label: "Lịch thi", icon: SHEET, x: 0.22, y: 0.24, depth: 0.7 }]}>
        <TypingLine tokens={[{ text: "để" }, { text: "giúp" }, { text: "bạn" }]} />
      </FloatingChips>
    </Sequence>
    <Sequence from={265} durationInFrames={40}><WordCarousel words={["khám phá", "sáng tạo", "thiết kế", "xây dựng"]} target={1} /></Sequence>
    <Sequence from={305} durationInFrames={150}>
      <Camera stageW={1600} stageH={900} keys={[
        { frame: 0, x: 0.5, y: 0.5, z: 0.9 }, { frame: 18, x: 0.5, y: 0.86, z: 1.6 }, { frame: 70, x: 0.5, y: 0.86, z: 1.6 },
        { frame: 84, x: 0.8, y: 0.86, z: 2.2 }, { frame: 110, x: 0.5, y: 0.5, z: 0.95, rx: 8, ry: -10 }, { frame: 150, x: 0.5, y: 0.5, z: 1.0, rx: 4, ry: -6 }]}>
        <DocMock />
        <HandCursor keys={[{ frame: 55, x: 1400, y: 900 }, { frame: 72, x: 1335, y: 805 }, { frame: 80, x: 1335, y: 805, click: true }, { frame: 95, x: 1335, y: 805 }]} />
      </Camera>
      <GlowFrame on={92} off={150} />
    </Sequence>
    <Sequence from={455} durationInFrames={45}>
      <Camera stageW={1000} stageH={400} keys={[{ frame: 0, x: 0.5, y: 0.5, z: 1, rx: 12, ry: -14 }, { frame: 45, x: 0.5, y: 0.5, z: 1.1, rx: 6, ry: -8 }]}>
        <LoadingCard width={1000} tip="Mẹo: gõ @ để nhắc tới tệp của bạn" />
      </Camera>
    </Sequence>
    <Sequence from={500} durationInFrames={70}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <TypingLine tokens={[{ text: "trong" }, { icon: DRIVE }, { text: "ứng dụng" }, { icon: SHEET }, { text: "bạn" }, { icon: SLIDE }, { text: "yêu thích" }, { icon: DOC }]} maxWidth={1100} />
      </AbsoluteFill>
    </Sequence>
    <Sequence from={570} durationInFrames={60}><SparkleToLogo logo={LOGO} /></Sequence>
    <Chrome bug={LOGO} disclaimer="Trình tự đã được rút gọn. Kết quả có thể khác nhau." />
  </AbsoluteFill>
);
