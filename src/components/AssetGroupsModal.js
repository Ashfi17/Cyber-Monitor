import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Grid } from "@material-ui/core";
import awsImg from "../assets/images/AssetGroupsModal/aws-color.svg";
import azureImg from "../assets/images/AssetGroupsModal/azure-color.svg";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {
  getAppendToRecentlyViewedAG,
  getAssetGroupDetails,
  getAssetGrouplist,
} from "../actions/assetsActions";
import toastr from "toastr";

const styles = (theme) => ({
  fieldName: {
    // marginLeft: "303px",
    width: "83px",
    height: "19px",
    textAlign: "left",
    font: "normal normal normal 16px/36px Raleway",
    letterSpacing: "0px",
    color: "#FFFFFF",
    opacity: 1,
  },
  inputField: {
    "margin-top": "16px",
    // marginLeft: "303px",
    width: "270px",
    height: "50px",
    background: " #FFFFFF00 0% 0% no-repeat padding-box",
    border: "1px solid #FFFFFF",
    "border-radius": "5px",
    color: "#FFFFFF",
    opacity: 1,
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({}))(MuiDialogContent);

const initialState = {
  oldPassword: "",
  newPassword: "",
};

const setGeroupDummyArr = [];
const AssetGroupsModal = (props) => {
  const {
    openAssetDialog,
    setOpenAssetDialog,
    groupData,
    setGroupData,
    selectedGroupData,
    setSelectedGroupData,
  } = props;
  const [values, setValues] = useState(initialState);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }, []);

  useEffect(() => {
    getAssetGrouplist()
      .then((response) => {
        setGroupData(response);
        var selectedGrpDtls = localStorage.getItem("selectedGrpDtls");
        if (selectedGrpDtls) {
          setSelectedGroupData(JSON.parse(selectedGrpDtls));
        } else {
          setSelectedGroupData(response[0]);
          localStorage.setItem("selectedGrpDtls", JSON.stringify(response[0]));
        }
      })
      .catch((error) => {
        if (error) {
          if (error.status == 400) {
            toastr.error(error.data.message);
          } else {
            toastr.error(error.statusText);
          }
        } else {
          toastr.error(
            "Something went wrong, please try again after some time!"
          );
        }
      });
    var userData = JSON.parse(localStorage.getItem("currentUserLoginDetails"));
    if (userData) {
      setUserData(userData);
      /* getAppendToRecentlyViewedAG(userData.userInfo.userId)
        .then((response) => {
          if (response.response[0].recentlyViewedAg) {
            setGroupData(response.response);
            // asyncCallingForGrpDtls(response.response[0].recentlyViewedAg);
          } else {
            toastr.error(response.data.message);
          }
        })
        .catch((error) => {
          if (error) {
            if (error.status == 400) {
              toastr.error(error.data.message);
            } else {
              toastr.error(error.statusText);
            }
          } else {
            toastr.error(
              "Something went wrong, please try again after some time!"
            );
          }
        }); */
    }
  }, []);

  const getAsstGrpDtls = async (getObj) => {
    await getAssetGroupDetails(getObj.ag)
      .then((response) => {
        groupData.push(response);
        setGroupData(groupData);
        /* if (response.response[0].recentlyViewedAg) {
      setGroupData(response.response[0].recentlyViewedAg);
    } else {
      toastr.error(response.data.message);
    } */
      })
      .catch((error) => {
        if (error) {
          if (error.status == 400) {
            toastr.error(error.data.message);
          } else {
            toastr.error(error.statusText);
          }
        } else {
          toastr.error(
            "Something went wrong, please try again after some time!"
          );
        }
      });
  };

  const asyncCallingForGrpDtls = async (getList) => {
    let i = 0;
    do {
      await getAsstGrpDtls(getList[i]);
      i++;
    } while (i < getList.length);
  };

  const selectionCard = (selObj) => {
    setSelectedGroupData(selObj);
    localStorage.setItem("selectedGrpDtls", JSON.stringify(selObj));
  };

  const gotoCaplianceWithGrpDtls = () => {
    window.location.reload();
  };

  const handleClose = () => {
    setOpenAssetDialog();
  };

  const handleChange = (event) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  /* const saveNewPassword = (e) => {
    e.preventDefault();
    if (values.oldPassword && values.newPassword) {
      var sendObj = {
        // userId: userId,
        password: values.oldPassword,
        newPassword: values.newPassword,
      };
      getAppendToRecentlyViewedAG(sendObj)
        .then((response) => {
          console.log("response", response.status);
          if (response.status === 200) {
            toastr.success("Password Changed Successfully!");
            handleClose();
          } else {
            toastr.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error) {
            if (error.status == 400) {
              toastr.error(error.data.message);
            } else {
              toastr.error(error.statusText);
            }
          } else {
            toastr.error(
              "Something went wrong, please try again after some time!"
            );
          }
        });
    } else {
      toastr.error("All Fields are Mandatory.");
    }
  }; */

  return (
    <div>
      <Dialog
        className="assetDialogBox"
        open={openAssetDialog}
        onClose={handleClose}
        aria-labelledby="asset"
      >
        <DialogTitle id="form-dialog-title">Asset Groups</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid className="assetGroupsDialogMaincont">
              <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                  <Grid container spacing={3}>
                    {groupData.map((obj, i) => (
                      <Grid item md={6} xs={12} key={i}>
                        <Card onClick={() => selectionCard(obj)}>
                          <CardActionArea
                            className={
                              selectedGroupData.displayname == obj.displayname
                                ? "Rehan"
                                : ""
                            }
                          >
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {obj.displayname}
                              </Typography>
                              <Typography component="p">
                                {obj.description}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                    {/* <Grid item md={6} xs={12}>
                      <Card>
                        <CardActionArea className="Rehan">
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              Azure
                            </Typography>
                            <Typography component="p">All Azure</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Grid className="detailsSectionContent">
                    <Grid>
                      <Typography variant="h2">
                        {selectedGroupData.displayname}
                        {selectedGroupData.displayname == "aws all" && (
                          <img
                            src={awsImg}
                            style={{ width: "22px", margin: "0 1em" }}
                          />
                        )}

                        {selectedGroupData.displayname == "Azure" && (
                          <img
                            src={azureImg}
                            style={{ width: "22px", margin: "0 1em" }}
                          />
                        )}
                      </Typography>
                      <Typography>{selectedGroupData.description}</Typography>
                      <Divider />
                      <Grid className="assetInfo">
                        <Grid container spacing={3}>
                          <Grid item xs>
                            <Typography>Applications</Typography>
                          </Grid>
                          <Grid item>
                            <Typography className="rightInfo">
                              {selectedGroupData.appcount}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs>
                            <Typography>Type</Typography>
                          </Grid>
                          <Grid item>
                            <Typography className="rightInfo">
                              {selectedGroupData.type}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs>
                            <Typography>Created By</Typography>
                          </Grid>
                          <Grid item>
                            <Typography className="rightInfo">
                              {selectedGroupData.createdby}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs>
                            <Typography>Asset Count</Typography>
                          </Grid>
                          <Grid item>
                            <Typography className="rightInfo">
                              {selectedGroupData.assetcount}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs>
                            <Typography>Cloud Types</Typography>
                          </Grid>
                          <Grid item>
                            <Typography className="rightInfo">
                              {selectedGroupData.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid className="setDefaultBtn">
                      <Button
                        type="button"
                        onClick={() => gotoCaplianceWithGrpDtls()}
                      >
                        SET AS MY DEFAULT
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={closeAssetDialogBox} color="primary">
            Cancel
          </Button>
          <Button onClick={closeAssetDialogBox} color="primary">
            Subscribe
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};
export default withRouter(AssetGroupsModal);
