"use client";
import Image from "next/image";
import React from "react";
import { BunchinSound } from "./ui";
// pp-hero.jsx — top bar (with global sound toggle), hero, product visual.

function SoundToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => {
    const next = !on;
    setOn(next);
    BunchinSound.setMuted(!next);
    if (next) { BunchinSound.preload(); BunchinSound.play("tap_start"); } // first gesture
  };
  return (
    <button onClick={toggle} title="デモ音のON/OFF" style={{
      appearance: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
      background: "transparent", border: `1px solid ${on ? "#78FF9E" : "#262626"}`, padding: "7px 12px",
    }}>
      <span style={{ width: 8, height: 8, background: on ? "#78FF9E" : "#3a3a3a" }} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: on ? "#78FF9E" : "#6a6a6a", textTransform: "uppercase" }}>
        SOUND {on ? "ON" : "OFF"}
      </span>
    </button>
  );
}

function TopBar() {
  const link = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", color: "#9C9C9C", textTransform: "uppercase", textDecoration: "none", cursor: "pointer" };
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 44px", borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, background: "rgba(5,5,5,0.92)", backdropFilter: "blur(6px)", zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: 22, letterSpacing: "0.04em", color: "#F7F3EA" }}>BUNCHIN</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: "#5a5a5a" }}>BN-01</span>
      </div>
      <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
        <a style={link} href="#product">PRODUCT</a>
        <a style={link} href="#plan">PLAN</a>
        <a style={link} href="#beta">BETA</a>
        <SoundToggle />
      </div>
    </div>
  );
}

// product visual for the hero
function HeroDevice() {
  return (
    <figure style={{ width: "clamp(280px, 33vw, 430px)", margin: 0, flex: "0 1 430px", position: "relative", transform: "translateY(64px)" }}>
      <Image
        src="/image/BUNCHIN_robo.png"
        alt="BUNCHIN BN-01 desktop companion robot"
        width="1280"
        height="1280"
        priority
        sizes="(max-width: 760px) 78vw, 33vw"
        unoptimized
        decoding="async"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 18px 36px rgba(0,0,0,0.55))",
        }}
      />
    </figure>
  );
}

function Hero() {
  return (
    <section data-screen-label="Hero" style={{ minHeight: "52vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 44px 56px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%", backgroundImage: "linear-gradient(#0d0d0d 1px, transparent 1px), linear-gradient(90deg, #0d0d0d 1px, transparent 1px)", backgroundSize: "46px 46px", opacity: 0.5, maskImage: "linear-gradient(#000, transparent)", WebkitMaskImage: "linear-gradient(#000, transparent)" }} />
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48, flexWrap: "wrap", position: "relative" }}>
        <div style={{ maxWidth: 660, flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "#6EB6FF", textTransform: "uppercase" }}>Desk Anchor Robot · 卓上AI同席ロボット</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.16, color: "#F7F3EA", margin: "20px 0 0", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>未来のわたしが<br/>机の上にいる。</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.8, color: "#9C9C9C", maxWidth: 480, margin: "26px 0 0" }}>机の上のAIが、あなたの努力時間に同席する。<br/>スマホから手を放し、机に戻るための物理アンカー。</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "#5a5a5a", margin: "20px 0 0" }}>FOR PARTNERS & BUILDERS · 事業協力者・開発メンバー向け概観</p>
        </div>
        <HeroDevice />
      </div>
    </section>
  );
}

export { TopBar, Hero, HeroDevice, SoundToggle };
