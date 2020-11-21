import React from "react";
// @material-ui/core components
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
//styles
import textFieldStyle from "./styles";

function RegularTextField({ ...props }) {
  const {
    classes,
    children,
    ...rest
  } = props;

  return (
    <TextField {...rest}    
      // InputProps={{
      //   // classes: {
      //   //   underline: classes.underline,
      //   // },
      //   props
      // }}
      InputLabelProps={{
        classes: {
          root: classes.root
        }
      }}
    >
      {children}
    </TextField>
  );
}
export default withStyles(textFieldStyle)(RegularTextField)








