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

const DashboardCompliance = (props) => {
  const classes = useStyles();

  const chartOptions = {
    labels: ["Total Violations", "Critical"],
    colors: ["#7569EE", "#F7A844"],
    dataLabels: {
      enabled: false,
      //   formatter: function (val) {
      //     return val + "%";
      //   },
    },

    plotOptions: {
      pie: {
        customScale: 1,
        // size: 60,
      },
    },
    legend: {
      show: false,
      //   position: "top",
      //   horizontalAlign: "center",
    },
  };

  const chartData = [234, 16];

  return (
    <Paper className={classes.paper}>
      <Chart
        options={chartOptions}
        series={chartData}
        type="donut"
        // height={100}
      />
    </Paper>
  );
};

export default DashboardCompliance;
