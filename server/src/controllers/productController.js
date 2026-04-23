import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const { type, category, search, sortBy } = req.query;
    const query = {};

    if (type) query.type = type.toLowerCase();
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    let productsQuery = Product.find(query);

    if (sortBy === "priceLow") productsQuery = productsQuery.sort({ price: 1 });
    else if (sortBy === "priceHigh") productsQuery = productsQuery.sort({ price: -1 });
    else productsQuery = productsQuery.sort({ createdAt: -1 });

    const products = await productsQuery;
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, images, category, description, type } = req.body;

    if (!name || !price || !category || !description || !type) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const product = await Product.create({
      name,
      slug,
      price,
      images: Array.isArray(images) ? images : [],
      category,
      description,
      type: type.toLowerCase(),
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};
