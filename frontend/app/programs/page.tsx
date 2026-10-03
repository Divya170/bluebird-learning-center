import type { Metadata } from 'next';
import { ProgramsPage } from '@/components/pages/Pages';

export const metadata: Metadata = { title: 'Programs' };

export default function Page() {
  return <ProgramsPage />;
}
