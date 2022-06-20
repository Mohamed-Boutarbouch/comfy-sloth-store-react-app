import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { About, Cart, Checkout, Error, Home, PrivateRoute, Products, SingleProduct } from './pages';
import { Navbar, Sidebar, Footer } from './components';

import { selectAllProductsState } from './features/productsSlice';
import { hydrateFilterProductsArr } from './features/filtersSlice';

const App = () => {
  const { products } = useSelector(selectAllProductsState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hydrateFilterProductsArr(products));
  }, [products]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
