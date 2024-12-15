import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import ItemQuantitySelector from "./ItemQuantitySelector"; // Importa el selector
import "../styles/itemList.css"; // Estilos de las tarjetas

const ItemList = ({ items }) => {
  const { addToCart } = useContext(CartContext); // Contexto del carrito
  const [quantities, setQuantities] = useState({}); // Estado para las cantidades seleccionadas

  // Maneja los cambios en la cantidad seleccionada para un producto específico
  const handleQuantityChange = (id, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity, // Actualiza la cantidad seleccionada para el producto
    }));
  };

  // Agrega el producto al carrito con la cantidad seleccionada
  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1; // Obtiene la cantidad seleccionada o 1 por defecto
    addToCart({ ...item, cantidad: quantity }); // Agrega al carrito
  };

  if (!items || items.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item-card">
          <img
            src={item.image || "https://via.placeholder.com/150"}
            alt={item.articulo}
            className="item-image"
          />
          <h3>{item.articulo}</h3>
          <p>Tipo: {item.tipo}</p>
          <p>Precio: ${item.precio}</p>
          <p>Stock: {item.stock}</p>

          {/* Selector de cantidad */}
          <ItemQuantitySelector
            stock={item.stock}
            onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
          />

          {/* Botón para agregar al carrito */}
          <button
            className="add-to-cart-button"
            onClick={() => handleAddToCart(item)}
          >
            Agregar al Carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
