import { Suspense } from 'react';
import { ConsentScreen } from '@/components/flow/ConsentScreen';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ConsentScreen />
    </Suspense>
  );
}
