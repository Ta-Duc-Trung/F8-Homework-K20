// Trang Product List: hiển thị TẤT CẢ sản phẩm dưới dạng grid.
import { products } from "../data.js";
import { renderProductCard } from "./productCardHtml.js";

export function render() {
  return `
    <h1 class="text-2xl font-bold mb-6">Tất cả sản phẩm</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      ${products.map(renderProductCard).join("")}
    </div>
  `;
}