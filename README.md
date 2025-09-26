# 🌊 Aplicação Web para Visualização e Disseminação de Dados Limnológicos  

## 📌 Tema do Semestre  
**Aplicação Web para Visualização e Disseminação de Dados Limnológicos**  
Projeto acadêmico desenvolvido com foco em disponibilizar e analisar dados limnológicos e meteorológicos coletados em reservatórios da Furnas Centrais Elétricas S.A., em cooperação com o INPE, UFRJ, UFJF e IIE.  

---

## 📖 Descrição do Projeto  
Este projeto visa desenvolver uma aplicação web interativa para a visualização, consulta e disseminação de dados limnológicos e meteorológicos coletados em reservatórios da Furnas Centrais Elétricas S.A., em colaboração com as instituições INPE, UFRJ, UFJF e IIE.
O objetivo principal é subsidiar estudos sobre o Balanço de Carbono nos reservatórios, disponibilizando os dados de forma organizada e de fácil acesso para os usuários.

Os dados utilizados no sistema são de dois tipos:

Parâmetros limnológicos coletados manualmente, realizados em diferentes locais dos reservatórios durante curtos períodos, chamados de campanhas de coleta.

Dados coletados automaticamente pelo SIMA (Sistema Integrado de Monitoração Ambiental), desenvolvido pelo INPE, que realiza a monitoração em tempo real de sistemas hidrológicos em um único ponto do reservatório, registrando informações durante longos períodos.

A aplicação permite integrar e apresentar ambos os tipos de dados, facilitando análises científicas, consultas interativas, visualização em gráficos, mapas e exportação de dados, contribuindo para a pesquisa ambiental e a gestão sustentável dos reservatórios.---

## ✨ Funcionalidades  
- 📊 Visualização de parâmetros armazenados com filtros por **instituição, reservatório e período de tempo**.  
- 📑 Consulta de dados em **tabelas dinâmicas**.  
- 📥 Exportação de dados em **formato CSV**.  
- 🗺️ Localização das coletas em **mapa interativo**.  
- 📈 Visualização de **séries temporais em gráficos** (dados SIMA).  

---

## 🛠️ Tecnologias Utilizadas  
- **Front-end:** React + TypeScript  
- **Back-end:** Node.js + TypeScript + Express  
- **Banco de Dados:** PostgreSQL  
- **Infraestrutura:** Docker + Docker Compose  
- **Visualização:** Gráficos interativos (Chart.js/Recharts) e mapas (Leaflet/Mapbox)  

---

## 📌 Requisitos  

### ✅ Requisitos Funcionais  
- RF01: Visualizar parâmetros armazenados com filtros por instituição, reservatório e período.  
- RF02: Consultar e visualizar dados em formato de tabelas.  
- RF03: Exportar dados em formato **CSV**.  
- RF04: Visualizar localização dos dados em **mapa interativo**.  
- RF05: Exibir dados de séries temporais em **gráficos interativos**.  

### ⚙️ Requisitos Não Funcionais  
- RNF01: Interface intuitiva, clara e fácil de usar, mesmo para usuários não técnicos.  
- RNF02: Desempenho otimizado, com carregamento rápido dos dados.  
- RNF03: Interface seguindo a identidade visual do **INPE** e padrões institucionais.  

---

## 📋 Product Backlog

O **Product Backlog** está listado abaixo de forma resumida.  
Para a versão **detalhada**, com todas as User Stories e critérios de aceite completos, acesse: [/docs/ProductBacklog.pdf](/docs/ProductBacklog.pdf)


| ID   | Épico                            | História (Resumo)                                      | Prioridade |
|------|----------------------------------|-------------------------------------------------------|------------|
| US01 | Prototipação & Design            | Prototipar interface no Figma                         | Alta       |
| US02 | Prototipação & Design            | Definir identidade visual e responsividade            | Alta       |
| US03 | Front-End                        | Estrutura inicial em React + TypeScript               | Alta       |
| US04 | Front-End                        | Tela de visualização de dados em tabela (RF02)        | Alta       |
| US05 | Front-End                        | Exportação de dados em CSV (RF03)                     | Média      |
| US06 | Front-End                        | Mapa interativo com pontos/polígonos (RF04)           | Alta       |
| US07 | Front-End                        | Gráficos de séries temporais (RF05)                   | Alta       |
| US08 | Front-End                        | Usabilidade e desempenho (RNF01, RNF02)               | Alta       |
| US09 | Front-End                        | Seção “Sobre os Dados” e tooltips                     | Média      |
| US10 | Back-End                         | Estrutura inicial do servidor Node.js + TypeScript    | Alta       |
| US11 | Back-End                         | Endpoints de leitura de entidades                     | Alta       |
| US12 | Back-End                         | Endpoint de exportação CSV                            | Média      |
| US13 | Back-End                         | Endpoint para séries temporais                        | Alta       |
| US14 | Deploy & Infraestrutura          | Containerização com Docker                            | Alta       |
| US15 | Servidor de Ingestão de Dados    | Conexão com PostgreSQL/PostGIS e modelagem de tabelas | Alta       |
| US16 | Servidor de Ingestão de Dados    | Upload e validação de arquivos CSV                    | Alta       |
| US17 | Servidor de Ingestão de Dados    | Validação e relatórios de inconsistências             | Alta       |
| US18 | Servidor de Ingestão de Dados    | Ingestão automática agendada                          | Alta       |

---
## 🚀 Sprint 1

### 🎯 Objetivo
Estruturar a base do projeto e iniciar a configuração do ambiente de desenvolvimento.

### 📅 Período
16/09/2025 a 06/10/2025

### 📋 Sprint Backlog

O **Sprint Backlog** abaixo mostra as histórias selecionadas para esta sprint.  

| ID   | História / Tarefa                                | Prioridade | Pontos | Status        | Critérios de Aceite (Resumo) |
|------|-------------------------------------------------|------------|--------|---------------|------------------------------|
| US01 | Prototipação no Figma                            | Alta       | 5      | Em andamento  | Protótipo aprovado pelo professor |
| US02 | Identidade visual e responsividade               | Alta       | 3      | A fazer       | Interface clara e responsiva |
| US03 | Estrutura inicial do Front-End (React + TS)     | Alta       | 3      | A fazer       | Projeto roda em localhost sem erros |
| US04 | Tabela interativa + filtros                      | Alta       | 8      | A fazer       | Dados exibidos corretamente; filtros funcionando |
| US08 | Usabilidade e performance                        | Alta       | 5      | A fazer       | Carregamento rápido; navegação intuitiva |
| US09 | Informação sobre os dados (seção + tooltips)    | Média      | 3      | A fazer       | Usuário entende origem e significado dos dados |
| US10 | Estrutura inicial do Back-End (Node.js + TS)    | Alta       | 3      | A fazer       | Servidor sobe com endpoint /health sem erros |
| US11 | Endpoints Read de Entidades                      | Alta       | 8      | A fazer       | Endpoints GET funcionando; dados inconsistentes tratados |
| US13 | Endpoint séries temporais                        | Alta       | 5      | A fazer       | JSON retornado corretamente; front-end não trava |


### 🔍 Sprint Review
- Data: 07/10/2025
- Formato:  vídeo
- Entrega:

### 🎲 Planning Poker  
## 🚀 Sprint Backlog – Sprint Atual (Resumo de Complexidade)

| ID   | História / Tarefa                                | Complexidade (Pontos) |
|------|-------------------------------------------------|----------------------|
| US01 | Prototipação no Figma                            | 5                    |
| US02 | Identidade visual e responsividade               | 3                    |
| US03 | Estrutura inicial do Front-End (React + TS)     | 3                    |
| US04 | Tabela interativa + filtros                      | 8                    |
| US08 | Usabilidade e performance                        | 5                    |
| US09 | Informação sobre os dados (seção + tooltips)    | 3                    |
| US10 | Estrutura inicial do Back-End (Node.js + TS)    | 3                    |
| US11 | Endpoints Read de Entidades                      | 8                    |
| US13 | Endpoint séries temporais                        | 5                    |



#### Complexidade total da Sprint: Alta
#### Quantidade de histórias planejadas: 9
#### Total de pontos: 43

### 📉 Gráfico Burndown
![Burndown Sprint 1](/docs/sprint-1/burndown.png)  

