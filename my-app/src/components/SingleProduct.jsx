import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";
import { ClickedProductContext } from "../context/ClickedProductContext";
import { isLoggedIn, getLoggedUser } from "../utils/login.utils.js";
import {
  notifyToLoginWhenAddingToCart,
  notifyProductAlreadyInCart,
  notifyProductAddedToCart,
  notifyProductReview,
} from "../utils/notification.utils";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

const SingleProduct = () => {
  const { productId } = useParams();
  const { clickedProduct, clickedProductHandler } = useContext(
    ClickedProductContext
  );
  const { cartItems, addToCart } = useContext(CartContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    clickedProductHandler(productId);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/reviews/product/${productId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [productId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? "text-yellow-500" : "text-gray-400"}
        />
      );
    }
    return <div className="stars-container flex">{stars}</div>;
  };

  const handleAddReview = async () => {
    try {
      if (!isLoggedIn()) {
        notifyProductReview();
        return;
      }
      const user = getLoggedUser();

      const response = await axios.post("http://localhost:8000/api/reviews", {
        product_id: productId,
        user_id: user.id,
        rating,
        comments,
      });
      const newReview = response.data;
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setRating("");
      setComments("");
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating;
  };

  const handleAddToCart = () => {
    const isInCart = cartItems.find((item) => item.id === clickedProduct.id);
    if (!isLoggedIn()) {
      notifyToLoginWhenAddingToCart();
      return;
    }

    if (isInCart) {
      notifyProductAlreadyInCart(clickedProduct.name);
      return;
    } else {
      addToCart(clickedProduct, 1);
      notifyProductAddedToCart(clickedProduct.name);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-4 mx-auto mt-8 max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={clickedProduct.image}
            alt="product_image"
            className="w-64 h-64 object-cover rounded-md mb-4"
          />
          <p className="text-2xl font-bold">{clickedProduct.name}</p>
          <p className="text-gray-700 mb-2">{clickedProduct.description}</p>
          <p className="text-green-600 font-bold">${clickedProduct.price}</p>
          <p className="text-blue-500 mb-2">
            Categorias: {clickedProduct.category_name?.join(", ")}
          </p>
          <p className="text-gray-700 mb-4">Marca: {clickedProduct.brand}</p>

          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      <div className="my-6 mx-10">
        <h3 className="text-xl font-bold mb-4">Opiniones del producto</h3>

        <div className="mt-4 my-6">
          <div className="flex space-x-4">
            <input
              type="number"
              min="0"
              max="5"
              placeholder="Estrellas"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border border-gray-300 px-8 py-2 pl-8 pr-8 rounded-md"
            />
            <input
              type="text"
              placeholder="Comentario"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
            <button
              onClick={handleAddReview}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Enviar valoracion
            </button>
          </div>
          <div className="mt-4">
            <p className="text-lg font-bold">
              {renderStars(calculateAverageRating())}
            </p>
            <p className="text-lg font-light">
              {reviews.length} calificaciones
            </p>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p>No hay valoraciones disponibles</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="bg-white rounded-md shadow-md p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <IoPerson></IoPerson>
                  </div>
                  <div className="ml-3">
                    <p className="">{renderStars(review.rating)}</p>
                    <p>{review.comments}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
