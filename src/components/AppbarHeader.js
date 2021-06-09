import React, { useContext, useEffect } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

  const [tabNdMobViewIs, setTabNdMobViewIs] = React.useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
    handleResizeWindow();
  }, []);

  const handleResizeWindow = () => {
    var windowInnerWidth = window.innerWidth;
    if (windowInnerWidth <= 960) {
      setTabNdMobViewIs(true);
    } else {
      setTabNdMobViewIs(false);
    }
  };

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
          {/* {tabNdMobViewIs &&
            <Typography>
              <IconButton aria-label="menu" style={{ color: "#262C49" }} onClick={props.toggleDrawer("left", true)}>
                <MenuIcon />
              </IconButton>
            </Typography>
          } */}
          <Typography
            style={{ color: "#262C49", opacity: 0.5, fontWeight: "bold" }}
          >
            Compliance
          </Typography>

          <Typography style={{ color: "#262C49", fontWeight: "bold" }}>
            {props.pageName}
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
