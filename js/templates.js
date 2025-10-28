
import { setupCadastroHandlers } from './validation.js';

/**
 * Cria um elemento DOM a partir de uma string HTML.
 */
function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstElementChild;
}

/**
 * Render simples de template com placeholders ${key}
 */
function renderTemplate(template, data = {}) {
  return template.replace(/\$\{(\w+)\}/g, (_, k) => (data[k] != null ? data[k] : ''));
}

export async function getTemplate(name, data) {
  switch (name) {
    case 'projetos':
      return projetosTemplate(data);
    case 'cadastro':
      return cadastroTemplate(data);
    case 'home':
    default:
      return homeTemplate(data);
  }
}

/* --- Templates básicos (podem ser substituídos por fetch de arquivos externos) --- */

function homeTemplate() {
  const html = `
  <section aria-labelledby="home-title" class="home">
    <h2 id="home-title">Bem-vindo à GreenLife</h2>
    <p>Somos uma organização dedicada à preservação ambiental e ao engajamento comunitário.</p>
    <div class="home-cards">
      <article class="card" role="article" aria-label="Projetos em destaque">
        <h3>Reflorestamento</h3>
        <p>Projeto de plantio em áreas degradadas.</p>
        <a href="#projetos" data-link="projetos" class="btn">Ver projetos</a>
      </article>
      <article class="card" role="article" aria-label="Voluntariado">
        <h3>Voluntariado</h3>
        <p>Participe como voluntário em ações locais.</p>
        <a href="#cadastro" data-link="cadastro" class="btn">Inscreva-se</a>
      </article>
    </div>
  </section>
  `;
  return createElementFromHTML(html);
}

function projetosTemplate() {
  // Exemplo de projetos; em app real estes virão de uma API
  const projects = [
    { title: 'Reflorestamento Comunitário', excerpt: 'Plantio com escolas locais', img: 'img/reflorestada.png' },
    { title: 'Reciclagem Urbana', excerpt: 'Coleta seletiva e oficinas', img: 'img/reciclagem.jpg' },
    { title: 'Educação Ambiental', excerpt: 'Palestras e material educativo', img: 'img/voluntarios.jpg' }
  ];

  const cards = projects.map(p => `
    <article class="card project-card" role="article">
      <img src="${p.img}" alt="${p.title}" loading="lazy" width="400" height="250" />
      <div class="card-body">
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
      </div>
    </article>
  `).join('');

  const html = `
  <section aria-labelledby="projetos-title" class="projetos">
    <h2 id="projetos-title">Projetos Sociais</h2>
    <div class="projects-grid">
      ${cards}
    </div>
  </section>
  `;
  return createElementFromHTML(html);
}

function cadastroTemplate() {
  const html = `
  <section aria-labelledby="cadastro-title" class="cadastro">
    <h2 id="cadastro-title">Cadastro de Voluntário / Doações</h2>
    <form id="cadastroForm" novalidate>
      <fieldset>
        <legend>Dados Pessoais</legend>
        <label for="nome">Nome Completo
          <input id="nome" name="nome" type="text" required minlength="3" />
          <div class="field-error" data-for="nome" aria-live="polite"></div>
        </label>

        <label for="email">E-mail
          <input id="email" name="email" type="email" required />
          <div class="field-error" data-for="email" aria-live="polite"></div>
        </label>

        <label for="cpf">CPF
          <input id="cpf" name="cpf" type="text" inputmode="numeric" minlength="11" maxlength="14" required />
          <div class="field-error" data-for="cpf" aria-live="polite"></div>
        </label>

        <label for="telefone">Telefone
          <input id="telefone" name="telefone" type="tel" required />
          <div class="field-error" data-for="telefone" aria-live="polite"></div>
        </label>

        <label for="nascimento">Data de Nascimento
          <input id="nascimento" name="nascimento" type="date" required />
          <div class="field-error" data-for="nascimento" aria-live="polite"></div>
        </label>
      </fieldset>

      <fieldset>
        <legend>Endereço</legend>
        <label for="cep">CEP
          <input id="cep" name="cep" type="text" required />
          <div class="field-error" data-for="cep" aria-live="polite"></div>
        </label>

        <label for="cidade">Cidade
          <input id="cidade" name="cidade" type="text" required />
          <div class="field-error" data-for="cidade" aria-live="polite"></div>
        </label>

        <label for="estado">Estado
          <input id="estado" name="estado" type="text" required />
          <div class="field-error" data-for="estado" aria-live="polite"></div>
        </label>
      </fieldset>

      <label for="mensagem">Mensagem
        <textarea id="mensagem" name="mensagem" rows="4"></textarea>
      </label>

      <div class="form-actions">
        <button type="submit" class="btn primary">Enviar</button>
      </div>

      <div id="formFeedback" aria-live="polite"></div>
    </form>
  </section>
  `;

  const node = createElementFromHTML(html);
  // aguarda próximo ciclo para configurar handlers (garante que o elemento exista no DOM)
  setTimeout(() => setupCadastroHandlers(node), 0);
  return node;
}
