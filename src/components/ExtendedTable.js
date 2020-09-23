import React, { useState, useEffect } from "react";

import ConfirmDialog from "./ConfirmDialog";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
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
import EditIcon from "@material-ui/icons/Edit";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    fontWeight: 900,
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

  cardHeader: {
    display: "flex",
  },

  tableActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
}));

const ExtendedTable = ({ itemFields, headers, title, actions, items }) => {
  const classes = useStyles();

  const [selected, setSelected] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(items ?? []);
  }, [items]);

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmDialogNo = () => {
    closeConfirmDialog();
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedItem(null);
  };

  const confirmEditItem = async () => {
    actions.edit.action(selectedItem);
    closeEditDialog();
  };

  const changeNewItem = (property, event) => {
    setNewItem({
      ...newItem,
      [property]: event.currentTarget.value,
    });
  };

  const changeSelectedItem = (property, event) => {
    setSelectedItem({
      ...selectedItem,
      [property]: event.currentTarget.value,
    });
  };

  const handleAddItem = async () => {
    actions.add.action(newItem);
    setAddDialogOpen(false);
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      const newSelected = [...entries];
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const editItem = (item) => {
    setSelectedItem({ ...item });
    setEditDialogOpen(true);
  };

  const handleConfirmDialogYes = () => {
    actions.delete.action(selected);
    setSelected([]);
    closeConfirmDialog();
  };

  const handleMenuItemAdd = (popupState) => {
    popupState.close();
    setAddDialogOpen(true);
  };

  const handleMenuItemDelete = (popupState) => {
    popupState.close();
    setConfirmDialogOpen(true);
  };

  return (
    <>
      <Card>
        <div className={classes.cardHeader}>
          <CardHeader title={title} />
          <div className={classes.tableActions}>
            <PopupState variant="popover">
              {(popupState) => {
                return (
                  <>
                    {actions ? (
                      <>
                        <IconButton {...bindTrigger(popupState)}>
                          <MoreVertIcon />
                        </IconButton>

                        <Menu {...bindMenu(popupState)}>
                          {actions?.add ? (
                            <MenuItem
                              onClick={() => handleMenuItemAdd(popupState)}
                            >
                              {actions.add.header ?? "Hinzufügen"}
                            </MenuItem>
                          ) : null}

                          {actions?.delete ? (
                            <MenuItem
                              onClick={() => handleMenuItemDelete(popupState)}
                            >
                              {actions.delete.header ?? "Löschen"}
                            </MenuItem>
                          ) : null}
                        </Menu>
                      </>
                    ) : null}
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
                    indeterminate={
                      selected?.length > 0 && selected?.length < entries?.length
                    }
                    checked={
                      entries?.length > 0 &&
                      selected?.length === entries?.length
                    }
                    onChange={selectAll}
                  />
                </TableCell>
                {headers?.map((header, idx) => {
                  return (
                    <TableCell className={classes.tableHeader} key={idx}>
                      {header.name}
                    </TableCell>
                  );
                })}
                <TableCell padding="checkbox" />
              </TableRow>
            </TableHead>
            <TableBody>
              {entries?.map((entry) => {
                const selectItem = (event) => {
                  let newSelected = [];

                  if (!selected.find((x) => x.id === entry.id)) {
                    newSelected = newSelected.concat(selected, entry);
                  } else {
                    newSelected = selected.filter((s) => s.id !== entry.id);
                  }

                  setSelected(newSelected);
                };

                return (
                  <TableRow key={entry.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selected.find((s) => s.id === entry.id) !== undefined
                        }
                        onChange={selectItem}
                      />
                    </TableCell>
                    {headers.map((header) => (
                      <TableCell id={header.name}>
                        {header.render
                          ? header.render(entry)
                          : entry[header.field]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton onClick={() => editItem(entry)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage="Zeilen pro Seite"
                  rowsPerPageOptions={[5, 10, 25]}
                  count={entries?.length}
                  rowsPerPage={5}
                  page={0}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        {actions?.add ? (
          <DialogTitle>{actions.add.dialogTitle}</DialogTitle>
        ) : null}
        <DialogContent>
          {actions?.add?.dialogDescription ? (
            <DialogContentText>
              {actions.add.dialogDescription}
            </DialogContentText>
          ) : null}

          {itemFields?.map((field) => {
            switch (field.type) {
              case "string":
              default:
                return (
                  <TextField
                    id={field.name}
                    onChange={(event) => changeNewItem(field.name, event)}
                    label={field.description}
                    fullWidth
                    margin="dense"
                    autoFocus
                  />
                );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleAddItem} color="primary">
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        {actions?.edit?.dialogTitle ? (
          <DialogTitle>{actions.edit.dialogTitle}</DialogTitle>
        ) : null}
        <DialogContent>
          {actions?.edit?.dialogDescription ? (
            <DialogContentText>
              {actions.edit.dialogDescription}
            </DialogContentText>
          ) : null}
          {itemFields?.map((field) => {
            switch (field.type) {
              case "string":
              default:
                return (
                  <TextField
                    onChange={(event) => changeSelectedItem(field.name, event)}
                    label={field.description}
                    fullWidth
                    margin="dense"
                    autoFocus
                    value={selectedItem ? selectedItem[field.name] : null}
                  />
                );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Abbrechen
          </Button>
          <Button onClick={confirmEditItem} color="primary">
            Übernehmen
          </Button>
        </DialogActions>
      </Dialog>

      {actions?.delete ? (
        <ConfirmDialog
          open={confirmDialogOpen}
          onClose={closeConfirmDialog}
          onYes={handleConfirmDialogYes}
          onNo={handleConfirmDialogNo}
          title={actions.delete.dialogTitle}
          description={actions.delete.dialogDescription}
        />
      ) : null}
    </>
  );
};

export default ExtendedTable;
