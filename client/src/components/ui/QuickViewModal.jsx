import React from "react";
import { Heart, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";
import LazyImage from "./LazyImage";
import RatingStars from "./RatingStars";

export default function QuickViewModal({ product, open, onClose, onAddToCart }) {
  if (!open || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[32px] bg-luxury-ivory shadow-luxury">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-luxury-line bg-white/90 p-2 text-luxury-black transition hover:border-luxury-gold hover:text-luxury-gold"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="bg-luxury-pearl p-6">
            <div className="overflow-hidden rounded-[28px]">
              <LazyImage src={product.images?.[0] || product.image} alt={product.name} className="aspect-[4/5]" />
            </div>
          </div>

          <div className="flex flex-col justify-between p-8">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-luxury-line px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-luxury-black/55">
                {product.category}
              </span>
              <h3 className="font-display text-3xl text-luxury-black">{product.name}</h3>
              <div className="mt-4 flex items-center gap-4">
                <p className="text-2xl font-semibold text-luxury-black">Rs. {Number(product.price).toFixed(2)}</p>
                <RatingStars value={product.rating} reviews={product.reviews} />
              </div>
              <p className="mt-6 text-sm leading-7 text-luxury-black/65">
                {product.description || "Refined craftsmanship, luminous detailing, and occasion-ready elegance in one timeless silhouette."}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-luxury-black/65">
                <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                <span>Certified finish • Premium packaging • 7-day care support</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => onAddToCart(product)}>Add To Cart</Button>
              <Link to={`/Collection/${product.slug}`}>
                <Button variant="secondary">View Details</Button>
              </Link>
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-luxury-line bg-white text-luxury-black transition hover:border-luxury-gold hover:text-luxury-gold"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
