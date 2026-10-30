// Ví dụ áp dụng gap-* lên video footage (kỷ niệm THCS Trần Quốc Toản v5): cột chữ quay, quét ngôi sao, chip trôi, khung 3D, ngôi sao hoá logo.
// Video tặng Trường THCS Trần Quốc Toản – 10 năm thành lập. AI Edu gửi lời cảm ơn 5 năm đồng hành.
// v3: ngôn ngữ chuyển động Google for Education (quét sọc 4 màu, lưới ô xanh, lower-third đường kẻ,
// chữ số nổi khối, đường mạch + chấm màu, khung cửa sổ, 4 chấm mở logo).
import { Audio, Video } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, Composition, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import timeline from "./timeline.json";
import { BlockWipe, CircuitLines, Extruded, G, INK, INK_SOFT, IconTile, LineBar, PillField, StripeWipe, WindowFrame } from "./GfeMotion";
// Google Animation Product (skill google-animation-product, templates/gap)
import { FloatingChips } from "./gap/FloatingChips";
import { GradientSweep } from "./gap/GradientSweep";
import { Sparkle } from "./gap/Sparkle";
import { TypingLine } from "./gap/TypingLine";
import { WordCarousel } from "./gap/WordCarousel";
import { EASE, EASE_IN, ramp } from "./gap/tokens";

const FONT = "InterDisplay";
Promise.all(
  [
    ["InterDisplay-Medium.otf", "500"],
    ["InterDisplay-Bold.otf", "700"],
    ["InterDisplay-ExtraBold.otf", "800"],
    ["InterDisplay-Black.otf", "900"],
  ].map(([file, weight]) => loadFont({ family: FONT, url: staticFile(file), weight })),
);

type Shot = (typeof timeline.shots)[number];
const shot = (i: number): Shot => timeline.shots.find((s) => s.i === i)!;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const Rise: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay, children, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - delay, fps, config: { damping: 200 }, durationInFrames: 18 });
  return <div style={{ opacity: p, translate: `0 ${(1 - p) * 24}px`, ...style }}>{children}</div>;
};

/** Thẻ mở: viên con nhộng trượt → năm nổi khối 20/16 lăn sang 20/26, tên trường, dòng thời gian chấm màu. */
const TitleCard: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const roll = interpolate(f, [30, 40], [0, 1], { ...clamp, easing: easeOut });
  const year = spring({ frame: f - 14, fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 22 });
  return (
    <AbsoluteFill style={{ background: "white" }}>
      <Sequence durationInFrames={18}>
        <PillField dur={18} />
      </Sequence>
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 46, paddingBottom: 60 }}>
        <div style={{ display: "flex", flexDirection: "column", transform: `scale(${0.7 + 0.3 * year})`, opacity: year }}>
          <Extruded text="20" size={150} font={FONT} />
          <div style={{ height: 138, overflow: "hidden", position: "relative", width: 190 }}>
            <div style={{ position: "absolute", top: -roll * 138 }}>
              <Extruded text="16" size={150} font={FONT} style={{ display: "block", height: 138 }} />
              <Extruded text="26" size={150} font={FONT} style={{ display: "block", height: 138 }} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <TypingLine tokens={[{ text: "TRƯỜNG THCS" }, { text: "TRẦN QUỐC TOẢN" }]} start={14} cps={30} size={56} maxWidth={520} />
          <Rise delay={36}>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 32, color: INK_SOFT, marginTop: 10 }}>2016 – 2026</div>
          </Rise>
        </div>
      </AbsoluteFill>
      <CircuitLines
        width={1280}
        height={720}
        paths={[
          {
            d: "M 0 600 L 1280 600",
            len: 1280,
            delay: 10,
            dots: [
              { x: 180, y: 600, c: G.green, at: 2 },
              { x: 470, y: 600, c: G.yellow, at: 6 },
              { x: 800, y: 600, c: G.red, at: 10 },
              { x: 1100, y: 600, c: G.blue, at: 14 },
            ],
          },
        ]}
      />
    </AbsoluteFill>
  );
};

/** Whip dọc kiểu gap: lớp trắng trượt lên và nhoè khi thoát (`at` = frame bắt đầu thoát). */
const WhipOut: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const f = useCurrentFrame();
  const y = (fr: number) => interpolate(fr, [at, at + 8], [0, -760], { ...clamp, easing: EASE_IN });
  const blur = Math.min(24, Math.abs(y(f) - y(f - 1)) * 0.25);
  return <AbsoluteFill style={{ transform: `translateY(${y(f)}px)`, filter: `blur(${blur}px)` }}>{children}</AbsoluteFill>;
};

/** gap-word-carousel: "Học trò [khám phá · sáng tạo · hợp tác · tự tin]" dừng ở "tự tin" đúng lúc nhạc vào cao trào. */
const CarouselScene: React.FC<{ land: number; dur: number }> = ({ land, dur }) => (
  <WhipOut at={dur - 8}>
    <AbsoluteFill style={{ background: "white", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: -60 }}>
        <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 96, color: INK, letterSpacing: "-0.02em" }}>Học trò</div>
        <div style={{ position: "relative", width: 480, height: 420, whiteSpace: "nowrap" }}>
          <WordCarousel words={["khám phá", "sáng tạo", "hợp tác", "tự tin"]} target={3} spins={1} dur={land} size={96} />
        </div>
      </div>
      <div style={{ position: "absolute", top: 560 }}>
        <TypingLine tokens={[{ text: "bước vào thời đại số" }]} start={land + 2} cps={34} size={58} caret={false} />
      </div>
    </AbsoluteFill>
  </WhipOut>
);

/**
 * Thẻ chương: gap-gradient-sweep lộ "Google for Education", "5 năm" nảy lên trên,
 * "đồng hành cùng nhà trường" gõ phía dưới (gap-typing-icons), chip trôi quanh (gap-floating-chips).
 */
const ChapterGap: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const five = spring({ frame: f - 20, fps, config: { damping: 14, stiffness: 170 }, durationInFrames: 22 });
  const tile = (c: string) => ({ color: c, glyph: "" });
  return (
    <WhipOut at={dur - 8}>
      <GradientSweep word="Google for Education" size={74} markX={-372} />
      <Sequence from={16}>
        <FloatingChips
          chips={[
            { label: "Chromebook", icon: tile(G.blue), x: -0.34, y: -0.36, depth: 0.1 },
            { label: "Google Classroom", icon: tile(G.green), x: 0.33, y: 0.36, depth: 0.15 },
            { icon: tile(G.red), x: 0.4, y: -0.3, depth: 0.6 },
            { icon: tile(G.yellow), x: -0.42, y: 0.32, depth: 0.7 },
            { icon: tile(G.blue), x: 0.12, y: -0.42, depth: 0.8 },
            { icon: tile(G.green), x: -0.1, y: 0.43, depth: 0.5 },
          ]}
        />
      </Sequence>
      <AbsoluteFill style={{ alignItems: "center" }}>
        <div style={{ position: "absolute", top: 150, display: "flex", alignItems: "flex-end", gap: 14, opacity: five, transform: `translateY(${(1 - five) * 30}px) scale(${0.8 + 0.2 * five})` }}>
          <Extruded text="5" size={130} depth={10} font={FONT} />
          <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 64, color: INK, marginBottom: 12, letterSpacing: "-0.02em" }}>năm</span>
        </div>
        <div style={{ position: "absolute", top: 450 }}>
          <TypingLine tokens={[{ text: "đồng hành cùng nhà trường" }]} start={32} cps={26} size={56} />
        </div>
      </AbsoluteFill>
    </WhipOut>
  );
};

/** gap-gradient-sweep lần 2 + gap-outro: ngôi sao quét, dừng giữa khung, xoay và hoá thành logo. */
const EndGap: React.FC = () => {
  const f = useCurrentFrame();
  const morphAt = 26;
  const out = interpolate(f, [morphAt, morphAt + 8], [0, 1], { ...clamp, easing: EASE_IN });
  const logoIn = interpolate(f, [morphAt + 4, morphAt + 16], [0, 1], { ...clamp, easing: EASE });
  return (
    <AbsoluteFill style={{ background: "white" }}>
      {f < morphAt ? <GradientSweep word="" size={130} markX={0} bg={false} /> : null}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {f >= morphAt && (
          <div style={{ position: "absolute", transform: `scale(${1 - out}) rotate(${out * 90}deg)` }}>
            <Sparkle size={130 * 0.85} id="end" />
          </div>
        )}
        <Img src={staticFile("logo.png")} style={{ width: 920, opacity: logoIn, transform: `scale(${0.6 + 0.4 * logoIn})` }} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: 26,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: 16,
          color: "#80868B",
          opacity: ramp(f, 50, 64),
        }}
      >
        Music: “Super Friendly” – Kevin MacLeod (incompetech.com) · Licensed under CC BY 4.0
      </div>
    </AbsoluteFill>
  );
};

/** gap-3d-cards: nghiêng 12–14° rồi giảm dần, zoom nhẹ 6%. */
const Tilt3D: React.FC<{ dur: number; origin: string; children: React.ReactNode }> = ({ dur, origin, children }) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, dur], [0, 1], { ...clamp, easing: EASE });
  const rx = 12 - 8 * t, ry = -14 + 10 * t, z = 1 + 0.06 * t;
  return <AbsoluteFill style={{ transformOrigin: origin, transform: `perspective(2400px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${z})` }}>{children}</AbsoluteFill>;
};

/** Thẻ cảm ơn: chữ bên trái, footage trong khung cửa sổ bên phải, ô biểu tượng và đường mạch. */
const ThanksCard: React.FC<{ videoFrom: number; dur: number }> = ({ videoFrom, dur }) => (
  <AbsoluteFill style={{ background: "white" }}>
    <CircuitLines
      width={1280}
      height={720}
      paths={[
        { d: "M 640 70 L 1210 70 L 1210 150", len: 650, delay: 4, dots: [{ x: 640, y: 70, c: G.yellow, at: 0 }, { x: 1210, y: 150, c: G.green, at: 16 }] },
        { d: "M 700 650 L 1150 650", len: 450, delay: 10, dots: [{ x: 700, y: 650, c: G.red, at: 0 }, { x: 1150, y: 650, c: G.blue, at: 16 }] },
      ]}
    />
    <Tilt3D dur={dur} origin="950px 300px">
      <WindowFrame x={690} y={140} w={520} h={318} delay={4}>
        <Video src={staticFile("base.mp4")} trimBefore={videoFrom} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </WindowFrame>
    </Tilt3D>
    <IconTile x={640} y={470} size={70} color={G.blue} delay={18}>
      <div style={{ width: 30, height: 30, borderRadius: 15, background: G.blue }} />
    </IconTile>
    <IconTile x={1150} y={460} size={62} color={G.yellow} delay={24}>
      <div style={{ width: 26, height: 26, background: G.yellow, borderRadius: 4, transform: "rotate(45deg)" }} />
    </IconTile>
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 90, width: 600 }}>
      <Rise delay={6}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 40, color: INK_SOFT }}>Cảm ơn</div>
      </Rise>
      <Rise delay={11}>
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 50, color: INK, lineHeight: 1.15, marginTop: 6 }}>
          Trường THCS
          <br />
          Trần Quốc Toản
        </div>
      </Rise>
      <Rise delay={18} style={{ display: "flex", gap: 6, margin: "20px 0" }}>
        {[G.blue, G.red, G.yellow, G.green].map((c) => (
          <div key={c} style={{ width: 44, height: 6, borderRadius: 3, background: c }} />
        ))}
      </Rise>
      <Rise delay={22}>
        <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 30, color: INK, lineHeight: 1.35 }}>
          đã tin tưởng và đồng hành
          <br />
          cùng AI Edu
        </div>
      </Rise>
    </AbsoluteFill>
  </AbsoluteFill>
);

/** Chúc mừng 10 năm: thẻ trắng bo góc nổi trên footage, "10" nổi khối. */
const CongratsCard: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - 2, fps, config: { damping: 15, stiffness: 160 }, durationInFrames: 20 });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ background: "rgba(0,0,0,0.18)" }} />
      <div
        style={{
          background: "white",
          borderRadius: 28,
          padding: "26px 54px 30px",
          boxShadow: `12px 12px 0 ${G.green}55`,
          transform: `scale(${0.8 + 0.2 * s})`,
          opacity: s,
          display: "flex",
          alignItems: "center",
          gap: 30,
        }}
      >
        <Extruded text="10" size={150} font={FONT} />
        <div>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 34, color: INK_SOFT }}>Chúc mừng</div>
          <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 52, color: INK, lineHeight: 1.1 }}>năm thành lập!</div>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 28, color: G.blue, marginTop: 8 }}>2016 – 2026</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Nền footage đã chống rung; slow motion đẩy máy rất chậm. */
const Footage: React.FC = () => {
  const frame = useCurrentFrame();
  const cur = timeline.shots.find((s) => frame >= s.from_ && frame < s.from_ + s.frames);
  let scale = 1;
  // v4: bỏ zoom punch, chỉ đẩy máy rất chậm ở cảnh slow motion cho êm mắt
  if (cur && cur.speed < 1) scale = interpolate(frame, [cur.from_, cur.from_ + cur.frames], [1, 1.035], { easing: Easing.inOut(Easing.quad) });
  return (
    <AbsoluteFill style={{ scale }}>
      <Video src={staticFile("base.mp4")} muted />
    </AbsoluteFill>
  );
};

export const TQTVideo: React.FC = () => {
  const card = shot(27);
  const at = (from: number, to: number, el: React.ReactNode, name: string) => (
    <Sequence name={name} from={from} durationInFrames={to - from}>
      {el}
    </Sequence>
  );
  const end = (i: number) => shot(i).from_ + shot(i).frames;
  const TITLE_CUT = 60;
  const chap = shot(20).from_ - 6;
  const lift = shot(16).from_;
  const carouselFrom = lift - 30;
  const carouselDur = 48;
  const chapEnd = shot(22).from_;
  const thanks = shot(25).from_;
  const congrats = shot(26).from_;
  return (
    <AbsoluteFill style={{ background: "white" }}>
      <Sequence name="Footage" durationInFrames={card.from_}>
        <Footage />
      </Sequence>
      {at(0, TITLE_CUT, <TitleCard />, "1 Thẻ mở")}
      {at(shot(3).from_ + 4, end(4), <LineBar dur={end(4) - shot(3).from_ - 4} title="Mười năm vun đắp một mái trường" font={FONT} />, "2 Mười năm")}
      {at(shot(9).from_ + 10, end(10), <LineBar dur={end(10) - shot(9).from_ - 10} title="Nơi mỗi tiết học là một hành trình khám phá" font={FONT} />, "3 Tiết học")}
      {at(shot(13).from_ + 6, end(13), <LineBar dur={end(13) - shot(13).from_ - 6} title="Thầy cô không ngừng đổi mới" font={FONT} />, "4 Thầy cô")}
      {at(carouselFrom, carouselFrom + carouselDur, <CarouselScene land={24} dur={carouselDur} />, "5 Học trò – cột chữ quay")}
      {at(chap, chapEnd, <ChapterGap dur={chapEnd - chap} />, "6 Thẻ chương – quét ngôi sao + chip")}
      {at(thanks, congrats, <ThanksCard videoFrom={thanks} dur={congrats - thanks} />, "7 Cảm ơn – khung 3D")}
      {at(congrats, card.from_, <CongratsCard />, "8 Chúc mừng")}
      <Sequence name="9 Thẻ kết – ngôi sao hoá logo" from={card.from_ - 6} durationInFrames={card.frames + 6}>
        <EndGap />
      </Sequence>
      {/* chuyển cảnh */}
      {at(TITLE_CUT - 10, TITLE_CUT + 10, <StripeWipe dur={20} />, "Quét sọc: mở → cổng trường")}
      {at(shot(9).from_ - 12, shot(9).from_ + 12, <BlockWipe dur={24} />, "Lưới ô: vào lớp học")}
      {at(thanks - 10, thanks + 10, <StripeWipe dur={20} />, "Quét sọc: cảm ơn")}
      <Audio src={staticFile("music.wav")} />
    </AbsoluteFill>
  );
};

export const Root = () => (
  <Composition id="TQT-AIEdu" component={TQTVideo} durationInFrames={timeline.totalFrames} fps={timeline.fps} width={1280} height={720} />
);
