import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import AuthContext from "../contexts/AuthContext";
import SystemContext from "../contexts/SystemContext";
import UserContext from "../contexts/UserContext";
import Database from "../services/Database";

import ProgressCard from "../components/ProgressCard";
import StateChip from "../components/StateChip";
import ExtendedTable from "../components/ExtendedTable";
import dateFormat from "dateformat";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    fontWeight: 900,
  },

  card: {
    height: "100%",
  },

  cardContentRoot: {
    "&:last-child": {
      paddingBottom: 0,
    },
  },

  cardContent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },

  progressColorPrimary: {
    background: "rgba(0, 0, 0, 0.15)",
  },

  maintenanceCardBar: {
    background: "#ee0281",
  },

  protocolCardBar: {
    background: "#02a7ee",
  },

  payedCardBar: {
    background: "#02eeb5",
  },
}));

const Dashboard = ({ ...props }) => {
  const classes = useStyles();

  const {
    token: [token],
  } = useContext(AuthContext);
  const [, setTitle] = useContext(AppContext);
  const [systems] = useContext(SystemContext);
  const [users] = useContext(UserContext);
  const [maintenances, setMaintenances] = useState([]);
  const [maintenanceStats, setMaintenanceStats] = useState({});
  const [protocolStats, setProtocolStats] = useState({});
  const [payedStats, setPayedStats] = useState({});

  useEffect(() => {
    setTitle("Dashboard");

    Database.getStatistics(token, 3).then((res) => {
      if (res.success) {
        setMaintenanceStats(res.statistics);
      }
    });

    Database.getStatistics(token, 4).then((res) => {
      if (res.success) {
        setProtocolStats(res.statistics);
      }
    });

    Database.getStatistics(token, 5).then((res) => {
      if (res.success) {
        setPayedStats(res.statistics);
      }
    });

    Database.getMaintenances(token, { year: 2020 }).then((res) => {
      if (res.success) {
        setMaintenances(res.maintenances);
      }
    });
  }, [setTitle, token]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ProgressCard
            title="Abgeschlossene Wartungen"
            subtitle="in diesem Jahr"
            value={maintenanceStats.actual}
            max={maintenanceStats.total}
            className={classes.card}
            progressClasses={{
              bar: classes.maintenanceCardBar,
              colorPrimary: classes.progressColorPrimary,
            }}
          ></ProgressCard>
        </Grid>
        <Grid item xs={4}>
          <ProgressCard
            title="Angefertigte Protokolle"
            subtitle="in diesem Jahr"
            value={protocolStats.actual}
            max={protocolStats.total}
            className={classes.card}
            progressClasses={{
              bar: classes.protocolCardBar,
              colorPrimary: classes.progressColorPrimary,
            }}
          ></ProgressCard>
        </Grid>
        <Grid item xs={4}>
          <ProgressCard
            title="Bezahlte Rechnungen"
            subtitle="in diesem Jahr"
            value={payedStats.actual}
            max={payedStats.total}
            className={classes.card}
            progressClasses={{
              bar: classes.payedCardBar,
              colorPrimary: classes.progressColorPrimary,
            }}
          ></ProgressCard>
        </Grid>
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
                  return `${user?.firstname} ${user?.lastname}`;
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
