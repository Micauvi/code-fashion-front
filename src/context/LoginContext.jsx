import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginContextDefaultValues = {
  email: "",
  password: "",
};

export const LoginContext = createContext(LoginContextDefaultValues);

const LoginContextProvider = ({ children }) => {
  const [userToLogin, setuserToLogin] = useState(LoginContextDefaultValues);
  const navigate = useNavigate();
  const setLoginInput = (e) => {
    setuserToLogin({ ...userToLogin, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/user/login",
        { ...userToLogin },
        { withCredentials: true }
      );

      setuserToLogin(LoginContextDefaultValues);
      navigate("/");
      return;
    } catch (error) {
      return { msg: "Error at login attempt", error };
    }
  };

  return (
    <LoginContext.Provider value={{ userToLogin, setLoginInput, loginUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
