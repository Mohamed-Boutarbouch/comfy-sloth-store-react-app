/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { products_url as url } from '../utils/constants';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const { data } = await axios(url);
  return data;
});

const initialState = {
  products: [],
  featuredProducts: [],
  isSidebarOpen: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sidebarOpen(state) {
      state.isSidebarOpen = true;
    },
    sidebarClose(state) {
      state.isSidebarOpen = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.products = payload;
        state.featuredProducts = payload.filter((product) => {
          return product.featured === true;
        });
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { sidebarOpen, sidebarClose } = productsSlice.actions;
export const selectAllProductsState = (state) => state.products;
export default productsSlice.reducer;
