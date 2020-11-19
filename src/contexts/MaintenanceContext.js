import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

import Database from "../services/Database";
import AuthContext from "./AuthContext";

const MaintenanceContext = createContext();

const MaintenanceProvider = ({ ...props }) => {
  const {
    token: [token],
    user: [user],
  } = useContext(AuthContext);

  const [maintenances, setMaintenances] = useState([]);

  const updateMaintenances = useCallback(async () => {
    if (user) {
      if (user.isAdmin()) {
        const response = await Database.getMaintenances(token);

        if (response.success) {
          setMaintenances(response.maintenances);
        }
      } else {
        const response = await Database.getMaintenances(
          token,
          `/user/${user.id}`
        );

        if (response.success) {
          setMaintenances(response.maintenances);
        }
      }
    }
  }, [token, user]);

  useEffect(() => {
    updateMaintenances();
  }, [updateMaintenances]);

  return (
    <MaintenanceContext.Provider value={[maintenances, updateMaintenances]}>
      {props.children}
    </MaintenanceContext.Provider>
  );
};

export { MaintenanceContext as default, MaintenanceProvider };
