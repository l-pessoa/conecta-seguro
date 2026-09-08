# Créditos dos assets visuais

Usar esta lista no relatório acadêmico (seção de materiais/recursos usados).

| Ambiente | Pacote | Autor | Licença | Observação |
|---|---|---|---|---|
| Caverna (M1) | Parallax Backgrounds: Caves | Admurin | Uso livre pessoal/comercial, "pague o quanto quiser" (itch.io), crédito não obrigatório mas apreciado | — |
| Cidade (M2, M5) | Warped City | ansimuz | CC0 | — |
| Planície (M3) | Parallax Backgrounds: Plains | provavelmente Admurin (mesma convenção de arquivos 0-8.png do pacote de cavernas) | a confirmar | **confirmar autor/página exata do download** |
| Subaquático (M4) | Underwater Fantasy | a confirmar | CC0 (confirmado pelo `public-license.pdf` incluído no pacote baixado) | **confirmar nome do autor** |
| Mirante (M6) + Home | Mountain Dusk | ansimuz | CC0 | usa a versão "A" do pacote (céu com lua sobre roxo) |

## Pendente

- [ ] Confirmar o nome do autor e a URL da página do itch.io de **Parallax Backgrounds: Plains** e de **Underwater Fantasy** — os arquivos baixados não trazem o nome do criador nos metadados que consegui ler; o `public-license.pdf` do underwater confirma CC0 mas não o autor. Abra a página de onde baixou e copie o nome + link exatos.
- [ ] Se o trabalho acadêmico exigir crédito formal (mesmo em pacotes que não obrigam), incluir esta tabela como anexo ou nota de rodapé.

## Onde os arquivos ficam no projeto

`public/assets/backgrounds/<ambiente>/layer-N.png` — `layer-0` é a camada mais distante,
números maiores são camadas mais próximas. Ver `src/content/environments.ts` para a
composição de cada cena (velocidade de parallax, repetição, filtros de cor).

## Ajuste de cor aplicado

O pacote de **Planície** é uma cena diurna (céu azul, grama verde) — fora da paleta
escura/neon do projeto. Em vez de descartar o pacote, aplico um filtro CSS
(`brightness` reduzido + `hue-rotate` para roxo) só nesse ambiente, para uni-lo
visualmente ao resto da jornada. Ver `filter` em `src/content/environments.ts`.
