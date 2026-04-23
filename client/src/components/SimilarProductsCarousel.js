import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const SimilarProductsCarousel = ({ category, currentId }) => {
  const { products } = useProducts({ category });
  const similar = products.filter((product) => product._id !== currentId).slice(0, 6);

  return (
    <div className="d-flex overflow-auto gap-4 pb-3">
      {similar.map(product => (
        <Link
          key={product._id}
          to={`/Collection/${product.slug}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div className="card" style={{ minWidth: '200px' }}>
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ height: '200px', objectFit: 'cover' }}
              className="card-img-top"
            />
            <div className="card-body">
              <h6>{product.name}</h6>
              <p className="text-muted">Rs. {product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SimilarProductsCarousel;
