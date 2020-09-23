import React, { useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import AppContext from "../contexts/AppContext";
import SystemContext from "../contexts/SystemContext";
import CustomerContext from "../contexts/CustomerContext";
import Database from "../services/Database";
import ExtendedTable from "../components/ExtendedTable";

import { useSnackbar } from "notistack";

import Grid from "@material-ui/core/Grid";

const Systems = ({ ...props }) => {
  const {
    token: [token],
  } = useContext(AuthContext);
  const [systems, updateSystems] = useContext(SystemContext);
  const [customers] = useContext(CustomerContext);
  const [, setTitle] = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleAdd = async (system) => {
    const response = await Database.createSystem(token, system);

    if (response.success) {
      updateSystems();
    } else {
      enqueueSnackbar(`Die Anlage '${system.name}' wurde erstellt`, {
        variant: "success",
      });
    }
  };

  const handleEdit = async (system) => {
    const response = await Database.editSystem(token, system);

    if (response.success) {
      updateSystems();
      enqueueSnackbar(`Die Anlage '${system.name}' wurde aktualisiert.`, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(
        `Die Anlage '${system.name}' konnte nicht bearbeitet werden`,
        { variant: "error" }
      );
    }
  };

  const handleDelete = async (systems) => {
    for (let system of systems) {
      const response = await Database.deleteSystem(token, system);

      if (response.success) {
        updateSystems();
      } else {
        enqueueSnackbar(
          `Die Anlage '${system.name}' konnte nicht gelöscht werden`,
          { variant: "error" }
        );
      }
    }
  };

  useEffect(() => {
    setTitle("Anlagen");
  }, [setTitle]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <ExtendedTable
            title="Anlagen"
            items={systems}
            headers={[
              { name: "Name", field: "name" },
              {
                name: "Kunde",
                render: (item) =>
                  customers.find((c) => c.id === item.customerid)?.name,
              },
              {
                name: "Adresse",
                render: (item) => `${item.street}, ${item.zip} ${item.city}`,
              },
            ]}
            itemFields={[
              {
                name: "name",
                description: "Bezeichnung der Anlage",
                type: "string",
              },
              {
                name: "customerid",
                description: "Kunde",
                type: "list",
                options: {
                  list: customers,
                  mappedField: "name",
                },
              },
              {
                name: "street",
                description: "Straße",
                type: "string",
              },
              {
                name: "zip",
                description: "Postleitzahl",
                type: "integer",
              },
              {
                name: "city",
                description: "Stadt",
                type: "string",
              },
            ]}
            actions={{
              add: {
                header: "Anlage hinzufügen",
                dialogTitle: "Neue Anlage hinzufügen",
                dialogDescription: "Füllen Sie folgendes Formular aus.",
                action: handleAdd,
              },
              edit: {
                dialogTitle: "Vorhandene Anlage bearbeiten",
                dialogDescription:
                  "Ändern Sie folgende Felder, um die Anlage zu bearbeiten.",
                action: handleEdit,
              },
              delete: {
                header: "Anlage löschen",
                dialogTitle: "Möchten Sie diese Anlagen wirklich löschen?",
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

export default Systems;
