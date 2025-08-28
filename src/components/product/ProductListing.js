import React, { useState } from 'react';
import ProductCard from './ProductCard';
import "./ProductListing.css";
import "./ExplorePage";

 

const ProductListing = ({ title, banner, products, showBanner = true, showCategories = true }) => {
  
  console.log('products:', products); // ✅ Moved here
  console.log("Banner:", banner);
  console.log("Title:", title);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

 
  const predefined = ['Ring', 'Earring', 'Bracelet', 'Pendant'];
  const unique = [...new Set((products || []).map((p) => p.category))];
  const categories = ['All', ...predefined.filter((cat) => unique.includes(cat))];

  
  let filtered = selectedCategory === 'All'
    ? products
    : products?.filter(product => product.category === selectedCategory) || [];

  const parsePrice = (priceStr) =>
  Number(priceStr.replace(/[^0-9.]/g, ''));

  if (sortBy === 'priceLow') filtered = [...filtered].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  if (sortBy === 'priceHigh') filtered = [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
 
  return (
    <div className="product-listing-page">
      {showBanner && (
        <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
          <img src={banner} alt="Explore Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <h1 style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', color: 'white',
            fontSize: '3rem', textShadow: '2px 2px 6px rgba(0,0,0,0.5)'
          }}>
            {title}
          </h1>
        </div>
      )}
      

      {showCategories && banner && (
        <div className="d-flex justify-content-center gap-3 py-3 bg-light flex-wrap">
          {categories.map((cat) => ( 
            <button
              key={cat}
              className={`btn ${selectedCategory === cat ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="container py-3">
        {/* Sorting */}
        <div className="d-flex justify-content-end mb-3">
          <select className="form-select w-auto" onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="default">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
        <div className="container py-4">
        <div className="row g-4">
          {(filtered || []).map((product) => (
            <div className="col-md-3 col-sm-6" key={product.id}>
              <ProductCard {...product} />
            </div>
          ))}
          {(filtered || []).length === 0 && (
            <div className="text-center text-muted py-5">No products found.</div>
          )}
        </div>
        </div>
        
        
      </div>
      
    </div>
    
  );
  
  
};

export default ProductListing;

