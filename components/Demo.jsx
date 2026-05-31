"use client";
import React from "react";
import { PixelFace } from "./PixelFace";
import { BunchinSound, Section, SectionHead, Tag, Panel } from "./ui";
// pp-demo.jsx — interactive device demo, "living spec" flow.
// Triggers by subject: ② nudge = reserved TIME (robot speaks first), ③' recovery = TAP,
// ④ complete = progress ring fills. STT opens only at nudge & recovery. No red — amber=rest.
// Numbers (hysteresis, breathing/blink rate, LED granularity) are placeholders — TBD on device.

const AMBER = "#FFC24D"; // 琥珀 = rest (recovery). NOT the design-system coral. Demo-spec deviation.

// ⑤ review dialogue — 4-turn backbone (文面は別途詰める). Plan-dependent depth adds 枝, not 雑談.
const REVIEW_TURNS = [
  { k: "done", q: "おつかれさま。今日はどうだった？", opts: ["単語を20個できた", "思ったより進んだ", "あまり集中できなかった"] },
  { k: "hard", q: "そっか。大変だったところは？", opts: ["始めるまでが重かった", "途中で集中が切れた", "特になかった"] },
  { k: "step", q: "じゃあ、明日の最初の一歩を一緒に決めよう。", opts: ["単語10個から", "まず1問だけ", "5分だけ机に座る"], core: true },
];

function DemoDevice({ faceState, speaking, listening, signalWord, led, ledBlink, progress, bloom, dimExtra, onTap, tappable }) {
  return (
    <div style={{ width: 320, background: "#0A0A0A", border: "1.5px solid #1f1f1f", borderBottom: "4px solid #000", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "#5a5a5a" }}>BN-01</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* STT badge — lit only while listening (nudge & recovery) */}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: listening ? "#78FF9E" : "#2a2a2a", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: listening ? "#78FF9E" : "#2a2a2a", animation: listening ? "bunchin-blink 0.9s steps(1) infinite" : "none" }} />STT
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", color: "#5a5a5a", textTransform: "uppercase" }}>{faceState}</span>
            <div style={{ width: 8, height: 8, background: led, animation: ledBlink ? "bunchin-blink 1.06s steps(1) infinite" : "none" }} />
          </div>
        </div>
      </div>
      <div style={{ position: "relative", background: "#000", border: "1px solid #161616", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)" }} />
        {/* green full-bleed bloom on complete */}
        <div style={{ position: "absolute", inset: 0, background: "#78FF9E", opacity: bloom ? 0.16 : 0, transition: "opacity 480ms ease", pointerEvents: "none" }} />
        <div style={{ opacity: dimExtra ? 0.45 : 1, transition: "opacity 700ms ease" }}>
          <PixelFace state={faceState} speaking={speaking} px={7} eyeGap={74} color={faceState === "recovery" ? AMBER : undefined} />
        </div>
        {signalWord && <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, textAlign: "center", fontFamily: "var(--font-pixel)", fontSize: 18, letterSpacing: "0.08em", color: signalWord.color, textTransform: "uppercase" }}>{signalWord.text}</div>}
        {/* LED progress — low light gradually filling; blooms full-width green on complete */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: "#0c0c0c" }}>
          <div style={{ height: "100%", width: `${Math.round(progress * 100)}%`, background: bloom ? "#78FF9E" : led, opacity: bloom ? 1 : 0.55, transition: "width 360ms linear, background 300ms, opacity 300ms" }} />
        </div>
      </div>
      {/* physical tap zone — recovery only (never used for start) */}
      <button onClick={tappable ? onTap : undefined} disabled={!tappable} style={{
        appearance: "none", border: `1.5px solid ${tappable ? "#2a2a2a" : "#191919"}`, background: "#070707",
        color: tappable ? "#8a8a8a" : "#333", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
        textTransform: "uppercase", padding: "12px 0", cursor: tappable ? "pointer" : "default", width: "100%",
        transition: "border-color 120ms, color 120ms",
      }}
      onMouseEnter={e => { if (tappable) { e.currentTarget.style.borderColor = AMBER; e.currentTarget.style.color = AMBER; } }}
      onMouseLeave={e => { if (tappable) { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#8a8a8a"; } }}
      >◦ TAP ZONE{tappable ? " · 立て直し" : ""}</button>
    </div>
  );
}

function LogLine({ t, dot, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "58px 9px 1fr", alignItems: "center", gap: 11, padding: "9px 0", borderBottom: "1px solid #141414" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#6a6a6a", letterSpacing: "0.04em" }}>{t}</span>
      <span style={{ width: 7, height: 7, background: dot }} />
      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#F7F3EA" }}>{children}</span>
    </div>
  );
}

function Btn({ onClick, color, ghost, children, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      appearance: "none", cursor: disabled ? "default" : "pointer",
      border: ghost ? `1.5px solid ${disabled ? "#222" : color}` : "none",
      background: ghost ? "transparent" : (disabled ? "#1a1a1a" : color),
      color: ghost ? (disabled ? "#333" : color) : "#050505", opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11.5, letterSpacing: "0.12em",
      textTransform: "uppercase", padding: "13px 16px",
    }}>{children}</button>
  );
}

// step machine: idle(予約済み) → nudge(声かけ) → focus(見守り) → recovery(立て直し) → complete(完走) → review(振り返り)
function DeviceDemo() {
  const [step, setStep] = React.useState("idle");
  const [speaking, setSpeaking] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [voice, setVoice] = React.useState("");
  const [working, setWorking] = React.useState(true); // ③ 作業中(true) / 小休止(false)
  const [breathing, setBreathing] = React.useState(false); // 小休止の呼吸（ヒステリシス後に戻る）
  const [progress, setProgress] = React.useState(0);
  const [bloom, setBloom] = React.useState(false);
  const [log, setLog] = React.useState([{ t: "予約", dot: "#FFE45C", txt: "RESERVED · 英語学習 / 20:00 / 25min" }]);
  const [reviewTurn, setReviewTurn] = React.useState(-1); // -1 none, 0..2 turns, 99 closing
  const [picks, setPicks] = React.useState({});
  const [tomorrowStep, setTomorrowStep] = React.useState(null); // carries to next-day nudge (円環)
  const timers = React.useRef([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const push = (t, dot, txt) => setLog(l => [...l, { t, dot, txt }]);
  const after = (ms, fn) => { const id = setTimeout(fn, ms); timers.current.push(id); return id; };
  React.useEffect(() => () => clear(), []);

  // ② NUDGE — triggered by reserved time. Robot speaks first; STT opens; max 2 turns.
  function nudge() {
    if (step !== "idle") return;
    clear();
    BunchinSound.play("session_start");
    setStep("nudge"); setSpeaking(true); setListening(true);
    setVoice(tomorrowStep ? `昨日は「${tomorrowStep}」って言ってたね。じゃ、そこから。` : "時間だね。準備はいい？");
    push("20:00", "#FFE45C", tomorrowStep ? "NUDGE · 予約時刻（昨日の一歩を引き継ぐ / STT開）" : "NUDGE · 予約時刻、ロボットから声かけ（STT開）");
    after(2600, () => setSpeaking(false));
  }

  // ② responses — 2-turn max with two escape hatches
  function reply(kind) {
    if (step !== "nudge") return;
    clear();
    if (kind === "start") {
      setSpeaking(true);
      setVoice("いいね。まず5分だけ、昨日の続きから一緒にやろう。");
      push("20:00", "#6EB6FF", "返答 → 開始へピボット");
      after(2600, () => { setSpeaking(false); setListening(false); setVoice(""); enterFocus(); });
    } else if (kind === "silent") {
      // 完全な沈黙 → 着地させず待機へ引く
      setSpeaking(false); setListening(false); setVoice("");
      push("20:00", "#5a5a5a", "沈黙 → 着地させず待機へ（無人で始めない）");
      setStep("idle");
    } else if (kind === "stop") {
      // 明確な「やめる」→ 茶化さず引いて再設定
      setSpeaking(true); setListening(false);
      setVoice("わかった。今日は無理しない。また予約しておくね。");
      push("20:00", "#5a5a5a", "「やめる」→ 引いて再設定（責めない）");
      after(2400, () => { setSpeaking(false); setVoice(""); setStep("idle"); });
    }
  }

  function enterFocus() {
    setStep("focus"); setWorking(true); setBreathing(false);
    push("20:01", "#6EB6FF", "FOCUS · 静音見守り（STT閉 / 音ゼロ）");
  }

  // ③' RECOVERY — triggered by physical TAP. Amber, re-scope, progress NOT reset.
  function recover() {
    if (step !== "focus") return;
    clear();
    BunchinSound.play("recovery");
    setStep("recovery"); setSpeaking(true); setListening(true);
    setVoice("そっか、今は重いね。全部やらなくていい。あと1問だけ見てみよう。");
    push("20:14", AMBER, "RECOVERY · タップで助けを求めた（琥珀 / 進捗は保持）");
    after(3200, () => setSpeaking(false));
    after(3500, () => { setListening(false); setVoice(""); setStep("focus"); setWorking(true); });
  }

  // ④ COMPLETE — triggered when progress reaches goal
  function doComplete() {
    clear(); setSpeaking(false); setListening(false); setVoice("");
    BunchinSound.play("complete");
    setStep("complete"); setProgress(1); setBloom(true);
    push("20:25", "#78FF9E", "COMPLETE · 目標時間に到達。緑ブルーム＋チャイム");
    after(2400, startReview);
  }

  // ⑤ REVIEW — robot-initiated dialogue. 3rd (and last) STT of the day. 4-turn backbone + 引き際.
  function startReview() {
    clear();
    setStep("review"); setReviewTurn(0); setPicks({});
    setSpeaking(true); setListening(true);
    setVoice(REVIEW_TURNS[0].q);
    push("20:26", "#78FF9E", "REVIEW · 振り返り開始（ロボットから / STT開 · 本日 3 度目）");
    after(2200, () => setSpeaking(false));
  }

  // close — release the day's accumulated reward; write the effort log; carry tomorrow's step.
  function closeReview(finalPicks) {
    clear();
    setReviewTurn(99); setListening(false); setSpeaking(true);
    setVoice("いいね。今日はここまで。おつかれさま。");
    const parts = [];
    if (finalPicks.done) parts.push("できた:" + finalPicks.done);
    if (finalPicks.hard) parts.push("大変:" + finalPicks.hard);
    if (finalPicks.step) parts.push("明日:" + finalPicks.step);
    push("20:27", "#78FF9E", "SAVED · " + (parts.length ? parts.join(" / ") : "ログのみ確定"));
    if (finalPicks.step) setTomorrowStep(finalPicks.step);
    after(2400, () => setSpeaking(false));
  }

  // a review turn — log the user's self-reported words, then advance or close.
  function reviewReply(choice) {
    const t = reviewTurn;
    if (t < 0 || t > 2) return;
    clear();
    if (choice === "__rest") { // 引き際：上限が余っていても素直に締める（引き止めない）
      push("20:26", "#5a5a5a", "引き際 · 短い相づち/疲れのサイン → 引き止めず締める");
      closeReview(picks);
      return;
    }
    const cur = REVIEW_TURNS[t];
    const np = { ...picks, [cur.k]: choice };
    setPicks(np);
    push("20:26", cur.core ? "#78FF9E" : "#6EB6FF", "▸ " + choice + (cur.core ? "（明日の一歩）" : ""));
    const next = t + 1;
    if (next < REVIEW_TURNS.length) {
      setReviewTurn(next); setSpeaking(true); setVoice(REVIEW_TURNS[next].q);
      after(2000, () => setSpeaking(false));
    } else {
      closeReview(np);
    }
  }

  // ⑤ → back to standby. Keep tomorrowStep so the next nudge's first line references it (円環).
  function reset() {
    clear(); setStep("idle"); setSpeaking(false); setListening(false); setVoice("");
    setProgress(0); setBloom(false); setWorking(true); setBreathing(false);
    setReviewTurn(-1); setPicks({});
    setLog([{ t: "予約", dot: "#FFE45C", txt: "RESERVED · 英語学習 / 翌日 20:00 / 25min" }]);
  }

  // ③ progress fill while in focus → ④ auto-complete when full. TBD: granularity/rate.
  React.useEffect(() => {
    if (step !== "focus") return;
    const id = setInterval(() => {
      setProgress(p => {
        const np = Math.min(1, p + (working ? 0.0055 : 0.002)); // 作業中は速く満ちる（デモ用の仮レート）
        if (np >= 1) { clearInterval(id); doComplete(); }
        return np;
      });
    }, 120);
    return () => clearInterval(id);
    // doComplete intentionally uses the latest demo state machine closures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, working]);

  // ③ hysteresis: when input stops (小休止), breathing returns only after a delay. TBD: seconds.
  React.useEffect(() => {
    if (step !== "focus") { setBreathing(false); return; }
    if (working) { setBreathing(false); return; }
    const id = setTimeout(() => setBreathing(true), 1400); // ← ヒステリシス（仮値）
    return () => clearTimeout(id);
  }, [working, step]);

  // map step → device visuals
  const VIS = {
    idle:     { face: "standby", led: "#FFE45C", ledBlink: true,  word: null, label: "STANDBY" },
    nudge:    { face: "ready",   led: "#FFE45C", ledBlink: true,  word: { text: "準備はいい？", color: "#FFE45C" }, label: "NUDGE" },
    focus:    { face: "focus",   led: "#6EB6FF", ledBlink: false, word: null, label: "FOCUS" },
    recovery: { face: "recovery",led: AMBER,     ledBlink: false, word: { text: "1問", color: AMBER }, label: "RECOVERY" },
    complete: { face: "complete",led: "#78FF9E", ledBlink: false, word: { text: "SAVED", color: "#78FF9E" }, label: "COMPLETE" },
    review:   { face: "complete",led: "#78FF9E", ledBlink: false, word: null, label: "REVIEW" },
  }[step];

  // 作業中は減光・静止（瞬き閾下）/ 小休止は呼吸が戻る
  const focusStill = step === "focus" && working;
  const dimExtra = focusStill;
  const faceSpeaking = speaking;

  return (
    <Section id="demo" label="Demo">
      <SectionHead n="03" en="Try It · Living Spec" ja="待つ。声をかける。黙って見守る。詰まったら、戻す。" sub="引き金は段階ごとに変わる——声かけは《予約時刻》、立て直しは《タップ》、完走は《時間の到達》。STTが開くのは声かけ・立て直し・振り返りの3回だけ（集中中はOFF）。右上の SOUND ON で音が鳴ります。" />
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "stretch" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <DemoDevice
            faceState={VIS.face} speaking={faceSpeaking} listening={listening}
            signalWord={VIS.word} led={VIS.led} ledBlink={VIS.ledBlink}
            progress={progress} bloom={bloom} dimExtra={dimExtra}
            tappable={step === "focus"} onTap={recover}
          />
          {/* controls — change per step; tap-to-start is GONE (start is time-triggered) */}
          <div style={{ display: "flex", gap: 9, width: 320, flexWrap: "wrap" }}>
            {step === "idle" && <Btn onClick={nudge} color="#FFE45C">▶ 予約時刻 20:00 になる</Btn>}
            {step === "nudge" && <React.Fragment>
              <Btn onClick={() => reply("start")} color="#FFE45C">はじめる</Btn>
              <Btn onClick={() => reply("silent")} ghost color="#6a6a6a">…沈黙</Btn>
              <Btn onClick={() => reply("stop")} ghost color="#6a6a6a">今日はやめる</Btn>
            </React.Fragment>}
            {step === "focus" && <React.Fragment>
              <Btn onClick={() => setWorking(w => !w)} ghost color={working ? "#6EB6FF" : "#9C9C9C"}>{working ? "打鍵中 ▸ 手を止める" : "小休止 ▸ 打鍵に戻る"}</Btn>
              <Btn onClick={doComplete} ghost color="#78FF9E">完走まで送る</Btn>
            </React.Fragment>}
            {(step === "recovery") && <Btn disabled color={AMBER}>… 立て直し中</Btn>}
            {(step === "complete") && <Btn disabled color="#78FF9E">… 完走</Btn>}
            {step === "review" && reviewTurn >= 0 && reviewTurn <= 2 && <React.Fragment>
              {REVIEW_TURNS[reviewTurn].opts.map(o => (
                <Btn key={o} onClick={() => reviewReply(o)} ghost color={REVIEW_TURNS[reviewTurn].core ? "#78FF9E" : "#6EB6FF"}>{o}</Btn>
              ))}
              <Btn onClick={() => reviewReply("__rest")} ghost color="#5a5a5a">今日はもう休む</Btn>
            </React.Fragment>}
            {step === "review" && reviewTurn === 99 && <Btn onClick={reset} ghost color="#9C9C9C">↺ 翌日の待機へ</Btn>}
          </div>
          {step === "focus" && (
            <p style={{ width: 320, fontFamily: "var(--font-mono)", fontSize: 10, lineHeight: 1.7, letterSpacing: "0.04em", color: "#5a5a5a", margin: 0 }}>
              {working ? "作業中：完全静止・無音・減光、瞬きは閾下。LEDだけ低く満ちていく。" : "小休止：手が止まって少し待つと、呼吸と穏やかな瞬きがそっと戻る（ヒステリシス）。"}
            </p>
          )}
        </div>

        <Panel style={{ flex: 1, minWidth: 320, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: "#6a6a6a", textTransform: "uppercase" }}>EFFORT LOG</span>
            <Tag color="#5a5a5a">{VIS.label}</Tag>
          </div>
          <div style={{ padding: "6px 18px", minHeight: 150 }}>
            {log.map((l, i) => <LogLine key={i} t={l.t} dot={l.dot}>{l.txt}</LogLine>)}
          </div>

          {/* ⑤ review dialogue — the reward released here; user's own words → effort log → next-day nudge */}
          {step === "review" ? (
            <div style={{ borderTop: "1px solid #1a1a1a", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: "#78FF9E", textTransform: "uppercase" }}>REVIEW · 振り返り（対話 · 本日 3 度目の STT）</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {[["できたこと", "done"], ["大変だったこと", "hard"], ["明日の最初の一歩", "step"]].map(([label, key]) => (
                  <div key={key} style={{ display: "flex", flexDirection: "column", gap: 3, opacity: picks[key] ? 1 : 0.32 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: key === "step" ? "#78FF9E" : "#6a6a6a", textTransform: "uppercase" }}>{label}{key === "step" ? " ★" : ""}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#F7F3EA" }}>{picks[key] || "…聞いている"}</span>
                  </div>
                ))}
              </div>
              {voice && <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "#F7F3EA", margin: 0, borderTop: "1px solid #1a1a1a", paddingTop: 12 }}>「{voice}」</p>}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.06em", color: "#444", lineHeight: 1.6 }}>※ 文面は別途設計 · 口にした「明日の一歩」が努力ログ→翌日の声かけに効く</span>
            </div>
          ) : (
            <div style={{ marginTop: "auto", padding: "16px 18px", borderTop: "1px solid #1a1a1a", minHeight: 64, display: "flex", alignItems: "center" }}>
              {voice
                ? <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "#F7F3EA", margin: 0 }}>「{voice}」</p>
                : <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", color: "#5a5a5a", margin: 0 }}>{step === "focus" ? "— 集中している間は、話しかけない。ただ同席する。" : step === "idle" ? "— 予約済み。時間になれば、BUNCHIN から声をかける。" : "— BUNCHIN は必要な時だけ、短く話す。"}</p>}
            </div>
          )}
        </Panel>
      </div>
    </Section>
  );
}

export { DeviceDemo };
