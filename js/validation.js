import { maskPhone } from './mask.js';
import { showToast } from './feedback.js';

/**
 * Mostra mensagem de erro ao lado do campo
 */
function setFieldError(form, fieldName, message) {
  const el = form.querySelector(`[data-for="${fieldName}"]`);
  const input = form.querySelector(`#${fieldName}`);
  if (el) {
    el.textContent = message;
    el.classList.add('visible');
  }
  if (input) {
    input.classList.add('error');
    input.classList.remove('success');
    input.setAttribute('aria-invalid', 'true');
  }
}

/**
 * Limpa erros do formulário
 */
function clearFieldErrors(form) {
  const errors = form.querySelectorAll('.field-error');
  errors.forEach(e => { e.textContent = ''; e.classList.remove('visible'); });
  const feedback = form.querySelector('#formFeedback');
  if (feedback) { feedback.textContent = ''; feedback.className = ''; }
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(i => { i.classList.remove('error'); i.classList.remove('success'); i.removeAttribute('aria-invalid'); });
}

function showFormFeedback(form, text, type='error') {
  const fb = form.querySelector('#formFeedback');
  if (!fb) return;
  fb.textContent = text;
  fb.className = `feedback ${type}`;
  // também exibir um toast para destaque
  if (type === 'success') showToast(text, 'success');
  else if (type === 'error') showToast(text, 'error');
}

/**
 * Validação básica e mensagens inline. Retorna true se válido.
 */
export function setupCadastroHandlers(rootNode) {
  const form = (rootNode && rootNode.querySelector('#cadastroForm')) || document.querySelector('#cadastroForm');
  if (!form) return;

  // máscaras
  const telefone = form.querySelector('#telefone');
  const cpf = form.querySelector('#cpf');
  const cep = form.querySelector('#cep');

  if (telefone) telefone.addEventListener('input', () => maskPhone(telefone));
  if (cpf) cpf.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4').replace(/\.$/, '').replace(/-$/, '');
    e.target.value = v;
  });
  if (cep) cep.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 8) v = v.slice(0,8);
    v = v.replace(/(\d{5})(\d{0,3})/, '$1-$2').replace(/-$/, '');
    e.target.value = v;
  });

  // validação ao perder foco (melhora uso)
  form.querySelectorAll('input[required], textarea, select').forEach(input => {
    input.addEventListener('blur', () => {
      // trigger basic validation: HTML5 validity and custom checks
      if (!input.checkValidity()) {
        input.classList.add('error');
        input.classList.remove('success');
      } else {
        input.classList.remove('error');
        input.classList.add('success');
      }
    });
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    clearFieldErrors(form);

    // validações customizadas
    const nome = form.querySelector('#nome');
    const email = form.querySelector('#email');
    const nascimento = form.querySelector('#nascimento');

    let valid = true;

    if (!nome.value.trim() || nome.value.trim().length < 3) {
      setFieldError(form, 'nome', 'Informe o nome completo (mínimo 3 caracteres).');
      valid = false;
    }

    if (!email.checkValidity()) {
      setFieldError(form, 'email', 'E-mail inválido.');
      valid = false;
    }

    if (!form.querySelector('#cpf').value.replace(/\D/g, '').match(/^\d{11}$/)) {
      setFieldError(form, 'cpf', 'CPF incompleto.');
      valid = false;
    }

    if (!form.querySelector('#telefone').value.replace(/\D/g, '').match(/^(\d{10}|\d{11})$/)) {
      setFieldError(form, 'telefone', 'Telefone inválido.');
      valid = false;
    }

    if (!nascimento.value) {
      setFieldError(form, 'nascimento', 'Informe a data de nascimento.');
      valid = false;
    }

    if (!form.querySelector('#cep').value.replace(/\D/g, '').match(/^\d{8}$/)) {
      setFieldError(form, 'cep', 'CEP inválido.');
      valid = false;
    }

    if (!form.querySelector('#cidade').value.trim()) {
      setFieldError(form, 'cidade', 'Informe a cidade.');
      valid = false;
    }

    if (!form.querySelector('#estado').value.trim()) {
      setFieldError(form, 'estado', 'Informe o estado.');
      valid = false;
    }

    if (!valid) {
      showFormFeedback(form, 'Por favor, corrija os erros destacados.', 'error');
      return;
    }

    // salvar dados localmente como exemplo
    const data = {
      nome: nome.value.trim(),
      email: email.value.trim(),
      cpf: form.querySelector('#cpf').value.trim(),
      telefone: form.querySelector('#telefone').value.trim(),
      nascimento: form.querySelector('#nascimento').value,
      cep: form.querySelector('#cep').value.trim(),
      cidade: form.querySelector('#cidade').value.trim(),
      estado: form.querySelector('#estado').value.trim(),
      mensagem: form.querySelector('#mensagem').value.trim(),
      createdAt: new Date().toISOString()
    };

    const stored = JSON.parse(localStorage.getItem('greenlife:cadastros') || '[]');
    stored.push(data);
    localStorage.setItem('greenlife:cadastros', JSON.stringify(stored));

    showFormFeedback(form, 'Cadastro enviado com sucesso!', 'success');
    form.reset();
    return true;
  });
}