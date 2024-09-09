import { createSlice } from "@reduxjs/toolkit";
import {
  getCartFromStorage,
  setCartToStorage,
  clearCartStorage,
} from "../services/helper";
const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const calculateTotals = (items) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { productId, productName, image, price, quantity } = action.payload;
      const existingProduct = state.items.find(
        (item) => item.productId === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.items.push({
          productId,
          productName,
          image,
          price,
          quantity,
        });
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      setCartToStorage(state.items);
    },

    removeProduct: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      setCartToStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find((item) => item.productId === productId);

      if (product) {
        product.quantity = quantity;

        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;

        setCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      clearCartStorage();
    },

    loadCart: (state) => {
      const storedCart = getCartFromStorage();
      if (storedCart) {
        state.items = storedCart;

        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  clearCart,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;
