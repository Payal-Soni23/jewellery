import React from 'react';
import ProductListing from './ProductListing';
import { allProducts } from './data/Product';
import SilverBanner from '../../assets/images/banner/silver4.webp';

const SilverJewelryPage = () => {
  const SilverProducts = allProducts.filter(p => p.type === 'silver');
  return (
    <ProductListing
      title="Silver Collection"
      banner={SilverBanner}
      products={SilverProducts}
      showBanner={true}
      showCategories={true}
    />
  );
};

export default SilverJewelryPage;
