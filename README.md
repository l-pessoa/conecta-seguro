# ConectaSeguro

**Pare, pense, escolha.** Uma jornada curta, em pixel art, sobre as decisões de segurança
que adolescentes tomam no celular todo dia.

> Projeto de extensão universitária.

---

## Por que este site existe

Para muitos adolescentes, a vida digital acontece toda no celular: grupo da turma,
jogo, rede social, conta do banco dos pais. Os golpes que chegam por ali raramente são
sofisticados. Quase sempre usam o mesmo truque: **apressar a pessoa para ela não parar
pra pensar**. Um link de "presente surpresa", um "suporte" pedindo código por SMS, um perfil
novo de um amigo pedindo dinheiro.

Os materiais sobre o tema costumam cair em um de dois extremos: uma lista longa de regras
que ninguém lembra, ou um tom de medo que termina em "desconfie de tudo". Nenhum dos dois
ajuda na hora em que a mensagem chega.

O ConectaSeguro aposta em outra coisa: **praticar a decisão**. A pessoa vê a situação como
ela aparece no celular, escolhe o que faria e entende na hora o porquê. O objetivo é
**consciência e reação proporcional, nunca paranoia**. Saber quando parar, como confirmar
por outro caminho e o que fazer se algo já deu errado.

## Como funciona

```
Entrar  →  Diagnóstico  →  6 módulos  →  Avaliação final  →  Resultado
(código     (12 perguntas,   (3 situações    (12 perguntas      (o que você fez +
 anônimo)    sem nota)        cada)           equivalentes)      plano de ação)
```

- **Sem cadastro.** A pessoa recebe um código anônimo (ex.: `CS-7F3K`), sem nome nem e-mail.
- **Sem prova, sem nota, sem ranking.** Nenhuma escolha tira ponto. Toda opção vem com explicação.
- **No seu ritmo.** Dá para fazer os módulos em qualquer ordem, parar e continuar de onde parou.
- **Feito para o celular.** É aberto por um link de WhatsApp e funciona de 360 px até o computador.

## Os seis módulos

| # | Módulo | Lema | O que pratica |
|---|---|---|---|
| 1 | Senhas e contas | Criar, proteger, reagir | Senha longa e única, gerenciador, duas etapas, acesso estranho |
| 2 | Links e mensagens | Perceber, verificar, agir | Links, QR Codes, "parece oficial" não é prova |
| 3 | Golpes | Reconhecer, questionar, confirmar | Pressa, falsa autoridade, pedido de código, conhecido usado como isca |
| 4 | Privacidade | Pensar, controlar, compartilhar | O que uma foto revela, permissões de apps, quem vê o quê |
| 5 | Redes sociais | Pensar, representar, cuidar | Audiência, o que fica depois de apagar, perfil falso |
| 6 | Algo parece estranho | Parar, avaliar, agir | O que fazer primeiro, pedir ajuda, denunciar (SaferNet) |

Cada módulo tem uma abertura, três situações e um fecho com três ações práticas.
As situações usam o formato real: balão de WhatsApp, SMS, e-mail, notificação ou uma
ilustração interativa em que a pessoa toca nos sinais suspeitos.

## Como o site ensina

As escolhas de conteúdo seguem a pesquisa sobre aprendizagem e sobre treino de segurança:

1. **Decidir antes de ler.** A situação vem primeiro; a explicação, logo depois da escolha.
2. **Feedback que explica.** Toda alternativa tem um porquê, e toda situação fecha com uma regra de uma frase.
3. **Ensinar o truque, não uma lista.** Dar nome à tática (pressa, falsa autoridade, segredo) e mostrar a ação certa.
4. **Misturar golpe e situação legítima.** Existe a opção "Exagero": desconfiar de tudo também é erro.
5. **Uma ideia por tela.** Texto curto, nada competindo com a decisão.
6. **Repetir em contextos diferentes.** A regra "confirme por um caminho que você já conhece" volta em vários módulos.
7. **Jogo sem competição.** Progresso e narrativa, sem cronômetro, vidas ou placar.
8. **Medir com honestidade.** O diagnóstico e a avaliação final são formas equivalentes e balanceadas.
   Medem conhecimento, não comportamento.

## Privacidade

- Nenhum dado pessoal é pedido. As respostas ficam ligadas só ao código anônimo.
- As respostas certas do quiz ficam **só no servidor**. O navegador nunca recebe o gabarito.
- O site não mostra nota individual.
- A coleta de dados para a pesquisa só começa com o consentimento aprovado pela orientação do projeto.

## Visual

A interface toda é pixel art: fonte pixel, ilustrações desenhadas em grade, botões e
cartões com bordas em degrau. As animações são curtas e desligam quando o aparelho está com
"reduzir movimento" ativado.

---

## Para quem vai mexer no código

**Tecnologia:** Next.js 15 (App Router) · React 19 · TypeScript · Zod · Supabase (Postgres) · Vitest · Vercel

### Rodar no computador

```bash
npm install
npm run dev        # abre em http://localhost:3000
npm test           # testes de conteúdo, quiz e correção
```

Sem configurar nada, o site já grava no banco do projeto. Para rodar sem gravar
(testes locais), crie um `.env.local` com `SUPABASE_DESLIGADO=1`.

### Banco de dados (Supabase)

O banco está descrito por inteiro em [`supabase/schema.sql`](supabase/schema.sql).

- As tabelas são **trancadas**: ninguém de fora lê nada.
- A única forma de gravar são 3 funções do banco, que conferem cada dado e corrigem o quiz com
  o gabarito guardado lá dentro.
- Por isso o site usa só a chave **pública** do Supabase. Não existe chave secreta para configurar
  na Vercel nem para vazar.

Para a análise pré/pós: no Supabase, abra o **SQL Editor**, rode `select * from analise_pre_pos;`
e clique em **Download CSV**.

### Estrutura

```
src/
├── app/          páginas (landing, entrar, diagnóstico, módulos, avaliação, resultado)
│   └── api/      participante, quiz, evento (rodam no servidor)
├── components/   peças da interface; interativo/ tem as ilustrações e simulações
├── content/      todo o texto: módulos, quiz, home, resultado
└── lib/          estado da jornada, estilos, fila de envio
    └── server/   gabarito e correção (nunca chega ao navegador)
supabase/         SQL do banco
tests/            testes automáticos
```

Todo o texto do site fica em `src/content/`. Para mudar uma situação ou uma explicação,
edite ali e rode `npm test`: os testes conferem limites de texto, o balanceamento do quiz
e se cada pergunta da avaliação foi ensinada em algum módulo.
