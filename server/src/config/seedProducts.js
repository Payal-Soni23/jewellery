import Product from "../models/Product.js";

const seedProducts = [
  {
    name: "Gold Ring",
    slug: "gold-ring",
    price: 12000,
    images: ["/images/rings/1.png", "/images/rings/1-2.png", "/images/rings/1-3.png"],
    category: "Ring",
    type: "gold",
    description: "A timeless handcrafted gold ring designed for elegant everyday wear.",
  },
  {
    name: "Rose Gold Ring",
    slug: "rose-gold-ring",
    price: 18000,
    images: ["/images/rings/2.png", "/images/rings/2-2.png", "/images/rings/2-3.png"],
    category: "Ring",
    type: "gold",
    description: "A soft rose-gold finish with a refined silhouette for modern styling.",
  },
  {
    name: "Gold Pendant",
    slug: "gold-pendant",
    price: 14000,
    images: ["/images/neckpendent/1.avif"],
    category: "Pendant",
    type: "gold",
    description: "A polished pendant that layers beautifully with both festive and casual looks.",
  },
  {
    name: "Butterfly Gold Ring",
    slug: "butterfly-gold-ring",
    price: 12000,
    images: ["/images/rings/3.png", "/images/rings/3-2.png", "/images/rings/3-3.png"],
    category: "Ring",
    type: "gold",
    description: "A delicate butterfly-inspired ring with standout detailing.",
  },
  {
    name: "Diamond Bracelet",
    slug: "diamond-bracelet",
    price: 22000,
    images: ["/images/bracelets/1.png"],
    category: "Bracelet",
    type: "diamond",
    description: "A brilliant diamond bracelet built to add sparkle to occasion wear.",
  },
  {
    name: "Diamond Pendant",
    slug: "diamond-pendant",
    price: 24000,
    images: ["/images/pendants/2.png"],
    category: "Pendant",
    type: "diamond",
    description: "A luminous diamond pendant with classic proportions.",
  },
  {
    name: "Stud Earrings",
    slug: "stud-earrings",
    price: 11500,
    images: ["/images/earrings/1.png"],
    category: "Earring",
    type: "gold",
    description: "Minimal stud earrings that are easy to pair with any outfit.",
  },
  {
    name: "Silver Hoop Earrings",
    slug: "silver-hoop-earrings",
    price: 7800,
    images: ["/images/earrings/1.png"],
    category: "Earring",
    type: "silver",
    description: "Bold silver hoops designed for light, versatile all-day wear.",
  },
  {
    name: "Daily Wear Bracelet",
    slug: "daily-wear-bracelet",
    price: 6200,
    images: ["/images/bracelets/1.png"],
    category: "Bracelet",
    type: "daily wear",
    description: "A slim bracelet made for repeat daily styling.",
  },
];

export const seedProductsIfEmpty = async () => {
  const count = await Product.countDocuments();

  if (count === 0) {
    await Product.insertMany(seedProducts);
    console.log("Seeded default products");
  }
};
