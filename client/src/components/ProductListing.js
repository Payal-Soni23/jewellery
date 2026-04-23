import React, { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCard from "./ui/ProductCard";
import QuickViewModal from "./ui/QuickViewModal";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import { ProductCardSkeleton } from "./ui/Skeleton";

const priceFilters = [
  { label: "All", value: "all" },
  { label: "Under 10,000", value: "under-10000" },
  { label: "10,000 - 20,000", value: "10000-20000" },
  { label: "Above 20,000", value: "above-20000" },
];

const applyPriceFilter = (products, filter) => {
  switch (filter) {
    case "under-10000":
      return products.filter((product) => Number(product.price) < 10000);
    case "10000-20000":
      return products.filter((product) => Number(product.price) >= 10000 && Number(product.price) <= 20000);
    case "above-20000":
      return products.filter((product) => Number(product.price) > 20000);
    default:
      return products;
  }
};

export default function ProductListing({
  title,
  banner,
  products = [],
  showBanner = true,
  showCategories = true,
  loading = false,
  error = "",
}) {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (selectedCategory !== "All") {
      items = items.filter((product) => product.category === selectedCategory);
    }

    items = applyPriceFilter(items, selectedPrice);

    if (sortBy === "price-low") {
      items.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      items.sort((a, b) => Number(b.price) - Number(a.price));
    } else {
      items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return items;
  }, [products, selectedCategory, selectedPrice, sortBy]);

  const handleAddToCart = async (product) => {
    await addToCart(product, 1);
  };

  return (
    <div className="bg-luxury-ivory">
      {showBanner ? (
        <section className="relative isolate overflow-hidden">
          <img src={banner} alt={title} className="h-[42vh] w-full object-cover sm:h-[52vh]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 top-0 mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-white animate-reveal">
              <span className="mb-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-luxury-goldSoft">
                Curated Selection
              </span>
              <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                Sculpted silhouettes, precious metals, and a boutique-style digital experience built for elevated jewellery discovery.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 border-b border-luxury-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Collection"
            title={title}
            description="Filter by category and price to discover the perfect piece for gifting, milestones, or everyday luxury."
            align="left"
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" className="lg:hidden" onClick={() => setShowFilters((current) => !current)}>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-full border border-luxury-line bg-white px-4 py-3 text-sm text-luxury-black focus:border-luxury-gold focus:outline-none"
            >
              <option value="featured">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {error ? <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">{error}</div> : null}

        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className={`${showFilters ? "block" : "hidden"} space-y-8 rounded-[28px] border border-luxury-line bg-white p-6 shadow-luxury lg:block`}>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-luxury-black">Category</h3>
              <div className="flex flex-col gap-2">
                {(showCategories ? categories : ["All"]).map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
                      selectedCategory === category
                        ? "bg-luxury-black text-white"
                        : "bg-luxury-pearl text-luxury-black hover:bg-luxury-goldSoft"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-luxury-black">Price</h3>
              <div className="flex flex-col gap-2">
                {priceFilters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setSelectedPrice(filter.value)}
                    className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
                      selectedPrice === filter.value
                        ? "bg-luxury-black text-white"
                        : "bg-luxury-pearl text-luxury-black hover:bg-luxury-goldSoft"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-luxury-line bg-white px-6 py-16 text-center shadow-luxury">
                <p className="font-display text-3xl text-luxury-black">No matching products</p>
                <p className="mt-3 text-sm text-luxury-black/65">
                  Try a different category or price filter to refine your selection.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
