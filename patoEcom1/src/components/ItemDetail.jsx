import React, { useEffect, useState, useContext } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ItemQuantitySelector from "./ItemQuantitySelector";
import { CartContext } from "../context/CartContext";
import "../styles/itemDetail.css";

const ItemDetail = ({ firebaseApp, productId }) => {
  const [product, setProduct] = useState(null); // Estado del producto
  const [quantity, setQuantity] = useState(1); // Cantidad seleccionada
  const [error, setError] = useState(null); // Mensaje de error
  const { addToCart } = useContext(CartContext); // Contexto del carrito

  // Fetch del producto desde Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      const db = getFirestore(firebaseApp);
      const productRef = doc(db, "medicamentos", productId);
      const productDoc = await getDoc(productRef);
      if (productDoc.exists()) {
        setProduct({ id: productDoc.id, ...productDoc.data() });
      } else {
        setError("El producto no existe o no está disponible.");
      }
    };

    fetchProduct();
  }, [firebaseApp, productId]);

  // Manejar la cantidad seleccionada
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > product.stock) {
      setError("No puedes seleccionar más cantidad que el stock disponible.");
    } else {
      setQuantity(newQuantity);
      setError(null); // Limpiar errores si la cantidad es válida
    }
  };

  // Agregar al carrito
  const handleAddToCart = () => {
    if (product && quantity <= product.stock) {
      addToCart({ ...product, cantidad: quantity });
      setError(null); // Limpiar errores si la operación es exitosa
    } else {
      setError("No puedes agregar más productos que el stock disponible.");
    }
  };

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="item-detail">
      <h3>{product.articulo}</h3>
      <p>{product.description}</p>
      <p>Stock: {product.stock}</p>
      <p>Precio: ${product.precio}</p>

      {/* Muestra un mensaje de error si existe */}
      {error && <p className="error-message">{error}</p>}

      {/* Selector de cantidad */}
      <ItemQuantitySelector
        onQuantityChange={handleQuantityChange}
        stock={product.stock}
        initial={quantity}
      />

      {/* Botón para agregar al carrito */}
      <button
        className="add-to-cart-button"
        onClick={handleAddToCart}
        disabled={quantity > product.stock} // Deshabilitar si la cantidad supera el stock
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default ItemDetail;
