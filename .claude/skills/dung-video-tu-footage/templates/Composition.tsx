// Mẫu từ video "THCS Trần Quốc Toản – 10 năm vững bước": thay chữ, số liệu, màu và logo cho dự án mới.
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

type Shot = (typeof timeline.shots)[number];
const shot = (i: number): Shot => timeline.shots.find((s) => s.i === i)!;
const section = (sec: string) => {
  const list = timeline.shots.filter((s) => s.sec === sec);
  const last = list[list.length - 1];
  return { from: list[0].from_, to: last.from_ + last.frames };
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

/** Từng từ trượt lên + hiện dần, lệch nhau `stagger` khung. */
const Words: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  size: number;
  color?: string;
  weight?: number;
  tracking?: number;
}> = ({ text, delay = 0, stagger = 3, size, color = "white", weight = 900, tracking = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: `0 ${size * 0.28}px`, justifyContent: "inherit" }}>
      {text.split(" ").map((w, k) => {
        const p = spring({ frame: frame - delay - k * stagger, fps, config: { damping: 200 }, durationInFrames: 18 });
        return (
          <span
            key={k}
            style={{
              fontFamily: FONT,
              fontWeight: weight,
              fontSize: size,
              color,
              letterSpacing: tracking,
              lineHeight: 1.15,
              opacity: p,
              translate: `0px ${(1 - p) * size * 0.5}px`,
              textShadow: "0 3px 18px rgba(0,0,0,0.45)",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** Lớp chữ có fade-out ở cuối đoạn. */
const Layer: React.FC<{ dur: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  dur,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [dur - 8, dur], [1, 0], clamp), ...style }}>
      {children}
    </AbsoluteFill>
  );
};

const Bar: React.FC<{ delay: number; width: number; center?: boolean }> = ({ delay, width, center }) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [delay, delay + 14], [0, width], { ...clamp, easing: easeOut });
  return <div style={{ height: 6, width: w, background: ORANGE, margin: center ? "14px auto" : "12px 0", borderRadius: 3 }} />;
};

const Scrim: React.FC<{ side: "bottom" | "center" }> = ({ side }) => (
  <AbsoluteFill
    style={{
      background:
        side === "bottom"
          ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 32%, rgba(0,0,0,0) 50%)"
          : "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.1) 100%)",
    }}
  />
);

const CenterTitle: React.FC<{ dur: number; title: string; sub: string; subColor?: string }> = ({
  dur,
  title,
  sub,
  subColor = ORANGE,
}) => (
  <Layer dur={dur}>
    <Scrim side="center" />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Words text={title} size={74} tracking={1} delay={6} />
      </div>
      <Bar delay={14} width={170} center />
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Words text={sub} size={44} color={subColor} weight={800} delay={18} stagger={2} />
      </div>
    </AbsoluteFill>
  </Layer>
);

const LowerThird: React.FC<{ dur: number; head: string; body: string; align: "left" | "right" }> = ({
  dur,
  head,
  body,
  align,
}) => (
  <Layer dur={dur}>
    <Scrim side="bottom" />
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: align === "left" ? "flex-start" : "flex-end",
        padding: "0 80px 70px",
        textAlign: align,
      }}
    >
      <div style={{ display: "flex", justifyContent: align === "left" ? "flex-start" : "flex-end" }}>
        <Words text={head} size={58} color={ORANGE} delay={4} />
      </div>
      <div style={{ display: "flex", justifyContent: align === "left" ? "flex-start" : "flex-end" }}>
        <Words text={body} size={42} weight={800} delay={12} stagger={2} />
      </div>
    </AbsoluteFill>
  </Layer>
);

/** Con số lớn đếm tăng dần, kèm chớp sáng lúc vào. */
const BigNumber: React.FC<{ dur: number; value?: number; label: string; caption: string; color: string }> = ({
  dur,
  value,
  label,
  caption,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 2, fps, config: { damping: 18, stiffness: 120 }, durationInFrames: 30 });
  const count = value === undefined ? label : Math.round(interpolate(frame, [2, 26], [0, value], { ...clamp, easing: easeOut }));
  return (
    <Layer dur={dur}>
      <AbsoluteFill style={{ background: "rgba(0,0,0,0.5)" }} />
      <AbsoluteFill style={{ background: "white", opacity: interpolate(frame, [0, 5], [0.55, 0], clamp) }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: value === undefined ? 100 : 210,
            lineHeight: 1,
            color,
            scale: interpolate(p, [0, 1], [0.6, 1]),
            opacity: interpolate(frame, [0, 6], [0, 1], clamp),
            textShadow: "0 6px 30px rgba(0,0,0,0.5)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {count}
        </div>
        <Bar delay={10} width={130} center />
        <div style={{ display: "flex", justifyContent: "center", maxWidth: 1000 }}>
          <Words text={caption} size={44} weight={800} delay={14} stagger={2} />
        </div>
      </AbsoluteFill>
    </Layer>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - 14, fps, config: { damping: 200 }, durationInFrames: 22 });
  return (
    <AbsoluteFill style={{ background: "#FAF7F2", justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ background: ORANGE, height: 8, top: 0 }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Words text="Trân trọng gửi tặng" size={40} color="#333" weight={700} delay={4} />
      </div>
      <Img
        src={staticFile("logo.webp")}
        style={{ width: 900, margin: "46px 0", opacity: logo, translate: `0px ${(1 - logo) * 20}px` }}
      />
      <div style={{ display: "flex", justifyContent: "center", maxWidth: 1100, textAlign: "center" }}>
        <Words
          text="Nhân kỷ niệm 10 năm thành lập Trường THCS Trần Quốc Toản (2016 – 2026)"
          size={27}
          color={ORANGE}
          weight={800}
          delay={26}
          stagger={1}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 26,
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: 16,
          color: "#888",
          opacity: interpolate(frame, [30, 45], [0, 1], clamp),
        }}
      >
        Nhạc: “Heroic Age” – Kevin MacLeod (incompetech.com) · Giấy phép CC BY 4.0
      </div>
    </AbsoluteFill>
  );
};

/** Video nền đã dựng sẵn bằng ffmpeg; các cảnh slow motion được đẩy máy chậm (push-in). */
const Footage: React.FC = () => {
  const frame = useCurrentFrame();
  const cur = timeline.shots.find((s) => frame >= s.from_ && frame < s.from_ + s.frames);
  const push =
    cur && cur.speed < 1 ? interpolate(frame, [cur.from_, cur.from_ + cur.frames], [1, 1.07], { easing: Easing.inOut(Easing.quad) }) : 1;
  return (
    <AbsoluteFill style={{ scale: push }}>
      <Video src={staticFile("base.mp4")} muted />
    </AbsoluteFill>
  );
};

export const TQTVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const total = timeline.totalFrames;
  const A = section("A");
  const B = section("B");
  const C = section("C");
  const D = section("D");
  const card = shot(37);
  const final = shot(36);
  const at = (from: number, to: number, el: React.ReactNode, name: string) => (
    <Sequence name={name} from={from} durationInFrames={to - from}>
      {el}
    </Sequence>
  );
  const numbers: [number, string, number | undefined, string, string][] = [
    [22, "10", 10, "năm vững bước", GOLD],
    [27, "60", 60, "thầy cô đạt chuẩn Google Certified Educator", ORANGE],
    [32, "[THÀNH TÍCH]", undefined, "[mô tả thành tích – chờ trường xác nhận]", ORANGE],
  ];
  return (
    <AbsoluteFill style={{ background: "black" }}>
      <Sequence name="Footage" durationInFrames={card.from_}>
        <Footage />
      </Sequence>
      {at(A.from + 6, A.to, <CenterTitle dur={A.to - A.from - 6} title="THCS TRẦN QUỐC TOẢN" sub="2016 – 2026" />, "Tiêu đề mở")}
      {at(B.from + 6, B.to, <LowerThird dur={B.to - B.from - 6} head="Mười năm" body="một hành trình tận tâm" align="left" />, "Thầy cô")}
      {at(C.from + 6, C.to, <LowerThird dur={C.to - C.from - 6} head="Những thế hệ học trò" body="bản lĩnh · tự tin · năng động" align="right" />, "Học sinh")}
      {at(D.from + 4, D.to, <LowerThird dur={D.to - D.from - 4} head="Tiên phong" body="học tập cùng trí tuệ nhân tạo" align="left" />, "Tương lai số")}
      {numbers.map(([i, label, value, caption, color]) => {
        const s = shot(i);
        return at(s.from_, s.from_ + s.frames, <BigNumber dur={s.frames} value={value} label={label} caption={caption} color={color} />, `Số ${label}`);
      })}
      {at(final.from_ + 4, final.from_ + final.frames, <CenterTitle dur={final.frames - 4} title="THCS Trần Quốc Toản" sub="10 năm vững bước" />, "Tiêu đề kết")}
      <Sequence name="Thẻ kết" from={card.from_} durationInFrames={card.frames}>
        <EndCard />
      </Sequence>
      <AbsoluteFill
        style={{ background: "black", opacity: interpolate(frame, [0, 14, total - 30, total], [1, 0, 0, 1], clamp), pointerEvents: "none" }}
      />
      <Audio src={staticFile("music.wav")} />
    </AbsoluteFill>
  );
};

export const MyComposition = () => (
  <Composition
    id="TQT10Nam"
    component={TQTVideo}
    durationInFrames={timeline.totalFrames}
    fps={timeline.fps}
    width={1280}
    height={720}
  />
);
