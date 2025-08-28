// src/components/common/Navbar.js
// import React from 'react';
import { Link } from 'react-router-dom';

// import { useState } from "react";
//  import { useCart } from '../../context/CartContext';
import "./Navbar.css"; // for dropdown CSS

const types = ["Gold", "Diamond", "Silver", "Daily Wear","About Us"];


export default function Navbar({ activeDropdown, setActiveDropdown }) {

  return (
    <> 

<nav className="navbar custom-navbar navbar-expand-md " style={{display:'block'}}>
  <div className="container-fluid w-100 d-flex justify-content-between align-items-center">
    <button
      className="navbar-toggler me-2"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarMenu"
      aria-controls="navbarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    {/* --- Left: Search --- */}
    <div className="d-flex align-items-center">
      <ul className="navbar-nav flex-row gap-3">
        <li className="nav-item search-container">
          <a href="/" className="nav-link" aria-label="search">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" style={{ fill: "#4a4a4a" }}>
              <path d="M26.3,23.2c-0.2,0.2-0.7,0.6-1.1,0.7s-0.8-0.2-1-0.4c-0.2-0.2-2-2.3-2-2.3l-4.3-4.8C19.2,15,20,13,20,10.9
                                    c0-4.7-3.8-8.5-8.5-8.5S3,6.2,3,10.9s3.8,8.5,8.5,8.5c1.8,0,3.5-0.6,4.9-1.6l4.3,4.8c0,0,1.9,2.1,2,2.3c0.2,0.2,0.4,0.6,0.3,1
                                    c-0.1,0.3-0.6,0.8-0.8,1c-0.3,0.3,0.2,0.9,0.6,0.6l2.1-1.8l2.1-1.8C27.3,23.6,26.7,23,26.3,23.2z M3.9,10.9c0-4.2,3.4-7.6,7.6-7.6
                                    s7.6,3.4,7.6,7.6s-3.4,7.6-7.6,7.6S3.9,15.1,3.9,10.9z"/>
                  </svg>
          </a>
          <input type="text" placeholder="Search..." className="search-input" />
        </li>
      </ul>
    </div>

    {/* --- Center: Brand --- */}
    <Link className="navbar-brand mx-auto" to="/" style={{ fontFamily: '"Playfair Display", serif' }}>
      Krishna Jewellers
    </Link>

    {/* --- Right: Contact + Basket + Hamburger --- */}
    <div className="d-flex align-items-center gap-3">
      <Link to="/Contact" className="nav-link fw-bold" style={{ color: "#4a4a4a" }}>
        <span className="icon-link--contact-us">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" style={{ fill: '#4a4a4a' }}>
                    <path d="M26.1,22.8H3.9c-1,0-2.5,2.3-2.5,3.2c0,0.2,0,0.3,0.1,0.4s0.3,0.2,0.4,0.2H28c0.2,0,0.3-0.1,0.4-0.2s0.1-0.2,0.1-0.4
                                    C28.6,25.1,27,22.8,26.1,22.8z M2.2,25.8c0.1-0.3,0.4-1,1-1.6c0.4-0.5,0.7-0.7,0.8-0.7h22.2c0.1,0,0.3,0.1,0.8,0.7s0.9,1.3,1,1.6
                                    H2.2z M4.4,21.5h21.4c0.3,0,0.7-0.1,0.9-0.4c0.2-0.3,0.3-0.6,0.3-0.9c-0.4-5.6-4.6-10-10.1-10.8c-0.2-0.2-0.8-1-0.8-2.5
                                    c0-1.4,1-2.3,1.3-2.4c0.3-0.2,1-0.2,1.2-0.2c0.4,0,0.5-0.9,0-0.9l0,0h-7c-0.5,0-0.5,0.8,0,0.9c0.3,0,0.9,0,1.2,0.2
                                    c0.3,0.1,1.4,0.7,1.4,2.3c0,1.4-0.5,2.3-0.7,2.6C8,10,3.7,14.6,3.2,20.2c0,0.3,0.1,0.7,0.3,0.9C3.8,21.4,4.1,21.5,4.4,21.5z
                                    M13.6,10L13.6,10c0.1,0,0.6-0.1,1.5-0.1s1.5,0.1,1.6,0.2l0,0c5.1,0.8,9.1,5,9.5,10.2c0,0.1,0,0.3-0.1,0.4s-0.2,0.1-0.3,0.1H4.4
                                    c-0.1,0-0.2-0.1-0.3-0.1C4,20.5,4,20.4,4,20.2C4.4,15,8.5,10.7,13.6,10z"/>
                  </svg>
                </span>
      </Link>

      <Link to="/Basket" className="nav-link" aria-label="basket">
        <svg width="30" height="30" className="bi bi-bag" style={{ fill: "#4a4a4a" }}>
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
        </svg>
      </Link>

    </div>
  </div>
  {/* --- Second row: collapsible menu --- */}
  
  <div className="collapse navbar-collapse mt-2" id="navbarMenu" >
    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-5 text-center">
      {types.map((label) => {
        const hasDropdown = ["Gold", "Diamond", "Silver"].includes(label);
        const path = `/${label.toLowerCase()}`;

        return (
          <li
            key={label}
            className={`nav-item ${hasDropdown ? "dropdown" : ""}`}
            onMouseEnter={() => hasDropdown && setActiveDropdown(label)}
            onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
          >
            <Link to={path} className="nav-link fw-bold" style={{ color: "#4a4a4a" }}>
              {label}
            </Link>

            {hasDropdown && activeDropdown === label && (
              <ul className="dropdown-menu show">
                <li><Link to={`${path}/rings`} className="dropdown-item">{label} Rings</Link></li>
                <li><Link to={`${path}/earrings`} className="dropdown-item">{label} Earrings</Link></li>
                <li><Link to={`${path}/bracelets`} className="dropdown-item">{label} Bracelets</Link></li>
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  </div>
</nav>
     </>
  )
}