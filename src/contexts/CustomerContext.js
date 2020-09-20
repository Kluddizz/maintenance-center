import React, { useEffect, useState, useContext, useCallback, createContext } from 'react';
import AuthContext from './AuthContext';
import Database from '../services/Database';

const CustomerContext = createContext();

const CustomerProvider = ({ ...props }) => {
  const { token: [token,] } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);

  const updateCustomers = useCallback(async () => {
    const response = await Database.getCustomers(token);

    if (response.success) {
      setCustomers(response.customers);
    }
  }, [token]);

  useEffect(() => {
    updateCustomers();
  }, [updateCustomers]);

  return (
    <CustomerContext.Provider value={[customers, updateCustomers]}>
      {props.children}
    </CustomerContext.Provider>
  );

};

export {
  CustomerContext as default,
  CustomerProvider
}
