import React, { useState } from "react";
import "../styles/QuantitySelector.css";

const ItemQuantitySelector = ({ stock, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="quantity-selector">
      <button onClick={decrement} disabled={quantity <= 1}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={increment} disabled={quantity >= stock}>
        +
      </button>
    </div>
  );
};

export default ItemQuantitySelector;
