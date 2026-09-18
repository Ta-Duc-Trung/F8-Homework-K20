// File này chỉ lo phần "KHUNG SƯỜN" (layout) của trang web.
// Có 2 loại khung sườn:
//   1. Default Layout: có Header đầy đủ  -> dùng cho Home, Products, Product Detail, Cart
//   2. Auth Layout: không có Header, giao diện căn giữa -> dùng cho Sign In, Sign Up
import { renderHeader } from "./header.js";

// pageHtml: đoạn HTML của page (Home, Products,...) sẽ được "nhét" vào giữa layout này
export function renderDefaultLayout(currentPath, pageHtml) {
  return `
    ${renderHeader(currentPath)}
    <main class="max-w-5xl mx-auto px-4 py-8 min-h-[70vh]">
      ${pageHtml}
    </main>
    <footer class="text-center text-sm text-gray-400 py-6">
      Simple Shop - Bài tập Vanilla JS Router
    </footer>
  `;
}

export function renderAuthLayout(pageHtml) {
  return `
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <a href="/" data-link class="text-2xl font-bold mb-6">Simple Shop</a>
      <div class="w-full max-w-sm bg-white p-8 rounded-lg shadow">
        ${pageHtml}
      </div>
    </div>
  `;
}