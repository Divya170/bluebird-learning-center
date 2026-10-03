/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */

export default function TeacherView({ v }: { v: any }) {
  return (
    <>
    <section data-screen-label="Teacher Detail" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(20px,4vw,48px)" }}>
        <nav aria-label="Breadcrumb">
          <ol style={{ listStyle: "none", margin: "0 0 32px", padding: "0", display: "flex", gap: "8px", fontSize: "14px", color: "#2E4A66" }}>
            <li>
              <button onClick={v.go.home} style={{ background: "none", border: "0", padding: "0", color: "#1769AA", fontSize: "14px", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Home
              </button>
            </li>
            <li aria-hidden="true">
              /
            </li>
            <li>
              <button onClick={v.go.teachers} style={{ background: "none", border: "0", padding: "0", color: "#1769AA", fontSize: "14px", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Teachers
              </button>
            </li>
            <li aria-hidden="true">
              /
            </li>
            <li aria-current="page">
              {v.teacher.name}
            </li>
          </ol>
        </nav>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "flex-start" }}>
          <div role="img" aria-label="Teacher portrait placeholder" style={{ flex: "1 1 300px", maxWidth: "420px", aspectRatio: "4/5", borderRadius: "28px 28px 28px 96px", background: "repeating-linear-gradient(135deg,#E6EEF5 0 10px,#F1F5F9 10px 20px)", display: "flex", alignItems: "flex-end", padding: "18px" }}>
            <span style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: "11px", color: "#4A6178", background: "#fff", padding: "4px 8px", borderRadius: "6px" }}>
              teacher portrait
            </span>
          </div>
          <div style={{ flex: "1.4 1 400px", minWidth: "0", display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <p style={{ margin: "0 0 10px", fontSize: "13px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1769AA" }}>
                {v.teacher.role}
              </p>
              <h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(36px,4.6vw,56px)", lineHeight: "1.05", letterSpacing: "-0.03em" }}>
                {v.teacher.name}
              </h1>
            </div>
            <div style={{ padding: "24px", borderRadius: "20px", border: "1.5px dashed rgba(23,50,77,0.25)", background: "#fff" }}>
              <h2 style={{ margin: "0 0 8px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "18px" }}>
                Biography
              </h2>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3F5770" }}>
                {v.teacher.bio || 'A short biography will appear here once supplied by Bluebird Learning Center. Qualifications are shown only when verified.'}
              </p>
            </div>
            <div>
              <h2 style={{ margin: "0 0 10px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "18px" }}>
                Courses taught
              </h2>
              <p style={{ margin: "0", fontSize: "16px", color: "#3F5770" }}>
                {v.teacherCourses.length === 0 && 'Courses will be listed here once assigned.'}
              </p>
              {v.teacherCourses.length > 0 && (
                <ul style={{ listStyle: "none", margin: "12px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {v.teacherCourses.map((c: any) => (
                    <li key={c.id}>
                      <button type="button" onClick={c.open} className="hv-tc" style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", gap: "12px", padding: "14px 16px", border: "1px solid rgba(23,50,77,0.14)", borderRadius: "12px", background: "#fff", cursor: "pointer", font: "600 16px 'Plus Jakarta Sans',sans-serif", color: "#17324D" }}>
                        <span>{c.name}</span>
                        <span style={{ font: "500 13px Inter,sans-serif", color: "#4A6178" }}>{c.programName} →</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <button className="hv-466121" onClick={v.go.courses} style={{ minHeight: "52px", padding: "0 24px", borderRadius: "999px", border: "0", background: "#1769AA", color: "#fff", fontWeight: "600", fontSize: "16px" }}>
                Explore Courses
              </button>
              <button onClick={v.go.teachers} style={{ minHeight: "52px", padding: "0 22px", borderRadius: "999px", border: "1.5px solid rgba(23,50,77,0.2)", background: "transparent", color: "#17324D", fontWeight: "600", fontSize: "15px" }}>
                ← All teachers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
