import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import Chart from "react-apexcharts";
import MinimizeIcon from "@material-ui/icons/Minimize";
// import { getCompliance } from '../actions/complianceActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
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

const AssetInvestory = (props) => {
  const classes = useStyles();

  const dataSeries = [
    {
      name: "Resource",
      data: [280, 3500, 3000, 7700],
    },
    {
      name: "Fail",
      data: [200, 2900, 3300, 6600],
    },
    {
      name: "Pass",
      data: [100, 2200, 3000, 5000],
    },
  ];
  const dataOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
      //   dropShadow: {
      //     enabled: true,
      //     color: '#000',
      //     top: 18,
      //     left: 7,
      //     blur: 10,
      //     opacity: 0.2
      //   },
      toolbar: {
        show: true,
      },
    },
    colors: ["#7569EE", "#26C76E", "#E46666"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ["Jan `21", "Feb `21", "Mar `21", "Apr `21"],
    },
    yaxis: {
      min: 0,
      max: 7500,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: 14 }}>
        Asset Trend
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 6, marginBottom: 6 }}>
        <Grid item xs={12}>
          <Chart
            options={dataOptions}
            series={dataSeries}
            type="line"
            height={400}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssetInvestory;
