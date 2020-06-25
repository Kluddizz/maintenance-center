import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const Maintenances = ({ ...props }) => {
  const [, setTitle] = useContext(AppContext);

  useEffect(() => {
    setTitle("Wartungen");
  }, [setTitle]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Wartungen" />
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Maintenances;
