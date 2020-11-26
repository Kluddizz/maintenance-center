import React, { useCallback, useState, useEffect, createContext } from "react";
import { useCookies } from "react-cookie";

import Auth from "../services/Auth";

const AuthContext = createContext();

const AuthProvider = ({ ...props }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const [payload, setPayload] = useState();
  const [user, setUser] = useState();

  const token = cookies.auth_token;

  const updateUser = useCallback(async () => {
    if (payload) {
      const response = await Auth.getUser(token, payload.id);

      if (response.success) {
        response.user.isAdmin = () => response.user.roleid === 0;
        setUser(response.user);
      }
    }
  }, [token, payload]);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  const setToken = useCallback(
    (value) => {
      setCookie("auth_token", value);
    },
    [setCookie]
  );

  const removeToken = useCallback(() => {
    removeCookie("auth_token");
  }, [removeCookie]);

  useEffect(() => {
    if (token && token !== "null" && token !== "undefined") {
      const parts = token.split(".");

      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        setPayload(payload);
      }
    }
  }, [token]);

  const value = {
    token: [token, setToken, removeToken],
    payload: [payload, setPayload],
    user: [user, updateUser],
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { AuthContext as default, AuthProvider };
