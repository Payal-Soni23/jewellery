import React, { useMemo, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const collections = [
  { label: "New Arrivals", path: "/Collection" },
  { label: "Gold", path: "/gold" },
  { label: "Diamond", path: "/diamond" },
  { label: "Silver", path: "/silver" },
  { label: "Daily Wear", path: "/daily-wear" },
];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/collection?search=${encodeURIComponent(query)}` : "/collection");
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-luxury-black/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 lg:flex-1">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-luxury-gold hover:text-luxury-gold lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="font-display text-2xl tracking-[0.18em] text-white sm:text-3xl">
            Krishna
          </Link>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {collections.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm uppercase tracking-[0.24em] transition ${
                location.pathname.toLowerCase().startsWith(item.path.toLowerCase())
                  ? "text-luxury-gold"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden flex-1 items-center justify-center lg:flex"
        >
          <div className="flex w-full max-w-xl items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white transition focus-within:border-luxury-gold">
            <Search className="h-4 w-4 text-luxury-gold" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for rings, pendants, diamonds..."
              className="ml-3 w-full bg-transparent text-sm placeholder:text-white/45 focus:outline-none"
            />
          </div>
        </form>

        <div className="flex items-center justify-end gap-2 lg:flex-1">
          <button
            type="button"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-luxury-gold hover:text-luxury-gold sm:inline-flex"
          >
            <Heart className="h-4 w-4" />
          </button>

          {user ? (
            <div className="group relative">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-luxury-gold hover:text-luxury-gold"
              >
                <User className="h-4 w-4" />
              </button>
              <div className="invisible absolute right-0 top-14 w-52 rounded-3xl border border-luxury-line bg-white p-3 opacity-0 shadow-luxury transition duration-200 group-hover:visible group-hover:opacity-100">
                <p className="px-3 py-2 text-sm font-semibold text-luxury-black">{user.name}</p>
                <Link to="/orders" className="block rounded-2xl px-3 py-2 text-sm text-luxury-black/70 transition hover:bg-luxury-pearl hover:text-luxury-black">
                  My Orders
                </Link>
                {user.role === "admin" ? (
                  <Link to="/admin/products" className="block rounded-2xl px-3 py-2 text-sm text-luxury-black/70 transition hover:bg-luxury-pearl hover:text-luxury-black">
                    Admin Panel
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 block w-full rounded-2xl px-3 py-2 text-left text-sm text-luxury-black/70 transition hover:bg-luxury-pearl hover:text-luxury-black"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-luxury-gold hover:text-luxury-gold"
            >
              <User className="h-4 w-4" />
            </Link>
          )}

          <Link
            to="/Basket"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-luxury-gold hover:text-luxury-gold"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 inline-flex min-h-[1.4rem] min-w-[1.4rem] items-center justify-center rounded-full bg-luxury-gold px-1 text-[10px] font-bold text-luxury-black">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      <div className={`${mobileOpen ? "max-h-[28rem] border-t border-white/10" : "max-h-0"} overflow-hidden bg-luxury-black transition-all duration-300 lg:hidden`}>
        <div className="space-y-4 px-4 py-5">
          <form onSubmit={handleSearchSubmit}>
            <div className="flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white">
              <Search className="h-4 w-4 text-luxury-gold" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search jewellery..."
                className="ml-3 w-full bg-transparent text-sm placeholder:text-white/45 focus:outline-none"
              />
            </div>
          </form>

          <div className="grid gap-2">
            {collections.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.24em] text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.24em] text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
