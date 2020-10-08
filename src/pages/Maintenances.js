import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import SystemContext from "../contexts/SystemContext";
import MaintenanceContext from "../contexts/MaintenanceContext";

import StateChip from "../components/StateChip";

import ExtendedTable from "../components/ExtendedTable";
import Grid from "@material-ui/core/Grid";

const Maintenances = ({ ...props }) => {
  const handleAdd = async () => {};

  const [maintenances] = useContext(MaintenanceContext);
  const [systems] = useContext(SystemContext);
  const [, setTitle] = useContext(AppContext);

  useEffect(() => {
    setTitle("Wartungen");
  }, [setTitle]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <ExtendedTable
            title="Wartungen"
            items={maintenances}
            headers={[
              { name: "Anlage", field: "system" },
              { name: "Kunde", field: "customer" },
              { name: "Termin", field: "dueDate" },
              { name: "Mitarbeiter", field: "employee" },
              { name: "Status", field: "state" },
            ]}
            itemFields={[
              {
                name: "system",
                description: "Anlage",
                type: "list",
                options: {
                  list: systems,
                  mappedField: "name",
                },
              },
            ]}
            actions={{
              add: {
                header: "Wartung hinzufügen",
                action: handleAdd,
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Maintenances;
