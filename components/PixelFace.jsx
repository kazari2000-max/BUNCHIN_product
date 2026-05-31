"use client";
import React from "react";
// PixelFace.jsx — BUNCHIN's on-device companion face. PRODUCTION: round-dot LED face.
// ROUND dots (LED-matrix look). Eyes are ONE unified shape across all states — a small,
// wide-set HORIZONTAL ELLIPSE, low in the screen (anti-surveillance framing). State is
// conveyed by COLOR + brightness only. The SAVED/complete state keeps the old arch as a
// momentary "smile" (it arches briefly instead of a normal blink).
// Mouth appears ONLY while speaking and opens as RECTANGLES: bar → wide rectangle → square,
// in the same per-state colors as the eyes.
// Cell values: 3 = base · 2 = accent (different hue per state, not white).
// Accent per state: yellow→orange, blue→cyan, coral→pink, green→cyan.
// (The earlier soft-shaded style is preserved in PixelFaceSoft.jsx for comparison.)

const PF_ACCENT = { "#FFE45C": "#FF8A3D", "#6EB6FF": "#5CE6E0", "#FF7B66": "#FF5C9E", "#78FF9E": "#5CE0FF", "#FFC24D": "#FF8A3D" };

if (typeof document !== "undefined" && !document.getElementById("pf-anim")) {
  const s = document.createElement("style");
  s.id = "pf-anim";
  s.textContent = "@keyframes bunchin-sway{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.4px)}}";
  document.head.appendChild(s);
}

// Unified eye — horizontal ellipse (6 cols × 4 rows). Accent dot at (1,1).
const PF_EYE = {
  cols: 6, cells: [
    0,3,3,3,3,0,
    3,2,3,3,3,3,
    3,3,3,3,3,3,
    0,3,3,3,3,0,
  ],
};
const PF_BLINK = {
  cols: 6, cells: [
    0,0,0,0,0,0,
    0,0,0,0,0,0,
    3,3,3,3,3,3,
    0,0,0,0,0,0,
  ],
};
// Complete-state momentary smile (the original happy arch)
const PF_SMILE = {
  cols: 6, cells: [
    0,0,3,3,0,0,
    0,3,3,3,3,0,
    3,3,0,0,3,3,
    0,0,0,0,0,0,
  ],
};

const PF_STATES = {
  standby:  { color: "#FFE45C", dim: 1.0,  blinkEvery: 3400, gaze: true,  smile: false },
  ready:    { color: "#FFE45C", dim: 1.0,  blinkEvery: 5200, gaze: false, smile: false },
  focus:    { color: "#6EB6FF", dim: 0.72, blinkEvery: 6400, gaze: false, smile: false },
  recovery: { color: "#FF7B66", dim: 0.96, blinkEvery: 3000, gaze: true,  smile: false },
  complete: { color: "#78FF9E", dim: 1.0,  blinkEvery: 4200, gaze: false, smile: true  },
};

// Speak-only mouth — rectangles that open: bar → wide rectangle → square.
const PF_MOUTH = {
  bar:    { cols: 6, cells: [ 0,0,0,0,0,0,  3,3,3,3,3,3,  0,0,0,0,0,0 ] },
  rect:   { cols: 6, cells: [ 0,0,0,0,0,0,  3,3,3,3,3,3,  3,3,2,2,3,3 ] },
  square: { cols: 4, cells: [ 3,3,3,3,  3,2,2,3,  3,2,2,3,  3,3,3,3 ] },
};

function PFGrid({ cols, cells, px, gap, colorFn }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${px}px)`, gridAutoRows: `${px}px`, gap: `${gap}px` }}>
      {cells.map((v, i) => (
        <div key={i} style={{ width: px, height: px, borderRadius: "50%", background: colorFn(v) }} />
      ))}
    </div>
  );
}

function PixelFace({ state = "standby", speaking = false, px = 6, eyeGap = 74, color }) {
  const cfg = PF_STATES[state] || PF_STATES.standby;
  const base = color || cfg.color, accent = PF_ACCENT[base] || "#FF8A3D";
  const gap = Math.max(1, Math.round(px * 0.28));
  const [blinking, setBlinking] = React.useState(false);
  const [gazeX, setGazeX] = React.useState(0);
  const [mouthFrame, setMouthFrame] = React.useState("bar");
  const [twinkle, setTwinkle] = React.useState(false);

  // blink (or, for complete, momentary smile)
  React.useEffect(() => {
    let t1, t2, alive = true;
    const loop = () => {
      const jitter = cfg.blinkEvery * (0.7 + Math.random() * 0.6);
      t1 = setTimeout(() => {
        if (!alive) return;
        setBlinking(true);
        t2 = setTimeout(() => { if (alive) { setBlinking(false); loop(); } }, cfg.smile ? 460 : 110);
      }, jitter);
    };
    loop();
    return () => { alive = false; clearTimeout(t1); clearTimeout(t2); };
  }, [state, cfg.blinkEvery, cfg.smile]);

  // accent twinkle — off-hue catchlight briefly brightens
  React.useEffect(() => {
    let t1, t2, alive = true;
    const loop = () => {
      const wait = 3800 + Math.random() * 3800;
      t1 = setTimeout(() => { if (!alive) return; setTwinkle(true); t2 = setTimeout(() => { if (alive) { setTwinkle(false); loop(); } }, 240); }, wait);
    };
    loop();
    return () => { alive = false; clearTimeout(t1); clearTimeout(t2); };
  }, [state]);

  React.useEffect(() => {
    if (!cfg.gaze) { setGazeX(0); return; }
    let alive = true;
    const loop = () => { const t = setTimeout(() => { if (!alive) return; setGazeX([-1, 0, 1, 0][Math.floor(Math.random() * 4)] * Math.max(2, px * 0.5)); loop(); }, 2200 + Math.random() * 2400); return t; };
    const t = loop();
    return () => { alive = false; clearTimeout(t); };
  }, [state, cfg.gaze, px]);

  // lip-sync — only while speaking; rectangles open bar → rect → square
  React.useEffect(() => {
    if (!speaking) { setMouthFrame("bar"); return; }
    const frames = ["bar", "rect", "square", "rect", "bar", "rect", "square", "square", "rect"];
    let alive = true, i = 0;
    const loop = () => { const t = setTimeout(() => { if (!alive) return; i++; setMouthFrame(frames[i % frames.length]); loop(); }, 110 + Math.random() * 110); return t; };
    const t = loop();
    return () => { alive = false; clearTimeout(t); };
  }, [speaking]);

  const eyeShape = blinking ? (cfg.smile ? PF_SMILE : PF_BLINK) : PF_EYE;
  const accentNow = twinkle ? "#FFFFFF" : accent;
  const colorFn = v => v === 3 ? base : v === 2 ? accentNow : "transparent";
  const mouthPx = px;
  const mouthGap = Math.max(1, Math.round(mouthPx * 0.28));
  const mouth = PF_MOUTH[mouthFrame];
  const eye = <PFGrid cols={PF_EYE.cols} cells={eyeShape.cells} px={px} gap={gap} colorFn={colorFn} />;
  // reserve a fixed mouth slot (tallest = square, 4 rows) so eyes never shift
  const mouthSlot = (4 * mouthPx) + (3 * mouthGap);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: cfg.dim, marginTop: px * 6 }}>
      <div style={{ animation: "bunchin-sway 4.6s ease-in-out infinite", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", gap: eyeGap, transform: `translateX(${gazeX}px)`, transition: "transform 900ms ease" }}>
          {eye}{eye}
        </div>
        <div style={{ height: mouthSlot, marginTop: px * 3.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {speaking && <PFGrid cols={mouth.cols} cells={mouth.cells} px={mouthPx} gap={mouthGap} colorFn={colorFn} />}
        </div>
      </div>
    </div>
  );
}

export { PixelFace, PF_STATES, PF_EYE, PF_ACCENT };
