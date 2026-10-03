'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useCommon } from '@/lib/vm';
import SkipLinkView from './views/SkipLinkView';
import HeaderView from './views/HeaderView';
import FooterView from './views/FooterView';
import StatusScreen from './StatusScreen';

function Shell({ children }: { children: React.ReactNode }) {
  const c = useCommon();
  const setMenu = c.s.setMenu;
  const menu = c.s.menu;
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menu, setMenu]);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SkipLinkView v={c} />
      <HeaderView v={c} />
      <main id="main" style={{ flex: '1' }}>
        {children}
      </main>
      <FooterView v={c} />
    </div>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const s = useStore();
  if (!s.site) {
    return s.siteError ? (
      <StatusScreen title="The site is taking a moment." body={s.siteError} action="Try again" onAction={() => s.refreshSite()} />
    ) : (
      <StatusScreen title="Loading…" body="Getting the latest from Bluebird Learning Center." busy />
    );
  }
  return <Shell>{children}</Shell>;
}
