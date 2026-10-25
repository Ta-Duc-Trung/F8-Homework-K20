import { useCartStore } from '../store/useCartStore'

function Header({ onOpenCart }) {
  // Lấy items để component re-render khi giỏ thay đổi
  const items = useCartStore((state) => state.items)
  const getTotalQuantity = useCartStore((state) => state.getTotalQuantity)
  const totalQuantity = getTotalQuantity() // cộng tất cả quantity, không phải số dòng

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold">Đức Shop</h1>
        <button
          type="button"
          onClick={onOpenCart}
          className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          🛒 Giỏ hàng
          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
            {totalQuantity}
          </span>
        </button>
      </div>
      {/* items chỉ dùng để theo dõi thay đổi */}
      <span hidden>{items.length}</span>
    </header>
  )
}

export default Header