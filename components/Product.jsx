import { Section, SectionHead, Tag, Panel } from "./ui";
// pp-product.jsx — Part A: name meaning, problem, the experience loop, positioning.

const NAME = [
  ["B", "Base", "基点", "机や部屋を、努力する場所として儀式化する"],
  ["U", "Unison", "同席", "設定した時間に、ロボットが一緒にいる"],
  ["N", "Nudge", "促し", "通知より自然な声かけで、始めやすくする"],
  ["C", "Concentration", "集中", "集中している間は話しかけず、静かに見守る"],
  ["H", "Habit", "習慣", "朝夜のリズムと、日々の継続を支える"],
  ["I", "Interaction", "対話", "開始・休憩・立て直し・振り返りだけ短く話す"],
  ["N", "Next", "次の一歩", "できた日もできなかった日も、次に戻れる形で終える"],
];

function NameMeaning() {
  return (
    <Section id="name" label="Name">
      <style>{`
        .bn-name-table{border:1px solid #1a1a1a;container-type:inline-size;}
        .bn-name-row{display:grid;grid-template-columns:78px 200px 1fr;align-items:center;gap:22px;padding:16px 22px;background:#0D0D0D;border-bottom:1px solid #1a1a1a;}
        .bn-name-row:last-child{border-bottom:none;}
        .bn-name-letter{font-family:var(--font-pixel);font-size:34px;line-height:1;color:#FFE45C;letter-spacing:.02em;}
        .bn-name-info{display:flex;flex-direction:column;gap:3px;}
        .bn-name-en{font-family:var(--font-mono);font-size:13px;letter-spacing:.12em;color:#F7F3EA;text-transform:uppercase;}
        .bn-name-ja{font-family:var(--font-body);font-size:13px;color:#6a6a6a;}
        .bn-name-mean{font-family:var(--font-body);font-size:14px;line-height:1.6;color:#9C9C9C;}
        @container (max-width:560px){
          .bn-name-row{grid-template-columns:58px 1fr;row-gap:9px;column-gap:14px;padding:18px 18px;}
          .bn-name-mean{grid-column:1 / -1;}
          .bn-name-letter{font-size:30px;}
        }
      `}</style>
      <SectionHead n="00" en="What the Name Means" ja="未来のあなたを作るBUNCHINシステム" sub="文鎮（ぶんちん）は、紙を押さえる道具。BUNCHIN は、あなたの注意力を机の上に保持するのを助けます。その7文字は、行動変容システムの7要素からなります。" />
      <div className="bn-name-table">
        {NAME.map((r, i) => (
          <div key={i} className="bn-name-row">
            <span className="bn-name-letter">{r[0]}</span>
            <div className="bn-name-info">
              <span className="bn-name-en">{r[1]}</span>
              <span className="bn-name-ja">{r[2]}</span>
            </div>
            <span className="bn-name-mean">{r[3]}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Problem() {
  const items = [
    ["CAN'T START", "始められない", "通知は無視できる。机に向かうまでの摩擦が大きい。"],
    ["CAN'T CONTINUE", "続かない", "アプリは開かなくなる。できない日が続くと記録も見たくない。"],
    ["CAN'T RETURN", "戻れない", "一度サボると、戻るきっかけを失う。"],
  ];
  return (
    <Section id="product" label="Problem">
      <SectionHead n="01" en="The Problem" ja="スマホから手を離すための相棒" sub="多くの人が、学習・資格・語学・読書・規則正しい生活を「続けたい」と思っている。けれど——" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "#1a1a1a", border: "1px solid #1a1a1a" }}>
        {items.map((it, i) => (
          <div key={i} style={{ background: "#0D0D0D", padding: "26px 22px", display: "flex", flexDirection: "column", gap: 12, minHeight: 150 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "#FF7B66" }}>{it[0]}</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 25, color: "#F7F3EA" }}>{it[1]}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.7, color: "#7a7a7a", marginTop: "auto" }}>{it[2]}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

const LOOP = [
  ["01", "予約", "RESERVE", "いつ・何を・どれくらいを設定する"],
  ["02", "待機", "WAIT", "定刻、机の上でロボットが静かに待つ"],
  ["03", "タップ開始", "TAP", "触れて始める。小さな開始の儀式"],
  ["04", "静音見守り", "FOCUS", "集中している間は話さない。STTもOFF"],
  ["05", "立て直し", "RECOVER", "詰まったら責めず、目標を小さく戻す"],
  ["06", "振り返り", "REVIEW", "1〜3分で短く、努力をログ化"],
  ["07", "次の一歩", "NEXT", "明日の最小行動へ再接続する"],
];

function RitualLoop() {
  return (
    <Section id="loop" label="Loop">
      <SectionHead n="02" en="The Experience Loop" ja="待つ。始める。黙って見守る。詰まったら戻す。" sub="BUNCHIN は、場所・時間・ロボット・短い対話・振り返りを組み合わせた、行動変容の仕組み。毎日この輪をまわす。" />
      <div style={{ border: "1px solid #1a1a1a" }}>
        {LOOP.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr 110px", alignItems: "center", gap: 22, padding: "18px 22px", borderBottom: i < LOOP.length - 1 ? "1px solid #1a1a1a" : "none", background: "#0D0D0D" }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 15, letterSpacing: "0.06em", color: "#6EB6FF" }}>{r[0]}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 20, color: "#F7F3EA" }}>{r[1]}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8a8a8a", lineHeight: 1.6 }}>{r[3]}</span>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", color: "#5a5a5a", textAlign: "right", textTransform: "uppercase" }}>{r[2]}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px", background: "#080808", borderTop: "1px solid #1a1a1a" }}>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "#78FF9E" }}>↺</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", color: "#6a6a6a", textTransform: "uppercase" }}>翌日へ · できた日も、できなかった日も</span>
        </div>
      </div>
    </Section>
  );
}

const IS = [
  ["机に戻るための物理アンカー", "長時間雑談する AI ペット"],
  ["学習・作業の習慣化支援ツール", "医療・治療・診断ツール"],
  ["開始・再起・振り返りの支援端末", "監視・採点・説教する装置"],
  ["2時間「同席」するロボット", "2時間「話し続ける」ロボット"],
  ["自律的な努力を支える相棒", "カウンセリング代替サービス"],
];

function IsIsnt() {
  return (
    <Section id="position" label="Positioning">
      <SectionHead n="04" en="What It Is / Isn't" ja="BUNCHIN であるもの / ないもの" sub="かわいさや面白さが主役ではない。机上の物理的存在が、行動を変えられるかにある。" />
      <div style={{ border: "1px solid #1a1a1a" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#080808", borderBottom: "1px solid #1a1a1a" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: "#78FF9E", textTransform: "uppercase", padding: "13px 22px", borderRight: "1px solid #1a1a1a" }}>● である</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: "#5a5a5a", textTransform: "uppercase", padding: "13px 22px" }}>○ ではない</span>
        </div>
        {IS.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#0D0D0D", borderBottom: i < IS.length - 1 ? "1px solid #1a1a1a" : "none" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#F7F3EA", padding: "16px 22px", borderRight: "1px solid #1a1a1a" }}>{r[0]}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#6a6a6a", padding: "16px 22px" }}>{r[1]}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export { NameMeaning, Problem, RitualLoop, IsIsnt };
