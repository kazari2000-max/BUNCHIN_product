import { Section, SectionHead, Tag, Panel } from "./ui";
// pp-plan.jsx — Part B (2/2): KPIs, discipline, roadmap, closing. Numbers kept light.

function KPIs() {
  const k = [
    { v: "60%+", t: "予約 → タップ率", d: "机に向かう開始儀式が機能しているか" },
    { v: "50%+", t: "サボった後の再起率", d: "最大のキラー指標。戻ってこられるか", killer: true },
    { v: "30%+", t: "D30 継続率", d: "新奇性を超えて使われるか" },
    { v: "60%+", t: "振り返り完了率", d: "負担なくログ化できるか" },
  ];
  return (
    <Section id="kpi" label="KPIs">
      <SectionHead n="08" en="What We Validate" ja="検証する行動 KPI" sub="100台βの最大の成果物は、販売数ではなく行動ログと運用データ。成功は、この目標値で測る。" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#1a1a1a", border: "1px solid #1a1a1a" }}>
        {k.map((x, i) => (
          <div key={i} style={{ background: x.killer ? "#101010" : "#0D0D0D", padding: "22px 18px", display: "flex", flexDirection: "column", gap: 10, minHeight: 168, borderTop: x.killer ? "2px solid #FF7B66" : "2px solid transparent" }}>
            {x.killer && <Tag color="#FF7B66">Killer Metric</Tag>}
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 36, color: x.killer ? "#FF7B66" : "#6EB6FF", lineHeight: 1, marginTop: x.killer ? 0 : 6 }}>{x.v}</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 16, color: "#F7F3EA" }}>{x.t}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, lineHeight: 1.6, color: "#7a7a7a", marginTop: "auto" }}>{x.d}</span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#6a6a6a", margin: "16px 0 0" }}>あわせて、月額サブスクの支払い意思・追加AIクレジット購入意思・初期設定完了率なども取得する。</p>
    </Section>
  );
}

function Discipline() {
  const rules = [
    ["Core AI は使い放題にしない", "期間ではなくセッション枠で制御し、原価を読める形に保つ"],
    ["集中中は STT を OFF", "コスト・プライバシー・監視感を抑え、沈黙の価値を守る"],
    ["完売を前提にしない", "All-or-Nothing 寄りで最低成立条件を設計する"],
    ["サポート工数も原価として可視化", "本体原価だけでなく、運用の真のコストを管理する"],
  ];
  return (
    <Section id="discipline" label="Discipline">
      <SectionHead n="09" en="Disciplined Hardware SaaS" ja="規律あるハードウェア SaaS" sub="BUNCHIN の成否を決めるのは AI API コストだけではない。調達・サポート・運用まで含めて管理できる設計にする。" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: "#1a1a1a", border: "1px solid #1a1a1a" }}>
        {rules.map((r, i) => (
          <div key={i} style={{ background: "#0D0D0D", padding: "20px 22px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 18, color: "#6EB6FF", lineHeight: 1, width: 26 }}>0{i + 1}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 16, color: "#F7F3EA", lineHeight: 1.35 }}>{r[0]}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.65, color: "#8a8a8a" }}>{r[1]}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Roadmap() {
  const ph = [
    ["P0", "1台 MVP 完成", "中核体験を実機で通す", "#FFE45C", true],
    ["P1", "初期テスト & 事前登録LP", "サポート工数を測り、見込み客を集める", "#6EB6FF"],
    ["P1.5", "調達・P&L 確定", "売れた後に破綻しない条件を固める", "#6EB6FF"],
    ["P2", "100台 Founders Beta", "有償PoC。行動・運用データを取得", "#78FF9E"],
    ["P3+", "改善版β / B2B2C / 量産判断", "検証データを見て次の事業形態を決める", "#9C9C9C"],
  ];
  return (
    <Section id="roadmap" label="Roadmap">
      <SectionHead n="10" en="Roadmap" ja="ロードマップ" />
      <div style={{ display: "flex", gap: 1, background: "#1a1a1a", border: "1px solid #1a1a1a", overflowX: "auto" }}>
        {ph.map((p, i) => (
          <div key={i} style={{ background: p[4] ? "#101010" : "#0D0D0D", padding: "20px 18px", display: "flex", flexDirection: "column", gap: 10, minWidth: 168, flex: 1, borderTop: `2px solid ${p[4] ? p[3] : "transparent"}` }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 18, letterSpacing: "0.04em", color: p[3] }}>{p[0]}</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 15.5, color: "#F7F3EA", lineHeight: 1.3 }}>{p[1]}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, lineHeight: 1.6, color: "#7a7a7a", marginTop: "auto" }}>{p[2]}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Closing() {
  return (
    <Section id="closing" label="Closing" style={{ paddingTop: 80, paddingBottom: 40 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "#6EB6FF", textTransform: "uppercase" }}>The Two Questions</span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: "#1a1a1a", border: "1px solid #1a1a1a", margin: "20px 0 40px" }}>
        {[
          "このロボットがいることで、ユーザーは本当にスマホから手を放し、机に向かい、サボっても戻ってこられるのか。",
          "その体験を、調達・クラウド/API原価・サポート負荷を管理しながら、ハードウェアSaaSとして継続提供できるのか。",
        ].map((q, i) => (
          <div key={i} style={{ background: "#0D0D0D", padding: "26px 24px", display: "flex", gap: 16 }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 22, color: "#262626" }}>0{i + 1}</span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#F7F3EA", margin: 0 }}>{q}</p>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(26px,3.4vw,44px)", color: "#F7F3EA", lineHeight: 1.18, letterSpacing: "-0.01em" }}>
        ひとりで頑張る時間を<br/>ひとりにしない。
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #1a1a1a", paddingTop: 24, marginTop: 40, flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "#5a5a5a" }}>BUNCHIN · BN-01 · FOR PARTNERS & BUILDERS · 2026</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "#5a5a5a" }}>話しすぎない。でも、ちゃんといる。</span>
      </div>
    </Section>
  );
}

export { KPIs, Discipline, Roadmap, Closing };
