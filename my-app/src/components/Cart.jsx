import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, setCartItems } = useContext(CartContext);
  const { isCartOpen } = useCart();
  console.log(isCartOpen);

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

  const handleIncreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity++;
    setCartItems(newCartItems);
  };

  const handleDecreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity--;
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
    <div
      className={`fixed top-16 right-0 bottom-0 sm:w-3/4 md:w-1/2 xl:w-1/3    w-full bg-white z-20 transition-transform duration-300 ease-in-out ${
        isCartOpen ? "transform translate-x-0" : "transform translate-x-full"
      }`}
    >
      <div className="bg-gray-100 py-4 px-6    ">
        <h2 className="text-2xl font-bold mb-4  ">Carrito de Compras</h2>

        <div className="bg-white rounded shadow   ">
          <div className="m-5 ">
            {cartItems.length === 0 ? (
              <div className="px-6 py-4 ">No hay productos en el carrito</div>
            ) : (
              cartItems.map((product, index) => (
                <div key={index} className="flex  border-b-2 border-gray-200">
                  <div className="flex py-5 w-20 h-32">
                    <img
                      className=" rounded-full"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="ml-5 ">
                      <p className="text-xl w-40 font-medium text-gray-900">
                        {product.name}
                      </p>
                      <div className="flex my-3">
                        <button
                          onClick={() => handleDecreaseQuantity(index)}
                          className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full"
                        >
                          -
                        </button>
                        <h3 className="w-10 items-center justify-center flex border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                          {product.quantity}
                        </h3>
                        <button
                          onClick={() => handleIncreaseQuantity(index)}
                          className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1  ">
                      <button
                        className="text-red-500 hover:text-red-700 text-lg "
                        onClick={() => handleRemove(index)}
                      >
                        Eliminar
                      </button>

                      <h3 className=" font-bold text-gray-900 text-lg">
                        ${calculateTotal(index)}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="mt-4 text-right text-gray-900 text-xl font-bold">
          Precio Total: ${totalPrice}
        </div>
        <div className="flex justify-end mt-4">
          <Link
            to="/checkout"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
          >
            <button className=" text-sm">COMPRAR</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
