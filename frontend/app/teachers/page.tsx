import type { Metadata } from 'next';
import { TeachersPage } from '@/components/pages/Pages';

export const metadata: Metadata = { title: 'Teachers' };

export default function Page() {
  return <TeachersPage />;
}
