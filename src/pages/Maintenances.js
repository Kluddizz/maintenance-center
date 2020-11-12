import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import dateFormat from "dateformat";

import Database from "../services/Database";
import AppContext from "../contexts/AppContext";
import AuthContext from "../contexts/AuthContext";
import SystemContext from "../contexts/SystemContext";
import MaintenanceContext from "../contexts/MaintenanceContext";
import UserContext from "../contexts/UserContext";
import StateContext from "../contexts/StateContext";

import StateChip from "../components/StateChip";
import ExtendedTable from "../components/ExtendedTable";
import Grid from "@material-ui/core/Grid";

const Maintenances = ({ ...props }) => {
  const {
    token: [token],
  } = useContext(AuthContext);
  const [maintenances, updateMaintenances] = useContext(MaintenanceContext);
  const [systems] = useContext(SystemContext);
  const [states] = useContext(StateContext);
  const [users] = useContext(UserContext);
  const [, setTitle] = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleAdd = async (item) => {
    const response = await Database.createMaintenance(token, item);

    if (response.success) {
      enqueueSnackbar("Neue Wartung wurde eingetragen", { variant: "success" });
      updateMaintenances();
    } else {
      enqueueSnackbar("Wartung konnte nicht eingetragen werden", {
        variant: "error",
      });
    }
  };

  const handleEdit = async (item) => {
    const response = await Database.editMaintenance(token, item);

    if (response.success) {
      enqueueSnackbar("Wartung wurde geändert", { variant: "success" });
      updateMaintenances();
    } else {
      enqueueSnackbar("Wartung konnte nicht geändert werden", {
        variant: "error",
      });
    }
  };

  const handleDelete = async (items) => {
    for (let item of items) {
      const response = await Database.deleteMaintenance(token, item);

      if (response.success) {
        enqueueSnackbar("Wartung wurde entfernt", { variant: "success" });
        updateMaintenances();
      } else {
        enqueueSnackbar("Wartung konnte nicht entfernt werden", {
          variant: "error",
        });
      }
    }
  };

  const handleClick = (entry) => {
    history.push(`/app/maintenances/${entry.id}`);
  };

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
              { name: "Beschreibung", field: "name" },
              {
                name: "Anlage",
                render: (item) =>
                  systems.find((s) => s.id === item.systemid)?.name,
              },
              { name: "Kunde", field: "customer_name" },
              {
                name: "Termin",
                render: (item) => dateFormat(item.due_date, "dd.mm.yyyy"),
              },
              {
                name: "Mitarbeiter",
                render: (item) => {
                  const user = users.find((u) => u.id === item.userid);
                  return `${user?.firstname ?? ""} ${user?.lastname ?? ""}`;
                },
              },
              {
                name: "Status",
                render: (item) => (
                  <StateChip label={item.state_name} color={item.state_color} />
                ),
              },
            ]}
            itemFields={[
              {
                name: "name",
                description: "Beschreibung",
                type: "string",
              },
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
                name: "start_date",
                description: "Startzeitpunkt",
                type: "datetime",
              },
              {
                name: "frequency",
                description: "Anzahl der Monate bis zur Wiederholung",
                type: "integer",
              },
              {
                name: "stateid",
                description: "Status",
                type: "list",
                options: {
                  list: states,
                  mapField: (item) => item.name,
                },
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
              click: {
                action: handleClick,
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Maintenances;
