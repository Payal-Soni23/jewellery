import React from "react";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import LazyImage from "../components/ui/LazyImage";
import { useWishlist } from "../context/WishlistContext";
import { resolveProductId } from "../utils/product";

export default function Favourites() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="bg-luxury-ivory">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-luxury-black/45">Wishlist</p>
          <h1 className="mt-3 font-display text-4xl text-luxury-black">Favourites</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-luxury-black/65">
            Keep a shortlist of the pieces you want to revisit, compare, or gift later.
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-luxury-line bg-white px-6 py-16 text-center shadow-luxury">
            <Heart className="mx-auto h-10 w-10 text-luxury-gold" />
            <p className="mt-4 font-display text-3xl text-luxury-black">No favourites yet</p>
            <p className="mt-3 text-sm text-luxury-black/65">Save the pieces you love and they will appear here.</p>
            <Link
              to="/collection"
              className="mt-6 inline-flex rounded-full bg-luxury-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-luxury-gold hover:text-luxury-black"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {wishlistItems.map((product) => {
              const productId = resolveProductId(product) || product.slug;

              return (
                <article key={productId} className="overflow-hidden rounded-[28px] border border-luxury-line bg-white shadow-luxury">
                  <Link to={`/Collection/${product.slug}`}>
                    <LazyImage src={product.images?.[0] || product.image} alt={product.name} className="aspect-[4/5]" />
                  </Link>
                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-luxury-black/45">{product.category}</p>
                      <Link to={`/Collection/${product.slug}`} className="mt-2 block font-display text-2xl text-luxury-black transition hover:text-luxury-gold">
                        {product.name}
                      </Link>
                      <p className="mt-2 text-lg font-semibold text-luxury-black">Rs. {Number(product.price).toFixed(2)}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(productId)}
                      className="inline-flex items-center gap-2 rounded-full border border-luxury-line px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-luxury-black transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
