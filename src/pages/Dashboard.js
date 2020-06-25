import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";

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

const useStyles = makeStyles(theme => ({
  tableHeader: {
    fontWeight: 900
  },

  card: {
    height: "100%"
  },

  cardContentRoot: {
    "&:last-child": {
      paddingBottom: 0
    }
  },

  cardContent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  }
}));

const tableHeaders = [
  { title: "Anlage" },
  { title: "Kunde" },
  { title: "Termin" },
  { title: "Mitarbeiter" },
  { title: "Status" }
];

const maintenances = [
  {
    id: 0,
    system: "Kläranlage Eiderstedt",
    customer: "DHSV Eiderstedt",
    dueDate: "05.05.2020",
    employee: "Max Mustermann",
    state: 1
  },
  {
    id: 1,
    system: "Kläranlage Eiderstedt",
    customer: "DHSV Eiderstedt",
    dueDate: "05.05.2020",
    employee: "Max Mustermann",
    state: 1
  },
  {
    id: 2,
    system: "Kläranlage Eiderstedt",
    customer: "DHSV Eiderstedt",
    dueDate: "05.05.2020",
    employee: "Max Mustermann",
    state: 0
  },
  {
    id: 3,
    system: "Kläranlage Eiderstedt",
    customer: "DHSV Eiderstedt",
    dueDate: "05.05.2020",
    employee: "Max Mustermann",
    state: 0
  },
  {
    id: 4,
    system: "Kläranlage Eiderstedt",
    customer: "DHSV Eiderstedt",
    dueDate: "05.05.2020",
    employee: "Max Mustermann",
    state: 0
  }
];

const Dashboard = ({ ...props }) => {
  const classes = useStyles();
  const [, setTitle] = useContext(AppContext);

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <ProgressCard
            title="Abgeschlossene Wartungen"
            subtitle="in diesem Jahr"
            value={60}
            className={classes.card}
          ></ProgressCard>
        </Grid>
        <Grid item xs={6}>
          <ProgressCard
            title="Angefertigte Protokolle"
            subtitle="in diesem Jahr"
            value={60}
            className={classes.card}
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
                <TableBody>
                  {maintenances.map(maintenance => (
                    <TableRow key={maintenance.id}>
                      <TableCell>{maintenance.system}</TableCell>
                      <TableCell>{maintenance.customer}</TableCell>
                      <TableCell>{maintenance.dueDate}</TableCell>
                      <TableCell>{maintenance.employee}</TableCell>
                      <TableCell>
                        <StateChip state={maintenance.state} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      labelRowsPerPage="Zeilen pro Seite"
                      rowsPerPageOptions={[5, 10, 25]}
                      count={maintenances.length}
                      rowsPerPage={5}
                      page={0}
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
