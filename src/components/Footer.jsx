import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800  text-white p-6">
      <div className=" flex justify-between items-center">
        <div className="">
          <h4 className=" font-semibold text-sm">Servicio al cliente </h4>
          <p className="text-gray-400 text-sm mt-8">telefono: +123464521452</p>
          <p className="text-gray-400 text-sm">correo: correo@example.com</p>
        </div>
        <div>
          <h4 className="">Enlaces</h4>
          <ul className="mt-3">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white text-sm ">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/category/hombre"
                className="text-gray-400 hover:text-white text-sm "
              >
                Hombre
              </Link>
            </li>
            <li>
              <Link
                to="/category/mujer"
                className="text-gray-400 hover:text-white text-sm "
              >
                Mujer
              </Link>
            </li>
          </ul>
        </div>
        <div className=" ">
          <h4 className=" font-semibold text-sm ">Siguenos</h4>
          <ul className="mt-2 ">
            <li>
              <a href="#/" className="text-gray-400 hover:text-white text-sm">
                Facebook
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-400 hover:text-white text-sm">
                Twitter
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-400 hover:text-white text-sm">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
