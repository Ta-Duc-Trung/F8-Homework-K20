import { create } from 'zustand'

// quantity hợp lệ: số nguyên dương (1, 2, 3...)
const isValidQuantity = (quantity) => Number.isInteger(quantity) && quantity > 0

export const useCartStore = create((set, get) => ({
  items: [], // mỗi item: { id, title, price, quantity }

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id)

      // Đã có trong giỏ → tăng quantity lên 1, KHÔNG thêm dòng mới
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }
      }

      // Chưa có → thêm mới với quantity = 1 (chỉ lấy các trường cần thiết)
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: Number(product.price),
            quantity: 1,
          },
        ],
      }
    }),

  updateQuantity: (id, quantity) => {
    if (!isValidQuantity(quantity)) return // bỏ qua số âm, 0, số thập phân
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    }))
  },

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),

  getTotalQuantity: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),
}))