import ProductItem from './ProductItem.jsx';

// Component này CHỈ nhận mảng products qua props và render ra dạng grid
// Không tự gọi API, không tự biết về loading/error - đó là việc của App.jsx
function ProductList({ products, onAddToCart }) {
  // Không để giao diện trống khi không có sản phẩm nào
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        Không tìm thấy sản phẩm nào phù hợp.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductList;