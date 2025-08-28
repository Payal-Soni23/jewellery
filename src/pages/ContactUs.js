import React, { useState } from 'react';

export default function ContactUs() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    e.target.reset(); // Clear form

    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3s
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#f9f6f2" }}>
      <h2 className="text-center mb-4 fw-bold" style={{ color: '#a68a64' }}>
        Contact Us
      </h2>

      <div className="row g-5 justify-content-center">
        {/* Contact Form */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea className="form-control" id="message" rows="5" placeholder="Write your message here..." required></textarea>
            </div>

            <button type="submit" className="btn" style={{ backgroundColor: '#a68a64', color: 'white' }}>
              Send Message
            </button>
          </form>

          {/* Toast Notification */}
          {showToast && (
            <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
              <div className="toast show text-white bg-success border-0">
                <div className="d-flex">
                  <div className="toast-body">✅ Message sent successfully!</div>
                  <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)}></button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Info + Google Map */}
        <div className="col-md-6">
          <div className="mb-4">
            <h5 style={{ color: '#a68a64' }}>📍 Address</h5>
            <p>123 Gold Street, Dubai, UAE</p>
          </div>

          <div className="mb-4">
            <h5 style={{ color: '#a68a64' }}>📞 Phone</h5>
            <p>+971 55 123 4567</p>
          </div>

          <div className="mb-4">
            <h5 style={{ color: '#a68a64' }}>📧 Email</h5>
            <p>support@yourjewelrysite.com</p>
          </div>

          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115693.79570832087!2d55.1712796!3d25.0742821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434effb5c38b%3A0x61e2d2e646a0281!2sGold%20Souk%20Dubai!5e0!3m2!1sen!2sae!4v1710534702441"
              title="Google Map"
              allowFullScreen=""
              loading="lazy"
              style={{ border: "0" }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
