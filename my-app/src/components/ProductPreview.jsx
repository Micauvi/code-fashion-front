import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getProductsByCategory } from "../utils/categories.utils";

const ProductPreview = ({ searchBar, selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productPreview = async () => {
      try {
        if (selectedCategory.length && searchBar.length > 1) {
          let foundProducts = await getProductsByCategory(selectedCategory);

          foundProducts = foundProducts.filter((product) =>
            product.name.toLowerCase().includes(searchBar.toLowerCase())
          );

          setProducts(foundProducts);
        }
        if (selectedCategory && searchBar.length < 1) {
          const foundProducts = await getProductsByCategory(selectedCategory);
          setProducts(foundProducts);
        }
      } catch (error) {
        return { msg: "Error retrieving products", error };
      }
    };
    productPreview();
  }, [searchBar, selectedCategory]);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 relative shadow-lg py-4">
        {products.length === 0 ? (
          <p>No se encuentran productos</p>
        ) : (
          products.map(({ id, name, description, price, image, brand }) => (
            <div
              key={name}
              className="bg-white rounded-md relative shadow-md p-4 flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Link to={`/product/${id}`}>
                <div>
                  <img
                    src={image}
                    alt={name}
                    className="object-contain h-32 w-full mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{name}</h3>
                  <p className="text-gray-500 mb-2">{description}</p>
                  <p className="text-gray-700 font-bold">${price}</p>
                  <p className="text-gray-500">{brand}</p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductPreview;
