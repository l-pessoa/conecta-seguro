# ConectaSeguro — Documento de Design

**Data:** 2026-09-08
**Entrega:** 27/11/2026 (alvo interno: início de novembro)
**Tipo:** projeto de extensão universitária — educação em segurança digital para adolescentes

---

## 1. O que é

Uma jornada interativa 2D em pixel art onde o participante aprende segurança digital
tomando decisões em situações do cotidiano. Seis módulos, personagem que caminha
automaticamente, NPCs, escolhas com feedback e explicação.

Aplicação: link distribuído no WhatsApp para jovens de uma comunidade de igreja,
lançado num encontro presencial.

**Princípio pedagógico central:** ensinar consciência e reação proporcional, não paranoia.
Nenhum conteúdo pode terminar em "desconfie de tudo".

---

## 2. Decisões tomadas nesta revisão

Mudanças em relação ao planejamento original, com justificativa.

| # | Mudança | Por quê |
|---|---|---|
| 1 | Next.js + Supabase, deploy único, no lugar de React+Vite+Express+Prisma+Postgres+JWT | Backend é o ponto fraco do autor e o prazo real de código é ~7 semanas. Elimina 4 tecnologias a aprender sob pressão, uma hospedagem e o cold start de backend gratuito. |
| 2 | 4 ambientes com variação de luz, no lugar de 6 cenários distintos | Nenhum asset existe ainda. Metade do trabalho de arte, mais coerência visual, e produz a progressão contínua desejada. |
| 3 | 2 situações essenciais por módulo (a 3ª vira opcional) | Aplicação assíncrona por WhatsApp: abandono é o risco nº 1, e quem não conclui não gera par pré/pós. |
| 4 | `quality: best \| ok \| risky` no lugar de correto/errado | Codifica a proporcionalidade na estrutura de dados. Binário ensinaria a paranoia que o projeto quer evitar. |
| 5 | Código gerado (`CS-7F3K`) no lugar de `nickname` | `nickname` digitado por menor coleta dado pessoal sem querer — exatamente o que a arquitetura queria evitar. |
| 6 | Conteúdo em arquivos TS versionados, não no banco | Revisão por Git, sem seed, funciona offline. Elimina 6 tabelas. |
| 7 | 3 tabelas no lugar de 12 | O banco guarda só o que participantes produzem. |
| 8 | Exportação por painel do Supabase, sem área admin | Elimina JWT, bcrypt e uma tela de login inteira. |
| 9 | DOM/CSS, sem Phaser ou Canvas | A mecânica é fundo + sprite + caixa de texto. Texto real é mais legível, acessível e leve. |
| 10 | Formas A/B isomórficas de 12 itens cada | 15 vs. 8-10 itens diferentes não são comparáveis nem em relato descritivo. |
| 11 | 3 perguntas abertas no final | Com <15 participantes, a média é ilustrativa; a fala dos jovens vale mais. |
| 12 | ODS 9 removido | Ligação fraca. Ficam ODS 4 (principal) e ODS 16 (secundário). |
| 13 | Cenas dos módulos não são pontuadas | Mantém o instrumento limpo e libera o feedback para ser local, sem rede. |

---

## 3. Arquitetura

Repositório único Next.js (App Router) na Vercel.

- **Conteúdo** — cenas, diálogos e questões em arquivos TypeScript versionados. Não vão para o banco.
- **Cliente** — motor de cena, sprites CSS, estado em localStorage.
- **Servidor** — três Route Handlers: participante, quiz, evento.
- **Supabase** — três tabelas, criadas pela interface visual.

**Regra de integridade (regra 28 do documento original):** o gabarito vive em
`src/lib/server/answers.ts` com `import 'server-only'` e nunca entra no bundle do
navegador. O quiz é corrigido no servidor. O feedback das cenas dos módulos é local —
é pedagógico, não é medida.

---

## 4. Modelo de conteúdo

A unidade é a **cena**. Três tipos: `narrative`, `decision`, `insight`.

```ts
{
  id: 'm2-s1', module: 2, env: 'cidade-amanhecer',
  setup: [{ speaker: 'Ana', text: '...' }],
  prompt: 'O que você faz?',
  options: [
    { id: 'a', text: '...', quality: 'best',  feedback: '...' },
    { id: 'b', text: '...', quality: 'ok',    feedback: '...' },
    { id: 'c', text: '...', quality: 'risky', feedback: '...' },
  ],
  principle: '...',
  deepDive?: { title, body },
  next: 'm2-s2'
}
```

Cada alternativa tem feedback próprio. Nenhum feedback usa linguagem de punição,
vergonha ou "game over".

---

## 5. Progressão visual

Quatro ambientes-base, seis cenários por variação de iluminação (overlay CSS).
A jornada vai do escuro à luz: sair da caverna, chegar ao mirante.

| Módulo | Tema | Ambiente | Luz |
|---|---|---|---|
| 1 | Senhas e contas | Caverna | Madrugada |
| 2 | Links e mensagens | Cidade | Amanhecer |
| 3 | Golpes e engenharia social | Planície | Manhã |
| 4 | Privacidade | Subaquático | Meio-dia |
| 5 | Redes sociais e identidade | Cidade | Pôr do sol |
| 6 | Reagir ao suspeito | Mirante | Dourado |

Subaquático para privacidade é intencional: a foto parece comum na superfície e
embaixo há localização, rotina, documento.

---

## 6. Mecânica de assinatura: o ritmo

Escolha refletida → a caminhada desacelera, o parallax abranda, o ambiente aquieta.
Escolha por impulso → acelera, treme de leve.

É uma variável de duração em CSS. Transforma PARAR → AVALIAR → AGIR em algo que se
sente, não que o texto afirma. É a única mecânica do projeto — não há combate,
inventário, vidas, ranking ou pontuação visível.

---

## 7. Fluxo do participante

```
link (?t=lancamento)
  → boas-vindas + assentimento
  → código gerado (CS-7F3K)
  → diagnóstico (forma A, 12 itens)
  → introdução narrativa curta
  → módulos 1..6  (2 cenas essenciais cada + aprofundamento opcional)
  → avaliação final (forma B, 12 itens)
  → 3 perguntas abertas
  → resultado + fechamento
```

Progresso salvo a cada cena. Quem fecha o navegador retoma onde parou.

---

## 8. Dados

**`participants`** — `code`, `created_at`, `consent_at`, `session_tag`
**`quiz_responses`** — `code`, `phase` (`pre`|`post`), `question_id`, `option_id`, `is_correct`, `answered_at`
**`journey_events`** — `code`, `type`, `ref`, `created_at`

Sem tabela de resultado: o resultado é uma consulta. `session_tag` vem da querystring
do link e separa quem participou no encontro presencial de quem entrou depois.

Eventos registrados: `scene_completed`, `module_completed`, `deepdive_opened`,
`journey_completed`. Nada de clique avulso.

---

## 9. Resiliência

Tudo grava em localStorage primeiro e sincroniza em segundo plano, com fila de reenvio.
A jornada nunca fica esperando a rede. Se a conexão cair no meio de um módulo,
o participante não percebe.

---

## 10. Instrumento de avaliação

12 itens por forma, 2 por módulo, formas A (pré) e B (pós) escritas em pares
isomórficos: mesma competência e mesma estrutura lógica, contexto novo.

Alternativas devem exigir raciocínio — mais de uma plausível, uma mais adequada
ao contexto. Distratores absurdos invalidam a medida.

**Limitações a declarar no relatório:**
- N pequeno (<15): resultados são ilustrativos, não evidência estatística.
- Pós aplicado imediatamente após o ensino: mede retenção de curtíssimo prazo.
- Sem grupo controle: parte do ganho pode vir do efeito de ter feito o pré-teste.
- O texto deve dizer "houve ganho no instrumento", nunca "os jovens aprenderam".

---

## 11. Ética

Público menor de 18 anos com coleta de respostas e intenção de uso acadêmico.
Requisitos institucionais (assentimento do adolescente, autorização do responsável,
eventual submissão a CEP) **precisam ser confirmados com o orientador antes de
qualquer coleta real**. É bloqueante para a aplicação, não para o desenvolvimento.

Mitigações já embutidas no design: nenhum dado pessoal é coletado, identificação por
código gerado, tela de assentimento antes de qualquer pergunta, respostas abertas
opcionais.

---

## 12. Testes

- **Integridade de conteúdo** — todo `next` aponta para cena existente; toda decisão
  tem exatamente uma opção `best`; todo módulo tem 2 cenas essenciais.
- **Instrumento** — formas A e B cumprem o blueprint e são pares por competência.
- **Correção** — score por competência.

O primeiro grupo é o mais valioso: o gargalo do projeto é conteúdo, e erro de conteúdo
não aparece como erro de compilação.

---

## 13. Definição de pronto

A jornada completa percorrível num celular, diagnóstico e avaliação funcionando,
progresso retomável, resultados gravados, sem bugs críticos, publicada, e testada
com 3-5 pessoas reais antes da aplicação oficial.

---

## 14. Etapas

| Semana | Foco |
|---|---|
| 1-2 | Conteúdo dos 6 módulos + 24 questões (o gargalo — começa primeiro) |
| 2-3 | Estrutura Next, motor de cena, diagnóstico |
| 4 | Assets, ambientes, progressão visual |
| 5 | Avaliação final, resultado, sincronização |
| 6 | Piloto com 3-5 pessoas e ajustes |
| 7 | Deploy e aplicação na igreja |
| depois | Análise, slides, escrita acadêmica |

---

## 15. Fora de escopo na V1

Mini-games, área administrativa com login, múltiplas turmas com gestão,
tipos de interação além de `CHOICE`, customização de cursor, áudio obrigatório,
follow-up pós-intervenção.
