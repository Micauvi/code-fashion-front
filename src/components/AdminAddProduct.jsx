import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/products",
        {
          name: name.value,
          description: description.value,
          price: parseFloat(price.value),
          image: image.value,
          stock: parseInt(stock.value),
          category_name: category.value.trim().split(","),
          brand: brand.value,
        },
        { withCredentials: true }
      );

      const createdProduct = response.data;
      console.log("Created product:", createdProduct);

      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const name = useInput();
  const description = useInput();
  const price = useInput();
  const image = useInput();
  const stock = useInput();
  const category = useInput();
  const brand = useInput();

  return (
    <div className="flex justify-center">
      <div>
        <h2 className="text-2xl font-bold mb-4">Add Product Form</h2>
        <form onSubmit={handleProductSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              {...name} // Spread the useInput hook object
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              {...description} // Spread the useInput hook object
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              {...price} // Spread the useInput hook object
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image:
            </label>
            <input
              type="text"
              id="image"
              {...image} // Spread the useInput hook object
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock:
            </label>
            <input
              type="number"
              id="stock"
              {...stock} // Spread the useInput hook object
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category:
            </label>
            <input
              type="text"
              id="category"
              {...category} // Spread the useInput hook object
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand:
            </label>
            <input
              type="text"
              id="brand"
              {...brand} // Spread the useInput hook object
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
