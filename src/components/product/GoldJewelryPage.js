import React from 'react';
import ProductListing from './ProductListing';
import { allProducts}  from './data/Product';
import goldBanner from '../../assets/images/banner/goldpage6.jpg';

const GoldJewelryPage = () => {
  const goldProducts = allProducts.filter(p => p.type === 'gold');
  return (
    <ProductListing
      title="Gold Jewelry"
      banner={goldBanner}
      products={goldProducts}
      showBanner={true}
      showCategories={true}
    />
  );
};

export default GoldJewelryPage;
