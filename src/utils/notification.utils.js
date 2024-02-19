import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyToLoginWhenAddingToCart = () => {
  toast.info("Inicia sesión para agregar productos al carrito", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    toastClassName:
      "bg-blue-500 text-white font-bold flex items-center p-4 rounded-md",
  });
};

export const notifyProductAlreadyInCart = (productName) => {
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
};

export const notifyProductAddedToCart = (productName) => {
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

export const notifyProductReview = () => {
  toast.error("Inicia sesión para agregar una valoracion", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    toastClassName:
      "bg-red-500 text-white font-bold flex items-center p-4 rounded-md",
  });
};
