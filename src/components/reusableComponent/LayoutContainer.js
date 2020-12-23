import React from "react";
import clsx from "clsx";

import { makeStyles, Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  const { ui } = store;

  return (
    <div style={{ backgroundColor: "#EAF0F5", minHeight: "100vh" }}>
      <div className={classes.root}>
        <CssBaseline />
        <AppbarHeader />
        {/* DRAWER MENU */}
        <DrawerMenu />
        <main className={classes.content}>
          <div className={classes.drawerHeader} />
          {props.children}
        </main>
      </div>
    </div>
  );
};
export default LayoutContainer;
