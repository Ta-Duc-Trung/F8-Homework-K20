// Thanh điêu hướng trên cùng
import { getCartCount } from "./cartData.js";

// Hàm này trả về chuỗi class CSS cho 1 link menu.
// Nếu link đó đang active (đang ở đúng trang đó) thì tô màu cam + gạch chân đậm.
// Nếu không active thì màu xám bình thường.
function getMenuLinkClass(isActive) {
  if (isActive) {
    return "text-orange-600 font-semibold border-b-2 border-orange-600 pb-1";
  }
  return "text-gray-600 hover:text-orange-600 pb-1";
}

// currentPath: đường dẫn hiện tại, ví dụ "/", "/products", "/products/2", "/cart"...
export function renderHeader(currentPath) {
  const cartCount = getCartCount();

  // Kiểm tra từng menu xem có đang active hay không.
  // Lưu ý: "/products" và "/products/1", "/products/2"... đều cần active menu Products,
  // nên ta kiểm tra bằng startsWith thay vì so sánh chính xác (===).
  const isHomeActive = currentPath === "/";
  const isProductsActive = currentPath.startsWith("/products");
  const isCartActive = currentPath === "/cart";
  const isSignInActive = currentPath === "/sign-in";
  const isSignUpActive = currentPath === "/sign-up";

  return `
    <header class="bg-white border-b sticky top-0 z-10">
      <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" data-link class="text-xl font-bold text-gray-900">Simple Shop</a>

        <nav class="flex items-center gap-5">
          <a href="/" data-link class="${getMenuLinkClass(isHomeActive)}">Home</a>
          <a href="/products" data-link class="${getMenuLinkClass(isProductsActive)}">Products</a>
          <a href="/cart" data-link class="${getMenuLinkClass(isCartActive)}">
            Cart ${cartCount > 0 ? "(" + cartCount + ")" : ""}
          </a>
          <a href="/sign-in" data-link class="${getMenuLinkClass(isSignInActive)}">Sign In</a>
          <a href="/sign-up" data-link class="${getMenuLinkClass(isSignUpActive)}">Sign Up</a>
        </nav>
      </div>
    </header>
  `;
}