import { CoursePage } from '@/components/pages/Pages';

export default function Page({ params }: { params: { id: string } }) {
  return <CoursePage id={decodeURIComponent(params.id)} />;
}
