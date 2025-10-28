import { initRouter, navigateTo } from './spa.js';

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // fechar menu ao navegar
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('[data-link]');
    if (!a) return;
    // fechar se estiver aberto
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initMenu();

  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('[data-link]');
    if (!a) return;
    e.preventDefault();
    const route = a.getAttribute('data-link');
    navigateTo(route);
  });

  const route = location.hash.replace('#', '') || 'home';
  history.replaceState({ route }, '', `#${route}`);
});