import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RegisterContext } from "../context/RegisterContext";

const Register = () => {
  const { userToRegister, setRegisterInput, registerUserInDatabase } =
    useContext(RegisterContext);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nombre
            </label>
            <div className="mt-2">
              <input
                value={userToRegister.first_name}
                type="text"
                name="first_name"
                id="firstname"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={setRegisterInput}
              />
            </div>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Apellido
            </label>
            <div className="mt-2">
              <input
                value={userToRegister.last_name}
                type="text"
                name="last_name"
                id="lastname"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={setRegisterInput}
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Usuario
            </label>
            <div className="mt-2">
              <input
                value={userToRegister.username}
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={setRegisterInput}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                value={userToRegister.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={setRegisterInput}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contraseña
            </label>
            <div className="mt-2">
              <input
                value={userToRegister.password}
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={setRegisterInput}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Dirección
            </label>
            <div className="mt-2">
              <input
                value={userToRegister.address}
                type="text"
                name="address"
                id="address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={setRegisterInput}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={registerUserInDatabase}
          >
            Registrarse
          </button>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to="/login"
            className="text-sm font-semibold leading-6  text-indigo-600 hover:text-indigo-500"
          >
            ¿Ya estás registrado? Inicia sesión aquí
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
