/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import singleProductReducer from '../features/singleProductSlice';
import filtersReducer from '../features/filtersSlice';
import cartReducer from '../features/cartSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    details: singleProductReducer,
    filter: filtersReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
