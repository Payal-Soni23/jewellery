import React, { useMemo, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

const collections = [
  { label: "New Arrivals", path: "/Collection" },
  { label: "Gold", path: "/gold" },
  { label: "Diamond", path: "/diamond" },
  { label: "Silver", path: "/silver" },
  { label: "Daily Wear", path: "/daily-wear" },
];

const quickLinks = [
  { label: "About", path: "/about", Icon: FaInfoCircle },
  { label: "Contact", path: "/contact", Icon: FaPhoneAlt },
];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  const wishlistCount = wishlistItems.length;

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/collection?search=${encodeURIComponent(query)}` : "/collection");
    setMobileOpen(false);
  };

  const handleUserNavigation = () => {
    navigate(isAuthenticated ? "/dashboard" : "/login");
    setMobileOpen(false);
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
          {quickLinks.map(({ label, path, Icon }) => (
            <Link
              key={path}
              to={path}
              aria-label={label}
              title={label}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm transition ${
                location.pathname.toLowerCase() === path
                  ? "border-luxury-gold bg-luxury-gold/10 text-luxury-gold"
                  : "border-white/10 text-white hover:border-luxury-gold hover:bg-white/5 hover:text-luxury-gold"
              }`}
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}

          <Link
            to="/favourites"
            aria-label="Favourites"
            title="Favourites"
            className={`relative hidden h-11 w-11 items-center justify-center rounded-full border transition sm:inline-flex ${
              location.pathname.toLowerCase() === "/favourites"
                ? "border-luxury-gold bg-luxury-gold/10 text-luxury-gold"
                : "border-white/10 text-white hover:border-luxury-gold hover:text-luxury-gold"
            }`}
          >
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex min-h-[1.4rem] min-w-[1.4rem] items-center justify-center rounded-full bg-luxury-gold px-1 text-[10px] font-bold text-luxury-black">
                {wishlistCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={handleUserNavigation}
            aria-label={isAuthenticated ? "Dashboard" : "Login"}
            title={isAuthenticated ? `Dashboard${user?.name ? ` - ${user.name}` : ""}` : "Login"}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${
              location.pathname.toLowerCase() === "/dashboard"
                ? "border-luxury-gold bg-luxury-gold/10 text-luxury-gold"
                : "border-white/10 text-white hover:border-luxury-gold hover:text-luxury-gold"
            }`}
          >
            <User className="h-4 w-4" />
          </button>

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
            {quickLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.24em] text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/favourites"
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.24em] text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              Favourites
            </Link>
            <button
              type="button"
              onClick={handleUserNavigation}
              className="rounded-2xl px-4 py-3 text-left text-sm uppercase tracking-[0.24em] text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              {isAuthenticated ? "Dashboard" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
