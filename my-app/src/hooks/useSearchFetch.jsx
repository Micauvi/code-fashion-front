import axios from "axios";
import { useEffect, useState } from "react";

const useSearchFeach = (searchParam) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const productsFetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/search/${searchParam}`
        );
        const foundProducts = response.data;
        setProducts(foundProducts);
      } catch (error) {
        return error;
      }
    };
    productsFetch();
  }, []);
  return products;
};
export default useSearchFeach;
