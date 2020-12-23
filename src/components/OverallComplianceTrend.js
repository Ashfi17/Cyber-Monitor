import React from "react";

import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    marginTop: 20,
    // height: 180,
  },
}));

const OverallComplianceTrend = (props) => {
  const classes = useStyles();
  var chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      //   sparkline: {
      //     enabled: true,
      //   },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
        dataLabels: {
          position: "top",
        },
      },
    },
    yaxis: {
      title: {
        text: "Compliance %",
      },
    },
    dataLabels: {
      enabled: false,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: ["Sept", "Oct", "Nov", "Dec"],
    },
  };

  const chartData = [
    {
      data: [44, 55, 41, 64, 22, 43, 21],
      name: "Security",
    },
    {
      data: [53, 32, 33, 52, 13, 44, 32],
      name: "Cost Optimization",
    },
    {
      data: [44, 55, 41, 64, 22, 43, 21],
      name: "Governance",
    },
    {
      data: [53, 32, 33, 52, 13, 44, 32],
      name: "Tagging",
    },
  ];

  return (
    <Paper className={classes.paper}>
      <div style={{ width: "100%" }}>
        <Chart
          options={chartOptions}
          series={chartData}
          type="bar"
          height={400}
        />
      </div>
    </Paper>
  );
};

export default OverallComplianceTrend;
