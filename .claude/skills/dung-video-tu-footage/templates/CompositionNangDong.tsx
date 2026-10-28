// Mẫu phong cách năng động (cắt theo phách, zoom punch, khối chữ cam) từ video "THCS Trần Quốc Toản – 10 năm vững bước".
import { Audio, Video } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import {
  AbsoluteFill,
  Composition,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import timeline from "./timeline.json";

const ORANGE = "#F37021";
const GOLD = "#F6B347";
const FONT = "InterDisplay";

Promise.all(
  [
    ["InterDisplay-Bold.otf", "700"],
    ["InterDisplay-ExtraBold.otf", "800"],
    ["InterDisplay-Black.otf", "900"],
    ["Inter-Medium.otf", "500"],
  ].map(([file, weight]) => loadFont({ family: FONT, url: staticFile(file), weight })),
);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const fb = (beat: number) => Math.round(beat * timeline.beatSec * timeline.fps);
type Shot = (typeof timeline.shots)[number];
const shots: Shot[] = timeline.shots;

/** Video nền: mỗi lần cắt có cú zoom "punch", cảnh slow motion đẩy máy chậm. */
const Footage: React.FC = () => {
  const frame = useCurrentFrame();
  const cur = shots.find((s) => frame >= s.from_ && frame < s.from_ + s.frames);
  let scale = 1;
  if (cur) {
    const t = frame - cur.from_;
    scale =
      cur.speed < 1
        ? interpolate(t, [0, cur.frames], [1.0, 1.08], { easing: Easing.inOut(Easing.quad) })
        : interpolate(t, [0, 7], [1.13, 1.0], { ...clamp, easing: easeOut });
  }
  return (
    <AbsoluteFill style={{ scale }}>
      <Video src={staticFile("base.mp4")} muted />
    </AbsoluteFill>
  );
};

const Flash: React.FC<{ strength?: number }> = ({ strength = 0.85 }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ background: "white", opacity: interpolate(frame, [0, 6], [strength, 0], clamp) }} />;
};

const Dim: React.FC<{ amount: number; dur: number }> = ({ amount, dur }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ background: "black", opacity: interpolate(frame, [0, 4, dur - 4, dur], [0, amount, amount, 0], clamp) }} />;
};

/** Khối cam chạy ra rồi chữ hiện trong khối. */
const Block: React.FC<{
  text: string;
  size: number;
  delay?: number;
  bg?: string;
  color?: string;
}> = ({ text, size, delay = 0, bg = ORANGE, color = "white" }) => {
  const frame = useCurrentFrame();
  const wipe = interpolate(frame, [delay, delay + 6], [0, 100], { ...clamp, easing: easeOut });
  const txt = interpolate(frame, [delay + 3, delay + 8], [0, 1], clamp);
  return (
    <div style={{ position: "relative", display: "inline-block", padding: `${size * 0.06}px ${size * 0.22}px` }}>
      <div style={{ position: "absolute", inset: 0, background: bg, clipPath: `inset(0 ${100 - wipe}% 0 0)` }} />
      <span
        style={{
          position: "relative",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: size,
          lineHeight: 1.05,
          color,
          opacity: txt,
          letterSpacing: size * 0.01,
          translate: `${(1 - txt) * -20}px 0px`,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
};

/** Chữ lớn bật vào (scale từ to xuống), không nền. */
const Slam: React.FC<{ text: string; size: number; delay?: number; color?: string; weight?: number }> = ({
  text,
  size,
  delay = 0,
  color = "white",
  weight = 900,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 14 });
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.02,
        color,
        whiteSpace: "nowrap",
        opacity: interpolate(frame, [delay, delay + 3], [0, 1], clamp),
        scale: interpolate(p, [0, 1], [1.6, 1]),
        textShadow: "0 6px 28px rgba(0,0,0,0.55)",
      }}
    >
      {text}
    </div>
  );
};

const Out: React.FC<{ dur: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ dur, children, style }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [dur - 4, dur], [1, 0], clamp),
        translate: `${interpolate(frame, [dur - 4, dur], [0, -40], clamp)}px 0px`,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** Năm chạy 2016 → 2026 theo phách ở đoạn mở đầu. */
const YearCounter: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const year = 2016 + Math.min(10, Math.floor(interpolate(frame, [0, dur - 6], [0, 10.99], clamp)));
  const tick = frame % Math.max(1, Math.round((dur - 6) / 11));
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 230,
          color: year === 2026 ? ORANGE : "white",
          fontVariantNumeric: "tabular-nums",
          scale: interpolate(tick, [0, 4], [1.08, 1], clamp),
          textShadow: "0 8px 36px rgba(0,0,0,0.6)",
        }}
      >
        {year}
      </div>
    </AbsoluteFill>
  );
};

const BigNumber: React.FC<{ dur: number; value?: number; label: string; caption: string; color: string }> = ({
  dur,
  value,
  label,
  caption,
  color,
}) => {
  const frame = useCurrentFrame();
  const count = value === undefined ? label : Math.round(interpolate(frame, [0, 18], [0, value], { ...clamp, easing: easeOut }));
  return (
    <Out dur={dur}>
      <Dim amount={0.5} dur={dur} />
      <Flash />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 18 }}>
        <Slam text={String(count)} size={value === undefined ? 110 : 250} color={color} />
        <Block text={caption} size={value === undefined ? 34 : 40} delay={8} />
      </AbsoluteFill>
    </Out>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - 10, fps, config: { damping: 200 }, durationInFrames: 20 });
  return (
    <AbsoluteFill style={{ background: "#FAF7F2", justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ background: ORANGE, clipPath: `inset(0 0 ${100 - interpolate(frame, [0, 10], [100, 3], { ...clamp, easing: easeOut })}% 0)` }} />
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 40, color: "#333", opacity: interpolate(frame, [8, 16], [0, 1], clamp) }}>
        Trân trọng gửi tặng
      </div>
      <Img src={staticFile("logo.webp")} style={{ width: 900, margin: "44px 0", opacity: logo, scale: interpolate(logo, [0, 1], [0.92, 1]) }} />
      <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 27, color: ORANGE, opacity: interpolate(frame, [22, 32], [0, 1], clamp) }}>
        Nhân kỷ niệm 10 năm thành lập Trường THCS Trần Quốc Toản (2016 – 2026)
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 26,
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: 16,
          color: "#888",
          opacity: interpolate(frame, [30, 42], [0, 1], clamp),
        }}
      >
        Nhạc: “Shiny Tech” – Kevin MacLeod (incompetech.com) · Giấy phép CC BY 4.0
      </div>
    </AbsoluteFill>
  );
};

const Vignette = () => (
  <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)" }} />
);

export const TQTEnergy: React.FC = () => {
  const frame = useCurrentFrame();
  const total = timeline.totalFrames;
  const card = shots.find((s) => s.clip === "CARD")!;
  const at = (b0: number, b1: number, name: string, el: (dur: number) => React.ReactNode) => (
    <Sequence name={name} from={fb(b0)} durationInFrames={fb(b1) - fb(b0)}>
      {el(fb(b1) - fb(b0))}
    </Sequence>
  );
  const word = (b0: number, b1: number, text: string, pos: "left" | "right" | "center" = "left", size = 120) =>
    at(b0, b1, text, (d) => (
      <Out dur={d}>
        <AbsoluteFill
          style={{
            justifyContent: pos === "center" ? "center" : "flex-end",
            alignItems: pos === "left" ? "flex-start" : pos === "right" ? "flex-end" : "center",
            padding: "0 70px 70px",
          }}
        >
          <Block text={text} size={size} />
        </AbsoluteFill>
      </Out>
    ));
  const nums: [number, number | undefined, string, string, string][] = [
    [80, 10, "10", "NĂM VỮNG BƯỚC", GOLD],
    [96, 60, "60", "THẦY CÔ ĐẠT CHUẨN GOOGLE CERTIFIED EDUCATOR", ORANGE],
    [112, undefined, "[THÀNH TÍCH]", "[MÔ TẢ THÀNH TÍCH – CHỜ TRƯỜNG XÁC NHẬN]", ORANGE],
  ];
  return (
    <AbsoluteFill style={{ background: "black" }}>
      <Sequence name="Footage" durationInFrames={card.from_}>
        <Footage />
        <Vignette />
      </Sequence>

      {/* INTRO: năm chạy */}
      {at(0, 16, "Năm chạy", (d) => (
        <>
          <Dim amount={0.45} dur={d + 8} />
          <YearCounter dur={d} />
        </>
      ))}

      {/* DROP 1 */}
      {at(16, 24, "Tiêu đề", (d) => (
        <Out dur={d}>
          <Flash strength={1} />
          <Dim amount={0.3} dur={d} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
            <Slam text="THCS TRẦN QUỐC TOẢN" size={104} />
            <Block text="10 NĂM VỮNG BƯỚC" size={58} delay={7} />
          </AbsoluteFill>
        </Out>
      ))}
      {word(25, 40, "NĂNG ĐỘNG", "left")}
      {word(41, 48, "SÁNG TẠO", "right")}
      {word(49, 56, "TỰ TIN", "left")}
      {word(56.5, 60, "GẮN KẾT", "right")}

      {/* BREAK */}
      {at(60, 64, "Sẵn sàng", (d) => (
        <Out dur={d}>
          <Dim amount={0.35} dur={d} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <Slam text="SẴN SÀNG CHO TƯƠNG LAI" size={76} weight={800} />
          </AbsoluteFill>
        </Out>
      ))}

      {/* DROP 2: AI */}
      {at(64, 66, "Flash AI", () => <Flash strength={1} />)}
      {word(64.5, 72, "TIÊN PHONG", "left", 116)}
      {word(72.5, 80, "HỌC CÙNG AI", "right", 116)}

      {nums.map(([b, value, label, caption, color]) => at(b, b + 8, `Số ${label}`, (d) => <BigNumber dur={d} value={value} label={label} caption={caption} color={color} />))}

      {/* BURST */}
      {at(128, 129, "Flash burst", () => <Flash strength={0.7} />)}
      {word(136.5, 148, "MƯỜI NĂM · MỘT HÀNH TRÌNH", "left", 70)}
      {at(148, 156, "Tự hào", (d) => (
        <Out dur={d}>
          <Flash strength={0.6} />
          <Dim amount={0.35} dur={d} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 6 }}>
            <Slam text="TỰ HÀO" size={170} color={ORANGE} />
            <Slam text="TRẦN QUỐC TOẢN" size={78} delay={6} />
          </AbsoluteFill>
        </Out>
      ))}

      {/* OUTRO */}
      {at(157, 166, "Tiêu đề kết", (d) => (
        <Out dur={d}>
          <Dim amount={0.3} dur={d} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 12 }}>
            <Slam text="THCS Trần Quốc Toản" size={92} />
            <Block text="10 NĂM VỮNG BƯỚC" size={52} delay={8} />
          </AbsoluteFill>
        </Out>
      ))}
      <Sequence name="Thẻ kết" from={card.from_} durationInFrames={card.frames}>
        <EndCard />
      </Sequence>

      <AbsoluteFill style={{ background: "black", opacity: interpolate(frame, [0, 10, total - 25, total], [1, 0, 0, 1], clamp) }} />
      <Audio src={staticFile("music.wav")} />
    </AbsoluteFill>
  );
};

export const MyComposition = () => (
  <Composition id="TQTNangDong" component={TQTEnergy} durationInFrames={timeline.totalFrames} fps={timeline.fps} width={1280} height={720} />
);
