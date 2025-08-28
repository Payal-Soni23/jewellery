// // src/components/common/Footer.js
//  </footer> */}
    import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-12 col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">About Us</h5>
            <p className="small ">
              We craft timeless diamond & gold jewellery with unmatched
              craftsmanship and elegance. Discover designs that shine forever.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2 mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration- none text-white">Home</a></li>
              <li><a href="/Collection" className="text-decoration- none text-white">Explore</a></li>
              <li><a href="/about us" className="text-decoration- none text-white">About</a></li>
              <li><a href="/contactUs" className="text-decoration- none text-white">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-6 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="/faq" className="text-decoration-none text-white">FAQ</a></li>
              <li><a href="/shipping" className="text-decoration-none text-white">Shipping & Returns</a></li>
              <li><a href="/privacy" className="text-decoration-none text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-decoration-none text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-light fs-5">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" className="text-light fs-5">
                <FaInstagram />
              </a>
              <a href="https://wa.me/1234567890" className="text-light fs-5">
                <FaWhatsapp />
              </a>
              <a href="https://twitter.com" className="text-light fs-5">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-top pt-3 text-center small  ">
          © {new Date().getFullYear()} . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
