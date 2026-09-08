# O que eu preciso de você

Lista viva. Marque conforme for entregando.

---

## A. CONTEÚDO — feito

- [x] **A1.** 12 cenas essenciais + [x] **A2.** 6 aprofundamentos → `docs/conteudo/modulo-*.md`, já convertidos pra código em `src/content/modules/`
- [x] **A3.** Instrumento — forma A e forma B, 12 itens cada → `docs/conteudo/quiz-diagnostico-mapeamento.md` e `avaliacao-final.md`, já em `src/content/quiz/`
- [x] **A4.** Introdução, perguntas abertas, mensagem de fechamento → `docs/conteudo/intro.md`, já em código
- [ ] Texto de assentimento — o que está em `ConsentGate.tsx` é um rascunho meu; **precisa sair da conversa com o orientador** antes de ser definitivo

**Ainda vale revisar:** o tom das 12 cenas e os contextos fictícios (loja, app de fotos) — ninguém confirmou isso ainda, só eu escrevi e seguimos.

---

## B. IMAGENS

### B1. Fundos — feito
- [x] Caverna, Cidade (2 tons), Planície, Subaquático, Mirante — todos em
      `public/assets/backgrounds/`, pixel art real (itch.io), licenças em
      `docs/CREDITOS-ASSETS.md`
- [ ] **Confirmar autor exato dos pacotes de Planície e Subaquático** — os
      arquivos baixados não trazem o nome do criador nos metadados. Ver
      `docs/CREDITOS-ASSETS.md` para o que falta.

### B2. Personagem
- [ ] Ainda é uma silhueta CSS (`WalkingCharacter.tsx`). O pacote SunnyLand que
      você baixou (`sunny-land-phaser-project.zip`) tem um personagem animado
      de verdade (idle/walk) — posso integrar quando você quiser.

### B3. NPCs
- [ ] Nenhum ainda. Os diálogos não mostram um personagem específico por enquanto.

### B4. Interface — feito
- [x] Ícones: pacote Lucide, sem emoji em lugar nenhum da interface.

### B5. Áudio (opcional, baixa prioridade)
- [ ] Som ambiente por ambiente
- [ ] 2-3 efeitos curtos

---

## C. DECISÕES E ACESSOS

- [ ] **Falar com o orientador sobre consentimento** — bloqueia a coleta, não o código
- [ ] Criar conta no Supabase e me passar as chaves (vão no `.env.local`, nunca no Git)
- [ ] Criar conta na Vercel
- [ ] Confirmar autor dos 2 pacotes de imagem pendentes (ver seção B1)
- [ ] Data do encontro presencial na igreja
- [ ] Nome da instituição como deve aparecer na declaração

---

## D. EVIDÊNCIAS DA EXTENSÃO (você resolve no local)

- [ ] 3 fotos na igreja, você em pelo menos uma
- [ ] Instituição identificável em alguma delas
- [ ] Declaração assinada pelo responsável legal
- [ ] Data e local registrados

---

## Por onde começar agora

1. Falar com o orientador (destrava a coleta)
2. Olhar o app rodando e dar retorno de visual/tom
3. Quando quiser, decidir sobre o personagem animado (B2) e o backend (fase própria, ver `docs/PROXIMOS-PASSOS.md`)
