'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { api } from './api';
import type { Site } from './types';

interface Store {
  site: Site | null;
  siteError: string | null;
  refreshSite: () => Promise<void>;
  w: number;
  reduced: boolean;
  menu: boolean;
  setMenu: (v: boolean) => void;
  go: (href: string) => void;
}

const Ctx = createContext<Store | null>(null);

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside <StoreProvider>');
  return s;
}

export function StoreProvider({ initialSite, children }: { initialSite: Site | null; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [site, setSite] = useState<Site | null>(initialSite);
  const [siteError, setSiteError] = useState<string | null>(null);
  const [w, setW] = useState(1280); // identical on server and first client render
  const [reduced, setReduced] = useState(false);
  const [menu, setMenu] = useState(false);

  const refreshSite = useCallback(async () => {
    try {
      setSite(await api<Site>('/site'));
      setSiteError(null);
    } catch (e) {
      setSiteError((e as Error).message);
    }
  }, []);

  useEffect(() => {
    if (!initialSite) refreshSite();
  }, [initialSite, refreshSite]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setW(window.innerWidth), 80); // debounced, as in the design
    };
    setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setReduced(true);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // the design scrolls to the top and closes the menu on every page change
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const go = useCallback((href: string) => router.push(href), [router]);

  return <Ctx.Provider value={{ site, siteError, refreshSite, w, reduced, menu, setMenu, go }}>{children}</Ctx.Provider>;
}
