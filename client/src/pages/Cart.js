import React from "react";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import QuantitySelector from "../components/ui/QuantitySelector";
import LazyImage from "../components/ui/LazyImage";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, loading } = useCart();
  const { user } = useAuth();

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const shipping = cart.length > 0 ? 0 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    navigate("/checkout");
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center text-luxury-black">Loading your cart...</div>;
  }

  if (!cart.length) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-luxury-pearl text-luxury-gold">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="font-display text-4xl text-luxury-black">Your cart is waiting for something beautiful.</h1>
        <p className="mt-4 text-sm leading-7 text-luxury-black/65">
          Discover signature designs, premium gifting pieces, and everyday jewellery with a luxury editorial feel.
        </p>
        <Link to="/Collection" className="mt-8">
          <Button>Explore Collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-luxury-ivory">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-luxury-gold">Shopping Bag</p>
            <h1 className="mt-3 font-display text-4xl text-luxury-black">Your curated selections</h1>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm uppercase tracking-[0.24em] text-luxury-black/60 transition hover:text-luxury-gold"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="overflow-hidden rounded-[32px] border border-luxury-line bg-white shadow-luxury">
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_0.3fr] gap-4 border-b border-luxury-line px-6 py-5 text-xs uppercase tracking-[0.28em] text-luxury-black/45 md:grid">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
              <span />
            </div>

            <div className="divide-y divide-luxury-line">
              {cart.map((item) => (
                <div key={item.productId} className="grid gap-6 px-6 py-6 md:grid-cols-[1.5fr_1fr_1fr_0.3fr] md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-28 w-24 overflow-hidden rounded-[24px] bg-luxury-pearl">
                      <LazyImage src={item.image} alt={item.name} className="transition duration-500 hover:scale-105" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-luxury-black/45">{item.category}</p>
                      <h2 className="mt-2 font-display text-2xl text-luxury-black">{item.name}</h2>
                      <p className="mt-2 text-sm text-luxury-black/60">Rs. {Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.28em] text-luxury-black/45 md:hidden">Quantity</p>
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(nextValue) => {
                        if (nextValue > item.quantity) {
                          increaseQuantity(item.productId);
                        } else if (nextValue < item.quantity) {
                          decreaseQuantity(item.productId);
                        }
                      }}
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.28em] text-luxury-black/45 md:hidden">Total</p>
                    <p className="text-lg font-semibold text-luxury-black">
                      Rs. {(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-luxury-line text-luxury-black transition hover:border-red-300 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-luxury-line bg-white p-8 shadow-luxury">
            <h2 className="font-display text-3xl text-luxury-black">Order Summary</h2>
            <div className="mt-8 space-y-4 text-sm text-luxury-black/65">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-luxury-black">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-luxury-black">Free</span>
              </div>
              <div className="border-t border-luxury-line pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-luxury-black">Total</span>
                  <span className="text-2xl font-semibold text-luxury-black">Rs. {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="mt-8 w-full" onClick={handleCheckout}>
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Link to="/Collection" className="mt-4 block">
              <Button variant="secondary" className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
