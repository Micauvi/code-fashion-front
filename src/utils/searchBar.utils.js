import axios from "axios";

export const searchProducts = async (searchParam) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/products/search/${searchParam}`
    );
    const foundProducts = response.data;

    return foundProducts;
  } catch (error) {
    return error;
  }
};
