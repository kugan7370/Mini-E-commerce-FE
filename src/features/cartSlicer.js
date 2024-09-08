import { createSlice } from "@reduxjs/toolkit";
import {
  getCartFromStorage,
  setCartToStorage,
  clearCartStorage,
} from "../services/helper"; // Assuming you manage cart persistence in storage

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Helper function to calculate total price and quantity
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
    // Action to add product to cart
    addProduct: (state, action) => {
      const { productId, productName, image, price, quantity } = action.payload;
      const existingProduct = state.items.find(
        (item) => item.productId === productId
      );

      if (existingProduct) {
        // If the product already exists in the cart, update its quantity
        existingProduct.quantity += quantity;
      } else {
        // If it's a new product, add it to the cart
        state.items.push({
          productId,
          productName,
          image,
          price,
          quantity,
        });
      }

      // Update totals
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      // Persist cart to storage
      setCartToStorage(state.items);
    },

    // Action to remove product from cart
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);

      // Update totals
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      // Persist cart to storage
      setCartToStorage(state.items);
    },

    // Action to update quantity of a product in the cart
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find((item) => item.productId === productId);

      if (product) {
        product.quantity = quantity;

        // Update totals
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;

        // Persist cart to storage
        setCartToStorage(state.items);
      }
    },

    // Action to clear the cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      // Clear cart from storage
      clearCartStorage();
    },

    // Load cart from storage
    loadCart: (state) => {
      const storedCart = getCartFromStorage();
      if (storedCart) {
        state.items = storedCart;

        // Update totals
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
      }
    },
  },
});

// Export actions
export const {
  addProduct,
  removeProduct,
  updateQuantity,
  clearCart,
  loadCart,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
