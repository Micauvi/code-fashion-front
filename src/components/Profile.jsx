import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("authToken");
    if (userCookie) {
      try {
        const tokenParts = userCookie.split(".");
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        const userData = JSON.parse(decodedPayload);

        setUserData(userData);
        setOriginalUserData(userData);
      } catch (error) {
        console.log("Error decoding user token:", error);
      }
    }
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/user/profile/${userData.payload.id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("user deleted correctly");
          setUserData(null);
          navigate("/login");
          Cookies.remove("authToken");
        }
      })
      .catch((error) => console.log("error al eliminar un usuario:", error));
  };

  const handleSaveClick = () => {
    const updatedData = {};
    if (userData.payload.first_name !== originalUserData.payload.first_name) {
      updatedData.first_name = userData.payload.first_name;
    }
    if (userData.payload.last_name !== originalUserData.payload.last_name) {
      updatedData.last_name = userData.payload.last_name;
    }
    if (userData.payload.username !== originalUserData.payload.username) {
      updatedData.username = userData.payload.username;
    }
    if (userData.payload.address !== originalUserData.payload.address) {
      updatedData.address = userData.payload.address;
    }
    if (userData.payload.email !== originalUserData.payload.email) {
      updatedData.email = userData.payload.email;
    }

    axios
      .put(
        `http://localhost:8000/api/user/profile/${userData.payload.id}`,
        updatedData
      )
      .then((response) => {
        const updatedUserData = {
          ...userData,
          payload: {
            ...userData.payload,
            ...response.data.payload,
          },
        };

        const encodedPayload = btoa(JSON.stringify(updatedUserData));
        const newToken = `your_token_prefix.${encodedPayload}.your_token_suffix`;
        Cookies.set("authToken", newToken);

        setEditing(false);
        setUserData(updatedUserData);
        setOriginalUserData(updatedUserData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      payload: {
        ...prevUserData.payload,
        [name]: value,
      },
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Perfil de Usuario</h1>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">Nombre</label>
        {editing ? (
          <input
            type="text"
            name="first_name"
            value={userData?.payload?.first_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        ) : (
          <p>{userData?.payload?.first_name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">Apellido</label>
        {editing ? (
          <input
            type="text"
            name="last_name"
            value={userData.payload.last_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        ) : (
          <p>{userData?.payload?.last_name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">Usuario</label>
        {editing ? (
          <input
            type="text"
            name="username"
            value={userData.payload.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        ) : (
          <p>{userData?.payload?.username}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">Email</label>
        {editing ? (
          <input
            type="email"
            name="email"
            value={userData.payload.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        ) : (
          <p>{userData?.payload?.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">Direccion</label>
        {editing ? (
          <input
            type="text"
            name="address"
            value={userData.payload.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        ) : (
          <p>{userData?.payload?.address}</p>
        )}
      </div>
      <div className="flex justify-between">
        {editing ? (
          <button
            onClick={handleSaveClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className=" bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none"
          >
            Editar
          </button>
        )}
        <button
          className=" bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium  focus:outline-none"
          onClick={handleDelete}
        >
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};

export default Profile;
