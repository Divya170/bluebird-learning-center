/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function ProgramsView({ v }: { v: any }) {
  return (
    <>
    <section data-screen-label="Programs" style={{ background: "#DDEFFC", position: "relative", overflow: "hidden" }}>
      <svg aria-hidden="true" viewBox="0 0 300 100" style={{ position: "absolute", right: "6%", bottom: "24px", width: "300px", height: "100px" }}>
        <path d="M4 90 C 90 10, 200 4, 296 50" fill="none" stroke="#1769AA" strokeWidth="1.6" strokeDasharray="3 7"></path>
      </svg>
      <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(20px,4vw,48px)" }}>
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
              Programs
            </li>
          </ol>
        </nav>
        <h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(38px,5vw,64px)", lineHeight: "1.04", letterSpacing: "-0.035em", maxWidth: "760px" }}>
          Programs at Bluebird
        </h1>
        <p style={{ margin: "18px 0 0", fontSize: "18px", lineHeight: "1.6", color: "#2E4A66", maxWidth: "600px" }}>
          Each program brings related courses together. Read what each one covers, then explore its courses.
        </p>
      </div>
    </section>
    <section aria-label="Program directory" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(48px,6vw,88px) clamp(20px,4vw,48px)", display: "flex", flexDirection: "column", gap: "28px" }}>
        {v.programsFull.map((p: any, i_p: number) => (
          <Fragment key={i_p}>
            <article id={p.anchor} style={{ display: "flex", flexWrap: "wrap", gap: "0", borderRadius: "28px", overflow: "hidden", background: "#fff", border: "1px solid rgba(23,50,77,0.1)" }}>
              <div style={{ flex: "1 1 300px", minHeight: "240px", background: p.bg, padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px", position: "relative" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "72px", lineHeight: "1", letterSpacing: "-0.04em", color: "#1769AA" }}>
                  {p.code}
                </span>
                <div role="img" aria-label="Program image placeholder" style={{ height: "120px", borderRadius: "18px", background: "repeating-linear-gradient(135deg,rgba(255,255,255,0.7) 0 10px,rgba(255,255,255,0.35) 10px 20px)", display: "flex", alignItems: "flex-end", padding: "12px" }}>
                  <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "11px", color: "#2E4A66" }}>
                    program photo
                  </span>
                </div>
              </div>
              <div style={{ flex: "2 1 420px", minWidth: "0", padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.4vw,32px)", letterSpacing: "-0.02em" }}>
                      {p.name}
                    </h2>
                    {v.showMarkers && (
                      <>
                        <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "10px", letterSpacing: "0.06em", padding: "3px 6px", borderRadius: "5px", background: "#FCE6DF", color: "#8A3B26" }}>
                          PLACEHOLDER
                        </span>
                      </>
                    )}
                  </div>
                  <p style={{ margin: "10px 0 0", fontSize: "16px", lineHeight: "1.6", color: "#3F5770", maxWidth: "640px" }}>
                    {p.long}
                  </p>
                </div>
                <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "16px" }}>
                  <div style={{ padding: "14px 16px", borderRadius: "14px", background: "#F7F9FB" }}>
                    <dt style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#4A6178" }}>
                      Intended for
                    </dt>
                    <dd style={{ margin: "6px 0 0", fontSize: "15px", fontWeight: "500" }}>
                      {p.audience || 'Audience / level to be confirmed'}
                    </dd>
                  </div>
                  <div style={{ padding: "14px 16px", borderRadius: "14px", background: "#F7F9FB" }}>
                    <dt style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#4A6178" }}>
                      Requirements
                    </dt>
                    <dd style={{ margin: "6px 0 0", fontSize: "15px", fontWeight: "500" }}>
                      None listed
                    </dd>
                  </div>
                </dl>
                <div>
                  <h3 style={{ margin: "0 0 10px", fontSize: "14px", fontWeight: "600", color: "#4A6178" }}>
                    Related courses
                  </h3>
                  <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {p.courses.map((c: any, i_c: number) => (
                      <Fragment key={i_c}>
                        <li>
                          <button className="hv-2eb3e2" onClick={c.open} style={{ minHeight: "44px", padding: "0 16px", borderRadius: "999px", border: "1.5px solid rgba(23,50,77,0.18)", background: "#fff", color: "#17324D", fontSize: "14px", fontWeight: "500" }}>
                            {c.name}
                          </button>
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
                <button className="hv-466121" onClick={p.explore} style={{ alignSelf: "flex-start", display: "inline-flex", gap: "10px", alignItems: "center", background: "#1769AA", color: "#fff", border: "0", borderRadius: "999px", padding: "0 22px", minHeight: "48px", fontWeight: "600", fontSize: "15px" }}>
                  {"Explore Courses "}
                  <span aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </article>
          </Fragment>
        ))}
        <aside style={{ marginTop: "20px", borderRadius: "28px", background: "#17324D", color: "#fff", padding: "clamp(28px,4vw,48px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
          <p style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(22px,2.4vw,30px)", letterSpacing: "-0.02em", maxWidth: "560px" }}>
            Not sure which program is right? Contact us.
          </p>
          <button onClick={v.go.contact} style={{ background: "#fff", color: "#17324D", border: "0", borderRadius: "999px", padding: "0 24px", minHeight: "52px", fontWeight: "600", fontSize: "16px" }}>
            Ask a Question
          </button>
        </aside>
      </div>
    </section>
    </>
  );
}
