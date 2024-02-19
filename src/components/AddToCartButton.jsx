import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCartButton = ({ onClick, productName }) => {
  const [isAdded, setIsAdded] = useState(false);

  const notify = () => {
    toast.success(
      <div>
        <strong>{productName}</strong> Agregado al carrito
      </div>,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastClassName:
          "bg-green-500 text-white font-bold flex items-center p-4 rounded-md",
      }
    );
  };

  const handleClick = () => {
    if (!isAdded) {
      onClick();
      setIsAdded(true);
      notify();
    } else {
      toast.info(
        <div>
          <strong>{productName}</strong> Ya esta en el carrito!
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastClassName:
            "bg-blue-500 text-white font-bold flex items-center p-4 rounded-md",
        }
      );
    }
  };

  return (
    <>
      <button
        className="absolute bottom-2 right-2 bg-indigo-600 text-white font-medium rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </>
  );
};

export default AddToCartButton;
