import { Suspense } from 'react';
import type { Metadata } from 'next';
import { RegisterPage } from '@/components/pages/Pages';

export const metadata: Metadata = { title: 'Register' };

export default function Page() {
  return (
    <Suspense>
      <RegisterPage />
    </Suspense>
  );
}
