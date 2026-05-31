import { Section, SectionHead, Tag, Panel } from "./ui";
// pp-business.jsx — Part B (1/2): current phase, why physical, Founders Beta + tiers.

function Phase() {
  const phases = [
    { tag: "NOW", color: "#FFE45C", t: "1台 MVP 開発中", d: "予約→待機→タップ→静音見守り→振り返りを実機で通す。量産品ではなく、中核体験の検証機。", active: true },
    { tag: "NEXT", color: "#6EB6FF", t: "100台限定 Founders Beta", d: "正式量産前の有償PoC。最初の100人と、行動データと運用知見を取りに行く。" },
    { tag: "BEYOND", color: "#9C9C9C", t: "その先の判断", d: "検証データを見て、B2C継続 / B2B2C / 教育機関 / OEM のどれに進むかを決める。" },
  ];
  return (
    <Section id="plan" label="Phase">
      <SectionHead n="05" en="Where We Are" ja="現在地" sub="いきなり大規模なハード事業にしない。1台のMVPで核を確かめ、条件を満たした時だけ次へ進む。" />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <span style={{ width: 9, height: 9, background: "#FFE45C", animation: "bunchin-blink 1.06s steps(1) infinite" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.18em", color: "#FFE45C", textTransform: "uppercase" }}>Current Judgement · Conditional Go</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "#1a1a1a", border: "1px solid #1a1a1a" }}>
        {phases.map((p, i) => (
          <div key={i} style={{ background: p.active ? "#101010" : "#0D0D0D", padding: "22px 20px", display: "flex", flexDirection: "column", gap: 12, minHeight: 160, borderTop: p.active ? `2px solid ${p.color}` : "2px solid transparent" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Tag color={p.color} filled={p.active}>{p.tag}</Tag>
              <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14, color: "#2a2a2a" }}>0{i}</span>
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 19, color: "#F7F3EA", lineHeight: 1.25 }}>{p.t}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.7, color: "#8a8a8a", marginTop: "auto" }}>{p.d}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhyPhysical() {
  const comp = [
    ["習慣化アプリ", "通知だけでなく、机上に物理的に存在する"],
    ["AIチャットアプリ", "会話相手ではなく、努力時間に同席する"],
    ["会話ロボット", "長時間雑談ではなく、開始・集中・再起・振り返りに集中"],
    ["スマートスピーカー", "固定ペルソナ・目標記憶・努力ログ・次回行動を持つ"],
  ];
  return (
    <Section id="why" label="Thesis">
      <SectionHead n="06" en="Why Physical" ja="なぜ物理ロボットなのか" />
      <Panel style={{ padding: "28px 26px", marginBottom: 24 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", color: "#6EB6FF", textTransform: "uppercase" }}>The Core Question</span>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(20px,2.4vw,26px)", lineHeight: 1.5, color: "#F7F3EA", margin: "14px 0 0" }}>
          机の上の物理的な存在は、アプリ通知だけより、<br/>本当にユーザーを机に戻せるのか。
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "#9C9C9C", margin: "14px 0 0", maxWidth: 640 }}>これが BUNCHIN の検証対象。証明すべきは「かわいい・面白い」ではなく、予約→タップ率・サボった後の再起率・継続率を、物理的存在が改善するか。</p>
      </Panel>
      <div style={{ border: "1px solid #1a1a1a" }}>
        {comp.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(140px,0.7fr) 1.6fr", background: "#0D0D0D", borderBottom: i < comp.length - 1 ? "1px solid #1a1a1a" : "none" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#9C9C9C", padding: "15px 22px", borderRight: "1px solid #1a1a1a" }}>{c[0]}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#F7F3EA", padding: "15px 22px" }}>{c[1]}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FoundersBeta() {
  const includes = ["BUNCHIN 本体（StackChanベース + 自社FW）", "Founders Beta 参加権", "3か月 Basic アクセス", "上限付き Core AI セッション枠", "初期設定ガイド・限定サポート", "改善フィードバック導線"];
  const tiers = [
    { name: "Basic", color: "#78FF9E", note: "土台。低コストで常時使える", items: ["予約・通知・待機", "物理タップ開始", "タイマー・静音見守り", "基本ログ・テンプレ振り返り"] },
    { name: "Core AI", color: "#6EB6FF", note: "枠で制御。使い放題にしない", items: ["パーソナライズ開始発話", "振り返り要約", "次回アクション抽出", "立て直し提案"] },
    { name: "Voice / Advanced", color: "#5a5a5a", note: "βでは入れない / 強く制限", items: ["常時STT・音声常時送信", "リアルタイム音声会話", "長時間雑談", "（沈黙の価値に反する）"] },
  ];
  return (
    <Section id="beta" label="Founders Beta">
      <SectionHead n="07" en="Founders Beta" ja="100台限定 Founders Beta" sub={'正式量産版ではない、有償βプログラム。「2時間"話す"のではなく、2時間"同席"する」設計を、実生活で検証する。'} />
      <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 24, alignItems: "start" }}>
        <Panel style={{ padding: "20px 22px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: "#6a6a6a", textTransform: "uppercase" }}>提供内容</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 16 }}>
            {includes.map((it, i) => (
              <div key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                <span style={{ width: 6, height: 6, background: "#FFE45C", marginTop: 6, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.5, color: "#F7F3EA" }}>{it}</span>
              </div>
            ))}
          </div>
        </Panel>
        <div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: "#6a6a6a", textTransform: "uppercase", display: "block", marginBottom: 14 }}>機能 3 階層 · 原価を読める形に分ける</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "#1a1a1a", border: "1px solid #1a1a1a" }}>
            {tiers.map((t, i) => (
              <div key={i} style={{ background: "#0D0D0D", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", color: t.color, textTransform: "uppercase" }}>{t.name}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#6a6a6a" }}>{t.note}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {t.items.map((x, j) => (
                    <span key={j} style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#9C9C9C", border: "1px solid #262626", padding: "5px 9px" }}>{x}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export { Phase, WhyPhysical, FoundersBeta };
