import React, { createContext, useState } from "react";


export const CartContext = createContext();


const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                cantidad: (cartItem.cantidad || 1) + (item.cantidad || 1),
              }
            : cartItem
        );
      } else {
        
        return [
          ...prevCart,
          {
            ...item,
            cantidad: item.cantidad || 1, 
            precio: item.precio || 0, 
          },
        ];
      }
    });
  };

  
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  
  const updateQuantity = (id, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(id); 
    } else {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, cantidad } : cartItem
        )
      );
    }
  };

  
  const clearCart = () => {
    setCart([]);
  };

  
  const totalItems = cart.reduce(
    (total, item) => total + (item.cantidad || 0), 
    0
  );

  
  const totalPrice = cart.reduce(
    (total, item) => total + (item.cantidad || 0) * (item.precio || 0), 
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
