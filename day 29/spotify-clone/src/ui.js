
export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function pickList(data, key) {
  if (Array.isArray(data)) return data;
  const candidates = [data?.[key], data?.data, data?.items, data?.results, data?.data?.[key]];
  return candidates.find(Array.isArray) || [];
}

export function pick(obj, keys) {
  for (const k of keys) {
    const v = k.split(".").reduce((o, part) => o?.[part], obj);
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return null;
}

export const getImage = (item) =>
  pick(item, [
    "image_url", "cover_image_url", "avatar_url", "image", "cover_url",
    "thumbnail_url", "thumbnail", "cover", "images.0.url", "album.cover_image_url",
  ]);

export const getTitle = (item) => pick(item, ["name", "title", "display_name", "username"]) || "Không có tên";

export function formatDuration(value) {
  if (!value) return "";
  let seconds = Number(value);
  if (seconds > 10000) seconds = Math.round(seconds / 1000);
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function formatNumber(n) {
  return Number(n).toLocaleString("vi-VN");
}

export function formatDate(value) {
  const d = new Date(value);
  return isNaN(d) ? value : d.toLocaleDateString("vi-VN");
}

export const loadingHtml = (text = "Đang tải...") => `
  <div class="flex items-center gap-3 py-8 text-neutral-400">
    <span class="h-5 w-5 animate-spin rounded-full border-2 border-neutral-600 border-t-green-500"></span>
    ${escapeHtml(text)}
  </div>`;

export const errorHtml = (text) => `
  <div class="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
    ${escapeHtml(text)}
  </div>`;

export const emptyHtml = (text) => `<p class="py-6 text-neutral-500">${escapeHtml(text)}</p>`;

export function showToast(message, type = "info") {
  const colors = {
    info: "bg-neutral-800 text-white",
    error: "bg-red-600 text-white",
    success: "bg-green-600 text-black",
  };
  const el = document.createElement("div");
  el.className = `fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-3 text-sm font-medium shadow-xl ${colors[type]}`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

export function setButtonLoading(button, loading, loadingText = "Đang xử lý...") {
  if (loading) {
    button.dataset.text = button.textContent;
    button.disabled = true;
    button.innerHTML = `<span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black align-middle"></span> <span class="align-middle">${loadingText}</span>`;
  } else {
    button.disabled = false;
    button.textContent = button.dataset.text;
  }
}

export function setFieldError(form, name, message) {
  const el = form.querySelector(`[data-error="${name}"]`);
  const input = form.elements[name];
  if (el) el.textContent = message || "";
  if (input) input.classList.toggle("ring-2", Boolean(message));
  if (input) input.classList.toggle("ring-red-500", Boolean(message));
}

export function clearFieldErrors(form) {
  form.querySelectorAll("[data-error]").forEach((el) => setFieldError(form, el.dataset.error, ""));
}

export function applyServerFieldErrors(form, error) {
  const details = error?.data?.error?.details;
  if (!Array.isArray(details)) return;
  details.forEach((d) => setFieldError(form, d.field, d.message));
}