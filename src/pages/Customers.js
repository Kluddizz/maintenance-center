import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import CustomerContext from "../contexts/CustomerContext";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import MoreVertIcon from "@material-ui/icons/MoreVert";

const tableHeaders = [
  { title: "Name" },
  { title: "Ansprechparner" },
  { title: "Adresse" },
  { title: "E-Mail" },
  { title: "Telefon" }
];

const useStyles = makeStyles(theme => ({
  tableHeader: {
    fontWeight: 900
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
  },

  cardHeader: {
    display: "flex"
  },

  tableActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2)
  }
}));

const Customers = ({ ...props }) => {
  const classes = useStyles();
	const [, setTitle] = useContext(AppContext);
  const [customers,] = useContext(CustomerContext);

	useEffect(() => {
		setTitle("Kunden");
	}, [setTitle]);

	return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <div className={classes.cardHeader}>
              <CardHeader title="Wartungen" />
              <div className={classes.tableActions}>
                <TextField margin="dense" variant="outlined" />
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </div>
            </div>
            <CardContent
              classes={{ root: classes.cardContentRoot }}
              className={classes.cardContent}
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
                  {customers.map(customer => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.contactperson}</TableCell>
                      <TableCell>{customer.street}, {customer.zip} {customer.city}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      labelRowsPerPage="Zeilen pro Seite"
                      rowsPerPageOptions={[5, 10, 25]}
                      count={customers.length}
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

export default Customers;
