/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const { id, product, mainColor, amount } = payload;

      const tempItem = state.cart.find((item) => item.id === id + mainColor);

      if (tempItem) {
        state.cart.map((cartItem) => {
          if (cartItem.id === id + mainColor) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return (cartItem.amount = newAmount);
          }
          return cartItem;
        });
      } else {
        const newItem = {
          id: id + mainColor,
          name: product.name,
          color: mainColor,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        state.cart.push(newItem);
      }
    },

    removeItem(state, { payload }) {
      const tempCart = current(state).cart.filter((item) => item.id !== payload);
      state.cart = tempCart;
    },

    toggleAmount(state, { payload }) {
      const { id, value } = payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === 'increase') {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            item.amount = newAmount;
          }
          if (value === 'decrease') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            item.amount = newAmount;
          }
        }
        return item;
      });
      state.cart = tempCart;
    },

    clearCart(state) {
      state.cart = [];
    },

    countCartTotals(state) {
      const { totalItems, totalAmount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;

          total.totalItems += amount;
          total.totalAmount += price * amount;

          return total;
        },
        {
          totalItems: 0,
          totalAmount: 0,
        },
      );

      state.totalItems = totalItems;
      state.totalAmount = totalAmount;

      console.log(totalItems, totalAmount)
    },
  },
});

export const { addToCart, removeItem, toggleAmount, clearCart, countCartTotals } = cartSlice.actions;
export const selectAllCartProductsState = (state) => state.cart;
export default cartSlice.reducer;
