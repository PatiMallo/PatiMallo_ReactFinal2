import React, { useState } from "react";

const ItemQuantitySelector = ({ onQuantityChange, stock, initial = 1 }) => {
  const [quantity, setQuantity] = useState(initial);

  const handleIncrement = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // Comunica el cambio al componente padre
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // Comunica el cambio al componente padre
    }
  };

  return (
    <div className="quantity-selector">
      <button onClick={handleDecrement} disabled={quantity <= 1}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrement} disabled={quantity >= stock}>
        +
      </button>
    </div>
  );
};

export default ItemQuantitySelector;
