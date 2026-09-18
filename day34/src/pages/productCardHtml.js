// Đoạn HTML hiển thị 1 sản phẩm dạng "card", dùng chung cho trang Home và Product List.
import { formatPrice } from "../cartData.js";

export function renderProductCard(product) {
  return `
    <a href="/products/${product.id}" data-link
       class="block bg-white border rounded-lg overflow-hidden hover:shadow-md transition">
      <img src="${product.thumbnail}" alt="${product.name}" class="w-full aspect-square object-cover" />
      <div class="p-4">
        <p class="font-medium">${product.name}</p>
        <p class="text-orange-600 font-semibold mt-1">${formatPrice(product.price)}</p>
      </div>
    </a>
  `;
}