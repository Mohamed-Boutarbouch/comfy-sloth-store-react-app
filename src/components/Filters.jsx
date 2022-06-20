/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { selectAllProductsState } from '../features/productsSlice';
import {
  selectAllFilteredProductsState,
  updateFilters,
  clearFilters,
  filterProducts,
} from '../features/filtersSlice';

const Filters = () => {
  const { filters } = useSelector(selectAllFilteredProductsState);
  const { products } = useSelector(selectAllProductsState);
  const { text, company, category, color, minPrice, maxPrice, price, shipping } = filters;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterProducts());
  }, [filters]);

  const categories = getUniqueValues(products, 'category');
  const companies = getUniqueValues(products, 'company');
  const colors = getUniqueValues(products, 'colors');

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Search Input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={(e) => dispatch(updateFilters(e))}
            />
          </div>
          {/* Categories */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((cat, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    name="category"
                    className={`${category === cat.toLowerCase() ? 'active' : null}`}
                    onClick={(e) => dispatch(updateFilters(e))}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Companies */}
          <div className="form-control">
            <h5>company</h5>
            <select
              className="company"
              name="company"
              value={company}
              onChange={(e) => dispatch(updateFilters(e))}
            >
              {companies.map((comp, index) => {
                return (
                  <option key={index} value={comp}>
                    {comp}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((col, index) => {
                if (col === 'all') {
                  return (
                    <button
                      key={index}
                      type="button"
                      name="color"
                      className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`}
                      data-color="all"
                      onClick={(e) => dispatch(updateFilters(e))}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    type="button"
                    name="color"
                    style={{ background: col }}
                    className={`${color === col ? 'color-btn active' : 'color-btn'}`}
                    data-color={col}
                    onClick={(e) => dispatch(updateFilters(e))}
                  >
                    {col === color ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={(e) => dispatch(updateFilters(e))}
            />
          </div>
          {/* Shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={(e) => dispatch(updateFilters(e))}
              checked={shipping}
            />
          </div>
        </form>
        <button type="button" className="clear-btn" onClick={() => dispatch(clearFilters())}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
