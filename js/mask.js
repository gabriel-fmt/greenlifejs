export function maskPhone(inputOrEl) {
  const el = (typeof inputOrEl === 'string') ? document.querySelector(inputOrEl) : inputOrEl;
  if (!el) return;
  let v = el.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length <= 10) {
    v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim().replace(/-$/, '');
  } else {
    v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
  }
  el.value = v;
}