import React from "react";
import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    // height: 180,
  },
}));

const DashboardTagging = (props) => {
  const classes = useStyles();

  const chartOptions = {
    labels: ["Untagged"],
    colors: ["#E46666"],
    dataLabels: {
      show: false,
      //   name: {
      //     show: true,
      //     fontSize: "16px",
      //     fontFamily: undefined,
      //     fontWeight: 600,
      //     color: undefined,
      //     offsetY: -10,
      //   },
      //   value: {
      //     show: true,
      //     fontSize: "14px",
      //     fontFamily: undefined,
      //     fontWeight: 400,
      //     color: undefined,
      //     offsetY: 16,
      //     formatter: function (val) {
      //       return val + "%";
      //     },
      //   },
      //   total: {
      //     show: false,
      //     label: "Total",
      //     color: "#373d3f",
      //     fontSize: "16px",
      //     fontFamily: undefined,
      //     fontWeight: 600,
      //     formatter: function (w) {
      //       return (
      //         w.globals.seriesTotals.reduce((a, b) => {
      //           return a + b;
      //         }, 0) /
      //           w.globals.series.length +
      //         "%"
      //       );
      //     },
      //   },
    },

    plotOptions: {
      inverseOrder: true,
      radialBar: {
        hollow: {
          size: "70%",
        },
      },
    },

    legend: {
      show: false,
      // position: "top",
      // horizontalAlign: "center",
    },
  };

  const chartData = [83];

  return (
    <Paper className={classes.paper}>
      <Chart
        options={chartOptions}
        series={chartData}
        type="radialBar"
        // height={100}
      />
    </Paper>
  );
};

export default DashboardTagging;
