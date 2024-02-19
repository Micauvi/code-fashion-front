import { Link } from "react-router-dom";

const CheckoutConfirmed = () => {
  return (
    <div className="flex flex-col items-center py-2 bg-gray-100">
      <div className="text-4xl my-2">Compra finalizada </div>
      <div className="my-2 text-gray-500 font-medium">
        Un email de confirmacion ha sido enviado a tu correo
      </div>

      <div className="flex flex-row justify-center">
        <Link
          className="mx-4 my-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
          to={"/"}
        >
          <button> Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutConfirmed;
