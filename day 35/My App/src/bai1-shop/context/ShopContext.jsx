import { createContext, useContext, useReducer } from 'react';
import { PRODUCTS } from '../data/products';

// =====================================================================
// BƯỚC 1: Định nghĩa STATE BAN ĐẦU
// Toàn bộ dữ liệu của cửa hàng được gom vào 1 object duy nhất.
// =====================================================================
const initialState = {
  products: PRODUCTS, // danh sách sản phẩm
  cart: [], // giỏ hàng: [{ id, name, price, thumbnail, quantity }, ...]
  category: 'Tất cả', // danh mục đang chọn
  keyword: '', // từ khóa tìm kiếm
};

// =====================================================================
// BƯỚC 2: Định nghĩa tên các ACTION (dùng hằng số để tránh gõ sai chính tả)
// =====================================================================
export const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  SET_FILTER: 'SET_FILTER',
};

// =====================================================================
// BƯỚC 3: Viết hàm REDUCER
// reducer(stateCũ, action) => stateMới
// Quy tắc vàng: KHÔNG sửa trực tiếp stateCũ, luôn trả về object/mảng MỚI.
// =====================================================================
function shopReducer(state, action) {
  switch (action.type) {
    // -----------------------------------------------------------------
    // Thêm vào giỏ. action.payload = sản phẩm (object product)
    // -----------------------------------------------------------------
    case ACTIONS.ADD_TO_CART: {
      const product = action.payload;
      // Kiểm tra sản phẩm đã có trong giỏ chưa
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        // Đã có -> tăng quantity lên 1 (tạo mảng mới bằng map)
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // Chưa có -> thêm mới vào cuối mảng với quantity = 1
      return {
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }

    // -----------------------------------------------------------------
    // Xóa khỏi giỏ. action.payload = id sản phẩm
    // -----------------------------------------------------------------
    case ACTIONS.REMOVE_FROM_CART: {
      const id = action.payload;
      return {
        ...state,
        // filter giữ lại những item KHÁC id cần xóa
        cart: state.cart.filter((item) => item.id !== id),
      };
    }

    // -----------------------------------------------------------------
    // Cập nhật số lượng. action.payload = { id, quantity }
    // Dùng chung cho cả 3 trường hợp: nút +, nút -, và gõ trực tiếp.
    // -----------------------------------------------------------------
    case ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      // Chuyển về số nguyên. Nếu người dùng gõ chữ/để trống -> NaN
      let newQuantity = Math.floor(Number(quantity));

      // KHÔNG cho số lượng nhỏ hơn 1 (và xử lý luôn trường hợp NaN)
      if (Number.isNaN(newQuantity) || newQuantity < 1) {
        newQuantity = 1;
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        ),
      };
    }

    // -----------------------------------------------------------------
    // Cập nhật bộ lọc. action.payload là object chứa field muốn đổi:
    //   { keyword: 'iphone' }  hoặc  { category: 'Laptop' }
    // Dấu ... sẽ "trộn" field mới đè lên state cũ.
    // -----------------------------------------------------------------
    case ACTIONS.SET_FILTER: {
      return {
        ...state,
        ...action.payload,
      };
    }

    // Action lạ -> báo lỗi để dễ phát hiện khi gõ sai type
    default:
      throw new Error('Action không hợp lệ: ' + action.type);
  }
}

// =====================================================================
// BƯỚC 4: Tạo CONTEXT
// =====================================================================
const ShopContext = createContext(null);

// =====================================================================
// BƯỚC 5: Tạo PROVIDER — component "bọc" ngoài app để chia sẻ dữ liệu
// =====================================================================
export function ShopProvider({ children }) {
  // useReducer trả về [state hiện tại, hàm dispatch để gửi action]
  const [state, dispatch] = useReducer(shopReducer, initialState);

  // Giá trị chia sẻ cho toàn bộ component con
  const value = {
    products: state.products,
    cart: state.cart,
    category: state.category,
    keyword: state.keyword,
    dispatch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

// =====================================================================
// BƯỚC 6: Custom hook useShop — đọc context cho gọn
// Thay vì mỗi nơi phải viết: useContext(ShopContext)
// thì chỉ cần: const { cart, dispatch } = useShop();
// =====================================================================
export function useShop() {
  const context = useContext(ShopContext);
  if (context === null) {
    // Nhắc nhở nếu quên bọc <ShopProvider>
    throw new Error('useShop phải được dùng bên trong <ShopProvider>');
  }
  return context;
}