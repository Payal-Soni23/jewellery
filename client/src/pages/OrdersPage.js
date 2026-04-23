import React, { useEffect, useState } from "react";
import { fetchOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext";

const OrdersPage = () => {
  const { user } = useAuth();
  const userId = user?.id || user?._id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        const data = await fetchOrders(userId);
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [userId]);

  if (loading) {
    return <div className="container py-5 text-center">Loading orders...</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>My Orders</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {orders.length === 0 ? <p>No orders yet.</p> : null}
      <div className="row g-4">
        {orders.map((order) => (
          <div className="col-12" key={order._id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
                  <div>
                    <h5 className="mb-1">Order #{order._id.slice(-6).toUpperCase()}</h5>
                    <small className="text-muted">{new Date(order.createdAt).toLocaleString()}</small>
                  </div>
                  <span className="badge text-bg-dark align-self-start">{order.status}</span>
                </div>
                <ul className="list-group list-group-flush">
                  {order.products.map((product) => (
                    <li key={`${order._id}-${product.productId}`} className="list-group-item px-0 d-flex justify-content-between">
                      <span>{product.name} x {product.quantity}</span>
                      <strong>Rs. {(product.price * product.quantity).toFixed(2)}</strong>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 fw-bold">Total: Rs. {Number(order.totalAmount).toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
