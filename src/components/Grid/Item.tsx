import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";

function GridItem({ ...props }) {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid item {...rest} >
      {children}
    </Grid>
  );
}

export default GridItem;
