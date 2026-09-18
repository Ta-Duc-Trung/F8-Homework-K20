// Trang Home: giới thiệu sơ qua + 3 sản phẩm nổi bật.
import { products } from "../data.js";
import { renderProductCard } from "./productCardHtml.js";

export function render() {
  const featuredProducts = products.slice(0, 3); // lấy 3 sản phẩm đầu tiên

  return `
    <section class="text-center py-10">
      <h1 class="text-3xl font-bold mb-3">Chào mừng đến với Simple Shop</h1>
      <p class="text-gray-500 mb-6">Sản phẩm chất lượng, giá cả hợp lý.</p>
      <a href="/products" data-link
         class="inline-block bg-orange-600 text-white px-5 py-2.5 rounded hover:bg-orange-700">
        Xem tất cả sản phẩm
      </a>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-4">Sản phẩm nổi bật</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        ${featuredProducts.map(renderProductCard).join("")}
      </div>
    </section>
  `;
}