import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter((x) => x.product._id !== action.payload);
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.find((x) => x.product._id === id);
      if (item) {
        item.qty = qty;
      }
    },
    clearCart: (state) => {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
