/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { single_product_url as url } from '../utils/constants';

const initialState = {
  singleProduct: {},
  isLoading: false,
  isError: false,
};

export const fetchSingleProduct = createAsyncThunk(
  'detail/fetchSingleProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios(`${url}${productId}`, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      return data;
    } catch (error) {
      console.log(rejectWithValue(error.response.data));
      return rejectWithValue(error.response.data);
    }
  },
);

const singleProductSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.singleProduct = payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.error.message);
      });
  },
});

export const selectAllSingleProductState = (state) => state.details;

// export const {  } = singleProductSlice.actions;
export default singleProductSlice.reducer;
