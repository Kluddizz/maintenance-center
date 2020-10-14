import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import AuthContext from "../contexts/AuthContext";
import Database from "../services/Database";

import ProgressCard from "../components/ProgressCard";
import StateChip from "../components/StateChip";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
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
          <Card className={classes.card}>
            <CardHeader title="Anstehende Wartungen" />

            <CardContent
              className={classes.cardContent}
              classes={{ root: classes.cardContentRoot }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map((header, idx) => {
                      return (
                        <TableCell className={classes.tableHeader} key={idx}>
                          {header.title}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      labelRowsPerPage="Zeilen pro Seite"
                      rowsPerPageOptions={[5, 10, 25]}
                      count={10}
                      rowsPerPage={5}
                      page={0}
                      onChangePage={() => {}}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
