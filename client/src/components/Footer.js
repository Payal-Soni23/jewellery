import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-luxury-line bg-luxury-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-luxury-gold">Krishna Jewellers</p>
          <h3 className="font-display text-3xl">Jewellery designed to be remembered.</h3>
          <p className="text-sm leading-7 text-white/65">
            Modern heirlooms, luminous diamonds, and precious metal finishes curated with the restraint and elegance of a luxury maison.
          </p>
        </div>

        <div>
          <h4 className="mb-5 text-sm uppercase tracking-[0.28em] text-luxury-gold">Shop</h4>
          <div className="space-y-3 text-sm text-white/70">
            <Link className="block transition hover:text-white" to="/Collection">All Jewellery</Link>
            <Link className="block transition hover:text-white" to="/gold">Gold</Link>
            <Link className="block transition hover:text-white" to="/diamond">Diamond</Link>
            <Link className="block transition hover:text-white" to="/silver">Silver</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-sm uppercase tracking-[0.28em] text-luxury-gold">Support</h4>
          <div className="space-y-3 text-sm text-white/70">
            <Link className="block transition hover:text-white" to="/orders">Track Orders</Link>
            <Link className="block transition hover:text-white" to="/contact">Consultation</Link>
            <Link className="block transition hover:text-white" to="/about-us">About Us</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-sm uppercase tracking-[0.28em] text-luxury-gold">Follow</h4>
          <div className="flex items-center gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, index) => (
              <a
                key={index}
                href="/"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-luxury-gold hover:text-luxury-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs uppercase tracking-[0.24em] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} Krishna Jewellers</span>
          <span>Crafted for timeless elegance</span>
        </div>
      </div>
    </footer>
  );
}
