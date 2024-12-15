import React, { createContext, useState } from "react";

// Crea el contexto
export const CartContext = createContext();

// Proveedor del contexto
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Si el producto ya existe, incrementa la cantidad por la cantidad seleccionada
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                cantidad: (cartItem.cantidad || 1) + (item.cantidad || 1),
              }
            : cartItem
        );
      } else {
        // Si el producto no existe, agrégalo al carrito con la cantidad seleccionada
        return [
          ...prevCart,
          {
            ...item,
            cantidad: item.cantidad || 1, // Siempre inicializar con al menos 1
            precio: item.precio || 0, // Asegura que el precio sea numérico
          },
        ];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (id, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(id); // Si la cantidad es 0 o menor, elimina el producto
    } else {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, cantidad } : cartItem
        )
      );
    }
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcula el total de productos en el carrito
  const totalItems = cart.reduce(
    (total, item) => total + (item.cantidad || 0), // Asegura que cantidad sea válida
    0
  );

  // Calcula el costo total del carrito
  const totalPrice = cart.reduce(
    (total, item) => total + (item.cantidad || 0) * (item.precio || 0), // Asegura que cantidad y precio sean válidos
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
