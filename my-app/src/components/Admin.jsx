import axios from "axios";
import React, { useEffect, useState } from "react";
import AddProduct from "./AdminAddProduct";
import useAdmin from "../hooks/useAdmin";

const Admin = () => {
  const { hasAccess, users, setUsers } = useAdmin();
  const [products, setProducts] = useState([]);
  const [redirectToAddProduct, setRedirectToAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/users/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting a user:", error);
    }
  };

  const handleAddProduct = () => {
    setRedirectToAddProduct(true);
  };

  const handleEditProduct = (id) => {
    const product = products.find((product) => product.id === id);
    setEditingProduct(product);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/products/edit/${editingProduct.id}`,
        {
          ...editingProduct,
          category_name: editingProduct.category_name.trim().split(","),
        },
        { withCredentials: true }
      );
      console.log("Product edited:", editingProduct);

      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products", {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error retrieving products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        withCredentials: true,
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting a product:", error);
    }
  };

  return (
    <div className="bg-gray-100 py-4 px-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios Registrados</h2>
      {hasAccess ? (
        <div>
          <div className="grid grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded shadow flex items-center justify-between px-6 py-3"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {user.first_name}_{user.last_name}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddProduct}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar Productos
          </button>
          {redirectToAddProduct && <AddProduct />}
          {products.length > 0 && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <li key={product.id} className="bg-white rounded shadow p-6">
                    {editingProduct && editingProduct.id === product.id ? (
                      <div>
                        <h3 className="text-lg font-bold mb-2">
                          <input
                            type="text"
                            name="name"
                            value={editingProduct.name}
                            onChange={handleInputChange}
                            className="border border-gray-300 px-2 py-1 rounded"
                            required
                          />
                        </h3>
                        <p className="text-gray-600 mb-2">
                          <textarea
                            name="description"
                            value={editingProduct.description}
                            onChange={handleInputChange}
                            className="border border-gray-300 px-2 py-1 rounded"
                            required
                          ></textarea>
                        </p>
                        <p className="text-gray-600 mb-2">
                          Price:
                          <input
                            type="number"
                            name="price"
                            value={editingProduct.price}
                            onChange={handleInputChange}
                            className="border border-gray-300 px-2 py-1 rounded"
                            required
                          />
                        </p>
                        <p className="text-gray-600 mb-2">
                          Category:
                          <input
                            type="text"
                            name="category_name"
                            value={editingProduct.category_name}
                            onChange={handleInputChange}
                            className="border border-gray-300 px-2 py-1 rounded"
                            required
                          />
                        </p>
                        <p className="text-gray-600 mb-2">
                          Brand:
                          <input
                            type="text"
                            name="brand"
                            value={editingProduct.brand}
                            onChange={handleInputChange}
                            className="border border-gray-300 px-2 py-1 rounded"
                            required
                          />
                        </p>
                        <p className="text-gray-600 mb-2">
                          Stock: {editingProduct.stock}
                        </p>
                        <img
                          src={editingProduct.image}
                          alt={editingProduct.name}
                          className="w-full h-auto mb-2"
                        />
                        <div className="flex">
                          <button
                            onClick={handleSaveChanges}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full mt-2 mr-2"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full mt-2"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-bold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {product.description}
                        </p>
                        <p className="text-gray-600 mb-2">
                          Price: {product.price}
                        </p>
                        <p className="text-gray-600 mb-2">
                          Category: {product.category_name}
                        </p>
                        <p className="text-gray-600 mb-2">
                          Brand: {product.brand}
                        </p>
                        <p className="text-gray-600 mb-2">
                          Stock: {product.stock}
                        </p>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-auto mb-2"
                        />
                        <button
                          onClick={() => handleEditProduct(product.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full mt-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full mt-2"
                        >
                          Borrar
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm font-medium text-gray-900">
          No tienes acceso a esta página
        </div>
      )}
    </div>
  );
};

export default Admin;
