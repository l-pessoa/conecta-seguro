# Onde paramos — 08/09/2026

## Feito até agora

- Conteúdo completo em `docs/conteudo/`: introdução, 12 cenas essenciais,
  6 aprofundamentos, forma A (diagnóstico) e forma B (avaliação final) do
  instrumento, 12 itens cada, pareados por competência.
- Código: tipos (`src/lib/types.ts`), conteúdo convertido pra `.ts`
  (`src/content/`), motor de cena e progresso (`src/engine/`), componentes de
  UI, todas as rotas do fluxo do participante. `npm run dev` rodando.
- Frente inteira clicável, ponta a ponta: introdução → consentimento →
  diagnóstico → 6 módulos → avaliação final → resultado. Sem backend ainda —
  decisão explícita, ver seção abaixo.
- 15 testes automatizados passando (`npm run test`): integridade de
  conteúdo, formato do quiz, correção.

## Backend — fase própria, ainda não começou

Decisão do usuário: front primeiro, back depois, numa fase dedicada.

**O que isso significa agora:**
- `src/app/api/` foi removido (os 3 arquivos eram só comentário, sem handler,
  e quebravam o build do Next sob `isolatedModules`). Recriar quando a fase
  de backend começar:
  - `POST /api/participante` — registra participante (código, consent_at, session_tag)
  - `POST /api/quiz` — recebe respostas, corrige no servidor, grava, devolve só o resultado
  - `POST /api/evento` — registra eventos de jornada, aceita lote
- A correção do quiz roda **no cliente**, temporariamente
  (`src/lib/quizScore.ts`), com o gabarito visível em `src/content/quiz/form-a.ts`
  e `form-b.ts` (campo `correct`). Isso viola a regra 28 do design (gabarito
  nunca deve chegar ao navegador) — **aceitável só nesta fase de testar o
  front, nunca para coleta real.**
- Antes de qualquer coleta com participantes de verdade:
  1. Mover o gabarito pra `src/lib/server/answers.ts` (`import 'server-only'`)
  2. Implementar as 3 rotas acima com Supabase
  3. Trocar as chamadas de `scoreQuiz` local por `fetch('/api/quiz')`
  4. Apagar o campo `correct` de `QuizItem` e dos arquivos de formulário

## Decisões pendentes

- [ ] Revisar o tom das 12 cenas e os contextos fictícios (loja, app de fotos)
- [ ] Receber as imagens do usuário para fixar a paleta (hoje: gradientes
      placeholder por ambiente em `src/content/environments.ts`)
- [ ] **Falar com o orientador sobre consentimento** (bloqueia a coleta, não o código)
- [ ] Sprite do personagem e NPCs (hoje: silhueta CSS placeholder em `WalkingCharacter.tsx`)
- [ ] Criar conta Supabase quando a fase de backend começar

## Débito técnico conhecido

- `npm audit`: 7 vulnerabilidades em dependências de desenvolvimento
  (Vite/Vitest/PostCSS — servidor de dev, não o app publicado). Corrigível
  só subindo pra Next 16 (mudança quebradora) — revisar antes do deploy real,
  não urgente pra uso local.
