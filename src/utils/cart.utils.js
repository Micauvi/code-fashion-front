import axios from "axios";
import { getLoggedUser } from "./login.utils";

export const checkoutCart = async (cartItems) => {
  try {
    const loggedUser = getLoggedUser();
    const result = await axios.post(
      "http://localhost:8000/api/orderhistory/create",
      { cartItems, loggedUser },
      {
        withCredentials: true,
      }
    );

    return result.data;
  } catch (error) {
    return error;
  }
};
