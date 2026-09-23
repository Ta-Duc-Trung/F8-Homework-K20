// DefaultLayout: khung sườn dùng chung cho Home, Products, Product Detail, Cart.
// Luôn có Header đầy đủ ở trên.
//
// KHÔNG DÙNG CONTEXT: cartCount được App.jsx truyền xuống qua props,
// ở đây chỉ việc nhận rồi truyền tiếp 1 lớp nữa cho Header.
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function DefaultLayout({ cartCount }) {
  return (
    <>
      <Header cartCount={cartCount} />
      <main className="max-w-5xl mx-auto px-4 py-8 min-h-[70vh]">
        <Outlet />
      </main>

      <footer className="text-center text-sm text-gray-400 py-6">
        Simple Shop - Bài tập React Router
      </footer>
    </>
  );
}