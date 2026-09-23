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
  const [items, setItems] = useState([]);
  function addToCart(product) {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
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


  function removeFromCart(productId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <ScrollToTop />

      <Routes>
    
        <Route element={<DefaultLayout cartCount={cartCount} />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route
            path="/products/:productId"
            element={<ProductDetail addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart items={items} removeFromCart={removeFromCart} cartTotal={cartTotal} />
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<DefaultLayout cartCount={cartCount} />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}