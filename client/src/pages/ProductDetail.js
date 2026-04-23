import React, { useEffect, useMemo, useState } from "react";
import { Heart, ShieldCheck, Truck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductBySlug } from "../api/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../hooks/useProducts";
import Button from "../components/ui/Button";
import LazyImage from "../components/ui/LazyImage";
import QuantitySelector from "../components/ui/QuantitySelector";
import RatingStars from "../components/ui/RatingStars";
import SectionHeading from "../components/ui/SectionHeading";
import ProductCard from "../components/ui/ProductCard";
import { ProductCardSkeleton, Skeleton } from "../components/ui/Skeleton";

const RECENTLY_VIEWED_KEY = "recentlyViewedProducts";

const getRecentlyViewed = () => {
  try {
    return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]");
  } catch {
    return [];
  }
};

const storeRecentlyViewed = (product) => {
  const current = getRecentlyViewed();
  const next = [
    product,
    ...current.filter((item) => item._id !== product._id),
  ].slice(0, 4);
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
};

export default function ProductDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState("");
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const { products: similarProducts, loading: similarLoading } = useProducts({
    category: product?.category,
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductBySlug(name);
        setProduct(data);
        setSelectedImage(data.images?.[0] || "");
        setError("");
        storeRecentlyViewed(data);
        setRecentlyViewed(getRecentlyViewed().filter((item) => item._id !== data._id));
      } catch (err) {
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [name]);

  const curatedSimilar = useMemo(
    () => similarProducts.filter((item) => item._id !== product?._id).slice(0, 4),
    [similarProducts, product]
  );

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
    setAlert("Your selection has been added to the cart.");
    setTimeout(() => setAlert(""), 2500);
  };

  const handleBuyNow = async () => {
    await addToCart(product, quantity);
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Skeleton className="aspect-square rounded-[32px]" />
          <div className="space-y-5">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-14 w-56 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <div className="container mx-auto px-4 py-20 text-center text-luxury-black">{error || "Product not found"}</div>;
  }

  return (
    <div className="bg-luxury-ivory">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {alert ? <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{alert}</div> : null}

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[32px] bg-white shadow-luxury">
              <div className="group relative">
                <LazyImage
                  src={selectedImage || product.images?.[0]}
                  alt={product.name}
                  className="aspect-square transition duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product.images?.map((image) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`overflow-hidden rounded-[20px] border bg-white p-1 transition ${
                    selectedImage === image ? "border-luxury-gold shadow-glow" : "border-luxury-line"
                  }`}
                >
                  <LazyImage src={image} alt={product.name} className="aspect-square rounded-[16px]" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-luxury-line bg-white p-8 shadow-luxury">
            <span className="inline-flex rounded-full border border-luxury-line px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-luxury-black/55">
              {product.category}
            </span>
            <h1 className="mt-4 font-display text-4xl text-luxury-black sm:text-5xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p className="text-3xl font-semibold text-luxury-black">Rs. {Number(product.price).toFixed(2)}</p>
              <RatingStars value={4.8} reviews={124} />
            </div>
            <p className="mt-6 text-sm leading-8 text-luxury-black/65">{product.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-luxury-line bg-luxury-pearl text-luxury-black transition hover:border-luxury-gold hover:text-luxury-gold"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="min-w-[13rem]" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="secondary" className="min-w-[13rem]" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            <div className="mt-8 grid gap-4 rounded-[28px] bg-luxury-pearl p-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-luxury-gold" />
                <div>
                  <p className="text-sm font-semibold text-luxury-black">Assured quality</p>
                  <p className="text-sm text-luxury-black/60">Authenticated design and finishing checks on every piece.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="mt-1 h-5 w-5 text-luxury-gold" />
                <div>
                  <p className="text-sm font-semibold text-luxury-black">Insured delivery</p>
                  <p className="text-sm text-luxury-black/60">Premium packaging with careful doorstep fulfillment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="You May Also Like"
          title="Similar pieces with the same refined mood"
          description="Explore companion styles in the same category to build a polished jewellery wardrobe."
          align="left"
        />

        {similarLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {curatedSimilar.map((item) => (
              <ProductCard key={item._id} product={item} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </section>

      {recentlyViewed.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Recently Viewed"
            title="Revisit pieces that caught your eye"
            description="A curated memory rail so your browsing feels continuous and intentional."
            align="left"
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {recentlyViewed.map((item) => (
              <ProductCard key={item._id} product={item} onAddToCart={addToCart} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
