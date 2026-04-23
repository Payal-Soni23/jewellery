import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ name, price, category, images, slug }) => {
  return (
    <Link to={`/Collection/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card h-100 shadow-sm border-0">
        <img
          src={images?.[0]}
          alt={name}
          className="card-img-top"
          style={{ height: '250px', objectFit: 'cover' }}
        />

        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p className="text-muted">{category}</p>
          <strong className="text-dark">Rs. {price}</strong>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
