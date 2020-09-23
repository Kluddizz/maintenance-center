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
          <ExtendedTable
            title="Anlagen"
            items={[]}
            headers={[
              { name: "Name", field: "name" },
              { name: "Kunde", field: "customerid" },
              {
                name: "Adresse",
                render: (item) => `${item.street}, ${item.zip} ${item.city}`,
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Systems;
