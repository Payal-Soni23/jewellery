import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/orders";
import { mapCartItemToOrderProduct, resolveProductId } from "../utils/product";

const validateCheckoutForm = ({ user, cart, formData }) => {
  if (!user) {
    return "Please log in to place your order";
  }

  if (!cart.length) {
    return "Your cart is empty. Add at least one product before placing an order.";
  }

  const requiredFields = [
    ["fullName", "Full name"],
    ["street", "Street address"],
    ["town", "Town"],
    ["state", "State"],
    ["country", "Country"],
    ["phone", "Phone number"],
    ["email", "Email address"],
  ];

  const missingField = requiredFields.find(
    ([key]) => !String(formData[key] || "").trim()
  );

  if (missingField) {
    return `${missingField[1]} is required.`;
  }

  const email = String(formData.email || "").trim();
  const phone = String(formData.phone || "").trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }

  if (phone.length < 10) {
    return "Please enter a valid phone number.";
  }

  return null;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [shipping, setShipping] = useState("free");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    street: "",
    town: "",
    state: "",
    country: "India",
    phone: "",
    email: user?.email || "",
  });

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const shippingCost = shipping === "free" ? 0 : 50;
  const totalAmount = subtotal + shippingCost;

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const validationError = validateCheckoutForm({ user, cart, formData });
      if (validationError) {
        throw new Error(validationError);
      }

      const products = cart.map(mapCartItemToOrderProduct);
      const orderData = {
        products,
        totalAmount: Number(totalAmount.toFixed(2)),
        shippingAddress: {
          fullName: formData.fullName.trim(),
          street: formData.street.trim(),
          town: formData.town.trim(),
          state: formData.state.trim(),
          country: formData.country.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
        },
      };

      await createOrder(orderData);
      await clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Checkout Error:", err);
      setError(err.response?.data?.message || err.message || "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5" style={{ fontFamily: '"Playfair Display", serif' }}>Checkout</h2>
      <div className="row">
        <div className="col-md-7">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Customer Details</h4>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label>Full Name</label>
                <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Street Address</label>
                <input type="text" name="street" className="form-control" value={formData.street} onChange={handleChange} required />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Town</label>
                  <input type="text" name="town" className="form-control" value={formData.town} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>State</label>
                  <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} required />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Country</label>
                  <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Phone Number</label>
                  <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label>Email Address</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
              </div>
              {error ? <div className="alert alert-danger">{error}</div> : null}
              {cart.length === 0 ? <div className="alert alert-warning">Your cart is empty. Add a product before placing an order.</div> : null}
              <button type="submit" className="btn btn-danger" disabled={submitting}>
                {submitting ? "Placing order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Your Order</h4>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li key={resolveProductId(item) || item.name} className="list-group-item d-flex justify-content-between">
                  {item.name} x {item.quantity}
                  <span>Rs. {(Number(item.price) * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <strong>Subtotal</strong>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </li>
              <li className="list-group-item">
                <h6>Shipping Options</h6>
                <div className="form-check">
                  <input type="radio" id="free" value="free" name="shipping" className="form-check-input" checked={shipping === "free"} onChange={() => setShipping("free")} />
                  <label htmlFor="free" className="form-check-label">Free Shipping (Rs. 0)</label>
                </div>
                <div className="form-check">
                  <input type="radio" id="express" value="express" name="shipping" className="form-check-input" checked={shipping === "express"} onChange={() => setShipping("express")} />
                  <label htmlFor="express" className="form-check-label">Express Delivery (Rs. 50)</label>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total</strong>
                <span>Rs. {totalAmount.toFixed(2)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
