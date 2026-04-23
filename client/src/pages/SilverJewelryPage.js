import React from 'react';
import ProductListing from '../components/ProductListing';
import SilverBanner from '../assets/images/banner/silver4.webp';
import { useProducts } from '../hooks/useProducts';

const SilverJewelryPage = () => {
  const { products, loading, error } = useProducts({ type: 'silver' });

  return (
    <ProductListing
      title="Silver Collection"
      banner={SilverBanner}
      products={products}
      showBanner={true}
      showCategories={true}
      loading={loading}
      error={error}
    />
  );
};

export default SilverJewelryPage;
