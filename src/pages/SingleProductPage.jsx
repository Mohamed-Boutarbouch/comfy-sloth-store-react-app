import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { useProductsContext } from '../context/products_context';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchSingleProduct, selectAllSingleProductState } from '../features/singleProductSlice';
import { formatPrice } from '../utils/helpers';
import { Loading, Error, ProductImages, AddToCart, Stars, PageHero } from '../components';

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleProduct, isLoading, isError } = useSelector(selectAllSingleProductState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [isError]);

  if (isLoading) {
    return <Loading />;
  }

  const {
    name,
    price,
    company,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    images,
  } = singleProduct;

  return (
    <Wrapper>
      <PageHero title={name} singleProduct />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available: </span>
              {stock > 0 ? 'in stock' : 'out of stock'}
            </p>
            <p className="info">
              <span>SKU: </span>
              {sku}
            </p>
            <p className="info">
              <span>Brand: </span>
              {company}
            </p>
            {stock > 0 && <AddToCart product={singleProduct} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
