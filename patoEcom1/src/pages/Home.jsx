import React from "react";
import ItemListContainer from "../components/ItemListContainer";

const Home = ({ firebaseApp }) => {
  return (
    <div className="home">
      <h1>Bienvenido a Mi E-commerce</h1>
      {/* Muestra el contenedor de productos */}
      <ItemListContainer firebaseApp={firebaseApp} />
    </div>
  );
};

export default Home;
