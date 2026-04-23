import React, { useMemo, useState } from "react";
import { Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";
import LazyImage from "./LazyImage";
import RatingStars from "./RatingStars";
import { PLACEHOLDER_PRODUCT_IMAGE } from "../../utils/product";
import { useWishlist } from "../../context/WishlistContext";

const getDerivedRating = (product) => {
  if (product.rating) {
    return Number(product.rating);
  }

  const seed = Number(String(product.price || 0).slice(-2)) || 18;
  return Math.min(5, 4 + seed / 100);
};

const getReviewCount = (product) => {
  if (product.reviews) {
    return product.reviews;
  }

  return 60 + (String(product._id || product.slug || product.name).length * 7);
};

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const rating = useMemo(() => getDerivedRating(product), [product]);
  const reviews = useMemo(() => getReviewCount(product), [product]);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const wishlisted = isInWishlist(product._id || product.id || product.slug);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    setIsHeartAnimating(true);
    window.setTimeout(() => setIsHeartAnimating(false), 180);
  };

  return (
    <article className="group overflow-hidden rounded-[28px] border border-luxury-line bg-white shadow-[0_10px_30px_rgba(17,17,17,0.05)] transition duration-500 hover:-translate-y-2 hover:shadow-luxury">
      <div className="relative overflow-hidden bg-luxury-pearl">
        <Link to={`/Collection/${product.slug}`}>
          <LazyImage
            src={product.images?.[0] || product.image || PLACEHOLDER_PRODUCT_IMAGE}
            alt={product.name}
            className="aspect-[4/5] transition duration-700 group-hover:scale-110"
          />
        </Link>

        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-luxury-black/65 backdrop-blur">
            {product.category}
          </span>
          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label={wishlisted ? "Remove from favourites" : "Add to favourites"}
            className="rounded-full bg-white/90 p-2 text-luxury-black backdrop-blur transition hover:scale-105 hover:text-luxury-gold"
          >
            <Heart className={`h-4 w-4 transition ${wishlisted ? "fill-luxury-gold text-luxury-gold" : ""} ${isHeartAnimating ? "scale-125" : ""}`} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onQuickView?.(product)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-luxury-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white opacity-0 transition duration-300 group-hover:opacity-100"
        >
          <Eye className="h-4 w-4" />
          Quick View
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <RatingStars value={rating} reviews={reviews} />
          <Link to={`/Collection/${product.slug}`} className="block">
            <h3 className="font-display text-xl text-luxury-black transition group-hover:text-luxury-gold">
              {product.name}
            </h3>
          </Link>
          <p className="text-lg font-semibold text-luxury-black">Rs. {Number(product.price).toFixed(2)}</p>
        </div>

        <Button className="w-full" onClick={() => onAddToCart?.(product)}>
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
