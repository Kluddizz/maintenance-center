import React, { useCallback, useState, useEffect, createContext } from "react";
import { useCookies } from "react-cookie";

import Auth from "../services/Auth";

const AuthContext = createContext();

const useCookie = key => {
  const [cookies, setCookie] = useCookies([key]);
  const [value, setValue] = useState(cookies[key]);

  useEffect(() => {
    setCookie(key, value);
  }, [key, value, setCookie]);

  return [value, setValue];
};

const AuthProvider = ({ ...props }) => {
  const [token, setToken] = useCookie("auth_token");
  const [payload, setPayload] = useState();
  const [user, setUser] = useState();

  const updateUser = useCallback(async () => {
    const response = await Auth.getUser(token);

    if (response.success) {
      setUser(response.user);
    }
  }, [token]);

  useEffect(() => {
    if (token && token !== "null" && token !== "undefined") {
      const parts = token.split(".");

      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        setPayload(payload);
        updateUser();
      }
    }
  }, [token, updateUser]);

  const value = {
    token: [token, setToken],
    payload: [payload, setPayload],
    user: [user, updateUser]
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { AuthContext as default, AuthProvider };
