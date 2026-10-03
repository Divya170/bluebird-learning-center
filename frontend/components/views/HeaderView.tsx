/* Presentational view generated from the Bluebird Learning Center design (dc template).
   All data and behaviour arrive through the `v` view-model prop. */
import { Fragment } from 'react';

export default function HeaderView({ v }: { v: any }) {
  return (
    <>
    <header style={{ position: "sticky", top: "0", zIndex: "50", background: "rgba(255,249,240,0.94)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px solid rgba(23,50,77,0.08)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", height: "76px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
        <button onClick={v.go.home} aria-label="Bluebird Learning Center — home" style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "0", padding: "4px", color: "#17324D", textAlign: "left" }}>
          <span aria-hidden="true" style={{ position: "relative", width: "38px", height: "38px", flex: "none" }}>
            <span style={{ position: "absolute", inset: "0", borderRadius: "50% 50% 50% 8px", background: "#1769AA" }}></span>
            <span style={{ position: "absolute", right: "-3px", top: "-3px", width: "14px", height: "14px", borderRadius: "50%", background: "#F6B6A5", border: "3px solid #FFF9F0" }}></span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: "1.05" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: "800", fontSize: "19px", letterSpacing: "-0.01em" }}>
              Bluebird
            </span>
            <span style={{ fontSize: "12px", fontWeight: "500", color: "#4A6178", letterSpacing: "0.02em" }}>
              Learning Center
            </span>
          </span>
        </button>
        {v.isDesktop && (
          <>
            <nav aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {v.navItems.map((n: any, i_n: number) => (
                <Fragment key={i_n}>
                  <button className="hv-a14951" onClick={n.onClick} aria-current={n.current} style={{ position: "relative", background: "none", border: "0", padding: "12px 14px", minHeight: "44px", fontSize: "15px", fontWeight: "500", color: "#17324D", borderRadius: "10px" }}>
                    {n.label}
                    {n.active && (
                      <>
                        <span aria-hidden="true" style={{ position: "absolute", left: "14px", right: "14px", bottom: "6px", height: "2px", borderRadius: "2px", background: "#1769AA" }}></span>
                      </>
                    )}
                  </button>
                </Fragment>
              ))}
            </nav>
          </>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button className="hv-fc6147" onClick={v.go.register} style={{ background: "#1769AA", color: "#fff", border: "0", borderRadius: "999px", padding: "0 22px", minHeight: "46px", fontWeight: "600", fontSize: "15px", transition: "transform .2s ease, background .2s ease", whiteSpace: "nowrap" }}>
            Register Now
          </button>
          {v.isMobile && (
            <>
              <button onClick={v.toggleMenu} aria-expanded={v.menuOpen} aria-controls="mobile-menu" aria-label={v.menuLabel} style={{ width: "46px", height: "46px", borderRadius: "12px", border: "1.5px solid rgba(23,50,77,0.18)", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                <span style={{ width: "18px", height: "2px", background: "#17324D", borderRadius: "2px" }}></span>
                <span style={{ width: "18px", height: "2px", background: "#17324D", borderRadius: "2px" }}></span>
                <span style={{ width: "12px", height: "2px", background: "#17324D", borderRadius: "2px", marginLeft: "6px" }}></span>
              </button>
            </>
          )}
        </div>
      </div>
      {v.showDrawer && (
        <>
          <nav id="mobile-menu" aria-label="Mobile" style={{ borderTop: "1px solid rgba(23,50,77,0.08)", background: "#FFF9F0", padding: "12px clamp(20px,4vw,48px) 24px", display: "flex", flexDirection: "column", gap: "2px" }}>
            {v.navItems.map((n: any, i_n: number) => (
              <Fragment key={i_n}>
                <button onClick={n.onClick} aria-current={n.current} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "0", borderBottom: "1px solid rgba(23,50,77,0.08)", padding: "16px 4px", minHeight: "52px", fontSize: "18px", fontWeight: "600", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#17324D", textAlign: "left" }}>
                  <span>
                    {n.label}
                  </span>
                  <span aria-hidden="true" style={{ color: "#1769AA" }}>
                    →
                  </span>
                </button>
              </Fragment>
            ))}
            <button onClick={v.go.register} style={{ marginTop: "16px", background: "#1769AA", color: "#fff", border: "0", borderRadius: "999px", minHeight: "54px", fontWeight: "600", fontSize: "16px" }}>
              Register Now
            </button>
            <p style={{ margin: "12px 0 0", fontSize: "14px", color: "#4A6178", textAlign: "center" }}>
              Newark, Delaware
            </p>
          </nav>
        </>
      )}
    </header>
    </>
  );
}
