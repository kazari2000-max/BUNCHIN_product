// pp-foundation.jsx — shared primitives + sound system for the BUNCHIN product page.

// ---- Sound system ----------------------------------------------------------
// 3 demo SE: tap_start, session_start, complete. First play happens on a user
// gesture (the device tap), satisfying autoplay policies. Global mute toggle.
const BunchinSound = (() => {
  const SRC = {
    tap_start: "/audio/tap_start.wav",
    session_start: "/audio/session_start.wav",
    recovery: "/audio/recovery.wav",
    complete: "/audio/complete.wav",
  };
  const cache = {};
  let muted = false;
  function get(key) {
    if (!cache[key]) { const a = new Audio(SRC[key]); a.preload = "auto"; cache[key] = a; }
    return cache[key];
  }
  return {
    preload() { Object.keys(SRC).forEach(get); },
    play(key) {
      if (muted || !SRC[key]) return;
      const a = get(key);
      try { a.currentTime = 0; a.play().catch(() => {}); } catch (e) {}
    },
    setMuted(m) { muted = m; },
    isMuted() { return muted; },
  };
})();

// ---- Layout primitives -----------------------------------------------------
function Section({ id, label, children, style }) {
  return (
    <section data-screen-label={label} id={id} style={{ borderTop: "1px solid #1a1a1a", padding: "72px 44px", ...style }}>
      {children}
    </section>
  );
}

function SectionHead({ n, en, ja, sub }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: 16, letterSpacing: "0.06em", color: "#6EB6FF" }}>{n}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.22em", color: "#6a6a6a", textTransform: "uppercase" }}>{en}</span>
      </div>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(26px,3.2vw,38px)", lineHeight: 1.12, color: "#F7F3EA", margin: 0, letterSpacing: "-0.005em" }}>{ja}</h2>
      {sub && <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#9C9C9C", margin: "2px 0 0", maxWidth: 620 }}>{sub}</p>}
    </div>
  );
}

function Tag({ color = "#6a6a6a", children, filled }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
      color: filled ? "#050505" : color, background: filled ? color : "transparent",
      border: filled ? "none" : `1px solid ${color}`, padding: "5px 10px",
    }}>{children}</span>
  );
}

// numbered/ruled panel
function Panel({ children, style }) {
  return <div style={{ background: "#0D0D0D", border: "1px solid #262626", ...style }}>{children}</div>;
}

export { BunchinSound, Section, SectionHead, Tag, Panel };
