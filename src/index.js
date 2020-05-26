import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { SnackbarProvider } from "notistack";

import App from "./App";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CookiesProvider } from "react-cookie";

import * as serviceWorker from "./serviceWorker";
import "./index.css";

ReactDOM.render(
  <Router>
    <Switch>
      <CookiesProvider>
        <AuthProvider>
          <AppProvider>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <PrivateRoute path="/app" component={App} />
              <Route path="/login" component={Login} />
              <Redirect from="/" to="/app/dashboard" />
            </SnackbarProvider>
          </AppProvider>
        </AuthProvider>
      </CookiesProvider>
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
