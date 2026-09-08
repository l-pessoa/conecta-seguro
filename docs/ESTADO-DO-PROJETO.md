# Estado do projeto — 08/09/2026

Tudo comitado no git (`git log --oneline` mostra 10 commits, o último é
`9c5ac34`). Nada perdido. Este documento organiza o que existe por partes,
pra você revisar aos poucos.

Pra retomar: `cd ~/Documents/projetos/conecta-seguro && npm run dev`, abre
`localhost:3000`.

---

## PARTE 1 — Planejamento e arquitetura

- `docs/superpowers/specs/2026-09-08-conectaseguro-design.md` — o design
  completo, com a tabela das 13 mudanças em relação ao seu documento
  original e a justificativa de cada uma.
- Decisão de stack: Next.js + Supabase (não React+Vite+Express+Prisma do
  plano original) — front e back desacoplados de propósito.
- `docs/PROXIMOS-PASSOS.md` — histórico de decisões, incluindo por que
  cada coisa foi trocada.

**O que rever:** se ainda concorda com a arquitetura agora que viu o app rodando.

---

## PARTE 2 — Conteúdo (textos, cenas, quiz)

Tudo em `docs/conteudo/` (markdown, revisável) e já convertido pra código
em `src/content/`:

- `intro.md` — as 4 telas da introdução
- `modulo-1-senhas.md` até `modulo-6-integracao.md` — as 12 cenas essenciais
  + 6 aprofundamentos
- `quiz-diagnostico-mapeamento.md` — as 12 questões do diagnóstico (forma A)
- `avaliacao-final.md` — as 12 questões da avaliação final (forma B),
  pareadas com a forma A

**O que rever:** o tom das falas, se os contextos fictícios (loja, app de
fotos, banco) soam naturais pro público da igreja. Isso nunca foi
confirmado por você — só eu escrevi.

---

## PARTE 3 — Visual (cores, fontes, layout)

- Paleta escura/neon (roxo, ciano `#38f2ff`, magenta `#ff5fe0`), definida a
  partir das imagens de referência que você mandou
- Fonte pixelada (Press Start 2P) só em títulos curtos; corpo de texto em
  sans-serif legível
- Ícones: pacote Lucide, sem emoji em lugar nenhum
- Layout em dois moldes: tela cheia (home, introdução, cenas dos módulos)
  e cartão de leitura (quiz, resultado, seleção de módulos)
- Ícone pixelado do "invasor" (verde neon, SVG puro) na home

**O que rever:** cores, tamanhos de texto, se o estilo "retrô arcade" está
no ponto certo ou precisa ajustar.

**Pendente que você mesmo apontou:** cursor customizado em pixel art —
esperando você mandar a referência.

---

## PARTE 4 — Assets de pixel art

`public/assets/backgrounds/` — 6 ambientes com pixel art real (baixada por
você do itch.io), listados com autor/licença em `docs/CREDITOS-ASSETS.md`:

| Ambiente | Pacote |
|---|---|
| Caverna (M1) | Parallax Backgrounds: Caves |
| Cidade (M2, M5) | Warped City |
| Planície (M3) | Parallax Backgrounds: Plains (corrigido de dia pra noite via filtro CSS) |
| Subaquático (M4) | Underwater Fantasy |
| Mirante (M6) + Home | Mountain Dusk |

**Pendente:**
- Personagem ainda é uma cápsula CSS com brilho (placeholder) — o pacote
  `sunny-land-phaser-project.zip` que você já baixou tem um personagem
  animado de verdade, esperando eu integrar quando você quiser.
- Nenhum NPC ainda.
- Confirmar o autor exato dos pacotes de Planície e Subaquático pro
  relatório (não veio nos metadados do download).

---

## PARTE 5 — Navegação e fluxo

- Barra fixa no topo em toda página (logo + menu-gaveta), pra nunca se
  sentir preso
- Quiz com **Voltar** e **Pular** — nada obrigatório
- Home com dois caminhos: **Começar o tour** (introdução guiada, módulos em
  ordem) ou **Explorar livremente** (pula a introdução, escolhe qualquer
  módulo depois do diagnóstico)
- Consentimento e diagnóstico continuam obrigatórios nos dois caminhos —
  decisão minha, ainda não confirmada por você (ver conversa anterior)

**O que rever:** se essa divisão dos dois botões faz sentido do jeito que
ficou.

---

## PARTE 6 — Backend (ainda não começou, de propósito)

Decisão sua: front primeiro, back numa fase própria depois.

- Toda a jornada funciona sem servidor — conteúdo em arquivos, progresso em
  `localStorage`
- Correção do quiz roda **no navegador**, temporariamente, com o gabarito
  visível no código (`src/content/quiz/form-a.ts`/`form-b.ts`, campo
  `correct`) — isso é inseguro de propósito só nesta fase, **nunca pode ir
  pra coleta real assim**
- Checklist completo de migração em `docs/PROXIMOS-PASSOS.md`

**O que fazer quando voltar pra essa parte:** mover o gabarito pro servidor,
criar conta Supabase, implementar as 3 rotas (participante/quiz/evento).

---

## PARTE 7 — Fora do código (você resolve)

- [ ] **Falar com o orientador sobre consentimento** — é o único item que
      bloqueia a coleta de dados de verdade, não bloqueia nada do código
- [ ] Data do encontro presencial na igreja
- [ ] Nome da instituição pra declaração
- [ ] 3 fotos no local, você em pelo menos uma
- [ ] Confirmar autor dos 2 pacotes de imagem pendentes

---

## Testes e build

15 testes automatizados passando (`npm run test`), build de produção limpo
(`npm run build`). Toda vez que eu mexo em conteúdo ou lógica, rodo os dois
antes de considerar pronto.

---

## Próxima conversa

Quando voltar, me diga por qual parte quer começar (pode ser qualquer uma
da lista acima, não precisa ser em ordem) — eu releio este documento e
retomamos direto, sem precisar reexplicar o que já foi decidido.
