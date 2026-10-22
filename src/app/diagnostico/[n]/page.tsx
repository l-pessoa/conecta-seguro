import { QuizScreen } from '@/components/flow/QuizScreen';

export default async function Page({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  return <QuizScreen phase="pre" n={Number(n) || 1} />;
}
