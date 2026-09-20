// Trang chủ: giới thiệu sơ qua + 3 sản phẩm nổi bật.
import { Link } from "react-router-dom";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  // Lấy 3 sản phẩm đầu tiên để làm "nổi bật"
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <section className="text-center py-10">
        <h1 className="text-3xl font-bold mb-3">Chào mừng đến với Simple Shop</h1>
        <p className="text-gray-500 mb-6">Sản phẩm chất lượng, giá cả hợp lý.</p>
        <Link
          to="/products"
          className="inline-block bg-orange-600 text-white px-5 py-2.5 rounded hover:bg-orange-700"
        >
          Xem tất cả sản phẩm
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* .map() để biến mảng sản phẩm thành mảng component <ProductCard />.
              "key" là bắt buộc khi render danh sách trong React, giúp React
              biết phần tử nào là phần tử nào khi danh sách thay đổi. */}
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}