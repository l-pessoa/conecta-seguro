import { IntroScreen } from '@/components/flow/IntroScreen';
import { introPos } from '@/content/modules';

export default function Page() {
  return <IntroScreen intro={introPos} next="/avaliacao/1" back="/modulos" close="/modulos" />;
}
