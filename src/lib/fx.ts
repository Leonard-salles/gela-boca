"use client";

// Motor de animação da loja — GSAP + ScrollTrigger + Flip + Lenis.
// Porte 1:1 do motor original (fx.js) do protótipo Loja.dc.html, adaptado para
// rodar como módulo ES dentro de um componente cliente do Next.js em vez de
// scripts globais via CDN.
// Tokens de motion: durações 0.2 / 0.45 / 0.9s · easings expo.out / power3.inOut · stagger 0.04–0.08

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Lenis from "lenis";
import { faceOf } from "./cardFace";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

export const M = { fast: 0.2, base: 0.45, slow: 0.9, out: "expo.out", inOut: "power3.inOut" } as const;

const q = <T extends Element = Element>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const qa = <T extends Element = Element>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const RM = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export interface FxOptions {
  get: () => { preloader: string; revealTrigger: "hover" | "inView"; holo: number; smooth: boolean; cursor: boolean };
  onNav: (n: "inicio" | "produtos") => void;
  onHero: (n: number) => void;
  onIrisNav: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

interface CardCtl {
  id: string;
  item: HTMLElement;
  blocks: HTMLElement[];
  back: HTMLElement | null;
  sheen: HTMLElement | null;
  lift: HTMLElement | null;
  tilt: HTMLElement;
  holo: HTMLElement | null;
  glit: HTMLElement | null;
  glare: HTMLElement | null;
  tier: string | undefined;
  t: ReturnType<typeof setTimeout> | number;
  on?: boolean;
  holoOn?: boolean;
  tl: gsap.core.Timeline;
}

interface S {
  root: HTMLElement;
  o: FxOptions;
  cl: Array<() => void>;
  cards: WeakMap<HTMLElement, CardCtl>;
  ctx?: gsap.Context;
  lenis?: Lenis;
  raf?: (time: number) => void;
  cursorEl?: HTMLElement | null;
  hero?: Any;
  car?: Any;
  io?: IntersectionObserver;
  carReady?: boolean;
  dragging?: boolean;
  justDragged?: boolean;
  cdTimer?: ReturnType<typeof setInterval>;
  on: (el: EventTarget | null, ev: string, fn: Any, opt?: Any) => void;
}

function makeBall(size: number) {
  const b = document.createElement("div");
  b.style.cssText = `position:fixed;left:0;top:0;width:${size}px;height:${size}px;border-radius:50%;z-index:9998;pointer-events:none;background:linear-gradient(#e8392b 0 44%,#0a0b10 44% 56%,#f3f1ea 56%);box-shadow:0 0 0 1.5px #0a0b10,0 6px 18px rgba(0,0,0,.5)`;
  const c = document.createElement("div");
  c.style.cssText = `position:absolute;left:50%;top:50%;width:${size * 0.34}px;height:${size * 0.34}px;margin:-${size * 0.17}px 0 0 -${size * 0.17}px;border-radius:50%;background:#f3f1ea;box-shadow:0 0 0 ${Math.max(1.5, size * 0.07)}px #0a0b10`;
  b.appendChild(c);
  return b;
}

export function initFx(root: HTMLElement, o: FxOptions) {
  const S: S = { root, o, cl: [], cards: new WeakMap(), on: () => {} };
  S.on = (el, ev, fn, opt) => {
    if (!el) return;
    el.addEventListener(ev, fn, opt);
    S.cl.push(() => el.removeEventListener(ev, fn, opt));
  };
  S.ctx = gsap.context(() => {
    setupLenis(S);
    setupCursor(S);
    setupNav(S);
    setupProgress(S);
    setupButtons(S);
    setupMarquees(S);
    setupReveals(S);
    setupCategories(S);
    setupCarousel(S);
    setupLaunch(S);
    setupRip(S);
    setupCondition(S);
    setupCounters(S);
    setupFooter(S);
    setupIris(S);
    setupPlaceholders(S);
    setupHero(S);
  }, root);
  runPreloader(S, () => S.ctx!.add(() => heroIntro(S)));
  const imgs = qa<HTMLImageElement>("img", root).filter((i) => !i.complete);
  imgs.forEach((i) => S.on(i, "load", () => ScrollTrigger.refresh(), { once: true }));
  setTimeout(() => ScrollTrigger.refresh(), 300);

  return {
    destroy() {
      S.cl.forEach((f) => f());
      S.ctx!.revert();
      if (S.lenis) {
        gsap.ticker.remove(S.raf!);
        S.lenis.destroy();
      }
      clearInterval(S.cdTimer);
      document.documentElement.classList.remove("vault-cursor");
    },
    syncIndicators: () => syncIndicators(S),
    cardsOut: (cb: () => void) => cardsOut(S, cb),
    cardsIn: () => cardsIn(S),
    flipState: () => Flip.getState(qa("[data-grid-item]", root)),
    flipFrom: (st: Any) =>
      Flip.from(st, {
        duration: 0.6,
        ease: M.inOut,
        absolute: true,
        onEnter: (els: Any) => gsap.fromTo(els, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.5, ease: M.out }),
        onComplete: () => ScrollTrigger.refresh(),
      }),
    capture: (btn: HTMLElement, color: string, done: () => void) => capture(S, btn, color, done),
    badgePop: () => {
      const b = q("[data-cart-badge]", root);
      if (b) gsap.fromTo(b, { scale: 1.9 }, { scale: 1, duration: 0.7, ease: "elastic.out(1,.35)" });
    },
    lock: (v: boolean) => {
      if (S.lenis) v ? S.lenis.stop() : S.lenis.start();
      document.documentElement.style.overflow = v ? "hidden" : "";
    },
    menuIn: () => {
      const l = qa("[data-menu-li]", root);
      gsap.fromTo(l, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: M.out, stagger: 0.06, delay: 0.15 });
    },
    scrollTo: (sel: string) => scrollTo(S, sel),
    iris: (x: number, y: number, sel: string) => iris(S, x, y, sel),
    heroGo: (n: number) => S.hero && S.hero.go(n),
    setCursor: (v: boolean) => setCursorEnabled(S, v),
    onResize: () => {
      S.cards = new WeakMap();
      qa("[data-blocks]", root).forEach((b) => (b.innerHTML = ""));
      qa<HTMLElement>("[data-back]", root).forEach((b) => (b.style.opacity = "1"));
      S.car && S.car.measure();
      S.car && S.car.buildPosCache?.();
      syncIndicators(S);
      ScrollTrigger.refresh();
    },
  };
}

function scrollTo(S: S, target: string, immediate?: boolean) {
  const el = typeof target === "string" ? q(target, S.root) : target;
  const y = el ? el.getBoundingClientRect().top + window.scrollY : 0;
  if (S.lenis) S.lenis.scrollTo(y, { immediate: !!immediate, force: true, duration: 1.4 });
  else window.scrollTo({ top: y, behavior: immediate ? "instant" : "smooth" });
}

function setupLenis(S: S) {
  if (!S.o.get().smooth || RM()) return;
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  S.lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  S.raf = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(S.raf);
  gsap.ticker.lagSmoothing(0);
}

/* ---------------------------------- CURSOR ---------------------------------- */
function setCursorEnabled(S: S, v: boolean) {
  const cur = S.cursorEl;
  if (!cur) return;
  const on = v && FINE() && !RM();
  cur.style.display = on ? "block" : "none";
  document.documentElement.classList.toggle("vault-cursor", on);
}
function setupCursor(S: S) {
  const cur = q<HTMLElement>("[data-cursor-el]", S.root);
  if (!cur) return;
  S.cursorEl = cur;
  setCursorEnabled(S, S.o.get().cursor);
  const xTo = gsap.quickTo(cur, "x", { duration: 0.32, ease: "power3.out" });
  const yTo = gsap.quickTo(cur, "y", { duration: 0.32, ease: "power3.out" });
  const disk = q("[data-cursor-disk]", cur);
  const label = q("[data-cursor-label]", cur);
  const ball = q("[data-cursor-ball]", cur);
  let mode: string | null = null;
  const setMode = (m: string) => {
    if (m === mode) return;
    mode = m;
    if (m === "view" || m === "drag") {
      if (label) label.textContent = m === "view" ? "Ver" : "← Arraste →";
      gsap.to(disk, { scale: 1, opacity: 1, duration: M.base, ease: M.out });
      gsap.to(ball, { scale: 0, duration: M.fast });
    } else if (m === "magnet") {
      gsap.to(disk, { scale: 0, opacity: 0, duration: M.fast });
      gsap.to(ball, { scale: 1.9, duration: M.base, ease: M.out });
    } else if (m === "text") {
      gsap.to([disk, ball], { scale: 0, duration: M.fast });
    } else {
      gsap.to(disk, { scale: 0, opacity: 0, duration: M.fast });
      gsap.to(ball, { scale: 1, duration: M.base, ease: M.out });
    }
  };
  let rot = 0,
    lx = 0;
  S.on(window, "pointermove", (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    xTo(e.clientX);
    yTo(e.clientY);
    rot += (e.clientX - lx) * 1.6;
    lx = e.clientX;
    gsap.set(ball, { rotation: rot });
    const target = e.target as HTMLElement;
    const t = target.closest && target.closest<HTMLElement>("[data-cursor],[data-magnetic],input,textarea,select");
    if (!t) setMode("");
    else if (t.matches("input,textarea,select")) setMode("text");
    else if (t.dataset.cursor) setMode(t.dataset.cursor);
    else setMode("magnet");
  });
  S.on(document, "mouseleave", () => gsap.to(cur, { opacity: 0, duration: M.fast }));
  S.on(document, "mouseenter", () => gsap.to(cur, { opacity: 1, duration: M.fast }));
}

/* ---------------------------------- NAV ---------------------------------- */
function setupNav(S: S) {
  const nav = q<HTMLElement>("[data-nav]", S.root);
  const bar = q<HTMLElement>("[data-nav-bar]", S.root);
  if (!bar || !nav) return;
  let pill = false;
  const apply = (p: boolean) => {
    pill = p;
    const vw = nav.clientWidth;
    if (p) {
      gsap.set(bar, { backdropFilter: "blur(18px) saturate(1.4)", webkitBackdropFilter: "blur(18px) saturate(1.4)" } as Any);
      gsap.to(bar, { width: Math.min(860, vw - 24), y: 12, paddingTop: 8, paddingBottom: 8, paddingLeft: 18, paddingRight: 8, backgroundColor: "rgba(14,15,22,0.66)", borderColor: "rgba(255,255,255,0.12)", boxShadow: "0 12px 40px rgba(0,0,0,0.4)", duration: 0.7, ease: M.out, overwrite: true });
    } else {
      gsap.to(bar, { width: vw, y: 0, paddingTop: 20, paddingBottom: 20, paddingLeft: Math.max(16, Math.min(40, vw * 0.03)), paddingRight: Math.max(16, Math.min(40, vw * 0.03)), backgroundColor: "rgba(14,15,22,0)", borderColor: "rgba(255,255,255,0)", boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.6, ease: M.out, overwrite: true, onComplete: () => gsap.set(bar, { clearProps: "width,backdropFilter,webkitBackdropFilter" }) });
    }
  };
  ScrollTrigger.create({ start: 80, end: "max", onToggle: (s) => apply(s.isActive) });
  S.on(window, "resize", () => pill && apply(true));
  const cat = q("[data-zone-start]", S.root);
  const end = q("[data-zone-end]", S.root);
  if (cat && end) ScrollTrigger.create({ trigger: cat, endTrigger: end, start: "top 55%", end: "bottom 45%", onToggle: (s) => S.o.onNav(s.isActive ? "produtos" : "inicio") });
  syncIndicators(S);
}
function syncIndicators(S: S) {
  qa<HTMLElement>("[data-ind-group]", S.root).forEach((g) => {
    const ind = q<HTMLElement>("[data-ind-mark]", g);
    const act = q<HTMLElement>('[data-active="true"]', g);
    if (!ind) return;
    if (!act) {
      gsap.to(ind, { opacity: 0, duration: M.fast });
      return;
    }
    const gr = g.getBoundingClientRect();
    const ar = act.getBoundingClientRect();
    gsap.to(ind, { x: ar.left - gr.left, width: ar.width, opacity: 1, duration: 0.55, ease: M.out });
  });
}

function setupProgress(S: S) {
  const fill = q<HTMLElement>("[data-prog-fill]", S.root);
  const ball = q<HTMLElement>("[data-prog-ball]", S.root);
  if (!fill) return;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (s) => {
      const p = s.progress,
        w = window.innerWidth - 14;
      gsap.set(fill, { scaleX: p });
      gsap.set(ball, { x: p * w, rotation: ((p * w) / (Math.PI * 14)) * 360 });
    },
  });
}

/* ------------------------- botões: swap, liquid, magnético ------------------------- */
function setupButtons(S: S) {
  const root = S.root;
  S.on(root, "pointerover", (e: PointerEvent) => {
    const target = e.target as HTMLElement;
    const sw = target.closest<HTMLElement>("[data-swap]");
    if (sw && !sw.contains(e.relatedTarget as Node)) qa("[data-swap-col]", sw).forEach((c) => gsap.to(c, { yPercent: -50, duration: 0.5, ease: M.out, overwrite: true }));
    const lq = target.closest<HTMLElement>("[data-liquid]");
    if (lq && !lq.contains(e.relatedTarget as Node) && !RM()) {
      const fill = q<HTMLElement>("[data-liquid-fill]", lq);
      const arrow = q("[data-liquid-arrow]", lq);
      const s = (lq.offsetWidth * 2.3) / (fill ? fill.offsetWidth : 1);
      gsap.to(fill, { scale: s, duration: 0.65, ease: "power3.out", overwrite: true });
      gsap.fromTo(fill, { borderRadius: "50%" }, { borderRadius: "44% 56% 52% 48% / 55% 45% 55% 45%", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" });
      if (arrow) gsap.fromTo(arrow, { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: M.out });
    }
  });
  S.on(root, "pointerout", (e: PointerEvent) => {
    const target = e.target as HTMLElement;
    const sw = target.closest<HTMLElement>("[data-swap]");
    if (sw && !sw.contains(e.relatedTarget as Node)) qa("[data-swap-col]", sw).forEach((c) => gsap.to(c, { yPercent: 0, duration: 0.5, ease: M.out, overwrite: true }));
    const lq = target.closest<HTMLElement>("[data-liquid]");
    if (lq && !lq.contains(e.relatedTarget as Node)) gsap.to(q("[data-liquid-fill]", lq), { scale: 1, duration: 0.5, ease: M.inOut, overwrite: true });
    const mg = target.closest<HTMLElement>("[data-magnetic]");
    if (mg && !mg.contains(e.relatedTarget as Node)) gsap.to(mg, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,.4)" });
  });
  S.on(root, "pointermove", (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || RM()) return;
    const mg = (e.target as HTMLElement).closest<HTMLElement>("[data-magnetic]");
    if (!mg) return;
    const r = mg.getBoundingClientRect();
    gsap.to(mg, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: "power3.out" });
  });
  S.on(root, "pointerdown", (e: PointerEvent) => {
    const p = (e.target as HTMLElement).closest<HTMLElement>("[data-press],[data-liquid],[data-magnetic]");
    if (p) gsap.to(p, { scale: 0.97, duration: 0.12 });
  });
  const up = () => qa<HTMLElement>("[data-press],[data-liquid],[data-magnetic]", root).forEach((p) => gsap.getProperty(p, "scale") !== 1 && gsap.to(p, { scale: 1, duration: 0.3, ease: M.out }));
  S.on(window, "pointerup", up);
}

/* ---------------------------------- MARQUEES ---------------------------------- */
function setupMarquees(S: S) {
  const ms: gsap.core.Tween[] = [];
  qa<HTMLElement>("[data-marquee-track]", S.root).forEach((t) => {
    const right = t.dataset.dir === "right",
      dur = +(t.dataset.speed || 30);
    const tw = right ? gsap.fromTo(t, { xPercent: -50 }, { xPercent: 0, duration: dur, ease: "none", repeat: -1 }) : gsap.fromTo(t, { xPercent: 0 }, { xPercent: -50, duration: dur, ease: "none", repeat: -1 });
    if (RM()) tw.pause();
    ms.push(tw);
    const host = t.parentElement;
    if (t.dataset.hoverSlow) {
      S.on(host, "pointerenter", () => gsap.to(tw, { timeScale: 0.2, duration: 0.6 }));
      S.on(host, "pointerleave", () => gsap.to(tw, { timeScale: 1, duration: 0.6 }));
    }
  });
  if (RM()) return;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (s) => {
      const v = Math.min(Math.abs(s.getVelocity()) / 900, 3);
      if (v < 0.3) return;
      ms.forEach((m) => {
        if (m.timeScale() < 0.5) return;
        gsap.killTweensOf(m);
        gsap.timeline().to(m, { timeScale: 1 + v, duration: 0.15 }).to(m, { timeScale: 1, duration: 1, ease: "power2.out" });
      });
    },
  });
}

/* ---------------------------------- REVEALS ---------------------------------- */
function setupReveals(S: S) {
  if (RM()) return;
  qa<HTMLElement>("[data-reveal]", S.root).forEach((el) => {
    const type = el.dataset.reveal,
      d = +(el.dataset.delay || 0);
    if (type === "lines") {
      const lines = qa("[data-li]", el);
      gsap.set(lines, { yPercent: 115 });
      ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => gsap.to(lines, { yPercent: 0, duration: M.slow, ease: M.out, stagger: 0.08, delay: d }) });
    } else if (type === "clip") {
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
      ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: M.inOut, delay: d }) });
    } else if (type === "fade") {
      gsap.set(el, { y: 26, opacity: 0 });
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: M.slow, ease: M.out, delay: d }) });
    } else if (type === "stagger") {
      const ch = Array.from(el.children);
      gsap.set(ch, { y: 34, opacity: 0 });
      ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => gsap.to(ch, { y: 0, opacity: 1, duration: M.slow, ease: M.out, stagger: 0.07, delay: d }) });
    }
  });
  qa<HTMLElement>("[data-scrub]", S.root).forEach((el) => {
    const a = +(el.dataset.scrub || 10);
    gsap.fromTo(el, { yPercent: -a }, { yPercent: a, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });
}

/* ---------------------------------- CATEGORIAS ---------------------------------- */
function spawn(layer: HTMLElement, color: string, shape: string | undefined) {
  const p = document.createElement("span"),
    s = gsap.utils.random(3, 9);
  p.style.cssText = `position:absolute;left:${gsap.utils.random(4, 96)}%;bottom:-12px;width:${s}px;height:${s}px;border-radius:${shape === "diamond" ? "1px" : "50%"};background:${color};box-shadow:0 0 ${s * 3}px ${color};pointer-events:none;transform:rotate(45deg)`;
  layer.appendChild(p);
  gsap.to(p, { y: -gsap.utils.random(160, 360), x: gsap.utils.random(-40, 40), opacity: 0, scale: gsap.utils.random(0.3, 1), duration: gsap.utils.random(1.1, 2), ease: "power1.out", onComplete: () => p.remove() });
}
function setupCategories(S: S) {
  qa<HTMLElement>("[data-cat]", S.root).forEach((card) => {
    const inner = q<HTMLElement>("[data-cat-inner]", card);
    const layer = q<HTMLElement>("[data-particles]", card);
    const media = q<HTMLElement>("[data-cat-media]", card);
    const color = card.dataset.color!,
      shape = card.dataset.shape;
    if (!inner) return;
    const rx = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3.out" });
    gsap.set(inner, { transformPerspective: 1000 });
    let timer: ReturnType<typeof setInterval>;
    S.on(card, "pointermove", (e: PointerEvent) => {
      if (RM() || e.pointerType !== "mouse") return;
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 12);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
    });
    S.on(card, "pointerenter", () => {
      if (RM() || !layer) return;
      clearInterval(timer);
      timer = setInterval(() => spawn(layer, color, shape), 60);
      gsap.to(media, { scale: 1.06, duration: M.slow, ease: M.out });
    });
    S.on(card, "pointerleave", () => {
      clearInterval(timer);
      rx(0);
      ry(0);
      gsap.to(media, { scale: 1, duration: M.slow, ease: M.out });
    });
    S.cl.push(() => clearInterval(timer));
  });
}

/* ---------------------------------- CARROSSEL DE CARTAS ---------------------------------- */
function setupCarousel(S: S) {
  const vp = q<HTMLElement>("[data-track-vp]", S.root);
  const track = q<HTMLElement>("[data-track]", S.root);
  if (!vp || !track) return;
  const thumb = q<HTMLElement>("[data-track-thumb]", S.root);
  const st: Any = { x: 0, min: 0 };
  S.car = st;
  const apply = () => {
    gsap.set(track, { x: st.x });
    if (thumb) {
      const frac = Math.min(1, vp.clientWidth / Math.max(1, track.scrollWidth));
      const p = st.min ? st.x / st.min : 0;
      gsap.set(thumb, { width: frac * 100 + "%", xPercent: gsap.utils.clamp(0, 1, p) * ((1 - frac) / frac) * 100 });
    }
  };
  st.measure = () => {
    st.min = Math.min(0, vp.clientWidth - track.scrollWidth);
    st.x = gsap.utils.clamp(st.min, 0, st.x);
    apply();
  };
  const pts = () => {
    const pl = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    return qa<HTMLElement>("[data-card-item]", track).map((el) => gsap.utils.clamp(st.min, 0, -(el.offsetLeft - pl)));
  };
  const snap = (x: number) => {
    const p = pts();
    let b = p[0] || 0;
    p.forEach((v) => {
      if (Math.abs(v - x) < Math.abs(b - x)) b = v;
    });
    if (x <= st.min + 20) b = st.min;
    return b;
  };
  const go = (x: number) => gsap.to(st, { x, duration: 0.9, ease: M.out, onUpdate: apply, overwrite: true });
  const idx = () => {
    const p = pts();
    let bi = 0;
    p.forEach((v, i) => {
      if (Math.abs(v - st.x) < Math.abs(p[bi] - st.x)) bi = i;
    });
    return bi;
  };
  st.step = (d: number) => {
    const p = pts();
    if (d > 0 && st.x <= st.min + 2) return;
    go(p[gsap.utils.clamp(0, p.length - 1, idx() + d)]);
  };
  let posCache: { el: HTMLElement; center: number; w: number }[] = [];
  const buildPosCache = () => {
    const pl = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    posCache = qa<HTMLElement>("[data-card-item]", track).map((el) => ({
      el,
      center: el.offsetLeft - pl + el.offsetWidth / 2,
      w: el.offsetWidth,
    }));
  };
  buildPosCache();
  st.buildPosCache = buildPosCache;
  const revealByPosition = () => {
    const mid = vp.clientWidth / 2;
    posCache.forEach(({ el, center, w }) => {
      const screenCenter = center + st.x;
      Math.abs(screenCenter - mid) < w * 0.65 ? cardEnter(S, el, true) : cardLeave(S, el);
    });
  };
  st.measure();
  const scrollDriven = !FINE() && !RM();
  let drag: Any = null;
  S.on(vp, "pointerdown", (e: PointerEvent) => {
    if (scrollDriven && e.pointerType !== "mouse") return;
    if (e.button !== 0) return;
    drag = { sx: e.clientX, sy: e.clientY, x0: st.x, moved: false, t: performance.now(), lx: e.clientX, v: 0, id: e.pointerId };
    gsap.killTweensOf(st);
  });
  S.on(window, "pointermove", (e: PointerEvent) => {
    if (!drag) return;
    const dx = e.clientX - drag.sx;
    if (!drag.moved) {
      if (Math.abs(dx) < 6) return;
      if (e.pointerType !== "mouse" && Math.abs(e.clientY - drag.sy) > Math.abs(dx)) {
        drag = null;
        return;
      }
      drag.moved = true;
      S.dragging = true;
      qa<HTMLElement>("[data-card-item]", track).forEach((it) => cardLeave(S, it));
    }
    const now = performance.now();
    drag.v = (e.clientX - drag.lx) / Math.max(1, now - drag.t);
    drag.lx = e.clientX;
    drag.t = now;
    let nx = drag.x0 + dx;
    if (nx > 0) nx *= 0.35;
    if (nx < st.min) nx = st.min + (nx - st.min) * 0.35;
    st.x = nx;
    apply();
  });
  S.on(window, "pointerup", () => {
    if (!drag) return;
    const d = drag;
    drag = null;
    if (!d.moved) return;
    S.justDragged = true;
    setTimeout(() => {
      S.justDragged = false;
      S.dragging = false;
    }, 0);
    go(snap(gsap.utils.clamp(st.min, 0, st.x + d.v * 380)));
  });
  S.on(
    vp,
    "click",
    (e: MouseEvent) => {
      if (S.justDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );
  let wt: ReturnType<typeof setTimeout>;
  S.on(
    vp,
    "wheel",
    (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      gsap.killTweensOf(st);
      st.x = gsap.utils.clamp(st.min, 0, st.x - e.deltaX);
      apply();
      clearTimeout(wt);
      wt = setTimeout(() => go(snap(st.x)), 140);
    },
    { passive: false }
  );
  S.on(vp, "keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      st.step(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      st.step(-1);
    }
  });
  S.on(q("[data-car-prev]", S.root), "click", () => st.step(-1));
  S.on(q("[data-car-next]", S.root), "click", () => st.step(1));
  S.on(track, "pointerover", (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || useInView(S)) return;
    const it = (e.target as HTMLElement).closest<HTMLElement>("[data-card-item]");
    if (it && !it.contains(e.relatedTarget as Node)) cardEnter(S, it);
  });
  S.on(track, "pointerout", (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || useInView(S)) return;
    const it = (e.target as HTMLElement).closest<HTMLElement>("[data-card-item]");
    if (it && !it.contains(e.relatedTarget as Node)) cardLeave(S, it);
  });
  S.on(track, "pointermove", (e: PointerEvent) => holoMove(S, e));
  S.io = new IntersectionObserver(
    (ents) => {
      if (!useInView(S)) return;
      ents.forEach((en) => (en.isIntersecting ? cardEnter(S, en.target as HTMLElement, true) : cardLeave(S, en.target as HTMLElement)));
    },
    { threshold: 0.8 }
  );
  S.cl.push(() => S.io!.disconnect());
  if (!RM()) gsap.set(qa("[data-card-item]", track), { opacity: 0 });
  ScrollTrigger.create({ trigger: vp, start: "top 82%", once: true, onEnter: () => cardsIn(S) });
  if (scrollDriven) {
    const sec = S.root.querySelector<HTMLElement>("#cartas") ?? vp.closest<HTMLElement>("section")!;
    const RATIO = 1.7;
    const dist = () => gsap.utils.clamp(900, 2600, Math.abs(st.min) / RATIO);
    st.scrollTrigger = ScrollTrigger.create({
      trigger: sec,
      start: "top top",
      end: () => "+=" + Math.max(1, dist()),
      pin: true,
      scrub: 0.35,
      onUpdate: (self: Any) => {
        st.x = st.min * self.progress;
        apply();
        revealByPosition();
      },
    });
    gsap.set([q("[data-car-prev]", S.root), q("[data-car-next]", S.root)], { display: "none" });
  }
  S.carReady = true;
}
const useInView = (S: S) => S.o.get().revealTrigger === "inView" || !FINE();
function cardsOut(S: S, cb: () => void) {
  const items = qa<HTMLElement>("[data-card-item]", S.root);
  items.forEach((it) => cardLeave(S, it, true));
  if (RM()) {
    cb();
    return;
  }
  gsap.to(items, { opacity: 0, y: 18, duration: 0.22, ease: "power2.in", stagger: 0.02, onComplete: cb });
}
function cardsIn(S: S) {
  const track = q<HTMLElement>("[data-track]", S.root);
  if (!track) return;
  const items = qa<HTMLElement>("[data-card-item]", track);
  S.cards = new WeakMap();
  items.forEach((it) => {
    const b = q<HTMLElement>("[data-blocks]", it);
    if (b) b.innerHTML = "";
    const bk = q<HTMLElement>("[data-back]", it);
    if (bk) bk.style.opacity = "1";
  });
  S.car.x = 0;
  S.car.measure();
  S.car.buildPosCache?.();
  if (S.car.scrollTrigger) {
    ScrollTrigger.refresh();
    if (S.car.scrollTrigger.isActive) S.car.scrollTrigger.scroll(S.car.scrollTrigger.start);
  }
  qa<HTMLElement>("[data-shiny-sweep]", track).forEach((sw) => {
    gsap.killTweensOf(sw);
    if (!RM()) gsap.fromTo(sw, { xPercent: -120 }, { xPercent: 260, duration: 1.1, ease: "power2.inOut", repeat: -1, repeatDelay: gsap.utils.random(2.2, 4.5), delay: gsap.utils.random(0, 2) });
  });
  S.io!.disconnect();
  items.forEach((it) => S.io!.observe(it));
  if (RM()) {
    gsap.set(items, { opacity: 1, y: 0 });
    return;
  }
  gsap.fromTo(items, { opacity: 0, rotationY: -38, rotationX: 6, z: -260, x: 90, y: 0, transformPerspective: 1100 }, { opacity: 1, rotationY: 0, rotationX: 0, z: 0, x: 0, y: 0, duration: 1, ease: M.out, stagger: 0.06, clearProps: "transform" });
}
function prepCard(S: S, item: HTMLElement): CardCtl | null {
  const id = item.dataset.id!,
    url = faceOf(id);
  if (!url) return null;
  const face = q<HTMLElement>("[data-blocks]", item);
  if (!face) return null;
  const w = face.clientWidth,
    h = face.clientHeight;
  if (!w) return null;
  face.innerHTML = "";
  const cols = 6,
    rows = 8,
    bw = w / cols,
    bh = h / rows,
    frag = document.createDocumentFragment(),
    blocks: HTMLElement[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const b = document.createElement("div");
      b.style.cssText = `position:absolute;left:${c * bw}px;top:${r * bh}px;width:${bw + 0.6}px;height:${bh + 0.6}px;background-image:url(${url});background-size:${w}px ${h}px;background-position:${-c * bw}px ${-r * bh}px;opacity:0`;
      frag.appendChild(b);
      blocks.push(b);
    }
  face.appendChild(frag);
  const tiltEl = q<HTMLElement>("[data-tilt-inner]", item);
  if (!tiltEl) return null;
  const cs: CardCtl = {
    id,
    item,
    blocks,
    back: q("[data-back]", item),
    sheen: q("[data-sheen]", item),
    lift: q("[data-lift]", item),
    tilt: tiltEl,
    holo: q("[data-holo]", item),
    glit: q("[data-glitter]", item),
    glare: q("[data-glare]", item),
    tier: item.dataset.tier,
    t: 0,
    tl: gsap.timeline({ paused: true }),
  };
  cs.tl.eventCallback("onComplete", () => holoOn(S, cs));
  if (RM()) cs.tl.to(blocks, { opacity: 1, duration: 0.15 }, 0).to(cs.back, { opacity: 0, duration: 0.15 }, 0);
  else {
    const del = blocks.map((_, i) => (((i / cols) | 0) + (i % cols)) * 0.016 + Math.random() * 0.04);
    cs.tl
      .fromTo(blocks, { opacity: 0, scale: 0.3, x: () => gsap.utils.random(-18, 18), y: () => gsap.utils.random(-30, 10), rotation: () => gsap.utils.random(-28, 28) }, { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0, duration: 0.32, ease: "back.out(1.6)", stagger: (i: number) => del[i] }, 0)
      .to(cs.back, { opacity: 0, duration: 0.2, ease: "power2.out" }, 0.4)
      .fromTo(cs.sheen, { xPercent: -130 }, { xPercent: 130, duration: 0.3, ease: "power2.inOut" }, ">-0.1");
  }
  S.cards.set(item, cs);
  return cs;
}
function cardEnter(S: S, item: HTMLElement, now?: boolean) {
  if (S.dragging) return;
  let cs = S.cards.get(item);
  if (!cs || cs.id !== item.dataset.id) cs = prepCard(S, item) || undefined;
  if (!cs) return;
  clearTimeout(cs.t as Any);
  cs.t = setTimeout(
    () => {
      cs!.on = true;
      cs!.tl.timeScale(1).play();
      if (!RM()) gsap.to(cs!.lift, { y: -10, scale: 1.035, duration: M.base, ease: M.out, overwrite: "auto" });
    },
    now ? 0 : 60
  );
}
function cardLeave(S: S, item: HTMLElement, instant?: boolean) {
  const cs = S.cards.get(item);
  if (!cs) return;
  clearTimeout(cs.t as Any);
  if (!cs.on) return;
  cs.on = false;
  cs.holoOn = false;
  gsap.to([cs.holo, cs.glit, cs.glare], { opacity: 0, duration: 0.2, overwrite: true });
  gsap.to(cs.tilt, { rotationX: 0, rotationY: 0, duration: 0.3, ease: M.out, overwrite: "auto" });
  gsap.to(cs.lift, { y: 0, scale: 1, duration: 0.3, ease: M.out, overwrite: "auto" });
  if (instant) {
    cs.tl.pause(0);
    return;
  }
  cs.tl.timeScale(Math.max(1, cs.tl.time() / 0.28)).reverse();
}
function holoOn(S: S, cs: CardCtl) {
  if (!cs.on) return;
  cs.holoOn = true;
  const k = S.o.get().holo,
    base = ({ comum: 0, rara: 0.35, ultra: 0.7, secreta: 1 } as Record<string, number>)[cs.tier || ""] ?? 0.5,
    v = Math.min(1.4, base * k);
  gsap.to(cs.holo, { opacity: v * 0.38, duration: 0.35 });
  gsap.to(cs.glit, { opacity: Math.min(1, v * 0.9), duration: 0.35 });
  gsap.to(cs.glare, { opacity: 0.35 + v * 0.3, duration: 0.35 });
  if (!FINE()) {
    cs.tilt.style.setProperty("--mx", "50%");
    cs.tilt.style.setProperty("--my", "40%");
  }
}
function holoMove(S: S, e: PointerEvent) {
  const it = (e.target as HTMLElement).closest<HTMLElement>("[data-card-item]");
  if (!it) return;
  const cs = S.cards.get(it);
  if (!cs || !cs.holoOn) return;
  const r = cs.tilt.getBoundingClientRect(),
    px = gsap.utils.clamp(0, 1, (e.clientX - r.left) / r.width),
    py = gsap.utils.clamp(0, 1, (e.clientY - r.top) / r.height);
  const s = cs.tilt.style;
  s.setProperty("--mx", px * 100 + "%");
  s.setProperty("--my", py * 100 + "%");
  s.setProperty("--bx", 50 + (px - 0.5) * 70 + "%");
  s.setProperty("--by", 50 + (py - 0.5) * 70 + "%");
  if (!RM()) gsap.to(cs.tilt, { rotationY: (px - 0.5) * 18, rotationX: -(py - 0.5) * 18, transformPerspective: 800, duration: 0.4, ease: "power3.out", overwrite: "auto" });
}

/* ---------------------------------- LANÇAMENTO (pin) ---------------------------------- */
function setupLaunch(S: S) {
  const sec = q<HTMLElement>("[data-launch]", S.root);
  if (!sec) return;
  const box = q("[data-launch-box]", sec),
    rows = qa("[data-dex-row]", sec),
    glow = q("[data-launch-glow]", sec),
    scan = q<HTMLElement>("[data-scan]", sec),
    panel = q<HTMLElement>("[data-dex]", sec);
  const types = qa<HTMLElement & { _full?: string }>("[data-type]", sec);
  types.forEach((t) => {
    t._full = t.textContent || "";
    if (!RM()) t.textContent = "";
  });
  let typed = false;
  const type = () => {
    if (typed || RM()) return;
    typed = true;
    let i = 0;
    const next = () => {
      if (i >= types.length) return;
      const el = types[i++],
        txt = el._full || "";
      let n = 0;
      const iv = setInterval(() => {
        n += 2;
        el.textContent = txt.slice(0, n);
        if (n >= txt.length) {
          clearInterval(iv);
          next();
        }
      }, 16);
      S.cl.push(() => clearInterval(iv));
    };
    next();
  };
  if (!RM() && scan && panel) gsap.fromTo(scan, { y: -40 }, { y: () => panel.clientHeight + 40, duration: 2.8, ease: "none", repeat: -1 });
  const caret = q("[data-caret]", sec);
  if (caret && !RM()) gsap.to(caret, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
  ScrollTrigger.create({ trigger: sec, start: "top 60%", once: true, onEnter: type });
  if (RM()) return;
  gsap
    .timeline({ scrollTrigger: { trigger: sec, start: "top top", end: "+=110%", pin: true, scrub: 0.6 } })
    .fromTo(box, { rotationY: -26, rotationX: 8, scale: 0.86, yPercent: 6, transformPerspective: 1400 }, { rotationY: 14, rotationX: -4, scale: 1, yPercent: -4, ease: "none" }, 0)
    .fromTo(glow, { scale: 0.6, opacity: 0.35 }, { scale: 1.15, opacity: 0.95, ease: "none" }, 0)
    .fromTo(rows, { opacity: 0.2, x: 12 }, { opacity: 1, x: 0, stagger: 0.12, ease: "none" }, 0);
  const cd = q<HTMLElement>("[data-countdown]", sec);
  if (cd) {
    const target = new Date(cd.dataset.target!).getTime();
    const tick = () => {
      const d = Math.max(0, target - Date.now());
      const v: Record<string, number> = { d: Math.floor(d / 864e5), h: Math.floor((d % 864e5) / 36e5), m: Math.floor((d % 36e5) / 6e4), s: Math.floor((d % 6e4) / 1e3) };
      qa<HTMLElement>("[data-cd]", cd).forEach((el) => {
        el.textContent = String(v[el.dataset.cd!]).padStart(2, "0");
      });
    };
    tick();
    S.cdTimer = setInterval(tick, 1000);
  }
}

/* ---------------------------------- ZOOM DA CARTA (leque do booster) ---------------------------------- */
// Clona o cartão clicado, prende o clone em position:fixed exatamente sobre o
// original (FLIP) e anima até o centro da viewport — mesma técnica de clone +
// getBoundingClientRect do capture() (voo pro carrinho), mas sem destino fixo:
// aqui o "pouso" é sempre o centro da tela, ampliado, por cima de um backdrop.
function wireZoomTilt(el: HTMLElement) {
  const THRESHOLD = 7,
    MAX_ROT = 22,
    SENS = 0.12;
  let pointerId: number | null = null,
    startX = 0,
    draggedPastThreshold = false;

  const onDown = (e: PointerEvent) => {
    if (pointerId !== null) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    draggedPastThreshold = false;
    try {
      el.setPointerCapture(e.pointerId);
    } catch {}
  };
  const onMove = (e: PointerEvent) => {
    if (pointerId === null || e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    if (!draggedPastThreshold && Math.abs(dx) < THRESHOLD) return;
    draggedPastThreshold = true;
    gsap.to(el, { rotationY: gsap.utils.clamp(-MAX_ROT, MAX_ROT, dx * SENS), transformPerspective: 900, duration: 0.3, ease: "power3.out", overwrite: "auto" });
  };
  const onUp = (e: PointerEvent) => {
    if (pointerId === null || e.pointerId !== pointerId) return;
    try {
      el.releasePointerCapture(pointerId);
    } catch {}
    pointerId = null;
    gsap.to(el, { rotationY: 0, duration: 0.3, ease: M.out, overwrite: "auto" });
  };
  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointercancel", onUp);

  return {
    consumeDragFlag: () => {
      const v = draggedPastThreshold;
      draggedPastThreshold = false;
      return v;
    },
    unwire: () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    },
  };
}

function setupCardZoom(S: S, cards: HTMLElement[], backdrop: HTMLElement | null) {
  if (!backdrop) return;
  let clone: HTMLElement | null = null;
  let tilt: ReturnType<typeof wireZoomTilt> | null = null;

  const close = () => {
    const el = clone;
    if (!el) return;
    clone = null;
    tilt?.unwire();
    tilt = null;
    const [left, top, width, height] = el.dataset.origRect!.split(",").map(Number);
    gsap.to(el, { left, top, width, height, rotation: 0, rotationY: 0, duration: RM() ? 0 : 0.4, ease: M.inOut, onComplete: () => el.remove() });
    gsap.to(backdrop, { opacity: 0, duration: RM() ? 0 : 0.3, onComplete: () => (backdrop.style.pointerEvents = "none") });
  };

  const open = (card: HTMLElement) => {
    if (clone) return;
    const r = card.getBoundingClientRect();
    const c = card.cloneNode(true) as HTMLElement;
    c.removeAttribute("data-fan-card");
    c.removeAttribute("tabIndex");
    Object.assign(c.style, {
      position: "fixed",
      left: `${r.left}px`,
      top: `${r.top}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
      right: "auto",
      margin: "0",
      zIndex: "9999",
      cursor: "zoom-out",
      touchAction: "none",
      boxShadow: "0 60px 140px -30px rgba(0,0,0,.85)",
    });
    c.dataset.origRect = `${r.left},${r.top},${r.width},${r.height}`;
    document.body.appendChild(c);
    clone = c;
    if (!RM()) tilt = wireZoomTilt(c);

    const targetW = Math.min(window.innerWidth * 0.82, 380),
      targetH = targetW * (88 / 63);
    backdrop.style.pointerEvents = "auto";
    gsap.to(backdrop, { opacity: 1, duration: RM() ? 0 : 0.3 });
    gsap.to(c, {
      left: window.innerWidth / 2 - targetW / 2,
      top: window.innerHeight / 2 - targetH / 2,
      width: targetW,
      height: targetH,
      x: 0,
      y: 0,
      rotation: 0,
      duration: RM() ? 0 : 0.55,
      ease: M.out,
    });
    S.on(c, "click", () => {
      if (tilt?.consumeDragFlag()) return;
      close();
    });
  };

  cards.forEach((card) => {
    S.on(card, "click", () => open(card));
    S.on(card, "keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(card);
      }
    });
  });
  S.on(backdrop, "click", close);
  S.on(window, "keydown", (e: KeyboardEvent) => e.key === "Escape" && close());
}

/* ---------------------------------- RASGUE O PACOTE ---------------------------------- */
function setupRip(S: S) {
  const sec = q<HTMLElement>("[data-rip]", S.root);
  if (!sec) return;
  const pack = q<HTMLElement>("[data-pack]", sec),
    top = q("[data-pack-top]", sec),
    body = q("[data-pack-body]", sec),
    cards = qa<HTMLElement>("[data-fan-card]", sec),
    cta = q("[data-rip-cta]", sec),
    flash = q("[data-rip-flash]", sec),
    hint = q("[data-rip-hint]", sec);
  cards.forEach((c) => {
    const f = q<HTMLElement>("[data-fan-face]", c),
      u = faceOf(c.dataset.id!);
    if (f && u) f.style.backgroundImage = `url(${u})`;
  });
  qa<HTMLElement>("[data-fan-holo]", sec).forEach((h) => !RM() && gsap.fromTo(h, { backgroundPosition: "0% 50%" }, { backgroundPosition: "100% 50%", duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" }));
  setupCardZoom(S, cards, q<HTMLElement>("[data-card-zoom-backdrop]", sec));
  if (RM()) {
    gsap.set(top, { opacity: 0 });
    gsap.set(body, { opacity: 0 });
    cards.forEach((c, i) => gsap.set(c, { opacity: 1, x: (i - 2) * 120, rotation: (i - 2) * 10, y: Math.abs(i - 2) * 20 }));
    return;
  }
  if (!pack) return;
  const spread = () => Math.min(window.innerWidth * 0.15, 200);
  const ph = () => pack.offsetHeight;
  gsap.set(cards, { opacity: 0, y: 30, scale: 0.9 });
  gsap.set(cta, { opacity: 0, y: 30 });
  const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top top", end: "+=190%", pin: true, scrub: 0.7, invalidateOnRefresh: true } });
  tl.fromTo(pack, { y: () => window.innerHeight * 0.6, rotation: -10, scale: 0.88 }, { y: 0, rotation: 0, scale: 1, duration: 1, ease: "power2.out" })
    .to(hint, { opacity: 0, duration: 0.3 }, 0.8)
    .to(top, { x: 3, rotation: 1.5, duration: 0.06, repeat: 5, yoyo: true, ease: "none" })
    .fromTo(flash, { opacity: 0, scaleX: 0.2 }, { opacity: 1, scaleX: 1, duration: 0.18 })
    .to(top, { y: -220, x: 160, rotation: 32, opacity: 0, duration: 0.7, ease: "power2.in" })
    .to(flash, { opacity: 0, duration: 0.25 }, "<")
    .to(cards, { opacity: 1, duration: 0.05 }, "<")
    .to(cards, { y: () => -ph() * 0.62, scale: 0.94, duration: 0.6, ease: "power2.out", stagger: 0.05 }, "<")
    .to(body, { y: () => window.innerHeight * 0.9, rotation: 6, duration: 0.9, ease: "power2.in" })
    .to(cards, { x: (i: number) => (i - 2) * spread(), y: (i: number) => -ph() * 0.06 + Math.abs(i - 2) * 26, rotation: (i: number) => (i - 2) * 11, scale: 1, duration: 0.9, ease: "power3.out" }, "<0.1")
    .to(cta, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");
}

/* ---------------------------------- CONDIÇÃO / PASSOS ---------------------------------- */
function setupCondition(S: S) {
  const f = q<HTMLElement>("[data-cond-face]", S.root);
  const fu = f && f.dataset.id && faceOf(f.dataset.id);
  if (fu) f!.style.backgroundImage = `url(${fu})`;
  const wrap = q<HTMLElement>("[data-steps]", S.root);
  if (!wrap) return;
  const svg = q<SVGSVGElement>("[data-draw-svg]", wrap),
    path = q<SVGPathElement>("[data-draw-path]", wrap);
  const build = () => {
    const h = wrap.clientHeight;
    svg!.setAttribute("viewBox", `0 0 40 ${h}`);
    svg!.style.height = h + "px";
    path!.setAttribute("d", `M20 0 L20 ${h}`);
    const len = path!.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: RM() ? 0 : len });
    return len;
  };
  build();
  if (!RM()) gsap.to(path, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: wrap, start: "top 70%", end: "bottom 65%", scrub: true, onRefresh: build } });
  qa<HTMLElement>("[data-step]", wrap).forEach((st) => {
    const dot = q("[data-step-dot]", st);
    ScrollTrigger.create({
      trigger: st,
      start: "top 66%",
      onEnter: () => gsap.to(dot, { scale: 1, backgroundColor: "#ffd23f", boxShadow: "0 0 0 6px rgba(255,210,63,.18), 0 0 24px rgba(255,210,63,.6)", duration: M.base, ease: M.out }),
      onLeaveBack: () => gsap.to(dot, { scale: 0.7, backgroundColor: "#2a2d3a", boxShadow: "0 0 0 0 rgba(0,0,0,0)", duration: M.fast }),
    });
  });
}

function setupCounters(S: S) {
  const fmt = new Intl.NumberFormat("pt-BR");
  qa<HTMLElement>("[data-count]", S.root).forEach((el) => {
    const target = +el.dataset.count!;
    if (RM()) return;
    const o = { v: 0 };
    el.textContent = "0";
    ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: target, duration: 2, ease: "power3.out", onUpdate: () => (el.textContent = fmt.format(Math.round(o.v))) }) });
  });
}

function setupFooter(S: S) {
  const ls = qa<HTMLElement>("[data-wm-l]", S.root);
  if (!ls.length || RM()) return;
  gsap.fromTo(ls, { yPercent: 105 }, { yPercent: 0, ease: "none", stagger: 0.04, scrollTrigger: { trigger: q("[data-wordmark]", S.root), start: "top 100%", end: "bottom 95%", scrub: 0.6 } });
}

function setupPlaceholders(S: S) {
  if (RM()) return;
  qa<HTMLElement>("[data-stripes]", S.root).forEach((el) => gsap.fromTo(el, { backgroundPosition: "0px 0px" }, { backgroundPosition: "200px 0px", duration: 9, ease: "none", repeat: -1 }));
}

/* ---------------------------------- ÍRIS (transição) ---------------------------------- */
function iris(S: S, x: number, y: number, sel: string) {
  const ov = q<HTMLElement>("[data-iris]", S.root);
  if (!ov || RM()) {
    scrollTo(S, sel, true);
    return;
  }
  const W = window.innerWidth,
    H = window.innerHeight;
  const R = Math.hypot(Math.max(x, W - x), Math.max(y, H - y)),
    R2 = Math.hypot(W / 2, H / 2),
    o = { r: 0 };
  ov.style.visibility = "visible";
  gsap
    .timeline()
    .to(o, { r: R, duration: 0.55, ease: M.inOut, onUpdate: () => (ov.style.clipPath = `circle(${o.r}px at ${x}px ${y}px)`) })
    .add(() => {
      scrollTo(S, sel, true);
      ScrollTrigger.update();
    })
    .set(o, { r: R2 })
    .to(o, { r: 0, duration: 0.55, ease: M.inOut, delay: 0.1, onUpdate: () => (ov.style.clipPath = `circle(${o.r}px at ${W / 2}px ${H / 2}px)`), onComplete: () => (ov.style.visibility = "hidden") });
}
function setupIris(S: S) {
  S.on(S.root, "click", (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>("[data-iris-to]");
    if (!a) return;
    e.preventDefault();
    const r = a.getBoundingClientRect(),
      x = e.clientX || r.left + r.width / 2,
      y = e.clientY || r.top + r.height / 2;
    if (S.o.onIrisNav) S.o.onIrisNav();
    iris(S, x, y, a.dataset.irisTo!);
  });
}

/* ---------------------------------- CAPTURA ---------------------------------- */
function capture(S: S, btn: HTMLElement, color: string, done: () => void) {
  const cart = q<HTMLElement>("[data-cart-icon]", S.root);
  if (!cart || RM()) {
    done();
    return;
  }
  const host = btn.closest<HTMLElement>("[data-grid-item],[data-card-item]"),
    src = host && q<HTMLElement>("[data-capture-src]", host);
  const a = (src || btn).getBoundingClientRect(),
    b = cart.getBoundingClientRect();
  const g = document.createElement("div");
  g.style.cssText = `position:fixed;left:${a.left}px;top:${a.top}px;width:${a.width}px;height:${a.height}px;border-radius:16px;background:${color};z-index:9997;pointer-events:none;opacity:.85;box-shadow:0 0 40px ${color}`;
  document.body.appendChild(g);
  const ball = makeBall(28);
  document.body.appendChild(ball);
  const sx = a.left + a.width / 2,
    sy = a.top + a.height / 2,
    ex = b.left + b.width / 2,
    ey = b.top + b.height / 2;
  const p = { t: 0 },
    lift = Math.min(280, Math.abs(ex - sx) * 0.4 + 140);
  gsap
    .timeline({
      onComplete: () => {
        g.remove();
        ball.remove();
      },
    })
    .to(g, { left: sx - 14, top: sy - 14, width: 28, height: 28, borderRadius: 14, opacity: 1, duration: 0.32, ease: "power3.in" })
    .set(g, { opacity: 0 })
    .to(ball, { scale: 1, duration: 0.12 }, "<")
    .to(
      p,
      {
        t: 1,
        duration: 0.72,
        ease: "power1.inOut",
        onUpdate: () => {
          const t = p.t;
          gsap.set(ball, { x: sx + (ex - sx) * t - 14, y: sy + (ey - sy) * t - lift * 4 * t * (1 - t) - 14, rotation: t * 540, scale: 1 - 0.3 * t });
        },
      }
    )
    .set(ball, { rotation: 0, transformOrigin: "50% 90%" })
    .to(ball, { rotation: -22, duration: 0.09 })
    .to(ball, { rotation: 18, duration: 0.11 })
    .to(ball, { rotation: 0, duration: 0.08 })
    .to(ball, { rotation: -16, duration: 0.09 })
    .to(ball, { rotation: 12, duration: 0.1 })
    .to(ball, { rotation: 0, duration: 0.08 })
    .add(() => {
      done();
      gsap.fromTo(cart, { rotation: -14 }, { rotation: 0, duration: 0.7, ease: "elastic.out(1,.3)" });
    })
    .to(ball, { scale: 0, opacity: 0, duration: 0.2 });
}

/* ---------------------------------- PRELOADER ---------------------------------- */
function runPreloader(S: S, done: () => void) {
  const pl = q<HTMLElement>("[data-preloader]", S.root),
    mode = S.o.get().preloader;
  let seen = false;
  try {
    seen = sessionStorage.getItem("vault-pre") === "1";
  } catch {
    /* sessionStorage indisponível */
  }
  if (!pl || mode === "desligado" || (mode === "sessão" && seen) || RM()) {
    if (pl) pl.style.display = "none";
    done();
    return;
  }
  try {
    sessionStorage.setItem("vault-pre", "1");
  } catch {
    /* sessionStorage indisponível */
  }
  S.lenis && S.lenis.stop();
  const ball = q<HTMLElement>("[data-pl-ball]", pl),
    num = q<HTMLElement>("[data-pl-num]", pl),
    btn = q("[data-pl-btn]", pl),
    top = q("[data-pl-top]", pl),
    bot = q("[data-pl-bot]", pl),
    flash = q("[data-pl-flash]", pl),
    meta = q("[data-pl-meta]", pl);
  const c = { v: 0 };
  const tl = gsap.timeline({
    onComplete: () => {
      pl.style.display = "none";
      S.lenis && S.lenis.start();
    },
  });
  tl.to(c, { v: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => (num!.textContent = String(Math.round(c.v)).padStart(3, "0") + "%") }, 0);
  gsap.set(ball, { transformOrigin: "50% 92%" });
  [0, 1, 2].forEach((k) => {
    const t0 = 0.08 + k * 0.4;
    tl.to(ball, { rotation: -20, duration: 0.11, ease: "power2.out" }, t0).to(ball, { rotation: 15, duration: 0.13, ease: "power2.inOut" }).to(ball, { rotation: 0, duration: 0.1, ease: "power2.in" });
    tl.to(btn, { backgroundColor: "#ffd23f", duration: 0.06, yoyo: true, repeat: 1 }, t0 + 0.34);
  });
  tl.to(meta, { opacity: 0, duration: 0.15 }, 1.28)
    .set(ball, { transformOrigin: "50% 50%" }, 1.3)
    .to(ball, { scale: () => (Math.hypot(window.innerWidth, window.innerHeight) / ball!.offsetWidth) * 1.08, duration: 0.32, ease: "power3.in" }, 1.3)
    .set([top, bot], { visibility: "visible" }, 1.62)
    .set(ball, { opacity: 0 }, 1.62)
    .set(pl, { backgroundColor: "rgba(0,0,0,0)" }, 1.62)
    .fromTo(flash, { opacity: 1 }, { opacity: 0, duration: 0.32, ease: "power2.out" }, 1.62)
    .to(top, { yPercent: -100, duration: 0.52, ease: M.inOut }, 1.66)
    .to(bot, { yPercent: 100, duration: 0.52, ease: M.inOut }, 1.66)
    .add(done, 1.72);
}

/* ---------------------------------- HERO ---------------------------------- */
function heroIntro(S: S) {
  const H = S.hero;
  if (!H) return;
  const s = H.slides[0];
  const bar = q("[data-nav-bar]", S.root);
  if (RM()) {
    H.start();
    return;
  }
  gsap.fromTo(bar, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: M.slow, ease: M.out });
  gsap.to(qa("[data-hl]", s), { yPercent: 0, duration: 1, ease: M.out, stagger: 0.08, delay: 0.05 });
  gsap.to(qa("[data-hf]", s), { opacity: 1, y: 0, duration: 0.8, ease: M.out, stagger: 0.07, delay: 0.3 });
  gsap.fromTo(q("[data-hm]", s), { clipPath: "inset(100% 0% 0% 0% round 28px)", scale: 1.12 }, { clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1, duration: 1.1, ease: M.inOut, onComplete: () => gsap.set(q("[data-hm]", s), { clearProps: "clipPath" }) });
  gsap.fromTo(qa("[data-hero-ui]", S.root), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: M.out, delay: 0.5, stagger: 0.06 });
  H.start();
}
function setupHero(S: S) {
  const hero = q<HTMLElement>("[data-hero]", S.root);
  if (!hero) return;
  const slides = qa<HTMLElement>("[data-slide]", hero),
    bars = qa<HTMLElement>("[data-ind-bar]", hero),
    ring = q<HTMLElement>("[data-wipe-ring]", hero);
  const H: Any = { i: 0, busy: false, prog: null, slides };
  S.hero = H;
  slides.forEach((s, i) => {
    gsap.set(s, { visibility: i === 0 ? "visible" : "hidden", zIndex: i === 0 ? 2 : 1 });
    s.setAttribute("aria-hidden", i ? "true" : "false");
    (s as Any).inert = i !== 0;
  });
  if (!RM()) {
    gsap.set(qa("[data-hl]", slides[0]), { yPercent: 115 });
    gsap.set(qa("[data-hf]", slides[0]), { opacity: 0, y: 16 });
  }
  gsap.set(ring, { rotation: -45, opacity: 0 });
  const startProg = () => {
    if (H.prog) H.prog.kill();
    bars.forEach((b) => gsap.set(b, { scaleX: 0 }));
    H.prog = gsap.fromTo(bars[H.i], { scaleX: 0 }, { scaleX: 1, duration: 7, ease: "none", onComplete: () => go(H.i + 1, 1) });
  };
  H.start = startProg;
  const go = (n: number, dir?: number) => {
    if (H.busy) return;
    n = (n + slides.length) % slides.length;
    if (n === H.i) return;
    dir = dir || (n > H.i ? 1 : -1);
    H.busy = true;
    const cur = slides[H.i],
      nxt = slides[n];
    H.i = n;
    S.o.onHero && S.o.onHero(n);
    if (H.prog) H.prog.kill();
    bars.forEach((b) => gsap.to(b, { scaleX: 0, duration: 0.3 }));
    const W = hero.clientWidth,
      Hh = hero.clientHeight,
      mob = W < 820;
    const ox = mob ? W / 2 : dir! > 0 ? W * 0.74 : W * 0.26,
      oy = Hh * 0.5;
    const R = Math.hypot(Math.max(ox, W - ox), Math.max(oy, Hh - oy)) + 20;
    (nxt as Any).inert = false;
    (cur as Any).inert = true;
    nxt.setAttribute("aria-hidden", "false");
    cur.setAttribute("aria-hidden", "true");
    const finish = () => {
      gsap.set(cur, { visibility: "hidden", zIndex: 1 });
      gsap.set(nxt, { zIndex: 2 });
      nxt.style.clipPath = "";
      gsap.set(ring, { opacity: 0 });
      H.busy = false;
      startProg();
    };
    const nL = qa("[data-hl]", nxt),
      nF = qa("[data-hf]", nxt),
      nM = q("[data-hm]", nxt),
      cL = qa("[data-hl]", cur),
      cF = qa("[data-hf]", cur),
      cM = q("[data-hm]", cur);
    gsap.set(nxt, { visibility: "visible", zIndex: 3 });
    gsap.set(cur, { zIndex: 2 });
    if (RM()) {
      gsap.set([nL, nF], { yPercent: 0, opacity: 1, y: 0 });
      gsap.fromTo(nxt, { opacity: 0 }, { opacity: 1, duration: 0.15, onComplete: finish });
      return;
    }
    const o = { r: 0 };
    const clip = () => {
      nxt.style.clipPath = `circle(${o.r}px at ${ox}px ${oy}px)`;
      gsap.set(ring, { width: o.r * 2, height: o.r * 2, x: ox - o.r, y: oy - o.r });
    };
    clip();
    gsap.set(nL, { yPercent: 115 });
    gsap.set(nF, { opacity: 0, y: 16 });
    gsap.set(nM, { scale: 1.18, yPercent: 5 });
    gsap
      .timeline({ onComplete: finish })
      .to(cL, { yPercent: -115, duration: 0.35, ease: "power3.in", stagger: 0.03 }, 0)
      .to(cF, { opacity: 0, duration: 0.25 }, 0)
      .to(cM, { scale: 0.92, xPercent: -6 * dir!, duration: 0.7, ease: M.inOut }, 0)
      .set(ring, { opacity: 1 }, 0.1)
      .to(o, { r: R, duration: 0.75, ease: M.inOut, onUpdate: clip }, 0.1)
      .to(ring, { opacity: 0, duration: 0.2 }, 0.68)
      .to(nM, { scale: 1, yPercent: 0, duration: 0.85, ease: M.out }, 0.2)
      .to(nL, { yPercent: 0, duration: 0.55, ease: M.out, stagger: 0.05 }, 0.38)
      .to(nF, { opacity: 1, y: 0, duration: 0.45, ease: M.out, stagger: 0.06 }, 0.5)
      .add(() => {
        gsap.set([cL, cF], { yPercent: 0, opacity: 1, y: 0 });
        gsap.set(cM, { scale: 1, xPercent: 0 });
      }, 1.1);
  };
  H.go = (n: number) => go(n);
  S.on(hero, "keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(H.i + 1, 1);
    if (e.key === "ArrowLeft") go(H.i - 1, -1);
  });
  S.on(q("[data-hero-next]", hero), "click", () => go(H.i + 1, 1));
  S.on(q("[data-hero-prev]", hero), "click", () => go(H.i - 1, -1));
  qa<HTMLElement>("[data-ind]", hero).forEach((b) => S.on(b, "click", () => go(+b.dataset.ind!)));
  let sw: Any = null;
  S.on(hero, "pointerdown", (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    sw = { x: e.clientX, y: e.clientY };
  });
  S.on(window, "pointerup", (e: PointerEvent) => {
    if (!sw) return;
    const dx = e.clientX - sw.x,
      dy = e.clientY - sw.y;
    sw = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(H.i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });
  if (!RM())
    S.on(hero, "pointermove", (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const px = e.clientX / window.innerWidth - 0.5,
        py = e.clientY / window.innerHeight - 0.5;
      const p = q("[data-hp]", slides[H.i]);
      if (p) gsap.to(p, { x: px * 22, y: py * 18, rotationY: px * 6, rotationX: -py * 5, transformPerspective: 1200, duration: 0.9, ease: "power3.out" });
      const gl = q("[data-hglow]", slides[H.i]);
      if (gl) gsap.to(gl, { x: px * -40, y: py * -30, duration: 1.2, ease: "power3.out" });
    });
  if (!RM()) qa("[data-hero-scrub]", hero).forEach((el) => gsap.to(el, { yPercent: 12, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } }));
}
