'use client';

import { usePathname } from 'next/navigation';
import { useStore } from './store';
import type { Course, Site } from './types';

export const ROUTES = {
  home: '/', programs: '/programs', courses: '/courses', teachers: '/teachers', about: '/about',
  register: '/register', faq: '/faq', contact: '/contact',
} as const;
export type PageKey = keyof typeof ROUTES;

/** Which design page a path belongs to (course/teacher detail map to their sections). */
export function pageOf(pathname: string): string {
  const [a, b] = pathname.split('/').filter(Boolean);
  if (!a) return 'home';
  if (a === 'courses' && b) return 'course';
  if (a === 'teachers' && b) return 'teacher';
  return a;
}

export const courseHref = (id: string) => `/courses/${encodeURIComponent(id)}`;
export const teacherHref = (id: string) => `/teachers/${encodeURIComponent(id)}`;
export const registerHref = (courseId?: string) => '/register' + (courseId ? `?course=${encodeURIComponent(courseId)}` : '');

/** Chip colours from the design. */
export const chip = (active: boolean) => ({ bg: active ? '#17324D' : '#fff', color: active ? '#fff' : '#17324D', border: active ? '#17324D' : 'rgba(23,50,77,0.2)' });

/** Values every view shares: navigation, layout, studio settings. */
export function useCommon() {
  const s = useStore();
  const pathname = usePathname() || '/';
  const site = s.site as Site;
  const page = pageOf(pathname);
  const isMobile = s.w < 900;
  const go = Object.fromEntries((Object.keys(ROUTES) as PageKey[]).map((k) => [k, () => s.go(ROUTES[k])])) as Record<PageKey, () => void>;
  const pg = Object.fromEntries(['home', 'programs', 'courses', 'course', 'teachers', 'teacher', 'about', 'register', 'faq', 'contact'].map((k) => [k, page === k]));
  const section = page === 'course' ? 'courses' : page === 'teacher' ? 'teachers' : page;
  const courseCard = (c: Course) => ({
    ...c,
    desc: c.description,
    schedule: c.schedule || 'Schedule to be announced',
    open: () => s.go(courseHref(c.id)),
    register: () => s.go(registerHref(c.id)),
    ariaView: `View course: ${c.name}`,
    ariaReg: `Register for ${c.name}`,
  });
  return {
    s,
    site,
    st: site.settings,
    showMarkers: site.settings.showMarkers,
    page,
    go,
    pg,
    isMobile,
    isDesktop: !isMobile,
    courseCard,
    navItems: (
      [['programs', 'Programs'], ['courses', 'Courses'], ['teachers', 'Teachers'], ['about', 'About'], ['faq', 'FAQ'], ['contact', 'Contact']] as [PageKey, string][]
    ).map(([id, label]) => ({ label, active: section === id, current: section === id ? 'page' : undefined, onClick: () => s.go(ROUTES[id]) })),
    menuOpen: s.menu,
    showDrawer: isMobile && s.menu,
    menuLabel: s.menu ? 'Close menu' : 'Open menu',
    toggleMenu: () => s.setMenu(!s.menu),
    footerLinks: (
      [['programs', 'Programs'], ['courses', 'Courses'], ['teachers', 'Teachers'], ['about', 'About'], ['faq', 'FAQ'], ['contact', 'Contact'], ['register', 'Register'], ['home', 'Home']] as [PageKey, string][]
    ).map(([id, label]) => ({ label, onClick: () => s.go(ROUTES[id]) })),
    footerPad: isMobile && page === 'course' ? '84px' : '0px',
  };
}
