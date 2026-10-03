'use client';

/** Full-page loading / error state before the site data is available. */
export default function StatusScreen({ title, body, action, onAction, busy }: { title: string; body: string; action?: string; onAction?: () => void; busy?: boolean }) {
  return (
    <div role={busy ? 'status' : 'alert'} aria-busy={busy ? 'true' : 'false'} style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px', background: '#FBFAF7' }}>
      <div style={{ maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <span style={{ font: "700 13px 'Plus Jakarta Sans',sans-serif", letterSpacing: '.08em', textTransform: 'uppercase', color: '#1769AA' }}>Bluebird Learning Center</span>
        <h1 style={{ margin: 0, font: "800 clamp(32px,4vw,44px)/1.1 'Plus Jakarta Sans',sans-serif", color: '#17324D' }}>{title}</h1>
        <p style={{ margin: 0, font: '400 17px/1.6 Inter,sans-serif', color: '#4A6178' }}>{body}</p>
        {action && onAction && (
          <button onClick={onAction} style={{ height: '50px', padding: '0 24px', borderRadius: '999px', border: 0, background: '#1769AA', color: '#fff', font: "700 16px 'Plus Jakarta Sans',sans-serif", cursor: 'pointer' }}>{action}</button>
        )}
      </div>
    </div>
  );
}
