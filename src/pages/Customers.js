import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import CustomerContext from "../contexts/CustomerContext";
import MaintenanceContext from "../contexts/MaintenanceContext";
import AuthContext from "../contexts/AuthContext";
import Database from "../services/Database";
import ExtendedTable from "../components/ExtendedTable";
import { parseAddress } from "../utils/StringUtils";

import { useSnackbar } from "notistack";

import Grid from "@material-ui/core/Grid";

const Customers = ({ ...props }) => {
  const {
    token: [token],
    user: [user],
  } = useContext(AuthContext);

  const [, setTitle] = useContext(AppContext);
  const [customers, updateCustomers] = useContext(CustomerContext);
  const [, updateMaintenances] = useContext(MaintenanceContext);

  const { enqueueSnackbar } = useSnackbar();

  const handleEdit = async (customer) => {
    const response = await Database.editCustomer(token, customer);

    if (response.success) {
      enqueueSnackbar(`Der Kunde '${customer.name}' wurde geändert.`, {
        variant: "success",
      });

      updateCustomers();
      updateMaintenances();
    } else {
      enqueueSnackbar(
        `Der Kunde '${customer.name}' konnte nicht geändert werden.`,
        { variant: "error" }
      );
    }
  };

  const handleAdd = async (customer) => {
    const response = await Database.createCustomer(token, customer);

    if (response.success) {
      enqueueSnackbar("Kunde wurde angelegt", {
        variant: "success",
      });

      updateCustomers();
    } else {
      enqueueSnackbar("Kunde konnte nicht erstellt werden", {
        variant: "error",
      });
    }
  };

  const handleDelete = async (selected) => {
    for (let customer of selected) {
      Database.deleteCustomer(token, customer).then((res) => {
        if (res.success) {
          enqueueSnackbar(`Kunde '${customer.name}' wurde gelöscht`, {
            variant: "success",
          });
          updateCustomers();
        } else {
          enqueueSnackbar(
            `Kunde '${customer.name}' konnte nicht gelöscht werden`,
            { variant: "error" }
          );
        }
      });
    }
  };

  const actions = {
    add: {
      header: "Kunde hinzufügen",
      dialogTitle: "Neuen Kunden hinzufügen",
      dialogDescription:
        "Bitte füllen Sie das folgende Formular aus, um einen neuen Kunden hinzuzufügen.",
      action: handleAdd,
    },
    delete: {
      header: "Kunde löschen",
      dialogTitle: "Möchten Sie die Kunden wirklich löschen?",
      dialogDescription:
        "Diese Aktion kann nicht mehr rückgängig gemacht werden.",
      action: handleDelete,
    },
    edit: {
      dialogTitle: "Vorhandenen Kunden bearbeiten",
      dialogDescription:
        "Bitte füllen Sie das Formular aus, um den vorhandenen Kunden zu bearbeiten.",
      action: handleEdit,
    },
  };

  useEffect(() => {
    setTitle("Kunden");
  }, [setTitle]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <ExtendedTable
            title="Kunden"
            items={customers}
            headers={[
              { name: "Name", field: "name" },
              { name: "Ansprechparner", field: "contactperson" },
              {
                name: "Adresse",
                render: (item) =>
                  parseAddress(item.street, item.zip, item.city),
              },
              { name: "E-Mail", field: "email" },
              { name: "Telefon", field: "phone" },
            ]}
            actions={user?.isAdmin() ? actions : undefined}
            itemFields={[
              {
                name: "name",
                description: "Name des Kunden",
                type: "string",
              },
              {
                name: "contactperson",
                description: "Ansprechpartner",
                type: "string",
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
              {
                name: "email",
                description: "E-Mail",
                type: "string",
              },
              {
                name: "phone",
                description: "Telefon",
                type: "string",
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Customers;
