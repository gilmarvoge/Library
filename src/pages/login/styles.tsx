// ##############################
// // // AutPage view styles
// #############################

import {
  container,
  cardTitle
} from "assets/jss/ilog.jsx";

const loginPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    },
  },
  cardTitle: {
    ...cardTitle,
    color: "#FFFFFF"
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "space-around"
  },
  right: {
    justifyContent: "flex-end",
    float: "right"
  },
  left: {
    justifyContent: 'flex-start',
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: "#FFFFFF"
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  socialLine: {
    padding: "0.9375rem 0"
  },
  linearBarColorPrimary: {
    backgroundColor: "#f39224",
  }
});

export default loginPageStyle;
