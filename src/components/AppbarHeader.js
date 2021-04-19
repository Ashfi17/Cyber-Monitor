import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const AppbarHeader = (props) => {
  const classes = useStyles();
  var today = new Date();
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(monthNames[today.getMonth()]); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + " '" + dd + ", " + yyyy;

  return (
    <AppBar
      position="fixed"
      // variant=""
      anchor="left"
      className={"appMainBar"}
      elevation={0}
    >
      <Toolbar
        style={{
          backgroundColor: "#F1F3F9",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="small" style={{ color: "black" }} />
          }
          aria-label="breadcrumb"
        >
          <Typography
            style={{ color: "#262C49", opacity: 0.5, fontWeight: "bold" }}
          >
            Compliance
          </Typography>
          <Typography style={{ color: "#262C49", fontWeight: "bold" }}>
            Overview
          </Typography>
        </Breadcrumbs>
        <Typography style={{ color: "#262C49", fontWeight: "bold" }}>
          {today}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default AppbarHeader;
