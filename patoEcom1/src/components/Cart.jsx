import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return <p>El carrito está vacío. Agrega productos para continuar.</p>;
  }

  return (
    <div className="cart">
      <h2>Tu Carrito</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.articulo}</span>
            <span>Cantidad: {item.cantidad}</span>
            <span>Precio Total: ${item.precio * item.cantidad}</span>
            <button className="button" onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>Total de Productos: {totalItems}</p>
        <p>Total a Pagar: ${totalPrice}</p>
        <button className="button" onClick={clearCart}>Vaciar Carrito</button>
      </div>
    </div>
  );
};

export default Cart;
