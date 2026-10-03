/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function CoursesView({ v }: { v: any }) {
  return (
    <>
    <section data-screen-label="Courses" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(40px,6vw,72px) clamp(20px,4vw,48px) 32px" }}>
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
              Courses
            </li>
          </ol>
        </nav>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>
          <div style={{ maxWidth: "640px" }}>
            <h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(38px,5vw,64px)", lineHeight: "1.04", letterSpacing: "-0.035em" }}>
              Courses
            </h1>
            <p style={{ margin: "16px 0 0", fontSize: "18px", lineHeight: "1.6", color: "#3F5770" }}>
              Search by name or filter by program. Open any course for its details.
            </p>
          </div>
          <div style={{ flex: "0 1 380px", minWidth: "260px" }}>
            <label htmlFor="course-search" style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
              Search courses
            </label>
            <input id="course-search" type="search" value={v.q} onChange={v.setQ} placeholder="e.g. course name" style={{ width: "100%", minHeight: "52px", padding: "0 16px", borderRadius: "14px", border: "1.5px solid #B8C4CF", background: "#fff", fontSize: "16px", color: "#17324D" }} />
          </div>
        </div>
      </div>
    </section>
    <section aria-label="Course results" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px) clamp(56px,7vw,96px)", display: "flex", flexWrap: "wrap", gap: "32px" }}>
        {v.isMobile && (
          <>
            <div style={{ flex: "1 1 100%" }}>
              <button onClick={v.toggleFilter} aria-expanded={v.filterOpen} aria-controls="filter-panel" style={{ width: "100%", minHeight: "52px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 18px", borderRadius: "14px", border: "1.5px solid rgba(23,50,77,0.2)", background: "#fff", fontWeight: "600", fontSize: "16px", color: "#17324D" }}>
                <span>
                  {"Filter · "}{v.activeProgLabel}
                </span>
                <span aria-hidden="true">
                  {v.filterIcon}
                </span>
              </button>
            </div>
          </>
        )}
        {v.showFilterPanel && (
          <>
            <aside id="filter-panel" aria-label="Filters" style={{ flex: "0 0 240px", maxWidth: "100%", alignSelf: "flex-start", position: "sticky", top: "100px" }}>
              <fieldset style={{ border: "0", margin: "0", padding: "0" }}>
                <legend style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4A6178", marginBottom: "12px" }}>
                  Program
                </legend>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {v.progFilters.map((f: any, i_f: number) => (
                    <Fragment key={i_f}>
                      <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", minHeight: "48px", padding: "0 14px", borderRadius: "12px", background: f.bg, cursor: "pointer", fontSize: "15px", fontWeight: "500" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <input type="radio" name="prog" checked={f.active} onChange={f.onClick} style={{ width: "18px", height: "18px", accentColor: "#1769AA", margin: "0" }} />
                          {f.label}
                        </span>
                        <span style={{ fontSize: "13px", color: "#4A6178" }}>
                          {f.count}
                        </span>
                      </label>
                    </Fragment>
                  ))}
                </div>
              </fieldset>
            </aside>
          </>
        )}
        <div style={{ flex: "1 1 520px", minWidth: "0" }}>
          <p aria-live="polite" style={{ margin: "0 0 16px", fontSize: "14px", color: "#4A6178" }}>
            {v.resultText}
          </p>
          {v.gridView && (
            <>
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "20px" }}>
                {v.courseResults.map((c: any, i_c: number) => (
                  <Fragment key={i_c}>
                    <li className="hv-b35ae7" style={{ display: "flex", flexDirection: "column", background: "#fff", borderRadius: "22px", border: "1px solid rgba(23,50,77,0.1)", overflow: "hidden", transition: "transform .25s ease, box-shadow .25s ease" }}>
                      <div style={{ height: "8px", background: c.programBg }}></div>
                      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                        <h2 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "21px", letterSpacing: "-0.01em" }}>
                          {c.name}
                        </h2>
                        <span style={{ alignSelf: "flex-start", fontSize: "12px", fontWeight: "600", padding: "5px 10px", borderRadius: "999px", background: c.programBg }}>
                          {c.programName}
                        </span>
                        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.55", color: "#3F5770", flex: "1" }}>
                          {c.desc}
                        </p>
                        <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#4A6178", display: "flex", gap: "8px", alignItems: "center" }}>
                          <span aria-hidden="true" style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1.5px solid #4A6178" }}></span>
                          {c.schedule}
                        </p>
                        <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
                          <button className="hv-466121" onClick={c.open} aria-label={c.ariaView} style={{ flex: "1", minHeight: "46px", padding: "0 16px", borderRadius: "999px", border: "0", background: "#1769AA", color: "#fff", fontWeight: "600", fontSize: "14px" }}>
                            View Course
                          </button>
                          <button onClick={c.register} aria-label={c.ariaReg} style={{ minHeight: "46px", padding: "0 16px", borderRadius: "999px", border: "1.5px solid rgba(23,50,77,0.2)", background: "#fff", color: "#17324D", fontWeight: "600", fontSize: "14px" }}>
                            Register
                          </button>
                        </div>
                      </div>
                    </li>
                  </Fragment>
                ))}
              </ul>
            </>
          )}
          {v.listView && (
            <>
              <ul style={{ listStyle: "none", margin: "0", padding: "0", borderTop: "1.5px solid #17324D" }}>
                {v.courseResults.map((c: any, i_c: number) => (
                  <Fragment key={i_c}>
                    <li style={{ borderBottom: "1px solid rgba(23,50,77,0.14)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 24px", padding: "22px 4px" }}>
                      <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "8px" }}>
                          <span style={{ fontSize: "12px", fontWeight: "600", padding: "5px 10px", borderRadius: "999px", background: c.programBg }}>
                            {c.programName}
                          </span>
                          <span style={{ fontSize: "13px", color: "#4A6178" }}>
                            {c.schedule}
                          </span>
                        </div>
                        <h2 style={{ margin: "0 0 4px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "20px" }}>
                          {c.name}
                        </h2>
                        <p style={{ margin: "0", fontSize: "15px", color: "#3F5770" }}>
                          {c.desc}
                        </p>
                      </div>
                      <button onClick={c.open} aria-label={c.ariaView} style={{ minHeight: "46px", padding: "0 18px", borderRadius: "999px", border: "0", background: "#1769AA", color: "#fff", fontWeight: "600", fontSize: "14px" }}>
                        View Course
                      </button>
                    </li>
                  </Fragment>
                ))}
              </ul>
            </>
          )}
          {v.loadError && (
            <div role="alert" style={{ padding: "16px 18px", borderRadius: "14px", background: "#FEF3F2", border: "1px solid #FDA29B", color: "#912018", display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap", font: "400 15px/1.5 Inter,sans-serif", marginBottom: "20px" }}>
              <span style={{ flex: "1", minWidth: "220px" }}><strong>Courses didn’t refresh.</strong> {v.loadError}</span>
              <button type="button" onClick={v.retry} style={{ minHeight: "44px", padding: "0 18px", borderRadius: "999px", border: "1.5px solid #FDA29B", background: "#fff", color: "#912018", font: "700 14px 'Plus Jakarta Sans',sans-serif", cursor: "pointer" }}>Try again</button>
            </div>
          )}
          {v.noResults && (
            <>
              <div style={{ padding: "48px 24px", textAlign: "center", borderRadius: "22px", border: "1.5px dashed rgba(23,50,77,0.25)", background: "#fff" }}>
                <h2 style={{ margin: "0 0 8px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "22px" }}>
                  No courses match that search
                </h2>
                <p style={{ margin: "0 0 20px", color: "#3F5770" }}>
                  Try a different word, or clear the filters.
                </p>
                <button onClick={v.clearFilters} style={{ minHeight: "46px", padding: "0 20px", borderRadius: "999px", border: "1.5px solid #17324D", background: "#fff", color: "#17324D", fontWeight: "600" }}>
                  Clear filters
                </button>
              </div>
            </>
          )}
          <div style={{ marginTop: "40px", borderRadius: "22px", background: "#DDF3E8", padding: "24px 28px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
            <p style={{ margin: "0", fontSize: "17px", fontWeight: "600" }}>
              Know which course you want? Registration takes a few minutes.
            </p>
            <button onClick={v.go.register} style={{ minHeight: "48px", padding: "0 22px", borderRadius: "999px", border: "0", background: "#17324D", color: "#fff", fontWeight: "600", fontSize: "15px" }}>
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
