import { useShop, ACTIONS } from '../context/ShopContext';
import { formatPrice } from '../data/products';
import { btnPrimary } from '../../styles';

// Hiển thị 1 sản phẩm. Nhận `product` qua props từ ProductList,
// còn `dispatch` thì lấy thẳng từ context (không cần truyền qua props).
function ProductItem({ product }) {
  const { dispatch } = useShop();

  const handleAddToCart = () => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-white p-3.5 shadow-sm">
      {/* Placeholder thay cho ảnh: 1 ô màu + emoji.
          Màu nền lấy từ dữ liệu nên vẫn dùng style={{...}}
          (Tailwind không tạo được class từ giá trị động lúc chạy). */}
      <div
        className="flex h-30 items-center justify-center rounded-lg text-5xl"
        style={{ backgroundColor: product.thumbnail.color }}
      >
        {product.thumbnail.emoji}
      </div>

      <span className="self-start rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600">
        {product.category}
      </span>
      <h3 className="font-semibold">{product.name}</h3>
      <p className="flex-1 text-sm text-gray-500">{product.description}</p>
      <p className="font-bold text-red-600">{formatPrice(product.price)}</p>

      <button className={btnPrimary} onClick={handleAddToCart}>
        + Thêm vào giỏ
      </button>
    </div>
  );
}

export default ProductItem;