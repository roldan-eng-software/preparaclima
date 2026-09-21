# PRD — PreparaClima MVP (Brasil-first)

> Tipo: PRD inicial · Data: 2026-09-21
> **Status:** Implementada
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". Atualize para "Implementada" quando todas as specs estiverem concluídas. -->

## 1. Visão geral

O PreparaClima é um app mobile (iOS/Android) que ajuda famílias brasileiras a se prepararem para desastres climáticos. Neste recorte, o usuário informa seu perfil de risco uma única vez (tipos de risco, localização, quem mora na casa), vê um painel com o clima atual e os alertas oficiais da sua região, segue um checklist de preparação por fase (antes, durante, depois) e tem contatos de emergência à mão. Tudo em português do Brasil, com funcionamento do essencial mesmo sem internet.

Documento de referência (visão de negócio completa, fora deste recorte): `docs/ClimaSafe_PRD.md`.

## 2. Problema que resolve

Alertas climáticos chegam fragmentados (INMET, Defesa Civil, redes sociais) e as pessoas recebem o aviso mas não sabem o que fazer. Recomendações genéricas não funcionam: quem mora em área de enchente precisa de ações diferentes de quem enfrenta seca. Apenas uma minoria das famílias tem plano de emergência. O PreparaClima resolve isso ligando três coisas: o risco específico da pessoa, o alerta atual da região dela e um passo a passo do que fazer.

## 3. Público-alvo

Famílias brasileiras em áreas de risco climático, priorizando dois perfis:

- **Marina (28, mãe, SC):** precisa de plano de evacuação com crianças e de saber para onde levar os filhos em caso de enchente.
- **Carlos (62, aposentado, RS):** mora em zona de enchentes recorrentes, usa pouca tecnologia e precisa de interface simples, letras legíveis e dados essenciais offline.

Não é "todo mundo": o recorte exclui empresas, seguradoras, pesquisadores e usuários fora do Brasil.

## 4. Objetivo do recorte atual

Entregar um MVP instalável e testável no Brasil com o ciclo completo: configurar perfil de risco → ver clima e alertas reais da região → avançar no checklist de preparação → acionar contatos de emergência → receber notificações essenciais. Ao final, um usuário de São Carlos, Florianópolis ou Porto Alegre consegue instalar, configurar em menos de 5 minutos e usar o app no dia a dia sem depender de backend próprio.

## 5. Funcionalidades

**Essenciais:**

- Onboarding de perfil de risco (quiz de riscos, localização GPS ou manual, pessoas no domicílio, mobilidade)
- Persistência do perfil e guarda de acesso (quem não concluiu cai no onboarding; quem concluiu abre o painel)
- Painel com clima atual real (temperatura, chuva, vento) da localização do usuário
- Alertas oficiais (INMET/Defesa Civil) com 4 níveis (verde, amarelo, laranja, vermelho)
- Checklist de preparação por tipo de risco em 3 fases (Antes, Durante, Depois) com subtarefas
- Percentual de preparação por plano
- Contatos de emergência (pessoais + públicos por localidade, com ligação direta)
- Notificações essenciais por severidade com horário silencioso

**Desejáveis:**

- Cache offline dos dados críticos (último clima, últimos alertas, checklist e contatos)
- Resumo diário opcional por notificação

## 6. Fora do escopo

- Mapa de recursos locais (hospitais, abrigos, pins)
- Feed comunitário, grupos, comentários, upvotes, badges sociais
- Chat com IA e análise de vulnerabilidade automática
- Relatórios para seguradoras (B2B) e qualquer funcionalidade premium/paga
- Publicidade (AdMob), venda de dados e relatórios agregados
- Exportação de PDF
- Histórico climatológico pessoal e fotos antes/depois
- Internacionalização e expansão para outros países
- Cadastro com conta, login social e sincronização em nuvem
- Backend próprio com banco de dados, filas e analytics

## 7. Regras de negócio

- Regra 1: o app funciona sem conta; o perfil pertence ao aparelho e nunca sai dele neste recorte.
- Regra 2: "Múltiplos riscos" é exclusivo — ao marcá-lo, os riscos individuais são limpos, e vice-versa.
- Regra 3: o domicílio tem no mínimo 1 e no máximo 20 pessoas.
- Regra 4: "Nenhuma necessidade especial" limpa as demais opções de mobilidade.
- Regra 5: sem perfil concluído, o usuário só acessa o onboarding; sem exceção.
- Regra 6: o nível do card principal é sempre o mais grave entre os alertas vigentes.
- Regra 7: em normalidade (sem alerta vigente), no máximo 1 notificação por tipo ao dia.
- Regra 8: alerta vermelho notifica na hora, mesmo no horário silencioso.
- Regra 9: o percentual de preparação é calculado sobre itens concluídos do plano ativo; nunca passa de 100%.
- Regra 10: dados pessoais (localização, domicílio) não são enviados a terceiros; só às APIs de clima/alertas o estritamente necessário à consulta.

## 8. Fluxos principais

### Fluxo 1 — Configurar perfil (primeiro uso)

1. Usuário abre o app e cai no quiz de riscos.
2. Marca um ou mais riscos (ou "Múltiplos riscos") e continua.
3. Autoriza o GPS ou informa cidade/UF manualmente e continua.
4. Informa quantas pessoas moram na casa e as necessidades de mobilidade, e revisa o resumo.
5. Confirma e cai no painel com seus dados aplicados.

### Fluxo 2 — Ver risco atual

1. Usuário abre o painel.
2. Vê o card principal com o nível mais grave vigente, o bloco "agora" (temperatura, chuva, vento) e o resumo do perfil.
3. Se houver alerta grave, o botão de emergência leva ao checklist/contatos.

### Fluxo 3 — Avançar na preparação

1. Usuário abre o plano do seu risco principal.
2. Marca subtarefas concluídas nas fases Antes, Durante e Depois.
3. Acompanha o percentual de preparação subir.
4. Se trocar de risco principal, o plano exibido troca junto sem perder o progresso dos outros.

### Fluxo 4 — Emergência

1. Diante de alerta vermelho, o usuário toca "Ativar Plano de Emergência".
2. Vê as ações imediatas da fase "Durante" e os contatos de emergência.
3. Liga para um contato com um toque.

## 9. Critérios de aceite

- O usuário consegue concluir o perfil em menos de 5 minutos em português claro.
- O sistema impede o acesso ao painel sem perfil concluído e impede o acesso ao onboarding depois de concluído.
- O sistema exibe clima real da localização do usuário, com data de atualização visível.
- O sistema exibe alertas oficiais vigentes com o nível e a recomendação corretos.
- Quando há mais de um alerta vigente, o sistema mostra o mais grave no card principal.
- O usuário consegue concluir itens do checklist e ver o percentual reagir.
- O usuário consegue ligar para um contato de emergência com um toque.
- Quando ocorre um alerta vermelho, o sistema notifica imediatamente, mesmo no horário silencioso.
- Quando não há rede, o sistema mostra os últimos dados salvos com aviso de que estão desatualizados.

## 10. Stack

App mobile em Expo + React Native com TypeScript, gerenciamento de estado com Redux Toolkit, interface com React Native Paper, armazenamento local no aparelho, localização e notificações push do ecossistema Expo. API própria em Fastify apenas como esqueleto (saúde e listagem vazia). Dados externos: OpenWeather para clima atual e INMET/Defesa Civil para alertas oficiais. Sem banco de dados, sem autenticação, sem backend obrigatório para o MVP funcionar.

## 11. Justificativa da stack

É a stack que o projeto já usa e está validada (lint, typecheck e doctor verdes): nada a trocar no recorte. O armazenamento local dispensa conta e backend; as APIs externas gratuitas cobrem clima e alertas sem custo inicial. O esqueleto Fastify fica reservado para quando houver backend real, sem bloquear o MVP.

## 12. Fases de construção

### Fase 1 — Base (perfil)

Objetivo: perfil de risco completo, persistido e exigido na entrada.
Specs:

- Spec 01 — Perfil de risco completo (onboarding)
- Spec 02 — Persistência do perfil e guarda de acesso

### Fase 2 — Painel real

Objetivo: trocar os dados de demonstração por clima e alertas reais.
Specs:

- Spec 03 — Clima atual real
- Spec 04 — Alertas oficiais com níveis

### Fase 3 — Checklist

Objetivo: plano de preparação acionável por risco, com progresso visível.
Specs:

- Spec 05 — Catálogo de checklist por risco
- Spec 06 — Progresso de preparação

### Fase 4 — Emergência e avisos

Objetivo: agir rápido na hora crítica e ser avisado sem spam.
Specs:

- Spec 07 — Contatos de emergência
- Spec 08 — Notificações essenciais

### Fase 5 — Validação

Objetivo: app confiável offline, privado e testado em PT-BR.
Specs:

- Spec 09 — Offline crítico, privacidade e QA

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Perfil de risco completo (onboarding)

- **Fase:** Fase 1 — Base (perfil)
- **Objetivo (o quê):** Coletar o perfil de risco do usuário em 4 passos (riscos, localização, domicílio, revisão) e marcá-lo como concluído.
- **Intenção (por quê):** Sem o perfil, nada mais se personaliza (alertas, checklist, contatos). É o P0 do produto e já existe parcialmente — esta spec fecha o comportamento.
- **Contexto:** Existe um fluxo de onboarding com as telas de quiz, localização, domicílio e revisão, e um conceito de perfil com riscos, localização, pessoas no domicílio, mobilidade e sinal de conclusão.
- **Atores:** Novo usuário no primeiro uso; usuário que reinicia o perfil.
- **Descrição do comportamento:** O sistema apresenta 6 opções de risco (enchente, deslizamento, seca, vendaval, geada, múltiplos) com seleção múltipla; depois pede a localização (GPS com pedido de permissão, ou cidade/UF digitados); depois a composição do domicílio (contador de pessoas + opções de mobilidade); por fim um resumo para confirmar. Ao confirmar com todos os passos válidos, o perfil é marcado como concluído e o usuário vai ao painel.
- **Entradas e saídas:** Entram as escolhas de risco, a localização (coordenadas ou cidade/UF) e os dados do domicílio. Sai o perfil completo com sinal de conclusão.
- **Dados/entidades envolvidos (conceitual):** perfil de risco: lista de riscos, localização (modo GPS com coordenadas, ou modo manual com cidade e UF), número de pessoas (1–20), lista de mobilidade (crianças, idosos, PCD), indicador de onboarding concluído.
- **Estados e transições:** rascunho (passos incompletos) → concluído (confirmação na revisão). Reiniciar volta a rascunho com valores padrão e conclusão falsa.
- **Regras de negócio:** "Múltiplos riscos" exclui os individuais e vice-versa; pessoas entre 1 e 20; "Nenhuma necessidade especial" limpa as demais; quiz exige ao menos 1 risco; localização exige GPS válido ou cidade + UF.
- **Validações:** Bloquear "Continuar" no quiz sem risco; bloquear avanço sem localização válida; UF com 2 letras; revisão só confirma se passos anteriores válidos.
- **Fluxo do usuário (passo a passo):**
  1. Marca os riscos e toca Continuar.
  2. Toca "Usar minha localização" (autoriza) ou digita cidade/UF e continua.
  3. Ajusta o contador de pessoas, marca mobilidade e vai à revisão.
  4. Confere o resumo e confirma; cai no painel.
- **Casos de borda e erros:** permissão de GPS negada → mensagem clara e caminho manual; GPS indisponível/erro → permitir manual; cidade sem UF (ou UF inválida) → erro junto aos campos; voltar e trocar escolhas → resumo reflete o estado atual.
- **Impacto no existente:** Nenhuma mudança visual fora do onboarding; apenas completa o comportamento do fluxo existente.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o quiz sem seleção, Quando tenta continuar, Então o sistema bloqueia.
  - Dado "Múltiplos riscos" marcado, Quando marca "Enchentes", Então "Múltiplos" é desmarcado.
  - Dado GPS negado, Quando nega a permissão, Então o sistema oferece o caminho manual com mensagem clara.
  - Dado cidade sem UF, Quando confirma, Então o sistema aponta o erro e não avança.
  - Dado revisão válida, Quando confirma, Então o perfil é concluído e o painel abre.
- **Definição de pronto:** Os 4 passos funcionam de ponta a ponta, com validações e mensagens em PT-BR, sem dados de demonstração no resumo.
- **Dependências:** Nenhuma.
- **Fora do escopo desta spec:** Persistência entre sessões (Spec 02); clima/alertas reais (Specs 03–04); edição de perfil depois de concluído além de reiniciar.

### Spec 02 — Persistência do perfil e guarda de acesso

- **Fase:** Fase 1 — Base (perfil)
- **Objetivo (o quê):** Manter o perfil salvo no aparelho entre sessões e controlar quem entra onde (onboarding × painel).
- **Intenção (por quê):** O usuário configura uma vez e nunca mais repete; e ninguém usa o app sem perfil nem fica preso no onboarding depois de pronto.
- **Contexto:** Existe o conceito de perfil com sinal de conclusão e um guarda de rotas que redireciona entre onboarding e painel.
- **Atores:** Usuário retornando ao app; sistema na abertura.
- **Descrição do comportamento:** A cada mudança válida, o sistema salva o perfil no aparelho (com pequeno atraso para não gravar a cada toque). Na abertura, carrega o perfil salvo antes de mostrar qualquer tela. Quem não concluiu só acessa o onboarding; quem concluiu, ao tentar voltar ao onboarding, é levado ao painel.
- **Entradas e saídas:** Entra o perfil em edição; sai o perfil gravado e, na abertura, o perfil restaurado ou o estado inicial.
- **Dados/entidades envolvidos (conceitual):** o mesmo perfil de risco da Spec 01, incluindo o indicador de conclusão.
- **Estados e transições:** sem perfil → rascunho → concluído (persistido). Perfil corrompido/ilegível equivale a sem perfil.
- **Regras de negócio:** Só perfis concluídos liberam o painel; só perfis concluídos são restaurados como concluídos; reiniciar limpa para o padrão.
- **Validações:** Na carga, validar formato mínimo (riscos como lista, pessoas como número); dado inválido é descartado com segurança.
- **Fluxo do usuário (passo a passo):**
  1. Usuário configura o perfil e fecha o app.
  2. Reabre: o app restaura tudo e abre direto no painel.
  3. Se nunca concluiu, abre direto no quiz.
- **Casos de borda e erros:** dado salvo corrompido → começa do zero sem travar; gravação falha (armazenamento cheio) → app segue na sessão e tenta de novo na próxima mudança; atualização do app → perfil antigo continua válido se o formato for compatível.
- **Impacto no existente:** Reforça o guarda existente sem mudar o desenho das telas.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado perfil concluído, Quando fecha e reabre o app, Então o painel abre com os mesmos dados.
  - Dado perfil inconcluído, Quando abre o app, Então cai no quiz.
  - Dado usuário concluído, Quando tenta abrir o onboarding, Então é levado ao painel.
  - Dado dado salvo inválido, Quando abre o app, Então começa do zero sem erro visível.
- **Definição de pronto:** Ciclo configurar → fechar → reabrir preserva tudo; guardas funcionam nos dois sentidos.
- **Dependências:** Spec 01 — precisa do perfil completo e do sinal de conclusão.
- **Fora do escopo desta spec:** Conta em nuvem e sincronização entre aparelhos; edição de perfil concluído (entra reiniciar e refazer).

### Spec 03 — Clima atual real

- **Fase:** Fase 2 — Painel real
- **Objetivo (o quê):** Mostrar no painel o clima atual real da localização do usuário (temperatura, chuva, vento) com hora da atualização.
- **Intenção (por quê):** O painel hoje exibe valores de demonstração fixos; sem dados reais ele não serve para decisão.
- **Contexto:** Existe um painel com bloco "agora", card de alerta e resumo do perfil, hoje com conteúdo de demonstração e aviso de integração pendente.
- **Atores:** Usuário com perfil concluído abrindo o painel.
- **Descrição do comportamento:** Ao abrir o painel (e ao puxar para atualizar), o sistema consulta o serviço de clima com a localização do perfil e exibe temperatura, precipitação/chuva e vento, mais a hora da última atualização. Enquanto carrega, mostra estado de carregamento; em falha, mantém os últimos dados com aviso de desatualização e oferece tentar de novo.
- **Entradas e saídas:** Entra a localização do perfil (coordenadas ou cidade/UF). Saem os valores atuais exibidos e a hora da medição.
- **Dados/entidades envolvidos (conceitual):** leitura de clima: temperatura, precipitação, vento, hora da atualização e origem (qual localização foi consultada).
- **Estados e transições:** carregando → atualizado; carregando → erro com últimos dados; sem dado algum → vazio com ação de tentar de novo.
- **Regras de negócio:** Nunca exibir dado antigo como se fosse atual — sempre com hora visível ou aviso; localização manual usa cidade/UF; GPS usa coordenadas.
- **Validações:** Sem localização no perfil, não consultar e orientar a revisar o perfil.
- **Fluxo do usuário (passo a passo):**
  1. Abre o painel e vê o bloco atualizando.
  2. Lê temperatura, chuva, vento e a hora da atualização.
  3. Se falhar, vê o aviso e toca para tentar de novo.
- **Casos de borda e erros:** sem rede → últimos dados + aviso + tentar de novo; serviço fora do ar → mesma tela de erro, sem travar o app; cidade manual não encontrada → mensagem orientando corrigir a localização; valores ausentes na resposta → exibir "—" só naquele campo.
- **Impacto no existente:** Substitui o bloco de demonstração; o aviso de "integração pendente" sai.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado perfil com GPS, Quando abre o painel com rede, Então vê valores reais com hora de atualização.
  - Dado falha de rede, Quando abre o painel, Então vê os últimos dados com aviso de desatualização.
  - Dado sem nenhum dado anterior e sem rede, Quando abre o painel, Então vê estado vazio com botão de tentar de novo.
- **Definição de pronto:** Nenhum valor fixo de demonstração restante no bloco; hora de atualização sempre visível.
- **Dependências:** Spec 01 (localização) e Spec 02 (perfil restaurado).
- **Fora do escopo desta spec:** Previsão de próximos dias/horas; alertas oficiais (Spec 04); status de energia/água/transporte.

### Spec 04 — Alertas oficiais com níveis

- **Fase:** Fase 2 — Painel real
- **Objetivo (o quê):** Exibir os alertas oficiais vigentes (INMET/Defesa Civil) para a região do usuário com nível, descrição, recomendação e validade.
- **Intenção (por quê):** É o coração do produto: transformar aviso oficial em ação. Sem isso, o app é só um termômetro.
- **Contexto:** Existe um card de alerta principal com 4 cores/níveis (verde, amarelo, laranja, vermelho) e um botão de emergência, hoje com texto de demonstração.
- **Atores:** Usuário com perfil concluído; sistema ao atualizar o painel.
- **Descrição do comportamento:** O sistema busca os alertas vigentes para a localização do perfil e exibe o mais grave no card principal (cor, título do nível, descrição, recomendação e validade). Sem alerta vigente, o card fica verde "Normal". A lista completa dos vigentes aparece abaixo do card. O botão de emergência leva ao checklist/contatos.
- **Entradas e saídas:** Entra a localização do perfil. Saem o card principal e a lista de alertas vigentes exibidos.
- **Dados/entidades envolvidos (conceitual):** alerta oficial: nível (verde/amarelo/laranja/vermelho), título, descrição, recomendação, área afetada, início e validade, órgão emissor.
- **Estados e transições:** sem alertas (verde) → alerta vigente (cor do mais grave) → expirado volta ao verde. Múltiplos vigentes: prevalece o mais grave.
- **Regras de negócio:** O card principal reflete sempre o nível mais grave vigente; verde significa "nenhum alerta vigente", nunca "sem informação"; validade sempre visível quando houver alerta.
- **Validações:** Não se aplica além de exigir localização válida (herdado da Spec 03).
- **Fluxo do usuário (passo a passo):**
  1. Abre o painel e lê o card principal.
  2. Se amarelo ou pior, lê recomendação e validade.
  3. Toca no botão de emergência e vai agir.
- **Casos de borda e erros:** feed de alertas fora do ar → card mostra "informação indisponível" sem fingir normalidade; alerta expirado durante o uso → atualiza para o próximo vigente; região sem cobertura → mensagem honesta, mantendo o clima atual (Spec 03).
- **Impacto no existente:** Substitui o texto de demonstração do card; mantém as 4 cores e o botão.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado dois alertas vigentes (amarelo e vermelho), Quando abre o painel, Então o card é vermelho.
  - Dado nenhum alerta vigente, Quando abre o painel, Então o card é verde "Normal".
  - Dado feed indisponível, Quando abre o painel, Então vê "indisponível", nunca um verde falso.
- **Definição de pronto:** Card e lista refletem os alertas reais da região, com validade e recomendação, sem texto de demonstração.
- **Dependências:** Spec 01 e Spec 02; combina com Spec 03 no mesmo painel.
- **Fora do escopo desta spec:** Notificações push (Spec 08); status de serviços públicos; compartilhamento do alerta.

### Spec 05 — Catálogo de checklist por risco

- **Fase:** Fase 3 — Checklist
- **Objetivo (o quê):** Oferecer um plano de preparação por tipo de risco, em 3 fases (Antes, Durante, Depois), com subtarefas detalhadas em PT-BR.
- **Intenção (por quê):** É a resposta ao "recebi o alerta, e agora?". O plano traduz o risco em ações concretas.
- **Contexto:** Existe o botão "Ativar Plano de Emergência" que hoje leva a um placeholder; o plano cobre os 6 riscos do quiz.
- **Atores:** Usuário com perfil concluído.
- **Descrição do comportamento:** O sistema exibe o plano do risco principal do usuário (primeiro da lista, ou "Múltiplos" mostrando o plano mais relevante com troca manual). Cada plano tem itens agrupados em Antes, Durante e Depois; cada item tem título, descrição do passo a passo e, quando fizer sentido, validade de revisão (ex.: revisar o kit a cada 6 meses). Se o perfil mudar de risco, o plano exibido acompanha.
- **Entradas e saídas:** Entra o risco principal do perfil. Sai o plano exibido com seus itens e fases.
- **Dados/entidades envolvidos (conceitual):** plano por risco: fases (antes, durante, depois); item: título, descrição, fase, validade de revisão opcional; subtarefas como parte da descrição do item.
- **Estados e transições:** Não se aplica (catálogo estático neste recorte; o estado de concluído é a Spec 06).
- **Regras de negócio:** Todo plano tem as 3 fases com ao menos 3 itens cada; linguagem simples, adequada a idosos e leitores pouco técnicos; conteúdo embutido no app (funciona offline).
- **Validações:** Não se aplica.
- **Fluxo do usuário (passo a passo):**
  1. Toca "Ativar Plano de Emergência" ou abre o plano.
  2. Lê as fases e os itens do seu risco.
  3. Troca de plano se tiver mais de um risco.
- **Casos de borda e erros:** perfil "Múltiplos" → abre no plano mais relevante com seletor visível; risco sem plano cadastrado → mensagem clara em vez de tela vazia.
- **Impacto no existente:** O placeholder do botão é substituído pelo plano real.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado perfil de enchente, Quando abre o plano, Então vê as 3 fases com itens de enchente.
  - Dado perfil com 2 riscos, Quando abre o plano, Então consegue trocar entre eles.
  - Dado sem rede, Quando abre o plano, Então o conteúdo aparece normalmente.
- **Definição de pronto:** 6 planos completos em PT-BR simples, navegáveis por fase, sem telas vazias.
- **Dependências:** Spec 01 (riscos do perfil).
- **Fora do escopo desta spec:** Marcar itens e percentual (Spec 06); lembretes periódicos; PDF; personalização por número de pessoas além do texto base.

### Spec 06 — Progresso de preparação

- **Fase:** Fase 3 — Checklist
- **Objetivo (o quê):** Permitir marcar itens como concluídos e mostrar o percentual de preparação por plano.
- **Intenção (por quê):** Progresso visível mantém o usuário avançando e dá a sensação de "estou protegido".
- **Contexto:** Depende do catálogo da Spec 05; o progresso é por plano e persiste no aparelho.
- **Atores:** Usuário com perfil concluído.
- **Descrição do comportamento:** Cada item pode ser marcado/desmarcado com um toque; o percentual do plano é itens concluídos ÷ total, exibido com barra e número. O progresso de cada plano é guardado separadamente e sobrevive ao fechar o app. Uma ação de recomeçar o plano zera só aquele plano, com confirmação.
- **Entradas e saídas:** Entram os toques de marcar/desmarcar. Sai o percentual atualizado e o estado persistido.
- **Dados/entidades envolvidos (conceitual):** progresso por plano: quais itens concluídos, percentual, data da última atualização.
- **Estados e transições:** não iniciado (0%) → em andamento → completo (100%). Desmarcar reduz o percentual.
- **Regras de negócio:** Percentual sempre entre 0% e 100%; plano sem itens não existe (garantido pela Spec 05); recomeçar exige confirmação.
- **Validações:** Não se aplica.
- **Fluxo do usuário (passo a passo):**
  1. Marca itens concluídos no plano.
  2. Vê a barra e o número subirem.
  3. Completa 100% e vê o estado de plano completo.
- **Casos de borda e erros:** dado de progresso corrompido → recomeça zerado sem travar; itens adicionados em atualização futura → entram como pendentes, sem zerar o resto.
- **Impacto no existente:** Nenhum visual existente muda além do acréscimo do progresso no plano.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado plano com 4 itens e 1 marcado, Quando vê o progresso, Então lê 25%.
  - Dado app fechado e reaberto, Quando abre o plano, Então as marcações continuam.
  - Dado pedido de recomeçar, Quando confirma, Então só aquele plano zera.
- **Definição de pronto:** Marcar/desmarcar funciona por plano, percentual correto, persistido entre sessões.
- **Dependências:** Spec 05 — precisa do catálogo; Spec 02 — reaproveita o padrão de persistência local.
- **Fora do escopo desta spec:** Badges sociais e comparação com outros usuários; lembretes; exportação.

### Spec 07 — Contatos de emergência

- **Fase:** Fase 4 — Emergência e avisos
- **Objetivo (o quê):** Dar acesso em um toque a contatos pessoais e a contatos públicos (Defesa Civil, Bombeiros) da localidade.
- **Intenção (por quê):** Na emergência, ninguém pode caçar telefone. É P0 do produto original.
- **Contexto:** Existe a persona Marina (não sabe para onde levar os filhos) e o botão de emergência do painel; não há tela de contatos.
- **Atores:** Usuário com perfil concluído, em situação normal ou de emergência.
- **Descrição do comportamento:** O sistema mostra duas listas: pessoais (nome + telefone, criados/editados/excluídos pelo usuário) e públicos (sugeridos pela localidade do perfil: Defesa Civil local, Bombeiros 193, SAMU 192, Polícia 190). Tocar em ligar disca direto; quando houver app de mensagem, oferece WhatsApp/SMS. Compartilhar localização envia as coordenadas ou cidade/UF ao contato escolhido.
- **Entradas e saídas:** Entram nome + telefone dos pessoais e a localidade do perfil. Saem a chamada iniciada ou a mensagem/localização compartilhada.
- **Dados/entidades envolvidos (conceitual):** contato pessoal: nome e telefone; contato público: nome, número e abrangência (local/nacional).
- **Estados e transições:** Não se aplica.
- **Regras de negócio:** Números nacionais (190, 192, 193) sempre presentes; públicos locais ordenados antes dos nacionais quando houver; pessoais limitados a 10 para manter a lista usável.
- **Validações:** Telefone inválido bloqueia o salvamento com mensagem clara; nome vazio bloqueia.
- **Fluxo do usuário (passo a passo):**
  1. Abre Contatos (do painel ou do plano).
  2. Adiciona familiares/vizinhos uma vez.
  3. Na emergência, toca para ligar ou compartilhar a localização.
- **Casos de borda e erros:** localidade sem contatos públicos cadastrados → mostra os nacionais + orientação de completar; telefone sem app de chamada → mensagem clara; permissão de chamada negada pelo sistema → orientar nas configurações.
- **Impacto no existente:** Nova área acessível do painel/plano; nada do existente é removido.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado contato pessoal válido, Quando salva, Então ele aparece na lista após reabrir o app.
  - Dado telefone inválido, Quando tenta salvar, Então o sistema bloqueia com mensagem.
  - Dado toque em "Ligar" no 193, Quando confirma, Então a chamada inicia.
- **Definição de pronto:** Listas pessoais + públicas funcionais, ligação em um toque, tudo em PT-BR.
- **Dependências:** Spec 01 (localidade sugere os públicos); Spec 02 (persistência dos pessoais).
- **Fora do escopo desta spec:** Grupos de bairro, mensagens em massa, histórico de chamadas.

### Spec 08 — Notificações essenciais

- **Fase:** Fase 4 — Emergência e avisos
- **Objetivo (o quê):** Avisar o usuário sobre alertas da sua região por severidade, sem spam, com horário silencioso e resumo diário opcional.
- **Intenção (por quê):** Notificação demais vira spam e o usuário silencia tudo; de menos, ele perde o alerta que importa.
- **Contexto:** A capacidade de notificações está instalada mas não configurada; os níveis de alerta são os da Spec 04.
- **Atores:** Sistema (dispara) e usuário (configura e recebe).
- **Descrição do comportamento:** O usuário autoriza notificações uma vez e configura: tipos de desastre de interesse (dos seus riscos), horário silencioso (padrão 22h–8h) e resumo diário (desligado por padrão). Em normalidade, no máximo 1 notificação por tipo ao dia; alerta vermelho notifica imediatamente mesmo no silencioso. Tocar na notificação abre o painel já atualizado.
- **Entradas e saídas:** Entram as preferências e os alertas vigentes. Saem as notificações exibidas e o painel aberto ao toque.
- **Dados/entidades envolvidos (conceitual):** preferência de aviso: tipos de interesse, janela silenciosa, resumo diário ligado/desligado, hora do último aviso por tipo.
- **Estados e transições:** autorizado → configurado → ativo; permissão revogada → lembrete discreto no painel para reativar.
- **Regras de negócio:** Vermelho fura o silencioso; demais níveis respeitam; teto de 1/dia por tipo em normalidade; resumo diário só se ligado.
- **Validações:** Sem permissão do sistema, não agendar nada e orientar a ativação.
- **Fluxo do usuário (passo a passo):**
  1. Autoriza notificações quando o app pede.
  2. Ajusta tipos de interesse e horário silencioso.
  3. Recebe o aviso, toca e cai no painel.
- **Casos de borda e erros:** permissão negada → sem avisos, com orientação; permissão revogada depois → para de agendar e avisa discretamente; dois alertas do mesmo tipo no dia → só o primeiro notifica (o resto fica no painel).
- **Impacto no existente:** Nenhuma tela existente muda; adiciona o pedido de permissão e a tela de preferências.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado alerta amarelo novo, Quando dentro do horário permitido, Então notifica uma vez no dia.
  - Dado segundo alerta igual no mesmo dia, Quando chega, Então não notifica de novo.
  - Dado alerta vermelho às 3h, Quando chega, Então notifica mesmo no silencioso.
  - Dado toque na notificação, Quando abre, Então cai no painel atualizado.
- **Definição de pronto:** Regras de severidade, silencioso e teto diário funcionando, com preferências em PT-BR.
- **Dependências:** Spec 04 — precisa dos alertas com nível; Spec 01 — tipos de interesse vêm dos riscos.
- **Fora do escopo desta spec:** SMS via operadora; resumo por e-mail; sons/vibrações customizados por tipo.

### Spec 09 — Offline crítico, privacidade e QA

- **Fase:** Fase 5 — Validação
- **Objetivo (o quê):** Garantir o essencial sem rede, a privacidade mínima (LGPD) e a qualidade final em PT-BR.
- **Intenção (por quê):** Em desastre a internet cai; e dados de localização e família exigem cuidado desde o dia um.
- **Contexto:** Atravessa todas as specs: painel, checklist, contatos e perfil precisam degradar com honestidade sem rede.
- **Atores:** Usuário sem rede; usuário preocupado com privacidade; time de QA.
- **Descrição do comportamento:** O sistema guarda localmente o último clima, os últimos alertas, o checklist completo, os contatos e o perfil; sem rede, tudo abre com selo de "desatualizado" e hora da última atualização. Uma tela "Privacidade" explica em linguagem simples o que fica no aparelho, o que é consultado nas APIs e oferece apagar todos os dados locais. O QA cobre os fluxos 1–4 em PT-BR nos dois temas (claro/escuro), com lint e typecheck verdes.
- **Entradas e saídas:** Entram os últimos dados sincronizados. Saem as telas funcionais offline e o termo de privacidade exibido.
- **Dados/entidades envolvidos (conceitual):** pacote offline: perfil, último clima, últimos alertas, catálogo + progresso, contatos; registro de consentimento do aviso de privacidade.
- **Estados e transições:** atualizado → desatualizado (sem rede) → atualizado (rede volta). Apagar dados volta ao estado de primeiro uso.
- **Regras de negócio:** Nunca mostrar dado antigo como atual; apagar dados exige confirmação e leva ao onboarding; nenhum dado pessoal sai do aparelho além do necessário às consultas de clima/alertas.
- **Validações:** Apagar exige confirmação digitada ou dupla confirmação; sem rede, ações que exigem consulta são desabilitadas com explicação.
- **Fluxo do usuário (passo a passo):**
  1. Usa o app normalmente com rede.
  2. Fica sem rede e continua vendo tudo, com aviso de desatualização.
  3. Abre Privacidade, entende e, se quiser, apaga tudo.
- **Casos de borda e erros:** primeira abertura sem rede → onboarding funciona (manual), painel explica que precisa de rede para dados reais; armazenamento cheio → mensagem clara sem perda do perfil atual.
- **Impacto no existente:** Adiciona selos de "desatualizado", tela de privacidade e ação de apagar; resto segue igual.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado sem rede, Quando abre o plano, Então o conteúdo aparece com aviso de desatualização.
  - Dado sem rede e sem dado anterior, Quando abre o painel, Então vê orientação honesta em vez de erro técnico.
  - Dado pedido de apagar, Quando confirma, Então volta ao onboarding com dados limpos.
- **Definição de pronto:** Fluxos 1–4 testados offline e online, temas claro/escuro, lint + typecheck verdes, texto de privacidade em PT-BR simples.
- **Dependências:** Specs 01–08 — valida o conjunto.
- **Fora do escopo desta spec:** Criptografia avançada e auditoria formal LGPD; modo offline com mapas; sincronização em nuvem.

## 14. Ordem recomendada de implementação

1. Spec 01 — Perfil de risco completo (onboarding): base de toda personalização.
2. Spec 02 — Persistência do perfil e guarda de acesso: fecha a Fase 1 e libera o resto.
3. Spec 03 — Clima atual real: primeiro valor real no painel.
4. Spec 04 — Alertas oficiais com níveis: o coração do produto, sobre a mesma base.
5. Spec 05 — Catálogo de checklist por risco: dá o "o que fazer".
6. Spec 06 — Progresso de preparação: fecha o ciclo de preparação.
7. Spec 07 — Contatos de emergência: ação rápida na crise.
8. Spec 08 — Notificações essenciais: avisos sem spam, sobre os alertas prontos.
9. Spec 09 — Offline crítico, privacidade e QA: valida o conjunto inteiro.

Seguir a ordem evita construir telas sem os dados de que precisam e respeita as dependências: perfil antes do painel, painel antes do checklist, tudo antes das notificações e da validação final.
