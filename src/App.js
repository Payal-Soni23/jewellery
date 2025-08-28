
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router  } from 'react-router-dom';

import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';
// import { Link } from 'react-router-dom';

function App() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  // const dropdownRef = useRef();


  

  return (
    <>
     <Router >
      <Navbar activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />

      <AppRoutes activeDropdown={activeDropdown} />

      <Footer />
    </Router>
    </>
  );
}

export default App;
