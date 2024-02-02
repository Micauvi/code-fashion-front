import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getProductsByCategory } from "../utils/categories.utils";
import { useMediaQuery } from "@react-hook/media-query";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const ProductPreview = ({
  searchBar,
  selectedCategory,
  isSmall,
  setSelectedCategory,
  setSearchBar,
}) => {
  const [products, setProducts] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaQueryChange = (mediaQuery) => {
      setIsSmallScreen(mediaQuery.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);
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
      {isSmallScreen ? (
        <div className="flex flex-row gap-5 justify-around ">
          <Categories
            className=""
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <SearchBar setSearchBar={setSearchBar} searchBar={searchBar} />
        </div>
      ) : (
        ""
      )}
      <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center relative shadow-lg py-4">
        {products.length === 0 ? (
          <p>No se encuentran productos</p>
        ) : (
          products.map(({ id, name, description, price, image, brand }) => (
            <div
              key={name}
              className="bg-white rounded-md relative w-4/5 shadow-md p-4 flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Link to={`/product/${id}`}>
                <div>
                  <img
                    src={image}
                    alt={name}
                    className="object-contain  w-full mb-4"
                  />
                  <div className=" flex flex-col items-center align-middle">
                    <h3 className="text-xl font-bold mb-2">{name}</h3>
                    <p className="text-gray-500 mb-2">{description}</p>
                    <p className="text-gray-700 font-bold">${price}</p>
                    <p className="text-gray-500">{brand}</p>
                  </div>
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
