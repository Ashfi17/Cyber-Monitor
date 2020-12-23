import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { useHistory } from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  listItemText: {
    color: "white",
    padding: theme.spacing(0.5, 1.75),
    display: "flex",
    flexDirection: "center",
  },
  selecteditem: {
    backgroundImage: `linear-gradient(270deg, #827BDF, #5D55C8);`,
    color: "white",
    padding: theme.spacing(0.5, 1.75),

    borderRadius: 4,
    display: "flex",
    flexDirection: "center",
  },
}));

const menuItems = [
  {
    text: "Dashboard",
    icon: require("../assets/images/drawer-dashboard-icon.svg"),
  },
  {
    text: "Investigate",
    icon: require("../assets/images/drawer-investigate-icon.svg"),
  },
  {
    text: "Policies",
    icon: require("../assets/images/drawer-policies-icon.svg"),
  },
  {
    text: "Compliances",
    icon: require("../assets/images/drawer-compliances-icon.svg"),
  },
  { text: "Alerts", icon: require("../assets/images/drawer-alerts-icon.svg") },
  {
    text: "Compute",
    icon: require("../assets/images/drawer-compute-icon.svg"),
  },
  {
    text: "Notification",
    icon: require("../assets/images/drawer-notification-icon.svg"),
  },
  {
    text: "Settings",
    icon: require("../assets/images/drawer-settings-icon.svg"),
  },
  {
    text: "Subscription",
    icon: require("../assets/images/drawer-subscription-icon.svg"),
  },
  {
    text: "Profile",
    icon: require("../assets/images/drawer-profile-icon.svg"),
  },
  { text: "Log Out", icon: require("../assets/images/drawer-logout-icon.svg") },
];

const DrawerMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const history = useHistory();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuItems.slice(0, 8).map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={handleClick}
            className={
              history.location.pathname === `/${item.text.toLowerCase()}`
                ? classes.selecteditem
                : classes.listItemText
            }
          >
            <ListItemIcon>
              <img src={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.text} />
            {item.text === "Dashboard" ||
            item.text === "Compliances" ||
            item.text === "Alerts" ||
            item.text === "Settings" ? (
              open ? (
                <ChevronLeftIcon />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItem>
          //   <Collapse in={open} timeout="auto" unmountOnExit>
          //   <List component="div" disablePadding>
          //     {props.issuerSettingNestedListItem &&
          //       props.issuerSettingNestedListItem.map(
          //         (nestedItem, index) => (
          //           <ListItem
          //             button
          //             className={
          //               props.currentPath ===
          //               "/settings/" + nestedItem.title.toLowerCase()
          //                 ? classes.selecteNestedItem
          //                 : classes.nested
          //             }
          //             key={nestedItem.title}
          //             component={Link}
          //             to={
          //               nestedItem.title !== "Logout" &&
          //               `/settings/${nestedItem.title.toLowerCase()}`
          //             }
          //             onClick={() => {
          //               dispatch({ type: "BATCH_STEP", payload: 1 });
          //               if (nestedItem.title === "Logout") {
          //                 localStorage.removeItem("accessToken");
          //                 localStorage.removeItem("refreshToken");
          //                 localStorage.removeItem("userType");
          //                 localStorage.removeItem("userName");
          //                 history.push("/login");
          //               }
          //             }}
          //           >
          //             <ListItemIcon>
          //               <Image src={nestedItem.icon} />
          //             </ListItemIcon>
          //             <ListItemText
          //               primary={nestedItem.title}
          //               className={classes.nestedItemText}
          //             />
          //           </ListItem>
          //         )
          //       )}
          //   </List>
          // </Collapse>
        ))}
      </List>
      {/* <Divider /> */}
      <List style={{ position: "absolute", bottom: 0 }}>
        {menuItems.slice(8).map((item) => (
          <ListItem button key={item.text} className={classes.listItemText}>
            <ListItemIcon>
              <img src={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
