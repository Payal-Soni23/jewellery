import React, { useState } from "react";

import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    town: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  });

  const [shipping, setShipping] = useState("free");
  const { cart } = useCart();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = shipping === "free" ? 0 : 50;
  const total = subtotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    // Here you can send `formData` + `cart` + `shipping` to backend API
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5" style={{fontFamily: '"Playfair Display", serif',}}>Checkout</h2>
      <div className="row">
        {/* Left Block - Customer Form */}
        <div className="col-md-7">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Customer Details</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label>Street Address</label>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Town</label>
                  <input
                    type="text"
                    name="town"
                    className="form-control"
                    value={formData.town}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          </div>
        </div>

        {/* Right Block - Order Summary */}
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Your Order</h4>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between"
                >
                  {item.name} × {item.quantity}
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <strong>Subtotal</strong>
                <span>₹{subtotal.toFixed(2)}</span>
              </li>
              <li className="list-group-item">
                <h6>Shipping Options</h6>
                <div className="form-check">
                  <input
                    type="radio"
                    id="free"
                    value="free"
                    name="shipping"
                    className="form-check-input"
                    checked={shipping === "free"}
                    onChange={() => setShipping("free")}
                  />
                  <label htmlFor="free" className="form-check-label">
                    Free Shipping (₹0)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="express"
                    value="express"
                    name="shipping"
                    className="form-check-input"
                    checked={shipping === "express"}
                    onChange={() => setShipping("express")}
                  />
                  <label htmlFor="express" className="form-check-label">
                    Express Delivery (₹50)
                  </label>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total</strong>
                <span>₹{total.toFixed(2)}</span>
              </li>
            </ul>
            <button className="btn btn-danger w-100" onClick={handleSubmit}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
