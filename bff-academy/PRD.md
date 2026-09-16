# Product Requirements Document (PRD) — BFF Academy
**Plataforma Gamificada de Ensino de Inglês com IA**

* **Cliente:** BFF Academy
* **Produto:** BFF Academy — Plataforma de Ensino
* **Data:** 10 de agosto de 2026 (Atualizado)
* **Preparado por:** Dizevolv Tech
* **Resumo:** Documento de requisitos elaborado para o projeto de refatoração completa da plataforma BFF Academy. Contempla contexto, escopo, funcionalidades, user stories, integrações e requisitos não funcionais para a reconstrução do produto em um ecossistema robusto (Next.js, Vercel e Supabase).

---

## 1. Contexto e Visão
O BFF Academy é uma plataforma gamificada de ensino de inglês focada em conversação, com suporte de inteligência artificial para prática de fala e tira-dúvidas gramaticais. 

* **Problema atual:** O MVP foi construído em plataforma low-code (Base44) e apresenta interface datada, problemas de responsividade em tablets (quebra de layout no iPad) e custo elevado de tokens de IA.
* **Solução:** A Dizevolv assume a refatoração completa da plataforma do zero, sobre um ecossistema robusto (Next.js, Vercel e Supabase), transformando o produto em um Web App (WebView) publicado nas lojas oficiais (App Store e Play Store) — evitando os splits de taxas de 15% a 30% cobrados por soluções nativas tradicionais.

---

## 2. Público-Alvo

| Perfil | Descrição |
| :--- | :--- |
| **Aluno** | Usuário final da plataforma: consome aulas em vídeo, materiais em PDF nativos e realiza dinâmicas interativas de conversação (Speaking/Drilling) validadas por IA. |
| **Professor** | Gestão de disponibilidade de horários, aceite de novos alunos, preenchimento do diário de classe e controle de reposições de aula. |
| **Manager / Admin** | Gestão global da operação: relatórios financeiros, acompanhamento de turmas, suporte técnico e visão consolidada de professores e alunos. |

---

## 3. Objetivos de Negócio e KPIs
* Migração segura da base atual de alunos e dos 5 níveis de ensino.
* Consumo de IA limitado a ~R$ 550,00/mês via APIs externas.
* Interface moderna e gamificada, com efeitos sonoros e visuais.
* WebView nas lojas, sem splits de 15%–30% sobre receita.

---

## 4. Escopo e Funcionalidades

### 4.1 Multi-tenancy e Autenticação
* Login único (*single sign-on*) que direciona a visão do usuário com base na sua Role (*Manager*, *Professor* ou *Aluno*).
* Estrutura preparada para múltiplos perfis dentro da mesma base, com permissões segregadas por função.

### 4.2 Aulas em Vídeo
* Acesso às aulas via Google Meet, embutido através de Iframe/Pop-up nativo, mantendo o aluno dentro do app.
* Sem redirecionamento para aplicativos externos, preservando a experiência e a retenção do usuário.

### 4.3 Visualizador de Materiais
* Abertura de PDFs integrada diretamente ao Web App, sem redirecionar para navegadores externos.

### 4.4 Gestão de Presença e Reposições
* **Regra de negócio estrita:** cancelamentos com mais de 5 horas de antecedência geram saldo de reposição para o aluno.
* O saldo de reposição deve ser posteriormente marcado como “pago/realizado” no diário de classe pelo professor.

### 4.5 Motor de Inteligência Artificial
* **Speaking/Drilling:** gravação de voz no front-end, com envio para transcrição e validação gramatical e de pronúncia em tempo real via IA.
* **Chat Bot:** assistente para dúvidas gramaticais pontuais e contextualizadas, disponível a qualquer momento da jornada do aluno.

### 4.6 Integrações de API
* **Supabase:** Banco de dados relacional (PostgreSQL) e autenticação da plataforma.
* **Stripe:** Pagamentos recorrentes, gestão de assinaturas e *webhooks* automatizados.
* **OpenAI / Anthropic (Claude):** Processamento das ferramentas de IA: validação de *Drilling* e *Chat Bot* de dúvidas gramaticais.

### 4.7 Avaliação e Mudança de Nível (Desafio Flex)
O sistema de avaliação para transição de níveis (ex: Flex 1 para Flex 2) adota o modelo de "Checkpoint Gamificado", eliminando a burocracia de correção manual pelo professor. 
* **Regras de Desbloqueio (O Gatilho):** O Desafio Flex só é liberado quando o aluno atinge **100% de conclusão** nas lições regulares do nível atual. A etapa final fica visível no fim da trilha (como um cadeado ou troféu) e recebe uma animação de destaque assim que o aluno cumpre o requisito.
* **Formato da Avaliação (Hard Mode):** 10 a 15 etapas sequenciais (mesclando desafios de *Listening*, *Speaking*, Leitura e Gramática). A função de ajuda da IA e traduções automáticas ficam **completamente desativadas**. O aluno inicia a prova com uma barra isolada de **3 Corações**. Cada erro desconta 1 Coração. O 3º erro encerra a prova imediatamente.
* **Recompensas (Sucesso):** Se o aluno concluir com pelo menos 1 Coração restante, visualiza uma tela de conquista exclusiva, o próximo nível é desbloqueado no banco de dados instantaneamente, ganha um bônus massivo de XP, e o Certificado de Conclusão (PDF) é gerado automaticamente.
* **Fluxo de Reprovação e Recuperação (Prevenção de Churn):** O aluno **não** precisa refazer lições passadas. O botão do "Desafio Flex" é bloqueado e, para habilitar uma nova tentativa, o aluno é direcionado à **Clínica de Revisão**, onde o sistema gera 2 atividades focadas estritamente nas regras que ele errou no teste. Concluindo essa revisão, a prova é liberada novamente.

### 4.8 Clínica de Revisão (Zona Segura e Scaffolding)
A "Clínica de Revisão" é o ambiente onde o aluno fixa o conteúdo que errou anteriormente, seja para recuperar Energia (⚡) ou para desbloquear uma nova tentativa do Desafio Flex. 

* **Regra da Zona Segura (Safe Zone):** É estritamente proibido descontar vidas (Corações ou Energia) do aluno dentro da Clínica de Revisão. O foco aqui é aprendizado sem punição, evitando o "loop de falha" e o cancelamento da assinatura.
* **Feedback Progressivo (IA Scaffolding):** Em caso de erros consecutivos na mesma questão durante a revisão, a IA deve atuar com suporte gradual:
  * **1º Erro (Dica Leve):** A IA fornece um lembrete contextual sem dar a resposta direta (ex: *"Lembre-se de que estamos falando no passado"*).
  * **2º Erro (Explicação Direta):** A IA explica a regra gramatical de forma clara e objetiva.
  * **3º Erro (Trava de Segurança e Repetição):** A IA fornece a resposta correta, mas exige que o aluno digite/fale a frase perfeitamente para criar memória muscular antes de avançar para a próxima tela.

---

## 5. User Stories

| Como... | Quero... | Para quê... |
| :--- | :--- | :--- |
| **Aluno** | Marcar minha aula diretamente pelo app | Eu organize meus estudos sem depender de contato manual com a secretaria. |
| **Aluno** | Usar o *Drilling* de conversação com validação por IA | Eu pratique pronúncia e gramática em tempo real, mesmo fora do horário de aula. |
| **Aluno** | Realizar o "Desafio Flex" de forma gamificada ao fim de um nível | Eu comprove minha proficiência e ganhe meu certificado automaticamente para avançar ao próximo módulo. |
| **Aluno** | Cancelar uma aula com mais de 5h de antecedência | Eu receba o saldo de reposição automaticamente, sem burocracia. |
| **Professor** | Visualizar e gerenciar minha disponibilidade de horários | Os alunos só consigam agendar aulas em horários que eu realmente possa atender. |
| **Professor** | Aceitar ou recusar a entrada de novos alunos | Eu tenha controle sobre minha carga de trabalho e adequação de nível. |
| **Professor** | Preencher o diário de classe após cada aula | O histórico pedagógico do aluno fique registrado e as reposições sejam corretamente contabilizadas. |
| **Manager** | Acompanhar um painel consolidado de alunos, professores e financeiro | Eu tome decisões de negócio com dados centralizados e atualizados. |

---

## 6. Requisitos Não Funcionais
* **Isolamento (RLS):** *Row Level Security* total no Supabase: um aluno nunca pode acessar dados de outro aluno.
* **Segurança & Privacidade (LGPD):** 
  * Consentimento obrigatório (*opt-in*) para gravação de áudio do usuário.
  * Contratos com fornecedores de IA devem garantir que os dados dos alunos não sejam usados para treinar modelos abertos.
* **UI/UX:** Design obrigatoriamente responsivo e *Mobile-first*. Abordagem *Code-first*, sem prototipação inicial em Figma, utilizando `shadcn/ui` e `v0.dev` para aceleração.
* **Performance:** Carregamento fluido de vídeo-aulas e materiais em PDF, com foco em baixa latência mesmo em conexões móveis.
* **Custo de Infraestrutura de IA:** Consumo mensal de APIs externas de IA limitado a aproximadamente R$ 550,00, com monitoramento de uso.

---

## 7. Fluxo do Usuário Principal
1. Aluno acessa o app e realiza login único, sendo direcionado à sua visão conforme a Role.
2. Visualiza sua agenda e marca uma aula com o professor disponível.
3. Recebe lembrete e acessa a aula em vídeo via Google Meet embutido (Iframe/Pop-up), sem sair do app.
4. Abre materiais em PDF nativamente dentro da plataforma para acompanhar o conteúdo da aula.
5. Após a aula, o professor preenche o diário de classe, registrando presença e observações pedagógicas.
6. Fora do horário de aula, o aluno pratica conversação no módulo de *Speaking/Drilling*, com validação de pronúncia e gramática por IA.
7. Ao concluir 100% da trilha de um nível, o aluno acessa o Desafio Flex, passa na prova automatizada e desbloqueia o nível seguinte junto com seu certificado.
8. Em caso de dúvida pontual, o aluno consulta o *Chat Bot* gramatical a qualquer momento.
9. Se necessário, o aluno cancela uma aula com mais de 5h de antecedência e recebe saldo de reposição, posteriormente confirmado como realizado pelo professor.

---

## 8. Observações Técnicas
* O cronograma é de “resgate”, com duração de 3 a 4 semanas, fatiado em entregas semanais ao cliente para conter ansiedade e permitir validação contínua do progresso.
* O aplicativo exigirá CNAE adequado (6202-3-00) e *D-U-N-S Number* da empresa do cliente para evitar bloqueios nas lojas, principalmente na Apple Store.
* O projeto deve pular a prototipação clássica; a criação da UI se dará diretamente via templates e IAs geradoras de front-end (`v0.dev`).
* Migração de dados da base atual (Base44) deve ser auditada previamente para garantir integridade dos 5 níveis de ensino já cadastrados.