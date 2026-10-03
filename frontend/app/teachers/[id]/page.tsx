import { TeacherPage } from '@/components/pages/Pages';

export default function Page({ params }: { params: { id: string } }) {
  return <TeacherPage id={decodeURIComponent(params.id)} />;
}
