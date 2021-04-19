import React from "react";
import clsx from "clsx";

import { makeStyles, Breadcrumbs, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from '@material-ui/core/Button';

import { useSelector } from "react-redux";
import AppbarHeader from "../AppbarHeader";
import DrawerMenu from "../DrawerMenu";
// import Footer from "../Footer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: "24px 60px 64px 60px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const LayoutContainer = (props) => {
  const classes = useStyles();
  const store = useSelector((state) => state);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { ui } = store;

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div style={{ backgroundColor: "#F1F3F9", minHeight: "100vh" }}>
      <div className={classes.root}>
        <CssBaseline />
        {/* <Button onClick={toggleDrawer("left", true)}>Left</Button> */}
        <AppbarHeader />

        {/* DRAWER MENU */}
        <DrawerMenu state={state} toggleDrawer={toggleDrawer} />
        <main className="mainContent">
          <div className={classes.drawerHeader} />
          {props.children}
        </main>
      </div>
    </div>
  );
};
export default LayoutContainer;
