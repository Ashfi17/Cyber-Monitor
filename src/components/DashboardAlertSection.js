import React from "react";

import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    height: 180,
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
    borderRadius: "50%",
  },
}));

const DashboardAlertSection = (props) => {
  const classes = useStyles();

  const cardData = [
    {
      count: "842",
      text: "Security",
      icon: require("../assets/images/dashboard-alert-security-icon.svg"),
    },
    {
      count: "546",
      text: "Cost Optimization",
      icon: require("../assets/images/dashboard-alert-cost-optimization-icon.svg"),
    },
    {
      count: "784",
      text: "Governance",
      icon: require("../assets/images/dashboard-alert-governance-icon.svg"),
    },
    {
      count: "98",
      text: "Tagging",
      icon: require("../assets/images/dashboard-alert-tagging-icon.svg"),
    },
    ,
  ];
  return (
    <Paper className={classes.paper}>
      <div style={{ width: "20%", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0 }}>
          <Typography
            variant="h4"
            color="textPrimary"
            style={{ fontWeight: "bold" }}
          >
            15,00
          </Typography>
          <Typography
            variant="subtitle2"
            color="textPrimary"
            style={{ opacity: 0.5 }}
          >
            Overall
          </Typography>
          <Typography
            variant="h6"
            color="textPrimary"
            style={{ fontWeight: "bold" }}
          >
            Total Alerts
          </Typography>
        </div>
      </div>

      <Grid container spacing={3}>
        {cardData.map((item, index) => (
          <Grid item xs={3} key={index}>
            <div className={classes.alertCard}>
              <img
                src={item.icon}
                className={classes.cardIcon}
                // style={{ backgroundColor: "#E46666", opacity: 0.1 }}
              />
              <div style={{ position: "absolute", bottom: 16 }}>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  style={{ fontWeight: "bold" }}
                >
                  {item.count}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  style={{ opacity: 0.5 }}
                >
                  {item.text}
                </Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default DashboardAlertSection;
