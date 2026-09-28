import { useMemo, useState } from "react";

// ============================================================
// 1. DỮ LIỆU: đặt NGOÀI component
//    -> Chỉ tạo 1 lần khi file được nạp.
//    -> Nếu đặt bên trong, mỗi lần render sẽ tạo lại 1.000 object mới.
// ============================================================
const PRODUCTS = Array.from({ length: 1000 }, (_, index) => {
  const categories = ["Điện thoại", "Laptop", "Thời trang", "Gia dụng", "Sách"];

  return {
    id: index + 1,
    name: `Sản phẩm ${index + 1}`,
    category: categories[index % categories.length],
    price: (index % 50) * 20 + 100, // Giá từ 100 đến 1080 (k)
    rating: (index % 5) + 1, // Rating từ 1 đến 5 sao
  };
});

const CATEGORIES = ["Tất cả", "Điện thoại", "Laptop", "Thời trang", "Gia dụng", "Sách"];

export default function ProductFilter() {
  // ============================================================
  // 2. STATE
  // ============================================================
  const [count, setCount] = useState(0); // chỉ để test re-render
  const [keyword, setKeyword] = useState(""); // từ khóa tìm kiếm
  const [category, setCategory] = useState("Tất cả"); // danh mục
  const [sortType, setSortType] = useState("default"); // default | asc | desc

  // ============================================================
  // 3. useMemo: lọc + sắp xếp
  //    React chỉ chạy lại hàm bên trong khi 1 trong 3 giá trị
  //    [keyword, category, sortType] thay đổi.
  //    Bấm "Tăng count" -> count đổi -> component render lại,
  //    NHƯNG useMemo trả về kết quả cũ đã cache, không lọc lại.
  //    (PRODUCTS nằm ngoài component, không bao giờ đổi, nên không cần
  //    đưa vào dependency.)
  // ============================================================
  const filteredProducts = useMemo(() => {
    console.log("ĐANG LỌC VÀ SẮP XẾP LẠI DANH SÁCH...");

    const search = keyword.trim().toLowerCase();

    // filter() luôn trả về MẢNG MỚI -> PRODUCTS gốc không bị đụng tới
    const result = PRODUCTS.filter((product) => {
      const matchName = product.name.toLowerCase().includes(search);
      const matchCategory = category === "Tất cả" || product.category === category;
      return matchName && matchCategory;
    });

    // sort() sửa trực tiếp mảng nó được gọi. Ở đây `result` là mảng mới
    // do filter() tạo ra, nên sort thoải mái mà PRODUCTS vẫn giữ nguyên thứ tự.
    if (sortType === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [keyword, category, sortType]);

  // Class Tailwind dùng chung cho input và select
  const fieldClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

  // ============================================================
  // 4. GIAO DIỆN
  // ============================================================
  return (
    <div className="space-y-6">
      {/* ---------- Khu vực kiểm tra re-render ---------- */}
      <section className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm text-slate-500">Khu vực kiểm tra re-render</p>
          <p className="text-lg font-semibold text-slate-800">
            Count: <span className="text-indigo-600">{count}</span>
          </p>
        </div>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 active:scale-95"
        >
          Tăng count
        </button>
      </section>

      {/* ---------- Khu vực bộ lọc và sắp xếp ---------- */}
      <section className="grid gap-4 rounded-xl bg-white p-5 shadow-sm sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Tìm theo tên</span>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="VD: Sản phẩm 12"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Danh mục</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={fieldClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Sắp xếp</span>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className={fieldClass}
          >
            <option value="default">Mặc định</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </label>
      </section>

      {/* ---------- Khu vực danh sách ---------- */}
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <p className="mb-4 text-sm font-medium text-slate-600">
          Tìm thấy{" "}
          <span className="font-bold text-indigo-600">{filteredProducts.length}</span> /{" "}
          {PRODUCTS.length} sản phẩm
        </p>

        {filteredProducts.length === 0 ? (
          <p className="rounded-lg bg-slate-50 py-10 text-center text-slate-500">
            Không tìm thấy sản phẩm nào phù hợp.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="rounded-lg border border-slate-200 p-4 transition hover:border-indigo-300 hover:shadow"
              >
                <h3 className="font-semibold text-slate-800">{product.name}</h3>
                <p className="mt-1 inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700">
                  {product.category}
                </p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-bold text-emerald-600">{product.price}k</span>
                  <span className="text-amber-500">
                    {"★".repeat(product.rating)}
                    <span className="text-slate-300">{"★".repeat(5 - product.rating)}</span>
                    <span className="ml-1 text-slate-500">({product.rating} sao)</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}