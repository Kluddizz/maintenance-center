import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import SystemContext from "../contexts/SystemContext";

import StateChip from "../components/StateChip";

import ExtendedTable from "../components/ExtendedTable";
import Grid from "@material-ui/core/Grid";

const maintenances = [
  {
    id: 0,
    system: "Kläranlage Eiderstedt",
    customer: "DHSV Eiderstedt",
    dueDate: "05.05.2020",
    employee: "Max Mustermann",
    state: 1,
  },
  {
    id: 1,
    system: "Kläranlage Eiderstedt",
    customer: "DHSV Eiderstedt",
    dueDate: "05.05.2020",
    employee: "Max Mustermann",
    state: 1,
  },
  {
    id: 2,
    system: "Kläranlage Eiderstedt",
    customer: "DHSV Eiderstedt",
    dueDate: "05.05.2020",
    employee: "Max Mustermann",
    state: 0,
  },
  {
    id: 3,
    system: "Kläranlage Eiderstedt",
    customer: "DHSV Eiderstedt",
    dueDate: "05.05.2020",
    employee: "Max Mustermann",
    state: 0,
  },
  {
    id: 4,
    system: "Kläranlage Eiderstedt",
    customer: "DHSV Eiderstedt",
    dueDate: "05.05.2020",
    employee: "Max Mustermann",
    state: 0,
  },
];

const Maintenances = ({ ...props }) => {
  const handleAdd = async () => {};

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
