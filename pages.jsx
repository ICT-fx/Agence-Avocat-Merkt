// Page components for the MERKT [&] associés single-page app

const { useState: useS, useEffect: useE, useRef: useR } = React;

// ============================================================
// HOME
// ============================================================
function HomePage({ lang, go }) {
  const t = window.I18N[lang];
  const h = t.home;

  return (
    <div data-screen-label="01 Home" style={{ position: "relative", zIndex: 1 }}>
      {/* HERO */}
      <section data-amp="hero" style={{
        padding: "64px var(--gutter) 80px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "start",
        background: "var(--ivory)",
        position: "relative",
        zIndex: 1,
      }}>
        <div>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 64, fontWeight: 300, color: "var(--gold)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
                <Counter to={1946} dur={1800} />
              </span>
              <span style={{ width: 60, height: 1, background: "var(--ink)" }} />
              <span className="meta" style={{ color: "var(--steel)" }}>{h.kicker}</span>
            </div>
          </Reveal>

          <h1 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(56px, 7.5vw, 120px)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            margin: 0,
          }}>
            <SplitReveal text={h.title_1} />
            <SplitReveal text={h.title_2} baseDelay={140} style={{ fontStyle: "italic", color: "var(--dufour)" }} />
          </h1>

          <Reveal delay={500}>
            <p style={{ marginTop: 48, maxWidth: 460, fontSize: 18, lineHeight: 1.6, color: "var(--ink-2)" }}>
              {h.sub}
            </p>
          </Reveal>

          <Reveal delay={650}>
            <div style={{ marginTop: 56, display: "flex", gap: 16 }}>
              <a onClick={() => go("/contact")} className="meta" style={{
                background: "var(--ink)", color: "var(--ivory)",
                padding: "16px 28px", display: "inline-flex", alignItems: "center", gap: 12, cursor: "pointer",
                transition: "background 200ms",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--dufour)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "var(--ink)"}
              >{t.cta.contact} <span style={{ fontSize: 14 }}>→</span></a>
              <a onClick={() => go("/etude")} className="meta" style={{
                color: "var(--ink)", padding: "16px 0", borderBottom: "1px solid var(--ink)", cursor: "pointer",
              }}>{t.cta.explore}</a>
            </div>
          </Reveal>
        </div>

        {/* Right column */}
        <Reveal delay={300} style={{ marginTop: 80, paddingLeft: 40, borderLeft: "1px solid var(--line)" }}>
          <div className="meta" style={{ color: "var(--steel)", marginBottom: 16 }}>{h.address_label}</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400, lineHeight: 1.25, letterSpacing: "-0.01em", color: "var(--ink)", maxWidth: 320 }}>
            {t.address}
          </div>
          <div style={{ marginTop: 40, display: "grid", gap: 0 }}>
            {[["TÉL", t.phone], ["FAX", t.fax], ["MAIL", t.email]].map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
                <span className="meta" style={{ color: "var(--steel)" }}>{k}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 13 }}>{v}</span>
              </div>
            ))}
          </div>
          {/* Facade photo */}
          <div style={{ marginTop: 32, position: "relative", zIndex: 5, borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "var(--paper)" }}>
            <img
              src="Design sans titre.png"
              alt="15, rue du Général-Dufour — MERKT [&] associés"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.appendChild(Object.assign(document.createElement("div"), { innerHTML: '<span class="meta" style="color:var(--steel);padding:32px;display:flex;align-items:center;justify-content:center;aspect-ratio:4/3">' + h.facade_caption + '</span>' })); }}
            />
          </div>
        </Reveal>
      </section>

      {/* FACTS strip */}
      <section data-amp="facts" style={{
        padding: "40px var(--gutter)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32,
        background: "var(--ivory)",
      }}>
        {h.facts.map((f, i) => (
          <Reveal key={f.k} delay={i * 100}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 64, fontWeight: 300, lineHeight: 1, color: "var(--ink)", letterSpacing: "-0.02em" }}>
              {/^[0-9]+$/.test(f.k) ? <Counter to={f.k} /> : f.k}
            </div>
            <div className="meta" style={{ color: "var(--steel)", marginTop: 12 }}>{f.v}</div>
          </Reveal>
        ))}
      </section>

      {/* MANIFESTO */}
      <section data-amp="manifesto" style={{ padding: "var(--section) var(--gutter)", background: "var(--ivory)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1.5fr", gap: 64, alignItems: "stretch" }}>
          <Reveal>
            <div className="meta" style={{ color: "var(--gold)" }}>— {h.manifesto_eyebrow}</div>
          </Reveal>
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", margin: 0 }}>
              <SplitReveal text={h.manifesto_title} />
            </h2>
            <Reveal delay={400}>
              <p style={{ marginTop: 40, fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, lineHeight: 1.5, color: "var(--ink-2)" }}>
                {h.manifesto_body}
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--line)", minHeight: 320 }}>
            <img
              src="uploads/facade-2.png"
              alt="15, rue du Général-Dufour — MERKT [&] associés"
              style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
            />
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section data-amp="pillars" style={{
        padding: "var(--section) var(--gutter)",
        background: "var(--paper)",
        borderTop: "1px solid var(--line)",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 64 }}>
          <div>
            <Reveal>
              <div className="meta" style={{ color: "var(--steel)", marginBottom: 16 }}>{h.pillars_eyebrow}</div>
            </Reveal>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", margin: 0, fontStyle: "italic", color: "var(--dufour)" }}>
              <SplitReveal text={h.pillars_title} />
            </h2>
          </div>
          <Reveal delay={300}>
            <a onClick={() => go("/expertises")} className="meta" style={{ borderBottom: "1px solid var(--ink)", paddingBottom: 4, cursor: "pointer" }}>{t.cta.all} →</a>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, position: "relative", zIndex: 5 }}>
          {t.expertises.pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 80} style={{ background: "var(--paper)", borderRadius: 16, border: "1px solid var(--line)", overflow: "hidden" }}>
              <div
                onClick={() => go("/expertises")}
                style={{
                  padding: "40px 32px", cursor: "pointer", height: "100%",
                  transition: "background 280ms",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "var(--dufour)";
                  el.querySelectorAll(".pillar-num").forEach(c => c.style.color = "rgba(255,255,255,0.55)");
                  el.querySelectorAll(".pillar-title").forEach(c => c.style.color = "#fff");
                  el.querySelectorAll(".pillar-desc").forEach(c => c.style.color = "rgba(255,255,255,0.75)");
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "";
                  el.querySelectorAll(".pillar-num").forEach(c => c.style.color = "");
                  el.querySelectorAll(".pillar-title").forEach(c => c.style.color = "");
                  el.querySelectorAll(".pillar-desc").forEach(c => c.style.color = "");
                }}
              >
                <div className="meta pillar-num" style={{ color: "var(--gold)", marginBottom: 20, transition: "color 280ms" }}>{p.n}</div>
                <h3 className="pillar-title" style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400, margin: 0, lineHeight: 1.15, letterSpacing: "-0.01em", transition: "color 280ms" }}>{p.t}</h3>
                <p className="pillar-desc" style={{ marginTop: 16, fontSize: 14, lineHeight: 1.6, color: "var(--steel)", transition: "color 280ms" }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============================================================
// ETUDE
// ============================================================
function EtudePage({ lang, go }) {
  const t = window.I18N[lang];
  const e = t.etude;
  return (
    <div data-screen-label="02 Etude" style={{ position: "relative", zIndex: 1 }}>
      <section style={{ padding: "var(--section) var(--gutter) 80px" }}>
        <Reveal>
          <div className="meta" style={{ color: "var(--gold)", marginBottom: 24 }}>— {e.eyebrow}</div>
        </Reveal>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(56px, 8vw, 128px)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0, maxWidth: "16ch" }}>
          <SplitReveal text={e.title} />
        </h1>
        <Reveal delay={500}>
          <p style={{ marginTop: 56, fontFamily: "var(--serif)", fontSize: 24, fontWeight: 300, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 720 }}>
            {e.lede}
          </p>
        </Reveal>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "var(--section) var(--gutter)", borderTop: "1px solid var(--line)" }}>
        <Reveal>
          <div className="meta" style={{ color: "var(--steel)", marginBottom: 64 }}>{lang === "fr" ? "Chronologie" : "Timeline"}</div>
        </Reveal>
        <div style={{ display: "grid", gap: 0 }}>
          {e.timeline.map((row, i) => (
            <Reveal key={row.y} delay={i * 60}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: 48,
                padding: "32px 0",
                borderTop: "1px solid var(--line)",
                alignItems: "baseline",
              }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 44, fontWeight: 300, color: "var(--gold)", letterSpacing: "-0.02em", lineHeight: 1 }}>{row.y}</div>
                <p style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, lineHeight: 1.45, color: "var(--ink)", maxWidth: 720 }}>{row.t}</p>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "var(--section) var(--gutter)", background: "var(--paper)", borderTop: "1px solid var(--line)" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", margin: 0, marginBottom: 64, fontStyle: "italic", color: "var(--dufour)" }}>
            {e.values_title}.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
          {e.values.map((v, i) => (
            <Reveal key={v.k} delay={i * 80} style={{ background: "var(--paper)" }}>
              <div style={{ padding: "48px 32px" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>{v.k}</h3>
                <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6, color: "var(--steel)", maxWidth: 480 }}>{v.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <p style={{ marginTop: 64, maxWidth: 720, fontSize: 14, lineHeight: 1.7, color: "var(--steel)", fontStyle: "italic" }}>
            {e.affiliations}
          </p>
        </Reveal>
      </section>
    </div>
  );
}

// ============================================================
// EXPERTISES
// ============================================================
function ExpertisesPage({ lang, go }) {
  const t = window.I18N[lang];
  const ex = t.expertises;
  const [open, setOpen] = useS(0);

  return (
    <div data-screen-label="03 Expertises" style={{ position: "relative", zIndex: 1 }}>
      <section style={{ padding: "var(--section) var(--gutter) 80px" }}>
        <Reveal>
          <div className="meta" style={{ color: "var(--gold)", marginBottom: 24 }}>— {ex.eyebrow}</div>
        </Reveal>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(56px, 8vw, 128px)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0, maxWidth: "14ch" }}>
          <SplitReveal text={ex.title} />
        </h1>
        <Reveal delay={500}>
          <p style={{ marginTop: 56, fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 720 }}>
            {ex.lede}
          </p>
        </Reveal>
      </section>

      <section style={{ padding: "0 var(--gutter) var(--section)" }}>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {ex.pillars.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={p.n} delay={i * 50}>
                <div
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    borderBottom: "1px solid var(--line)",
                    padding: isOpen ? "48px 0" : "32px 0",
                    cursor: "pointer",
                    transition: "padding 700ms cubic-bezier(.22,1,.36,1)",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", gap: 32, alignItems: "baseline" }}>
                    <span className="meta" style={{ color: "var(--gold)", fontSize: 14 }}>{p.n}</span>
                    <h3 style={{
                      fontFamily: "var(--serif)",
                      fontSize: isOpen ? "clamp(48px, 5vw, 72px)" : "clamp(32px, 3.5vw, 48px)",
                      fontWeight: 400,
                      margin: 0,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      color: isOpen ? "var(--dufour)" : "var(--ink)",
                      fontStyle: isOpen ? "italic" : "normal",
                      transition: "font-size 800ms cubic-bezier(.22,1,.36,1), color 600ms ease, font-style 600ms ease",
                    }}>{p.t}</h3>
                    <span className="meta" style={{ color: "var(--steel)" }}>
                      {isOpen ? "—" : "+"}
                    </span>
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 800ms cubic-bezier(.22,1,.36,1)",
                    overflow: "hidden",
                  }}>
                    <div style={{ minHeight: 0 }}>
                      <div style={{ paddingTop: 32, display: "grid", gridTemplateColumns: "100px 1fr 1fr", gap: 32 }}>
                        <span />
                        <p style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 20, fontWeight: 300, lineHeight: 1.55, color: "var(--ink-2)" }}>{p.d}</p>
                        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
                          {p.items.map((it) => (
                            <li key={it} className="meta" style={{ color: "var(--steel)", fontSize: 12, paddingLeft: 16, position: "relative" }}>
                              <span style={{ position: "absolute", left: 0, color: "var(--gold)" }}>—</span>
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}

const PHOTO_POS = {
  hurtado: "65% top",
  asmar:   "center 35%",
  jordan:  "center 35%",
};

function MemberPhoto({ slug, firstName }) {
  const [err, setErr] = useS(false);
  const photo = slug ? `uploads/${slug}.jpg` : null;
  const pos = PHOTO_POS[slug] || "center top";
  if (!photo || err) return <ImgSlot caption={`[ portrait · ${firstName} ]`} ratio="3/4" style={{ marginBottom: 20 }} />;
  return (
    <div style={{ aspectRatio: "3/4", overflow: "hidden", marginBottom: 20 }}>
      <img src={photo} alt={firstName} onError={() => setErr(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, display: "block" }} />
    </div>
  );
}

// ============================================================
// EQUIPE
// ============================================================
function EquipePage({ lang, go }) {
  const t = window.I18N[lang];
  const eq = t.equipe;

  return (
    <div data-screen-label="04 Equipe" style={{ position: "relative", zIndex: 1 }}>
      <section style={{ padding: "var(--section) var(--gutter) 80px" }}>
        <Reveal>
          <div className="meta" style={{ color: "var(--gold)", marginBottom: 24 }}>— {eq.eyebrow}</div>
        </Reveal>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(56px, 8vw, 128px)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0 }}>
          <SplitReveal text={eq.title} />
        </h1>
        <Reveal delay={500}>
          <p style={{ marginTop: 56, fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 720 }}>
            {eq.lede}
          </p>
        </Reveal>
      </section>

      {eq.groups.map((g, gi) => (
        <section key={g.k} style={{
          padding: "80px var(--gutter)",
          borderTop: "1px solid var(--line)",
          background: gi % 2 ? "var(--paper)" : "var(--ivory)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 64, alignItems: "start" }}>
            <Reveal>
              <div className="meta" style={{ color: "var(--gold)" }}>{String(gi + 1).padStart(2, "0")}</div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 400, fontStyle: "italic", color: "var(--dufour)", letterSpacing: "-0.02em", lineHeight: 1.05, margin: "16px 0 0" }}>{g.k}</h2>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
              {g.members.map((m, mi) => (
                <Reveal key={m.n} delay={mi * 60}>
                  <article
                    onClick={m.slug ? () => go(`/equipe/${m.slug}`) : undefined}
                    style={{ borderTop: "1px solid var(--ink)", paddingTop: 16, cursor: m.slug ? "pointer" : "default" }}
                  >
                    <MemberPhoto slug={m.slug} firstName={m.n.split(" ")[0]} />
                    <h3 style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, letterSpacing: "-0.005em" }}>{m.n}</h3>
                    <div className="meta" style={{ color: "var(--steel)", marginTop: 8 }}>{m.r}</div>
                    <a href={`mailto:${m.e}`} onClick={(e) => e.stopPropagation()} style={{ marginTop: 12, display: "inline-block", fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink)", borderBottom: "1px solid var(--line)", paddingBottom: 2 }}>{m.e}</a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

// ============================================================
// CONTACT
// ============================================================
function ContactPage({ lang }) {
  const t = window.I18N[lang];
  const c = t.contact;
  const [sent, setSent] = useS(false);

  return (
    <div data-screen-label="05 Contact" style={{ position: "relative", zIndex: 1 }}>
      <section style={{ padding: "var(--section) var(--gutter) 80px" }}>
        <Reveal>
          <div className="meta" style={{ color: "var(--gold)", marginBottom: 24 }}>— {c.eyebrow}</div>
        </Reveal>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(56px, 8vw, 128px)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0 }}>
          <SplitReveal text={c.title} />
        </h1>
        <Reveal delay={500}>
          <p style={{ marginTop: 48, fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 600 }}>
            {c.lede}
          </p>
        </Reveal>
      </section>

      <section style={{ padding: "0 var(--gutter) var(--section)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "start" }}>
          {/* Left — coords + hours */}
          <Reveal>
            <div style={{ borderTop: "1px solid var(--ink)", paddingTop: 24 }}>
              <div className="meta" style={{ color: "var(--steel)", marginBottom: 16 }}>{lang === "fr" ? "Adresse" : "Address"}</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400, lineHeight: 1.3, letterSpacing: "-0.01em", maxWidth: 320 }}>{t.address}</div>
            </div>
            <div style={{ marginTop: 48 }}>
              {[["TÉL", t.phone], ["FAX", t.fax], ["MAIL", t.email]].map(([k, v]) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
                  <span className="meta" style={{ color: "var(--steel)" }}>{k}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 13 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 48 }}>
              <div className="meta" style={{ color: "var(--steel)", marginBottom: 16 }}>{c.hours_label}</div>
              {c.hours.map((h) => (
                <div key={h.d} style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: 16 }}>{h.d}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--steel)" }}>{h.h}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 48 }}>
              <ImgSlot caption={lang === "fr" ? "[ plan · Place Neuve ]" : "[ map · Place Neuve ]"} ratio="4/3" />
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={200}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 40, fontWeight: 400, fontStyle: "italic", color: "var(--dufour)", letterSpacing: "-0.02em", margin: 0, marginBottom: 32 }}>{c.form_title}</h2>

            {sent ? (
              <div style={{ padding: 32, border: "1px solid var(--gold)", background: "var(--paper)" }}>
                <div className="meta" style={{ color: "var(--gold)", marginBottom: 12 }}>✓ {lang === "fr" ? "Message envoyé" : "Message sent"}</div>
                <p style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 20, fontWeight: 300, lineHeight: 1.45 }}>{c.sent}</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "grid", gap: 24 }}>
                {[
                  ["name", c.form.name, "text"],
                  ["email", c.form.email, "email"],
                  ["subject", c.form.subject, "text"],
                ].map(([k, label, type]) => (
                  <label key={k} style={{ display: "block" }}>
                    <span className="meta" style={{ color: "var(--steel)", display: "block", marginBottom: 8 }}>{label}</span>
                    <input type={type} required style={{
                      width: "100%", padding: "14px 0", border: 0,
                      borderBottom: "1px solid var(--line)",
                      background: "transparent", fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)",
                      outline: "none",
                    }}
                    onFocus={(e) => e.currentTarget.style.borderBottomColor = "var(--ink)"}
                    onBlur={(e) => e.currentTarget.style.borderBottomColor = "var(--line)"}
                    />
                  </label>
                ))}
                <label>
                  <span className="meta" style={{ color: "var(--steel)", display: "block", marginBottom: 8 }}>{c.form.message}</span>
                  <textarea required rows={5} style={{
                    width: "100%", padding: "14px 0", border: 0,
                    borderBottom: "1px solid var(--line)",
                    background: "transparent", fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)",
                    outline: "none", resize: "vertical",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = "var(--ink)"}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = "var(--line)"}
                  />
                </label>
                <p style={{ margin: 0, fontSize: 12, color: "var(--steel)", fontStyle: "italic", lineHeight: 1.5, maxWidth: 540 }}>
                  {c.form.confidential}
                </p>
                <button type="submit" className="meta" style={{
                  background: "var(--ink)", color: "var(--ivory)",
                  padding: "18px 32px", border: 0, cursor: "pointer", justifySelf: "start",
                  display: "inline-flex", alignItems: "center", gap: 12,
                  transition: "background 200ms",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--dufour)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "var(--ink)"}
                >{c.form.submit} <span>→</span></button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// AVOCAT (profil individuel)
// ============================================================
function AvocatPage({ lang, go, slug }) {
  const t = window.I18N[lang];
  const a = t.avocats?.[slug];
  const [imgError, setImgError] = useS(false);

  if (!a) return (
    <div style={{ padding: "var(--section) var(--gutter)" }}>
      <a onClick={() => go("/equipe")} className="meta" style={{ color: "var(--steel)", cursor: "pointer" }}>← {t.nav.equipe}</a>
    </div>
  );

  return (
    <div data-screen-label="Profil" style={{ position: "relative", zIndex: 1 }}>
      <section style={{ padding: "var(--section) var(--gutter)" }}>
        <Reveal>
          <a onClick={() => go("/equipe")} className="meta" style={{ color: "var(--steel)", cursor: "pointer", display: "inline-block", marginBottom: 56 }}>← {t.nav.equipe}</a>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>

          {/* ── Colonne gauche ── */}
          <div>
            <Reveal>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--line)" }}>
                {imgError
                  ? <ImgSlot caption={`[ portrait · ${a.name.split(" ")[0]} ]`} ratio="3/4" />
                  : <img src={a.photo} alt={a.name} onError={() => setImgError(true)}
                      style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "3/4" }} />
                }
              </div>
            </Reveal>

            <div style={{ height: 1, background: "var(--line)", margin: "32px 0" }} />

            <Reveal delay={100}>
              <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 400, margin: 0, letterSpacing: "-0.01em", textAlign: "center" }}>{a.name}</h1>
            </Reveal>

            <Reveal delay={180}>
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <div className="meta" style={{ color: "var(--steel)" }}>{a.role}</div>
                {a.credentials.map(c => (
                  <div key={c} className="meta" style={{ color: "var(--steel)" }}>{c}</div>
                ))}
                <div className="meta" style={{ color: "var(--steel)" }}>{a.location}</div>
                <a href={`mailto:${a.email}`} style={{ marginTop: 12, display: "inline-block", fontFamily: "var(--mono)", fontSize: 12, color: "var(--dufour)", borderBottom: "1px solid var(--line)", paddingBottom: 2 }}>{a.email}</a>
              </div>
            </Reveal>
          </div>

          {/* ── Colonne droite ── */}
          <div style={{ paddingTop: 8 }}>
            {a.bio.map((para, i) => (
              <Reveal key={i} delay={i * 80}>
                <p style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 300, lineHeight: 1.75, color: "var(--ink-2)", margin: 0, marginBottom: 28, textAlign: "justify" }}>{para}</p>
              </Reveal>
            ))}

            {a.domains && (
              <Reveal delay={380}>
                <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 500, color: "var(--dufour)", marginBottom: 8 }}>{a.domains_label}</div>
                  <p className="meta" style={{ margin: 0, color: "var(--steel)", lineHeight: 1.7 }}>{a.domains}</p>
                </div>
              </Reveal>
            )}
            {a.languages && a.languages.length > 0 && (
              <Reveal delay={400}>
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: a.domains ? "none" : "1px solid var(--line)" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 500, color: "var(--dufour)", marginBottom: 8 }}>{a.languages_label}</div>
                  <p className="meta" style={{ margin: 0, color: "var(--steel)" }}>{a.languages.join(", ")}.</p>
                </div>
              </Reveal>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomePage, EtudePage, ExpertisesPage, EquipePage, ContactPage, AvocatPage });
