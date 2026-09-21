# PRD - ClimaSafe

## App de Alerta Climático + Preparação para Emergências

**Versão:** 1.0  
**Data:** Setembro 2026  
**Dono do Produto:** [Seu Nome]  
**Status:** Em Desenvolvimento (MVP)

---

## 📋 Executive Summary

**ClimaSafe** é um aplicativo mobile (iOS/Android) que centraliza alertas climáticos em tempo real com foco em **preparação pessoal e comunitária** para desastres naturais. Diferente de apps de previsão genéricos, ClimaSafe oferece:

- Alertas geolocationais customizados por tipo de risco climático
- Planos de preparação estruturados e checklists interativos
- Mapa de recursos de emergência locais
- Comunidade de compartilhamento de dicas e experiências
- Modelo de monetização não-invasivo (ads contextuais + B2B)

**Público-Alvo:** 100% de pessoas que se preocupam com segurança climática (potencial: 50+ milhões no Brasil)

**Modelo de Negócio:** Freemium com receita via ads, relatórios para seguradoras e premium opcional

---

## 🎯 **ESTRATÉGIA CRÍTICA: BRASIL FIRST**

> ⚠️ **Este PRD é 100% Brasil no MVP.** Internacionalização vem DEPOIS de validação completa.
>
> **Não fazer:** Lançar em 5 idiomas no dia 1  
> **Fazer:** Português Brasil → Validação → Portugal → Latam → Global
>
> **Gateway para expandir:** 300k+ usuários BR + $5k+/mês + 1 seguradora parceira
>
> Ver seção **"Localização & Internacionalização"** para roadmap de expansão.

---

---

## 🎯 Visão & Missão

**Visão:** Ser o app de referência para preparação climática no Brasil, expandindo para América Latina e além

**Missão:** Capacitar pessoas a se prepararem melhor para emergências climáticas através de informações contextualizadas, acionáveis e comunitárias, começando pelo Brasil

**Estratégia de Expansão:** Validar completamente no Brasil, depois replicar modelo para Portugal (mesma língua), depois Latam em espanhol, depois global em inglês

---

## 🔍 Análise do Problema

### Problema Principal

- **Fragmentação de Informações:** Alertas climáticos vêm de múltiplas fontes (INMET, defesa civil, redes sociais)
- **Falta de Ação:** Pessoas recebem alertas mas não sabem o que fazer
- **Desigualdade de Preparação:** Preparação para emergências é privilege of informed, não é universal
- **Falta de Planos Pessoalizados:** Recomendações genéricas não funcionam (risco de enchente ≠ risco de seca)

### Dados de Contexto

- IPCC 2023: Frequência de eventos climáticos extremos aumentou 4x em 20 anos
- Brasil: 2022 teve 1.459 desastres naturais registrados (Proteção e Defesa Civil)
- 78% dos brasileiros se preocupam com mudanças climáticas (Datafolha 2023)
- Apenas 12% têm plano de emergência familiar

---

## 👥 Personas

### Persona 1: **Marina (28, Mãe, SC)**

- **Background:** Mãe de 2 filhos, trabalha em home office
- **Motivação:** Proteger a família em caso de enchentes (histórico de 2015)
- **Pain Points:** Não sabe onde levar filhos em caso de evacuação, perde alertas do WhatsApp
- **Ganha com ClimaSafe:** App centralizado + mapa de abrigos + plano de evacuação com crianças

### Persona 2: **João (55, Empresário, SP)**

- **Background:** Dono de imóvel/negócio, preocupado com sinistros
- **Motivação:** Reduzir perdas e ter dados para seguradora
- **Pain Points:** Falta informação estruturada sobre risco de seu imóvel
- **Ganha com ClimaSafe:** Relatórios históricos + análise de preparação (pode usar com seguradoras)

### Persona 3: **Ana (22, Ativista Climática, RJ)**

- **Background:** Engajada com sustentabilidade, compartilha informações
- **Motivação:** Educar comunidade sobre preparação climática
- **Pain Points:** Não tem plataforma para compartilhar conhecimento local
- **Ganha com ClimaSafe:** Feed comunitário + poder criar "grupos de preparação"

### Persona 4: **Carlos (62, Aposentado, RS)**

- **Background:** Vive em zona de risco (enchentes recorrentes)
- **Motivação:** Ter segurança e plano claro
- **Pain Points:** Usa pouca tecnologia, precisa de interface simples
- **Ganha com ClimaSafe:** Interface clara + dados offline + suporte por chat

---

## 📱 Features & Funcionalidades

### **FASE 1: MVP (Lançamento)**

#### 1.1 **Onboarding & Perfil de Risco**

- **Objetivo:** Customizar app para risco específico do usuário
- **Funcionalidades:**
  - Quiz inicial: "Qual é seu principal risco climático?"
    - [ ] Enchentes
    - [ ] Deslizamentos
    - [ ] Secas/estiagem
    - [ ] Vendavais/tempestades
    - [ ] Geadas/frio extremo
    - [ ] Múltiplos riscos
  - Localização automática (GPS) ou manual
  - Identificação de quantas pessoas no domicílio
  - Status de mobilidade (crianças, idosos, PCD)

**Prioridade:** P0 (Bloqueador)

---

#### 1.2 **Dashboard - Alertas em Tempo Real**

- **Objetivo:** Central de informações de risco climático atual
- **Funcionalidades:**
  - Card de alerta principal (cor: verde/amarelo/laranja/vermelho)
  - Temperatura atual, precipitação, vento (OpenWeatherMap)
  - Alertas de órgãos oficiais (INMET, Proteção Civil)
  - Status de recursos (energia, água, transportes)
  - Horário do próximo alerta crítico
  - Botão direto: "Ativar Plano de Emergência"

**Exemplo de Card:**

```
🔴 ALERTA CRÍTICO
Enchente iminente em 2 horas
Precipitação acumulada: 85mm
Recomendação: Iniciar evacuação agora

[Ver Plano] [Contatar Defesa Civil] [Compartilhar]
```

**Prioridade:** P0 (Bloqueador)

---

#### 1.3 **Plano de Preparação (Checklist)**

- **Objetivo:** Guiar usuário em ações concretas de preparação
- **Funcionalidades:**
  - Plano customizado por tipo de desastre
  - Checklist em 3 categorias:
    - **Antes:** Preparações (kit de emergência, documentos, contatos)
    - **Durante:** Ações imediatas (evacuar, proteger, comunicar)
    - **Depois:** Recuperação (limpeza, seguro, saúde mental)
  - Subtarefas com descrição detalhada
  - Marcar como concluído (com gamificação - % de preparação)
  - Lembretes periódicos
  - Versão PDF para download (offline)

**Exemplo de Subtarefa:**

```
📋 Preparar Kit de Emergência (Enchentes)

□ Mochila com suprimentos para 3 dias
  └ Água (1L por pessoa/dia)
  └ Alimentos não-perecíveis
  └ Flashlight + baterias
  └ Primeiros socorros
  └ Documentos em saco plástico

⏰ Validade: Revisar a cada 6 meses
```

**Prioridade:** P0 (Bloqueador)

---

#### 1.4 **Mapa de Recursos Locais**

- **Objetivo:** Localizar recursos de emergência próximos
- **Funcionalidades:**
  - Mapa interativo com pins:
    - 🏥 Hospitais/UPAs
    - 🏢 Abrigos de emergência
    - 🚒 Delegacias/Bombeiros
    - 💧 Pontos de água
    - 🔌 Pontos de carregamento
    - 📦 Coleta de suprimentos
  - Filtros por tipo de recurso
  - Distância e tempo de deslocamento
  - Status do recurso (ativo/fechado)
  - Avaliações de usuários
  - Integração com Google Maps (rotas)

**Dados:** Usar OpenStreetMap + dados públicos de prefeituras

**Prioridade:** P1 (Alta)

---

#### 1.5 **Feed Comunitário**

- **Objetivo:** Compartilhar conhecimento e dicas entre usuários
- **Funcionalidades:**
  - Feed de dicas por categoria:
    - "Como preparar kit de emergência"
    - "Sinais de alerta de enchente"
    - "Documentos importantes para guardar"
  - Posts curados por tipo de desastre
  - Upvote/downvote
  - Comentários
  - Badge de "Usuário Preparado" (% de checklist > 80%)
  - Histórias: "Como me preparei para a crise de 2022"

**Exemplo:**

```
👤 Marina de SC
⭐ Preparação: 85%

💡 Dica: Guarde documentos em saco plástico com dessecante
    Testei na enchente de 2022 e funcionou!

❤️ 234  💬 18  🔄 12
```

**Prioridade:** P1 (Alta)

---

#### 1.6 **Sistema de Notificações**

- **Objetivo:** Manter usuário informado sem spam
- **Funcionalidades:**
  - Alertas por nível de severidade (crítico/alto/médio/baixo)
  - Customização por tipo de desastre
  - Horário silencioso (ex: 22h-8h)
  - Limite: máximo 1 notificação por tipo/dia em normalidade
  - Notificação instantânea em alerta crítico
  - Resumo diário (opcional)

**Prioridade:** P0 (Bloqueador)

---

#### 1.7 **Contatos de Emergência**

- **Objetivo:** Acesso rápido a contatos críticos
- **Funcionalidades:**
  - Contatos personalizados (família, vizinhos)
  - Contatos públicos por localidade (Defesa Civil, Bombeiros)
  - Um clique para ligar/enviar SMS/WhatsApp
  - Compartilhar localização com contatos de confiança
  - Contatos pré-preenchidos com Defesa Civil local

**Prioridade:** P0 (Bloqueador)

---

### **FASE 2: Consolidação (Mês 4-5)**

#### 2.1 **Histórico Climatológico Pessoal**

- Timeline com eventos que afetaram o usuário
- Fotos antes/depois
- Lições aprendidas
- Impacto em números (casas afetadas na região, etc)

#### 2.2 **Grupos & Comunidades**

- Criar grupos por bairro/condomínio
- Coordenação de preparação coletiva
- Mensagens de emergência rápidas

#### 2.3 **Integração com Inteligência Artificial**

- Chat: "Como devo preparar minha casa para enchentes?"
- Análise de vulnerabilidade pessoal
- Recomendações automáticas

#### 2.4 **Relatórios para Seguradoras** (B2B)

- Exportar perfil de preparação em PDF
- Histórico de eventos climáticos
- Score de risco mitigado
- Prova para negociar melhor prêmio

#### 2.5 **Premium Features**

- Relatórios detalhados em PDF
- Histórico de 5 anos
- Sem ads
- Acesso a análises avançadas
- Suporte prioritário

---

## 🏗️ Requisitos Técnicos

### Stack de Desenvolvimento

**Frontend:**

```
React Native + Expo
├─ State Management: Redux Toolkit
├─ UI Components: React Native Paper
├─ Maps: react-native-maps + Mapbox GL
├─ Push Notifications: Expo Notifications
├─ Local Storage: AsyncStorage + WatermelonDB
└─ Analytics: Firebase Analytics
```

**Backend:**

```
Node.js + Express/Fastify
├─ Database: PostgreSQL (Railway/Render)
├─ Cache: Redis (Upstash)
├─ Auth: Firebase Auth
├─ File Storage: Firebase Storage / Cloudinary
├─ Queue: Bull (Redis-backed)
└─ Logging: Sentry + Pino
```

**APIs Externas (Gratuitas):**

```
├─ Clima: OpenWeatherMap (free tier)
├─ Alertas: INMET API + AlertaBrasil
├─ Geocoding: Google Places API (free tier)
├─ Notícias: NewsAPI.org (free tier)
├─ Maps: OpenStreetMap + Mapbox GL
└─ SMS (alertas críticos): Twilio (pagar conforme uso)
```

**Hosting:**

```
├─ App Store & Play Store: Free (distribuição)
├─ Backend: Vercel / Render (free tier)
├─ Database: Railway / Render (free tier 0.5GB)
├─ CDN: Vercel / Cloudflare (free)
└─ Monitoring: Sentry (free tier)
```

### Requisitos Não-Funcionais

| Requisito           | Alvo                                | Racional                                             |
| ------------------- | ----------------------------------- | ---------------------------------------------------- |
| **Performance**     | Tempo de carregamento < 2s          | Usuários em emergência precisam de informação rápida |
| **Disponibilidade** | 99.5% uptime                        | Alertas não podem falhar                             |
| **Segurança**       | HTTPS, Auth 2FA, LGPD               | Dados pessoais sensíveis                             |
| **Offline**         | Funcionar sem rede (dados críticos) | Alertas podem desligar internet                      |
| **Acessibilidade**  | WCAG 2.1 AA                         | Lei de inclusão brasileira                           |
| **Compatibilidade** | iOS 13+, Android 8+                 | Abraça 90% do mercado                                |

---

## 🌍 Localização & Internacionalização

### **Filosofia: Brasil First, Then Global**

**Princípio:** Validar completamente EM UM MERCADO antes de expandir. Não tentar ser global no MVP.

### **FASE 1: Brasil Apenas (Semanas 1-26)**

**Idioma:** 🇧🇷 Português Brasil (PT-BR) ÚNICO

**Por quê:**

- Sem overhead de i18n (strings hard-coded OK para MVP)
- APIs brasileiras: INMET, Defesa Civil, prefeituras
- Regulação única: LGPD brasileira
- Comunidade coesiva em português
- Validação rápida de Product-Market Fit

**Stack Técnico:**

- Sem i18n library no MVP (zero overhead)
- Strings em português diretamente no código
- APIs brasileiras pré-configuradas

### **FASE 2: Portugal (Mês 7-10)**

**Idioma:** 🇵🇹 Português Portugal (PT-PT)

**Por quê:**

- Mesmo idioma = reutilizar 80% do código
- Apenas traduzir conteúdo específico (nomes de abrigos, etc)
- Integração com IPMA (agência meteorológica PT)
- Nova seguradora + novo mercado

**Stack Técnico:**

- Ainda sem i18n library (apenas 2 variantes PT)
- Condicional simples: if (locale === 'PT-BR') vs 'PT-PT'
- APIs duplicadas (INMET para BR, IPMA para PT)

**Esforço:** +3 semanas  
**ROI:** +20-30k usuários, +$2-3k/mês

### **FASE 3+: Globalização (Mês 11+)**

**Idiomas:** 🇪🇸 Espanhol, 🇬🇧 Inglês, 🇫🇷 Francês, 🇩🇪 Alemão

**Quando Fazer:**

- ✅ Após Brasil validado (300k+ usuários)
- ✅ Com $50k+ capital acumulado
- ✅ Após primeira seguradora parceira assinada
- ✅ Com equipe 2x maior

**Stack Técnico (NOW faz sentido):**

- Implementar `react-i18n` ou `i18next`
- Separar strings em JSON por idioma
- APIs regionais por país
- Regulação por país (GDPR para EU, etc)

**Esforço:** +6-8 semanas por onda de novos idiomas

---

### **Checklist de Internacionalização**

Antes de lançar em novo país:

- [ ] APIs climáticas testadas e funcionando
- [ ] Defesa Civil / órgão equivalente integrado
- [ ] Dados de abrigos municipais disponíveis
- [ ] Conversas com seguradoras locais iniciadas
- [ ] Comunidade inicial recrutada (100+ usuários)
- [ ] Termo de Serviço traduzido e revisado legalmente
- [ ] Conformidade com LGPD/GDPR/leis locais
- [ ] Suporte ao cliente no idioma local (ou chatbot)

---

## 📊 Roadmap

### **FASE 1: Brasil MVP (Semanas 1-12)**

#### **Pré-Lançamento (Semanas 1-8)**

- [x] Validação com usuários (entrevistas em São Carlos/SC/SP)
- [ ] Arquitetura e setup inicial (React Native + Expo)
- [ ] Integração com APIs brasileiras (OpenWeatherMap, INMET)
- [ ] Telas de onboarding e dashboard (português Brasil)
- [ ] Sistema de alertas geolocationais (Brasil)
- [ ] Plano de preparação customizado por risco climático BR
- [ ] Contatos de Defesa Civil por município
- [ ] Testes internos e QA (português BR)

**Idioma:** 🇧🇷 Português Brasil (PT-BR)  
**Escopo:** Brasil apenas  
**Dados:** INMET, Defesa Civil BR, prefeituras

#### **Soft Launch (Semanas 9-12)**

- [ ] Beta em iOS/Android TestFlight
- [ ] 500 usuários internos (friends & family em SC/SP/RS)
- [ ] Coleta de feedback em português
- [ ] Ajustes de UX para usuários brasileiros
- [ ] Preparação de assets em português para loja

#### **Brazil Launch (Semana 13)**

- [ ] Go live no App Store & Play Store Brasil
- [ ] Marketing inicial (Twitter, LinkedIn, Reddit - português)
- [ ] Parceria com ONGs ambientais brasileiras
- [ ] Ativar Google AdMob (Brasil)

### **FASE 2: Brasil Growth (Mês 2-6)**

#### **Growth Phase 1 (Mês 2-3)**

- [ ] 50k usuários no Brasil
- [ ] Expandir para todas regiões do Brasil
- [ ] Feed comunitário em português (ativo)
- [ ] Primeiros revenue ($500+/mês via AdMob)

#### **Growth Phase 2 (Mês 4-5)**

- [ ] 200k usuários no Brasil
- [ ] Fase 2 features (histórico, IA, grupos)
- [ ] Iniciar conversas com seguradoras brasileiras
- [ ] Revenue $3-5k/mês (AdMob + B2B)

#### **Brasil Consolidation (Mês 6)**

- [ ] 300k+ usuários no Brasil
- [ ] 1+ seguradora parceira assinada
- [ ] Rating > 4.5 ⭐ no Brasil
- [ ] Revenue $5-10k/mês (múltiplas streams)
- [ ] **GO: Autorização para expandir internacionalmente**

### **FASE 3: Portugal Replication (Mês 7-10)**

#### **Portugal Prep (Mês 7)**

- [ ] Integração com IPMA (Instituto Português de Meteorologia)
- [ ] Tradução de conteúdo para português de Portugal (PT-PT)
- [ ] Parceria com Proteção Civil portuguesa
- [ ] Dados de abrigos municipais PT

#### **Portugal Launch (Mês 8)**

- [ ] Go live em Portugal (mesmo código, mesmo idioma)
- [ ] Marketing em Portugal
- [ ] Primeiros usuários portugueses

#### **Portugal Growth (Mês 9-10)**

- [ ] 20-30k usuários em Portugal
- [ ] Revenue adicional $2-3k/mês

### **FASE 4: Latam Expansão (Mês 11-14)**

#### **Espanhol (Latam)**

- [ ] Criação de i18n framework (agora vale a pena)
- [ ] Tradução para Espanhol (ES-MX, ES-ES, ES-AR, etc)
- [ ] Integração com APIs climáticas regionais
- [ ] Parcerias com seguradoras Latam

#### **Outros Mercados (A partir Mês 15)**

- [ ] Expansão para Inglês (UK, US, Australia)
- [ ] Francês (França, Canadá)
- [ ] Alemão
- [ ] Outros idiomas conforme demand

**Nota:** Internacionalizar só faz sentido APÓS validação completa em Brasil com números sólidos ($50k+ acumulado, 300k+ usuários, parcerias confirmadas)

---

## 💰 Modelo de Monetização

### **Revenue Stream 1: Publicidade (Google AdMob)**

```
Estimativa:
├─ CPM médio (Brasil): $0.50-1.50
├─ Impressões por usuário/dia: 2-3
├─ Usuários ativos: 1M (meta anual)
├─ Ad Revenue mensal: $1-3k
└─ Ad Revenue anual: $15-40k
```

**Placement:**

- Banner no bottom do feed comunitário (1 por sessão)
- Intersticial ao abrir plano de emergência (1 por dia max)
- Recompensas: Assist video para premium features

---

### **Revenue Stream 2: Relatórios para Seguradoras (B2B)**

```
Modelo: SaaS B2B
├─ Proposta: Seguradoras integram clientes
├─ Dado: Histórico de preparação reduz sinistro
├─ Preço: $500-1500/mês por seguradora
├─ Alvo: 3-5 seguradoras no ano 1
└─ Revenue anual: $20-70k
```

**Pitch:** "Seus clientes preparados = menos sinistros = nosso app é ROI positivo"

---

### **Revenue Stream 3: Premium (Freemium)**

```
Modelo: In-app subscription
├─ Preço: $2.99/mês (pode subir para $4.99)
├─ Conversão esperada: 1-3% (conservador)
├─ Usuários: 1M
├─ Revenue anual: $35-100k

Features premium:
├─ Relatórios PDF detalhados
├─ Histórico de 5 anos (vs 1 ano)
├─ Análise de vulnerabilidade IA
├─ Sem ads
└─ Exportar planos para seguro
```

---

### **Revenue Stream 4: Dados Agregados (Opcional)**

```
Modelo: Venda de insights anônimos
├─ Clientes: Pesquisadores, ONGs, governo
├─ Dados: Mapa de vulnerabilidade por região
├─ Preço: $2-5k por dataset
├─ Frequência: 1-2 por trimestre
└─ Revenue anual: $5-15k
```

---

### **Projeção de Revenue (Cenário Base - BRASIL ONLY)**

#### **FASE 1: Brasil (Mês 1-6)**

| Período | Usuários BR | AdMob | B2B   | Premium | Total         |
| ------- | ----------- | ----- | ----- | ------- | ------------- |
| Mês 1-3 | 50k         | $300  | $0    | $200    | **$500/mês**  |
| Mês 4-6 | 200k        | $1.2k | $1.5k | $1k     | **$3.7k/mês** |

**Cumulative Brasil (6 meses):** $12k revenue

#### **FASE 2: Brasil + Portugal (Mês 7-12)**

| Período   | Usuários BR | Usuários PT | AdMob | B2B | Premium | Total       |
| --------- | ----------- | ----------- | ----- | --- | ------- | ----------- |
| Mês 7-9   | 300k        | 20k         | $2k   | $2k | $2k     | **$6k/mês** |
| Mês 10-12 | 400k        | 30k         | $2.5k | $3k | $2.5k   | **$8k/mês** |

**Cumulative Brasil + Portugal (6 meses):** $41k revenue  
**Cumulative Total (12 meses):** $53k revenue

#### **FASE 3: Brasil + Portugal + Latam (Ano 2)**

| Região         | Usuários  | Revenue %     |
| -------------- | --------- | ------------- |
| Brasil         | 500k+     | 60% ($30k)    |
| Portugal       | 50k+      | 15% ($7.5k)   |
| Latam Espanhol | 100k+     | 20% ($10k)    |
| Outras regiões | 20k+      | 5% ($2.5k)    |
| **Total**      | **~670k** | **~$50k/mês** |

**Ano 2 Total:** $600k revenue anual

**Nota Importante:**

- ⚠️ **NÃO expandir para Portugal até atingir gatekeepers Brasil**
- Números Portugal baseados em replicação bem-sucedida
- Latam números assumem i18n implementado corretamente
- Valores conservadores: real pode ser 2-3x maior com viral growth

---

## 📈 Métricas de Sucesso (KPIs)

### **Métricas de Adoção**

- DAU (Daily Active Users): 10% de downloads no mês
- MAU (Monthly Active Users): 25% de downloads
- Retention D1: > 40%
- Retention D7: > 20%
- Churn mensal: < 10%

### **Métricas de Engajamento**

- Tempo de sessão médio: > 5 minutos
- Features usadas por sessão: > 2
- Checklist completado: > 60% dos usuários (3 meses)
- Posts no feed: 1 post a cada 100 usuários/semana

### **Métricas de Negócio**

- Downloads: 100k no mês 1, 1M no ano 1
- Revenue: $500 no mês 1, $55k no ano 1
- CAC (custo de aquisição): < $0.50 (via orgânico)
- LTV (lifetime value): > $5 por usuário

### **Métricas de Satisfação**

- App Store Rating: > 4.5 ⭐
- NPS (Net Promoter Score): > 50
- Bugs reportados: < 1 por 1000 usuários

---

## 🎯 Objetivos de Negócio (OKRs) - Brasil First

### **FASE 1: Brasil MVP (Q4 2026)**

#### **Q1 2026 (Brazil Launch)**

- **O1:** Lançar MVP no App Store & Play Store BRASIL
  - KR1: 10k downloads no primeiro mês (Brasil)
  - KR2: 4.5+ rating com 50+ reviews (português BR)
  - KR3: Zero crashes críticos (<1 bug por 1000 sessões)
  - KR4: Funcionando em todas regiões do Brasil

- **O2:** Validar modelo B2B no Brasil
  - KR1: Roadshow com 5+ seguradoras brasileiras
  - KR2: 1+ contrato de seguradora assinado
  - KR3: $500+ revenue AdMob (Brasil)

### **FASE 1: Brasil Growth (Q2-Q3 2026)**

#### **Q2 2026 - Brasil Scaling**

- **O1:** Atingir 200k usuários no Brasil
  - KR1: 2x downloads mês anterior (Brasil)
  - KR2: Retention D7 > 20% (Brasil)
  - KR3: Feed comunitário 500+ posts/dia em português

- **O2:** Aumentar revenue para $3k+/mês (Brasil)
  - KR1: $1.5k+ B2B (1+ seguradora gerando revenue)
  - KR2: $1k+ Premium (1% conversão)
  - KR3: $0.5k+ AdMob

#### **Q3 2026 - Brasil Consolidation**

- **O1:** Atingir 300k+ usuários no Brasil
  - KR1: Rating mantido > 4.5 ⭐
  - KR2: Retention D30 > 15%
  - KR3: NPS > 50

- **O2:** Revenue $5-8k/mês (Brasil)
  - KR1: $2-3k B2B (1-2 seguradoras)
  - KR2: $1.5-2k AdMob
  - KR3: $1-1.5k Premium

- **O3:** ✅ **GATEWAY: Autorização para expandir internacionalmente**
  - KR1: 300k+ usuários BR confirmados
  - KR2: Revenue $5k+/mês (Brasil)
  - KR3: Código pronto para replicação (sem dívida técnica)

---

### **FASE 2: Expansão para Portugal (Q4 2026 - Q1 2027)**

#### **Q4 2026 - Portugal Launch**

- **O1:** Lançar em Portugal (replicação Brasil)
  - KR1: Go live em Portugal (mesma língua, PT-PT)
  - KR2: 5k downloads Portugal (mês 1)
  - KR3: 4.5+ rating Portugal

- **O2:** Manter Brasil crescendo
  - KR1: 400k+ usuários Brasil
  - KR2: Revenue $6-7k/mês Brasil
  - KR3: Feed comunitário 1000+ posts/dia

#### **Q1 2027 - Brasil + Portugal**

- **O1:** 50k usuários Portugal + 500k Brasil
  - KR1: Retention D30 > 15% (Portugal)
  - KR2: Brasil mantendo 20% MAU

- **O2:** Revenue $8-10k/mês (Brasil + Portugal)
  - KR1: $4-5k Brasil
  - KR2: $2-3k Portugal
  - KR3: $1k+ outros

---

### **FASE 3: Latam Expansão (2027)**

- **O1:** Implementar i18n + lançar em Espanhol
  - KR1: Código i18n completo e testado
  - KR2: Lançar em México (maior mercado Latam)

- **O2:** 1M+ usuários globais (Brasil + Portugal + Latam)
- **O3:** Revenue $20-30k/mês global

---

### **Gatekeepers Críticos (NUNCA PULAR):**

```
🚫 Antes de Portugal:
  ✅ 300k+ usuários Brasil
  ✅ Revenue $5k+/mês Brasil
  ✅ 4.5+ rating Brasil
  ✅ 1+ seguradora contratada Brasil

🚫 Antes de Latam:
  ✅ 50k+ usuários Portugal
  ✅ Revenue $8k+/mês (Brasil + Portugal)
  ✅ Código sem dívida técnica
  ✅ Equipe 2x maior
  ✅ $50k+ capital acumulado
```

---

## 🚀 Go-to-Market Strategy - Brasil (Fase 1)

### **Phase 1: Awareness (Pré-Launch - Semanas 1-8)**

- **Blog:** Posts em português sobre preparação climática, riscos por região
- **Twitter:** Threads sobre importância de se preparar (português)
- **Reddit:** Participação ativa em r/brasil, r/sustentabilidade, subs de estados
- **YouTube:** Vídeos curtos sobre preparação (português)
- **Influenciadores:** Contatar ativistas climáticos brasileiros (biólogos, meteorologistas)
- **Parcerias:** Converter com ONGs ambientais brasileiras

**Objetivo:** 5k pré-registros antes do launch

### **Phase 2: Acquisition - Brazil Launch (Semana 13)**

- **Press Release:** Tech blogs brasileiros (Startup Brasil, Sô Startups, TechGuardian)
- **Parcerias com ONGs:** CEMADEN, Instituto Moinho, Instituto Socioambiental
- **App Store Optimization (ASO):** Keywords em português BR
- **Ads:** Google Play & App Store ($500-1000 orçamento inicial)
- **Reddit/Twitter:** Anúncio oficial em r/brasil
- **Influenciadores:** Divulgação simultânea com ativistas

**Público-alvo:** Brasileiros preocupados com clima + zonas de risco

**Objetivo:** 10k downloads na primeira semana

### **Phase 3: Retention - Brasil Growth (Mês 2-3)**

- **Email (português):** Newsletter semanal com dicas por tipo de desastre
- **Push (português):** Notificações relevantes (alertas reais, não spam)
- **In-app Gamificação:** Badges "Usuário Preparado", streaks de checklist
- **Community Spotlight:** Histórias de usuários que se prepararam
- **Regional Events:** Webinars com Defesa Civil local (São Paulo, SC, Rio Grande do Sul)

**Objetivo:** Retention D7 > 20%, MAU > 30k

### **Phase 4: Monetization - Brasil Focus (Mês 4+)**

- **B2B Outreach:** Ligar direto para seguradoras brasileiras
  - Bradesco Seguros, Itaú Seguros, Allianz, Mapfre
  - Pitch: "Seus clientes preparados = menos sinistros"
- **Premium Tier:** Comunicação clara sobre valor (exportar relatórios, histórico 5 anos)
- **Case Studies:** "Como Carlos em SC usou ClimaSafe pra se preparar"
- **Parcerias com Prefeituras:** Integrar dados de abrigos municipais

**Objetivo:** 1+ seguradora parceira, 1% conversão premium

### **Canais Brasil-Focused:**

```
Alta Prioridade:
├─ WhatsApp (90% dos brasileiros usam)
├─ Telegram (comunidades de preparação)
├─ Instagram (stories sobre preparação)
└─ Facebook (grupos locais por estado)

Média Prioridade:
├─ TikTok (dicas de preparação viralizam)
├─ YouTube (tutoriais)
└─ Twitter (tech community)

Parcerias Estratégicas BR:
├─ Defesa Civil por estado
├─ Seguradoras grandes (5+)
├─ ONGs ambientais (CEMADEN, Moinho)
└─ Influenciadores climáticos locais
```

---

## 🌐 Estratégia de Expansão Global (Post-Brasil)

### **Gatekeepers para Expandir (DEVE CUMPRIR TUDO):**

```
✅ Brasil validado:
  ├─ 300k+ usuários
  ├─ Retention D7 > 20%
  ├─ Rating 4.5+ ⭐
  └─ Revenue $5-10k/mês (múltiplas streams)

✅ Parcerias consolidadas:
  └─ 1+ seguradora brasileira contratada

✅ Capital acumulado:
  └─ $50k+ para expandir

✅ Modelo provado:
  └─ Código robusto, sem dívida técnica
```

Se esses critérios NÃO forem atingidos, NÃO expandir.

### **Portugal (Mês 7-10): Low-Hanging Fruit**

**Por quê agora?**

- Mesma língua = 80% do código reutilizável
- Mercado pequeno = teste seguro
- Falha em Portugal = iteramos e voltamos
- Sucesso em Portugal = validação de modelo global

**Estratégia:**

- Duplicar repo de Brasil
- Integrar IPMA (agência meteorológica PT)
- Traduzir nomes de abrigos + Defesa Civil
- Contactar seguradoras portuguesas
- Lançar no app store de Portugal

**Target:** 20-30k usuários, +$2-3k/mês

### **Latam Espanhol (Mês 11-14): Volume Real**

**Agora sim implementar i18n:**

- React-i18n ou i18next
- Tradução profissional para Espanhol
- Integrar APIs climáticas regionais por país

**Países em ordem de prioridade:**

1. 🇲🇽 México (130M habitantes, alto risco climático)
2. 🇦🇷 Argentina (46M, enchentes + secas)
3. 🇨🇱 Chile (19M, terremotos + desastres)
4. 🇨🇴 Colômbia (52M, deslizamentos)

**Target:** 100k+ usuários Latam, +$5-10k/mês

### **Global (Mês 15+): Com Recursos**

**Apenas se:**

- Latam foi sucesso
- Equipe cresceu
- Capital disponível para suporte multilíngue

**Idiomas em ordem:**

1. 🇬🇧 Inglês (US, UK, Australia) - maior mercado
2. 🇫🇷 Francês (França, Canadá)
3. 🇩🇪 Alemão
4. Outros conforme demand

---

## ⚠️ Anti-Pattern: O Que NÃO Fazer

❌ **NÃO internacionalizar no MVP**

- Causa: "Vamos ficar prontos para escalar"
- Resultado: Ninguém feliz, churn alto, modelo não validado

❌ **NÃO traduzir tudo manualmente**

- Usar: Profissional de tradução após MVP validado

❌ **NÃO lançar em 5 países no mesmo mês**

- Usar: Rolling expansion (1 país por mês)

❌ **NÃO manter código i18n no MVP**

- Usar: Strings hard-coded em português
- Refactor: Quando expandir para Portugal

---

## ⚠️ Riscos & Mitigação

| Risco                                       | Probabilidade | Impacto | Mitigação                                                         |
| ------------------------------------------- | ------------- | ------- | ----------------------------------------------------------------- |
| Churn alto (usuários não voltam)            | Alta          | Alto    | Gamificação, notificações relevantes, comunidade ativa            |
| Dependência de APIs brasileiras (INMET cai) | Média         | Alto    | Cache agressivo, dados offline, fallback para OpenWeatherMap      |
| Concorrência de apps similares              | Média         | Médio   | Foco em preparação + comunidade (diferencial claro)               |
| Regulação de dados (LGPD)                   | Baixa         | Alto    | Compliance desde dia 1, privacidade by design, auditoria legal    |
| Crescimento lento no Brasil                 | Média         | Médio   | Marketing orgânico agressivo, partnerships com ONGs/Defesa Civil  |
| Não conseguir parceria com seguradoras BR   | Alta          | Médio   | Validar com 3 seguradoras antes de expandir, ter alternativas B2B |
| Internacionalização prematura               | Média         | Alto    | **NUNCA expandir sem 300k+ usuários BR + revenue estável**        |
| INMET/APIs públicas mudarem formato         | Baixa         | Médio   | Monitorar mudanças, manter múltiplas fontes de dados              |
| Saturação do mercado brasileiro             | Baixa (ano 1) | Médio   | Começar expansão ao atingir 300k usuários (antes de saturar)      |

---

## 📝 Definições & Glossário

- **DAU:** Daily Active Users (usuários ativos por dia)
- **MAU:** Monthly Active Users (usuários ativos por mês)
- **Retention:** % de usuários que retornam após X dias
- **Churn:** % de usuários que abandonam o app
- **CAC:** Customer Acquisition Cost (quanto custa adquirir um usuário)
- **LTV:** Lifetime Value (quanto um usuário gera em revenue ao longo da vida)
- **NPS:** Net Promoter Score (métrica de satisfação)
- **CPM:** Cost Per Mille (custo por 1000 impressões de ads)
- **Offline First:** App funciona sem internet com dados críticos

---

## 📞 Contato & Dúvidas

**Produto:** [Seu Nome]  
**Última Atualização:** Setembro 2026  
**Status:** DRAFT - Aguardando validação de mercado

---

## ✅ Aprovações

- [ ] Founder/CEO
- [ ] CTO
- [ ] Consultor de Negócio
- [ ] Usuários de teste (validação)
