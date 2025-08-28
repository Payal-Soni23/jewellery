import React from 'react';
import ProductListing from './ProductListing';
import { allProducts } from './data/Product';

const SimpleProductListing = ({ type, category }) => {
  const filtered = allProducts.filter(p => p.type === type && p.category === category);

  return (
    <ProductListing
      title={`${type.charAt(0).toUpperCase() + type.slice(1)} ${category}`}
      products={filtered}
      showBanner={false}
      showCategories={false}
    />
  );
};

export default SimpleProductListing;
