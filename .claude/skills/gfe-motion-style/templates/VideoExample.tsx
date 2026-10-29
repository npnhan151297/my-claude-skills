// Ví dụ áp dụng: video tặng THCS Trần Quốc Toản v3 (footage + timeline.json từ dung-video-tu-footage).
// Video tặng Trường THCS Trần Quốc Toản – 10 năm thành lập. AI Edu gửi lời cảm ơn 5 năm đồng hành.
// v3: ngôn ngữ chuyển động Google for Education (quét sọc 4 màu, lưới ô xanh, lower-third đường kẻ,
// chữ số nổi khối, đường mạch + chấm màu, khung cửa sổ, 4 chấm mở logo).
import { Audio, Video } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, Composition, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import timeline from "./timeline.json";
import { BlockWipe, CircuitLines, DotsBurst, Extruded, G, INK, INK_SOFT, IconTile, LineBar, PillField, StripeWipe, Typewriter, WindowFrame } from "./GfeMotion";

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
        <div>
          <Rise delay={20}>
            <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 58, color: INK, lineHeight: 1.12 }}>TRƯỜNG THCS</div>
          </Rise>
          <Rise delay={24}>
            <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 58, color: INK, lineHeight: 1.12 }}>TRẦN QUỐC TOẢN</div>
          </Rise>
          <Rise delay={32}>
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

/** Thẻ chương "5 năm": chữ số nổi khối lớn + chữ gõ, đường mạch trang trí. */
const ChapterFive: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const num = spring({ frame: f - 4, fps, config: { damping: 13, stiffness: 170 }, durationInFrames: 22 });
  return (
    <AbsoluteFill style={{ background: "white" }}>
      <CircuitLines
        width={1280}
        height={720}
        paths={[
          { d: "M 60 120 L 60 300 L 200 300", len: 320, delay: 6, dots: [{ x: 60, y: 120, c: G.red, at: 0 }, { x: 200, y: 300, c: G.yellow, at: 14 }] },
          { d: "M 1220 650 L 1220 540 L 1110 540", len: 230, delay: 10, dots: [{ x: 1220, y: 650, c: G.green, at: 0 }, { x: 1110, y: 540, c: G.blue, at: 14 }] },
        ]}
      />
      <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 40 }}>
        <div style={{ transform: `scale(${0.5 + 0.5 * num})`, opacity: Math.min(1, num * 1.4) }}>
          <Extruded text="5" size={330} depth={14} font={FONT} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Typewriter text="năm đồng hành" delay={8} cps={30} size={54} font={FONT} weight={800} />
          <div style={{ minHeight: 72 }}>
            <Typewriter text="cùng Google for Education" delay={22} cps={34} size={54} font={FONT} weight={800} color={G.blue} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Thẻ cảm ơn: chữ bên trái, footage trong khung cửa sổ bên phải, ô biểu tượng và đường mạch. */
const ThanksCard: React.FC<{ videoFrom: number }> = ({ videoFrom }) => (
  <AbsoluteFill style={{ background: "white" }}>
    <CircuitLines
      width={1280}
      height={720}
      paths={[
        { d: "M 640 70 L 1210 70 L 1210 150", len: 650, delay: 4, dots: [{ x: 640, y: 70, c: G.yellow, at: 0 }, { x: 1210, y: 150, c: G.green, at: 16 }] },
        { d: "M 700 650 L 1150 650", len: 450, delay: 10, dots: [{ x: 700, y: 650, c: G.red, at: 0 }, { x: 1150, y: 650, c: G.blue, at: 16 }] },
      ]}
    />
    <WindowFrame x={690} y={140} w={520} h={318} delay={4}>
      <Video src={staticFile("base.mp4")} trimBefore={videoFrom} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </WindowFrame>
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

const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: f - 30, fps, config: { damping: 200 }, durationInFrames: 22 });
  return (
    <AbsoluteFill style={{ background: "white" }}>
      <CircuitLines
        width={1280}
        height={720}
        paths={[
          { d: "M 0 110 L 260 110 L 260 220", len: 370, delay: 34, dots: [{ x: 260, y: 220, c: G.blue, at: 16 }] },
          { d: "M 1280 610 L 1020 610 L 1020 500", len: 370, delay: 38, dots: [{ x: 1020, y: 500, c: G.green, at: 16 }] },
        ]}
      />
      <DotsBurst at={0} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img src={staticFile("logo.png")} style={{ width: 960, opacity: logo, transform: `scale(${0.9 + 0.1 * logo})` }} />
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
          opacity: interpolate(f, [44, 58], [0, 1], clamp),
        }}
      >
        Music: “Super Friendly” – Kevin MacLeod (incompetech.com) · Licensed under CC BY 4.0
      </div>
    </AbsoluteFill>
  );
};

/** Nền footage; slow motion đẩy máy chậm, các cú cắt đoạn cao trào có zoom punch. */
const Footage: React.FC = () => {
  const frame = useCurrentFrame();
  const cur = timeline.shots.find((s) => frame >= s.from_ && frame < s.from_ + s.frames);
  let scale = 1;
  if (cur && cur.speed < 1) scale = interpolate(frame, [cur.from_, cur.from_ + cur.frames], [1, 1.07], { easing: Easing.inOut(Easing.quad) });
  else if (cur && cur.sec === "C") scale = interpolate(frame - cur.from_, [0, 7], [1.08, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill style={{ scale }}>
      <Video src={staticFile("base.mp4")} muted />
    </AbsoluteFill>
  );
};

export const TQTVideo: React.FC = () => {
  const card = shot(46);
  const at = (from: number, to: number, el: React.ReactNode, name: string) => (
    <Sequence name={name} from={from} durationInFrames={to - from}>
      {el}
    </Sequence>
  );
  const end = (i: number) => shot(i).from_ + shot(i).frames;
  const TITLE_CUT = 60;
  const chap = shot(34).from_;
  const chapEnd = shot(36).from_;
  const thanks = shot(44).from_;
  const congrats = shot(45).from_;
  return (
    <AbsoluteFill style={{ background: "white" }}>
      <Sequence name="Footage" durationInFrames={card.from_}>
        <Footage />
      </Sequence>
      {at(0, TITLE_CUT, <TitleCard />, "1 Thẻ mở")}
      {at(shot(2).from_ + 6, end(2) - 2, <LineBar dur={end(2) - shot(2).from_ - 8} title="Mười năm vun đắp một mái trường" font={FONT} />, "2 Mười năm")}
      {at(shot(3).from_ + 10, end(5), <LineBar dur={end(5) - shot(3).from_ - 10} title="Nơi mỗi tiết học là một hành trình khám phá" font={FONT} />, "3 Tiết học")}
      {at(shot(10).from_ + 6, end(11), <LineBar dur={end(11) - shot(10).from_ - 6} title="Thầy cô không ngừng đổi mới" font={FONT} />, "4 Thầy cô")}
      {at(shot(28).from_ + 2, end(30), <LineBar dur={end(30) - shot(28).from_ - 2} title="Học trò tự tin bước vào thời đại số" font={FONT} />, "5 Học trò")}
      {at(chap, chapEnd, <ChapterFive />, "6 Thẻ chương 5 năm")}
      {at(thanks, congrats, <ThanksCard videoFrom={thanks} />, "7 Cảm ơn")}
      {at(congrats, card.from_, <CongratsCard />, "8 Chúc mừng")}
      <Sequence name="9 Thẻ kết" from={card.from_} durationInFrames={card.frames}>
        <EndCard />
      </Sequence>
      {/* chuyển cảnh */}
      {at(TITLE_CUT - 10, TITLE_CUT + 10, <StripeWipe dur={20} />, "Quét sọc: mở → cổng trường")}
      {at(shot(3).from_ - 10, shot(3).from_ + 10, <BlockWipe dur={20} />, "Lưới ô: vào lớp học")}
      {at(shot(24).from_ - 10, shot(24).from_ + 10, <BlockWipe dur={20} />, "Lưới ô: vào cao trào")}
      {at(chap - 10, chap + 10, <StripeWipe dur={20} />, "Quét sọc: thẻ chương")}
      {at(thanks - 10, thanks + 10, <StripeWipe dur={20} />, "Quét sọc: cảm ơn")}
      {at(card.from_ - 10, card.from_ + 10, <StripeWipe dur={20} />, "Quét sọc: thẻ kết")}
      <Audio src={staticFile("music.wav")} />
    </AbsoluteFill>
  );
};

export const Root = () => (
  <Composition id="TQT-AIEdu" component={TQTVideo} durationInFrames={timeline.totalFrames} fps={timeline.fps} width={1280} height={720} />
);
