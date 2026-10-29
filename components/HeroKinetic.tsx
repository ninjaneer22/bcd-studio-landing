// @ts-nocheck
// Kinetic-type hero. Ported from bcd_website_new/bcd-page-cube-text.html (29 Sep experiment).
// The test panel (font / duration / tint / blur controls) is removed; its chosen defaults are baked in below.
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './kinetic.css';

const WORDS = ["BCD", "BROWSE.", "CLICK.", "DONE."];
const FAMILY = "Archivo";
const CFG = { cond: 62, wide: 125 };      // Archivo width-axis range
const TOTAL = 3.6;                        // seconds for the words to arrive
const BLUR_PX = 10;                       // backdrop blur while the words are on screen
const PLAYS = 1;                          // the sequence plays this many times, then stops
const START_DELAY = 1;                    // seconds the splash image shows on its own before the text starts

const SPEC = (c) => [
  { fin: { w: 900, wd: c.wide }, from: { w: 100, wd: c.cond }, dir: "up" },     // BCD: wide + heavy
  { fin: { w: 400, wd: c.cond }, from: { w: 100, wd: c.cond }, dir: "right" },  // BROWSE.: tall + condensed
  { fin: { w: 800, wd: c.wide }, from: { w: 100, wd: c.wide }, dir: "left" },   // CLICK.: wide, thin -> thick
  { fin: { w: 900, wd: c.cond }, from: { w: 300, wd: c.cond }, dir: "down" },   // DONE.: tall + heavy
];

const HeroKinetic: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const sqRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const cueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = rootRef.current, sq = sqRef.current, bg = bgRef.current, vid = vidRef.current, cue = cueRef.current;
    if (!root || !sq || !bg || !vid || !cue) return;

    const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SAVE = !!(navigator as any).connection?.saveData;
    let dead = false;

    /* background movie: the poster is the CSS background; the movie fades in once playing */
    if (!REDUCED && !SAVE) {
      vid.src = "/images/movies/bcd_hero.mp4";
      vid.addEventListener("playing", () => vid.classList.add("on"), { once: true });
      vid.play().catch(() => {});
    }

    const els = WORDS.map((t) => {
      const line = document.createElement("div");
      line.className = "kh-line" + (t === "BCD" ? " bcd" : "");
      const mask = document.createElement("div"); mask.className = "kh-mask";
      const span = document.createElement("span"); span.textContent = t.replace(".", "");
      mask.appendChild(span); line.appendChild(mask); sq.appendChild(line);
      return { line, mask, span };
    });

    let items = [], spec = [], A = 0, tl, startCall;
    const axes = (el, v) => (el.style.fontVariationSettings = `"wght" ${v.w.toFixed(1)}, "wdth" ${v.wd.toFixed(1)}`);

    function measure() {
      spec = SPEC(CFG);
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.font = `100px "${FAMILY}"`;
      const m = ctx.measureText("H");
      const capA = m.actualBoundingBoxAscent / 100;
      const fA = m.fontBoundingBoxAscent / 100, fD = m.fontBoundingBoxDescent / 100;
      const capTop = (1 - (fA + fD)) / 2 + fA - capA;

      const W = sq.clientWidth;
      A = W * 0.9;
      const PROBE = 400, bleed = 0.05;

      items = els.map((e, i) => {
        e.line.style.fontFamily = `"${FAMILY}", sans-serif`;
        e.line.style.fontSize = PROBE + "px";
        axes(e.span, spec[i].fin);
        e.mask.style.padding = "0";
        e.mask.style.height = "auto";
        e.span.style.margin = "0";
        const natural = e.line.offsetWidth;
        const fs = PROBE * A / natural;
        const capH = fs * capA;
        e.line.style.fontSize = fs + "px";
        e.line.style.height = capH + "px";
        e.mask.style.height = capH + fs * bleed * 2 + "px";
        e.mask.style.top = -fs * bleed + "px";
        e.mask.style.padding = `0 ${fs * bleed}px`;
        e.span.style.marginTop = (fs * bleed - fs * capTop) + "px";
        return { fs, capH };
      });
      makeStretch(CFG);
    }

    function layoutRows(rows, stretch = {}) {
      const gapY = A * 0.04, gapX = A * 0.05;
      const geo = rows.map((r) => {
        const m = r.length, rs = Math.min(1, (A - gapX * (m - 1)) / (m * A));
        return { r, m, rs, h: Math.max(...r.map((i) => items[i].capH * rs * (stretch[i] || 1))) };
      });
      const H = geo.reduce((a, g) => a + g.h, 0) + gapY * (geo.length - 1);
      const k = Math.min(1, sq.clientHeight * 0.9 / H);
      let y = (sq.clientHeight - H * k) / 2;
      const out = {};
      geo.forEach((g) => {
        const w = A * g.rs * k, rowW = g.m * w + gapX * k * (g.m - 1);
        let x = -rowW / 2;
        g.r.forEach((i) => {
          const st = stretch[i] || 1;
          out[i] = { s: g.rs * k * st, x: x + w / 2, y: y + (g.h - items[i].capH * g.rs * st) * k };
          x += w + gapX * k;
        });
        y += (g.h + gapY) * k;
      });
      return out;
    }

    const ROWS = [[0, 1], [2], [3]];
    const layout = (n) => layoutRows(ROWS.map((r) => r.filter((i) => i < n)).filter((r) => r.length));

    let stretchFor = () => ({ wd: 100, r: 1 });
    function makeStretch(cfg) {
      stretchFor = (target) => {
        const e = els[0], fin = spec[0].fin;
        const pad = items[0].fs * 0.1;
        let lo = cfg.cond, hi = fin.wd;
        for (let n = 0; n < 16; n++) {
          const mid = (lo + hi) / 2;
          axes(e.span, { w: fin.w, wd: mid });
          if (e.line.offsetWidth - pad > A / target) hi = mid; else lo = mid;
        }
        const wd = (lo + hi) / 2;
        axes(e.span, { w: fin.w, wd });
        const r = A / (e.line.offsetWidth - pad);
        axes(e.span, fin);
        return { wd, r };
      };
    }

    function build(delay = 0.4) {
      if (dead) return;
      if (tl) tl.kill();
      if (startCall) startCall.kill();
      gsap.killTweensOf([bg, cue]);
      gsap.set(cue, { autoAlpha: 0 });
      gsap.set(bg, { filter: "blur(0px) brightness(.9)", scale: 1 });   // splash shows sharp until the text starts
      gsap.set(els.map((e) => e.line), { autoAlpha: 0 });
      gsap.set(els.map((e) => e.span), { xPercent: 0, yPercent: 0 });
      els.forEach((e, i) => (e.span.textContent = WORDS[i].replace(".", "")));
      measure();
      const total = TOTAL;
      const inDur = Math.min(1.1, total / 3.2);
      const MOVE = 0.6, WAIT = 0.4;
      const step = (total - inDur - WAIT) / (WORDS.length - 1);
      // when the last play ends: the backdrop sharpens and the scroll cue fades in
      const finish = () => {
        gsap.to(bg, { filter: "blur(0px) brightness(.9)", scale: 1, duration: 1.4, ease: "power2.out" });
        gsap.to(cue, { autoAlpha: 0.85, duration: 0.9, delay: 0.5, ease: "power1.out" });
      };
      tl = gsap.timeline({ repeat: PLAYS - 1, repeatDelay: 0.5, paused: true, onComplete: finish });

      els.forEach((e) => tl.set(e.line, { autoAlpha: 0, xPercent: -50 }, 0));
      const BLUR = () => `blur(${BLUR_PX}px) brightness(.68)`;
      tl.to(bg, { filter: BLUR(), scale: 1.04, duration: 0.7, ease: "power2.out" }, 0);   // blurs as the text starts, stays blurred while it is on screen

      els.forEach((e, i) => {
        const t = i * step, te = t + (i ? (i === 1 ? 0.29 : WAIT) : 0), L = layout(i + 1), s = spec[i];
        tl.set(e.line, { x: L[i].x, y: L[i].y, scale: L[i].s }, t);
        for (let j = 0; j < i; j++)
          tl.to(els[j].line, { x: L[j].x, y: L[j].y, scale: L[j].s, duration: MOVE, ease: "power3.inOut" }, t);

        tl.set(e.line, { autoAlpha: 1 }, te);
        const from = { xPercent: 0, yPercent: 0 };
        if (s.dir === "up") from.yPercent = 100;
        if (s.dir === "down") from.yPercent = -100;
        if (s.dir === "left") from.xPercent = -100;
        if (s.dir === "right") from.xPercent = 100;
        tl.fromTo(e.span, from, { xPercent: 0, yPercent: 0, duration: inDur * 0.85 * (i === 1 ? 0.6 : i === 2 ? 0.8 : 1), ease: "power4.out", immediateRender: false }, te);

        const pv = { ...s.from };
        axes(e.span, pv);
        tl.fromTo(pv, { w: s.from.w, wd: s.from.wd },
          { w: s.fin.w, wd: s.fin.wd, duration: inDur * (i === 1 ? 0.6 : i === 2 ? 0.8 : 1), ease: "power3.out", immediateRender: false, onUpdate: () => axes(e.span, pv) }, te);
      });

      /* EXIT: hold, then BROWSE. -> CLICK. -> DONE. -> BCD */
      const HOLD = 0, T0 = 0;                       // shorter hold; the exit then plays at double speed
      const ex = gsap.timeline();
      const IO = "power3.inOut", IN = "power3.in";
      const fin0 = spec[0].fin;
      const gapY = A * 0.04;
      const st = stretchFor(1 + (items[2].capH + gapY) / items[0].capH);
      const L1 = layoutRows([[0], [2], [3]]);
      const L2 = layoutRows([[0], [3]], { 0: st.r });

      ex.to(els[1].span, { xPercent: 100, duration: 0.5, ease: IN }, T0);
      [0, 2, 3].forEach((j) => ex.to(els[j].line, { x: L1[j].x, y: L1[j].y, scale: L1[j].s, duration: 0.8, ease: IO }, T0 + 0.4));

      const T1 = T0 + 1.4;
      ex.to(els[2].span, { yPercent: 100, duration: 0.45, ease: IN }, T1);
      [0, 3].forEach((j) => ex.to(els[j].line, { x: L2[j].x, y: L2[j].y, scale: L2[j].s, duration: 0.8, ease: IO }, T1 + 0.25));
      const pvB = { wd: fin0.wd };
      ex.fromTo(pvB, { wd: fin0.wd }, { wd: st.wd, duration: 0.8, ease: IO, immediateRender: false,
        onUpdate: () => axes(els[0].span, { w: fin0.w, wd: pvB.wd }) }, T1 + 0.25);

      const T2 = T1 + 0.8;
      const bcdH = items[0].capH * L2[0].s;
      ex.to(els[3].line, { y: L2[0].y + bcdH * 0.3, duration: 0.93, ease: IN }, T2);
      ex.to(els[3].line, { autoAlpha: 0, duration: 0.2 }, T2 + 0.7);

      // just before the final BCD blinks out, relax it back towards its entry proportions, ending a touch (7.5%) taller than entry
      const L0 = layoutRows([[0]]);
      const TALL = 0.075, tt = Math.min(1, TALL / Math.max(0.001, st.r - 1));
      const wdEnd = fin0.wd + tt * (st.wd - fin0.wd);
      const pvC = { wd: st.wd };
      ex.to(els[0].line, { x: L0[0].x, y: L0[0].y - items[0].capH * L0[0].s * TALL / 2, scale: L0[0].s * (1 + TALL), duration: 0.6, ease: IO }, T2 + 0.5);
      ex.fromTo(pvC, { wd: st.wd }, { wd: wdEnd, duration: 0.6, ease: IO, immediateRender: false,
        onUpdate: () => axes(els[0].span, { w: fin0.w, wd: pvC.wd }) }, T2 + 0.5);

      const T3 = T2 + 1.4;
      // final BCD: rapid four-blink burst, then gone (replaces the mask-out)
      const P = 0.12;
      for (let k = 0; k < 4; k++) {
        ex.set(els[0].line, { autoAlpha: 0 }, T3 + k * P);
        ex.set(els[0].line, { autoAlpha: 1 }, T3 + k * P + P / 2);
      }
      ex.set(els[0].line, { autoAlpha: 0 }, T3 + 4 * P);

      ex.to({}, { duration: 0.47 }, T3 + 0.53);
      tl.add(ex.timeScale(2), total + 0.4 + HOLD);

      if (REDUCED) { tl.pause(); tl.time(total + 0.4); gsap.set(cue, { autoAlpha: 0.85 }); return; }
      startCall = gsap.delayedCall(delay, () => tl.play(0));
    }

    let rz;
    const onResize = () => { clearTimeout(rz); rz = setTimeout(build, 200); };
    window.addEventListener("resize", onResize);

    document.fonts.load(`400 100px "${FAMILY}"`).catch(() => {}).finally(() => document.fonts.ready.then(() => build(START_DELAY)));

    /* pause the movie while off-screen; replay the type animation when the visitor scrolls back up */
    let gone = false;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.intersectionRatio < 0.05) { gone = true; if (vid.src) vid.pause(); }
      else if (gone && e.intersectionRatio > 0.6) { gone = false; if (vid.src) vid.play().catch(() => {}); build(); }
      else if (!gone && vid.src && vid.paused) vid.play().catch(() => {});
    }), { threshold: [0, 0.05, 0.6, 1] });
    io.observe(root);

    return () => {
      dead = true;
      clearTimeout(rz);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      if (tl) tl.kill();
      if (startCall) startCall.kill();
      els.forEach((e) => e.line.remove());
    };
  }, []);

  const handleScrollDown = () => {
    gsap.to(window, { duration: 1, scrollTo: { y: "#panel-2-features", autoKill: true }, ease: "power2.inOut" });
  };

  return (
    <section id="panel-1-hero" ref={rootRef} className="kh-hero">
      <div className="kh-bg" ref={bgRef}>
        <video ref={vidRef} muted loop playsInline preload="auto" aria-hidden="true" />
      </div>
      <div className="kh-scrim" />
      <div className="kh-wrap">
        <div className="kh-sq" ref={sqRef} />
      </div>
      <button className="kh-down" ref={cueRef} onClick={handleScrollDown}>
        <span>Scroll down</span>
      </button>
    </section>
  );
};

export default HeroKinetic;
