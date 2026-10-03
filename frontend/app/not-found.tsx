'use client';

import PageState from '@/components/PageState';
import { useStore } from '@/lib/store';

export default function NotFound() {
  const s = useStore();
  return (
    <PageState
      title="We couldn’t find that page"
      body="The link may be out of date. These are good places to start."
      actions={[
        { label: 'Browse courses', onClick: () => s.go('/courses'), primary: true },
        { label: 'Back to home', onClick: () => s.go('/') },
      ]}
    />
  );
}
