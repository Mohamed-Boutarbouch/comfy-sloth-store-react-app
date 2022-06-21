/* eslint-disable implicit-arrow-linebreak */
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from '../features/productsSlice';
import singleProductReducer from '../features/singleProductSlice';
import filtersReducer from '../features/filtersSlice';
import cartReducer from '../features/cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['products', 'details', 'filter'],
};

const rootReducer = combineReducers({
  products: productsReducer,
  details: singleProductReducer,
  filter: filtersReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
export const persistor = persistStore(store);
