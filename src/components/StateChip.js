import React from "react";

import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chip: {
    color: "#FFFFFF",
    fontWeight: 900,
    borderRadius: 5
  },

  chipReady: {
    background: "#4DBF02"
  },

  chipInProgress: {
    background: "#F2DA00"
  },

  chipToDo: {
    background: "#C4C4C4"
  }
}));

const StateChip = ({ state, ...props }) => {
  const classes = useStyles();

  let label = "Unknown State";
  let chipClass;

  switch (state) {
    case 2:
      label = "Fertig";
      chipClass = classes.chipReady;
      break;
    case 1:
      label = "In Bearbeitung";
      chipClass = classes.chipInProgress;
      break;
    case 0:
      label = "Ausstehend";
      chipClass = classes.chipToDo;
      break;
    default:
  }

  return (
    <Chip
      className={classes.chip}
      classes={{ root: chipClass }}
      label={label}
      size="small"
    />
  );
};

export default StateChip;
