import { z } from 'zod';

export const codeSchema = z.string().regex(/^CS-[A-Z0-9]{4,6}$/);

export const participanteSchema = z.object({
  code: codeSchema.optional(),
  sessionTag: z.string().max(60).nullish(),
  consentAt: z.string().datetime().nullish(),
});

export const quizSchema = z.object({
  code: codeSchema,
  form: z.enum(['A', 'B']),
  phase: z.enum(['pre', 'post']),
  answers: z
    .array(
      z.object({
        itemId: z.string().min(1).max(40),
        optionId: z.enum(['A', 'B', 'C', 'D', 'nao_sei']),
      }),
    )
    .min(1)
    .max(30),
});

export const eventoSchema = z.object({
  code: codeSchema,
  events: z
    .array(
      z.object({
        type: z.string().min(1).max(40),
        ref: z.string().max(80),
        at: z.string().datetime(),
      }),
    )
    .min(1)
    .max(50),
});
