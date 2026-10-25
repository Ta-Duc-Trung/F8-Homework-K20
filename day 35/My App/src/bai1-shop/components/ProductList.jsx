import { useShop } from '../context/ShopContext';
import ProductItem from './ProductItem';

function ProductList() {
  const { products, keyword, category } = useShop();

  const filteredProducts = products.filter((product) => {
    const matchKeyword = product.name
      .toLowerCase()
      .includes(keyword.trim().toLowerCase());
    const matchCategory = category === 'Tất cả' || product.category === category;

    return matchKeyword && matchCategory;
  });

  if (filteredProducts.length === 0) {
    return <p className="p-6 text-center text-gray-500">Không tìm thấy sản phẩm phù hợp 😢</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;