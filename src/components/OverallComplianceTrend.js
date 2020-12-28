import React from "react";

import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    marginTop: 20,
    borderRadius: 10,
    boxShadow: "0px 3px 6px #2C28281C",
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
        columnWidth: "35%",
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
    legend: {
      horizontalAlign: "left",
      markers: {
        width: 30,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 10,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 25,
        vertical: 0,
      },
    },
  };

  const chartData = [
    {
      data: [44, 55, 41, 64],
      name: "Security",
    },
    {
      data: [53, 32, 33, 52],
      name: "Cost Optimization",
    },
    {
      data: [44, 55, 41, 64],
      name: "Governance",
    },
    {
      data: [53, 32, 33, 52],
      name: "Tagging",
    },
  ];

  return (
    <Paper className={classes.paper} elevation={0}>
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
