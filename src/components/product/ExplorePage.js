import React from 'react';
import ProductListing from './ProductListing.js';
import  {allProducts}  from './data/Product.js';
import exploreBanner from '../../assets/images/banner/Selection-3.png';

const ExplorePage = () => {
  
  return (
    <ProductListing
      title="Explore Our Jewelry"
      banner={ exploreBanner }
      products={allProducts}
      showBanner={true}
      showCategories={true}
      

    />
   
   
  );
};console.log('Bannerduichuhfjfnc:', exploreBanner);
  console.log('Products:', allProducts);



export default ExplorePage;
