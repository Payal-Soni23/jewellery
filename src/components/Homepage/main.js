// src/components/Homepage/Main.js
import React from 'react';
import './main.css';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'; // or use your own carousel

import mainBanner from '../../assets/images/banner/main-banner.png'; // moved image to proper path
import SpotlightCarousel from './SpotlightImage/SpotlightCarousel';
import badge from '../../assets/images/aboutimg/Selection (4).png';
import bulb from '../../assets/images/aboutimg/Selection (5).png';
import diamond from '../../assets/images/aboutimg/Selection.png';
import star from '../../assets/images/aboutimg/Selection (1).png';
import sideBanner from '../../assets/images/banner/goldsideimg2-3.jpg';
import maingoldring from '../../assets/images/rings/maingoldring.jpg';
import maingoldbracelet from '../../assets/images/bracelets/maingoldbracelet.jpg';
import maingoldearing from '../../assets/images/earings/maingoldearing.jpg';
import maingoldpendent from '../../assets/images/neckpeice/maingoldpendent.jpg';
import diamondBraceletImg from '../../assets/images/bracelets/diamond bracelet1.jpg';
import diamondEarringImg from '../../assets/images/earings/diamond earings1.jpg';
// import diamondMainImage from '../../assets/images/banner/diamond.webp';
import diamondPendantImg from '../../assets/images/neckpeice/diamond pendent 4.jpeg';
import diamondRingImg from '../../assets/images/rings/diamond ring.webp';


export default function Main({ activeDropdown }) {
  return (
    <div style={{backgroundColor:'rgb(249 249 249)'}}>
      {/* Hero Banner */}
      <div className="position-relative pb-5">
        <img
          src={mainBanner}
          className="img-fluid w-100"
          alt="Luxury Jewelry"
          style={{ height: "500px", objectFit: "cover" }}
        />

        <div
          className="position-absolute top-50 start-50 translate-middle text-white text-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "30px",
            borderRadius: "20px",
            maxWidth: "90%",
            zIndex: 2,
          }}
        >
          <h1 className="display-5 fw-bold" style={{ color: "#dccebe" }}>
            Timeless Elegance
          </h1>
          <p className="lead">
            Discover luxury crafted to perfection with our exclusive gold collection.
          </p>
          <Link to="/Collection">
            <button className="btn btn-lg mt-3" style={{ backgroundColor: "#a68a64", color: "#fff" }}>
              Explore Collection
            </button>
          </Link>
        </div>
      </div>

      {/* Carousel Below Hero */}
      <div className="m-0 py-5">
        <SpotlightCarousel />
      </div>
    <div className="container-fluid m-0 py-5" style={{ backgroundColor: 'rgb(249, 249, 249)' }}>
  <div className="row">
    {/* Left side banner (hidden on small screens) */}
    <div className="col-12 col-md-4 d-none d-md-flex justify-content-center align-items-center mb-3 mb-md-0">
      <img 
        src={sideBanner} 
        className="img-fluid h-100" 
        alt="gold side banner" 
        style={{ objectFit: 'cover' }} 
      />
    </div>

    {/* Right side content */}
    <div className="col-12 col-md-8 d-flex flex-column p-2" style={{ fontFamily: "nunito_sansregular" }}>
      <h1 className="text-start text-md-center p-2" style={{ color: '#4a4a4a' }}>
        <b>Gold Jewellery</b>
      </h1>
      <h3 className="text-start text-md-center pb-4">
        Jewellery pieces everyone’s eyeing right now
      </h3>

      {/* Grid of products */}
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="row w-100 mb-3">
          <div className="col-6 d-flex justify-content-center">
            <div className="image-container">
              <img src={maingoldring} alt="gold rings" className="jewellery-img" />
              <span className="overlay-text">Gold Ring</span>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <div className="image-container">
              <img src={maingoldbracelet} alt="gold bracelet" className="jewellery-img" />
              <span className="overlay-text">Bracelet</span>
            </div>
          </div>
        </div>

        <div className="row w-100 mt-5">
          <div className="col-6 d-flex justify-content-center">
            <div className="image-container">
              <img src={maingoldearing} alt="gold earring" className="jewellery-img" />
              <span className="overlay-text">Earring</span>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <div className="image-container">
              <img src={maingoldpendent} alt="gold pendant" className="jewellery-img" />
              <span className="overlay-text">Pendant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* diamond jewellery */}
        <div class="experience-component experience-commerce_assets-heading">

        <div class="container   ">
            <div class="heading-component-main-container">
                <h1  style={{  color: '#4a4a4a' }} ><b>Diamond Jewelry</b></h1>
                <h4 className=' py-3 d-none d-sm-flex'>Styling 101 With Diamonds Trendsetting diamond jewellery suited for every occasion
                 Festival of Diamonds 
                </h4>
            </div>
        </div>
        </div>
        <div class="hp-tq-pillars-outer d-lg-flex d-md-flex ">
            <div class="hp-tq-pillars-inner-two">
                <div class="position-relative">
                    <Link to="">
                        <img alt="banner" loading="lazy" class="aspect-one img-fluid w-100 br-12" src={diamondRingImg} title=""/>
                        <div class="hp-tq-pillars-heading">
                            <h2 class="hp-tq-pillars-heading-h2">Diamond Rings</h2>
                        </div>
                    </Link>
                </div>
                <div class="position-relative">
                    <Link to="">
                        <img alt="banner" loading="lazy" class="aspect-two img-fluid w-100 br-12" src={diamondPendantImg} title=""/>
                        <div class="hp-tq-pillars-heading">
                            <h2 class="hp-tq-pillars-heading-h2">Diamond Neckpendent</h2>
                        </div>
                    </Link>
                </div>
            </div>
            <div class="hp-tq-pillars-inner-three">
                <div class="position-relative">
                    <Link to="">
                        <img alt="banner" loading="lazy" class="aspect-two img-fluid w-100 br-12" src={diamondEarringImg} title=""/>
                        <div class="hp-tq-pillars-heading">
                            <h2 class="hp-tq-pillars-heading-h2">Diamond Earings</h2>
                        </div>
                    </Link>
                </div>
                <div class="position-relative">
                    <Link to="">
                        <img alt="banner" loading="lazy" class="aspect-one img-fluid w-100 br-12" src={diamondBraceletImg} title=""/>
                        <div class="hp-tq-pillars-heading">
                            <h2 class="hp-tq-pillars-heading-h2">Diamond Bracelets</h2>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

          {/* end experience */}
      <div className="p-5">
  <h2
    className="d-flex justify-content-center align-items-start mb-4"
    style={{ flex: 1, color: "#4a4a4a" }}
  >
    <b>THE EXPERIENCES</b>
  </h2>

  <div className="row">
    <div className="col-12 col-sm-6 col-lg-3 text-center fst-italic mb-4 px-3 border">
      <div><img src={badge} alt="" className="img-fluid mb-2" /></div>
      <div className="fw-bold">Timeless Elegance</div>
      <div>
        Our designs transcend fleeting trends, offering classic sophistication
        that remains cherished for generations
      </div>
    </div>

    <div className="col-12 col-sm-6 col-lg-3 text-center fst-italic mb-4 px-3 border">
      <div><img src={bulb} alt="" className="img-fluid mb-2" /></div>
      <div className="fw-bold">Innovation & Vision</div>
      <div>
        We constantly evolve, blending traditional techniques with contemporary
        innovation to create truly unique and captivating designs.
      </div>
    </div>

    <div className="col-12 col-sm-6 col-lg-3 text-center fst-italic mb-4 px-3 border">
      <div><img src={diamond} alt="" className="img-fluid mb-2" /></div>
      <div className="fw-bold">Unrivaled Craftsmanship</div>
      <div>
        Every piece is a testament to the skill and dedication of our master
        artisans, handcrafted with meticulous attention to detail.
      </div>
    </div>

    <div className="col-12 col-sm-6 col-lg-3 text-center fst-italic mb-4 px-3 border">
      <div><img src={star} alt="" className="img-fluid mb-2" /></div>
      <div className="fw-bold">Exceptional Quality</div>
      <div>
        We source only the finest, ethically-mined gemstones and precious
        metals, ensuring each jewel radiates enduring beauty.
      </div>
    </div>
  </div>
</div>


      
    </div>
  );
}
