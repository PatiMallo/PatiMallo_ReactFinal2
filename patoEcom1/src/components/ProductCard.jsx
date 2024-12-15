
import React from "react";

const ProductCard = ({ item, addToCart }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{item.articulo}</h2>
      <p><strong>Tipo:</strong> {item.tipo}</p>
      <p><strong>Descripción:</strong> {item.description}</p>
      <p><strong>Stock:</strong> {item.stock}</p>
      <p><strong>Precio:</strong> ${item.precio}</p>
      <p><strong>Categoría:</strong> {item.categoryId || item.categoryid}</p>
      {item.imageid && (
        <img
          src={item.imageid}
          alt={item.articulo}
          style={styles.image}
        />
      )}
      <button style={styles.button} onClick={() => addToCart(item)}>
        Agregar al Carrito
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    maxWidth: "300px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginTop: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ProductCard;
