import React from "react";

const Contacto = () => {
  return (
    <div className="contacto">
      <h1>Contáctanos</h1>
      <p>Si tienes alguna duda o consulta, no dudes en comunicarte con nosotros:</p>
      <ul>
        <li>
          <strong>Email:</strong> contacto@mi-ecommerce.com
        </li>
        <li>
          <strong>Teléfono:</strong> +1 123 456 7890
        </li>
        <li>
          <strong>Dirección:</strong> Calle Falsa 123, Ciudad, País
        </li>
      </ul>
      <form className="contact-form">
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" placeholder="Tu nombre" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Tu correo electrónico" required />

        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" placeholder="Escribe tu mensaje aquí" required></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
