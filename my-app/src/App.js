import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductPreview from "./components/ProductPreview";
import OrdersHistory from "./components/OrdersHistory";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RegisterContextProvider from "./context/RegisterContext";
import LoginContextProvider from "./context/LoginContext";
import Cart from "./components/Cart";
import SingleProduct from "./components/SingleProduct";
import ClickedProductContextProvider from "./context/ClickedProductContext";
import Checkout from "./components/Checkout";
import CheckoutConfirmed from "./components/CheckoutConfirmed";

import { CartProvider } from "./context/CartContext";
import Admin from "./components/Admin";

import Profile from "./components/Profile";

import SuperAdmin from "./components/SuperAdmin";
import { useState } from "react";
import useAdmin from "./hooks/useAdmin";

function App() {
  const [searchBar, setSearchBar] = useState("");

  const { hasAcces } = useAdmin();

  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="App">
      <Navbar
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isSmall={false}
      />

      <ToastContainer />
      <Routes>
        <Route
          path="/register"
          element={
            <RegisterContextProvider>
              <Register />
            </RegisterContextProvider>
          }
        />
        <Route
          path="/login"
          element={
            <LoginContextProvider>
              <Login />
            </LoginContextProvider>
          }
        />
        <Route
          path="/"
          element={
            <CartProvider>
              <ClickedProductContextProvider>
                <ProductPreview
                  searchBar={searchBar}
                  setSearchBar={setSearchBar}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  isSmall={true}
                />
              </ClickedProductContextProvider>
            </CartProvider>
          }
        />

        <Route
          path="/product/:productId"
          element={
            <CartProvider>
              <ClickedProductContextProvider>
                <SingleProduct />
              </ClickedProductContextProvider>
            </CartProvider>
          }
        />

        <Route
          path="/checkout"
          element={
            <CartProvider>
              <div className="h-screen">
                <Checkout />
              </div>
            </CartProvider>
          }
        ></Route>
        <Route
          path="/checkout/confirmation"
          element={
            <div className="h-screen">
              <CheckoutConfirmed />
            </div>
          }
        ></Route>

        <Route path="/orders" element={<OrdersHistory />} />
        {hasAcces ? (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/superadmin" element={<SuperAdmin />} />
          </>
        ) : (
          ""
        )}
        <Route path="/add-product" element={<Admin />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
