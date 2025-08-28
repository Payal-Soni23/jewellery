import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {



  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    
  setCart((prevCart) => {
    const existing = prevCart.find((item) => item.id === product.id);

    let updatedCart;
    if (existing) {
      updatedCart = prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...prevCart, { 
        ...product, 
        quantity: 1, 
        image: product.image   // ✅ include image here
      }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
  });


};
  
  // Increase quantity
const increaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

// Decrease quantity
const decreaseQuantity = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart , increaseQuantity , decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
