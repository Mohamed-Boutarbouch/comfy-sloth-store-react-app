/* eslint-disable prefer-const */
/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  sortedProducts: [],
  filteredProducts: [],
  gridView: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    hydrateFilterProductsArr(state, { payload }) {
      state.sortedProducts = [...payload];
      state.filteredProducts = [].concat(state.sortedProducts);

      let maxPrice = state.filteredProducts.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      state.filters.maxPrice = maxPrice;
      state.filters.price = maxPrice;

      const tempProducts = state.filteredProducts.sort((a, b) => a.price - b.price);
      state.filteredProducts = tempProducts;
    },
    setGridView(state) {
      state.gridView = true;
    },
    setListView(state) {
      state.gridView = false;
    },

    updateSort(state, { payload }) {
      state.sort = payload.target.value;

      let tempProducts = [...current(state).filteredProducts];

      switch (payload.target.value) {
        case 'price-lowest':
          tempProducts = tempProducts.sort((a, b) => a.price - b.price);
          state.filteredProducts = tempProducts;
          break;
        case 'price-highest':
          tempProducts = tempProducts.sort((a, b) => b.price - a.price);
          state.filteredProducts = tempProducts;
          break;
        case 'name-a':
          tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
          state.filteredProducts = tempProducts;
          break;
        case 'name-z':
          tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
          state.filteredProducts = tempProducts;
          break;

        default:
          tempProducts = current(state).sortedProducts;
          break;
      }
    },

    updateFilters(state, { payload }) {
      let { name, value } = payload.target;
      if (name === 'category') value = payload.target.textContent;
      if (name === 'color') value = payload.target.dataset.color;
      if (name === 'price') Number(value);
      if (name === 'shipping') value = payload.target.checked;

      return { ...state, filters: { ...state.filters, [name]: value } };
    },
    clearFilters(state) {
      state.filters = {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.maxPrice,
        shipping: false,
      };
    },

    filterProducts(state) {
      const { sortedProducts } = current(state);
      const { text, company, category, color, price, shipping } = current(state).filters;

      let tempProducts = [...sortedProducts];
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.category === category;
        });
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.company === company;
        });
      }
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((col) => col === color);
        });
      }
      if (price !== 0) {
        tempProducts = tempProducts.filter((product) => {
          return product.price <= price;
        });
      }

      if (shipping) {
        tempProducts = tempProducts.filter((product) => {
          return product.shipping === true;
        });
      } else {
        state.filteredProducts = sortedProducts;
      }

      state.filteredProducts = tempProducts;
    },
  },
});

export const {
  hydrateFilterProductsArr,
  setGridView,
  setListView,
  updateSort,
  updateFilters,
  clearFilters,
  filterProducts,
} = filtersSlice.actions;
export const selectAllFilteredProductsState = (state) => state.filter;
export default filtersSlice.reducer;
