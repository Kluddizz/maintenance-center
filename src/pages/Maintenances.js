import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import SystemContext from "../contexts/SystemContext";
import MaintenanceContext from "../contexts/MaintenanceContext";
import UserContext from "../contexts/UserContext";

import StateChip from "../components/StateChip";

import ExtendedTable from "../components/ExtendedTable";
import Grid from "@material-ui/core/Grid";

const Maintenances = ({ ...props }) => {
  const handleAdd = async (item) => {
    console.log(item);
  };

  const handleEdit = async (item) => {};

  const handleDelete = async (item) => {};

  const [maintenances, updateMaintenances] = useContext(MaintenanceContext);
  const [systems] = useContext(SystemContext);
  const [users] = useContext(UserContext);
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
              { name: "Anlage", field: "systemid" },
              { name: "Kunde", field: "customerid" },
              { name: "Termin", field: "dueDate" },
              { name: "Mitarbeiter", field: "userid" },
              { name: "Status", field: "stateid" },
            ]}
            itemFields={[
              {
                name: "systemid",
                description: "Anlage",
                type: "list",
                options: {
                  list: systems,
                  mapField: (item) => item.name,
                },
              },
              {
                name: "userid",
                description: "Bearbeiter",
                type: "list",
                options: {
                  list: users,
                  mapField: (item) => `${item.firstname} ${item.lastname}`,
                },
              },
              {
                name: "frequency",
                description: "Anzahl der Monate bis zur Wiederholung",
                type: "integer",
              },
            ]}
            actions={{
              add: {
                header: "Wartung hinzufügen",
                dialogTitle: "Neue Wartung hinzufügen",
                dialogDescription: "Füllen Sie folgendes Formular aus.",
                action: handleAdd,
              },
              edit: {
                dialogTitle: "Vorhandene Wartung bearbeiten",
                dialogDescription:
                  "Ändern Sie folgende Felder, um die Wartung zu bearbeiten.",
                action: handleEdit,
              },
              delete: {
                header: "Wartung löschen",
                dialogTitle: "Möchten Sie diese Wartungen wirklich löschen?",
                dialogDescription:
                  "Diese Aktion kann nicht mehr rückgängig gemacht werden.",
                action: handleDelete,
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Maintenances;
