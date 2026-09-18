// ======================================================
// ROUTER TỰ VIẾT (không dùng thư viện nào)
// Nhiệm vụ: nhìn vào URL hiện tại, quyết định hiển thị page nào.
// ======================================================

import { renderDefaultLayout, renderAuthLayout } from "./layouts.js";

// Import sẵn tất cả các "trang" (page). Mỗi page là 1 file có hàm render().
import * as HomePage from "./pages/home.js";
import * as ProductsPage from "./pages/products.js";
import * as ProductDetailPage from "./pages/productDetail.js";
import * as CartPage from "./pages/cart.js";
import * as SignUpPage from "./pages/signup.js";
import * as SignInPage from "./pages/signin.js";
import * as NotFoundPage from "./pages/notfound.js";

// DANH SÁCH ROUTE: mỗi route gồm 3 thông tin
//  - path: đường dẫn (":id" nghĩa là phần động, ví dụ /products/:id khớp /products/1, /products/2...)
//  - layout: "default" hoặc "auth" -> dùng khung sườn nào
//  - page: page module tương ứng (đã import ở trên)
const routes = [
  { path: "/", layout: "default", page: HomePage },
  { path: "/products", layout: "default", page: ProductsPage },
  { path: "/products/:id", layout: "default", page: ProductDetailPage },
  { path: "/cart", layout: "default", page: CartPage },
  { path: "/sign-up", layout: "auth", page: SignUpPage },
  { path: "/sign-in", layout: "auth", page: SignInPage },
];

// Hàm này so sánh URL thực tế (ví dụ "/products/3") với 1 pattern route (ví dụ "/products/:id").
// Nếu khớp, trả về object params chứa các phần động, ví dụ { id: "3" }.
// Nếu không khớp, trả về null.
function matchPath(pattern, actualPath) {
  const patternParts = pattern.split("/").filter(Boolean); // ["products", ":id"]
  const actualParts = actualPath.split("/").filter(Boolean); // ["products", "3"]

  if (patternParts.length !== actualParts.length) {
    return null; // số lượng đoạn khác nhau -> chắc chắn không khớp
  }

  const params = {};

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const actualPart = actualParts[i];

    if (patternPart.startsWith(":")) {
      // Đây là phần động, ví dụ ":id" -> lưu giá trị thực tế vào params.id
      const paramName = patternPart.slice(1); // bỏ dấu ":" -> "id"
      params[paramName] = actualPart;
    } else if (patternPart !== actualPart) {
      // Phần cố định mà không khớp -> route này không đúng
      return null;
    }
  }

  return params;
}

// Tìm route phù hợp với URL hiện tại.
function findMatchingRoute(pathname) {
  for (const route of routes) {
    const params = matchPath(route.path, pathname);
    if (params !== null) {
      return { route, params };
    }
  }
  return null; // không route nào khớp -> sẽ hiển thị trang 404
}

// ======================================================
// HÀM VẼ (RENDER) TRANG HIỆN TẠI RA MÀN HÌNH
// ======================================================
export function renderCurrentPage() {
  const appElement = document.getElementById("app");
  const pathname = window.location.pathname || "/";
  const matched = findMatchingRoute(pathname);
 

  // Nếu không tìm thấy route nào khớp -> dùng trang NotFound, layout default
  const currentPage = matched ? matched.route.page : NotFoundPage;
  const currentLayout = matched ? matched.route.layout : "default";
  const params = matched ? matched.params : {};

  // Bước 1: page tự vẽ HTML của riêng nó
  const pageHtml = currentPage.render(params);

  // Bước 2: nhét HTML đó vào layout tương ứng
  if (currentLayout === "auth") {
    appElement.innerHTML = renderAuthLayout(pageHtml);
  } else {
    appElement.innerHTML = renderDefaultLayout(pathname, pageHtml);
  }

  // Bước 3: nếu page có hàm afterRender (dùng để gắn sự kiện click, submit...)
  // thì gọi nó SAU KHI html đã có mặt trên trang.
  if (typeof currentPage.afterRender === "function") {
    currentPage.afterRender(params);
  }

  // Bước 4: gắn sự kiện điều hướng cho mọi link có data-link (xem hàm bên dưới)
  setupInternalLinks();

  // Bước 5: reset thanh cuộn về đầu trang mỗi khi chuyển trang
  window.scrollTo(0, 0);
}

// ======================================================
// ĐIỀU HƯỚNG SANG TRANG KHÁC (không load lại cả trang)
// ======================================================
export function goTo(path) {
  // Ghi URL mới lên thanh địa chỉ mà KHÔNG load lại trang (đây là điểm mạnh của SPA)
  window.history.pushState({}, "", path);
  renderCurrentPage();
}

// Tìm tất cả thẻ <a data-link> trong trang và gắn sự kiện click cho chúng,
// để khi click thì điều hướng bằng JS (goTo) thay vì để trình duyệt load lại trang.
function setupInternalLinks() {
  const links = document.querySelectorAll("a[data-link]");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // chặn hành vi mặc định (load lại trang) của thẻ <a>
      const path = link.getAttribute("href");
      goTo(path);
    });
  });
}

// ======================================================
// KHỞI ĐỘNG ROUTER
// ======================================================
export function startRouter() {
  // Khi người dùng bấm nút Back/Forward của trình duyệt, trình duyệt bắn ra sự kiện "popstate".
  // Ta cần lắng nghe để vẽ lại đúng trang tương ứng với URL mới.
  window.addEventListener("popstate", renderCurrentPage);

  // Vẽ trang lần đầu tiên khi mới load web
  renderCurrentPage();
}