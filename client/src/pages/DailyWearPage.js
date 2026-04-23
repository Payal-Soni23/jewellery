import React from 'react';
import ProductListing from '../components/ProductListing';
import DailyBanner from '../assets/images/banner/daily4-1.png';
import { useProducts } from '../hooks/useProducts';

const DailyWearPage = () => {
  const { products, loading, error } = useProducts({ type: 'daily wear' });

  return (
    <ProductListing
      title="Daily Wear"
      banner={DailyBanner}
      products={products}
      showBanner={true}
      showCategories={true}
      loading={loading}
      error={error}
    />
  );
};

export default DailyWearPage;
