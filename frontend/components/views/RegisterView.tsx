/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function RegisterView({ v }: { v: any }) {
  return (
    <>
    <section data-screen-label="Registration" style={{ background: "#FFF9F0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(20px,4vw,48px) clamp(64px,8vw,112px)", display: "flex", flexWrap: "wrap", gap: "48px 72px", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 320px", maxWidth: "440px" }}>
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
                Register
              </li>
            </ol>
          </nav>
          <h1 style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "clamp(36px,4.6vw,56px)", lineHeight: "1.04", letterSpacing: "-0.03em" }}>
            Registration request
          </h1>
          <p style={{ margin: "16px 0 36px", fontSize: "17px", lineHeight: "1.6", color: "#3F5770" }}>
            A short form — about two minutes. Fields marked “Required” are the only ones you need.
          </p>
          <h2 style={{ margin: "0 0 16px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "18px" }}>
            What happens next
          </h2>
          <ol style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", position: "relative" }}>
            {v.regSteps.map((s: any, i_s: number) => (
              <Fragment key={i_s}>
                <li style={{ display: "flex", gap: "16px", paddingBottom: "22px" }}>
                  <span aria-hidden="true" style={{ flex: "none", width: "32px", height: "32px", borderRadius: "50%", background: s.bg, color: "#17324D", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px" }}>
                    {s.n}
                  </span>
                  <div>
                    <p style={{ margin: "4px 0 4px", fontWeight: "600" }}>
                      {s.title}
                    </p>
                    <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#3F5770" }}>
                      {s.body}
                    </p>
                  </div>
                </li>
              </Fragment>
            ))}
          </ol>
          <div style={{ marginTop: "12px", padding: "20px", borderRadius: "18px", background: "#DDEFFC" }}>
            <p style={{ margin: "0 0 6px", fontWeight: "600" }}>
              Prefer to ask first?
            </p>
            <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#2E4A66" }}>
              {"You can "}
              <button onClick={v.go.contact} style={{ background: "none", border: "0", padding: "0", color: "#1769AA", fontWeight: "600", fontSize: "15px", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                send an inquiry
              </button>
              {" without registering."}
            </p>
          </div>
        </div>
        <div style={{ flex: "1.4 1 460px", minWidth: "0", background: "#fff", borderRadius: "28px", border: "1px solid rgba(23,50,77,0.1)", padding: "clamp(24px,4vw,44px)" }}>
          {v.reg.isSuccess && (
            <>
              <div role="status" style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "12px 0" }}>
                <span aria-hidden="true" style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#DDF3E8", color: "#1B6B48", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: "700" }}>
                  ✓
                </span>
                <h2 tabIndex={-1} id="reg-success" style={{ margin: "0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "28px" }}>
                  Request received
                </h2>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3F5770" }}>
                  Your registration request has been submitted. Bluebird Learning Center will follow up using the contact information provided.
                </p>
                <p style={{ margin: "8px 0 0", font: "500 14px Inter,sans-serif", color: "#4A6178" }}>{"Reference "}<strong style={{ color: "#17324D" }}>{v.reg.ref}</strong></p>
                <p style={{ margin: "0", fontSize: "15px", color: "#4A6178" }}>
                  {"Sent for: "}
                  <strong style={{ color: "#17324D" }}>
                    {v.reg.summary}
                  </strong>
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
                  <button onClick={v.go.courses} style={{ minHeight: "50px", padding: "0 22px", borderRadius: "999px", border: "0", background: "#1769AA", color: "#fff", fontWeight: "600" }}>
                    Back to courses
                  </button>
                  <button onClick={v.reg.reset} style={{ minHeight: "50px", padding: "0 22px", borderRadius: "999px", border: "1.5px solid rgba(23,50,77,0.2)", background: "#fff", color: "#17324D", fontWeight: "600" }}>
                    Register another student
                  </button>
                </div>
              </div>
            </>
          )}
          {v.reg.isForm && (
            <>
              <form onSubmit={v.reg.submit} noValidate={true} aria-describedby="reg-intro" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <p id="reg-intro" style={{ position: "absolute", left: "-9999px" }}>
                  Registration form with three sections.
                </p>
                {v.reg.showSummary && (
                  <>
                    <div role="alert" style={{ padding: "16px 18px", borderRadius: "14px", background: "#FDECEA", border: "1.5px solid #B42318", color: "#7A1A12", fontSize: "15px", lineHeight: "1.5" }}>
                      <strong>
                        {"Please fix "}{v.reg.errorCountText}{" before sending."}
                      </strong>
                      {" Each one is marked below."}
                    </div>
                  </>
                )}
                <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <legend style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "19px", marginBottom: "14px", display: "flex", gap: "10px", alignItems: "center" }}>
                    <span aria-hidden="true" style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#DDEFFC", fontSize: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      1
                    </span>
                    Student
                  </legend>
                  <div>
                    <label htmlFor={v.rf.studentName.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>
                      <span>
                        Student’s full name
                      </span>
                      <span style={{ fontWeight: "500", color: "#4A6178", fontSize: "13px" }}>
                        Required
                      </span>
                    </label>
                    <input id={v.rf.studentName.id} type="text" autoComplete="name" value={v.rf.studentName.value} onChange={v.rf.studentName.onChange} onBlur={v.rf.studentName.onBlur} aria-invalid={v.rf.studentName.hasError} aria-describedby={v.rf.studentName.errId} style={{ width: "100%", minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: `1.5px solid ${v.rf.studentName.border}`, background: "#fff", fontSize: "16px", color: "#17324D" }} />
                    {v.rf.studentName.hasError && (
                      <>
                        <p id={v.rf.studentName.errId} style={{ margin: "8px 0 0", fontSize: "14px", color: "#B42318", display: "flex", gap: "6px" }}>
                          <span aria-hidden="true">
                            ⚠
                          </span>
                          {v.rf.studentName.error}
                        </p>
                      </>
                    )}
                  </div>
                  <label style={{ display: "flex", gap: "12px", alignItems: "center", minHeight: "44px", fontSize: "15px", cursor: "pointer" }}>
                    <input type="checkbox" checked={v.rf.isStudent.value} onChange={v.rf.isStudent.onChange} style={{ width: "20px", height: "20px", accentColor: "#1769AA", margin: "0" }} />
                    I’m the student and registering myself
                  </label>
                </fieldset>
                {v.reg.needGuardian && (
                  <>
                    <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
                      <legend style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "19px", marginBottom: "14px", display: "flex", gap: "10px", alignItems: "center" }}>
                        <span aria-hidden="true" style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#DDEFFC", fontSize: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                          2
                        </span>
                        Parent or guardian
                      </legend>
                      <div>
                        <label htmlFor={v.rf.guardianName.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>
                          <span>
                            Parent / guardian name
                          </span>
                          <span style={{ fontWeight: "500", color: "#4A6178", fontSize: "13px" }}>
                            Required
                          </span>
                        </label>
                        <input id={v.rf.guardianName.id} type="text" value={v.rf.guardianName.value} onChange={v.rf.guardianName.onChange} onBlur={v.rf.guardianName.onBlur} aria-invalid={v.rf.guardianName.hasError} aria-describedby={v.rf.guardianName.errId} style={{ width: "100%", minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: `1.5px solid ${v.rf.guardianName.border}`, background: "#fff", fontSize: "16px", color: "#17324D" }} />
                        {v.rf.guardianName.hasError && (
                          <>
                            <p id={v.rf.guardianName.errId} style={{ margin: "8px 0 0", fontSize: "14px", color: "#B42318", display: "flex", gap: "6px" }}>
                              <span aria-hidden="true">
                                ⚠
                              </span>
                              {v.rf.guardianName.error}
                            </p>
                          </>
                        )}
                      </div>
                    </fieldset>
                  </>
                )}
                <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <legend style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "700", fontSize: "19px", marginBottom: "14px", display: "flex", gap: "10px", alignItems: "center" }}>
                    <span aria-hidden="true" style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#DDEFFC", fontSize: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      {v.reg.n2}
                    </span>
                    Course & contact
                  </legend>
                  <div>
                    <label htmlFor={v.rf.course.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>
                      <span>
                        Course or program
                      </span>
                      <span style={{ fontWeight: "500", color: "#4A6178", fontSize: "13px" }}>
                        Required
                      </span>
                    </label>
                    <select id={v.rf.course.id} value={v.rf.course.value} onChange={v.rf.course.onChange} onBlur={v.rf.course.onBlur} aria-invalid={v.rf.course.hasError} aria-describedby={v.rf.course.errId} style={{ width: "100%", minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: `1.5px solid ${v.rf.course.border}`, background: "#fff", fontSize: "16px", color: "#17324D" }}>
                      {v.courseOptions.map((o: any, i_o: number) => (
                        <Fragment key={i_o}>
                          <option value={o.value}>
                            {o.label}
                          </option>
                        </Fragment>
                      ))}
                    </select>
                    {v.rf.course.hasError && (
                      <>
                        <p id={v.rf.course.errId} style={{ margin: "8px 0 0", fontSize: "14px", color: "#B42318", display: "flex", gap: "6px" }}>
                          <span aria-hidden="true">
                            ⚠
                          </span>
                          {v.rf.course.error}
                        </p>
                      </>
                    )}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
                    <div style={{ flex: "1 1 240px" }}>
                      <label htmlFor={v.rf.email.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>
                        <span>
                          Email
                        </span>
                        <span style={{ fontWeight: "500", color: "#4A6178", fontSize: "13px" }}>
                          Required
                        </span>
                      </label>
                      <input id={v.rf.email.id} type="email" inputMode="email" autoComplete="email" value={v.rf.email.value} onChange={v.rf.email.onChange} onBlur={v.rf.email.onBlur} aria-invalid={v.rf.email.hasError} aria-describedby={v.rf.email.errId} style={{ width: "100%", minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: `1.5px solid ${v.rf.email.border}`, background: "#fff", fontSize: "16px", color: "#17324D" }} />
                      {v.rf.email.hasError && (
                        <>
                          <p id={v.rf.email.errId} style={{ margin: "8px 0 0", fontSize: "14px", color: "#B42318", display: "flex", gap: "6px" }}>
                            <span aria-hidden="true">
                              ⚠
                            </span>
                            {v.rf.email.error}
                          </p>
                        </>
                      )}
                    </div>
                    <div style={{ flex: "1 1 200px" }}>
                      <label htmlFor={v.rf.phone.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>
                        <span>
                          Phone
                        </span>
                        <span style={{ fontWeight: "500", color: "#4A6178", fontSize: "13px" }}>
                          Optional
                        </span>
                      </label>
                      <input id={v.rf.phone.id} type="tel" inputMode="tel" autoComplete="tel" value={v.rf.phone.value} onChange={v.rf.phone.onChange} onBlur={v.rf.phone.onBlur} aria-invalid={v.rf.phone.hasError} aria-describedby={v.rf.phone.errId} style={{ width: "100%", minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: `1.5px solid ${v.rf.phone.border}`, background: "#fff", fontSize: "16px", color: "#17324D" }} />
                      {v.rf.phone.hasError && (
                        <>
                          <p id={v.rf.phone.errId} style={{ margin: "8px 0 0", fontSize: "14px", color: "#B42318", display: "flex", gap: "6px" }}>
                            <span aria-hidden="true">
                              ⚠
                            </span>
                            {v.rf.phone.error}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor={v.rf.message.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}>
                      <span>
                        Anything we should know?
                      </span>
                      <span style={{ fontWeight: "500", color: "#4A6178", fontSize: "13px" }}>
                        Optional
                      </span>
                    </label>
                    <p id="reg-message-help" style={{ margin: "0 0 8px", fontSize: "14px", color: "#4A6178" }}>
                      Grade, scheduling needs, or questions.
                    </p>
                    <textarea id={v.rf.message.id} rows={4} value={v.rf.message.value} onChange={v.rf.message.onChange} aria-describedby="reg-message-help" style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1.5px solid #B8C4CF", background: "#fff", fontSize: "16px", color: "#17324D", resize: "vertical" }}></textarea>
                  </div>
                </fieldset>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {v.reg.failure && (
                    <div role="alert" style={{ padding: "14px 16px", borderRadius: "12px", background: "#FEF3F2", border: "1px solid #FDA29B", color: "#912018", font: "400 15px/1.5 Inter,sans-serif" }}>
                      <strong>Your request wasn’t sent.</strong> Nothing was lost — please try again. <span style={{ display: "block", fontSize: "14px", marginTop: "2px" }}>{v.reg.failure}</span>
                    </div>
                  )}
                  <button type="submit" disabled={v.reg.loading} aria-busy={v.reg.loading} style={{ minHeight: "56px", borderRadius: "999px", border: "0", background: v.reg.btnBg, color: "#fff", fontWeight: "600", fontSize: "17px", transition: "background .2s ease" }}>
                    {v.reg.btnText}
                  </button>
                  <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.5", color: "#4A6178", textAlign: "center" }}>
                    Your details are used only to follow up on this request.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
    </>
  );
}
