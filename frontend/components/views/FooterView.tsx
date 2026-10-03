/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function FooterView({ v }: { v: any }) {
  return (
    <>
    <footer style={{ background: "#17324D", color: "#fff", paddingBottom: v.footerPad }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px clamp(20px,4vw,48px) 32px", display: "flex", flexWrap: "wrap", gap: "40px 64px", justifyContent: "space-between" }}>
        <div style={{ flex: "1 1 280px", maxWidth: "380px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span aria-hidden="true" style={{ position: "relative", width: "36px", height: "36px", flex: "none" }}>
              <span style={{ position: "absolute", inset: "0", borderRadius: "50% 50% 50% 8px", background: "#5FA4DC" }}></span>
              <span style={{ position: "absolute", right: "-3px", top: "-3px", width: "13px", height: "13px", borderRadius: "50%", background: "#F6B6A5", border: "3px solid #17324D" }}></span>
            </span>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "19px" }}>
              Bluebird Learning Center
            </span>
          </div>
          <p style={{ margin: "18px 0 0", fontSize: "15px", lineHeight: "1.6", color: "#C9D9E8" }}>
            Programs and courses for students in Newark, Delaware.
          </p>
          <button onClick={v.go.register} style={{ marginTop: "24px", minHeight: "50px", padding: "0 22px", borderRadius: "999px", border: "0", background: "#fff", color: "#17324D", fontWeight: "600", fontSize: "15px" }}>
            Register Now
          </button>
        </div>
        <nav aria-label="Footer" style={{ flex: "1 1 320px", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "4px 24px", alignContent: "start" }}>
          {v.footerLinks.map((n: any, i_n: number) => (
            <Fragment key={i_n}>
              <button className="hv-7432f9" onClick={n.onClick} style={{ textAlign: "left", background: "none", border: "0", padding: "10px 0", minHeight: "44px", color: "#fff", fontSize: "15px" }}>
                {n.label}
              </button>
            </Fragment>
          ))}
        </nav>
      </div>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px clamp(20px,4vw,48px) 32px", borderTop: "1px solid rgba(255,255,255,0.14)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", fontSize: "13px", color: "#C9D9E8" }}>
        <span>
          © 2026 Bluebird Learning Center · Newark, DE
        </span>
        <span>
          Contact details to be published
        </span>
      </div>
    </footer>
    </>
  );
}
