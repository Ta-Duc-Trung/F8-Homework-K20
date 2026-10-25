const API_BASE = 'https://dummyjson.com';

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Yêu cầu thất bại (HTTP ${response.status})`);
  }
  return response.json();
}
function getSalePrice(price, discountPercentage) {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100;
}

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

function renderStars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function stockBadge(stock) {
  if (stock === 0) {
    return '<span class="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">Hết hàng</span>';
  }
  if (stock < 10) {
    return `<span class="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">Sắp hết: ${stock}</span>`;
  }
  return `<span class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">Còn ${stock}</span>`;
}

function loadingHTML(text) {
  return `
    <div class="flex items-center justify-center gap-3 py-16 text-slate-500">
      <span class="h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600"></span>
      ${escapeHTML(text)}
    </div>`;
}

function messageHTML(text, type = 'info') {
  const style =
    type === 'error'
      ? 'border-rose-200 bg-rose-50 text-rose-700'
      : 'border-dashed border-slate-300 bg-white text-slate-500';
  return `<div class="rounded-xl border p-8 text-center ${style}">${escapeHTML(text)}</div>`;
}