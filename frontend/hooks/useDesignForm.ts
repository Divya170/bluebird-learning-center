'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { api, ApiError } from '@/lib/api';

type Values = Record<string, string | boolean>;
type Status = 'idle' | 'loading' | 'success';

/**
 * The design's form behaviour with validation owned by the backend:
 * errors show once a field is touched; a failed submit touches every field and focuses the first error.
 * Field checks go to `${endpoint}/validate`; the submit goes to `endpoint`.
 */
export function useDesignForm<V extends Values, R extends { ref: string }>(form: string, endpoint: string, blank: V) {
  const [values, setValues] = useState<V>(blank);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [attempted, setAttempted] = useState(false);
  const [failure, setFailure] = useState('');
  const [result, setResult] = useState<R | null>(null);
  const ref = useRef(values);
  ref.current = values;
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const ctl = useRef<AbortController | null>(null);

  const validate = useCallback(async () => {
    ctl.current?.abort();
    const c = new AbortController();
    ctl.current = c;
    try {
      setErrs((await api<{ errors: Record<string, string> }>(endpoint + '/validate', { method: 'POST', body: ref.current, signal: c.signal })).errors);
    } catch {
      /* offline or superseded: the submit reports problems */
    }
  }, [endpoint]);

  // keep messages current as the user edits (only matters once something is touched)
  useEffect(() => {
    if (!Object.keys(touched).length) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(validate, 250);
    return () => clearTimeout(timer.current);
  }, [values, touched, validate]);

  const fields = {} as Record<keyof V & string, { id: string; errId?: string; value: any; error: string; hasError: boolean; border: string; onChange: (e: React.ChangeEvent<any>) => void; onBlur: () => void }>;
  for (const k of Object.keys(values) as (keyof V & string)[]) {
    const err = touched[k] ? errs[k] : '';
    fields[k] = {
      id: `${form}-${k}`,
      errId: err ? `${form}-${k}-err` : undefined,
      value: values[k],
      error: err || '',
      hasError: !!err,
      border: err ? '#B42318' : '#B8C4CF',
      onChange: (e) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setValues((v) => ({ ...v, [k]: val }));
        setFailure('');
      },
      onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    };
  }

  const touchAll = () => setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
  const focusFirst = (e: Record<string, string>) => {
    const first = Object.keys(values).find((k) => e[k]);
    setTimeout(() => first && document.getElementById(`${form}-${first}`)?.focus(), 30);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setFailure('');
    try {
      const r = await api<R>(endpoint, { method: 'POST', body: values });
      setResult(r);
      setStatus('success');
      setTimeout(() => document.getElementById(`${form}-success`)?.focus(), 50);
    } catch (err) {
      const ae = err as ApiError;
      setStatus('idle');
      if (ae.status === 400 && Object.keys(ae.errors || {}).length) {
        setErrs(ae.errors);
        touchAll();
        setAttempted(true);
        focusFirst(ae.errors);
      } else setFailure(ae.message);
    }
  };

  const reset = (next?: Partial<V>) => {
    setValues({ ...blank, ...(next || {}) });
    setTouched({});
    setErrs({});
    setStatus('idle');
    setAttempted(false);
    setFailure('');
    setResult(null);
  };

  const visible = Object.keys(values).filter((k) => touched[k] && errs[k]).length;
  return {
    values,
    setValues,
    fields,
    result,
    meta: {
      isSuccess: status === 'success',
      isForm: status !== 'success',
      loading: status === 'loading',
      showSummary: attempted && visible > 0,
      errorCountText: visible === 1 ? '1 field' : `${visible} fields`,
      btnBg: status === 'loading' ? '#5A86AD' : '#1769AA',
      failure,
      ref: result?.ref || '',
      reset: () => reset(),
      submit,
    },
  };
}
