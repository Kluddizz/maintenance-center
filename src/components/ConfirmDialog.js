import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ConfirmDialog = ({ onNo, onYes, title, children, ...props }) => {

  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>

      {children}

      <DialogActions>
        <Button onClick={onNo} color="primary">
          Nein
        </Button>
        <Button onClick={onYes} color="primary">
          Ja
        </Button>
      </DialogActions>
    </Dialog>
  );

};

export default ConfirmDialog;
