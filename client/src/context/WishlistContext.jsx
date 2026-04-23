import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { normalizeProduct, resolveProductId } from "../utils/product";

const WishlistContext = createContext();
const WISHLIST_STORAGE_KEY = "wishlistItems";

const getStoredWishlist = () => {
  try {
    const savedItems = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]");
    return Array.isArray(savedItems) ? savedItems.map((item) => normalizeProduct(item)) : [];
  } catch {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(getStoredWishlist);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    const normalizedProduct = normalizeProduct(product);
    const productId = resolveProductId(normalizedProduct) || normalizedProduct.slug;

    if (!productId) {
      return;
    }

    setWishlistItems((currentItems) => {
      if (currentItems.some((item) => (resolveProductId(item) || item.slug) === productId)) {
        return currentItems;
      }

      return [...currentItems, normalizedProduct];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => (resolveProductId(item) || item.slug) !== productId)
    );
  };

  const toggleWishlist = (product) => {
    const normalizedProduct = normalizeProduct(product);
    const productId = resolveProductId(normalizedProduct) || normalizedProduct.slug;

    if (!productId) {
      return;
    }

    setWishlistItems((currentItems) => {
      const exists = currentItems.some((item) => (resolveProductId(item) || item.slug) === productId);

      if (exists) {
        return currentItems.filter((item) => (resolveProductId(item) || item.slug) !== productId);
      }

      return [...currentItems, normalizedProduct];
    });
  };

  const isInWishlist = useCallback(
    (productId) => wishlistItems.some((item) => (resolveProductId(item) || item.slug) === productId),
    [wishlistItems]
  );

  const value = useMemo(
    () => ({
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
    }),
    [wishlistItems, isInWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);
