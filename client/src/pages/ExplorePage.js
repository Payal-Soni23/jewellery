import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductListing from '../components/ProductListing.js';
import exploreBanner from '../assets/images/banner/Selection-3.png';
import { useProducts } from '../hooks/useProducts';

const ExplorePage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const { products, loading, error } = useProducts({ search });

  return (
    <ProductListing
      title="Explore Our Jewelry"
      banner={exploreBanner}
      products={products}
      showBanner={true}
      showCategories={true}
      loading={loading}
      error={error}
    />
  );
};

export default ExplorePage;
