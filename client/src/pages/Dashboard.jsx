import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, userId, logout } = useAuth();
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
        setLoading(true);
        const data = await fetchOrders(userId);
        setOrders(data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load order history");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [userId]);

  return (
    <div className="bg-luxury-ivory">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-luxury-black/45">Account</p>
          <h1 className="mt-3 font-display text-4xl text-luxury-black">Dashboard</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-luxury-black/65">
            View your profile, track previous purchases, and manage your session in one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-luxury-line bg-white p-6 shadow-luxury">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-luxury-black/45">User Info</p>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-luxury-black/45">Name</p>
                <p className="mt-2 text-lg font-semibold text-luxury-black">{user?.name || "Guest User"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-luxury-black/45">Email</p>
                <p className="mt-2 text-sm text-luxury-black/70">{user?.email || "No email available"}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-luxury-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-luxury-gold hover:text-luxury-black"
            >
              Logout
            </button>
          </aside>

          <div className="rounded-[28px] border border-luxury-line bg-white p-6 shadow-luxury">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-luxury-black/45">Order History</p>
                <h2 className="mt-2 font-display text-3xl text-luxury-black">Recent orders</h2>
              </div>
              <Link
                to="/favourites"
                className="rounded-full border border-luxury-line px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-luxury-black transition hover:border-luxury-gold hover:text-luxury-gold"
              >
                View Favourites
              </Link>
            </div>

            {loading ? <div className="py-5 text-sm text-luxury-black/65">Loading orders...</div> : null}
            {error ? <div className="mb-4 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div> : null}

            {!loading && !error && orders.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-luxury-line bg-luxury-pearl px-6 py-12 text-center">
                <p className="font-display text-2xl text-luxury-black">No orders yet</p>
                <p className="mt-3 text-sm text-luxury-black/65">Once you place an order, it will appear here.</p>
              </div>
            ) : null}

            <div className="space-y-4">
              {orders.map((order) => (
                <article key={order._id} className="rounded-[24px] border border-luxury-line bg-luxury-pearl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-luxury-black">Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <p className="mt-1 text-sm text-luxury-black/60">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-luxury-black/70">
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {order.products.map((product) => (
                      <div key={`${order._id}-${product.productId}`} className="flex items-center justify-between gap-3 border-t border-black/5 pt-3 first:border-t-0 first:pt-0">
                        <div>
                          <p className="text-sm font-semibold text-luxury-black">{product.name}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-luxury-black/45">Qty {product.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-luxury-black">Rs. {(Number(product.price) * Number(product.quantity)).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-black/5 pt-4 text-right text-sm font-semibold text-luxury-black">
                    Total: Rs. {Number(order.totalAmount).toFixed(2)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
