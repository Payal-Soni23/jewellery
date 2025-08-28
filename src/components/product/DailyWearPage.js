import React from 'react';
import ProductListing from './ProductListing';
import { allProducts } from './data/Product';
import DailyBanner from '../../assets/images/banner/daily4-1.png';

const DailyWearPage = () => {
  const DailyWearProducts = allProducts.filter(p => p.type === 'daily wear');
  return (
    <ProductListing
      title=""
      banner={DailyBanner}
      products={DailyWearProducts}
      showBanner={true}
      showCategories={true}
    />
  );
};

export default DailyWearPage;
