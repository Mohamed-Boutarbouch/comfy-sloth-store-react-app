import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { selectAllCartProductsState, countCartTotals } from '../features/cartSlice';
import { CartContent, PageHero } from '../components';

const CartPage = () => {
  const { cart } = useSelector(selectAllCartProductsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countCartTotals());
  }, [cart]);

  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            Fill it
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
