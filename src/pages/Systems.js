import React, { useEffect, useContext } from "react";
import AppContext from "../contexts/AppContext";

import ExtendedTable from "../components/ExtendedTable";

import Grid from "@material-ui/core/Grid";

const Systems = ({ ...props }) => {
  const [, setTitle] = useContext(AppContext);

  useEffect(() => {
    setTitle("Anlagen");
  }, [setTitle]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <ExtendedTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Systems;
