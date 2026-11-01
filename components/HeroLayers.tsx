// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './kinetic.css';
import './herolayers.css';

const IMG = '/images/hero/';

/* Layered image intro (studio -> speaker -> trackpad -> click -> Logic browsers) with the BCD / BROWSE. / CLICK. / DONE. type on top.
   Ported from the approved "Hero layers test" page. Images use the Web Animations API, the type uses a GSAP timeline. */
const HeroLayers: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = rootRef.current, frame = frameRef.current, cue = cueRef.current;
    if (!root || !frame || !cue) return;
    let dead = false, gone = false, anims = [], OFF = 0, LT = 0, ktl = null, rz = 0;
    const K = 1, LOOP_AT = 16.2, LOOP_FROM = 2.25;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator.connection && navigator.connection.saveData);
    const SH = [
      { n: 'studio_wideshot_empty', t: 0, d: 2.5, f: .45, s0: 1.0, s1: 1.12, o: '50% 62%', e: 'linear' },
      { n: 'studio_wideshot', t: .7, d: 1.6, f: .25, s0: 1.03, s1: 1.11, o: '50% 62%', e: 'linear' },
      { n: 'speaker_in', t: 2.3, d: .18, f: .03, s0: 1.0, s1: 1.0312, o: '50% 50%', e: 'linear' },
      { n: 'speaker_out', t: 2.48, d: .18, f: .03, s0: 1.0072, s1: 1.0384, o: '50% 50%', e: 'linear' },
      { n: 'speaker_in', t: 2.66, d: .18, f: .03, s0: 1.0144, s1: 1.0456, o: '50% 50%', e: 'linear' },
      { n: 'speaker_out', t: 2.84, d: .18, f: .03, s0: 1.0216, s1: 1.0528, o: '50% 50%', e: 'linear' },
      { n: 'speaker_in', t: 3.02, d: .18, f: .03, s0: 1.0288, s1: 1.06, o: '50% 50%', e: 'linear' },
      { n: 'hand_trackpad_01', t: 3.2, d: .2, f: .1, s0: 1.0, s1: 1.032, o: '70% 60%', e: 'linear' },
      { n: 'hand_trackpad_02', t: 3.4, d: .4, f: .4, s0: 1.008, s1: 1.056, o: '70% 60%', e: 'linear' },
      { n: 'hand_trackpad_01', t: 4.05, d: .1, f: .35, s0: 1.034, s1: 1.062, o: '70% 60%', e: 'linear' },
      { n: 'click_fizz_01', t: 4.45, d: .5, f: .04, s0: 1.0, s1: 1.1, o: '50% 50%' },
      { n: 'gradient01', t: 5.1, d: 9, f: 1.1, s0: 1.0, s1: 1.04, o: '50% 50%', e: 'linear' }
    ];
    const an = (el, kf, o) => { const a = el.animate(kf, Object.assign({ fill: 'both', easing: 'cubic-bezier(.3,.6,.2,1)' }, o)); anims.push(a); return a; };
    const T = (t) => t / K * 1000;

    function kinetic(sq, kw, scrim, mobile, fw, fh) {
      if (ktl) { ktl.kill(); ktl = null; }
      const WORDS = ['BCD', 'BROWSE.', 'CLICK.', 'DONE.'], FAMILY = 'Archivo', CFG = { cond: 62, wide: 125 };
      const BASE = [1.15, 2.3, 3.0, 4.05];
      const SPEC = [{ fin: { w: 900, wd: CFG.wide }, from: { w: 100, wd: CFG.cond }, dir: 'up' }, { fin: { w: 400, wd: CFG.cond }, from: { w: 100, wd: CFG.cond }, dir: 'right' }, { fin: { w: 800, wd: CFG.wide }, from: { w: 100, wd: CFG.wide }, dir: 'left' }, { fin: { w: 900, wd: CFG.cond }, from: { w: 300, wd: CFG.cond }, dir: 'down' }];
      const side = mobile ? fw * .9 : Math.min(fh * .82, fw * .72); sq.style.width = side + 'px'; sq.style.height = side + 'px'; sq.innerHTML = '';
      const els = WORDS.map((t) => { const line = document.createElement('div'); line.className = 'hy-line' + (t === 'BCD' ? ' bcd' : ''); const mask = document.createElement('div'); mask.className = 'hy-mask'; const span = document.createElement('span'); span.textContent = t.replace('.', ''); mask.appendChild(span); line.appendChild(mask); sq.appendChild(line); return { line, mask, span }; });
      const axes = (el, v) => { el.style.fontVariationSettings = '"wght" ' + v.w.toFixed(1) + ', "wdth" ' + v.wd.toFixed(1); };
      let items = [], A = 0;
      (function measure() {
        const ctx = document.createElement('canvas').getContext('2d'); ctx.font = '100px "' + FAMILY + '"'; const m = ctx.measureText('H');
        const capA = m.actualBoundingBoxAscent / 100, fA = m.fontBoundingBoxAscent / 100, fD = m.fontBoundingBoxDescent / 100, capTop = (1 - (fA + fD)) / 2 + fA - capA;
        A = sq.clientWidth * .9; const PROBE = 400, bleed = .05;
        items = els.map((e, i) => {
          e.line.style.fontFamily = '"' + FAMILY + '", sans-serif'; e.line.style.fontSize = PROBE + 'px'; axes(e.span, SPEC[i].fin);
          e.mask.style.padding = '0'; e.mask.style.height = 'auto'; e.span.style.margin = '0';
          const natural = e.line.offsetWidth, fs = PROBE * A / natural, capH = fs * capA;
          e.line.style.fontSize = fs + 'px'; e.line.style.height = capH + 'px';
          e.mask.style.height = (capH + fs * bleed * 2) + 'px'; e.mask.style.top = (-fs * bleed) + 'px'; e.mask.style.padding = '0 ' + (fs * bleed) + 'px';
          e.span.style.marginTop = (fs * bleed - fs * capTop) + 'px';
          return { fs, capH };
        });
      })();
      function layoutRows(rows) {
        const gapY = A * .04, gapX = A * .05;
        const geo = rows.map((r) => { const mm = r.length, rs = Math.min(1, (A - gapX * (mm - 1)) / (mm * A)); return { r, m: mm, rs, h: Math.max.apply(null, r.map((i) => items[i].capH * rs)) }; });
        const H = geo.reduce((a, g) => a + g.h, 0) + gapY * (geo.length - 1);
        const k = Math.min(1, sq.clientHeight * .9 / H); let y = (sq.clientHeight - H * k) / 2; const out = {};
        geo.forEach((g) => { const w = A * g.rs * k, rowW = g.m * w + gapX * k * (g.m - 1); let x = -rowW / 2;
          g.r.forEach((i) => { out[i] = { s: g.rs * k, x: x + w / 2, y: y + (g.h - items[i].capH * g.rs) * k }; x += w + gapX * k; });
          y += (g.h + gapY) * k; });
        return out;
      }
      const ROWS = [[0, 1], [2], [3]];
      const layout = (n) => layoutRows(ROWS.map((r) => r.filter((i) => i < n)).filter((r) => r.length));
      const inDur = 1.1, MOVE = .6, WAIT = .4;
      const tl = gsap.timeline({ paused: true }); ktl = tl;
      els.forEach((e) => { tl.set(e.line, { autoAlpha: 0, xPercent: -50 }, 0); });
      els.forEach((e, i) => {
        const t = BASE[i], te = t + (i ? (i === 1 ? .29 : WAIT) : 0), L = layout(i + 1), s = SPEC[i];
        tl.set(e.line, { x: L[i].x, y: L[i].y, scale: L[i].s }, t);
        for (let j = 0; j < i; j++) tl.to(els[j].line, { x: L[j].x, y: L[j].y, scale: L[j].s, duration: MOVE, ease: 'power3.inOut' }, t);
        tl.set(e.line, { autoAlpha: 1 }, te);
        const from = { xPercent: 0, yPercent: 0 };
        if (s.dir === 'up') from.yPercent = 100; if (s.dir === 'down') from.yPercent = -100; if (s.dir === 'left') from.xPercent = -100; if (s.dir === 'right') from.xPercent = 100;
        const f = (i === 1 ? .6 : i === 2 ? .8 : 1);
        tl.fromTo(e.span, from, { xPercent: 0, yPercent: 0, duration: inDur * .85 * f, ease: 'power4.out', immediateRender: false }, te);
        const pv = { w: s.from.w, wd: s.from.wd }; axes(e.span, pv);
        tl.fromTo(pv, { w: s.from.w, wd: s.from.wd }, { w: s.fin.w, wd: s.fin.wd, duration: inDur * f, ease: 'power3.out', immediateRender: false, onUpdate: () => axes(e.span, pv) }, te);
      });
      tl.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: .8, ease: 'power2.out', immediateRender: false }, BASE[0]);
      const LIFT = 5.9, top1 = mobile ? .115 : .135, sc1 = mobile ? .5 : .4;
      gsap.set(kw, { y: 0, scale: 1, transformOrigin: '50% 50%' });
      tl.to(kw, { y: -(.5 - top1) * fh, scale: sc1, duration: .9, ease: 'power3.inOut' }, LIFT);
      tl.to(scrim, { opacity: 0, duration: .6 }, LIFT);
      tl.timeScale(K);
      if (still) { tl.progress(1); } else tl.play(OFF);
      if (OFF > 0) els.forEach((e, i) => { const te = BASE[i] + (i ? (i === 1 ? .29 : WAIT) : 0), f = (i === 1 ? .6 : i === 2 ? .8 : 1); if (te + inDur * f <= OFF) axes(e.span, SPEC[i].fin); });
      if (still) els.forEach((e, i) => axes(e.span, SPEC[i].fin));
    }

    function build(off) {
      if (dead) return;
      OFF = (typeof off === 'number') ? off : 0; clearTimeout(LT);
      anims.forEach((a) => a.cancel()); anims = []; frame.innerHTML = '';
      const mobile = frame.clientWidth < 640;
      const pre = IMG + (mobile ? 'm_' : '');
      const el = (c, z) => { const e = document.createElement('div'); e.className = c; e.style.zIndex = z; frame.appendChild(e); return e; };
      SH.forEach((s, i) => { const d = document.createElement('div'); d.className = 'hshot'; d.style.zIndex = i + 1; d.style.transformOrigin = s.o;
        d.innerHTML = '<img alt="" decoding="async" src="' + pre + s.n + '.webp">'; frame.appendChild(d); s.el = d; });
      const dim = el('layer dim', 12), flash = el('layer flash', 15); el('layer vig', 16);
      const pan = el('layer panels', 12);
      const TG = [[.2197, .5748, .077, .0141], [.5, .4197, .109, .0334]];
      const RL = 0.1245836109260493, RT = 0.03726169844020797, RW = 0.7495003331112592, RH = 0.6256499133448874, AR = 1.300693240901213;
      const p = document.createElement('div'); p.className = 'panel';
      p.innerHTML = '<img class="lap" alt="" src="' + IMG + 'laptop.webp"><div class="scr" style="left:' + RL * 100 + '%;top:' + RT * 100 + '%;width:' + RW * 100 + '%;height:' + RH * 100 + '%">' +
        '<img alt="" src="' + IMG + 'scr_standard_menu.webp"><img class="loaded" alt="" src="' + IMG + 'scr_standard_loaded.webp">' +
        '<img class="loaded mm" alt="" src="' + IMG + 'scr_max_menu.webp"><img class="loaded ml" alt="" src="' + IMG + 'scr_max_loaded.webp">' +
        '<div class="hl"></div><div class="rip"></div><svg class="cur" viewBox="0 0 26 26"><path d="M3 2 L3 21 L8 16.5 L11.5 24 L15 22.5 L11.5 15.2 L18.5 15 Z" fill="#fff" stroke="#000" stroke-width="1.6" stroke-linejoin="round"/></svg></div>';
      pan.appendChild(p);
      const scrim = el('layer kscrim', 19);
      const kw = document.createElement('div'); kw.className = 'kw'; const sq = document.createElement('div'); sq.className = 'ksq'; kw.appendChild(sq); frame.appendChild(kw);
      el('layer scan', 30);
      const fw = frame.clientWidth, fh = frame.clientHeight;
      SH.forEach((s) => {
        an(s.el, [{ opacity: 0 }, { opacity: 1 }], { delay: T(s.t), duration: T(s.f), easing: 'linear' });
        an(s.el, [{ transform: 'scale(' + s.s0 + ')' }, { transform: 'scale(' + s.s1 + ')' }], { delay: T(s.t), duration: T(s.d + .6), easing: s.e || 'cubic-bezier(.25,.5,.35,1)' });
      });
      kinetic(sq, kw, scrim, mobile, fw, fh);
      an(flash, [{ opacity: 0 }, { opacity: .95, offset: .15 }, { opacity: 0 }], { delay: T(4.48), duration: T(.7), easing: 'linear' });
      an(dim, [{ opacity: 0 }, { opacity: .2 }], { delay: T(5.2), duration: T(.9), easing: 'linear' });
      const W = mobile ? fw * .94 : fw * .6, PH = W / AR;
      const rig = document.createElement('div'); rig.className = 'rig'; rig.style.cssText = 'left:' + ((fw - W) / 2) + 'px;top:' + (mobile ? fh * .42 : fh * .25) + 'px;width:' + W + 'px;height:' + PH + 'px;opacity:0';
      const rot = document.createElement('div'); rot.className = 'rot'; rot.style.cssText = 'left:0;top:0;width:100%;height:100%';
      p.style.cssText = 'width:' + W + 'px;left:0;top:0;opacity:1'; rot.appendChild(p); rig.appendChild(rot); pan.appendChild(rig);
      const ZL = mobile ? 150 : 220, fz = W * (mobile ? .045 : .026);
      const lbl = (txt, x, y, al) => { const d = document.createElement('div'); d.className = 'lbl'; d.innerHTML = 'PLUGIN LAUNCHER<br>' + txt;
        d.style.cssText = 'left:' + x * W + 'px;top:' + y * PH + 'px;font-size:' + fz + 'px;text-align:' + al + ';transform:translateZ(' + ZL + 'px);opacity:0'; rot.appendChild(d); return d; };
      const lS = lbl('STANDARD', mobile ? .09 : -.2, mobile ? -.32 : .1, mobile ? 'left' : 'right'), lM = lbl('MAX', mobile ? .91 : .925, mobile ? -.32 : .1, mobile ? 'right' : 'left');
      if (mobile) lM.style.transform = 'translateZ(' + ZL + 'px) translateX(-100%)';
      an(rig, [{ opacity: 0, transform: 'translateZ(-420px) translateY(40px)' }, { opacity: 1, transform: 'translateZ(0) translateY(0)' }], { delay: T(6.0), duration: T(1.1), easing: 'cubic-bezier(.2,.7,.2,1)' });
      const EA = 'cubic-bezier(.45,0,.55,1)';
      an(rot, [{ transform: 'rotateY(-5deg)', easing: EA }, { transform: 'rotateY(5deg)', easing: EA }, { transform: 'rotateY(-5deg)' }], { delay: T(6.0), duration: T(9), iterations: Infinity, easing: 'linear' });
      const cur = p.querySelector('.cur'), hl = p.querySelector('.hl'), rp = p.querySelector('.rip'), scr = p.querySelector('.scr');
      const sw = W * RW, sh = PH * RH;
      const imgs = p.querySelectorAll('.loaded'), sl = imgs[0], mm = imgs[1], ml = imgs[2];
      cur.style.display = hl.style.display = rp.style.display = 'none';
      const C = 200, CS = 6.9;
      const cyc = (e, list) => { const L = list.slice(); if (L[0][0] > 0) L.unshift([0, L[0][1]]); if (L[L.length - 1][0] < C) L.push([C, L[L.length - 1][1]]);
        const frames = L.map((x) => { const f = Object.assign({ offset: x[0] / C }, x[1]); if (x[2]) f.easing = x[2]; return f; });
        return an(e, frames, { delay: T(CS), duration: T(C), iterations: Infinity, easing: 'linear' }); };
      const B0 = 'brightness(1.8)', B1 = 'brightness(1)';
      const pass = (i, tc) => {
        const g = TG[i], tx = g[0] * sw, ty = g[1] * sh, hw = g[2] * sw, hh = Math.max(g[3] * sw, sh * .02);
        const h = hl.cloneNode(), r = rp.cloneNode(), c = cur.cloneNode(true);
        hl.parentNode.appendChild(h); rp.parentNode.appendChild(r); cur.parentNode.appendChild(c);
        h.style.display = r.style.display = c.style.display = ''; h.style.width = hw + 'px'; h.style.height = hh + 'px'; h.style.left = (tx - hw / 2) + 'px'; h.style.top = (ty - hh / 2) + 'px'; r.style.left = tx + 'px'; r.style.top = ty + 'px';
        const p0 = 'translate(' + (tx + sw * .28) + 'px,' + (ty + sh * .3) + 'px)', p1 = 'translate(' + (tx + sw * .22) + 'px,' + (ty + sh * .24) + 'px)', p2 = 'translate(' + tx + 'px,' + ty + 'px)', ck = tc + .98;
        cyc(c, [[tc, { opacity: 0, transform: p0 + ' scale(1)' }, 'cubic-bezier(.45,.05,.2,1)'], [tc + .14, { opacity: 1, transform: p1 + ' scale(1)' }, 'cubic-bezier(.45,.05,.2,1)'], [ck, { opacity: 1, transform: p2 + ' scale(1)' }, 'ease-out'], [ck + .09, { opacity: 1, transform: p2 + ' scale(.78)' }, 'ease-out'], [ck + .2, { opacity: 1, transform: p2 + ' scale(1)' }], [tc + 2.5, { opacity: 1, transform: p2 + ' scale(1)' }], [tc + 2.85, { opacity: 0, transform: p2 + ' scale(1)' }]]);
        cyc(h, [[ck, { opacity: 0 }], [ck + .22, { opacity: 1 }], [ck + .66, { opacity: .55 }], [ck + 1.1, { opacity: 0 }]]);
        cyc(r, [[ck - .01, { opacity: 0, transform: 'scale(.3)' }], [ck, { opacity: .9, transform: 'scale(.3)' }, 'ease-out'], [ck + .6, { opacity: 0, transform: 'scale(2.2)' }]]);
      };
      pass(0, .35); pass(1, 4.2);
      cyc(sl, [[2.3, { opacity: 0, filter: B0 }, 'ease-out'], [2.95, { opacity: 1, filter: B1 }]]);
      cyc(mm, [[3.7, { opacity: 0 }], [4.15, { opacity: 1 }]]);
      cyc(ml, [[6.15, { opacity: 0, filter: B0 }, 'ease-out'], [6.8, { opacity: 1, filter: B1 }]]);
      cyc(lS, [[0, { opacity: 0, filter: 'blur(6px)' }, 'ease-out'], [.5, { opacity: 1, filter: 'blur(0)' }], [3.4, { opacity: 1, filter: 'blur(0)' }], [3.8, { opacity: 0, filter: 'blur(0)' }]]);
      cyc(lM, [[3.8, { opacity: 0, filter: 'blur(6px)' }, 'ease-out'], [4.3, { opacity: 1, filter: 'blur(0)' }]]);
      const bk = el('layer blk', 45); bk.style.cssText += ';background:#000;opacity:0;pointer-events:none';
      if (still) {
        anims.forEach((a) => { a.currentTime = T(14); a.pause(); });
        gsap.to(cue, { autoAlpha: 0.85, duration: .9, delay: .5 });
        return;
      }
      an(bk, [{ opacity: 0 }, { opacity: 1 }], { delay: T(LOOP_AT - .45), duration: T(.45), easing: 'linear' });
      if (OFF > 0) an(bk, [{ opacity: 1 }, { opacity: 0 }], { delay: T(OFF), duration: T(.35), easing: 'linear' });
      anims.forEach((a) => { a.currentTime = T(OFF); });
      LT = window.setTimeout(() => build(LOOP_FROM), T(LOOP_AT - OFF));
      if (OFF === 0) { gsap.killTweensOf(cue); gsap.set(cue, { autoAlpha: 0 }); gsap.to(cue, { autoAlpha: 0.85, duration: .9, delay: 7.5, ease: 'power1.out' }); }
    }

    const start = () => { if (!dead && !gone) build(0); };
    (document.fonts && document.fonts.load ? document.fonts.load('900 100px "Archivo"').catch(() => {}) : Promise.resolve()).then(start);
    const onResize = () => { clearTimeout(rz); rz = window.setTimeout(() => { if (!gone) build(0); }, 250); };
    window.addEventListener('resize', onResize);
    const stop = () => { clearTimeout(LT); anims.forEach((a) => a.pause()); if (ktl) ktl.pause(); };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.intersectionRatio < 0.05) { if (!gone) { gone = true; stop(); } }
      else if (gone && e.intersectionRatio > 0.5) { gone = false; build(0); }
    }), { threshold: [0, 0.05, 0.5, 1] });
    io.observe(root);

    return () => {
      dead = true; clearTimeout(LT); clearTimeout(rz);
      window.removeEventListener('resize', onResize);
      io.disconnect();
      anims.forEach((a) => a.cancel()); anims = [];
      if (ktl) ktl.kill();
      gsap.killTweensOf(cue);
    };
  }, []);

  const handleScrollDown = () => {
    gsap.to(window, { duration: 1, scrollTo: { y: '#panel-2-features', autoKill: true }, ease: 'power2.inOut' });
  };

  return (
    <section id="panel-1-hero" ref={rootRef} className="hy-hero">
      <div className="hy-frame" ref={frameRef} />
      <button className="hy-down" ref={cueRef} onClick={handleScrollDown}>
        <span>Scroll down</span>
      </button>
    </section>
  );
};

export default HeroLayers;
