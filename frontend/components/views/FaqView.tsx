/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function FaqView({ v }: { v: any }) {
  return (
    <>
    <section data-screen-label="FAQ" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(20px,4vw,48px) clamp(64px,8vw,112px)" }}>
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
              FAQ
            </li>
          </ol>
        </nav>
        <h1 style={{ margin: "0 0 48px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(38px,5vw,64px)", lineHeight: "1.04", letterSpacing: "-0.035em" }}>
          Frequently asked questions
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px 64px", alignItems: "flex-start" }}>
          {v.isMobile && (
            <>
              <div style={{ flex: "1 1 100%" }}>
                <label htmlFor="faq-cat" style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
                  Topic
                </label>
                <select id="faq-cat" value={v.faqCat} onChange={v.setFaqCat} style={{ width: "100%", minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: "1.5px solid #B8C4CF", background: "#fff", fontSize: "16px", color: "#17324D" }}>
                  {v.faqTabs.map((c: any, i_c: number) => (
                    <Fragment key={i_c}>
                      <option value={c.id}>
                        {c.label}
                      </option>
                    </Fragment>
                  ))}
                </select>
              </div>
            </>
          )}
          {v.isDesktop && (
            <>
              <nav aria-label="FAQ topics" style={{ flex: "0 0 240px", position: "sticky", top: "100px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {v.faqTabs.map((c: any, i_c: number) => (
                  <Fragment key={i_c}>
                    <button className="hv-8a0eec" onClick={c.onClick} aria-current={c.current} style={{ textAlign: "left", minHeight: "48px", padding: "0 16px", borderRadius: "12px", border: "0", background: c.navBg, color: "#17324D", fontSize: "16px", fontWeight: c.weight, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>
                        {c.label}
                      </span>
                      <span style={{ fontSize: "13px", color: "#4A6178" }}>
                        {c.count}
                      </span>
                    </button>
                  </Fragment>
                ))}
              </nav>
            </>
          )}
          <div style={{ flex: "1 1 480px", minWidth: "0" }}>
            <h2 style={{ margin: "0 0 16px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "24px" }}>
              {v.faqCatLabel}
            </h2>
            <div style={{ borderTop: "1.5px solid #17324D" }}>
              {v.faqList.map((q: any, i_q: number) => (
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
            <div style={{ marginTop: "48px", padding: "28px", borderRadius: "24px", background: "#DDEFFC", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
              <p style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "20px" }}>
                Didn’t find your answer?
              </p>
              <button className="hv-466121" onClick={v.go.contact} style={{ minHeight: "52px", padding: "0 22px", borderRadius: "999px", border: "0", background: "#1769AA", color: "#fff", fontWeight: "600", fontSize: "15px" }}>
                Still Have Questions? Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
