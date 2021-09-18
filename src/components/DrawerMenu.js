import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { appContext } from "../App";
import ChangePassword from "./ChangePassword";
import AssetGroupsModal from "./AssetGroupsModal";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  selecteditem: {
    backgroundImage: `linear-gradient(270deg, #827BDF, #5D55C8);`,
    color: "white",
    padding: theme.spacing(0.5, 1.75),
    display: "flex",
  },
  nestedselecteditem: {
    backgroundImage: `linear-gradient(270deg, #827BDF, #5D55C8);`,
    color: "white",
    padding: theme.spacing(0.5, 1.75),
    display: "flex",
    paddingLeft: theme.spacing(4),
  },
  drawerMenuList: {
    height: "100%",
    overflow: "auto",
  },
}));

const DrawerMenu = (props) => {
  const classes = useStyles();
  const { authUser, setAuthUser } = useContext(appContext);
  const [loggedInUserObj, setLoggedInUserObj] = React.useState({});
  const [loggedInUserAdminIs, setAdminIs] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openComp, setOpenComp] = React.useState(false);
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [tabNdMobViewIs, setTabNdMobViewIs] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState(false);
  const [leftStateIs, setLeftStateIs] = React.useState(false);
  const [changePassModalOpen, setChangePassModalOpen] = React.useState(false);
  const [openAssetDialog, setOpenAssetDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedGroupData, setSelectedGroupData] = useState({});
  const [groupData, setGroupData] = useState([]);

  const menuHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuHandleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setLeftStateIs(open);
  };

  const history = useHistory();

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
    handleResizeWindow();
    setCurrentLocation(window.location.pathname);
    var user_obj = JSON.parse(localStorage.getItem("currentUserLoginDetails"));
    if (user_obj) {
      setLoggedInUserObj(user_obj);
      if (user_obj.userInfo.userRoles.length > 1) {
        if (user_obj.userInfo.userRoles[1] == "ROLE_ADMIN") {
          setAdminIs(true);
        }
      }
    }
    var first_time_user_is = localStorage.getItem("firstTimeUserIs");
    if (!first_time_user_is) {
      setOpenAssetDialog(true);
      localStorage.setItem("firstTimeUserIs", true);
    }
  }, []);

  const handleResizeWindow = () => {
    var windowInnerWidth = window.innerWidth;
    if (windowInnerWidth <= 960) {
      setTabNdMobViewIs(true);
    } else {
      setTabNdMobViewIs(false);
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickComp = () => {
    setOpenComp(!openComp);
  };

  const handleClickAdmin = () => {
    setOpenAdmin(!openAdmin);
  };

  const logoutUser = () => {
    setAuthUser(null);
    localStorage.removeItem("currentUserLoginDetails");
    window.location = "/";
  };

  const callChangePasswordModalBox = () => {
    setChangePassModalOpen(true);
  };

  const assetListTableRedirection = () => {
    localStorage.removeItem("assetDataForFilter");
    localStorage.removeItem("searchedAsstListPgeFilterObjs");
    props.history.push("/assetlist-table");
  };

  const omniSearchRedirection = () => {
    localStorage.removeItem("omniSelectedAsset");
    localStorage.removeItem("omniSearchingTxt");
    localStorage.removeItem("omniSelObj");
    localStorage.removeItem("omniFilterObj");
    props.history.push("/omni-search");
    props.history.push("/omni-search");
  };
  const openAssetDialogBox = () => {
    setOpenAssetDialog(true);
  };

  const closeAssetDialogBox = () => {
    setOpenAssetDialog(false);
  };

  const gotoCaplianceWithGrpDtls = (selObj) => {
    localStorage.setItem("selectedGrpDtls", JSON.stringify(selObj));
    window.location.reload();
  };

  return (
    <Grid className="muiDialogContainerAssetShow">
      <IconButton
        className="mainMenuIconBtn"
        aria-label="menu"
        style={{ color: "#262C49" }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className={"mainDrawerMenu"}
        variant={tabNdMobViewIs ? "" : "permanent"}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={"left"}
        open={leftStateIs}
        onClose={toggleDrawer(false)}
      >
        <div className={classes.toolbar}>
          <img
            src={require("../assets/images/CyMonitor_logo.svg")}
            style={{
              width: "190px",
              marginLeft: "20px",
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={(e) => props.history.push("/home-page")}
          />
        </div>
        <Divider />
        <List className={classes.drawerMenuList}>
          <ListItem button onClick={menuHandleClick}>
            <ListItemText
              primary={selectedGroupData.name}
              className="textTarC"
            ></ListItemText>
          </ListItem>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={menuHandleClose}
            className="getAssetDetaSelct"
          >
            {groupData.map((element, i) => (
              <MenuItem
                key={i}
                onClick={() => gotoCaplianceWithGrpDtls(element)}
              >
                {element.displayname}
              </MenuItem>
            ))}
            <MenuItem onClick={openAssetDialogBox}>View More</MenuItem>
          </Menu>
          <ListItem
            button
            onClick={(e) => props.history.push("/home-page")}
            className={
              currentLocation == "/home-page" ? classes.selecteditem : ""
            }
          >
            <ListItemIcon>
              <img
                src={require("../assets/images/drawer-dashboard-icon.svg")}
              />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <img
                src={require("../assets/images/drawer-dashboard-icon.svg")}
              />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary="Asset">
              {/* {open ? <ExpandLessIcon color="secondary" /> : <ExpandMoreIcon color="secondary" />} */}
              <img
                src={require("../assets/images/ic_keyboard_arrow_right_24px.svg")}
              />
            </ListItemText>
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={
                  currentLocation == "/asset-dashboard"
                    ? classes.nestedselecteditem
                    : classes.nested
                }
                onClick={(e) => props.history.push("/asset-dashboard")}
              >
                <ListItemText
                  style={{ color: "white" }}
                  primary="Asset Dashboard"
                />
              </ListItem>
              <ListItem
                button
                className={
                  currentLocation == "/assetlist-table"
                    ? classes.nestedselecteditem
                    : classes.nested
                }
                onClick={(e) => assetListTableRedirection()}
              >
                <ListItemText style={{ color: "white" }} primary="Asset List" />
              </ListItem>
            </List>
          </Collapse>
          {/* <ListItem button onClick={(e) => props.history.push("/home-page")}>
          <ListItemIcon>
            <img
              src={require("../assets/images/drawer-investigate-icon.svg")}
            />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary="Investigate" />
        </ListItem> */}
          {/* <ListItem button onClick={(e) => props.history.push("/home-page")}>
          <ListItemIcon>
            <img src={require("../assets/images/drawer-policies-icon.svg")} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary="Policies" />
        </ListItem> */}
          <ListItem button onClick={handleClickComp}>
            <ListItemIcon>
              <img
                src={require("../assets/images/drawer-compliances-icon.svg")}
              />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary="Compliances">
              {" "}
              {openComp ? (
                <ExpandLessIcon color="secondary" />
              ) : (
                <ExpandMoreIcon color="secondary" />
              )}
            </ListItemText>
          </ListItem>
          <Collapse in={openComp} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={
                  currentLocation == "/tagging-compliance"
                    ? classes.nestedselecteditem
                    : classes.nested
                }
                onClick={(e) => props.history.push("/tagging-compliance")}
              >
                <ListItemText
                  style={{ color: "white" }}
                  primary="Tagging Compliance"
                />
              </ListItem>
              <ListItem
                button
                className={
                  currentLocation == "/policyknowledge"
                    ? classes.nestedselecteditem
                    : classes.nested
                }
                onClick={(e) => props.history.push("/policyknowledge")}
              >
                <ListItemText
                  style={{ color: "white" }}
                  primary="Policy Knowledge"
                />
              </ListItem>
            </List>
          </Collapse>
          {/* <ListItem button onClick={(e) => props.history.push("/home-page")}>
          <ListItemIcon>
            <img src={require("../assets/images/drawer-alerts-icon.svg")} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary="Alerts" />
        </ListItem> */}
          {/* <ListItem button onClick={(e) => props.history.push("/home-page")}>
          <ListItemIcon>
            <img src={require("../assets/images/drawer-compute-icon.svg")} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary="Compute" />
        </ListItem> */}
          {/* <ListItem button onClick={(e) => props.history.push("/home-page")}>
          <ListItemIcon>
            <img
              src={require("../assets/images/drawer-notification-icon.svg")}
            />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary="Notification" />
        </ListItem> */}
          {/* <ListItem button onClick={(e) => props.history.push("/home-page")}>
          <ListItemIcon>
            <img src={require("../assets/images/drawer-settings-icon.svg")} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary="Settings" />
        </ListItem> */}
          {/* <ListItem button onClick={(e) => props.history.push("/manage-policy")}>
          <ListItemIcon>
            <img src={require("../assets/images/Mask Group 376.svg")} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary="Admin" />
        </ListItem> */}

          <ListItem
            button
            onClick={(e) => omniSearchRedirection()}
            className={
              currentLocation == "/omni-search" ? classes.selecteditem : ""
            }
          >
            <ListItemIcon>
              <img
                src={require("../assets/images/drawer-dashboard-icon.svg")}
              />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary="Search" />
          </ListItem>
          <ListItem
            button
            onClick={(e) => props.history.push("/notification")}
            className={
              currentLocation == "/notification" ? classes.selecteditem : ""
            }
          >
            <ListItemIcon>
              <img
                src={require("../assets/images/drawer-dashboard-icon.svg")}
              />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary="Notification" />
          </ListItem>
          {loggedInUserAdminIs && (
            <>
              <ListItem button onClick={handleClickAdmin}>
                <ListItemIcon>
                  <img src={require("../assets/images/Mask Group 376.svg")} />
                </ListItemIcon>
                <ListItemText
                  style={{ color: "white" }}
                  primary="Configuration"
                >
                  {openAdmin ? (
                    <ExpandLessIcon color="secondary" />
                  ) : (
                    <ExpandMoreIcon color="secondary" />
                  )}
                </ListItemText>
              </ListItem>
              <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={
                      currentLocation == "/manage-policy"
                        ? classes.nestedselecteditem
                        : classes.nested
                    }
                    onClick={(e) => props.history.push("/manage-policy")}
                  >
                    <ListItemText
                      style={{ color: "white" }}
                      primary="Manage Policy"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className={
                      currentLocation == "/manage-rules"
                        ? classes.nestedselecteditem
                        : classes.nested
                    }
                    onClick={(e) => props.history.push("/manage-rules")}
                  >
                    <ListItemText
                      style={{ color: "white" }}
                      primary="Manage Rules"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className={
                      currentLocation == "/manage-issue"
                        ? classes.nestedselecteditem
                        : classes.nested
                    }
                    onClick={(e) => props.history.push("/manage-issue")}
                  >
                    <ListItemText
                      style={{ color: "white" }}
                      primary="Manage Issue"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className={
                      currentLocation == "/manage-roles"
                        ? classes.nestedselecteditem
                        : classes.nested
                    }
                    onClick={(e) => props.history.push("/manage-roles")}
                  >
                    <ListItemText
                      style={{ color: "white" }}
                      primary="Manage Roles"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className={
                      currentLocation == "/manage-target-type"
                        ? classes.nestedselecteditem
                        : classes.nested
                    }
                    onClick={(e) => props.history.push("/manage-target-type")}
                  >
                    <ListItemText
                      style={{ color: "white" }}
                      primary="Manage Target Type"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className={
                      currentLocation == "/manage-domain"
                        ? classes.nestedselecteditem
                        : classes.nested
                    }
                    onClick={(e) => props.history.push("/manage-domain")}
                  >
                    <ListItemText
                      style={{ color: "white" }}
                      primary="Manage Domain"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className={
                      currentLocation == "/system-management"
                        ? classes.nestedselecteditem
                        : classes.nested
                    }
                    onClick={(e) => props.history.push("/system-management")}
                  >
                    <ListItemText
                      style={{ color: "white" }}
                      primary="System Management"
                    />
                  </ListItem>
                  {/* <ListItem
              button
              className={currentLocation == "/asset-dashboard" ? classes.nestedselecteditem : classes.nested}
              onClick={(e) => props.history.push("/policyknowledge")}
            >
              <ListItemText style={{ color: "white" }} primary="Policy Knowledge" />
            </ListItem> */}
                </List>
              </Collapse>
            </>
          )}
        </List>
        {/* <Divider /> */}
        <List style={{ padding: 0 }}>
          {/* <ListItem button onClick={(e) => props.history.push("/home-page")}>
          <ListItemIcon>
            <img
              src={require("../assets/images/drawer-subscription-icon.svg")}
            />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary="Subscription" />
        </ListItem> */}
          {/* <ListItem button onClick={(e) => props.history.push("/home-page")}>
          <ListItemIcon>
            <img src={require("../assets/images/drawer-profile-icon.svg")} />
          </ListItemIcon>
          <ListItemText style={{ color: "white" }} primary="Profile" />
        </ListItem> */}
          <ListItem button onClick={callChangePasswordModalBox}>
            <ListItemIcon>
              <img src={require("../assets/images/drawer-logout-icon.svg")} />
            </ListItemIcon>
            <ListItemText
              style={{ color: "white" }}
              primary="Change Password"
            />
          </ListItem>
          <ListItem button onClick={logoutUser}>
            <ListItemIcon>
              <img src={require("../assets/images/drawer-logout-icon.svg")} />
            </ListItemIcon>
            <ListItemText style={{ color: "white" }} primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>

      <ChangePassword
        openPopUp={changePassModalOpen}
        onCloseModal={(e) => setChangePassModalOpen(false)}
      />
      <AssetGroupsModal
        openAssetDialog={openAssetDialog}
        setOpenAssetDialog={setOpenAssetDialog}
        selectedGroupData={selectedGroupData}
        setSelectedGroupData={setSelectedGroupData}
        groupData={groupData}
        setGroupData={setGroupData}
      />
    </Grid>
  );
};
export default withRouter(DrawerMenu);
