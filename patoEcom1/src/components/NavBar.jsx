import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CartWidget from "./CartWidget"; // Ícono del carrito
import "../styles/navbar.css";

const NavBar = () => {
  const navigate = useNavigate(); // Hook para redirigir

  return (
    <nav className="navbar">
      <h1 className="logo">Farmacia Pixys</h1>
      <ul className="menu">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
      </ul>
      {/* Ícono del carrito */}
      <div onClick={() => navigate("/checkout")} className="cart-widget">
        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;
