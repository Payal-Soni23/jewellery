import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/main.js';
import ContactUs from '../pages/ContactUs.js';
import AboutUs from '../pages/AboutUs.js';
import ProductDetail from '../pages/ProductDetail.js';
import Cart from '../pages/Cart';
import ExplorePage from '../pages/ExplorePage.js';
import GoldJewelryPage from '../pages/GoldJewelryPage.js';
import DiamondJewelryPage from '../pages/DiamondJewelryPage';
import SimpleProductListing from '../pages/SimpleProductListing';
import SilverJewelryPage from '../pages/SilverJewelryPage.js';
import DailyWearPage from '../pages/DailyWearPage.js';
import CheckoutPage from '../pages/Checkout.js';
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { Login, Register } from "../components/AuthPage.jsx";
import OrdersPage from '../pages/OrdersPage.js';
import AdminProductPage from '../pages/AdminProductPage.js';
import AdminRoute from '../components/AdminRoute.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/Collection" element={<ExplorePage />} />
      <Route path="/collection" element={<ExplorePage />} />
      <Route path="/Collection/:name" element={<ProductDetail />} />
      <Route path="/Basket" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/admin/products" element={<AdminRoute><AdminProductPage /></AdminRoute>} />
      <Route path="/about us" element={<AboutUs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/gold" element={<GoldJewelryPage />} />
      <Route path="/diamond" element={<DiamondJewelryPage />} />
      <Route path="/silver" element={<SilverJewelryPage />} />
      <Route path="/daily wear" element={<DailyWearPage />} />
      <Route path="/daily-wear" element={<DailyWearPage />} />
      <Route path="/gold/rings" element={<SimpleProductListing type="gold" category="Ring" />} />
      <Route path="/gold/earrings" element={<SimpleProductListing type="gold" category="Earring" />} />
      <Route path="/gold/bracelets" element={<SimpleProductListing type="gold" category="Bracelet" />} />
      <Route path="/diamond/rings" element={<SimpleProductListing type="diamond" category="Ring" />} />
      <Route path="/diamond/earrings" element={<SimpleProductListing type="diamond" category="Earring" />} />
      <Route path="/diamond/bracelets" element={<SimpleProductListing type="diamond" category="Bracelet" />} />
      <Route path="/silver/rings" element={<SimpleProductListing type="silver" category="Ring" />} />
      <Route path="/silver/earrings" element={<SimpleProductListing type="silver" category="Earring" />} />
      <Route path="/silver/bracelets" element={<SimpleProductListing type="silver" category="Bracelet" />} />
    </Routes>
  );
};

export default AppRoutes;
