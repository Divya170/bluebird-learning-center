/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function ContactView({ v }: { v: any }) {
  return (
    <>
    <section data-screen-label="Contact" style={{ background: "#FFF9F0" }}>
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
              Contact
            </li>
          </ol>
        </nav>
        <h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(38px,5vw,64px)", lineHeight: "1.04", letterSpacing: "-0.035em" }}>
          Get in touch
        </h1>
        <p style={{ margin: "16px 0 48px", fontSize: "18px", lineHeight: "1.6", color: "#3F5770", maxWidth: "560px" }}>
          Ask about programs, courses, or scheduling — no registration needed.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "14px", marginBottom: "40px" }}>
          {v.contactCards.map((r: any, i_r: number) => (
            <Fragment key={i_r}>
              <div style={{ padding: "22px", borderRadius: "20px", background: r.bg, display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={{ margin: "0", fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#2E4A66" }}>
                  {r.label}
                </p>
                <p style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.35" }}>
                  {r.value}
                </p>
                <p style={{ margin: "0", fontSize: "14px", color: "#2E4A66" }}>
                  {r.note}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "stretch" }}>
          <div style={{ flex: "1.2 1 440px", minWidth: "0", background: "#fff", borderRadius: "28px", border: "1px solid rgba(23,50,77,0.1)", padding: "clamp(24px,4vw,40px)" }}>
            {v.con.isSuccess && (
              <>
                <div role="status" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <span aria-hidden="true" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#DDF3E8", color: "#1B6B48", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "700" }}>
                    ✓
                  </span>
                  <h2 tabIndex={-1} id="con-success" style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "26px" }}>
                    Inquiry sent
                  </h2>
                  <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3F5770" }}>
                    Your message has been submitted. Bluebird Learning Center will reply to the email you provided.
                  </p>
                  <p style={{ margin: "8px 0 0", font: "500 14px Inter,sans-serif", color: "#4A6178" }}>{"Reference "}<strong style={{ color: "#17324D" }}>{v.con.ref}</strong></p>
                  <button onClick={v.go.courses} style={{ alignSelf: "flex-start", minHeight: "48px", padding: "0 20px", borderRadius: "999px", border: "1.5px solid rgba(23,50,77,0.2)", background: "#fff", color: "#17324D", fontWeight: "600" }}>
                    Browse courses
                  </button>
                  <button onClick={v.con.reset} style={{ alignSelf: "flex-start", minHeight: "48px", padding: "0 20px", borderRadius: "999px", border: "1.5px solid rgba(23,50,77,0.2)", background: "#fff", color: "#17324D", fontWeight: "600" }}>
                    Send another message
                  </button>
                </div>
              </>
            )}
            {v.con.isForm && (
              <>
                <form onSubmit={v.con.submit} noValidate={true} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <h2 style={{ margin: "0 0 4px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "24px" }}>
                    Send an inquiry
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
                    <div style={{ flex: "1 1 220px" }}>
                      <label htmlFor={v.cf.name.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>
                        <span>
                          Your name
                        </span>
                        <span style={{ fontWeight: "500", color: "#4A6178", fontSize: "13px" }}>
                          Required
                        </span>
                      </label>
                      <input id={v.cf.name.id} type="text" autoComplete="name" value={v.cf.name.value} onChange={v.cf.name.onChange} onBlur={v.cf.name.onBlur} aria-invalid={v.cf.name.hasError} aria-describedby={v.cf.name.errId} style={{ width: "100%", minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: `1.5px solid ${v.cf.name.border}`, background: "#fff", fontSize: "16px", color: "#17324D" }} />
                      {v.cf.name.hasError && (
                        <>
                          <p id={v.cf.name.errId} style={{ margin: "8px 0 0", fontSize: "14px", color: "#B42318" }}>
                            {"⚠ "}{v.cf.name.error}
                          </p>
                        </>
                      )}
                    </div>
                    <div style={{ flex: "1 1 220px" }}>
                      <label htmlFor={v.cf.email.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>
                        <span>
                          Email
                        </span>
                        <span style={{ fontWeight: "500", color: "#4A6178", fontSize: "13px" }}>
                          Required
                        </span>
                      </label>
                      <input id={v.cf.email.id} type="email" inputMode="email" autoComplete="email" value={v.cf.email.value} onChange={v.cf.email.onChange} onBlur={v.cf.email.onBlur} aria-invalid={v.cf.email.hasError} aria-describedby={v.cf.email.errId} style={{ width: "100%", minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: `1.5px solid ${v.cf.email.border}`, background: "#fff", fontSize: "16px", color: "#17324D" }} />
                      {v.cf.email.hasError && (
                        <>
                          <p id={v.cf.email.errId} style={{ margin: "8px 0 0", fontSize: "14px", color: "#B42318" }}>
                            {"⚠ "}{v.cf.email.error}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor={v.cf.topic.id} style={{ display: "block", fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>
                      Topic
                    </label>
                    <select id={v.cf.topic.id} value={v.cf.topic.value} onChange={v.cf.topic.onChange} style={{ width: "100%", minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: "1.5px solid #B8C4CF", background: "#fff", fontSize: "16px", color: "#17324D" }}>
                      <option value="general">
                        General question
                      </option>
                      <option value="programs">
                        Programs & courses
                      </option>
                      <option value="schedule">
                        Schedules
                      </option>
                      <option value="registration">
                        Registration
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor={v.cf.message.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>
                      <span>
                        Message
                      </span>
                      <span style={{ fontWeight: "500", color: "#4A6178", fontSize: "13px" }}>
                        Required
                      </span>
                    </label>
                    <textarea id={v.cf.message.id} rows={5} value={v.cf.message.value} onChange={v.cf.message.onChange} onBlur={v.cf.message.onBlur} aria-invalid={v.cf.message.hasError} aria-describedby={v.cf.message.errId} style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: `1.5px solid ${v.cf.message.border}`, background: "#fff", fontSize: "16px", color: "#17324D", resize: "vertical" }}></textarea>
                    {v.cf.message.hasError && (
                      <>
                        <p id={v.cf.message.errId} style={{ margin: "8px 0 0", fontSize: "14px", color: "#B42318" }}>
                          {"⚠ "}{v.cf.message.error}
                        </p>
                      </>
                    )}
                  </div>
                  {v.con.failure && (
                    <div role="alert" style={{ padding: "14px 16px", borderRadius: "12px", background: "#FEF3F2", border: "1px solid #FDA29B", color: "#912018", font: "400 15px/1.5 Inter,sans-serif" }}>
                      <strong>Your request wasn’t sent.</strong> Nothing was lost — please try again. <span style={{ display: "block", fontSize: "14px", marginTop: "2px" }}>{v.con.failure}</span>
                    </div>
                  )}
                  <button type="submit" disabled={v.con.loading} aria-busy={v.con.loading} style={{ minHeight: "54px", borderRadius: "999px", border: "0", background: v.con.btnBg, color: "#fff", fontWeight: "600", fontSize: "16px" }}>
                    {v.con.btnText}
                  </button>
                </form>
              </>
            )}
          </div>
          <div style={{ flex: "1 1 360px", minWidth: "0", minHeight: "420px", borderRadius: "28px", overflow: "hidden", position: "relative", background: "#DDEFFC", backgroundImage: "linear-gradient(rgba(23,105,170,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(23,105,170,0.08) 1px,transparent 1px)", backgroundSize: "44px 44px" }} role="img" aria-label="Map placeholder for Newark, Delaware">
            <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}>
              <path d="M-10 200 C 100 170, 200 250, 410 140" stroke="#fff" strokeWidth="14" fill="none"></path>
              <path d="M150 -10 C 160 100, 220 200, 200 310" stroke="#fff" strokeWidth="9" fill="none"></path>
            </svg>
            <div style={{ position: "absolute", left: "50%", top: "44%", transform: "translate(-50%,-100%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                Get directions ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
