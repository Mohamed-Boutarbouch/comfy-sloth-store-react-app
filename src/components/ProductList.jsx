import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllFilteredProductsState } from '../features/filtersSlice';
// import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { gridView, filteredProducts: products } = useSelector(selectAllFilteredProductsState);

  if (products.length < 1) {
    return <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search...</h5>;
  }

  if (gridView === false) {
    return <ListView products={products} />;
  }

  return <GridView products={products}>product list</GridView>;
};

export default ProductList;
