import { useCartStore } from '../store/useCartStore'

const formatPrice = (value) => `$${value.toFixed(2)}`

function Cart({ open, onClose }) {
  // Selector: lấy đúng dữ liệu/action cần dùng
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const getTotalQuantity = useCartStore((state) => state.getTotalQuantity)

  // Vì đã lấy items ở trên → mỗi lần items đổi, 2 dòng này tính lại
  const totalPrice = getTotalPrice()
  const totalQuantity = getTotalQuantity()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-20 flex justify-end">
      {/* Lớp nền mờ, click để đóng */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Giỏ hàng</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Giỏ hàng trống</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="space-y-2 rounded-lg border p-3">
                  <div className="flex justify-between gap-2">
                    <p className="font-medium">{item.title}</p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </div>

                  <p className="text-sm text-gray-500">Đơn giá: {formatPrice(item.price)}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        className="h-8 w-8 rounded border disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label={`Giảm số lượng ${item.title}`}
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded border"
                        aria-label={`Tăng số lượng ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold">
                      Thành tiền: {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-1 border-t p-4">
          <p className="flex justify-between text-sm">
            <span>Tổng số lượng</span>
            <span>{totalQuantity}</span>
          </p>
          <p className="flex justify-between text-lg font-bold">
            <span>Tổng tiền</span>
            <span>{formatPrice(totalPrice)}</span>
          </p>
        </div>
      </aside>
    </div>
  )
}

export default Cart