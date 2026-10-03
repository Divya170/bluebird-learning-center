'use client';

import { useState } from 'react';
import { api, ApiError, qs } from '@/lib/api';
import { useDebounced } from '@/hooks/useDebounced';
import type { Course, Faq, Inquiry, Program, Registration, Settings, Site, Teacher } from '@/lib/types';
import { useAdminResource } from './useAdminResource';
import { Btn, ConfirmDelete, Empty, Field, Notice, S, Switch, Toolbar, fieldBorder, fmtDateTime } from './ui';

type Common = { onChange: () => void; onUnauthorized: () => void; toast: (m: string) => void };
const card: React.CSSProperties = { background: '#FFFFFF', border: '1px solid rgba(23,50,77,0.14)', borderRadius: '16px', padding: '18px 20px' };
const select: React.CSSProperties = { height: '42px', padding: '0 10px', border: '1.5px solid #B8C4CF', borderRadius: '10px', background: '#fff' };
const h3: React.CSSProperties = { margin: 0, font: "700 20px/1.25 'Plus Jakarta Sans',sans-serif", color: '#17324D' };
const inputS = (err?: string): React.CSSProperties => ({ ...S.input, height: '46px', border: fieldBorder(err), background: '#FFFFFF', width: '100%' });
const areaS = (err?: string): React.CSSProperties => ({ padding: '10px 12px', border: fieldBorder(err), borderRadius: '10px', font: '400 15px/1.5 Inter,sans-serif', resize: 'vertical', width: '100%' });

/** Submits; maps field errors back onto the form. Returns the result or null. */
function useSubmit(onUnauthorized: () => void) {
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState('');
  const run = async <T,>(fn: () => Promise<T>): Promise<T | null> => {
    setBusy(true);
    setFail('');
    try {
      const r = await fn();
      setErrs({});
      return r;
    } catch (e) {
      const ae = e as ApiError;
      if (ae.status === 401) onUnauthorized();
      else if (ae.status === 400 && Object.keys(ae.errors).length) setErrs(ae.errors);
      else setFail(ae.message);
      return null;
    } finally {
      setBusy(false);
    }
  };
  return { errs, busy, fail, run, clear: (k: string) => setErrs((e) => ({ ...e, [k]: '' })) };
}

/* ---------------- Registrations & inquiries ---------------- */

function useInbox<T extends { id: number; status: string }>(base: string, extra: Record<string, string>, { onChange, onUnauthorized, toast }: Common) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const dq = useDebounced(q.trim(), 300);
  const res = useAdminResource<{ items: T[]; total: number }>(base + qs({ status, q: dq, ...extra }), onUnauthorized);
  const [rowError, setRowError] = useState<string | null>(null);
  const put = (o: T) => res.setData((d) => (d ? { ...d, items: d.items.map((x) => (x.id === o.id ? o : x)) } : d));
  return {
    q, setQ, status, setStatus, ...res, rowError,
    changeStatus: async (o: T, next: string) => {
      setRowError(null);
      put({ ...o, status: next });
      try {
        put(await api<T>(`${base}/${o.id}`, { method: 'PATCH', body: { status: next }, admin: true }));
        toast('Marked ' + next);
        onChange();
      } catch (e) {
        put(o);
        setRowError((e as Error).message);
      }
    },
    remove: async (o: T) => {
      try {
        await api(`${base}/${o.id}`, { method: 'DELETE', admin: true });
        res.setData((d) => (d ? { items: d.items.filter((x) => x.id !== o.id), total: d.total - 1 } : d));
        toast('Deleted');
        onChange();
      } catch (e) {
        setRowError((e as Error).message);
      }
    },
  };
}

function InboxList<T extends { id: number; ref: string; status: string }>({ inbox, statuses, placeholder, emptyTitle, emptyBody, render, filters }: {
  inbox: ReturnType<typeof useInbox<any>>; statuses: string[]; placeholder: string; emptyTitle: string; emptyBody: string; render: (o: T) => React.ReactNode; filters?: React.ReactNode;
}) {
  const { data, loading, error, reload, rowError } = inbox;
  if (!data && loading) return <Notice kind="loading">Loading…</Notice>;
  if (!data) return <Notice kind="error" onRetry={reload}>{error}</Notice>;
  if (data.total === 0) return <Empty title={emptyTitle} body={emptyBody} />;
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 520px' }}>
          <Toolbar q={inbox.q} onQ={inbox.setQ} status={inbox.status} onStatus={inbox.setStatus} statuses={statuses} placeholder={placeholder} count={loading ? 'Updating…' : `${data.items.length} of ${data.total}`} />
        </div>
        {filters}
      </div>
      {(error || rowError) && <div style={{ marginBottom: '14px' }}><Notice kind="error" onRetry={error ? reload : undefined}>{error || rowError}</Notice></div>}
      {data.items.length === 0 ? <Empty title="Nothing matches" body="Try a different search or status." /> : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.items.map((o: any) => (
            <li key={o.id} style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '12px 24px', alignItems: 'start' }}>
              {render(o)}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <select value={o.status} onChange={(e) => inbox.changeStatus(o, e.target.value)} aria-label={`Status of ${o.ref}`} style={select}>
                  {statuses.map((st) => <option key={st} value={st}>{st}</option>)}
                </select>
                <ConfirmDelete label={`Delete ${o.ref}`} onConfirm={() => inbox.remove(o)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const lbl: React.CSSProperties = { margin: 0, font: '600 12px Inter,sans-serif', letterSpacing: '.06em', textTransform: 'uppercase', color: '#4A6178' };
const refS: React.CSSProperties = { margin: '2px 0 0', font: '500 13px Inter,sans-serif', color: '#4A6178' };

export function RegistrationsTab({ site, ...props }: Common & { site: Site }) {
  const [course, setCourse] = useState('');
  const inbox = useInbox<Registration>('/admin/registrations', { course }, props);
  return (
    <InboxList<Registration>
      inbox={inbox} statuses={site.registrationStatuses} placeholder="Search student, guardian, email or course"
      emptyTitle="No registration requests yet" emptyBody="Requests sent from the Register page appear here. Follow up by email or phone, then update the status."
      filters={
        <select aria-label="Filter by course" value={course} onChange={(e) => setCourse(e.target.value)} style={{ ...select, marginBottom: '18px' }}>
          <option value="">All courses</option>
          <option value="unsure">Not sure yet</option>
          {site.courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      }
      render={(o) => (
        <>
          <div>
            <p style={{ margin: 0, font: "700 17px 'Plus Jakarta Sans',sans-serif", color: '#17324D' }}>{o.studentName}</p>
            <p style={refS}>{o.ref} · {fmtDateTime(o.createdAt)}</p>
            <p style={{ margin: '6px 0 0', fontSize: '15px' }}>{o.isStudent ? 'Submitted by the student' : `Parent / guardian: ${o.guardianName}`}</p>
            <p style={{ margin: '4px 0 0', fontSize: '15px', display: 'flex', flexDirection: 'column' }}>
              <a href={`mailto:${o.email}?subject=${encodeURIComponent('Your Bluebird registration ' + o.ref)}`}>{o.email}</a>
              {o.phone && <a href={`tel:${o.phone.replace(/[^\d+]/g, '')}`}>{o.phone}</a>}
            </p>
          </div>
          <div>
            <p style={lbl}>Course</p>
            <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{o.courseName}</p>
            {o.message && <p style={{ margin: '8px 0 0', color: '#4A6178', fontSize: '15px', whiteSpace: 'pre-line' }}>{o.message}</p>}
          </div>
        </>
      )}
    />
  );
}

export function InquiriesTab({ site, ...props }: Common & { site: Site }) {
  const inbox = useInbox<Inquiry>('/admin/inquiries', {}, props);
  return (
    <InboxList<Inquiry>
      inbox={inbox} statuses={site.inquiryStatuses} placeholder="Search name, email or message"
      emptyTitle="No inquiries yet" emptyBody="Messages from the Contact page land here."
      render={(o) => (
        <>
          <div>
            <p style={{ margin: 0, font: "700 17px 'Plus Jakarta Sans',sans-serif", color: '#17324D' }}>{o.name}</p>
            <p style={refS}>{o.ref} · {fmtDateTime(o.createdAt)}</p>
            <p style={{ margin: '6px 0 0', fontSize: '15px' }}><a href={`mailto:${o.email}?subject=${encodeURIComponent('Re: your message to Bluebird Learning Center')}`}>{o.email}</a></p>
          </div>
          <div>
            <p style={lbl}>{o.topicLabel}</p>
            <p style={{ margin: '4px 0 0', color: '#4A6178', fontSize: '15px', whiteSpace: 'pre-line' }}>{o.message}</p>
          </div>
        </>
      )}
    />
  );
}

/* ---------------- Courses ---------------- */

function CourseForm({ course, programs, onSaved, onCancel, onUnauthorized }: { course: Course | null; programs: Program[]; onSaved: (c: Course, created: boolean) => void; onCancel: () => void; onUnauthorized: () => void }) {
  const { errs, busy, fail, run, clear } = useSubmit(onUnauthorized);
  const [d, setD] = useState({
    name: course?.name ?? '', programId: course?.programId ?? programs[0]?.id ?? '', description: course?.description ?? '', long: course?.long ?? '',
    schedule: course?.schedule ?? '', level: course?.level ?? '', requirements: course?.requirements ?? '', published: course?.published ?? true,
  });
  const idp = `cf-${course?.id ?? 'new'}-`;
  const set = (k: keyof typeof d, val: any) => { setD({ ...d, [k]: val }); clear(k); };
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await run(() => (course ? api<Course>('/admin/courses/' + course.id, { method: 'PUT', body: d, admin: true }) : api<Course>('/admin/courses', { method: 'POST', body: d, admin: true })));
    if (r) onSaved(r, !course);
  };
  const text = (k: 'name' | 'schedule' | 'level' | 'requirements', label: string, hint?: string) => (
    <Field id={idp + k} label={label} error={errs[k]} hint={hint}>
      <input id={idp + k} value={d[k]} onChange={(e) => set(k, e.target.value)} style={inputS(errs[k])} />
    </Field>
  );
  return (
    <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: course ? '14px' : 0 }}>
      {!course && <h3 style={h3}>Add a course</h3>}
      {fail && <Notice kind="error">{fail}</Notice>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '14px 18px' }}>
        {text('name', 'Course title *')}
        <Field id={idp + 'programId'} label="Program *" error={errs.programId}>
          <select id={idp + 'programId'} value={d.programId} onChange={(e) => set('programId', e.target.value)} style={inputS(errs.programId)}>
            {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </Field>
        {text('schedule', 'Schedule', 'Blank shows “To be announced”')}
        {text('level', 'Level / age', 'Blank shows “To be confirmed”')}
        {text('requirements', 'Requirements', 'Blank shows “None listed”')}
      </div>
      <Field id={idp + 'description'} label="Summary (course cards)" error={errs.description}>
        <textarea id={idp + 'description'} rows={2} value={d.description} onChange={(e) => set('description', e.target.value)} style={areaS(errs.description)}></textarea>
      </Field>
      <Field id={idp + 'long'} label="Full description (course page)" error={errs.long}>
        <textarea id={idp + 'long'} rows={4} value={d.long} onChange={(e) => set('long', e.target.value)} style={areaS(errs.long)}></textarea>
      </Field>
      <Switch on={d.published} label="Shown on the website" onToggle={() => set('published', !d.published)} text={d.published ? 'Shown on the website' : 'Hidden'} />
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Btn type="submit" busy={busy}>{busy ? 'Saving…' : course ? 'Save course' : 'Add course'}</Btn>
        <Btn kind="link" onClick={onCancel}>Cancel</Btn>
      </div>
    </form>
  );
}

export function CoursesTab({ site, onChange, onUnauthorized, toast }: Common & { site: Site }) {
  const { data, setData, loading, error, reload } = useAdminResource<Course[]>('/admin/courses', onUnauthorized);
  const [editing, setEditing] = useState<string | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);
  if (!data && loading) return <Notice kind="loading">Loading courses…</Notice>;
  if (!data) return <Notice kind="error" onRetry={reload}>{error}</Notice>;
  const saved = (c: Course, created: boolean) => {
    setData((d) => (d ? (created ? [...d, c] : d.map((x) => (x.id === c.id ? c : x))) : d));
    setEditing(null);
    toast(created ? `${c.name} added` : `${c.name} saved`);
    onChange();
  };
  const remove = async (c: Course) => {
    try {
      await api('/admin/courses/' + c.id, { method: 'DELETE', admin: true });
      setData((d) => (d ? d.filter((x) => x.id !== c.id) : d));
      toast(`${c.name} deleted`);
      onChange();
    } catch (e) {
      setRowError((e as Error).message);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <p style={{ margin: 0, fontSize: '15px', color: '#4A6178' }}>{data.length} courses · {data.filter((c) => c.published).length} shown on the website</p>
        {editing !== 'new' && <Btn onClick={() => setEditing('new')}>Add course</Btn>}
      </div>
      {rowError && <Notice kind="error">{rowError}</Notice>}
      {editing === 'new' && <div style={card}><CourseForm course={null} programs={site.programs} onSaved={saved} onCancel={() => setEditing(null)} onUnauthorized={onUnauthorized} /></div>}
      {data.length === 0 && <Empty title="No courses yet" body="Add the first course to open registration." />}
      {data.map((c) => (
        <div key={c.id} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', minWidth: 0 }}>
              <span aria-hidden="true" style={{ width: '12px', height: '44px', borderRadius: '6px', background: c.programBg }}></span>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: '#17324D' }}>{c.name} {!c.published && <span style={{ fontWeight: 500, fontSize: '13px', color: '#B42318' }}>· Hidden</span>}</p>
                <p style={{ margin: 0, color: '#4A6178', fontSize: '14px' }}>{c.programName} · {c.schedule || 'Schedule to be announced'}</p>
              </div>
            </div>
            <span style={{ display: 'inline-flex', gap: '16px', alignItems: 'center' }}>
              <Btn kind="link" onClick={() => setEditing(editing === c.id ? null : c.id)}>{editing === c.id ? 'Close' : 'Edit'}</Btn>
              <ConfirmDelete label={'Delete ' + c.name} onConfirm={() => remove(c)} />
            </span>
          </div>
          {editing === c.id && <CourseForm course={c} programs={site.programs} onSaved={saved} onCancel={() => setEditing(null)} onUnauthorized={onUnauthorized} />}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Programs ---------------- */

function ProgramForm({ program, onSaved, onCancel, onUnauthorized }: { program: Program | null; onSaved: (p: Program) => void; onCancel: () => void; onUnauthorized: () => void }) {
  const { errs, busy, fail, run, clear } = useSubmit(onUnauthorized);
  const [d, setD] = useState({ name: program?.name ?? '', short: program?.short ?? '', long: program?.long ?? '', audience: program?.audience ?? '' });
  const idp = `pf-${program?.id ?? 'new'}-`;
  const set = (k: keyof typeof d, v: string) => { setD({ ...d, [k]: v }); clear(k); };
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await run(() => (program ? api<Program>('/admin/programs/' + program.id, { method: 'PATCH', body: d, admin: true }) : api<Program>('/admin/programs', { method: 'POST', body: d, admin: true })));
    if (r) onSaved(r);
  };
  return (
    <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: program ? '14px' : 0 }}>
      {!program && <h3 style={h3}>Add a program</h3>}
      {fail && <Notice kind="error">{fail}</Notice>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '14px 18px' }}>
        <Field id={idp + 'name'} label="Program name *" error={errs.name}><input id={idp + 'name'} value={d.name} onChange={(e) => set('name', e.target.value)} style={inputS(errs.name)} /></Field>
        <Field id={idp + 'audience'} label="Intended for" error={errs.audience} hint="Blank shows “Audience / level to be confirmed”"><input id={idp + 'audience'} value={d.audience} onChange={(e) => set('audience', e.target.value)} style={inputS(errs.audience)} /></Field>
      </div>
      <Field id={idp + 'short'} label="Short summary" error={errs.short}><textarea id={idp + 'short'} rows={2} value={d.short} onChange={(e) => set('short', e.target.value)} style={areaS(errs.short)}></textarea></Field>
      {program && <Field id={idp + 'long'} label="Full description" error={errs.long}><textarea id={idp + 'long'} rows={4} value={d.long} onChange={(e) => set('long', e.target.value)} style={areaS(errs.long)}></textarea></Field>}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Btn type="submit" busy={busy}>{busy ? 'Saving…' : program ? 'Save program' : 'Add program'}</Btn>
        <Btn kind="link" onClick={onCancel}>Cancel</Btn>
      </div>
    </form>
  );
}

export function ProgramsTab({ site, onChange, onUnauthorized, toast }: Common & { site: Site }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);
  const done = (msg: string) => { setEditing(null); toast(msg); onChange(); };
  const remove = async (p: Program) => {
    setRowError(null);
    try {
      await api('/admin/programs/' + p.id, { method: 'DELETE', admin: true });
      done(`${p.name} deleted`);
    } catch (e) {
      const ae = e as ApiError;
      setRowError(Object.values(ae.errors || {})[0] || ae.message);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <p style={{ margin: 0, fontSize: '15px', color: '#4A6178' }}>The first program is featured on the home page.</p>
        {editing !== 'new' && <Btn onClick={() => setEditing('new')}>Add program</Btn>}
      </div>
      {rowError && <Notice kind="error">{rowError}</Notice>}
      {editing === 'new' && <div style={card}><ProgramForm program={null} onSaved={(p) => done(`${p.name} added`)} onCancel={() => setEditing(null)} onUnauthorized={onUnauthorized} /></div>}
      {site.programs.map((p) => (
        <div key={p.id} style={{ ...card, borderLeft: `8px solid ${p.bg}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: '#17324D' }}>{p.code} · {p.name}</p>
              <p style={{ margin: 0, color: '#4A6178', fontSize: '14px' }}>{site.courses.filter((c) => c.programId === p.id).length} courses · {p.audience || 'Audience to be confirmed'}</p>
            </div>
            <span style={{ display: 'inline-flex', gap: '16px', alignItems: 'center' }}>
              <Btn kind="link" onClick={() => setEditing(editing === p.id ? null : p.id)}>{editing === p.id ? 'Close' : 'Edit'}</Btn>
              <ConfirmDelete label={'Delete ' + p.name} onConfirm={() => remove(p)} />
            </span>
          </div>
          {editing === p.id && <ProgramForm program={p} onSaved={(n) => done(`${n.name} saved`)} onCancel={() => setEditing(null)} onUnauthorized={onUnauthorized} />}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Teachers ---------------- */

function TeacherForm({ teacher, courses, onSaved, onCancel, onUnauthorized }: { teacher: Teacher | null; courses: Course[]; onSaved: (t: Teacher, created: boolean) => void; onCancel: () => void; onUnauthorized: () => void }) {
  const { errs, busy, fail, run, clear } = useSubmit(onUnauthorized);
  const [d, setD] = useState({ name: teacher?.name ?? '', role: teacher?.role ?? '', bio: teacher?.bio ?? '', courseIds: teacher?.courseIds ?? [] as string[] });
  const idp = `tf-${teacher?.id ?? 'new'}-`;
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await run(() => (teacher ? api<Teacher>('/admin/teachers/' + teacher.id, { method: 'PUT', body: d, admin: true }) : api<Teacher>('/admin/teachers', { method: 'POST', body: d, admin: true })));
    if (r) onSaved(r, !teacher);
  };
  const toggle = (id: string) => setD({ ...d, courseIds: d.courseIds.includes(id) ? d.courseIds.filter((x) => x !== id) : [...d.courseIds, id] });
  return (
    <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: teacher ? '14px' : 0 }}>
      {!teacher && <h3 style={h3}>Add a teacher</h3>}
      {fail && <Notice kind="error">{fail}</Notice>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '14px 18px' }}>
        <Field id={idp + 'name'} label="Name *" error={errs.name}><input id={idp + 'name'} value={d.name} onChange={(e) => { setD({ ...d, name: e.target.value }); clear('name'); }} style={inputS(errs.name)} /></Field>
        <Field id={idp + 'role'} label="Role" error={errs.role} hint="Blank shows “Role to be confirmed”"><input id={idp + 'role'} value={d.role} onChange={(e) => setD({ ...d, role: e.target.value })} style={inputS(errs.role)} /></Field>
      </div>
      <Field id={idp + 'bio'} label="Biography" error={errs.bio} hint="Only include qualifications the center has verified.">
        <textarea id={idp + 'bio'} rows={4} value={d.bio} onChange={(e) => setD({ ...d, bio: e.target.value })} style={areaS(errs.bio)}></textarea>
      </Field>
      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend style={{ ...S.label, padding: 0, marginBottom: '8px' }}>Courses taught</legend>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {courses.map((c) => (
            <label key={c.id} style={{ minHeight: '40px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px', border: '1.5px solid #B8C4CF', borderRadius: '999px', background: d.courseIds.includes(c.id) ? '#DDEFFC' : '#fff', cursor: 'pointer', fontSize: '14.5px' }}>
              <input type="checkbox" checked={d.courseIds.includes(c.id)} onChange={() => toggle(c.id)} style={{ accentColor: '#1769AA' }} />
              {c.name}
            </label>
          ))}
        </div>
        {errs.courseIds && <span style={S.err}>{errs.courseIds}</span>}
      </fieldset>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Btn type="submit" busy={busy}>{busy ? 'Saving…' : teacher ? 'Save teacher' : 'Add teacher'}</Btn>
        <Btn kind="link" onClick={onCancel}>Cancel</Btn>
      </div>
    </form>
  );
}

export function TeachersTab({ site, onChange, onUnauthorized, toast }: Common & { site: Site }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);
  const saved = (t: Teacher, created: boolean) => { setEditing(null); toast(created ? `${t.name} added` : `${t.name} saved`); onChange(); };
  const remove = async (t: Teacher) => {
    try {
      await api('/admin/teachers/' + t.id, { method: 'DELETE', admin: true });
      toast(`${t.name} removed`);
      onChange();
    } catch (e) {
      setRowError((e as Error).message);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{editing !== 'new' && <Btn onClick={() => setEditing('new')}>Add teacher</Btn>}</div>
      {rowError && <Notice kind="error">{rowError}</Notice>}
      {editing === 'new' && <div style={card}><TeacherForm teacher={null} courses={site.courses} onSaved={saved} onCancel={() => setEditing(null)} onUnauthorized={onUnauthorized} /></div>}
      {site.teachers.length === 0 && <Empty title="No teachers listed" body="Add the people families will meet at the center." />}
      {site.teachers.map((t) => (
        <div key={t.id} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: '#17324D' }}>{t.name}</p>
              <p style={{ margin: 0, color: '#4A6178', fontSize: '14px' }}>{t.role} · {t.courseIds.length} course{t.courseIds.length === 1 ? '' : 's'}</p>
            </div>
            <span style={{ display: 'inline-flex', gap: '16px', alignItems: 'center' }}>
              <Btn kind="link" onClick={() => setEditing(editing === t.id ? null : t.id)}>{editing === t.id ? 'Close' : 'Edit'}</Btn>
              <ConfirmDelete label={'Remove ' + t.name} onConfirm={() => remove(t)} />
            </span>
          </div>
          {editing === t.id && <TeacherForm teacher={t} courses={site.courses} onSaved={saved} onCancel={() => setEditing(null)} onUnauthorized={onUnauthorized} />}
        </div>
      ))}
    </div>
  );
}

/* ---------------- FAQ & "Why Bluebird" themes ---------------- */

function FaqForm({ faq, categories, onSaved, onCancel, onUnauthorized }: { faq: Faq | null; categories: Site['faqCategories']; onSaved: (created: boolean) => void; onCancel: () => void; onUnauthorized: () => void }) {
  const { errs, busy, fail, run, clear } = useSubmit(onUnauthorized);
  const [d, setD] = useState({ category: faq?.category ?? categories[0]?.key ?? '', question: faq?.question ?? '', answer: faq && !faq.pending ? faq.answer : faq?.answer ?? '', pending: faq?.pending ?? false });
  const idp = `ff-${faq?.id ?? 'new'}-`;
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await run(() => (faq ? api('/admin/faqs/' + faq.id, { method: 'PUT', body: d, admin: true }) : api('/admin/faqs', { method: 'POST', body: d, admin: true })));
    if (r) onSaved(!faq);
  };
  return (
    <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: faq ? '14px' : 0 }}>
      {!faq && <h3 style={h3}>Add a question</h3>}
      {fail && <Notice kind="error">{fail}</Notice>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '14px 18px' }}>
        <Field id={idp + 'category'} label="Topic *" error={errs.category}>
          <select id={idp + 'category'} value={d.category} onChange={(e) => { setD({ ...d, category: e.target.value }); clear('category'); }} style={inputS(errs.category)}>
            {categories.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
        </Field>
        <Field id={idp + 'question'} label="Question *" error={errs.question}><input id={idp + 'question'} value={d.question} onChange={(e) => { setD({ ...d, question: e.target.value }); clear('question'); }} style={inputS(errs.question)} /></Field>
      </div>
      <Field id={idp + 'answer'} label="Answer *" error={errs.answer}><textarea id={idp + 'answer'} rows={3} value={d.answer} onChange={(e) => { setD({ ...d, answer: e.target.value }); clear('answer'); }} style={areaS(errs.answer)}></textarea></Field>
      <Switch on={d.pending} label="Answer still to be confirmed" onToggle={() => setD({ ...d, pending: !d.pending })} text={d.pending ? 'Marked “to be confirmed” on the site' : 'Final answer'} />
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Btn type="submit" busy={busy}>{busy ? 'Saving…' : faq ? 'Save answer' : 'Add question'}</Btn>
        <Btn kind="link" onClick={onCancel}>Cancel</Btn>
      </div>
    </form>
  );
}

function ThemeRow({ t, onUnauthorized, onSaved }: { t: Site['themes'][number]; onUnauthorized: () => void; onSaved: () => void }) {
  const { errs, busy, run } = useSubmit(onUnauthorized);
  const [open, setOpen] = useState(false);
  const [d, setD] = useState({ title: t.title, body: t.body });
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await run(() => api('/admin/themes/' + t.n, { method: 'PATCH', body: d, admin: true }))) { setOpen(false); onSaved(); }
  };
  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
        <p style={{ margin: 0, fontWeight: 700, color: '#17324D' }}>{t.n} · {t.title}</p>
        <Btn kind="link" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Edit'}</Btn>
      </div>
      {open && (
        <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '12px' }}>
          <Field id={`th-${t.n}-title`} label="Title" error={errs.title}><input id={`th-${t.n}-title`} value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} style={inputS(errs.title)} /></Field>
          <Field id={`th-${t.n}-body`} label="Text" error={errs.body}><textarea id={`th-${t.n}-body`} rows={3} value={d.body} onChange={(e) => setD({ ...d, body: e.target.value })} style={areaS(errs.body)}></textarea></Field>
          <div><Btn type="submit" busy={busy}>{busy ? 'Saving…' : 'Save'}</Btn></div>
        </form>
      )}
    </div>
  );
}

export function FaqTab({ site, onChange, onUnauthorized, toast }: Common & { site: Site }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);
  const saved = (created: boolean) => { setEditing(null); toast(created ? 'Question added' : 'Answer saved'); onChange(); };
  const remove = async (f: Faq) => {
    try {
      await api('/admin/faqs/' + f.id, { method: 'DELETE', admin: true });
      toast('Question deleted');
      onChange();
    } catch (e) {
      setRowError((e as Error).message);
    }
  };
  const pending = site.faqs.filter((f) => f.pending).length;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <p style={{ margin: 0, fontSize: '15px', color: '#4A6178' }}>{site.faqs.length} questions{pending ? ` · ${pending} answers still to be confirmed` : ''}</p>
        {editing !== 'new' && <Btn onClick={() => setEditing('new')}>Add question</Btn>}
      </div>
      {rowError && <Notice kind="error">{rowError}</Notice>}
      {editing === 'new' && <div style={card}><FaqForm faq={null} categories={site.faqCategories} onSaved={saved} onCancel={() => setEditing(null)} onUnauthorized={onUnauthorized} /></div>}
      {site.faqCategories.map((cat) => {
        const items = site.faqs.filter((f) => f.category === cat.key);
        if (!items.length) return null;
        return (
          <section key={cat.key}>
            <h3 style={{ ...h3, marginBottom: '8px' }}>{cat.label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map((f) => (
                <div key={f.id} style={card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 600 }}>{f.question}{f.pending && <span style={{ marginLeft: '8px', padding: '2px 8px', borderRadius: '999px', background: '#FEF0C7', color: '#93370D', fontSize: '12px', fontWeight: 600 }}>To confirm</span>}</p>
                      <p style={{ margin: '4px 0 0', color: '#4A6178', fontSize: '15px' }}>{f.answer}</p>
                    </div>
                    <span style={{ display: 'inline-flex', gap: '16px', alignItems: 'center' }}>
                      <Btn kind="link" onClick={() => setEditing(editing === f.id ? null : f.id)}>{editing === f.id ? 'Close' : f.pending ? 'Answer' : 'Edit'}</Btn>
                      <ConfirmDelete label={'Delete question: ' + f.question} onConfirm={() => remove(f)} />
                    </span>
                  </div>
                  {editing === f.id && <FaqForm faq={f} categories={site.faqCategories} onSaved={saved} onCancel={() => setEditing(null)} onUnauthorized={onUnauthorized} />}
                </div>
              ))}
            </div>
          </section>
        );
      })}
      <section>
        <h3 style={{ ...h3, marginBottom: '4px' }}>Why families choose Bluebird</h3>
        <p style={{ margin: '0 0 10px', fontSize: '14.5px', color: '#4A6178' }}>The four themes shown on the home and About pages.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {site.themes.map((t) => <ThemeRow key={t.n + t.title} t={t} onUnauthorized={onUnauthorized} onSaved={() => { toast('Saved'); onChange(); }} />)}
        </div>
      </section>
    </div>
  );
}

/* ---------------- Center details ---------------- */

const SETTING_FIELDS: [keyof Settings, string, string][] = [
  ['address', 'Street address', 'Blank shows “Street address · Newark, DE”'],
  ['city', 'City, state', 'e.g. Newark, DE'],
  ['phone', 'Phone', ''],
  ['email', 'Email', ''],
  ['hours', 'Hours', 'e.g. Mon–Thu 3:30–7:30 pm · Sat 9 am–1 pm'],
  ['mapsUrl', 'Directions link', 'Google Maps link used for “Get directions”'],
];

export function CenterTab({ site, onChange, onUnauthorized, toast }: Common & { site: Site }) {
  const { errs, busy, fail, run, clear } = useSubmit(onUnauthorized);
  const [d, setD] = useState<Settings>(site.settings);
  const dirty = JSON.stringify(d) !== JSON.stringify(site.settings);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await run(() => api('/admin/settings', { method: 'PUT', body: d, admin: true }))) { toast('Center details saved — the website is updated'); onChange(); }
  };
  return (
    <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '900px' }}>
      {fail && <Notice kind="error">{fail}</Notice>}
      <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <Switch on={d.showMarkers} label="Show “to confirm” markers" onToggle={() => setD({ ...d, showMarkers: !d.showMarkers })} text={d.showMarkers ? '“To confirm” markers are showing' : 'Markers are hidden'} />
        <p style={{ margin: 0, fontSize: '14px', color: '#4A6178' }}>While content is being finalized, details the center hasn’t confirmed are flagged on the site. Turn this off before launch.</p>
        <label style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '15px' }}>
          Course listing layout
          <select value={d.courseView} onChange={(e) => setD({ ...d, courseView: e.target.value as Settings['courseView'] })} style={select}>
            <option value="grid">Grid of cards</option>
            <option value="list">List</option>
          </select>
        </label>
      </div>
      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend style={{ ...h3, padding: 0, marginBottom: '12px' }}>Contact & location</legend>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '16px 22px' }}>
          {SETTING_FIELDS.map(([k, label, hint]) => (
            <Field key={k} id={'set-' + k} label={label} error={errs[k]} hint={hint || undefined}>
              <input id={'set-' + k} value={d[k] as string} onChange={(e) => { setD({ ...d, [k]: e.target.value }); clear(k); }} style={inputS(errs[k])} />
            </Field>
          ))}
        </div>
      </fieldset>
      <Field id="set-story" label="Our story (About page)" error={errs.story} hint="Blank keeps the placeholder text until the center supplies its own words.">
        <textarea id="set-story" rows={6} value={d.story} onChange={(e) => { setD({ ...d, story: e.target.value }); clear('story'); }} style={areaS(errs.story)}></textarea>
      </Field>
      <div style={{ position: 'sticky', bottom: 0, background: '#FBFAF7', padding: '14px 0', borderTop: '1px solid rgba(23,50,77,0.14)', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Btn type="submit" busy={busy} disabled={!dirty}>{busy ? 'Saving…' : 'Save changes'}</Btn>
        {dirty ? <Btn kind="link" onClick={() => setD(site.settings)}>Discard</Btn> : <span style={{ fontSize: '14px', color: '#4A6178' }}>All changes saved</span>}
      </div>
    </form>
  );
}
