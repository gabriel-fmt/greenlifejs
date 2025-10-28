
// SPA melhorado: suporta history API, carregamento assíncrono de templates e render com acessibilidade.
import { getTemplate } from './templates.js';

const appSelector = '#app';

function appEl() {
  return document.querySelector(appSelector);
}

export async function navigateTo(route, opts = { replace: false }) {
  const content = await getTemplate(route);
  render(content);

  const url = '#' + route;
  if (opts.replace) history.replaceState({ route }, '', url);
  else history.pushState({ route }, '', url);
}

export function render(content) {
  const el = appEl();
  if (!el) return;
  if (typeof content === 'string') el.innerHTML = content;
  else {
    el.innerHTML = '';
    el.appendChild(content);
  }
  // after render, focus main for better accessibility
  el.setAttribute('tabindex', '-1');
  el.focus();
}

export function initRouter() {
  // inicializa rota atual
  const initial = (location.hash && location.hash.replace('#', '')) || 'home';
  navigateTo(initial, { replace: true });

  // volta/avança do navegador
  window.addEventListener('popstate', (e) => {
    const route = (e.state && e.state.route) || (location.hash && location.hash.replace('#', '')) || 'home';
    navigateTo(route, { replace: true });
  });

  // delegação de clicks em links com data-link
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('[data-link]');
    if (!a) return;
    e.preventDefault();
    const route = a.getAttribute('data-link');
    if (route) navigateTo(route);
  });
}
