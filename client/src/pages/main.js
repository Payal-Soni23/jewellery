import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import ProductCard from "../components/ui/ProductCard";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import mainBanner from "../assets/images/banner/main-banner.png";
import sideBanner from "../assets/images/banner/goldsideimg2-3.jpg";
import diamondPendantImg from "../assets/images/neckpeice/diamond pendent 4.jpeg";
import diamondRingImg from "../assets/images/rings/diamond ring.webp";

const experiencePoints = [
  {
    title: "Hand-finished Detail",
    description: "Each piece is polished and balanced to feel as exceptional as it looks.",
  },
  {
    title: "Curated Precious Stones",
    description: "We select luminous stones and refined metal tones for a maison-like finish.",
  },
  {
    title: "Gift-ready Packaging",
    description: "Every order arrives with elegant presentation designed for celebrations.",
  },
];

export default function Main() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const featured = products.slice(0, 4);

  return (
    <div className="bg-luxury-ivory">
      <section className="relative isolate overflow-hidden bg-luxury-black">
        <img src={mainBanner} alt="Luxury jewellery banner" className="h-[78vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-gold-mesh" />

        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-reveal text-white">
            <p className="mb-5 text-xs uppercase tracking-[0.42em] text-luxury-goldSoft">Luxury Jewellery House</p>
            <h1 className="font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
              Sculpted brilliance for modern heirlooms.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75">
              Discover gold, diamonds, and luminous statement pieces through a storefront designed with the quiet confidence of a premium maison.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/Collection">
                <Button>
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/diamond">
                <Button variant="ghost">Explore Diamonds</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[32px] shadow-luxury">
          <img src={sideBanner} alt="Gold editorial" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow="Signature Edit"
            title="A warm gold palette, refined for every moment."
            description="From understated rings to celebratory pendants, the collection balances wearability with the polish of high-luxury presentation."
            align="left"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {experiencePoints.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-luxury-line bg-white p-6 shadow-luxury">
                <h3 className="font-display text-2xl text-luxury-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-luxury-black/65">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Best Sellers"
          title="Most desired pieces this season"
          description="A handpicked edit inspired by the calm luxury and editorial restraint of iconic jewellery houses."
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="group relative overflow-hidden rounded-[32px] bg-luxury-black shadow-luxury">
          <img
            src={diamondRingImg}
            alt="Diamond rings"
            loading="lazy"
            className="h-[26rem] w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.35em] text-luxury-goldSoft">Diamond Atelier</p>
            <h3 className="mt-3 font-display text-4xl">Diamond Rings</h3>
            <Link to="/diamond/rings" className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-luxury-gold">
              Explore
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-[32px] bg-luxury-black shadow-luxury">
          <img
            src={diamondPendantImg}
            alt="Diamond pendants"
            loading="lazy"
            className="h-[26rem] w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.35em] text-luxury-goldSoft">Neckline Focus</p>
            <h3 className="mt-3 font-display text-4xl">Diamond Pendants</h3>
            <Link to="/diamond" className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-luxury-gold">
              Discover
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
