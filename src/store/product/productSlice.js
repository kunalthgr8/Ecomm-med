// ProductSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../appwrite/product";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
    filters: {
      category: [],
      price: [],
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    // const res = await fetch("https://fakestoreapi.com/products");
    const res2 = await productService.getProducts();
    // const data = await res.json();
    return res2;
  }
);

export const selectFilteredProducts = (state) => {
  const { data, filters } = state.product;
  const { category, price } = filters;

  return data.filter(product => {
    const matchesCategory = category.length === 0 || category.includes(product.category);
    const matchesPrice = price.length === 0 || price.some(range => {
      const [min, max] = range;
      return product.price >= min && (!max || product.price <= max);
    });
    return matchesCategory && matchesPrice;
  });
};
