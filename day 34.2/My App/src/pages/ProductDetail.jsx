import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findProductById } from "../data/products.js";
import ProductPrice from "../components/ProductPrice.jsx";
import NotFound from "./NotFound.jsx";

export default function ProductDetail({ addToCart }) {
  const { productId } = useParams();

  const product = findProductById(productId);
  const [added, setAdded] = useState(false);
  if (!product) {
    return <NotFound message={`Không tìm thấy sản phẩm với id "${productId}".`} />;
  }

  function handleAddToCart() {
    addToCart(product); 
    setAdded(true);
  }

  return (
    <>
      <Link to="/products" className="text-sm text-gray-500 hover:text-orange-600">
        &larr; Quay lại sản phẩm
      </Link>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.thumbnail} alt={product.name} className="w-full rounded-lg" />

        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <ProductPrice
            value={product.price}
            className="text-xl text-orange-600 font-semibold mt-2 block"
          />
          <p className="text-gray-600 mt-4">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-orange-600 text-white px-6 py-2.5 rounded hover:bg-orange-700"
          >
            Thêm vào giỏ hàng
          </button>

          {added && <p className="mt-3 text-green-600 text-sm">Đã thêm vào giỏ hàng!</p>}
        </div>
      </div>
    </>
  );
}
