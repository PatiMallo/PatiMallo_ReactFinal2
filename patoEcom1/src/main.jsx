import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import CartProvider from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBr6atowLolGPG1pzEWDd8U97vVHsXrgrI",
  authDomain: "patimallo-1.firebaseapp.com",
  projectId: "patimallo-1",
  storageBucket: "patimallo-1.appspot.com",
  messagingSenderId: "950461702210",
  appId: "1:950461702210:web:11537735ef7a698e914ddb"
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Renderiza la aplicación principal
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);