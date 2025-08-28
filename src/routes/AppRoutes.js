// src/routes/AppRoutes.js
import React from 'react';
import {  Routes, Route } from 'react-router-dom';

import Main from '../components/Homepage/main.js'
import ContactUs from '../pages/ContactUs.js';
import ProductListing from '../components/product/ProductListing.js';
import AboutUs from '../pages/AboutUs.js';
import ProductDetail from '../components/product/ProductDetail.js';
import Cart from '../pages/Cart';  
import ExplorePage from '../components/product/ExplorePage.js';
import GoldJewelryPage from '../components/product/GoldJewelryPage.js';
import DiamondJewelryPage from '../components/product/DiamondJewelryPage';
import SimpleProductListing from '../components/product/SimpleProductListing';
import SilverJewelryPage from '../components/product/SilverJewelryPage.js'
import DailyWearPage from '../components/product/DailyWearPage.js';
import CheckoutPage from '../pages/Checkout.js';


const AppRoutes = ({ activeDropdown }) => {
  return (
    
        <Routes>
            <Route path="/" element={<Main activeDropdown={activeDropdown} />} />
            <Route path="/contactUs" element={<ContactUs />} />
            {/* <Route path="/Collection" element={<ProductListing />} /> */}
            <Route path="/Collection/:name" element={<ProductDetail />} />
            <Route path="/Basket" element={<Cart />} />
            <Route path="/Checkout" element={<CheckoutPage />} />
            <Route path="/about us" element={<AboutUs />} />
            <Route path="/Collection" element={<ExplorePage />} />
            <Route path="/gold" element={<GoldJewelryPage />} />
            <Route path="/diamond" element={<DiamondJewelryPage />} />
            {/* <Route path="/silver" element={<SilverJewelryPage />} /> */}
            <Route path="/silver" element={<SilverJewelryPage />} />
            <Route path="/daily wear" element={<DailyWearPage />} />
            <Route path="/gold/rings" element={<SimpleProductListing type="gold" category="Ring" />} />
            <Route path="/gold/earrings" element={<SimpleProductListing type="gold" category="Earring" />} />
            {/* Subcategories
      <Route path="/gold/:sub" element={<ProductListing category="Gold" />} />
      <Route path="/diamond/:sub" element={<ProductListing category="Diamond" />} /> */}
        </Routes>
    
  );
};

export default AppRoutes;
