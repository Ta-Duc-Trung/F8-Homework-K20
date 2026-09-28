import { useShop } from '../context/ShopContext';
import ProductItem from './ProductItem';

// Hiển thị danh sách sản phẩm SAU KHI LỌC.
function ProductList() {
  const { products, keyword, category } = useShop();

  // Lọc sản phẩm: phải thỏa mãn CẢ HAI điều kiện (dùng &&)
  const filteredProducts = products.filter((product) => {
    // 1. Tên chứa từ khóa (không phân biệt hoa/thường, bỏ khoảng trắng thừa)
    const matchKeyword = product.name
      .toLowerCase()
      .includes(keyword.trim().toLowerCase());

    // 2. Đúng danh mục (hoặc đang chọn "Tất cả")
    const matchCategory = category === 'Tất cả' || product.category === category;

    return matchKeyword && matchCategory;
  });

  // Không có kết quả -> báo cho người dùng
  if (filteredProducts.length === 0) {
    return <p className="p-6 text-center text-gray-500">Không tìm thấy sản phẩm phù hợp 😢</p>;
  }

  return (
    // grid tự chia cột: điện thoại 1 cột, màn vừa 2-3 cột, màn lớn 4 cột
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;