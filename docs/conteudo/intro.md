# Introdução — sequência dinâmica de boas-vindas

Substitui o texto único que estava previsto em `src/content/intro.ts`. Vira 4
telas curtas, avançadas por toque (reaproveita `DialogueBox.tsx`, sem
componente novo). A introdução não *descreve* a experiência — ela já *é* a
experiência em miniatura, abrindo com uma situação, não com uma explicação.

**Mudança de estrutura:** a introdução vem separada do consentimento. Essas 4
telas rodam primeiro (ensinam pelo exemplo); `ConsentGate.tsx` fecha a
sequência depois, não abre. `src/app/page.tsx` conduz as duas em sequência.

**Sem emoji.** Ícones vêm de [Lucide](https://lucide.dev/) (`lucide-react`,
licença ISC — permissiva, mesma família de MIT), monocromáticos, tingidos com
o neon do tema no CSS. Ver mapeamento de ícones ao final.

---

## Tela 1 — o gancho

*Sem logo, sem explicação — direto na situação.*

> Mensagem num grupo: "Vaga rápida! Só hoje: presente surpresa pra quem clicar antes que acabe 👇"
>
> O que você faria?

*(pausa — sem alternativas ainda, é retórico, não é uma cena pontuada)*

> Você vai encontrar situações parecidas com essa ao longo da jornada. A diferença é que aqui, dá pra pensar antes de decidir.

---

## Tela 2 — o que é

> Isso é o **ConectaSeguro**.
>
> Uma jornada sobre decisões que a gente toma todo dia sem perceber — mensagens, senhas, permissões, o que postar, o que confirmar antes de agir.
>
> Não é aula. Não é prova. É você, em situações parecidas com as que já apareceram — ou vão aparecer — na sua tela.

---

## Tela 3 — o que tem aqui

> Ao longo do caminho você vai passar por:

| Ícone (Lucide) | Tema | Linha |
|---|---|---|
| `key` | Senhas e contas | proteger o que é seu |
| `link` | Links e mensagens | parar antes de clicar |
| `drama` | Golpes | reconhecer quando alguém quer te apressar |
| `eye-off` | Privacidade | decidir o que mostrar, pra quem |
| `share-2` | Redes sociais | pensar no que sua presença online diz |
| `triangle-alert` | Quando algo parece estranho | o que fazer primeiro |

---

## Tela 4 — como funciona

> Você vai fazer escolhas. Cada uma tem uma consequência — e uma explicação, não um julgamento.
>
> Não existe errar feio aqui. Sem prova, sem nota, sem ranking.
>
> Pode ir rápido e pegar o essencial, ou parar pra entender mais. Do seu jeito, no seu tempo.
>
> **Vamos começar?** → segue para o consentimento (`ConsentGate.tsx`)
