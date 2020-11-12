import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import AuthContext from "../contexts/AuthContext";
import SystemContext from "../contexts/SystemContext";
import UserContext from "../contexts/UserContext";
import Database from "../services/Database";
import { isAdmin } from "../utils/RoleUtils";

import ProgressBarRow from "../components/ProgressBarRow";
import StateChip from "../components/StateChip";
import ExtendedTable from "../components/ExtendedTable";
import dateFormat from "dateformat";

import Grid from "@material-ui/core/Grid";

const Dashboard = () => {
  const {
    token: [token],
    user: [user],
  } = useContext(AuthContext);
  const [, setTitle] = useContext(AppContext);
  const [systems] = useContext(SystemContext);
  const [users] = useContext(UserContext);
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    setTitle("Dashboard");

    if (user) {
      if (isAdmin(user)) {
        Database.getMaintenances(token, "/year/2020").then((res) => {
          if (res.success) {
            setMaintenances(res.maintenances);
          }
        });
      } else {
        Database.getMaintenances(token, `/user/${user.id}/year/2020`).then(
          (res) => {
            if (res.success) {
              setMaintenances(res.maintenances);
            }
          }
        );
      }
    }
  }, [setTitle, token, user]);

  return (
    <div>
      <Grid container spacing={3}>
        <ProgressBarRow />
        <Grid item xs={12}>
          <ExtendedTable
            title="Anstehende Wartungen in diesem Jahr"
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
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
