/**
 * feedback.js
 * funções simples para mostrar toasts e modals reutilizáveis
 */

export function showToast(message, type = 'info', timeout = 4000) {
  const containerId = 'toast-container';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toast.tabIndex = 0;
  container.appendChild(toast);

  // Entrada e saída suave
  requestAnimationFrame(() => toast.classList.add('visible'));

  const remover = () => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  };
  setTimeout(remover, timeout);

  // permitir fechar com click ou tecla
  toast.addEventListener('click', remover);
  toast.addEventListener('keydown', (e) => { if (e.key === 'Escape') remover(); });
  return toast;
}

export function showModal(title, contentHTML) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="${title}">
      <header class="modal-header"><h3>${title}</h3><button class="modal-close" aria-label="Fechar">×</button></header>
      <div class="modal-body">${contentHTML}</div>
    </div>
  `;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  return overlay;
}