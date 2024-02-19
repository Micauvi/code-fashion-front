import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { checkoutCart } from "../utils/cart.utils";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { clearCart, cartItems } = useContext(CartContext);
  return (
    <div className="flex flex-col items-center py-2 bg-gray-100">
      <div className="text-4xl my-2">Deseas confirmar tu compra? </div>

      <div className="flex flex-row justify-center">
        <Link
          onClick={() => {
            checkoutCart(cartItems);
            clearCart();
          }}
          className="mx-4 my-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
          to={"confirmation"}
        >
          <button>Confirmar Compra</button>
        </Link>
        <Link
          to={"/cart"}
          className="mx-4 my-2 px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-500"
        >
          <button>Volver al carrito</button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
