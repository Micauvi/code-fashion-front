import axios from "axios";
import { useEffect, useState } from "react";

const useAdmin = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const userSetter = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/users",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setUsers(response.data);
          setHasAccess(true);
        } else if (response.status === 403) {
          setHasAccess(false);
        }
        return hasAccess, users;
      } catch (error) {
        return { msg: "Error retrieving users", error };
      }
    };

    userSetter();
  }, []);
};
export default useAdmin;
