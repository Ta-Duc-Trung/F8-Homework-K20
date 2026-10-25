import { createContext, useContext, useReducer } from 'react';
import { PRODUCTS } from '../data/products';
const initialState = {
  products: PRODUCTS, 
  cart: [], 
  category: 'Tất cả', 
  keyword: '', 
};

export const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  SET_FILTER: 'SET_FILTER',
};

function shopReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }
    case ACTIONS.REMOVE_FROM_CART: {
      const id = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== id),
      };
    }
    case ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      let newQuantity = Math.floor(Number(quantity));
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

    case ACTIONS.SET_FILTER: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      throw new Error('Action không hợp lệ: ' + action.type);
  }
}

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const value = {
    products: state.products,
    cart: state.cart,
    category: state.category,
    keyword: state.keyword,
    dispatch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === null) {
    throw new Error('useShop phải được dùng bên trong <ShopProvider>');
  }
  return context;
}