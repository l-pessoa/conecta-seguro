# Onde paramos — 08/09/2026

## Descobertas ao ler o roteiro

Os 7 arquivos originais estão copiados em `docs/roteiro-original/`.

- **`Quiz Diagnóstico Segurança.md` é conteúdo pronto.** 15 questões com alternativas,
  gabarito, competência e conceito. Distratores plausíveis de verdade. Peça mais
  adiantada do projeto.
- **Os 6 arquivos de módulo são especificação, não roteiro.** Dizem o que cada cena
  deve ensinar e o que evitar, mas não trazem as falas nem as alternativas escritas.
  O trabalho pedagógico está feito; falta a escrita concreta.

## Conflitos a resolver

1. Specs assumem 3 situações por módulo → viram 2 + aprofundamento opcional.
2. Módulo 1 tem 6 tempos (situações + 2FA + códigos + painel de reação). Proposta:
   2 situações + "kit de reação" no fechamento; códigos de autenticação migram para
   o Módulo 3, onde a situação "eu sou do suporte" já pede isso.
3. Specs pedem ~18 animações sob medida. Reduzir a 3 dispositivos reutilizáveis:
   ritmo da caminhada · destaque sobre elementos da cena · conexão animada entre elementos.
4. Módulo 1 §17-§22 foi escrito para a stack antiga — ignorar.

## Direção visual revisada (tema escuro)

Referências do usuário: roxo profundo, neon ciano e magenta, estrelas.

- **Sai** SunnyLand (ensolarado demais, briga com a paleta).
- **Âncora visual:** Warped City / Synth Cities (ansimuz, CC0) — cyberpunk neon roxo.
- **Mantidos:** Mountain Dusk (ansimuz, CC0) e Parallax Backgrounds: Caves (Admurin),
  de preferência a variante com cristais azuis.
- **Progressão nova:** a jornada inteira acontece numa noite, cada módulo com um tom de
  neon diferente. A única mudança real de luz é o amanhecer no mirante do Módulo 6.
  Mantém a metáfora escuro → luz e elimina variantes diurnas de cada cenário.

O usuário vai enviar arquivos de imagem próprios. Montar a paleta a partir deles.

## Feito em 08-09/09

- [x] Escrevi as 12 cenas essenciais + 6 aprofundamentos → `docs/conteudo/modulo-*.md`
- [x] Mapeei 12 das 15 questões do diagnóstico (2 por módulo) → `docs/conteudo/quiz-diagnostico-mapeamento.md`.
  Q4 e Q12 saem por não terem módulo que ensine a competência; Q6 e Q10 saem por
  redundância dentro do próprio módulo; escrevi 1 questão nova pro Módulo 5, que
  não tinha segunda candidata natural no banco original.

## Decisões pendentes

- [ ] Revisar o tom das 12 cenas e os contextos fictícios (loja, app de fotos)
- [ ] Receber as imagens do usuário para fixar a paleta
- [ ] **Falar com o orientador sobre consentimento** (bloqueia a coleta)
- [ ] Converter `docs/conteudo/*.md` para `src/content/**/*.ts` quando o conteúdo
      estiver aprovado (depende de `src/lib/types.ts` estar definido primeiro)
- [ ] Mais adiante: escrever a forma B (avaliação final) com pares isomórficos —
      só depois que os módulos estiverem consolidados, como já estava no plano
