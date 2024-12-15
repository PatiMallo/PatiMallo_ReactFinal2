import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

const CheckOut = () => {
  const { cart, totalItems, totalPrice, removeFromCart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setOrderConfirmed(true);
    clearCart();
  };

  if (orderConfirmed) {
    return (
      <div className="checkout-confirmation">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu pedido ha sido procesado exitosamente.</p>
        <button onClick={() => navigate("/")} className="button-primary">
          Volver al Inicio
        </button>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>No hay productos en tu carrito</h2>
        <button onClick={() => navigate("/")} className="button-primary">
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Carrito de Compras</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-info">
              <img
                src={item.imageid || "https://via.placeholder.com/150"}
                alt={item.articulo}
                className="cart-item-image"
              />
              <div>
                <h4>{item.articulo}</h4>
                <p>Precio: ${item.precio}</p>
                <p>Cantidad: {item.cantidad}</p>
                <p>Total: ${item.precio * item.cantidad}</p>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="button-secondary">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p><strong>Total de Productos:</strong> {totalItems}</p>
        <p><strong>Total a Pagar:</strong> ${totalPrice}</p>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="button-primary">
          Confirmar Compra
        </button>
      </form>
      <button onClick={clearCart} className="button-secondary">
        Vaciar Carrito
      </button>
    </div>
  );
};

export default CheckOut;
