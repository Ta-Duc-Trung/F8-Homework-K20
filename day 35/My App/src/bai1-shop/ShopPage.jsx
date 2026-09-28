import { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import { btn } from '../styles';

// Thanh tiêu đề: hiển thị nút giỏ hàng kèm TỔNG SỐ LƯỢNG sản phẩm
function Header({ onOpenCart }) {
  const { cart } = useShop();

  // Tổng số lượng = cộng quantity của tất cả item
  // Ví dụ: 2 iPhone + 1 MacBook = 3
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="mb-3 flex items-center justify-between">
      <h2 className="text-2xl font-bold">🏪 Cửa hàng mini</h2>
      <button className={`${btn} font-semibold`} onClick={onOpenCart}>
        🛒 Giỏ hàng{' '}
        <span className="ml-1 inline-block min-w-[22px] rounded-full bg-red-600 px-1.5 py-0.5 text-center text-xs text-white">
          {totalQuantity}
        </span>
      </button>
    </header>
  );
}

// Nội dung cửa hàng. Tách riêng khỏi ShopPage vì các component
// dùng useShop() phải nằm BÊN TRONG <ShopProvider>.
function ShopContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <SearchBar />
      <ProductList />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

// Bọc toàn bộ cửa hàng trong ShopProvider để chia sẻ dữ liệu
function ShopPage() {
  return (
    <ShopProvider>
      <ShopContent />
    </ShopProvider>
  );
}

export default ShopPage;