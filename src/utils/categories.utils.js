import axios from "axios";

export const getAllCategories = async () => {
  const response = await axios.get(
    "http://localhost:8000/api/products/categories/all"
  );
  const allCategories = response.data;
  return allCategories;
};

export const getProductsByCategory = async (category) => {
  let response;
  if (category === "all") {
    response = await axios.get(`http://localhost:8000/api/products`);
  } else {
    response = await axios.get(
      `http://localhost:8000/api/products/categories/${category}`
    );
  }
  const foundProducts = response.data;
  return foundProducts;
};
