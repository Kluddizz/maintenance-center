import React, { useState, useEffect, createContext } from "react";
import { useCookies } from "react-cookie";

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

  const value = {
    token: [token, setToken],
    payload: [payload, setPayload]
  };

  useEffect(() => {
    if (token && token !== "null" && token !== "undefined") {
      const parts = token.split(".");

      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        setPayload(payload);
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { AuthContext as default, AuthProvider };
