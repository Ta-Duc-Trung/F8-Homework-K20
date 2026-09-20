// Component hiển thị 1 sản phẩm dạng "card", dùng chung cho Home và Product List.
// Nhận vào 1 prop duy nhất: product (object sản phẩm).
import { Link } from "react-router-dom";
import ProductPrice from "./ProductPrice.jsx";

export default function ProductCard({ product }) {
  return (
    // Link bao ngoài toàn bộ card -> bấm vào đâu trong card cũng điều hướng được
    <Link
      to={`/products/${product.id}`}
      className="block bg-white border rounded-lg overflow-hidden hover:shadow-md transition"
    >
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full aspect-square object-cover"
      />
      <div className="p-4">
        <p className="font-medium">{product.name}</p>
        {/* Dùng component ProductPrice thay vì tự viết {product.price}đ,
            để không "render số thô" và đồng bộ cách hiển thị giá ở mọi nơi */}
        <ProductPrice value={product.price} className="text-orange-600 font-semibold mt-1 block" />
      </div>
    </Link>
  );
}