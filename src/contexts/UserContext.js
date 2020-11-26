import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";

import Database from "../services/Database";
import AuthContext from "./AuthContext";

const UserContext = createContext();

const UserProvider = ({ ...props }) => {
  const {
    token: [token],
  } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  const updateUsers = useCallback(async () => {
    const response = await Database.getUsers(token);

    if (response.success) {
      setUsers(response.users);
    }
  }, [token]);

  useEffect(() => {
    updateUsers();
  }, [updateUsers]);

  return (
    <UserContext.Provider value={[users, updateUsers]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext as default, UserProvider };
