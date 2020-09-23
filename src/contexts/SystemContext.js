import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
import Database from "../services/Database";
import AuthContext from "./AuthContext";

const SystemContext = createContext();

const SystemProvider = ({ ...props }) => {
  const {
    token: [token],
  } = useContext(AuthContext);
  const [systems, setSystems] = useState([]);

  const updateSystems = useCallback(async () => {
    const request = await Database.getSystems(token);

    if (request.success) {
      setSystems(request.systems);
    }
  }, [token]);

  useEffect(() => {
    updateSystems();
  }, [updateSystems]);

  return (
    <SystemContext.Provider value={[systems, updateSystems]}>
      {props.children}
    </SystemContext.Provider>
  );
};

export { SystemContext as default, SystemProvider };
