# Product Requirements Document (PRD) — BFF Academy
**Plataforma Gamificada de Ensino de Inglês com IA**

* **Cliente:** BFF Academy[cite: 1]
* **Produto:** BFF Academy — Plataforma de Ensino[cite: 1]
* **Data:** 10 de agosto de 2026[cite: 1]
* **Preparado por:** Dizevolv Tech[cite: 1]
* **Resumo:** Documento de requisitos elaborado para o projeto de refatoração completa da plataforma BFF Academy. Contempla contexto, escopo, funcionalidades, user stories, integrações e requisitos não funcionais para a reconstrução do produto em um ecossistema robusto (Next.js, Vercel e Supabase)[cite: 1].

---

## 1. Contexto e Visão
O BFF Academy é uma plataforma gamificada de ensino de inglês focada em conversação, com suporte de inteligência artificial para prática de fala e tira-dúvidas gramaticais[cite: 1]. 

* **Problema atual:** O MVP foi construído em plataforma low-code (Base44) e apresenta interface datada, problemas de responsividade em tablets (quebra de layout no iPad) e custo elevado de tokens de IA[cite: 1].
* **Solução:** A Dizevolv assume a refatoração completa da plataforma do zero, sobre um ecossistema robusto (Next.js, Vercel e Supabase), transformando o produto em um Web App (WebView) publicado nas lojas oficiais (App Store e Play Store) — evitando os splits de taxas de 15% a 30% cobrados por soluções nativas tradicionais[cite: 1].

---

## 2. Público-Alvo

| Perfil | Descrição |
| :--- | :--- |
| **Aluno** | Usuário final da plataforma: consome aulas em vídeo, materiais em PDF nativos e realiza dinâmicas interativas de conversação (Speaking/Drilling) validadas por IA[cite: 1]. |
| **Professor** | Gestão de disponibilidade de horários, aceite de novos alunos, preenchimento do diário de classe e controle de reposições de aula[cite: 1]. |
| **Manager / Admin** | Gestão global da operação: relatórios financeiros, acompanhamento de turmas, suporte técnico e visão consolidada de professores e alunos[cite: 1]. |

---

## 3. Objetivos de Negócio e KPIs
* Migração segura da base atual de alunos e dos 5 níveis de ensino[cite: 1].
* Consumo de IA limitado a ~R$ 550,00/mês via APIs externas[cite: 1].
* Interface moderna e gamificada, com efeitos sonoros e visuais[cite: 1].
* WebView nas lojas, sem splits de 15%–30% sobre receita[cite: 1].

---

## 4. Escopo e Funcionalidades

### 4.1 Multi-tenancy e Autenticação
* Login único (*single sign-on*) que direciona a visão do usuário com base na sua Role (*Manager*, *Professor* ou *Aluno*)[cite: 1].
* Estrutura preparada para múltiplos perfis dentro da mesma base, com permissões segregadas por função[cite: 1].

### 4.2 Aulas em Vídeo
* Acesso às aulas via Google Meet, embutido através de Iframe/Pop-up nativo, mantendo o aluno dentro do app[cite: 1].
* Sem redirecionamento para aplicativos externos, preservando a experiência e a retenção do usuário[cite: 1].

### 4.3 Visualizador de Materiais
* Abertura de PDFs integrada diretamente ao Web App, sem redirecionar para navegadores externos[cite: 1].

### 4.4 Gestão de Presença e Reposições
* **Regra de negócio estrita:** cancelamentos com mais de 5 horas de antecedência geram saldo de reposição para o aluno[cite: 1].
* O saldo de reposição deve ser posteriormente marcado como “pago/realizado” no diário de classe pelo professor[cite: 1].

### 4.5 Motor de Inteligência Artificial
* **Speaking/Drilling:** gravação de voz no front-end, com envio para transcrição e validação gramatical e de pronúncia em tempo real via IA[cite: 1].
* **Chat Bot:** assistente para dúvidas gramaticais pontuais e contextualizadas, disponível a qualquer momento da jornada do aluno[cite: 1].

### 4.6 Integrações de API
* **Supabase:** Banco de dados relacional (PostgreSQL) e autenticação da plataforma[cite: 1].
* **Stripe:** Pagamentos recorrentes, gestão de assinaturas e *webhooks* automatizados[cite: 1].
* **OpenAI / Anthropic (Claude):** Processamento das ferramentas de IA: validação de *Drilling* e *Chat Bot* de dúvidas gramaticais[cite: 1].

---

## 5. User Stories

| Como... | Quero... | Para quê... |
| :--- | :--- | :--- |
| **Aluno** | Marcar minha aula diretamente pelo app | Eu organize meus estudos sem depender de contato manual com a secretaria[cite: 1] |
| **Aluno** | Usar o *Drilling* de conversação com validação por IA | Eu pratique pronúncia e gramática em tempo real, mesmo fora do horário de aula[cite: 1] |
| **Aluno** | Cancelar uma aula com mais de 5h de antecedência | Eu receba o saldo de reposição automaticamente, sem burocracia[cite: 1] |
| **Professor** | Visualizar e gerenciar minha disponibilidade de horários | Os alunos só consigam agendar aulas em horários que eu realmente possa atender[cite: 1] |
| **Professor** | Aceitar ou recusar a entrada de novos alunos | Eu tenha controle sobre minha carga de trabalho e adequação de nível[cite: 1] |
| **Professor** | Preencher o diário de classe após cada aula | O histórico pedagógico do aluno fique registrado e as reposições sejam corretamente contabilizadas[cite: 1] |
| **Manager** | Acompanhar um painel consolidado de alunos, professores e financeiro | Eu tome decisões de negócio com dados centralizados e atualizados[cite: 1] |

---

## 6. Requisitos Não Funcionais
* **Isolamento (RLS):** *Row Level Security* total no Supabase: um aluno nunca pode acessar dados de outro aluno[cite: 1].
* **Segurança & Privacidade (LGPD):** 
  * Consentimento obrigatório (*opt-in*) para gravação de áudio do usuário[cite: 1].
  * Contratos com fornecedores de IA devem garantir que os dados dos alunos não sejam usados para treinar modelos abertos[cite: 1].
* **UI/UX:** Design obrigatoriamente responsivo e *Mobile-first*. Abordagem *Code-first*, sem prototipação inicial em Figma, utilizando `shadcn/ui` e `v0.dev` para aceleração[cite: 1].
* **Performance:** Carregamento fluido de vídeo-aulas e materiais em PDF, com foco em baixa latência mesmo em conexões móveis[cite: 1].
* **Custo de Infraestrutura de IA:** Consumo mensal de APIs externas de IA limitado a aproximadamente R$ 550,00, com monitoramento de uso[cite: 1].

---

## 7. Fluxo do Usuário Principal
1. Aluno acessa o app e realiza login único, sendo direcionado à sua visão conforme a Role[cite: 1].
2. Visualiza sua agenda e marca uma aula com o professor disponível[cite: 1].
3. Recebe lembrete e acessa a aula em vídeo via Google Meet embutido (Iframe/Pop-up), sem sair do app[cite: 1].
4. Abre materiais em PDF nativamente dentro da plataforma para acompanhar o conteúdo da aula[cite: 1].
5. Após a aula, o professor preenche o diário de classe, registrando presença e observações pedagógicas[cite: 1].
6. Fora do horário de aula, o aluno pratica conversação no módulo de *Speaking/Drilling*, com validação de pronúncia e gramática por IA[cite: 1].
7. Em caso de dúvida pontual, o aluno consulta o *Chat Bot* gramatical a qualquer momento[cite: 1].
8. Se necessário, o aluno cancela uma aula com mais de 5h de antecedência e recebe saldo de reposição, posteriormente confirmado como realizado pelo professor[cite: 1].

---

## 8. Observações Técnicas
* O cronograma é de “resgate”, com duração de 3 a 4 semanas, fatiado em entregas semanais ao cliente para conter ansiedade e permitir validação contínua do progresso[cite: 1].
* O aplicativo exigirá CNAE adequado (6202-3-00) e *D-U-N-S Number* da empresa do cliente para evitar bloqueios nas lojas, principalmente na Apple Store[cite: 1].
* O projeto deve pular a prototipação clássica; a criação da UI se dará diretamente via templates e IAs geradoras de front-end (`v0.dev`)[cite: 1].
* Migração de dados da base atual (Base44) deve ser auditada previamente para garantir integridade dos 5 níveis de ensino já cadastrados[cite: 1].