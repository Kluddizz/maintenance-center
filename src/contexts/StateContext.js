import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import AuthContext from "./AuthContext";
import Database from "../services/Database";

const StateContext = createContext();

const StateProvider = ({ ...props }) => {
  const {
    token: [token],
  } = useContext(AuthContext);
  const [states, setStates] = useState([]);

  const updateStates = useCallback(async () => {
    const response = await Database.getStates(token);

    if (response.success) {
      setStates(response.states);
    }
  }, [token]);

  useEffect(() => {
    updateStates();
  }, [updateStates]);

  return (
    <StateContext.Provider value={[states, updateStates]}>
      {props.children}
    </StateContext.Provider>
  );
};

export { StateContext as default, StateProvider };
