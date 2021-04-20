import React, { useEffect, useState } from "react";

import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";
import { getCompliance } from '../actions/complianceActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    height: 180,
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

const DashboardAlertSection = (props) => {
  const classes = useStyles();
  const [totalCompliance, setTotalCompliance] = useState({});
  const [cardData, setCardData] = useState([]);
  const [overallCount, setOverallCount] = useState(0)

  useEffect(() => {
    getCompliance()
      .then((resp) => {
        if (resp.distribution) {
          const dataArray = [];
          const obj = {};
          const obj1 = {};
          const obj2 = {};
          const obj3 = {};
          obj.count = resp.distribution.security;
          obj.text = "Security";
          obj.icon = require("../assets/images/dashboard-alert-security-icon.svg");
          obj1.count = resp.distribution.costOptimization;
          obj1.text = "Cost Optimization";
          obj1.icon = require("../assets/images/dashboard-alert-cost-optimization-icon.svg");
          obj2.count = resp.distribution.governance;
          obj2.text = "Governance";
          obj2.icon = require("../assets/images/dashboard-alert-governance-icon.svg");
          obj3.count = resp.distribution.tagging;
          obj3.text = "Tagging";
          obj3.icon = require("../assets/images/dashboard-alert-tagging-icon.svg");
          dataArray.push(obj)
          dataArray.push(obj1)
          dataArray.push(obj2)
          dataArray.push(obj3)
          setCardData(dataArray);
          setOverallCount(resp.distribution.overall)
        }
      }).catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Paper className={classes.paper} elevation={0}>
      <div className="alertCompTotalBox">
        <div style={{ position: "absolute", bottom: 0 }}>
          <Typography
            variant="h4"
            color="textPrimary"
            style={{ fontWeight: "bold" }}
          >
            {overallCount}
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
          <Grid item sm={3} xs={6} key={index}>
            <div className={classes.alertCard}>
              <img
                src={item.icon}
                className={classes.cardIcon}
              // style={{ backgroundColor: "#E46666", opacity: 0.1 }}
              />
              <div className="alertCompBox">
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
