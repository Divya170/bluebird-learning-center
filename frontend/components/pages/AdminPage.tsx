'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCommon } from '@/lib/vm';
import { api, ApiError, adminToken } from '@/lib/api';
import { RegistrationsTab, InquiriesTab, CoursesTab, ProgramsTab, TeachersTab, FaqTab, CenterTab } from '../admin/Admin';
import { Btn, Field, Notice, S, fieldBorder } from '../admin/ui';

type Tab = 'registrations' | 'inquiries' | 'courses' | 'programs' | 'teachers' | 'faq' | 'center';
type Summary = { registrations: number; newRegistrations: number; inquiries: number; newInquiries: number };

function Login({ onUnlocked }: { onUnlocked: () => void }) {
  const [token, setToken] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return setErr('Enter the staff passcode.');
    setBusy(true);
    setErr('');
    try {
      await api('/admin/session', { method: 'POST', body: { token: token.trim() } });
      adminToken.set(token.trim());
      onUnlocked();
    } catch (e2) {
      setErr((e2 as ApiError).message);
      document.getElementById('admin-token')?.focus();
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} noValidate style={{ maxWidth: '440px', background: '#FFFFFF', border: '1px solid rgba(23,50,77,0.14)', borderRadius: '20px', padding: 'clamp(24px,4vw,36px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ margin: 0, font: "800 28px/1.15 'Plus Jakarta Sans',sans-serif", color: '#17324D' }}>Staff sign-in</h2>
      <p style={{ margin: 0, color: '#4A6178', fontSize: '15.5px' }}>Enter the passcode to view registration requests and update the website.</p>
      <Field id="admin-token" label="Passcode" error={err}>
        <input id="admin-token" type="password" autoComplete="current-password" value={token} onChange={(e) => { setToken(e.target.value); setErr(''); }} aria-invalid={!!err} style={{ ...S.input, height: '50px', border: fieldBorder(err), width: '100%' }} />
      </Field>
      <Btn type="submit" busy={busy}>{busy ? 'Checking…' : 'Open the admin'}</Btn>
    </form>
  );
}

export default function AdminPage() {
  const c = useCommon();
  const { s, site } = c;
  const [auth, setAuth] = useState<'checking' | 'locked' | 'open'>('checking');
  const [tab, setTab] = useState<Tab>('registrations');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [summaryErr, setSummaryErr] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const tt = useRef<ReturnType<typeof setTimeout>>();

  const showToast = useCallback((m: string) => {
    clearTimeout(tt.current);
    setToast(m);
    tt.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const loadSummary = useCallback(async () => {
    try {
      setSummary(await api<Summary>('/admin/summary', { admin: true }));
      setSummaryErr(null);
      setAuth('open');
    } catch (e) {
      if ((e as ApiError).status === 401) setAuth('locked');
      else {
        setSummaryErr((e as Error).message);
        setAuth('open');
      }
    }
  }, []);
  useEffect(() => { loadSummary(); }, [loadSummary]);

  const lock = useCallback(() => { adminToken.clear(); setAuth('locked'); }, []);
  const refresh = s.refreshSite;
  const changed = useCallback(() => { loadSummary(); refresh(); }, [loadSummary, refresh]);

  const label = (base: string, fresh?: number, total?: number) => base + (fresh ? ` (${fresh} new)` : total ? ` (${total})` : '');
  const tabs: [Tab, string][] = [
    ['registrations', label('Registrations', summary?.newRegistrations, summary?.registrations)],
    ['inquiries', label('Inquiries', summary?.newInquiries, summary?.inquiries)],
    ['courses', 'Courses'],
    ['programs', 'Programs'],
    ['teachers', 'Teachers'],
    ['faq', 'FAQ & themes'],
    ['center', 'Center details'],
  ];
  const common = { site, onUnauthorized: lock, toast: showToast, onChange: changed };

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(32px,5vw,64px) clamp(20px,4vw,40px) clamp(64px,8vw,104px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap', marginBottom: '26px' }}>
        <div>
          <p style={{ margin: '0 0 10px', font: '600 13px Inter,sans-serif', letterSpacing: '.08em', textTransform: 'uppercase', color: '#1769AA' }}>Staff only</p>
          <h1 style={{ margin: 0, font: "800 clamp(36px,4.5vw,52px)/1.05 'Plus Jakarta Sans',sans-serif", color: '#17324D', letterSpacing: '-0.02em' }}>Center admin</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          <p style={{ margin: 0, fontSize: '15px', color: '#4A6178', maxWidth: '420px' }}>Follow up on registrations and replace the site’s placeholder content as Bluebird supplies it.</p>
          {auth === 'open' && adminToken.get() && <Btn kind="link" onClick={lock}>Sign out</Btn>}
        </div>
      </div>
      {auth === 'checking' && <Notice kind="loading">Opening the admin…</Notice>}
      {auth === 'locked' && <Login onUnlocked={loadSummary} />}
      {auth === 'open' && (
        <>
          <div role="tablist" aria-label="Admin sections" style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '5px', background: '#DDEFFC', borderRadius: '999px', marginBottom: '26px', scrollbarWidth: 'none' }}>
            {tabs.map(([k, l]) => (
              <button key={k} role="tab" id={'tab-' + k} aria-selected={tab === k ? 'true' : 'false'} aria-controls={'panel-' + k} onClick={() => setTab(k)}
                style={{ flexShrink: 0, minHeight: '42px', padding: '0 18px', border: 0, borderRadius: '999px', background: tab === k ? '#17324D' : 'transparent', color: tab === k ? '#fff' : '#17324D', font: "700 14.5px 'Plus Jakarta Sans',sans-serif", cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {l}
              </button>
            ))}
          </div>
          {summaryErr && <div style={{ marginBottom: '16px' }}><Notice kind="error" onRetry={loadSummary}>{summaryErr}</Notice></div>}
          <div role="tabpanel" id={'panel-' + tab} aria-labelledby={'tab-' + tab}>
            {tab === 'registrations' && <RegistrationsTab {...common} />}
            {tab === 'inquiries' && <InquiriesTab {...common} />}
            {tab === 'courses' && <CoursesTab {...common} />}
            {tab === 'programs' && <ProgramsTab {...common} />}
            {tab === 'teachers' && <TeachersTab {...common} />}
            {tab === 'faq' && <FaqTab {...common} />}
            {tab === 'center' && <CenterTab {...common} />}
          </div>
        </>
      )}
      <div aria-live="polite" style={{ position: 'fixed', left: '50%', bottom: '24px', transform: 'translateX(-50%)', zIndex: 90, pointerEvents: 'none' }}>
        {toast && <div style={{ background: '#17324D', color: '#fff', padding: '14px 20px', borderRadius: '999px', fontSize: '15px', boxShadow: '0 16px 40px -16px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }}>{toast}</div>}
      </div>
    </section>
  );
}
