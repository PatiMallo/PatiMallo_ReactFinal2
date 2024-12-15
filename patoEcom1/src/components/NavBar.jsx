import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CartWidget from "./CartWidget"; 
import "../styles/navbar.css";

const NavBar = () => {
  const navigate = useNavigate(); 

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
