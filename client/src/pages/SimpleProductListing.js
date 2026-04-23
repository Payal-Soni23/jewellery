import React from 'react';
import ProductListing from '../components/ProductListing';
import { useProducts } from '../hooks/useProducts';

const SimpleProductListing = ({ type, category }) => {
  const { products, loading, error } = useProducts({ type, category });

  return (
    <ProductListing
      title={`${type.charAt(0).toUpperCase() + type.slice(1)} ${category}`}
      products={products}
      showBanner={false}
      showCategories={false}
      loading={loading}
      error={error}
    />
  );
};

export default SimpleProductListing;
