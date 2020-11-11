import React, { useEffect, useState, useContext } from "react";
import { isAdmin, isMaintenancer } from "../utils/RoleUtils";
import AuthContext from "../contexts/AuthContext";
import Database from "../services/Database";

import ProgressCard from "../components/ProgressCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
  },

  payedCardBar: {
    background: "#02eeb5",
  },

  maintenanceCardBar: {
    background: "#ee0281",
  },

  protocolCardBar: {
    background: "#02a7ee",
  },

  progressColorPrimary: {
    background: "rgba(0, 0, 0, 0.15)",
  },
}));

const ProgressBarRow = () => {
  const classes = useStyles();

  const {
    token: [token],
    user: [user],
  } = useContext(AuthContext);
  const [maintenanceStats, setMaintenanceStats] = useState({});
  const [protocolStats, setProtocolStats] = useState({});
  const [payedStats, setPayedStats] = useState({});

  // We use three cards with the same width as default.
  let cells = 4;

  if (isMaintenancer(user)) {
    // Use half of the space for every overview card.
    // The progress card for payment information will not be displayed for
    // maintenancers.
    cells = 6;
  }

  useEffect(() => {
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
  }, [token]);

  return (
    <>
      <Grid item xs={cells}>
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
      <Grid item xs={cells}>
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
      {isAdmin(user) ? (
        <Grid item xs={cells}>
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
      ) : null}
    </>
  );
};

export default ProgressBarRow;
