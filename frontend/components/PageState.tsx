'use client';

/** In-page loading / not-found / error panel in the design's type and button styles. */
export default function PageState({ title, body, actions, busy }: { title: string; body?: string; actions?: { label: string; onClick: () => void; primary?: boolean }[]; busy?: boolean }) {
  return (
    <section role={busy ? 'status' : 'alert'} aria-busy={busy ? 'true' : 'false'} style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,8vw,112px) clamp(20px,4vw,40px)', minHeight: '50vh' }}>
      <div style={{ maxWidth: '620px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <h1 style={{ margin: 0, font: "800 clamp(34px,4.5vw,52px)/1.08 'Plus Jakarta Sans',sans-serif", color: '#17324D', letterSpacing: '-0.02em', opacity: busy ? 0.6 : 1 }}>{title}</h1>
        {body && <p style={{ margin: 0, font: '400 18px/1.6 Inter,sans-serif', color: '#4A6178' }}>{body}</p>}
        {actions && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {actions.map((a) => (
              <button key={a.label} type="button" onClick={a.onClick}
                style={{ minHeight: '50px', padding: '0 24px', borderRadius: '999px', cursor: 'pointer', font: "700 16px 'Plus Jakarta Sans',sans-serif", ...(a.primary ? { background: '#1769AA', color: '#fff', border: 0 } : { background: '#fff', color: '#17324D', border: '1.5px solid rgba(23,50,77,0.25)' }) }}>
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
