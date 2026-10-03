/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function AboutView({ v }: { v: any }) {
  return (
    <>
    <section data-screen-label="About" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(20px,4vw,48px) clamp(48px,6vw,80px)" }}>
        <nav aria-label="Breadcrumb">
          <ol style={{ listStyle: "none", margin: "0 0 24px", padding: "0", display: "flex", gap: "8px", fontSize: "14px", color: "#2E4A66" }}>
            <li>
              <button onClick={v.go.home} style={{ background: "none", border: "0", padding: "0", color: "#1769AA", fontSize: "14px", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Home
              </button>
            </li>
            <li aria-hidden="true">
              /
            </li>
            <li aria-current="page">
              About
            </li>
          </ol>
        </nav>
        <h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(40px,5.6vw,76px)", lineHeight: "1.02", letterSpacing: "-0.035em", maxWidth: "980px", textWrap: "balance" }}>
          A local learning center, built around students in Newark.
        </h1>
      </div>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <div style={{ flex: "2 1 520px", height: "clamp(280px,36vw,460px)", borderRadius: "28px 140px 28px 28px", overflow: "hidden" }}>
          <img src="/assets/whiteboard.webp" alt="A teacher working through a math problem at the whiteboard while students follow along" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        </div>
        <div style={{ flex: "1 1 280px", height: "clamp(280px,36vw,460px)", borderRadius: "28px", background: "#DDF3E8", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <svg aria-hidden="true" viewBox="0 0 160 60" style={{ width: "160px", height: "60px", marginBottom: "auto" }}>
            <path d="M4 54 C 50 6, 110 4, 156 30" fill="none" stroke="#1769AA" strokeWidth="1.6" strokeDasharray="3 7"></path>
            <circle cx="156" cy="30" r="5" fill="#1769AA"></circle>
          </svg>
          <p style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.3" }}>
            Newark, Delaware
          </p>
          <p style={{ margin: "8px 0 0", fontSize: "15px", color: "#2E4A66" }}>
            Address to be published.
          </p>
        </div>
      </div>
    </section>
    <section aria-labelledby="h-story" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px)", display: "flex", flexWrap: "wrap", gap: "32px 80px" }}>
        <h2 id="h-story" style={{ flex: "1 1 260px", margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(28px,3.2vw,40px)", letterSpacing: "-0.02em" }}>
          Our story
        </h2>
        <div style={{ flex: "2 1 480px", minWidth: "0" }}>
          <p style={{ margin: "0", fontSize: "clamp(20px,2vw,26px)", lineHeight: "1.5", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "500", color: "#17324D", textWrap: "pretty" }}>
            {v.st.story || "The center’s story — why it started, who it serves, and what it hopes students take away — will be written with Sloane Whitaker."}
          </p>
          {v.showMarkers && !v.st.story && (
            <>
              <p style={{ margin: "20px 0 0", display: "inline-block", fontFamily: "ui-monospace,Menlo,monospace", fontSize: "11px", letterSpacing: "0.06em", padding: "5px 8px", borderRadius: "6px", background: "#FCE6DF", color: "#8A3B26" }}>
                CLIENT COPY NEEDED · NO DATES OR CLAIMS INVENTED
              </p>
            </>
          )}
        </div>
      </div>
    </section>
    <section aria-labelledby="h-phil" style={{ background: "#fff" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px)" }}>
        <h2 id="h-phil" style={{ margin: "0 0 40px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(28px,3.2vw,40px)", letterSpacing: "-0.02em" }}>
          Teaching philosophy
        </h2>
        <ol style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column" }}>
          {v.whyThemes.map((w: any, i_w: number) => (
            <Fragment key={i_w}>
              <li style={{ display: "flex", flexWrap: "wrap", gap: "12px 40px", padding: "28px 0", borderTop: "1px solid rgba(23,50,77,0.14)", alignItems: "baseline" }}>
                <span aria-hidden="true" style={{ flex: "0 0 60px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "28px", color: "#1769AA" }}>
                  {w.n}
                </span>
                <h3 style={{ flex: "1 1 260px", margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "22px" }}>
                  {w.title}
                </h3>
                <p style={{ flex: "2 1 360px", margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3F5770" }}>
                  {w.body}
                </p>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
    <section aria-labelledby="h-env" style={{ background: "#DDEFFC" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px)", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "center" }}>
        <div style={{ flex: "1 1 340px", maxWidth: "460px" }}>
          <h2 id="h-env" style={{ margin: "0 0 16px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(28px,3.2vw,40px)", letterSpacing: "-0.02em" }}>
            Learning environment & facility
          </h2>
          <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#2E4A66" }}>
            Photos and a description of Bluebird’s own classrooms and study spaces will go here. The images shown are representative until facility photography is supplied.
          </p>
        </div>
        <div style={{ flex: "1.5 1 460px", minWidth: "0", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "16px" }}>
          <div style={{ gridRow: "span 2", borderRadius: "24px", overflow: "hidden", minHeight: "360px" }}>
            <img src="/assets/classroom.webp" alt="A bright classroom with movable tables and colorful chairs" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ borderRadius: "24px", overflow: "hidden", minHeight: "172px" }}>
            <img src="/assets/lesson.webp" alt="A teacher leading a lesson at the chalkboard" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div role="img" aria-label="Facility photo placeholder" style={{ borderRadius: "24px", minHeight: "172px", background: "repeating-linear-gradient(135deg,rgba(255,255,255,0.75) 0 10px,rgba(255,255,255,0.4) 10px 20px)", display: "flex", alignItems: "flex-end", padding: "14px" }}>
            <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "11px", color: "#2E4A66" }}>
              center exterior
            </span>
          </div>
        </div>
      </div>
    </section>
    <section aria-labelledby="h-about-cta" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(56px,7vw,96px) clamp(20px,4vw,48px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "24px" }}>
        <h2 id="h-about-cta" style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(28px,3.6vw,46px)", letterSpacing: "-0.03em", maxWidth: "620px" }}>
          See what students can learn here.
        </h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button className="hv-466121" onClick={v.go.programs} style={{ minHeight: "54px", padding: "0 26px", borderRadius: "999px", border: "0", background: "#1769AA", color: "#fff", fontWeight: "600", fontSize: "16px" }}>
            Explore Programs
          </button>
          <button onClick={v.go.contact} style={{ minHeight: "54px", padding: "0 24px", borderRadius: "999px", border: "1.5px solid rgba(23,50,77,0.25)", background: "transparent", color: "#17324D", fontWeight: "600", fontSize: "16px" }}>
            Contact the Center
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
