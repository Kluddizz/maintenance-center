import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...others }) => {
  const {
    token: [token],
  } = useContext(AuthContext);

  return (
    <Route
      {...others}
      render={(props) =>
        token && token !== "null" && token !== "undefined" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
