/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function CourseView({ v }: { v: any }) {
  return (
    <>
    <section data-screen-label="Course Detail" style={{ background: v.course.programBg }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(40px,6vw,72px) clamp(20px,4vw,48px)" }}>
        <nav aria-label="Breadcrumb">
          <ol style={{ listStyle: "none", margin: "0 0 24px", padding: "0", display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "14px", color: "#2E4A66" }}>
            <li>
              <button onClick={v.go.home} style={{ background: "none", border: "0", padding: "0", color: "#1769AA", fontSize: "14px", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Home
              </button>
            </li>
            <li aria-hidden="true">
              /
            </li>
            <li>
              <button onClick={v.go.courses} style={{ background: "none", border: "0", padding: "0", color: "#1769AA", fontSize: "14px", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Courses
              </button>
            </li>
            <li aria-hidden="true">
              /
            </li>
            <li aria-current="page">
              {v.course.name}
            </li>
          </ol>
        </nav>
        <span style={{ display: "inline-block", fontSize: "13px", fontWeight: "600", padding: "6px 12px", borderRadius: "999px", background: "#fff", marginBottom: "16px" }}>
          {v.course.programName}
        </span>
        <h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(36px,4.6vw,60px)", lineHeight: "1.05", letterSpacing: "-0.03em", maxWidth: "820px" }}>
          {v.course.name}
        </h1>
      </div>
    </section>
    <section aria-label="Course details" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: `clamp(40px,5vw,72px) clamp(20px,4vw,48px) ${v.detailPadBottom}`, display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "flex-start" }}>
        <div style={{ flex: "2 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "44px" }}>
          <div>
            <h2 style={{ margin: "0 0 12px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "24px" }}>
              About this course
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.7", color: "#3F5770", maxWidth: "680px" }}>
              {v.course.long}
            </p>
          </div>
          <div>
            <h2 style={{ margin: "0 0 16px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "24px" }}>
              Course information
            </h2>
            <dl style={{ margin: "0", borderTop: "1.5px solid #17324D" }}>
              {v.course.info.map((r: any, i_r: number) => (
                <Fragment key={i_r}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", padding: "16px 0", borderBottom: "1px solid rgba(23,50,77,0.14)" }}>
                    <dt style={{ flex: "0 0 180px", fontSize: "14px", fontWeight: "600", color: "#4A6178" }}>
                      {r.label}
                    </dt>
                    <dd style={{ margin: "0", flex: "1 1 200px", fontSize: "16px", fontWeight: "500" }}>
                      {r.value}
                    </dd>
                  </div>
                </Fragment>
              ))}
            </dl>
          </div>
          <div>
            <h2 style={{ margin: "0 0 16px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "24px" }}>
              Teacher
            </h2>
            <div style={{ display: "flex", gap: "20px", alignItems: "center", padding: "20px", borderRadius: "20px", background: "#fff", border: "1px solid rgba(23,50,77,0.1)" }}>
              <div role="img" aria-label="Teacher portrait placeholder" style={{ width: "72px", height: "72px", flex: "none", borderRadius: "50%", background: "repeating-linear-gradient(135deg,#E6EEF5 0 8px,#F1F5F9 8px 16px)" }}></div>
              <div>
                <p style={{ margin: "0", fontWeight: "600", fontSize: "17px" }}>
                  To be assigned
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "15px", color: "#4A6178" }}>
                  The teacher for this course will be listed here once confirmed.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ margin: "0 0 16px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "24px" }}>
              Related courses
            </h2>
            <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "14px" }}>
              {v.relatedCourses.map((c: any, i_c: number) => (
                <Fragment key={i_c}>
                  <li>
                    <button className="hv-d24b4a" onClick={c.open} style={{ width: "100%", textAlign: "left", padding: "20px", borderRadius: "18px", border: "1px solid rgba(23,50,77,0.12)", background: "#fff", color: "#17324D", display: "flex", flexDirection: "column", gap: "6px", transition: "border-color .2s ease" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#4A6178" }}>
                        {c.programName}
                      </span>
                      <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "17px" }}>
                        {c.name}
                      </span>
                      <span style={{ fontSize: "14px", color: "#1769AA", fontWeight: "600" }}>
                        View Course →
                      </span>
                    </button>
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
        <aside aria-label="Register for this course" style={{ flex: "1 1 320px", maxWidth: "420px", position: "sticky", top: "100px", borderRadius: "24px", background: "#fff", border: "1px solid rgba(23,50,77,0.12)", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 10px 30px rgba(23,50,77,0.06)" }}>
          <p style={{ margin: "0", fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4A6178" }}>
            {v.course.programName}
          </p>
          <p style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.2" }}>
            {v.course.name}
          </p>
          <p style={{ margin: "0", fontSize: "15px", color: "#3F5770", display: "flex", gap: "8px", alignItems: "center" }}>
            <span aria-hidden="true" style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1.5px solid #4A6178" }}></span>
            {v.course.schedule}
          </p>
          <button className="hv-466121" onClick={v.course.register} style={{ marginTop: "8px", minHeight: "54px", borderRadius: "999px", border: "0", background: "#1769AA", color: "#fff", fontWeight: "600", fontSize: "16px" }}>
            Register for this Course
          </button>
          <button className="hv-99018e" onClick={v.go.contact} style={{ minHeight: "50px", borderRadius: "999px", border: "1.5px solid rgba(23,50,77,0.2)", background: "#fff", color: "#17324D", fontWeight: "600", fontSize: "15px" }}>
            Ask a Question
          </button>
          <p style={{ margin: "4px 0 0", fontSize: "13px", lineHeight: "1.5", color: "#4A6178" }}>
            Submitting a request doesn’t commit you to anything — the center will follow up first.
          </p>
        </aside>
      </div>
    </section>
    {v.showStickyBar && (
      <>
        <div style={{ position: "fixed", left: "0", right: "0", bottom: "0", zIndex: "40", background: "#fff", borderTop: "1px solid rgba(23,50,77,0.12)", padding: "12px 20px calc(12px + env(safe-area-inset-bottom))", display: "flex", gap: "10px", boxShadow: "0 -8px 24px rgba(23,50,77,0.08)" }}>
          <button onClick={v.go.contact} aria-label="Ask a question about this course" style={{ minHeight: "52px", padding: "0 18px", borderRadius: "999px", border: "1.5px solid rgba(23,50,77,0.2)", background: "#fff", color: "#17324D", fontWeight: "600" }}>
            Ask
          </button>
          <button onClick={v.course.register} style={{ flex: "1", minHeight: "52px", borderRadius: "999px", border: "0", background: "#1769AA", color: "#fff", fontWeight: "600", fontSize: "16px" }}>
            Register for this Course
          </button>
        </div>
      </>
    )}
    </>
  );
}
