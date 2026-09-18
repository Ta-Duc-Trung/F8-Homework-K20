// Trang Cart: hiển thị danh sách sản phẩm đã thêm vào giỏ.
import { getCartItems, getCartTotal, removeFromCart, formatPrice } from "../cartData.js";

export function render() {
  const items = getCartItems();

  // Trường hợp giỏ hàng trống
  if (items.length === 0) {
    return `
      <div class="text-center py-16">
        <p class="text-xl font-semibold mb-2">Giỏ hàng đang trống</p>
        <a href="/products" data-link class="text-orange-600 hover:underline">
          Xem sản phẩm ngay &rarr;
        </a>
      </div>
    `;
  }

  // Vẽ HTML cho từng sản phẩm trong giỏ
  const itemsHtml = items
    .map(
      (item) => `
        <div class="flex items-center gap-4 py-4 border-b">
          <img src="${item.thumbnail}" alt="${item.name}" class="w-16 h-16 rounded object-cover" />
          <div class="flex-1">
            <p class="font-medium">${item.name}</p>
            <p class="text-sm text-gray-500">Số lượng: ${item.quantity}</p>
          </div>
          <p class="font-semibold text-orange-600">${formatPrice(item.price * item.quantity)}</p>
          <button data-remove-id="${item.id}" class="text-sm text-gray-400 hover:text-red-600">
            Xoá
          </button>
        </div>
      `
    )
    .join("");

  return `
    <h1 class="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
    <div>${itemsHtml}</div>
    <div class="flex justify-between items-center pt-6">
      <span class="text-gray-500">Tổng cộng</span>
      <span class="text-xl font-bold text-orange-600">${formatPrice(getCartTotal())}</span>
    </div>
  `;
}

// Gắn sự kiện cho các nút "Xoá" sau khi HTML đã được chèn vào trang.
export function afterRender() {
  const removeButtons = document.querySelectorAll("[data-remove-id]");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = Number(button.getAttribute("data-remove-id"));
      removeFromCart(id);

      // Sau khi xoá, vẽ lại trang Cart để cập nhật danh sách mới.
      // Ta import router.js ngay tại đây để tránh vòng lặp import ở đầu file.
      import("../router.js").then(function (routerModule) {
        routerModule.renderCurrentPage();
      });
    });
  });
}