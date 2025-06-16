import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const placeOrder = (newOrderFromBackend) => {
    // Optionally update orders list if needed, or just clear cart
    setCartItems([]);
    if (newOrderFromBackend) {
      setOrders(prevOrders => [newOrderFromBackend, ...prevOrders]);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, placeOrder, orders }}
    >
      {children}
    </CartContext.Provider>
  );
};