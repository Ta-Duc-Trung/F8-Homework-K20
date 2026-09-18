// Trang Product Detail: hiển thị chi tiết 1 sản phẩm, dựa vào :id trên URL.
import { findProductById } from "../data.js";
import { formatPrice, addToCart, getCartCount } from "../cartData.js";

// params là object chứa các phần động trên URL, ví dụ { id: "2" }
export function render(params) {
  const product = findProductById(params.id);

  // Nếu không tìm thấy sản phẩm có id này -> báo cho người dùng biết
  if (!product) {
    return `
      <div class="text-center py-16">
        <p class="text-xl font-semibold mb-2">Không tìm thấy sản phẩm</p>
        <a href="/products" data-link class="text-orange-600 hover:underline">
          &larr; Quay lại danh sách sản phẩm
        </a>
      </div>
    `;
  }

  return `
    <a href="/products" data-link class="text-sm text-gray-500 hover:text-orange-600">
      &larr; Quay lại sản phẩm
    </a>

    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img src="${product.thumbnail}" alt="${product.name}" class="w-full rounded-lg" />

      <div>
        <h1 class="text-2xl font-bold">${product.name}</h1>
        <p class="text-xl text-orange-600 font-semibold mt-2">${formatPrice(product.price)}</p>
        <p class="text-gray-600 mt-4">${product.description}</p>

        <button id="btn-add-to-cart"
          class="mt-6 bg-orange-600 text-white px-6 py-2.5 rounded hover:bg-orange-700">
          Thêm vào giỏ hàng
        </button>

        <!-- Thông báo này mặc định bị ẩn (hidden), sẽ hiện ra sau khi bấm nút -->
        <p id="add-to-cart-message" class="hidden mt-3 text-green-600 text-sm">
          Đã thêm vào giỏ hàng!
        </p>
      </div>
    </div>
  `;
}

// afterRender chạy SAU KHI HTML ở trên đã được chèn vào trang.
// Ta cần chờ tới lúc đó thì mới gắn sự kiện click được (vì lúc render(), nút chưa tồn tại trên DOM).
export function afterRender(params) {
  const product = findProductById(params.id);
  if (!product) return; // không có sản phẩm thì không cần gắn sự kiện gì cả

  const addButton = document.getElementById("btn-add-to-cart");
  const message = document.getElementById("add-to-cart-message");

  addButton.addEventListener("click", function () {
    addToCart(product);
    message.classList.remove("hidden"); // hiện thông báo "Đã thêm vào giỏ hàng!"

    // Cập nhật luôn số lượng hiển thị trên menu "Cart" ở header,
    // để không cần load lại cả trang.
    const cartMenuLink = document.querySelector('a[href="/cart"]');
    const count = getCartCount();
    cartMenuLink.textContent = "Cart " + (count > 0 ? "(" + count + ")" : "");
  });
}