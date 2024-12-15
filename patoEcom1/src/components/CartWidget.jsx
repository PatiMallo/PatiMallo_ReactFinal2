import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartWidget.css";

const CartWidget = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <div className="cart-widget">
      <img
        src="https://cdn-icons-png.flaticon.com/512/34/34627.png"
        alt="Carrito"
        className="cart-icon"
      />
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </div>
  );
};

export default CartWidget;
