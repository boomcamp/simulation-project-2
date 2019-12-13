import React from "react";

import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  DialogActions
} from "@material-ui/core";

export default function AppBarComponent(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item xl={1}>
            <Typography
              variant="h6"
              style={{
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontWeight: "bold"
              }}
            >
              {" "}
              Cryptocurrency
            </Typography>
          </Grid>
          <Grid item xl={1}>
            <span>Current Page||{props.activePage} </span>
          </Grid>

          {/* } */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
