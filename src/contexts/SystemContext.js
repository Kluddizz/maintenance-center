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
    user: [user],
  } = useContext(AuthContext);
  const [systems, setSystems] = useState([]);

  const updateSystems = useCallback(async () => {
    if (user) {
      if (user.isAdmin()) {
        const request = await Database.getSystems(token);

        if (request.success) {
          setSystems(request.systems);
        }
      } else {
        const request = await Database.getSystemsForUser(token, user);

        if (request.success) {
          setSystems(request.systems);
        }
      }
    }
  }, [token, user]);

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
