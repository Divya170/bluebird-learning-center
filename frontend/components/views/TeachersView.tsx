/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function TeachersView({ v }: { v: any }) {
  return (
    <>
    <section data-screen-label="Teachers" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(20px,4vw,48px)" }}>
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
              Teachers
            </li>
          </ol>
        </nav>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "56px" }}>
          <h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(38px,5vw,64px)", lineHeight: "1.04", letterSpacing: "-0.035em", maxWidth: "640px" }}>
            Meet the teaching team
          </h1>
          <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3F5770", maxWidth: "420px" }}>
            Profiles show only what Bluebird has confirmed. Qualifications and bios appear here as they’re supplied.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "28px" }}>
          {v.teachers.map((t: any, i_t: number) => (
            <Fragment key={i_t}>
              <article style={{ borderRadius: "26px", background: t.bg, padding: "18px 18px 24px", display: "flex", flexDirection: "column", gap: "16px", marginTop: t.offset }}>
                <div role="img" aria-label="Teacher portrait placeholder" style={{ aspectRatio: "1", borderRadius: "20px 20px 20px 64px", background: "repeating-linear-gradient(135deg,rgba(255,255,255,0.75) 0 10px,rgba(255,255,255,0.4) 10px 20px)", display: "flex", alignItems: "flex-end", padding: "14px" }}>
                  <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "11px", color: "#2E4A66", background: "rgba(255,255,255,0.9)", padding: "4px 8px", borderRadius: "6px" }}>
                    teacher portrait
                  </span>
                </div>
                <div style={{ padding: "0 6px" }}>
                  <h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "22px" }}>
                    {t.name}
                  </h2>
                  <p style={{ margin: "4px 0 0", fontSize: "15px", color: "#2E4A66" }}>
                    {t.role}
                  </p>
                </div>
                <button className="hv-48490a" onClick={t.open} aria-label={t.ariaView} style={{ margin: "0 6px", alignSelf: "flex-start", minHeight: "44px", padding: "0 18px", borderRadius: "999px", border: "0", background: "#fff", color: "#17324D", fontWeight: "600", fontSize: "14px" }}>
                  View Profile
                </button>
              </article>
            </Fragment>
          ))}
        </div>
        <div style={{ marginTop: "72px", paddingTop: "40px", borderTop: "1px solid rgba(23,50,77,0.14)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
          <p style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "clamp(22px,2.4vw,30px)", letterSpacing: "-0.02em" }}>
            See what the team teaches.
          </p>
          <button className="hv-466121" onClick={v.go.courses} style={{ minHeight: "52px", padding: "0 24px", borderRadius: "999px", border: "0", background: "#1769AA", color: "#fff", fontWeight: "600", fontSize: "16px" }}>
            Explore Courses
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
