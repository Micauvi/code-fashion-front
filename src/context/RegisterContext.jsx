import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterContextDefaultValues = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  address: "",
};

export const RegisterContext = createContext(RegisterContextDefaultValues);

const RegisterContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userToRegister, setUserToRegister] = useState(
    RegisterContextDefaultValues
  );
  const setRegisterInput = (e) => {
    setUserToRegister({ ...userToRegister, [e.target.name]: e.target.value });
  };

  const registerUserInDatabase = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/user/create-user", {
        ...userToRegister,
      });
      alert("Usuario creado con exito");
      setUserToRegister(RegisterContextDefaultValues);
      navigate("/login");
      return;
    } catch (error) {
      return { msg: "Error registering user", error };
    }
  };

  return (
    <RegisterContext.Provider
      value={{ userToRegister, setRegisterInput, registerUserInDatabase }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContextProvider;
