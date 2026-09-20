// File này khai báo TOÀN BỘ route của app.
//
// KHÔNG DÙNG CONTEXT: giỏ hàng được quản lý bằng useState ngay tại đây (App.jsx),
// vì đây là component ở vị trí "cao nhất", bao trùm toàn bộ Routes.
// Sau đó chỉ cần TRUYỀN XUỐNG bằng props cho đúng những trang/component cần dùng
// tới nó (Header, ProductDetail, Cart) - đây gọi là "prop drilling", không cần
// học thêm khái niệm gì mới ngoài props bạn đã biết.
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  // State giỏ hàng - đặt ở đây vì cả Header, ProductDetail, Cart đều cần dùng tới.
  const [items, setItems] = useState([]);

  // Thêm 1 sản phẩm vào giỏ
  function addToCart(product) {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Đã có trong giỏ -> tăng quantity lên 1
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Chưa có -> thêm mới với quantity = 1
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ];
    });
  }

  // Xoá 1 sản phẩm khỏi giỏ theo id
  function removeFromCart(productId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }

  // Tính sẵn số lượng + tổng tiền ở đây, để không phải tính lại nhiều lần ở các trang con
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Nhóm 1: các route dùng chung DefaultLayout.
            Truyền cartCount xuống DefaultLayout để nó truyền tiếp cho Header. */}
        <Route element={<DefaultLayout cartCount={cartCount} />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />

          {/* ProductDetail cần hàm addToCart để "thêm vào giỏ" -> truyền qua props */}
          <Route
            path="/products/:productId"
            element={<ProductDetail addToCart={addToCart} />}
          />

          {/* Cart cần đọc danh sách + hàm xoá + tổng tiền -> truyền qua props */}
          <Route
            path="/cart"
            element={
              <Cart items={items} removeFromCart={removeFromCart} cartTotal={cartTotal} />
            }
          />
        </Route>

        {/* Nhóm 2: AuthLayout không cần giỏ hàng, nên không cần truyền props gì thêm */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>

        {/* Trang 404 - vẫn cần cartCount vì DefaultLayout luôn hiện Header */}
        <Route element={<DefaultLayout cartCount={cartCount} />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}