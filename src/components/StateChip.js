import React from "react";

import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chip: {
    color: "#FFFFFF",
    fontWeight: 900,
    borderRadius: 5,
  },
}));

const StateChip = ({ state, label, color, ...props }) => {
  const classes = useStyles();

  return (
    <Chip
      className={classes.chip}
      label={label}
      style={{ background: color }}
      size="small"
    />
  );
};

export default StateChip;
