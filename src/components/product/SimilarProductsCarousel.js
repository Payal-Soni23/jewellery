import React from 'react';
import { Link } from 'react-router-dom';
import {allProducts} from './data/Product';

const SimilarProductsCarousel = ({ category, currentId }) => {
  const similar = allProducts.filter(p => p.category === category && p.id !== currentId);

  return (
    <div className="d-flex overflow-auto gap-4 pb-3">
      {similar.map(product => (
        <Link
          key={product.id}
          to={`/Collection/${product.name}`}
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
              <p className="text-muted">{product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SimilarProductsCarousel;
