import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CoursesPage } from '@/components/pages/Pages';

export const metadata: Metadata = { title: 'Courses' };

export default function Page() {
  return (
    <Suspense>
      <CoursesPage />
    </Suspense>
  );
}
