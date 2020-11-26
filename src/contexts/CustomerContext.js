import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  createContext,
} from "react";
import AuthContext from "./AuthContext";
import Database from "../services/Database";

const CustomerContext = createContext();

const CustomerProvider = ({ ...props }) => {
  const {
    token: [token],
    user: [user],
  } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);

  const updateCustomers = useCallback(async () => {
    if (user) {
      if (user.isAdmin()) {
        const response = await Database.getCustomers(token);

        if (response.success) {
          setCustomers(response.customers);
        }
      } else {
        const response = await Database.getCustomersForUser(token, user);

        if (response.success) {
          setCustomers(response.customers);
        }
      }
    }
  }, [token, user]);

  useEffect(() => {
    updateCustomers();
  }, [updateCustomers]);

  return (
    <CustomerContext.Provider value={[customers, updateCustomers]}>
      {props.children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext as default, CustomerProvider };
