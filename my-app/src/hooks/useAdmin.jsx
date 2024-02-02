import axios from "axios";
import { useEffect, useState } from "react";

const useAdmin = () => {
  const [users, setUsers] = useState([]);
  const [hasAccess, setHasAccess] = useState(false);
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
      } catch (error) {
        return { msg: "Error retrieving users", error };
      }
    };

    userSetter();
  }, []);
  return { hasAccess, users, setUsers };
};
export default useAdmin;
