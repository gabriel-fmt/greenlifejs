🌱 GreenLifeJS

Projeto desenvolvido para o trabalho da faculdade, com foco em HTML5 semântico, CSS3 avançado, design system, responsividade e JavaScript modular com SPA (Single Page Application).
Esta entrega implementa a terceira etapa do projeto — interatividade e manipulação de DOM — conforme os requisitos da disciplina.

🎯 Objetivos da Etapa

Transformar o site estático em uma aplicação web dinâmica (SPA).

Implementar templates JavaScript e carregamento dinâmico de páginas.

Adicionar validação visual e funcional de formulários.

Criar componentes de feedback interativo (toasts e modais).

Garantir organização modular do código e estrutura de pastas limpa.

📂 Estrutura de Pastas
greenlifejs/
│
├── index.html              # Ponto de entrada da SPA
│
├── css/
│   ├── style.css           # Estilos principais + design system + toasts/modais
│
├── js/
│   ├── spa.js              # Lógica principal da SPA (carregamento dinâmico)
│   ├── main.js             # Inicialização geral e menu hambúrguer
│   ├── validation.js       # Validação visual e funcional dos formulários
│   ├── feedback.js         # Sistema de toasts e modais
│
├── img/                    # Imagens otimizadas
│
└── README.md               # Documentação do projeto

🧱 Tecnologias Utilizadas

HTML5 semântico

CSS3 avançado com Flexbox, Grid e Design System

JavaScript modular (ES Modules)

Single Page Application (SPA) sem frameworks

Acessibilidade (WCAG 2.1) e responsividade Mobile-First

🖥️ Funcionalidades Implementadas
🔹 Single Page Application (SPA)

O site carrega todas as páginas (Home, Projetos, Cadastro) dentro de um único arquivo index.html.

O JavaScript gerencia o conteúdo dinâmico sem recarregar a página.

Sistema de templates em JS: os componentes HTML são armazenados em strings e injetados no DOM conforme o link clicado.

🔹 Menu Hambúrguer Responsivo

Implementado com JavaScript (main.js) e CSS.

Exibe um botão de menu para telas pequenas que abre/fecha o nav.

Usa aria-expanded e fecha com tecla ESC (acessível).

🔹 Validação Visual de Formulários

Campos com erro exibem borda vermelha e fundo rosado.

Campos válidos mostram borda verde.

Mensagens de erro são exibidas abaixo de cada campo.

Toasts de feedback aparecem no canto da tela informando sucesso ou erro.

🔹 Sistema de Feedback (Toasts e Modais)

Toasts: pequenas notificações que somem automaticamente.

Modais: janelas de aviso interativas com botão de fechamento.

Implementados em js/feedback.js, reutilizáveis em qualquer parte do projeto.

🔹 Design System

Variáveis de cores, espaçamento e tipografia em style.css.

Sistema modular baseado em múltiplos de 8px (8, 16, 24, 32, 48, 64).

Paleta de cores primárias, secundárias e neutras.

📱 Responsividade

O projeto segue o princípio mobile-first, com breakpoints definidos para:

≤ 480px: layout mobile (menu hambúrguer ativo)

481–768px: tablets

769–1024px: laptops

≥ 1025px: desktops

⚙️ Como Executar o Projeto

Baixe o projeto ou clone o repositório:

git clone https://github.com/seuusuario/greenlifejs.git


Abra a pasta:

cd greenlifejs


Execute localmente abrindo o arquivo index.html no navegador.

Dica: use a extensão Live Server (VS Code) para testar melhor o SPA.

🧩 JavaScript Modular

Cada arquivo .js tem uma responsabilidade clara:

Arquivo	Função Principal
spa.js	Controla a navegação dinâmica e o carregamento de conteúdo
main.js	Inicializa o site e controla o menu responsivo
validation.js	Faz validação dos formulários e aplica classes visuais
feedback.js	Cria e gerencia toasts e modais reutilizáveis
✅ Requisitos Atendidos
Requisito	Implementado
SPA básica com templates JS	✅
Validação visual e funcional	✅
Feedback ao usuário (toasts/modals)	✅
Menu hambúrguer responsivo	✅
Código JS modular	✅
Estrutura organizada (HTML/CSS/JS)	✅
Responsividade e acessibilidade	✅
🧾 Autor

Nome: Gabriel Ferreira de Matos
Disciplina: Desenvolvimento Web — Projeto Prático
Entrega: Etapa 3 — JavaScript, SPA e Templates
Professor: (adicione o nome do professor, se necessário)

💡 Observação

Este projeto é uma simulação acadêmica de uma aplicação real, integrando boas práticas de desenvolvimento web: semântica, acessibilidade, modularização e interatividade.