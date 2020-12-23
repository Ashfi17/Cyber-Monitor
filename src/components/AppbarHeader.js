import React from "react";
import clsx from "clsx";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
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

  return (
    <AppBar
      position="fixed"
      variant="permanent"
      anchor="left"
      className={classes.appBar}
    >
      <Toolbar style={{ backgroundColor: "#fff" }}>
        <Typography variant="h6" noWrap>
          Persistent drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default AppbarHeader;
