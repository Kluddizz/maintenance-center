import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import CustomerContext from "../contexts/CustomerContext";
import AuthContext from "../contexts/AuthContext";
import Database from "../services/Database";

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useSnackbar } from "notistack";

import Menu from '@material-ui/core/Menu';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
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
  const { token: [token,] } = useContext(AuthContext);

  const classes = useStyles();
	const [, setTitle] = useContext(AppContext);
  const [customers, updateCustomers] = useContext(CustomerContext);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({});

  const [selected, setSelected] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const changeNewCustomerName = event => {
    setNewCustomer({
      ...newCustomer,
      name: event.currentTarget.value
    });
  };

  const changeNewCustomerContactPerson = event => {
    setNewCustomer({
      ...newCustomer,
      contactperson: event.currentTarget.value
    });
  };

  const changeNewCustomerStreet = event => {
    setNewCustomer({
      ...newCustomer,
      street: event.currentTarget.value
    });
  };

  const changeNewCustomerZip = event => {
    setNewCustomer({
      ...newCustomer,
      zip: event.currentTarget.value
    });
  };

  const changeNewCustomerCity = event => {
    setNewCustomer({
      ...newCustomer,
      city: event.currentTarget.value
    });
  };

  const changeNewCustomerEmail = event => {
    setNewCustomer({
      ...newCustomer,
      email: event.currentTarget.value
    });
  };

  const changeNewCustomerPhone = event => {
    setNewCustomer({
      ...newCustomer,
      phone: event.currentTarget.value
    });
  };

  const handleAddCustomer = async () => {
    const response = await Database.createCustomer(token, newCustomer);

    if (response.success) {
      setAddDialogOpen(false);
      updateCustomers();
    } else {
      enqueueSnackbar("Kunde konnte nicht erstellt werden", { variant: "error" });
    }
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      const newSelected = customers.map(c => c.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const deleteSelected = () => {
    for (let id of selected) {
      const customer = customers.find(c => c.id === id);

      Database.deleteCustomer(token, customer)
        .then(res => {
          if (res.success) {
            updateCustomers();
            setSelected([]);
          } else {
            enqueueSnackbar(
              `Kunde '${customer.name}' konnte nicht gelöscht werden`,
              { variant: "error" }
            );
          }
        });
    }
  };

	useEffect(() => {
		setTitle("Kunden");
	}, [setTitle]);

	return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <div className={classes.cardHeader}>
              <CardHeader title="Kunden" />
              <div className={classes.tableActions}>
                <TextField margin="dense" variant="outlined" />
                  <PopupState variant="popover">
                    {popupState => {
                      const handleAddCustomer = () => {
                        setAddDialogOpen(true);
                        popupState.close();
                      };

                      const handleDeleteCustomer = () => {
                        deleteSelected();
                        popupState.close();
                      };

                      return (
                        <>
                          <IconButton {...bindTrigger(popupState)}>
                            <MoreVertIcon />
                          </IconButton>

                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={handleAddCustomer}>Kunden hinzufügen</MenuItem>
                            <MenuItem onClick={handleDeleteCustomer}>Kunden löschen</MenuItem>
                          </Menu>
                        </>
                      );
                    }}
                  </PopupState>
              </div>
            </div>
            <CardContent
              classes={{ root: classes.cardContentRoot }}
              className={classes.cardContent}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selected.length > 0 && selected.length < customers.length}
                        checked={customers.length > 0 && selected.length === customers.length}
                        onChange={selectAll}
                      />
                    </TableCell>
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
                  {customers.map(customer => {
                    const selectItem = (event) => {
                      let newSelected = [];

                      if (!selected.includes(customer.id)) {
                        newSelected = newSelected.concat(selected, customer.id);
                      } else {
                        newSelected = selected.filter(s => s !== customer.id);
                      }

                      setSelected(newSelected);
                    };

                    return (
                      <TableRow key={customer.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selected.includes(customer.id)}
                            onChange={selectItem}
                          />
                        </TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.contactperson}</TableCell>
                        <TableCell>{customer.street}, {customer.zip} {customer.city}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                      </TableRow>
                    );
                  })}
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

      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Neuen Kunden hinzufügen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bitte füllen Sie das folgende Formular aus, um einen neuen Kunden hinzuzufügen.
          </DialogContentText>

          <TextField
            onChange={changeNewCustomerName}
            label="Name des Kunden"
            fullWidth
            margin="dense"
            autoFocus
          />
          <TextField
            onChange={changeNewCustomerContactPerson}
            label="Ansprechpartner"
            fullWidth
            margin="dense"
          />
          <TextField
            onChange={changeNewCustomerStreet}
            label="Straße"
            fullWidth
            margin="dense"
          />
          <TextField
            onChange={changeNewCustomerZip}
            label="Postleitzahl"
            fullWidth
            margin="dense"
          />
          <TextField
            onChange={changeNewCustomerCity}
            label="Stadt"
            fullWidth
            margin="dense"
          />
          <TextField
            onChange={changeNewCustomerEmail}
            label="E-Mail"
            fullWidth
            margin="dense"
          />
          <TextField
            onChange={changeNewCustomerPhone}
            label="Telefon"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleAddCustomer} color="primary">
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Customers;
