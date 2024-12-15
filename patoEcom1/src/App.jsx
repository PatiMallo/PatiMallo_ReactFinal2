import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import Contacto from "./pages/Contacto";
import CheckOut from "./components/ChekOut"; // Importa el componente CheckOut

function App({ firebaseApp }) {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer firebaseApp={firebaseApp} />} />
        <Route path="/product/:id" element={<ItemDetailContainer firebaseApp={firebaseApp} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/CheckOut" element={<CheckOut />} /> {/* Ruta para CheckOut */}
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}

export default App;
