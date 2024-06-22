import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";
import offerSlice from "./offer/offerSlice";
import productSlice from "./product/productSlice";
import sidebarSlice from "./sidebar/sidebarSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    offer: offerSlice,
    product: productSlice,
    sidebar: sidebarSlice,
  },
});

export default store;
