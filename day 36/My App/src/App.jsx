import { useState } from "react";
import ProductFilter from "./components/ProductFilter.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

// App chỉ làm 1 việc: cho chọn xem Bài 1 hay Bài 2
export default function App() {
  const [tab, setTab] = useState("bai1");

  const tabClass = (name) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      tab === name
        ? "bg-indigo-600 text-white shadow"
        : "bg-white text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">
          Bài tập React + Tailwind CSS
        </h1>

        <div className="mb-6 flex justify-center gap-2">
          <button className={tabClass("bai1")} onClick={() => setTab("bai1")}>
            Bài 1: Bộ lọc sản phẩm
          </button>
          <button className={tabClass("bai2")} onClick={() => setTab("bai2")}>
            Bài 2: Form đăng ký
          </button>
        </div>

        {tab === "bai1" ? <ProductFilter /> : <RegisterForm />}
      </div>
    </div>
  );
}