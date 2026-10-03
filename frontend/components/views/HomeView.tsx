/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function HomeView({ v }: { v: any }) {
  return (
    <>
    <section aria-labelledby="hero-h" data-screen-label="Home" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(40px,6vw,88px) clamp(20px,4vw,48px) clamp(56px,7vw,104px)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(40px,5vw,72px)" }}>
        <div style={{ flex: "1 1 420px", minWidth: "0", maxWidth: "600px" }}>
          <p style={{ margin: "0 0 20px", display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1769AA" }}>
            <span aria-hidden="true" style={{ width: "28px", height: "2px", background: "#1769AA", borderRadius: "2px" }}></span>
            Learning center · Newark, Delaware
          </p>
          <h1 id="hero-h" style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(40px,5.6vw,72px)", lineHeight: "1.02", letterSpacing: "-0.035em", color: "#17324D", textWrap: "balance" }}>
            A calm, organized place for students to learn.
          </h1>
          <p style={{ margin: "24px 0 0", fontSize: "clamp(17px,1.4vw,19px)", lineHeight: "1.6", color: "#3F5770", maxWidth: "520px", textWrap: "pretty" }}>
            Bluebird Learning Center offers programs and courses for students in Newark. Explore what’s available, meet the teachers, and send a registration request in a few minutes.
          </p>
          <div style={{ marginTop: "36px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <button className="hv-fc6147" onClick={v.go.programs} style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#1769AA", color: "#fff", border: "0", borderRadius: "999px", padding: "0 28px", minHeight: "54px", fontWeight: "600", fontSize: "16px", transition: "transform .2s ease, background .2s ease" }}>
              {"Explore Programs "}
              <span aria-hidden="true">
                →
              </span>
            </button>
            <button className="hv-0b0160" onClick={v.go.register} style={{ background: "transparent", color: "#17324D", border: "1.5px solid rgba(23,50,77,0.25)", borderRadius: "999px", padding: "0 26px", minHeight: "54px", fontWeight: "600", fontSize: "16px", transition: "background .2s ease, border-color .2s ease" }}>
              Register / Inquire
            </button>
          </div>
          <dl style={{ margin: "44px 0 0", display: "flex", flexWrap: "wrap", gap: "12px 36px", paddingTop: "24px", borderTop: "1px solid rgba(23,50,77,0.12)" }}>
            <div>
              <dt style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4A6178" }}>
                Location
              </dt>
              <dd style={{ margin: "6px 0 0", fontWeight: "600", fontSize: "15px" }}>
                {v.st.city || 'Newark, DE'}
              </dd>
            </div>
            <div>
              <dt style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4A6178" }}>
                Hours
              </dt>
              <dd style={{ margin: "6px 0 0", fontWeight: "600", fontSize: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
                {v.st.hours || 'To be published'}
                {v.showMarkers && !v.st.hours && (
                  <>
                    <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "10px", letterSpacing: "0.06em", padding: "3px 6px", borderRadius: "5px", background: "#FCE6DF", color: "#8A3B26" }}>
                      TO CONFIRM
                    </span>
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4A6178" }}>
                Questions first?
              </dt>
              <dd style={{ margin: "6px 0 0" }}>
                <button onClick={v.go.contact} style={{ background: "none", border: "0", padding: "0", fontWeight: "600", fontSize: "15px", color: "#1769AA", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Send an inquiry
                </button>
              </dd>
            </div>
          </dl>
        </div>
        <div style={{ flex: "1 1 440px", minWidth: "0", position: "relative", height: "clamp(420px,46vw,600px)" }} onMouseEnter={v.heroEnter} onMouseLeave={v.heroLeave}>
          <svg aria-hidden="true" viewBox="0 0 220 90" style={{ position: "absolute", right: "-8px", top: "-30px", width: "220px", height: "90px", overflow: "visible" }}>
            <path d="M4 80 C 70 10, 150 6, 216 44" fill="none" stroke="#1769AA" strokeWidth="1.6" strokeDasharray="3 7" strokeLinecap="round"></path>
            <circle cx="216" cy="44" r="5" fill="#1769AA"></circle>
          </svg>
          <div style={{ position: "absolute", top: "0", right: "0", bottom: "56px", left: "clamp(28px,5vw,64px)", borderRadius: "32px 32px 32px 120px", overflow: "hidden", background: "#DDEFFC" }} role="group" aria-roledescription="carousel" aria-label="Life at Bluebird">
            {v.heroSlides.map((s: any, i_s: number) => (
              <Fragment key={i_s}>
                <img src={s.src} alt={s.alt} aria-hidden={s.hidden} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: s.pos, opacity: s.opacity, transform: s.transform, transition: "opacity 1.6s ease, transform 9s linear" }} />
              </Fragment>
            ))}
            <div style={{ position: "absolute", right: "16px", bottom: "16px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.92)", borderRadius: "999px", padding: "6px 6px 6px 14px" }}>
              {v.heroSlides.map((s: any, i_s: number) => (
                <Fragment key={i_s}>
                  <button onClick={s.select} aria-label={s.label} aria-current={s.current} style={{ width: "28px", height: "28px", border: "0", background: "none", padding: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ display: "block", height: "6px", width: s.dotW, borderRadius: "6px", background: s.dotBg, transition: "width .3s ease" }}></span>
                  </button>
                </Fragment>
              ))}
              <button onClick={v.toggleHero} aria-label={v.heroToggleLabel} style={{ height: "32px", padding: "0 12px", borderRadius: "999px", border: "0", background: "#17324D", color: "#fff", fontSize: "12px", fontWeight: "600", marginLeft: "4px" }}>
                {v.heroToggleText}
              </button>
            </div>
          </div>
          <div style={{ position: "absolute", left: "0", bottom: "0", width: "min(46%,260px)", aspectRatio: "4/3", borderRadius: "22px", overflow: "hidden", border: "6px solid #FFF9F0", boxShadow: "0 14px 40px rgba(23,50,77,0.14)" }}>
            <img src="/assets/writing.webp" alt="Students writing at their desks during a lesson" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div aria-hidden="true" style={{ position: "absolute", left: "clamp(8px,2vw,24px)", top: "36px", width: "56px", height: "56px", borderRadius: "50% 50% 50% 10px", background: "#F6B6A5" }}></div>
          <div aria-hidden="true" style={{ position: "absolute", left: "clamp(56px,7vw,92px)", top: "104px", width: "22px", height: "22px", borderRadius: "50%", background: "#DDF3E8", border: "2px solid #FFF9F0" }}></div>
        </div>
      </div>
    </section>
    <section aria-labelledby="h-programs" style={{ background: "#fff" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px 48px", marginBottom: "44px" }}>
          <div style={{ maxWidth: "560px" }}>
            <p style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1769AA" }}>
              Programs
            </p>
            <h2 id="h-programs" style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(30px,3.6vw,46px)", lineHeight: "1.08", letterSpacing: "-0.025em", textWrap: "balance" }}>
              Find the right starting point.
            </h2>
          </div>
          <p style={{ margin: "0", maxWidth: "400px", fontSize: "17px", lineHeight: "1.6", color: "#3F5770" }}>
            Each program groups related courses so it’s easier to see what fits your student.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <article style={{ flex: "1.35 1 460px", minWidth: "0", borderRadius: "28px", overflow: "hidden", background: "#17324D", color: "#fff", display: "flex", flexDirection: "column", minHeight: "520px" }}>
            <div style={{ position: "relative", flex: "1", minHeight: "260px", overflow: "hidden" }}>
              <img className="hv-f74989" src="/assets/reading.webp" alt="Students reading books at their desks" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", transition: "transform .8s ease" }} />
            </div>
            <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "14px", color: "#9CCBF0" }}>
                  {v.featuredProgram.code}
                </span>
                {v.showMarkers && (
                  <>
                    <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "10px", letterSpacing: "0.06em", padding: "3px 6px", borderRadius: "5px", background: "#FCE6DF", color: "#8A3B26" }}>
                      PLACEHOLDER NAME
                    </span>
                  </>
                )}
              </div>
              <h3 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "30px", letterSpacing: "-0.02em" }}>
                {v.featuredProgram.name}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#D5E3F0", maxWidth: "520px" }}>
                {v.featuredProgram.short}
              </p>
              <button className="hv-e1dfb4" onClick={v.featuredProgram.open} style={{ alignSelf: "flex-start", marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "10px", background: "#fff", color: "#17324D", border: "0", borderRadius: "999px", padding: "0 22px", minHeight: "48px", fontWeight: "600", fontSize: "15px", transition: "transform .2s ease" }}>
                {"View Program "}
                <span aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </article>
          <div style={{ flex: "1 1 360px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
            {v.otherPrograms.map((p: any, i_p: number) => (
              <Fragment key={i_p}>
                <article className="hv-882cb5" style={{ flex: "1", borderRadius: "24px", padding: "28px", background: p.bg, display: "flex", gap: "20px", alignItems: "flex-start", justifyContent: "space-between", transition: "transform .25s ease" }}>
                  <div style={{ minWidth: "0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "14px", color: "#1769AA" }}>
                        {p.code}
                      </span>
                      {v.showMarkers && (
                        <>
                          <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "10px", letterSpacing: "0.06em", padding: "3px 6px", borderRadius: "5px", background: "#fff", color: "#8A3B26" }}>
                            PLACEHOLDER
                          </span>
                        </>
                      )}
                    </div>
                    <h3 style={{ margin: "8px 0 8px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "22px", letterSpacing: "-0.015em" }}>
                      {p.name}
                    </h3>
                    <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.55", color: "#3F5770" }}>
                      {p.short}
                    </p>
                  </div>
                  <button className="hv-5e647a" onClick={p.open} aria-label={p.ariaView} style={{ flex: "none", width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid rgba(23,50,77,0.2)", background: "#fff", color: "#17324D", fontSize: "18px", transition: "background .2s ease, color .2s ease" }}>
                    →
                  </button>
                </article>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section aria-labelledby="h-courses" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px)", display: "flex", flexWrap: "wrap", gap: "40px 72px" }}>
        <div style={{ flex: "1 1 300px", maxWidth: "380px" }}>
          <p style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1769AA" }}>
            Courses
          </p>
          <h2 id="h-courses" style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(30px,3.6vw,46px)", lineHeight: "1.08", letterSpacing: "-0.025em" }}>
            Browse current courses.
          </h2>
          <p style={{ margin: "18px 0 28px", fontSize: "17px", lineHeight: "1.6", color: "#3F5770" }}>
            Filter by program, open a course to see its details, or go straight to registration.
          </p>
          <div role="group" aria-label="Filter courses by program" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {v.homeChips.map((c: any, i_c: number) => (
              <Fragment key={i_c}>
                <button onClick={c.onClick} aria-pressed={c.active} style={{ minHeight: "44px", padding: "0 16px", borderRadius: "999px", border: `1.5px solid ${c.border}`, background: c.bg, color: c.color, fontSize: "14px", fontWeight: "600", transition: "background .2s ease" }}>
                  {c.label}
                </button>
              </Fragment>
            ))}
          </div>
          <button className="hv-6e69db" onClick={v.go.courses} style={{ marginTop: "32px", background: "none", border: "0", padding: "8px 0", minHeight: "44px", fontWeight: "600", fontSize: "16px", color: "#1769AA", display: "inline-flex", gap: "8px", alignItems: "center" }}>
            {"View all courses "}
            <span aria-hidden="true">
              →
            </span>
          </button>
        </div>
        <ul style={{ flex: "2 1 520px", minWidth: "0", listStyle: "none", margin: "0", padding: "0", borderTop: "1.5px solid #17324D" }}>
          {v.homeCourses.map((c: any, i_c: number) => (
            <Fragment key={i_c}>
              <li style={{ borderBottom: "1px solid rgba(23,50,77,0.14)" }}>
                <div className="hv-a0f31a" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 28px", padding: "26px 4px", transition: "background .2s ease" }}>
                  <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", padding: "5px 10px", borderRadius: "999px", background: c.programBg, color: "#17324D" }}>
                        {c.programName}
                      </span>
                      <span style={{ fontSize: "13px", color: "#4A6178" }}>
                        {c.schedule}
                      </span>
                    </div>
                    <h3 style={{ margin: "0 0 6px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "21px", letterSpacing: "-0.01em" }}>
                      {c.name}
                    </h3>
                    <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.55", color: "#3F5770" }}>
                      {c.desc}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button className="hv-99018e" onClick={c.open} aria-label={c.ariaView} style={{ minHeight: "46px", padding: "0 18px", borderRadius: "999px", border: "1.5px solid rgba(23,50,77,0.22)", background: "#fff", color: "#17324D", fontWeight: "600", fontSize: "14px" }}>
                      View Course
                    </button>
                    <button className="hv-9190d4" onClick={c.register} aria-label={c.ariaReg} style={{ minHeight: "46px", padding: "0 18px", borderRadius: "999px", border: "0", background: "#DDEFFC", color: "#0F4F82", fontWeight: "600", fontSize: "14px" }}>
                      Register
                    </button>
                  </div>
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
    <section aria-labelledby="h-teachers" style={{ background: "#fff" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 48px", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
          <div style={{ maxWidth: "620px" }}>
            <p style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1769AA" }}>
              Teachers
            </p>
            <h2 id="h-teachers" style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(30px,3.6vw,46px)", lineHeight: "1.08", letterSpacing: "-0.025em" }}>
              The people your student will learn with.
            </h2>
          </div>
          <button onClick={v.go.teachers} style={{ background: "none", border: "0", padding: "8px 0", minHeight: "44px", fontWeight: "600", fontSize: "16px", color: "#1769AA", display: "inline-flex", gap: "8px" }}>
            {"Meet the team "}
            <span aria-hidden="true">
              →
            </span>
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "24px" }}>
          {v.teachers.map((t: any, i_t: number) => (
            <Fragment key={i_t}>
              <article style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: t.offset }}>
                <div role="img" aria-label="Teacher portrait placeholder" style={{ aspectRatio: "4/5", borderRadius: "24px 24px 24px 72px", background: "repeating-linear-gradient(135deg,#E6EEF5 0 10px,#F1F5F9 10px 20px)", display: "flex", alignItems: "flex-end", padding: "16px" }}>
                  <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "11px", color: "#4A6178", background: "rgba(255,255,255,0.85)", padding: "4px 8px", borderRadius: "6px" }}>
                    teacher portrait
                  </span>
                </div>
                <div>
                  <h3 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "20px" }}>
                    {t.name}
                  </h3>
                  <p style={{ margin: "4px 0 0", fontSize: "15px", color: "#4A6178" }}>
                    {t.role}
                  </p>
                </div>
                <button onClick={t.open} aria-label={t.ariaView} style={{ alignSelf: "flex-start", background: "none", border: "0", padding: "6px 0", minHeight: "44px", fontWeight: "600", fontSize: "15px", color: "#1769AA", display: "inline-flex", gap: "8px" }}>
                  {"View Profile "}
                  <span aria-hidden="true">
                    →
                  </span>
                </button>
              </article>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
    <section aria-labelledby="h-why" style={{ background: "#17324D", color: "#fff", position: "relative", overflow: "hidden" }}>
      <svg aria-hidden="true" viewBox="0 0 600 200" preserveAspectRatio="none" style={{ position: "absolute", right: "-40px", top: "40px", width: "600px", height: "200px", opacity: "0.5" }}>
        <path d="M0 180 C 180 40, 380 20, 600 90" fill="none" stroke="#5FA4DC" strokeWidth="1.5" strokeDasharray="3 8"></path>
      </svg>
      <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px)", display: "flex", flexWrap: "wrap", gap: "48px 80px" }}>
        <div style={{ flex: "1 1 320px", maxWidth: "420px" }}>
          <p style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CCBF0" }}>
            Our approach
          </p>
          <h2 id="h-why" style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(30px,3.6vw,46px)", lineHeight: "1.08", letterSpacing: "-0.025em" }}>
            How Bluebird works with students.
          </h2>
          <p style={{ margin: "20px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#C9D9E8" }}>
            The themes below describe the center’s intended approach. Wording will be finalized with Bluebird before launch.
          </p>
          {v.showMarkers && (
            <>
              <p style={{ margin: "20px 0 0", display: "inline-block", fontFamily: "ui-monospace,Menlo,monospace", fontSize: "11px", letterSpacing: "0.06em", padding: "5px 8px", borderRadius: "6px", background: "#FCE6DF", color: "#8A3B26" }}>
                DRAFT THEMES — CONFIRM WITH CLIENT
              </p>
            </>
          )}
        </div>
        <ol style={{ flex: "2 1 520px", minWidth: "0", listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "0 40px" }}>
          {v.whyThemes.map((w: any, i_w: number) => (
            <Fragment key={i_w}>
              <li style={{ padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.18)", display: "flex", gap: "20px" }}>
                <span aria-hidden="true" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "15px", color: "#F6B6A5", minWidth: "28px" }}>
                  {w.n}
                </span>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "21px" }}>
                    {w.title}
                  </h3>
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#C9D9E8" }}>
                    {w.body}
                  </p>
                </div>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
    <section aria-labelledby="h-cta" style={{ background: "#DDEFFC" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(56px,7vw,96px) clamp(20px,4vw,48px)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px" }}>
        <div style={{ flex: "1 1 360px", position: "relative", minHeight: "340px" }}>
          <div style={{ position: "absolute", inset: "0 18% 0 0", borderRadius: "28px 120px 28px 28px", overflow: "hidden" }}>
            <img src="/assets/tutor.webp" alt="A teacher guiding a student through a writing exercise" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          </div>
          <div aria-hidden="true" style={{ position: "absolute", right: "4%", bottom: "28px", width: "30%", aspectRatio: "1", borderRadius: "50%", background: "#DDF3E8", border: "8px solid #DDEFFC" }}></div>
          <div aria-hidden="true" style={{ position: "absolute", right: "20%", top: "20px", width: "40px", height: "40px", borderRadius: "50% 50% 50% 8px", background: "#F6B6A5" }}></div>
        </div>
        <div style={{ flex: "1 1 400px", maxWidth: "540px" }}>
          <h2 id="h-cta" style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(32px,4vw,52px)", lineHeight: "1.05", letterSpacing: "-0.03em", textWrap: "balance" }}>
            Ready when you are.
          </h2>
          <p style={{ margin: "18px 0 32px", fontSize: "18px", lineHeight: "1.6", color: "#2E4A66" }}>
            Send a short registration request — the center will follow up with next steps.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <button className="hv-fc6147" onClick={v.go.register} style={{ background: "#1769AA", color: "#fff", border: "0", borderRadius: "999px", padding: "0 28px", minHeight: "54px", fontWeight: "600", fontSize: "16px", transition: "transform .2s ease" }}>
              Register Now
            </button>
            <button className="hv-b1ef8a" onClick={v.go.contact} style={{ background: "#fff", color: "#17324D", border: "0", borderRadius: "999px", padding: "0 26px", minHeight: "54px", fontWeight: "600", fontSize: "16px" }}>
              Ask a Question
            </button>
          </div>
        </div>
      </div>
    </section>
    <section aria-labelledby="h-faq" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", marginBottom: "32px" }}>
          <h2 id="h-faq" style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(30px,3.6vw,46px)", lineHeight: "1.08", letterSpacing: "-0.025em" }}>
            Common questions
          </h2>
          <button onClick={v.go.faq} style={{ background: "none", border: "0", padding: "8px 0", minHeight: "44px", fontWeight: "600", fontSize: "16px", color: "#1769AA" }}>
            All FAQs →
          </button>
        </div>
        <div role="group" aria-label="FAQ categories" style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px", marginBottom: "12px" }}>
          {v.homeFaqTabs.map((c: any, i_c: number) => (
            <Fragment key={i_c}>
              <button onClick={c.onClick} aria-pressed={c.active} style={{ flex: "none", minHeight: "44px", padding: "0 18px", borderRadius: "999px", border: `1.5px solid ${c.border}`, background: c.bg, color: c.color, fontSize: "14px", fontWeight: "600" }}>
                {c.label}
              </button>
            </Fragment>
          ))}
        </div>
        <div style={{ borderTop: "1.5px solid #17324D" }}>
          {v.homeFaq.map((q: any, i_q: number) => (
            <Fragment key={i_q}>
              <div style={{ borderBottom: "1px solid rgba(23,50,77,0.14)" }}>
                <h3 style={{ margin: "0" }}>
                  <button id={q.btnId} onClick={q.toggle} aria-expanded={q.open} aria-controls={q.panelId} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", background: "none", border: "0", padding: "22px 4px", minHeight: "64px", textAlign: "left", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "600", fontSize: "18px", color: "#17324D" }}>
                    <span>
                      {q.q}
                    </span>
                    <span aria-hidden="true" style={{ flex: "none", width: "32px", height: "32px", borderRadius: "50%", background: q.iconBg, color: q.iconColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", transform: q.rot, transition: "transform .3s ease, background .3s ease" }}>
                      +
                    </span>
                  </button>
                </h3>
                <div id={q.panelId} role="region" aria-labelledby={q.btnId} style={{ display: "grid", gridTemplateRows: q.rows, visibility: q.vis, transition: "grid-template-rows .3s ease, visibility .3s" }}>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ margin: "0", padding: "0 56px 24px 4px", fontSize: "16px", lineHeight: "1.65", color: "#3F5770" }}>
                      {q.a}
                      {q.showPending && (
                        <>
                          {" "}
                          <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "10px", letterSpacing: "0.06em", padding: "3px 6px", borderRadius: "5px", background: "#FCE6DF", color: "#8A3B26" }}>
                            ANSWER PENDING
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
    <section aria-labelledby="h-contact" style={{ background: "#fff" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px)", display: "flex", flexWrap: "wrap", gap: "40px 64px" }}>
        <div style={{ flex: "1 1 340px", maxWidth: "460px" }}>
          <p style={{ margin: "0 0 14px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1769AA" }}>
            Visit & contact
          </p>
          <h2 id="h-contact" style={{ margin: "0 0 28px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(30px,3.6vw,46px)", lineHeight: "1.08", letterSpacing: "-0.025em" }}>
            Find us in Newark.
          </h2>
          <dl style={{ margin: "0", display: "flex", flexDirection: "column" }}>
            {v.contactRows.map((r: any, i_r: number) => (
              <Fragment key={i_r}>
                <div style={{ display: "flex", gap: "20px", padding: "18px 0", borderTop: "1px solid rgba(23,50,77,0.12)" }}>
                  <dt style={{ width: "84px", flex: "none", fontSize: "13px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#4A6178", paddingTop: "2px" }}>
                    {r.label}
                  </dt>
                  <dd style={{ margin: "0", fontSize: "16px", fontWeight: "500", lineHeight: "1.5", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                    <span>
                      {r.value}
                    </span>
                    {r.showPending && (
                      <>
                        <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "10px", letterSpacing: "0.06em", padding: "3px 6px", borderRadius: "5px", background: "#FCE6DF", color: "#8A3B26" }}>
                          TO CONFIRM
                        </span>
                      </>
                    )}
                  </dd>
                </div>
              </Fragment>
            ))}
          </dl>
          <button className="hv-466121" onClick={v.go.contact} style={{ marginTop: "28px", background: "#1769AA", color: "#fff", border: "0", borderRadius: "999px", padding: "0 26px", minHeight: "52px", fontWeight: "600", fontSize: "16px" }}>
            Contact the Center
          </button>
        </div>
        <div style={{ flex: "1.3 1 420px", minWidth: "0", minHeight: "400px", borderRadius: "28px", overflow: "hidden", position: "relative", background: "#DDEFFC", backgroundImage: "linear-gradient(rgba(23,105,170,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(23,105,170,0.08) 1px,transparent 1px)", backgroundSize: "44px 44px" }} role="img" aria-label="Map placeholder for Newark, Delaware">
          <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}>
            <path d="M-10 220 C 100 180, 180 260, 410 150" stroke="#fff" strokeWidth="14" fill="none"></path>
            <path d="M120 -10 C 140 100, 200 200, 180 310" stroke="#fff" strokeWidth="9" fill="none"></path>
          </svg>
          <div style={{ position: "absolute", left: "46%", top: "44%", transform: "translate(-50%,-100%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ background: "#17324D", color: "#fff", fontSize: "13px", fontWeight: "600", padding: "8px 12px", borderRadius: "10px", whiteSpace: "nowrap" }}>
              Bluebird Learning Center
            </span>
            <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#1769AA", border: "4px solid #fff", marginTop: "6px", boxShadow: "0 0 0 8px rgba(23,105,170,0.18)" }}></span>
          </div>
          <div style={{ position: "absolute", left: "16px", right: "16px", bottom: "16px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", background: "#fff", borderRadius: "16px", padding: "12px 12px 12px 18px" }}>
            <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "12px", color: "#4A6178" }}>
              map embed · integration-ready
            </span>
            <a href="https://www.google.com/maps/search/?api=1&query=Newark%2C+Delaware" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 16px", borderRadius: "999px", background: "#DDEFFC", color: "#0F4F82", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
              Open in Maps ↗
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
