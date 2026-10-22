import { IntroScreen } from '@/components/flow/IntroScreen';
import { introPre } from '@/content/modules';

export default function Page() {
  return <IntroScreen intro={introPre} next="/diagnostico/1" back="/entrar" close="/" />;
}
