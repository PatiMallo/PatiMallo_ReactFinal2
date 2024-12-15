import React, { useEffect, useState, useContext } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../main"; 
import ItemQuantitySelector from "./ItemQuantitySelector";
import { CartContext } from "../context/CartContext";
import "../styles/itemDetail.css";

const ItemDetail = ({ firebaseApp, productId }) => {
  const [product, setProduct] = useState(null); 
  const [imageUrl, setImageUrl] = useState(null); 
  const [quantity, setQuantity] = useState(1); 
  const [error, setError] = useState(null); 
  const { addToCart } = useContext(CartContext); 

  
  useEffect(() => {
    const fetchProductAndImage = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const productRef = doc(db, "medicamentos", productId); 
        const productDoc = await getDoc(productRef);

        if (!productDoc.exists()) {
          setError("El producto no existe o no está disponible.");
          return;
        }

        const data = productDoc.data();
        setProduct({ id: productDoc.id, ...data });

        
        if (data.imageid) {
          try {
            const imageRef = ref(storage, data.imageid);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
          } catch (imageError) {
            console.error("Error al obtener la imagen:", imageError);
            setImageUrl("https://via.placeholder.com/300");
          }
        }
      } catch (fetchError) {
        console.error("Error al cargar el producto:", fetchError);
        setError("Error al cargar el producto. Por favor, intenta de nuevo.");
      }
    };

    fetchProductAndImage();
  }, [firebaseApp, productId]);

  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > product.stock) {
      setError("No puedes seleccionar más cantidad que el stock disponible.");
    } else {
      setQuantity(newQuantity);
      setError(null); 
    }
  };

  
  const handleAddToCart = () => {
    if (product && quantity <= product.stock) {
      addToCart({ ...product, cantidad: quantity });
      setError(null); 
    } else {
      setError("No puedes agregar más productos que el stock disponible.");
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="item-detail">
      <h3>{product.articulo}</h3>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={product.articulo}
          className="product-image"
        />
      )}
      <p>{product.description}</p>
      <p>Stock: {product.stock}</p>
      <p>Precio: ${product.precio}</p>

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
        disabled={quantity > product.stock} 
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default ItemDetail;
