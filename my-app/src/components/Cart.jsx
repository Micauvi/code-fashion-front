import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, setCartItems } = useContext(CartContext);
  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handleQuantityChange = (index, value) => {
    const newCartItems = [...cartItems];
    const newQuantity = parseInt(value, 10);

    if (newQuantity > 0) {
      newCartItems[index].quantity = newQuantity;
      setCartItems(newCartItems);
    }
  };

  const calculateTotal = (index) => {
    const product = cartItems[index];
    return product.price * product.quantity;
  };

  const totalPrice = cartItems.reduce(
    (acc, _, index) => acc + calculateTotal(index),
    0
  );

  return (
    <div className="bg-gray-100 py-4 px-6 ">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cartItems.length === 0 ? (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap" colSpan="5">
                  No hay productos en el carrito
                </td>
              </tr>
            ) : (
              cartItems.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className=" items-center">
                      <div className="h-10 w-14">
                        <img
                          className="  rounded-full"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-xl font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${product.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      className="w-16 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${calculateTotal(index)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <Link
          to="/checkout"
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
        >
          <button className=" text-sm">COMPRAR</button>
        </Link>
      </div>
      <div className="mt-4 text-right text-gray-900 font-medium">
        Precio Total: ${totalPrice}
      </div>
    </div>
  );
};

export default ShoppingCart;
