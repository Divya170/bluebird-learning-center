'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCommon, chip, courseHref, teacherHref, registerHref } from '@/lib/vm';
import { api, isAbort, qs } from '@/lib/api';
import { useDebounced } from '@/hooks/useDebounced';
import { useDesignForm } from '@/hooks/useDesignForm';
import type { Course, Faq, Teacher } from '@/lib/types';
import HomeView from '../views/HomeView';
import ProgramsView from '../views/ProgramsView';
import CoursesView from '../views/CoursesView';
import CourseView from '../views/CourseView';
import TeachersView from '../views/TeachersView';
import TeacherView from '../views/TeacherView';
import AboutView from '../views/AboutView';
import RegisterView from '../views/RegisterView';
import FaqView from '../views/FaqView';
import ContactView from '../views/ContactView';
import PageState from '../PageState';

const HERO_MS = 7000;

/** FAQ accordion item, as the design builds it. */
function useFaq(showMarkers: boolean) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (f: Faq) => {
    const on = !!open[f.id];
    return {
      id: f.id, q: f.question, a: f.answer, open: on, btnId: 'q-' + f.id, panelId: 'a-' + f.id, rows: on ? '1fr' : '0fr', vis: on ? 'visible' : 'hidden',
      rot: on ? 'rotate(45deg)' : 'none', iconBg: on ? '#1769AA' : '#DDEFFC', iconColor: on ? '#fff' : '#17324D',
      showPending: f.pending && showMarkers, toggle: () => setOpen((o) => ({ ...o, [f.id]: !o[f.id] })),
    };
  };
}

const teacherCards = (c: ReturnType<typeof useCommon>, list: Teacher[]) =>
  list.map((t, i) => ({
    ...t, offset: c.isMobile ? '0px' : i % 2 ? '48px' : '0px', bg: c.site.programs[i % Math.max(1, c.site.programs.length)]?.bg || '#DDEFFC',
    open: () => c.s.go(teacherHref(t.id)), ariaView: `View profile: ${t.name}`,
  }));

export function HomePage() {
  const c = useCommon();
  const { site, s, st, showMarkers } = c;
  const [hero, setHero] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [homeProg, setHomeProg] = useState('all');
  const cats = site.faqCategories.filter((x) => x.key !== 'courses');
  const [homeFaqCat, setHomeFaqCat] = useState(cats[0]?.key || 'registration');
  const faq = useFaq(showMarkers);
  const autoplayOn = !s.reduced;

  useEffect(() => {
    if (site.hero.length < 2) return;
    const t = setInterval(() => {
      if (autoplayOn && !paused && !hover && !document.hidden) setHero((h) => (h + 1) % site.hero.length);
    }, HERO_MS);
    return () => clearInterval(t);
  }, [autoplayOn, paused, hover, site.hero.length]);

  const programCard = (p: (typeof site.programs)[number]) => ({ ...p, open: () => s.go('/programs#program-' + p.id), ariaView: `View program: ${p.name}` });
  const pend = (val: string) => ({ showPending: showMarkers && !val });
  const v = {
    ...c,
    heroSlides: site.hero.map((h, i) => ({
      ...h, opacity: i === hero ? 1 : 0, hidden: i === hero ? undefined : 'true',
      transform: s.reduced ? 'none' : i === hero ? 'scale(1.07)' : 'scale(1)',
      dotW: i === hero ? '22px' : '6px', dotBg: i === hero ? '#1769AA' : '#9DB1C4', current: i === hero ? 'true' : undefined,
      label: `Show photo ${i + 1} of ${site.hero.length}`, select: () => setHero(i),
    })),
    heroEnter: () => setHover(true),
    heroLeave: () => setHover(false),
    toggleHero: () => setPaused((p) => !p),
    heroToggleText: autoplayOn && !paused ? 'Pause' : 'Play',
    heroToggleLabel: autoplayOn && !paused ? 'Pause slideshow' : 'Play slideshow',
    featuredProgram: site.programs[0] ? programCard(site.programs[0]) : { code: '', name: '', short: '', open: () => undefined },
    otherPrograms: site.programs.slice(1).map(programCard),
    homeChips: [{ id: 'all', name: 'All' }, ...site.programs].map((p) => ({ label: p.name, active: homeProg === p.id, ...chip(homeProg === p.id), onClick: () => setHomeProg(p.id) })),
    homeCourses: site.courses.filter((x) => homeProg === 'all' || x.programId === homeProg).slice(0, 4).map(c.courseCard),
    teachers: teacherCards(c, site.teachers),
    whyThemes: site.themes,
    homeFaqTabs: cats.map((x) => ({ label: x.label, active: homeFaqCat === x.key, ...chip(homeFaqCat === x.key), onClick: () => setHomeFaqCat(x.key) })),
    homeFaq: site.faqs.filter((f) => f.category === homeFaqCat).map(faq),
    contactRows: [
      { label: 'Address', value: st.address || 'Street address · Newark, DE', ...pend(st.address) },
      { label: 'Phone', value: st.phone || 'To be published', ...pend(st.phone) },
      { label: 'Email', value: st.email || 'To be published', ...pend(st.email) },
      { label: 'Hours', value: st.hours || 'To be published', ...pend(st.hours) },
    ],
  };
  return <HomeView v={v} />;
}

export function ProgramsPage() {
  const c = useCommon();
  const { site, s } = c;
  // arriving from a program card: scroll to that program
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: s.reduced ? 'auto' : 'smooth' }), 60);
  }, [s.reduced]);
  const v = {
    ...c,
    programsFull: site.programs.map((p) => ({
      ...p, anchor: 'program-' + p.id,
      courses: site.courses.filter((x) => x.programId === p.id).map((x) => ({ name: x.name, open: () => s.go(courseHref(x.id)) })),
      explore: () => s.go('/courses?program=' + encodeURIComponent(p.id)),
    })),
  };
  return <ProgramsView v={v} />;
}

export function CoursesPage() {
  const c = useCommon();
  const { site, isMobile } = c;
  const params = useSearchParams();
  const initial = params.get('program');
  const [q, setQ] = useState(params.get('q') || '');
  const dq = useDebounced(q.trim(), 250);
  const [prog, setProg] = useState(initial && site.programs.some((p) => p.id === initial) ? initial : 'all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [data, setData] = useState<{ items: Course[]; counts: Record<string, number> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const p = new URLSearchParams();
    if (prog !== 'all') p.set('program', prog);
    if (dq) p.set('q', dq);
    window.history.replaceState(null, '', '/courses' + (p.toString() ? '?' + p : ''));
    const ctl = new AbortController();
    setLoading(true);
    setError(null);
    api<{ items: Course[]; counts: Record<string, number> }>('/courses' + qs({ program: prog, q: dq }), { signal: ctl.signal })
      .then(setData)
      .catch((e) => !isAbort(e) && setError(e.message))
      .finally(() => !ctl.signal.aborted && setLoading(false));
    return () => ctl.abort();
  }, [prog, dq, tick]);

  // until the first response arrives, filter the bootstrap list locally so the page never flashes empty
  const fallback = site.courses.filter((x) => (prog === 'all' || x.programId === prog) && (!dq || `${x.name} ${x.programName} ${x.description}`.toLowerCase().includes(dq.toLowerCase())));
  const results = data?.items ?? fallback;
  const counts = data?.counts ?? { all: site.courses.length, ...Object.fromEntries(site.programs.map((p) => [p.id, site.courses.filter((x) => x.programId === p.id).length])) };
  const progName = site.programs.find((p) => p.id === prog)?.name;
  const busy = loading && !!data && q.trim() !== dq;

  const v = {
    ...c,
    q,
    setQ: (e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value),
    filterOpen,
    toggleFilter: () => setFilterOpen((o) => !o),
    filterIcon: filterOpen ? '−' : '+',
    showFilterPanel: !isMobile || filterOpen,
    progFilters: [{ id: 'all', name: 'All programs' }, ...site.programs].map((p) => ({
      label: p.name, active: prog === p.id, bg: prog === p.id ? '#DDEFFC' : 'transparent', count: counts[p.id] ?? 0, onClick: () => setProg(p.id),
    })),
    activeProgLabel: progName || 'All programs',
    courseResults: results.map(c.courseCard),
    noResults: !busy && !error && results.length === 0,
    loadError: error,
    retry: () => setTick((t) => t + 1),
    resultText: busy ? 'Searching…' : `${results.length} ${results.length === 1 ? 'course' : 'courses'}${progName ? ' in ' + progName : ''}${dq ? ` matching “${dq}”` : ''}`,
    gridView: results.length > 0 && site.settings.courseView === 'grid',
    listView: results.length > 0 && site.settings.courseView === 'list',
    clearFilters: () => {
      setQ('');
      setProg('all');
    },
  };
  return <CoursesView v={v} />;
}

/** Shared fetch-by-id logic for the course and teacher detail pages. */
function useDetail<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading');
  const [error, setError] = useState('');
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const ctl = new AbortController();
    setState('loading');
    api<T>(path, { signal: ctl.signal })
      .then((r) => { setData(r); setState('ready'); })
      .catch((e) => {
        if (isAbort(e)) return;
        if (e.status === 404) setState('missing');
        else { setError(e.message); setState('error'); }
      });
    return () => ctl.abort();
  }, [path, tick]);
  return { data, state, error, retry: () => setTick((t) => t + 1) };
}

export function CoursePage({ id }: { id: string }) {
  const c = useCommon();
  const { s, isMobile } = c;
  const d = useDetail<{ course: Course; related: Course[]; teachers: Teacher[] }>('/courses/' + encodeURIComponent(id));
  useEffect(() => { if (d.data) document.title = d.data.course.name + ' · Bluebird Learning Center'; }, [d.data]);
  if (d.state === 'loading') return <PageState title="Loading course…" busy />;
  if (d.state === 'missing')
    return <PageState title="This course isn’t available" body="It may have been renamed or isn’t offered right now. Browse current courses, or send the center a question." actions={[{ label: 'Browse courses', onClick: c.go.courses, primary: true }, { label: 'Contact the center', onClick: c.go.contact }]} />;
  if (d.state === 'error' || !d.data)
    return <PageState title="The course didn’t load" body={d.error} actions={[{ label: 'Try again', onClick: d.retry, primary: true }, { label: 'Browse courses', onClick: c.go.courses }]} />;
  const { course: co, related } = d.data;
  const v = {
    ...c,
    course: {
      ...c.courseCard(co),
      long: co.long || 'A fuller course description will appear here once supplied — what students will work on and how sessions run. No duration, pricing, prerequisites, or outcomes are shown until confirmed.',
      register: () => s.go(registerHref(co.id)),
      info: [
        { label: 'Program', value: co.programName },
        { label: 'Schedule', value: co.schedule || 'To be announced' },
        { label: 'Level / age', value: co.level || 'To be confirmed' },
        { label: 'Requirements', value: co.requirements || 'None listed' },
        ...(d.data.teachers.length ? [{ label: d.data.teachers.length === 1 ? 'Teacher' : 'Teachers', value: d.data.teachers.map((t) => t.name).join(', ') }] : []),
      ],
    },
    relatedCourses: related.map(c.courseCard),
    showStickyBar: isMobile,
    detailPadBottom: isMobile ? '120px' : 'clamp(64px,8vw,112px)',
  };
  return <CourseView v={v} />;
}

export function TeachersPage() {
  const c = useCommon();
  return <TeachersView v={{ ...c, teachers: teacherCards(c, c.site.teachers) }} />;
}

export function TeacherPage({ id }: { id: string }) {
  const c = useCommon();
  const d = useDetail<{ teacher: Teacher; courses: Course[] }>('/teachers/' + encodeURIComponent(id));
  if (d.state === 'loading') return <PageState title="Loading profile…" busy />;
  if (d.state === 'missing')
    return <PageState title="This profile isn’t available" body="Meet the current teaching team instead." actions={[{ label: 'View teachers', onClick: c.go.teachers, primary: true }]} />;
  if (d.state === 'error' || !d.data)
    return <PageState title="The profile didn’t load" body={d.error} actions={[{ label: 'Try again', onClick: d.retry, primary: true }, { label: 'View teachers', onClick: c.go.teachers }]} />;
  const v = {
    ...c,
    teacher: d.data.teacher,
    teacherCourses: d.data.courses.map((x) => ({ id: x.id, name: x.name, programName: x.programName, open: () => c.s.go(courseHref(x.id)) })),
  };
  return <TeacherView v={v} />;
}

export function AboutPage() {
  const c = useCommon();
  return <AboutView v={{ ...c, whyThemes: c.site.themes }} />;
}

const EMPTY_REG = { studentName: '', isStudent: false, guardianName: '', email: '', phone: '', course: '', message: '' };

export function RegisterPage() {
  const c = useCommon();
  const { site } = c;
  const params = useSearchParams();
  const pre = params.get('course') || '';
  const f = useDesignForm<typeof EMPTY_REG, { ref: string; courseName: string }>('reg', '/registrations', {
    ...EMPTY_REG,
    course: pre && (pre === 'unsure' || site.courses.some((x) => x.id === pre)) ? pre : '',
  });
  const needGuardian = !f.values.isStudent;
  const sel = site.courses.find((x) => x.id === f.values.course);
  const v = {
    ...c,
    rf: f.fields,
    reg: {
      ...f.meta,
      needGuardian,
      n2: needGuardian ? '3' : '2',
      btnText: f.meta.loading ? 'Sending request…' : 'Send registration request',
      summary: f.result?.courseName || (f.values.course === 'unsure' ? 'Not sure yet — help choosing' : sel ? sel.name : ''),
    },
    courseOptions: [
      { value: '', label: 'Select a course…' },
      { value: 'unsure', label: 'Not sure yet — help me choose' },
      ...site.courses.map((x) => ({ value: x.id, label: `${x.name} · ${x.programName}` })),
    ],
    regSteps: [
      { n: '1', title: 'Send the form', body: 'Tell us who the student is and which course interests you.', bg: '#DDEFFC' },
      { n: '2', title: 'The center reviews it', body: 'Bluebird looks over your request and any questions you included.', bg: '#DDF3E8' },
      { n: '3', title: 'You hear back', body: 'The center follows up by email or phone with next steps.', bg: '#FCE6DF' },
    ],
  };
  return <RegisterView v={v} />;
}

export function FaqPage() {
  const c = useCommon();
  const { site, showMarkers } = c;
  const [faqCat, setFaqCat] = useState(site.faqCategories[0]?.key || 'registration');
  const faq = useFaq(showMarkers);
  const v = {
    ...c,
    faqTabs: site.faqCategories.map((x) => ({
      id: x.key, label: x.label, current: faqCat === x.key ? 'true' : undefined, navBg: faqCat === x.key ? '#fff' : 'transparent',
      weight: faqCat === x.key ? 600 : 500, count: site.faqs.filter((f) => f.category === x.key).length, onClick: () => setFaqCat(x.key),
    })),
    faqCat,
    setFaqCat: (e: React.ChangeEvent<HTMLSelectElement>) => setFaqCat(e.target.value),
    faqCatLabel: site.faqCategories.find((x) => x.key === faqCat)?.label || '',
    faqList: site.faqs.filter((f) => f.category === faqCat).map(faq),
  };
  return <FaqView v={v} />;
}

const EMPTY_CON = { name: '', email: '', topic: 'general', message: '' };

export function ContactPage() {
  const c = useCommon();
  const { st } = c;
  const f = useDesignForm<typeof EMPTY_CON, { ref: string }>('con', '/inquiries', EMPTY_CON);
  const v = {
    ...c,
    cf: f.fields,
    con: { ...f.meta, btnText: f.meta.loading ? 'Sending…' : 'Send an Inquiry' },
    contactCards: [
      { label: 'Address', value: st.city ? st.city.replace(/, DE$/, ', Delaware') : 'Newark, Delaware', note: st.address || 'Street address to be published', bg: '#DDEFFC' },
      { label: 'Phone', value: st.phone || 'To be published', note: st.phone ? 'Call during opening hours' : 'Will be tap-to-call on mobile', bg: '#DDF3E8' },
      { label: 'Email', value: st.email || 'To be published', note: st.email ? 'The center replies by email' : 'Will open your email app', bg: '#FCE6DF' },
      { label: 'Hours', value: st.hours || 'To be published', note: 'Weekday and weekend hours', bg: '#F3EBDD' },
    ],
  };
  return <ContactView v={v} />;
}
