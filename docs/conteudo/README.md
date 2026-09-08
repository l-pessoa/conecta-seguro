# Conteúdo dos módulos — como ler isto

Cada `modulo-N-*.md` traz as **2 cenas essenciais** (o caminho rápido) e **1
aprofundamento opcional** (o antigo 3º cenário de cada módulo, agora sob demanda).

## Formato de cada cena

- **Ambiente** — de onde vem em `src/content/environments.ts`
- **Contexto** — a fala/situação que abre a cena (2-3 linhas, curto de propósito)
- **Pergunta** — o que se pede pro participante decidir
- **Alternativas** — sempre 4, marcadas por qualidade:
  - 🟢 **melhor** — a resposta mais adequada ao contexto
  - 🟡 **aceitável** — não é errada, mas incompleta ou mais fraca
  - 🔴 **arriscado** — parece razoável à primeira vista, mas expõe a um problema real
- **Princípio** — a frase que resume o aprendizado, mesmo pra quem só passou rápido

**Por que 4 alternativas graduadas, e não certo/errado:** é a régua pedagógica do
projeto — não ensinar paranoia, ensinar proporcionalidade. Cada alternativa
"arriscada" tem uma razão pra parecer tentadora; o feedback explica o porquê,
não só aponta o erro. Nenhuma opção é absurda o suficiente pra ser eliminada
sem pensar — isso é o que torna a pergunta nem fácil, nem difícil demais pra
adolescentes: exige ler a situação, não adivinhar o padrão da "resposta óbvia".

## O que muda em relação à especificação original

- 3 situações por módulo → 2 essenciais + 1 aprofundamento (protege a taxa de
  conclusão num link assíncrono de WhatsApp).
- Módulo 1 perde a cena solta de introdução ao 2FA — vira uma lista curta de
  "kit de reação" no fechamento do módulo, e o pedido de código já aparece
  organicamente no Módulo 3 (situação "eu sou do suporte").
- Nenhuma mecânica visual nova por cena. Três dispositivos reutilizáveis cobrem
  tudo: o **ritmo** da caminhada (desacelera/acelera conforme a decisão), o
  **destaque** de elementos numa cena (serve pra foto do Módulo 4 e a mensagem
  do Módulo 2) e a **conexão animada** entre elementos (serve pras portas do
  Módulo 1 e a circulação do Módulo 5).

## Pendente de revisão sua

- Tom das falas — escrevi em português coloquial de adolescente; ajuste onde
  soar artificial.
- Cenários fictícios (lojas, apps, situações) — troque nomes/contextos se
  achar que algo ficou genérico demais ou pouco familiar pro público da igreja.
- A escolha de qual das 3 situações originais virou "essencial" x "opcional"
  em cada módulo — está justificada no topo de cada arquivo, mas é sua palavra
  final.
