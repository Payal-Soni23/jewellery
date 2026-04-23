import React from 'react';
import ProductListing from '../components/ProductListing';
import diamondBanner from '../assets/images/banner/diamond banner4-2.jpg';
import { useProducts } from '../hooks/useProducts';

const DiamondJewelryPage = () => {
  const { products, loading, error } = useProducts({ type: 'diamond' });

  return (
    <ProductListing
      title="Diamond Jewelry"
      banner={diamondBanner}
      products={products}
      showBanner={true}
      showCategories={true}
      loading={loading}
      error={error}
    />
  );
};

export default DiamondJewelryPage;
