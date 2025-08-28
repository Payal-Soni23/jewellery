import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const total = cart.reduce(
  (sum, item) => sum + parseFloat(item.price.toString().replace(/[^\d.]/g, '')) * item.quantity,
  0
);


  return (

    <div className="container py-5">
      <h1 className="text-center mb-5" style={{fontFamily: '"Playfair Display", serif',}}>Your Basket</h1>

      {cart.length === 0 ? (
        <p className="text-center">Your Basket is empty.</p>
      ) : (
        <div className="row">
          {/* Left Block - Cart Items */}
          <div className="col-md-7">
            <ul className="list-group mb-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex align-items-center"
                >
                  {/* Product Image */}
                  <img
                    src={item.images}
                    alt={item.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "15px" }}
                  />

                  {/* Product Info */}
                  <div className="flex-grow-1">
                    <strong>{item.name}</strong>
                    <br />
                    Price: ₹{item.price.toFixed(2)}
                    <br />
                    <small>Qty: {item.quantity}</small>
                  </div>
                

                  {/* Quantity Controls */}
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => increaseQuantity(item.id)}
                    > 
                      +
                    </button> 
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
                
              ))}
            </ul>
            <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
          </div>

          {/* Right Block - Basket Billing */}
          <div className="col-md-5">
            <div className="card p-4 shadow-sm">
              <h4 className="mb-3">Order Summary</h4>

              {/* Shipping Options */}
              <div className="mb-3">
                <h6>Shipping Options</h6>
                <div className="form-check">
                  <input
                    type="radio"
                    id="freeShipping"
                    name="shipping"
                    className="form-check-input"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="freeShipping">
                    Free Shipping (₹0)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="storePickup"
                    name="shipping"
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="storePickup">
                    Store Pickup (₹0)
                  </label>
                </div>
              </div>

              {/* Total Bill */}
              <h5>
                Total: ₹
                {cart.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                ).toFixed(2)}
              </h5>

              {/* Checkout Button */}
              
              <Link to='/Checkout' className="btn btn-danger w-100 mt-3">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
  </div>


  );
};

export default Cart;

