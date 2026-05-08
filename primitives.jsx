// Shared UI primitives for MERKT [&] associés single-page app
// - useReveal: IntersectionObserver-based fade+rise on scroll
// - useScrollY: scroll position of the scrollable container
// - <Reveal>: wraps children with a reveal animation
// - <SplitReveal>: line-by-line masked reveal for serif headlines
// - <Counter>: counts a number up once on mount
// - <AmpWatermark>: the [&] fil rouge that scales/translates as you scroll
// - <TopNav>, <Footer>, <ImgSlot>

const { useState, useEffect, useRef } = React;

// ---------- hooks ----------
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    let io;
    const connect = () => {
      if (!ref.current) return;
      io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
        { threshold }
      );
      io.observe(ref.current);
    };
    if (window.__appReady) {
      connect();
    } else {
      document.addEventListener('app-ready', connect, { once: true });
    }
    return () => {
      document.removeEventListener('app-ready', connect);
      io?.disconnect();
    };
  }, [threshold]);
  return [ref, shown];
}

function useScrollY(target) {
  const [y, setY] = useState(0);
  useEffect(() => {
    const el = target?.current || window;
    const get = () => target?.current ? target.current.scrollTop : window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(get()));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    setY(get());
    return () => el.removeEventListener("scroll", onScroll);
  }, [target]);
  return y;
}

// ---------- Reveal wrapper ----------
function Reveal({ children, delay = 0, y = 24, dur = 900, as: Tag = "div", style = {}, ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${dur}ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform ${dur}ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
      {...rest}
    >{children}</Tag>
  );
}

// Line-by-line masked reveal — give it text with \n line breaks.
function SplitReveal({ text, style = {}, lineDelay = 90, baseDelay = 0 }) {
  const lines = String(text).split("\n");
  const [ref, shown] = useReveal(0.2);
  return (
    <span ref={ref} style={{ display: "block", ...style }}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden", paddingBottom: "0.05em" }}>
          <span style={{
            display: "inline-block",
            transform: shown ? "translateY(0)" : "translateY(110%)",
            transition: `transform 1100ms cubic-bezier(.2,.75,.15,1) ${baseDelay + i * lineDelay}ms`,
            willChange: "transform",
          }}>
            {line || " "}
          </span>
        </span>
      ))}
    </span>
  );
}

// ---------- Counter ----------
function Counter({ to, dur = 1600, prefix = "", suffix = "", start = 0 }) {
  const [ref, shown] = useReveal(0.4);
  const [val, setVal] = useState(start);
  useEffect(() => {
    if (!shown) return;
    const t0 = performance.now();
    const target = parseInt(to, 10);
    let raf = 0;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(Math.round(start + (target - start) * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, dur, start]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ---------- The [&] watermark — scroll-driven fil rouge ----------
function AmpWatermark({ scrollRef, route }) {
  const [stage, setStage] = useState({ x: 5, y: 30, s: 0.85, o: 0.45, rot: 0 });
  const isHome = route === "/";

  useEffect(() => {
    let raf = 0;
    let last = { x: 5, y: 30, s: 0.85, o: 0.45, rot: 0 };

    const lerp = (a, b, t) => a + (b - a) * t;
    const lerpStage = (cur, target, speed) => ({
      x: lerp(cur.x, target.x, speed),
      y: lerp(cur.y, target.y, speed),
      s: lerp(cur.s, target.s, speed),
      o: lerp(cur.o, target.o, speed),
      rot: lerp(cur.rot, target.rot, speed),
    });

    const update = () => {
      const el = scrollRef?.current;
      if (!el) { raf = requestAnimationFrame(update); return; }
      const total = Math.max(1, el.scrollHeight - el.clientHeight);
      const p = Math.min(1, Math.max(0, el.scrollTop / total));

      let target;
      if (route === "/") {
        target = { x: 5 - p * 3, y: 30 + p * 8, s: 0.85 - p * 0.25, o: 0.42 - p * 0.12, rot: -p * 6 };
      } else if (route === "/etude") {
        target = { x: 5 + Math.sin(p * Math.PI) * 5, y: 25 + p * 25, s: 0.65 + p * 0.15, o: 0.45, rot: p * 4 };
      } else if (route === "/expertises") {
        target = { x: 5 + p * 5, y: 15 + p * 40, s: 0.6 + p * 0.2, o: 0.42, rot: -p * 3 };
      } else if (route === "/equipe") {
        target = { x: 5 + p * 5, y: 20 + p * 25, s: 0.65, o: 0.42, rot: 0 };
      } else {
        target = { x: 5, y: 28, s: 0.7 + p * 0.1, o: 0.48, rot: -2 };
      }

      last = lerpStage(last, target, 0.06);
      setStage({ ...last });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [scrollRef, route]);

  return (
    <div aria-hidden style={{
      position: "absolute",
      top: 0, bottom: 0, left: 0, right: 0,
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden",
    }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute",
          right: stage.x + "%",
          top: stage.y + "%",
          transform: `translate(50%, -50%) scale(${stage.s}) rotate(${stage.rot}deg)`,
          transformOrigin: "center",
          opacity: stage.o,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: isHome ? "min(55vh, 55vw)" : "min(80vh, 80vw)",
          lineHeight: 0.7,
          color: isHome ? "var(--gold)" : "var(--dufour)",
          userSelect: "none",
          whiteSpace: "nowrap",
          willChange: "transform, opacity",
        }}>[&amp;]</div>
      </div>
    </div>
  );
}

// ---------- TopNav ----------
function TopNav({ lang, setLang, theme = "light", route, go }) {
  const t = window.I18N[lang];
  const onDark = theme === "dark";
  const fg = onDark ? "var(--ivory)" : "var(--ink)";
  const muted = onDark ? "rgba(245,242,236,0.55)" : "rgba(10,22,40,0.55)";
  const line = onDark ? "var(--line-dark)" : "var(--line)";

  const items = [
    { k: "/", label: t.nav.home },
    { k: "/etude", label: t.nav.etude },
    { k: "/expertises", label: t.nav.expertises },
    { k: "/equipe", label: t.nav.equipe },
    { k: "/contact", label: t.nav.contact },
  ];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 30,
      backdropFilter: "blur(8px)",
      background: onDark ? "rgba(10,22,40,0.85)" : "rgba(245,242,236,0.88)",
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      padding: "20px var(--gutter)",
      borderBottom: `1px solid ${line}`,
      color: fg,
      gap: 24,
    }}>
      {/* Wordmark */}
      <a onClick={() => go("/")} style={{ display: "inline-flex", alignItems: "baseline", gap: 10, cursor: "pointer", justifySelf: "start" }}>
        <span style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 22, letterSpacing: "-0.01em" }}>MERKT</span>
        <span className="amp-mark" style={{ fontSize: 22, color: "var(--gold)" }}>[&amp;]</span>
        <span style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 22, fontStyle: "italic", letterSpacing: "-0.01em", color: muted }}>associés</span>
      </a>

      {/* Nav */}
      <nav style={{ display: "flex", gap: 36, justifyContent: "center" }}>
        {items.map((it) => {
          const active = route === it.k;
          return (
            <a key={it.k} onClick={() => go(it.k)} className="meta" style={{
              color: fg,
              opacity: active ? 1 : 0.65,
              cursor: "pointer",
              position: "relative",
              paddingBottom: 6,
              borderBottom: active ? `1px solid ${fg}` : "1px solid transparent",
              transition: "opacity 200ms, border-color 200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = active ? 1 : 0.65)}
            >{it.label}</a>
          );
        })}
      </nav>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 18 }}>
        <span className="meta" style={{ color: muted, display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--gold)", display: "inline-block",
            animation: "amp-pulse 2.6s ease-in-out infinite",
          }} />
          {t.nowOpen}
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {["fr", "en"].map((l) => (
            <button key={l} onClick={() => setLang(l)} className="meta"
              style={{
                background: "transparent", border: 0, padding: "4px 6px",
                color: lang === l ? fg : muted,
                cursor: "pointer",
                fontWeight: lang === l ? 500 : 400,
                borderBottom: lang === l ? `1px solid ${fg}` : "1px solid transparent",
              }}
            >{l.toUpperCase()}</button>
          ))}
        </div>
      </div>
    </header>
  );
}

// ---------- Footer ----------
function Footer({ lang, go }) {
  const t = window.I18N[lang];
  return (
    <footer style={{
      borderTop: "1px solid var(--line)",
      padding: "64px var(--gutter) 32px",
      background: "var(--paper)",
      position: "relative",
      zIndex: 1,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.01em" }}>MERKT</span>
            <span className="amp-mark" style={{ fontSize: 28, color: "var(--gold)" }}>[&amp;]</span>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: 28, color: "var(--steel)" }}>associés</span>
          </div>
          <p style={{ margin: 0, maxWidth: 360, color: "var(--steel)", fontSize: 14, lineHeight: 1.6 }}>{t.footer.claim}</p>
        </div>
        <div>
          <div className="meta" style={{ color: "var(--steel)", marginBottom: 12 }}>Adresse</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.5 }}>{t.address}</div>
        </div>
        <div>
          <div className="meta" style={{ color: "var(--steel)", marginBottom: 12 }}>Contact</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.8 }}>
            <div>{t.phone}</div>
            <div style={{ color: "var(--steel)" }}>{t.fax}</div>
            <div>{t.email}</div>
          </div>
        </div>
        <div>
          <div className="meta" style={{ color: "var(--steel)", marginBottom: 12 }}>{lang === "fr" ? "Navigation" : "Navigate"}</div>
          <div style={{ display: "grid", gap: 6, fontSize: 14 }}>
            {Object.entries(t.nav).map(([k, label]) => {
              const r = "/" + (k === "home" ? "" : k);
              return <a key={k} onClick={() => go(r)} style={{ cursor: "pointer", color: "var(--ink)" }}>{label}</a>;
            })}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
        <span className="meta" style={{ color: "var(--steel)" }}>{t.footer.legal}</span>
        <span className="meta" style={{ color: "var(--gold)" }}>{t.motto}</span>
      </div>
    </footer>
  );
}

// ---------- Image placeholder (striped) ----------
function ImgSlot({ caption, ratio = "4/3", style = {} }) {
  return (
    <div style={{
      aspectRatio: ratio,
      background: `repeating-linear-gradient(45deg, var(--bone), var(--bone) 12px, var(--paper) 12px, var(--paper) 13px)`,
      border: "1px solid var(--line)",
      display: "flex", alignItems: "center", justifyContent: "center",
      ...style,
    }}>
      <span className="meta" style={{ color: "var(--steel)" }}>{caption}</span>
    </div>
  );
}

Object.assign(window, {
  useReveal, useScrollY,
  Reveal, SplitReveal, Counter,
  AmpWatermark, TopNav, Footer, ImgSlot,
});
