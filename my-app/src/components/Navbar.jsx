import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/user/logout");
      Cookies.remove("authToken");
      navigate("/login");
      return;
    } catch (error) {
      return { msg: "Error al desloguearse", error };
    }
  };

  return (
    <nav className=" bg-gray-800 relative shadow-lg z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex relative items-center">
            <div
              className="flex-shrink-0 relative"
              onClick={() => {
                window.location.reload();
              }}
            >
              <Link to="/" className="text-white text-lg font-semibold">
                <span className="text-indigo-500">{"<Code"}</span>
                Fashion<span className="text-indigo-500">{" />"}</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  onClick={() => {
                    window.location.reload();
                  }}
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Inicio
                </Link>
                <Link
                  to="/about"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Acerca de Nosotros
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {authToken ? (
                <div className="relative inline-block text-left">
                  <div>
                    <div>
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        type="button"
                        className="bg-indigo-600 relative text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none"
                        id="user-menu"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {userMenuOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Perfil
                      </Link>
                      <Link
                        to="/cart"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Carrito
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mis ordenes
                      </Link>

                      <Link
                        to="/superadmin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                      >
                        SuperAdmin Panel
                      </Link>

                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                      >
                        Admin Panel
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                        role="menuitem"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className="text-gray-300 bg-indigo-600 hover:bg-indigo-500  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-300 bg-indigo-600  hover:bg-indigo-500  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
