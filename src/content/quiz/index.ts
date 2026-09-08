import { formA } from './form-a';
import { formB } from './form-b';

export { formA, formB };

export function formFor(phase: 'pre' | 'post') {
  return phase === 'pre' ? formA : formB;
}
