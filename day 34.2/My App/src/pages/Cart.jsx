import { Link } from "react-router-dom";
import ProductPrice from "../components/ProductPrice.jsx";
export default function Cart({ items, removeFromCart, cartTotal }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl font-semibold mb-2">Giỏ hàng đang trống</p>
        <Link to="/products" className="text-orange-600 hover:underline">
          Xem sản phẩm ngay &rarr;
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

      <div>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b">
            <img src={item.thumbnail} alt={item.name} className="w-16 h-16 rounded object-cover" />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
            </div>
            <ProductPrice value={item.price * item.quantity} className="font-semibold text-orange-600" />
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-sm text-gray-400 hover:text-red-600 ml-2"
            >
              Xoá
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-6">
        <span className="text-gray-500">Tổng cộng</span>
        <ProductPrice value={cartTotal} className="text-xl font-bold text-orange-600" />
      </div>
    </>
  );
}