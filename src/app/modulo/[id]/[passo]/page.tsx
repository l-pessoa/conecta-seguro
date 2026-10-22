import { ModuleScreen } from '@/components/flow/ModuleScreen';

export default async function Page({ params }: { params: Promise<{ id: string; passo: string }> }) {
  const { id, passo } = await params;
  return <ModuleScreen id={Number(id)} passo={Number(passo)} />;
}
