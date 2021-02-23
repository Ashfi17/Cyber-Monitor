import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import Chart from "react-apexcharts";
// import { getCompliance } from '../actions/complianceActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
    // maxWidth: '318px',
    boxShadow: "0px 3px 6px #2C28281C",
  },

  legendContainer: {
    display: "flex",
    alignItems: "center",
  },
  legendCircle: {
    height: 12,
    width: 12,
    borderRadius: "50%",
    borderWidth: "1px ",
    borderStyle: "solid",
  },
  chartLabels: {
    width: "100%",
    margin: "8px 0",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const AssetByApplication = (props) => {
  const { count } = props;
  console.log(count, 'props.data')
  const classes = useStyles();

  const chartOptions = {
    labels: ["Total Violations", "Critical"],
    colors: ["#7569EE", "#F7A844"],
    dataLabels: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        customScale: 1,
        // size: 20,
      },
    },
    legend: {
      show: false,
      //   position: "top",
      //   horizontalAlign: "center",
    },
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: 14 }}>
      Asset by Application
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 6, marginBottom: 6 }}>
        <Grid item xs={12}>
          {/* {count.assetcount.map((data) => (
            <div className={classes.chartLabels}>
              <Typography>{data.type}</Typography>
              <Typography style={{ fontWeight: "bold" }}>{data.count}</Typography>
            </div>
          ))} */}
          
          <div className={classes.chartLabels}>
            <Typography>Firestorm</Typography>
            <Typography style={{ fontWeight: "bold" }}>32</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Zoom</Typography>
            <Typography style={{ fontWeight: "bold" }}>29</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Doctor Alchemy</Typography>
            <Typography style={{ fontWeight: "bold" }}>26</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Tar Pit</Typography>
            <Typography style={{ fontWeight: "bold" }}>24</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Peek-A-Boo</Typography>
            <Typography style={{ fontWeight: "bold" }}>19</Typography>
          </div><div className={classes.chartLabels}>
            <Typography>The Rival</Typography>
            <Typography style={{ fontWeight: "bold" }}>10</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Gorilla Grodd</Typography>
            <Typography style={{ fontWeight: "bold" }}>09</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Intertia</Typography>
            <Typography style={{ fontWeight: "bold" }}>07</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Bother Grimm</Typography>
            <Typography style={{ fontWeight: "bold" }}>06</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Fallout</Typography>
            <Typography style={{ fontWeight: "bold" }}>05</Typography>
          </div>
          <Divider
            variant="middle"
            style={{ width: "100%", margin: "16px 0" }}
          />
          <div className={classes.chartLabels}>
            <Typography>Without Application Tag</Typography>
            <Typography style={{ fontWeight: "bold" }}>100 %</Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssetByApplication;
