import type { Metadata } from 'next';
import AdminPage from '@/components/pages/AdminPage';

export const metadata: Metadata = { title: 'Staff admin', robots: { index: false } };

export default function Page() {
  return <AdminPage />;
}
