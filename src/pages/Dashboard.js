import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import AuthContext from "../contexts/AuthContext";
import Database from "../services/Database";

import ProgressCard from "../components/ProgressCard";
import StateChip from "../components/StateChip";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ExtendedTable from "../components/ExtendedTable";

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

const tableHeaders = [
  { title: "Anlage" },
  { title: "Kunde" },
  { title: "Termin" },
  { title: "Mitarbeiter" },
  { title: "Status" },
];

const Dashboard = ({ ...props }) => {
  const classes = useStyles();

  const {
    token: [token],
  } = useContext(AuthContext);
  const [, setTitle] = useContext(AppContext);
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
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
