import type { FormaQuiz } from '../types';
import { formA } from './form-a';
import { formB } from './form-b';

export { formA, formB };

/** pre = Forma A, pos = Forma B */
export const quiz: { pre: FormaQuiz; post: FormaQuiz } = { pre: formA, post: formB };

export function formFor(phase: 'pre' | 'post'): FormaQuiz {
  return phase === 'pre' ? formA : formB;
}
