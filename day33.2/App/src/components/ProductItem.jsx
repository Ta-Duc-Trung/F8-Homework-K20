import Badge from './Badge.jsx';
import { formatPrice } from '../utils/formatPrice.js';

function ProductItem({ product, onAddToCart }) {
  // Kiểm tra hết hàng theo CẢ 2 điều kiện đề bài yêu cầu
  const isOutOfStock =
    product.stock === 0 || product.availabilityStatus === 'Out of Stock';

  const hasDiscount = product.discountPercentage > 0;

  // Tính giá sau giảm theo đúng công thức đề bài
  const finalPrice = product.price * (1 - product.discountPercentage / 100);

  // Ảnh: ưu tiên thumbnail, nếu không có thì lấy ảnh đầu tiên trong mảng images
  const imageSrc = product.thumbnail || product.images?.[0];

  const handleAddToCart = () => {
    alert(`Đã thêm ${product.title} vào giỏ hàng với giá ${formatPrice(finalPrice)}!`);
    onAddToCart?.(product); // gọi callback ra ngoài nếu component cha có truyền vào
  };

  return (
    <div
      className={`border rounded-xl p-4 flex flex-col ${
        isOutOfStock ? 'opacity-50' : ''
      }`}
    >
      <img
        src={imageSrc}
        alt={product.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{product.title}</h3>

      {/* Danh sách badge - chỉ hiện khi có điều kiện tương ứng */}
      <div className="flex gap-2 mb-2 flex-wrap">
        {hasDiscount && <Badge text={`Giảm giá ${product.discountPercentage.toFixed(0)}%`} type="discount" />}
        {isOutOfStock && <Badge text="Hết hàng" type="outofstock" />}
      </div>

      {/* Giá: nếu có giảm giá thì hiện cả giá gốc gạch ngang + giá mới */}
      <div className="mb-1">
        {hasDiscount ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              {formatPrice(product.price)}
            </span>
            <span className="text-red-600 font-semibold">
              {formatPrice(finalPrice)}
            </span>
          </div>
        ) : (
          <span className="text-gray-800 font-semibold">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-3">Còn lại: {product.stock} sản phẩm</p>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`mt-auto py-2 rounded-lg text-sm font-medium ${
          isOutOfStock
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
      </button>
    </div>
  );
}

export default ProductItem;