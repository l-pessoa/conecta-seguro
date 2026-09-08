# ConectaSeguro

Jornada interativa que ensina segurança digital para adolescentes através de decisões
em situações do cotidiano. Projeto de extensão universitária.

## Estado

Planejamento concluído. Estrutura criada, sem implementação.

- Design: [`docs/superpowers/specs/2026-09-08-conectaseguro-design.md`](docs/superpowers/specs/2026-09-08-conectaseguro-design.md)
- Pendências: [`docs/PENDENCIAS.md`](docs/PENDENCIAS.md)

## Stack

Next.js (App Router) · TypeScript · Supabase (Postgres) · Zod · Vitest · deploy na Vercel

## Rodar

```bash
npm install
cp .env.example .env.local   # preencher com as chaves do Supabase
npm run dev
```

## Estrutura

```
src/
├── app/         rotas e endpoints
├── components/  scene, quiz, ui, result
├── content/     cenas, módulos e questões (conteúdo versionado, não vai para o banco)
├── engine/      máquina de cena, progresso, ritmo da caminhada
├── lib/         tipos, participante, storage, fila de sync
│   └── server/  gabarito e correção — nunca chega ao navegador
└── styles/
```
