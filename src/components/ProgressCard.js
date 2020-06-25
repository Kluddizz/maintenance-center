import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  progressLabel: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1)
  }
}));

const ProgressCard = ({ title, subtitle, value = 0, max = 100, ...props }) => {
  const classes = useStyles();

  const percentage = parseInt((value / max) * 100.0);

  return (
    <Card {...props}>
      <CardHeader title={title} subheader={subtitle} />
      <CardContent>
        <div className={classes.progressLabel}>
          <Typography variant="body2">
            {value} / {max}
          </Typography>
          <Typography variant="body1">{percentage}%</Typography>
        </div>
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={percentage}
        />
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
