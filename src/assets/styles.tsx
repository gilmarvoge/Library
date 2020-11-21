const appDefaultColor = "#f39224";
const appDefaultColorHover = "#fff7e8";
const primaryColor = "#9c27b0";
const warningColor = "#ff9800";
const dangerColor = "#f44336";
const successColor = "#4caf50";
const infoColor = "#00acc1";
const roseColor = "#e91e63";
const grayColor = "#999999";

const container = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  "@media (min-width: 768px)": {
    width: "750px"
  },
  "@media (min-width: 992px)": {
    width: "970px"
  },
  "@media (min-width: 1200px)": {
    width: "1170px"
  },
  "&:before,&:after": {
    display: "table",
    content: '" "'
  },
  "&:after": {
    clear: "both"
  }
};

const title = {
  color: "#3C4858",
  textDecoration: "none",
  fontWeight: "300",
  marginTop: "30px",
  marginBottom: "25px",
  minHeight: "32px",
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  "& small": {
    color: "#777",
    fontSize: "65%",
    fontWeight: "400",
    lineHeight: "1"
  }
};

const appBoxShadow = {
  boxShadow:
    "0 12px 20px -10px rgba(243,146,36), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(243,146,36)"
};

const appCardHeader = {
  background: "linear-gradient(#e88606, #f08f1e, #f39224)",
  ...appBoxShadow
};



// const cardTitle = createStyles({
//   ...title,
//   marginTop: "0",
//   marginBottom: "3px",
//   minHeight: "auto",
//   "& a": {
//     ...title,
//     marginTop: ".625rem",
//     marginBottom: "0.75rem",
//     minHeight: "auto"
//   }
// });

export {
  appDefaultColor,
  container,
  appCardHeader,
  appDefaultColorHover,
  appBoxShadow,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  // cardTitle,
};
