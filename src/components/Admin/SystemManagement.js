import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import LayoutContainer from "../reusableComponent/LayoutContainer";
import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import ConfirmationRequest from "./ConfirmationRequest";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import { getCompliance } from '../actions/complianceActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",

    height: "80px",
    boxShadow: "0px 3px 6px #2C28281C",
  },
  alertCard: {
    border: "1px solid #262C4933",
    borderRadius: 10,
    height: "100%",
    padding: theme.spacing(1.5, 1.5),
    position: "relative",
  },

  cardIcon: {
    float: "right",
    // borderRadius: "50%",
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const DashboardAlertSection = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checkedJobs, setCheckedJobs] = React.useState(true);
  const [checkedRules, setCheckedRules] = React.useState(true);

  const toggleCheckedRules = () => {
    setCheckedRules((prev) => !prev);
    handleClickOpen();
  };

  const toggleCheckedJobs = () => {
    setCheckedJobs((prev) => !prev);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <LayoutContainer pageName="System Management">
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={3}>
            <Grid item xs={6} style={{ cursor: "pointer" }}>
              <b>Rules</b>
              <br />
              This action will stop PacBot compliance evaluation for all cloud
              resources.
            </Grid>
            <Grid item xs={6}>
              <Typography component="div" style={{ float: "right" }}>
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                  style={{ float: "right" }}
                >
                  <Grid item>OFF</Grid>
                  <Grid item>
                    <AntSwitch
                      checked={checkedRules}
                      onChange={toggleCheckedRules}
                      name="checkedC"
                    />
                  </Grid>
                  <Grid item>ON</Grid>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          className={classes.paper}
          elevation={0}
          style={{ marginTop: "20px" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6} style={{ cursor: "pointer" }}>
              <b>Jobs</b>
              <br />
              This action will stop all inventory collection by PacBot.
            </Grid>
            <Grid item xs={6}>
              <Typography component="div" style={{ float: "right" }}>
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>OFF</Grid>
                  <Grid item>
                    <AntSwitch
                      checked={checkedJobs}
                      onChange={toggleCheckedJobs}
                      name="checkedC"
                    />
                  </Grid>
                  <Grid item>ON</Grid>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </LayoutContainer>
      <ConfirmationRequest
        openPopUp={open}
        onCloseModal={(e) => setOpen(false)}
      />
    </div>
  );
};

export default DashboardAlertSection;
