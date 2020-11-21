import {
  appDefaultColor
} from "assets/styles";

const textFieldStyle = {
  root: {
      color: "rgba(0, 0, 0, 0.54) !important"
  },
  underline: {
      "&:after": {
          borderBottomColor: `${appDefaultColor} !important`
      }
  }
};

export default textFieldStyle;
