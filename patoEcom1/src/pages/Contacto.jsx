import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contacto = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-4">Contáctanos</h1>
          <p className="text-center mb-4">
            Si tienes alguna duda o consulta, no dudes en comunicarte con nosotros:
          </p>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <strong>Email:</strong> contacto@farmaciapixys.com
            </li>
            <li className="list-group-item">
              <strong>Teléfono:</strong> +598 2 01988721
            </li>
            <li className="list-group-item">
              <strong>Dirección:</strong> Libertad 123, Montevideo, Uruguay
            </li>
          </ul>
          <form className="p-4 border rounded bg-light shadow">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Tu correo electrónico"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Mensaje:
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows="5"
                placeholder="Escribe tu mensaje aquí"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
