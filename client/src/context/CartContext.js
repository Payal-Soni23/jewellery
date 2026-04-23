import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCart, saveCart } from '../api/cart';
import { useAuth } from './AuthContext';
import { getStoredToken } from '../utils/authStorage';
import { normalizeCartItem, normalizeCartItems, resolveProductId } from '../utils/product';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userId = user?.id || user?._id;
  const token = getStoredToken();

  useEffect(() => {
    const loadCart = async () => {
      if (!user || !userId || !token) {
        return;
      }

      try {
        setLoading(true);
        const remoteCart = await fetchCart(userId);
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

        let mergedCart = normalizeCartItems(remoteCart?.items || []);

        if (localCart.length > 0) {
          const map = new Map();

          [...mergedCart, ...localCart].forEach((item) => {
            const normalized = normalizeCartItem(item);

            if (!normalized) {
              return;
            }

            const existing = map.get(normalized.productId);
            map.set(
              normalized.productId,
              existing
                ? { ...existing, quantity: existing.quantity + normalized.quantity }
                : normalized
            );
          });

          mergedCart = Array.from(map.values());
          const savedCart = await saveCart(userId, mergedCart);
          mergedCart = normalizeCartItems(savedCart?.items || mergedCart);
          localStorage.removeItem("cart");
        }

        setCart(mergedCart);
      } catch (error) {
        console.error("Unable to load cart", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [token, user, userId]);

  useEffect(() => {
    if (!user || !userId || !token) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, token, user, userId]);

  const persistCart = async (updatedCart) => {
    const normalizedCart = normalizeCartItems(updatedCart);

    if (user && userId && token) {
      const savedCart = await saveCart(userId, normalizedCart);
      setCart(normalizeCartItems(savedCart?.items || normalizedCart));
      return;
    }

    setCart(normalizedCart);
    localStorage.setItem("cart", JSON.stringify(normalizedCart));
  };

  const addToCart = async (product, quantity = 1) => {
    const normalized = normalizeCartItem({
      ...product,
      productId: resolveProductId(product),
      image: product?.image || product?.images?.[0],
      quantity,
    });

    if (!normalized) {
      console.error("Unable to add cart item without a valid productId", product);
      return;
    }

    const existing = cart.find((item) => item.productId === normalized.productId);

    const updatedCart = existing
      ? cart.map((item) =>
          item.productId === normalized.productId
            ? { ...item, quantity: item.quantity + normalized.quantity }
            : item
        )
      : [...cart, normalized];

    await persistCart(updatedCart);
  };

  const increaseQuantity = async (productId) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    await persistCart(updatedCart);
  };

  const decreaseQuantity = async (productId) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    await persistCart(updatedCart);
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    await persistCart(updatedCart);
  };

  const clearCart = async () => {
    await persistCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
