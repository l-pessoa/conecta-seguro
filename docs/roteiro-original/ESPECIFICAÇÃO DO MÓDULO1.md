#ESPECIFICAÇÃO DO MÓDULO1

## Senhas e Segurança de Contas

Claude, implemente o primeiro módulo do ConectaSeguro seguindo esta especificação.

Este módulo é o primeiro de seis módulos da experiência educativa. A arquitetura visual e interativa criada aqui deverá servir como referência para os próximos módulos, portanto não implemente algo descartável ou específico demais para o Módulo 1.

A experiência precisa ser:

* mobile-first;
* rápida para quem deseja apenas cumprir o caminho essencial;
* suficientemente profunda para quem deseja explorar;
* interativa, e não uma aula tradicional;
* visualmente dinâmica;
* baseada em situações do cotidiano;
* adequada para adolescentes e jovens;
* simples de compreender sem tutorial extenso;
* leve o suficiente para celulares de baixo/médio desempenho;
* construída de maneira reutilizável para os outros cinco módulos.

---

# 1. OBJETIVO PEDAGÓGICO

O participante deve sair deste módulo sabendo aplicar quatro ideias principais:

1. Criar/utilizar senhas difíceis de adivinhar e que não sejam previsíveis.
2. Evitar reutilizar a mesma senha em diferentes contas.
3. Utilizar mecanismos adicionais de proteção, especialmente autenticação em dois fatores (2FA/MFA).
4. Saber como agir diante de sinais de acesso suspeito ou possível comprometimento de uma conta.

Não transformar o módulo em uma aula técnica sobre criptografia, hashing, algoritmos de força bruta ou funcionamento interno de sistemas de autenticação.

O objetivo é comportamento seguro no cotidiano.

A lógica pedagógica do módulo será:

CRIAR → PROTEGER → REAGIR

---

# 2. EXPERIÊNCIA GERAL DO MÓDULO

O módulo deve funcionar como uma pequena jornada.

O personagem do participante percorre um cenário de forma predominantemente automática.

Não queremos exigir que o usuário controle livremente um personagem como em um jogo tradicional.

O personagem pode caminhar automaticamente pela cena, enquanto o cenário se movimenta/paralaxa de maneira simples.

O participante interfere apenas quando chega a uma situação relevante.

Exemplo:

PERSONAGEM CAMINHA
↓
elementos do cenário aparecem
↓
NPC é encontrado
↓
NPC chama a atenção do participante
↓
movimento desacelera/para
↓
balão de fala aparece
↓
situação é apresentada
↓
participante escolhe uma alternativa
↓
o ambiente reage
↓
explicação aparece
↓
personagem continua andando

Essa estrutura deverá ser reutilizável nos seis módulos.

---

# 3. INTRODUÇÃO DO MÓDULO

Não criar uma parede de texto.

A entrada deve durar poucos segundos e apresentar apenas a ideia central.

Sugestão de conceito narrativo:

O personagem está começando uma nova jornada digital e encontra uma pequena área com diferentes "portas" ou "acessos" representando contas digitais.

Cada conta possui uma proteção visual.

A metáfora não deve ser explicada de forma infantilizada. Ela serve apenas como linguagem visual.

O NPC pode dizer algo semelhante a:

"Suas contas guardam muito mais do que parece. Vamos ver se você sabe protegê-las."

Depois disso, a jornada começa.

Não criar uma tela longa explicando tudo que será aprendido.

O participante deve aprender principalmente através das situações.

---

# 4. SITUAÇÃO 1 — CRIANDO UMA SENHA

## Objetivo pedagógico

Ensinar:

* previsibilidade;
* qualidade de uma senha;
* importância de comprimento;
* importância de exclusividade;
* evitar informações pessoais óbvias.

## Narrativa

O personagem encontra um NPC tentando criar uma senha para uma nova conta.

O NPC apresenta algumas opções.

A situação deve parecer cotidiana, não como uma prova escolar.

Exemplo:

"Estou criando uma senha para minha conta. Qual dessas escolhas oferece uma proteção melhor?"

Apresentar quatro alternativas plausíveis.

Evitar alternativas absurdas como:

A) 123456
B) senha
C) ...
D) uma senha obviamente perfeita

As opções devem parecer escolhas que uma pessoa realmente poderia fazer.

Uma opção deve representar uma senha longa, difícil de adivinhar e exclusiva.

Outra pode utilizar nome/data ou informação previsível.

Outra pode ser curta porém conter símbolos.

Outra pode ser uma senha aparentemente complexa, mas baseada em informação previsível.

O objetivo é fazer o participante pensar sobre segurança, não reconhecer visualmente "a resposta mais bonita".

## Depois da escolha

Não simplesmente mostrar:

"ACERTOU!"

A consequência deve acontecer primeiro.

Se escolher uma opção inadequada:

* a proteção visual da conta fica fraca;
* um indicador visual mostra que aquela proteção é mais vulnerável;
* o NPC reage;
* então aparece uma explicação curta.

Se escolher a opção adequada:

* a proteção visual fica mais resistente;
* o NPC reage positivamente;
* aparece a explicação.

## Explicação

A explicação deve ser curta e objetiva.

Exemplo conceitual:

"Uma senha mais longa e difícil de adivinhar oferece mais proteção. Evite usar informações fáceis de relacionar a você e não reutilize essa senha em outras contas."

Não colocar um parágrafo enorme.

## Exemplo real

Abrir opcionalmente:

"Na prática"

"Usar o mesmo padrão em várias contas significa que descobrir uma senha pode colocar outras contas em risco."

Esse conteúdo pode ser expandido pelo participante, mas não deve bloquear a progressão.

---

# 5. SITUAÇÃO 2 — A MESMA SENHA EM VÁRIAS CONTAS

## Objetivo pedagógico

Ensinar o conceito de reutilização de senha.

Essa situação precisa ser diferente da primeira.

Na primeira, o participante decide COMO criar uma senha.

Agora ele precisa compreender a CONSEQUÊNCIA de reutilizar a mesma senha.

## Narrativa

O personagem chega a uma área com três portas/contas:

* rede social;
* e-mail;
* conta de jogo/aplicativo.

Visualmente, as três portas possuem o mesmo símbolo de chave.

O NPC comenta:

"Para facilitar, eu uso a mesma senha em todas."

O participante precisa avaliar a situação.

Pergunta:

"Se essa senha for descoberta ou exposta em um serviço, qual é o principal problema?"

As quatro alternativas devem ser plausíveis.

A correta deve explicar que outras contas que usam a mesma senha também podem ficar em risco.

## Animação de consequência

Esta situação tem uma oportunidade visual importante.

Quando a pessoa escolhe a alternativa relacionada à reutilização:

* uma chave visual pode aparecer em uma das portas;
* a mesma chave pode tentar abrir as outras;
* as conexões entre as contas aparecem visualmente;
* o participante percebe o problema sem precisar ler uma explicação enorme.

Não representar invasão de forma técnica ou assustadora.

É apenas uma metáfora visual simples:

UMA MESMA SENHA
→ várias contas
→ um problema pode se espalhar.

## Explicação

"Usar a mesma senha em várias contas aumenta o impacto de um possível vazamento ou comprometimento. O ideal é usar senhas diferentes, especialmente nas contas mais importantes."

## Conteúdo opcional

Botão:

"Quero entender melhor"

Abrir conteúdo curto sobre gerenciadores de senhas.

Explicar apenas:

"Gerenciadores de senhas podem ajudar a criar e armazenar senhas diferentes sem exigir que você memorize todas."

Não transformar isso em tutorial.

---

# 6. SITUAÇÃO 3 — ACESSO SUSPEITO

## Objetivo pedagógico

Esta é a situação mais importante do módulo.

O participante precisa aprender a REAGIR.

Não basta saber criar uma boa senha.

## Narrativa

O personagem recebe uma notificação:

"Novo acesso detectado."

O dispositivo/local não é reconhecido.

O personagem precisa decidir o que fazer.

Apresentar alternativas plausíveis.

Entre elas:

* ignorar porque a senha continua funcionando;
* responder à notificação;
* clicar diretamente em um link recebido para resolver;
* acessar a conta pelo aplicativo/site oficial e verificar a atividade de acesso.

A resposta adequada deve envolver o canal oficial.

## Consequência visual

Se escolher uma resposta inadequada:

A interface pode mostrar visualmente que o personagem está seguindo um caminho menos seguro.

Não criar uma tela dizendo simplesmente "VOCÊ FOI HACKEADO".

O objetivo não é assustar.

Se escolher a opção adequada:

O personagem entra no painel oficial da conta.

Ali aparece uma representação simplificada de:

"Dispositivo não reconhecido"

e ações possíveis:

* verificar atividade;
* encerrar sessão;
* alterar senha;
* reforçar proteção.

Não é necessário implementar uma conta real.

É uma representação educativa.

---

# 7. INTRODUÇÃO DO 2FA/MFA

Depois da situação de acesso suspeito, introduzir autenticação em dois fatores.

Isso deve surgir organicamente da situação.

O NPC pode perguntar:

"Mesmo com uma senha forte, existe outra forma de adicionar uma camada de proteção?"

Apresentar uma explicação visual:

SENHA
+
SEGUNDA VERIFICAÇÃO
===================

CAMADA EXTRA DE PROTEÇÃO

A animação pode representar duas barreiras independentes.

O objetivo é mostrar visualmente que a conta não depende de apenas uma proteção.

Explicação:

"A autenticação em dois fatores adiciona uma segunda etapa além da senha. Assim, descobrir somente a senha não é necessariamente suficiente para acessar a conta."

---

# 8. CÓDIGOS DE AUTENTICAÇÃO

Ainda na mesma situação, apresentar uma pequena continuação.

O participante recebe um código de autenticação.

O NPC pergunta:

"Alguém pediu esse código. O que você faz?"

O conceito já foi trabalhado no diagnóstico inicial, portanto não precisamos repetir a mesma pergunta exatamente.

A situação pode ser integrada à narrativa.

A mensagem pode ser algo como:

"Me passa o código que acabou de chegar para eu confirmar o acesso."

O participante deve perceber:

CÓDIGO DE AUTENTICAÇÃO É PESSOAL.

Não compartilhar.

Não precisamos ensinar técnicas de fraude ou invasão.

Apenas comportamento defensivo.

---

# 9. REAÇÃO A POSSÍVEL COMPROMETIMENTO

Ainda dentro da terceira situação, apresentar um pequeno painel de decisão.

"Você não reconhece o acesso. O que deve fazer?"

Mostrar ações possíveis.

A sequência educativa desejada é:

1. acessar a conta pelo canal oficial;
2. verificar atividades/sessões;
3. encerrar acessos que não reconhece;
4. alterar a senha;
5. ativar 2FA/MFA, se disponível;
6. revisar outras contas caso a mesma senha tenha sido reutilizada.

Não apresentar isso como uma lista enorme durante a experiência principal.

A lista pode aparecer na tela final como um "kit de reação".

---

# 10. FECHAMENTO DO MÓDULO

Depois das três situações, o personagem chega ao final da área.

Criar uma pequena cena de encerramento.

O NPC pergunta:

"Então, qual é a melhor forma de proteger uma conta?"

Em vez de outro quiz longo, fazer uma microdecisão final.

O participante deve escolher a combinação mais segura entre quatro possibilidades.

A opção correta deve combinar os principais comportamentos:

* senha forte;
* senha exclusiva;
* 2FA/MFA;
* atenção a acessos suspeitos.

Depois da escolha, mostrar uma síntese visual.

Exemplo:

SENHA FORTE
↓
SENHA EXCLUSIVA
↓
2FA/MFA
↓
ATENÇÃO A ACESSOS SUSPEITOS

E uma frase final:

"Segurança não depende de uma única barreira. Pequenas decisões podem proteger suas contas."

Depois:

[ CONTINUAR ]

---

# 11. CAMINHO RÁPIDO VS. EXPLORAÇÃO

O módulo precisa funcionar para dois perfis.

## Perfil A — quer terminar rapidamente

Esse participante:

* lê a pergunta;
* escolhe;
* recebe explicação;
* continua.

Não deve ser obrigado a:

* abrir exemplos;
* assistir animações longas;
* ler conteúdo adicional;
* completar atividades extras.

O caminho obrigatório precisa ser curto.

## Perfil B — quer aprender mais

Disponibilizar elementos opcionais:

"Entenda melhor"

"Veja um exemplo"

"Como funciona?"

"Na prática"

"Quero saber mais"

Esses elementos podem abrir pequenos cartões, painéis ou cenas secundárias.

Isso cria profundidade sem criar obrigação.

---

# 12. ANIMAÇÕES

As animações não devem existir apenas como decoração.

Cada animação deve reforçar o conceito.

Exemplos:

### Senha

Uma proteção visual aumenta/diminui conforme a qualidade da decisão.

### Reutilização

Uma mesma chave aparece conectada a várias contas.

### 2FA

Duas barreiras independentes aparecem antes do acesso.

### Acesso suspeito

Um dispositivo desconhecido aparece no painel da conta.

### Encerramento de sessão

Uma conexão visual é removida.

A regra é:

ANIMAÇÃO = EXPLICAÇÃO VISUAL

Não adicionar partículas, efeitos ou movimentos simplesmente porque são possíveis.

---

# 13. PERSONAGENS

Os NPCs devem parecer pessoas do cotidiano do público.

Evitar personagens que pareçam professores dando aula.

Cada NPC deve ter uma função narrativa.

Exemplo:

NPC 1:
Pessoa criando uma conta.

NPC 2:
Pessoa que reutiliza senha por praticidade.

NPC 3:
Pessoa que recebeu alerta de acesso suspeito.

Os NPCs podem possuir pequenas características visuais e comportamentais, mas não devemos criar diálogos longos.

O participante precisa sentir que está encontrando situações, não assistindo a uma palestra.

---

# 14. SISTEMA DE DIÁLOGO

Utilizar balões de fala curtos.

Evitar:

"Olá! Hoje iremos aprender sobre a importância da utilização de senhas fortes, bem como os diversos mecanismos..."

Preferir:

"Estou criando uma senha. Qual dessas escolhas é mais segura?"

Depois da decisão:

"Boa. Mas existe outro problema..."

O diálogo deve parecer conversa.

---

# 15. FEEDBACK DAS RESPOSTAS

O feedback deve ser imediato.

Estrutura:

DECISÃO
↓
CONSEQUÊNCIA VISUAL
↓
EXPLICAÇÃO
↓
EXEMPLO

Não utilizar apenas:

"Resposta correta."

O participante precisa entender POR QUÊ.

Se errar, não punir.

Não usar:

"Você falhou."

Preferir:

"Essa escolha parece prática, mas cria um problema: a mesma senha pode proteger várias contas."

O erro deve virar aprendizagem.

---

# 16. PROGRESSÃO DO PERSONAGEM

A movimentação do personagem deve ser predominantemente automática.

Não transformar a experiência em um jogo de plataforma.

O personagem pode:

* andar;
* parar;
* olhar para NPC;
* reagir;
* continuar;
* atravessar portas;
* interagir com objetos;
* chegar ao próximo ponto.

O usuário controla decisões, não locomoção.

Isso é importante porque o objetivo é educação digital, não habilidade motora.

---

# 17. ARQUITETURA REUTILIZÁVEL

Não implementar o Módulo 1 como código completamente específico.

Precisamos criar componentes reutilizáveis para os seis módulos.

Conceitualmente:

Module
→ Scene
→ Character
→ NPC
→ Dialogue
→ Interaction
→ Feedback
→ OptionalContent
→ Transition

As cenas devem ser orientadas por dados sempre que isso fizer sentido.

A estrutura deve permitir posteriormente trocar:

* personagem;
* cenário;
* NPC;
* diálogo;
* pergunta;
* alternativas;
* feedback;
* animações;
* conteúdo opcional;
* próxima cena.

sem reescrever todo o sistema.

---

# 18. MODELO DE CENA

Cada cena deve possuir, conceitualmente:

* id;
* módulo;
* tipo da cena;
* cenário;
* NPC/personagem;
* diálogo;
* interação;
* opções;
* feedback;
* conteúdo opcional;
* próxima cena.

Para decisões, utilizar inicialmente CHOICE como tipo de interação.

Não criar um sistema gigantesco de game engine.

Queremos um sistema de cenas simples e controlável.

---

# 19. PERFORMANCE

O ConectaSeguro será utilizado principalmente em celulares.

Portanto:

* evitar imagens gigantes;
* evitar excesso de partículas;
* evitar dezenas de elementos animados simultaneamente;
* evitar efeitos pesados;
* limitar camadas de parallax;
* otimizar sprites;
* carregar recursos de maneira progressiva quando necessário;
* respeitar aparelhos de baixo/médio desempenho.

A experiência precisa parecer viva, mas não pode sacrificar usabilidade.

---

# 20. MOBILE-FIRST

Considerar desde o início:

* telas pequenas;
* toque;
* botões grandes;
* textos curtos;
* contraste adequado;
* balões de fala legíveis;
* alternativas fáceis de tocar;
* ausência de dependência de hover;
* nenhuma interação essencial baseada em mouse;
* layout adaptável.

O usuário deve conseguir realizar o módulo confortavelmente segurando o celular com uma mão.

---

# 21. CAMINHO OBRIGATÓRIO

O caminho essencial do Módulo 1 deve ser:

INTRODUÇÃO
↓
SITUAÇÃO 1 — CRIAR
↓
SITUAÇÃO 2 — REUTILIZAÇÃO
↓
SITUAÇÃO 3 — REAGIR
↓
FECHAMENTO
↓
PRÓXIMO MÓDULO

Conteúdo adicional nunca deve bloquear esse caminho.

---

# 22. MÉTRICAS

O frontend deve permitir registrar posteriormente eventos como:

* scene_started;
* scene_completed;
* choice_selected;
* explanation_opened;
* example_opened;
* optional_content_opened;
* module_completed.

Não registrar informações pessoais desnecessárias.

As escolhas devem poder ser associadas ao participant_id pseudônimo já definido na arquitetura.

Esses dados serão úteis posteriormente para avaliar:

* onde os participantes erram;
* quais situações geram mais dificuldade;
* quais conteúdos opcionais são explorados;
* quais competências apresentam evolução no pós-teste.

Importante: abrir ou não um conteúdo opcional não deve ser interpretado automaticamente como "aprendeu" ou "não aprendeu".

---

# 23. O QUE NÃO FAZER

Não transformar este módulo em:

* apresentação de slides;
* vídeo longo;
* texto corrido;
* tutorial técnico;
* jogo de plataforma;
* teste escolar tradicional;
* sequência de caixas de diálogo sem interação;
* sequência de perguntas sem narrativa.

Também não adicionar conteúdo apenas para aumentar a duração.

A pergunta principal para cada elemento deve ser:

"Isso ajuda o participante a tomar uma decisão digital mais segura?"

Se a resposta for não, provavelmente esse elemento não precisa estar no caminho principal.

---

# 24. PRINCÍPIO PARA OS SEIS MÓDULOS

Este Módulo 1 deve estabelecer o padrão de toda a experiência.

Os outros módulos deverão seguir a mesma filosofia:

CONTEXTO
→ SITUAÇÃO
→ DECISÃO
→ CONSEQUÊNCIA
→ EXPLICAÇÃO
→ APLICAÇÃO
→ PROGRESSÃO

Mas cada módulo deverá possuir sua própria ambientação, personagens, situações e linguagem visual.

Não queremos seis cópias do mesmo módulo trocando apenas o texto.

Queremos seis experiências diferentes dentro da mesma linguagem de interação.

O ConectaSeguro deve funcionar como uma jornada contínua, em que o participante aprende segurança digital tomando decisões, observando consequências e entendendo o motivo de cada escolha.

PROMPT COMPLEMENTAR — MÓDULO 1
Direção de cenário e ambientação

IMPORTANTE: este prompt complementa a especificação anterior do Módulo 1. Não substitui o conteúdo pedagógico nem a arquitetura já definida.

O Módulo 1 — Senhas e Segurança de Contas deve utilizar um dos cenários oficiais já existentes no projeto, e não receber um cenário novo criado livremente pelo Claude.

A direção visual geral do ConectaSeguro é pixel art 2D, com paisagens atmosféricas, iluminação estilizada, predominância de tons frios e possibilidade de alternância entre dia, pôr do sol e noite.

Para o Módulo 1, priorize o cenário de caverna/espaço subterrâneo entre os ambientes existentes.

A escolha deve funcionar como uma metáfora visual para o conteúdo:

entrada/proteção;
áreas protegidas;
caminhos seguros;
descoberta;
reação a ameaças.

O ambiente pode ser predominantemente escuro, utilizando iluminação ambiental em tons de azul/roxo e pontos de luz para destacar:

personagem;
NPC;
objetos interativos;
momentos de decisão.

Não transformar a caverna em um ambiente assustador. A atmosfera deve ser de exploração e descoberta, não de terror.

Progressão visual

Sempre que possível, organizar o módulo como uma pequena progressão:

entrada da caverna → áreas mais profundas → área protegida/final

Essa progressão deve acompanhar a lógica:

CRIAR → PROTEGER → REAGIR

Por exemplo:

Situação 1: área mais aberta/segura da caverna;
Situação 2: caminho mais profundo;
Situação 3: região que represente proteção/segurança;
fechamento: área mais iluminada ou visualmente estável.

Não é necessário criar várias cavernas diferentes. Utilize o mesmo cenário com diferentes pontos da composição, camadas, iluminação e elementos animados quando possível.

Regras técnicas
Reutilizar os assets de caverna já fornecidos pelo projeto.
Não gerar um novo cenário inteiro se os assets existentes forem suficientes.
Não trocar a tecnologia de renderização.
Não adicionar efeitos pesados.
Manter espaço visual suficiente para o personagem e NPCs.
Priorizar desempenho em celulares.
Usar parallax/animações ambientais somente quando a implementação atual já suportar isso.

O cenário deve parecer parte da mesma jornada do ConectaSeguro, e não uma tela independente.

Não alterar o conteúdo pedagógico do Módulo 1 por causa desta especificação visual.

IREÇÃO DOS CENÁRIOS — LIBERDADE CRIATIVA COM CRITÉRIO

O projeto possui 6 cenários/ambientes visuais principais fornecidos pelo responsável. Eles devem ser considerados a base visual oficial da jornada, mas não devem ser tratados como uma limitação rígida.

Antes de criar um cenário completamente novo, avalie se os ambientes existentes podem atender à necessidade através de:

diferentes regiões do cenário;
variação de iluminação;
horário do dia;
pôr do sol;
noite;
efeitos ambientais;
parallax;
novos elementos de primeiro plano;
objetos interativos;
pequenas extensões ou complementos visuais.

Entretanto, você possui liberdade criativa para propor novos elementos, variações ou até mesmo um novo ambiente quando identificar que isso melhora significativamente:

a experiência do participante;
a narrativa;
a compreensão do conteúdo;
a identidade visual;
a progressão da jornada;
a ambientação de determinada situação;
a qualidade estética do projeto.

Não evite uma boa ideia simplesmente porque ela não estava prevista originalmente.

Ao contrário, se identificar uma solução visual ou de design que possa elevar o projeto, proponha-a e explique brevemente por que ela é melhor.

A regra não é "nunca criar coisas novas".

A regra é:

não criar coisas novas sem propósito.

Diferencie:

CRIAÇÃO DESNECESSÁRIA

de

INOVAÇÃO QUE MELHORA O PROJETO.

Se uma nova solução realmente agregar valor, ela pode ser incorporada.

Se for apenas uma variação estética que aumenta muito o trabalho sem melhorar a experiência, prefira reutilizar os assets existentes.

Você pode tomar decisões criativas de design quando elas forem justificadas pelo contexto do módulo.

Não fique preso ao que foi explicitamente descrito neste prompt. Use seu conhecimento de design, game design, UX e direção visual para identificar oportunidades que o responsável pelo projeto pode não ter previsto.

Caso tenha uma ideia particularmente relevante, implemente-a quando for claramente compatível com a arquitetura e, ao final, registre brevemente a decisão e o motivo.
