import React from 'react';
import ProductListing from './ProductListing';
import { allProducts } from './data/Product';
import diamondBanner from '../../assets/images/banner/diamond banner4-2.jpg';

const DiamondJewelryPage = () => {
  const diamondProducts = allProducts.filter(p => p.type === 'diamond');
  return (
    <ProductListing
      title="Diamond jewelry"
      banner={diamondBanner}
      products={diamondProducts}
      showBanner={true}
      showCategories={true}
    />
  );
};

export default DiamondJewelryPage;
