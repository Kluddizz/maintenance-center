import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

import Database from "../services/Database";
import AuthContext from "./AuthContext";
import { calcDueDate } from "../utils/DateUtils";

const MaintenanceContext = createContext();

const MaintenanceProvider = ({ ...props }) => {
  const {
    token: [token],
  } = useContext(AuthContext);

  const [maintenances, setMaintenances] = useState([]);

  const updateMaintenances = useCallback(async () => {
    const response = await Database.getMaintenances(token);

    if (response.success) {
      const mapped = response.maintenances.map((m) => ({
        ...m,
        dueDate: calcDueDate(m.start_date, m.frequency),
      }));
      setMaintenances(mapped);
    }
  }, [token]);

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
