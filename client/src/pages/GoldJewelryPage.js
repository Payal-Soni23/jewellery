import React from 'react';
import ProductListing from '../components/ProductListing';
import goldBanner from '../assets/images/banner/goldpage6.jpg';
import { useProducts } from '../hooks/useProducts';

const GoldJewelryPage = () => {
  const { products, loading, error } = useProducts({ type: 'gold' });

  return (
    <ProductListing
      title="Gold Jewelry"
      banner={goldBanner}
      products={products}
      showBanner={true}
      showCategories={true}
      loading={loading}
      error={error}
    />
  );
};

export default GoldJewelryPage;
