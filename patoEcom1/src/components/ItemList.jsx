import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import ItemQuantitySelector from "./ItemQuantitySelector";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../main";
import "../styles/itemList.css";

const ItemList = ({ items }) => {
  const { addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const [imageUrls, setImageUrls] = useState({});

  const handleQuantityChange = (id, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart({ ...item, cantidad: quantity });
  };

  const fetchImageUrls = async () => {
    const urls = {};
    for (const item of items) {
      if (item.imageid && !item.imageid.startsWith("http")) {
        
        const imageRef = ref(storage, item.imageid);
        try {
          const url = await getDownloadURL(imageRef);
          urls[item.id] = url;
        } catch (error) {
          console.error(`Error al cargar la imagen para el producto ${item.id}:`, error);
          urls[item.id] = "https://via.placeholder.com/150";
        }
      } else {
        
        urls[item.id] = item.imageid || "https://via.placeholder.com/150";
      }
    }
    setImageUrls(urls);
  };

  React.useEffect(() => {
    if (items && items.length > 0) {
      fetchImageUrls();
    }
  }, [items]);

  if (!items || items.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item-card">
          <img
            src={imageUrls[item.id] || "https://via.placeholder.com/150"}
            alt={item.articulo}
            className="item-image"
          />
          <h3>{item.articulo}</h3>
          <p>Tipo: {item.tipo}</p>
          <p>Precio: ${item.precio}</p>
          <p>Stock: {item.stock}</p>
          <ItemQuantitySelector
            stock={item.stock}
            onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
          />
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
